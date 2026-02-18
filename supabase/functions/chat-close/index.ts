import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type, authorization",
      "access-control-allow-methods": "POST, OPTIONS",
    },
  });
}

function getBearer(req: Request) {
  const h = req.headers.get("authorization") || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m?.[1] || "";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return json({ ok: true });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const token = getBearer(req);
  if (!token) return json({ error: "Missing Authorization: Bearer <token>" }, 401);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const conversationId = String(body?.conversation_id || "").trim();
  if (!conversationId) return json({ error: "conversation_id required" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
  const serviceKey = Deno.env.get("SERVICE_ROLE_KEY") || "";

  if (!supabaseUrl || !anonKey || !serviceKey) {
    return json({ error: "Missing server envs (SUPABASE_URL, SUPABASE_ANON_KEY, SERVICE_ROLE_KEY)" }, 500);
  }

  const authClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: userData, error: userErr } = await authClient.auth.getUser();
  if (userErr || !userData?.user) {
    return json({ error: "Unauthorized", details: userErr?.message || "Invalid token" }, 401);
  }

  const userId = userData.user.id;

  const sb = createClient(supabaseUrl, serviceKey);

  const { data: convo, error: cErr } = await sb
    .from("conversations")
    .select("id, account_id, status")
    .eq("id", conversationId)
    .maybeSingle();

  if (cErr || !convo) return json({ error: "Conversation not found" }, 404);

  const { data: member, error: mErr } = await sb
    .from("account_users")
    .select("role")
    .eq("account_id", convo.account_id)
    .eq("user_id", userId)
    .maybeSingle();

  if (mErr || !member) return json({ error: "Forbidden" }, 403);

  const nowIso = new Date().toISOString();

  const { error: uErr } = await sb
    .from("conversations")
    .update({
      status: "closed",
      closed_at: nowIso,
      mode: "bot",
      last_message_at: nowIso,
    })
    .eq("id", convo.id);

  if (uErr) return json({ error: "Close update failed", details: uErr.message }, 500);

  await sb.from("messages").insert({
    conversation_id: convo.id,
    account_id: convo.account_id,
    role: "system",
    content: "Chat closed by agent.",
    meta: { by: userId },
  });

  return json({ ok: true, conversation_id: convo.id, status: "closed" });
});
