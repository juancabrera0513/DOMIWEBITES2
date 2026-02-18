import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "authorization, content-type",
      "access-control-allow-methods": "POST, OPTIONS",
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return json({ ok: true });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const authHeader = req.headers.get("authorization") || "";
  if (!authHeader.toLowerCase().startsWith("bearer ")) {
    return json({ error: "Missing Authorization bearer token" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const anonKey = Deno.env.get("ANON_KEY")!;
  const serviceKey = Deno.env.get("SERVICE_ROLE_KEY")!;

  const authClient = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: uErr } = await authClient.auth.getUser();
  if (uErr || !userData?.user) return json({ error: "Invalid user" }, 401);

  const body = await req.json().catch(() => ({}));
  const conversationId = String(body?.conversation_id || "").trim();
  if (!conversationId) return json({ error: "conversation_id required" }, 400);

  const userId = userData.user.id;

  const admin = createClient(supabaseUrl, serviceKey);

  const { data: convo, error: cErr } = await admin
    .from("conversations")
    .select("id, account_id, mode")
    .eq("id", conversationId)
    .maybeSingle();
  if (cErr || !convo) return json({ error: "Conversation not found" }, 404);

  const { data: member, error: mErr } = await admin
    .from("account_users")
    .select("role")
    .eq("account_id", convo.account_id)
    .eq("user_id", userId)
    .maybeSingle();

  if (mErr) return json({ error: "Membership check failed", details: mErr.message }, 500);
  if (!member) return json({ error: "Not a member of this account" }, 403);

  const { error: upErr } = await admin
    .from("conversations")
    .update({ mode: "live", assigned_to: userId })
    .eq("id", conversationId);

  if (upErr) return json({ error: "Update failed", details: upErr.message }, 500);

  await admin.from("messages").insert({
    conversation_id: conversationId,
    account_id: convo.account_id,
    role: "system",
    content: "✅ Live agent joined the chat.",
    meta: { user_id: userId },
  });

  return json({ ok: true, conversation_id: conversationId, mode: "live", assigned_to: userId });
});
