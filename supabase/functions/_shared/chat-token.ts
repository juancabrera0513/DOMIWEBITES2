const encoder = new TextEncoder();
const decoder = new TextDecoder();

type ChatTokenPayload = {
  conversation_id: string;
  site_id: string;
  exp: number;
};

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function signingKey() {
  const secret = Deno.env.get("CHAT_TOKEN_SECRET") ||
    Deno.env.get("DOMI_AI_SHARED_SECRET") || "";
  if (!secret) throw new Error("Missing CHAT_TOKEN_SECRET");

  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

export async function createChatToken(
  conversationId: string,
  siteId: string,
  ttlSeconds = 60 * 60 * 24,
) {
  const payload: ChatTokenPayload = {
    conversation_id: conversationId,
    site_id: siteId,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const encodedPayload = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign(
    "HMAC",
    await signingKey(),
    encoder.encode(encodedPayload),
  );
  return `${encodedPayload}.${toBase64Url(new Uint8Array(signature))}`;
}

export async function verifyChatToken(
  token: string,
  conversationId: string,
): Promise<ChatTokenPayload | null> {
  try {
    const [encodedPayload, encodedSignature, extra] = token.split(".");
    if (!encodedPayload || !encodedSignature || extra) return null;

    const valid = await crypto.subtle.verify(
      "HMAC",
      await signingKey(),
      fromBase64Url(encodedSignature),
      encoder.encode(encodedPayload),
    );
    if (!valid) return null;

    const payload = JSON.parse(
      decoder.decode(fromBase64Url(encodedPayload)),
    ) as ChatTokenPayload;

    if (payload.conversation_id !== conversationId) return null;
    if (!payload.site_id) return null;
    if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}
