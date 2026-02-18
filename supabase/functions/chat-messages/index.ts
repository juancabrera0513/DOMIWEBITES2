import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type, x-site-key, x-domi-secret",
      "access-control-allow-methods": "POST, OPTIONS",
    },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return json({ ok: true });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const shared = req.headers.get("x-domi-secret") || "";
  const expected = Deno.env.get("DOMI_AI_SHARED_SECRET") || "";
  if (!expected || shared !== expected) return json({ error: "Unauthorized" }, 401);

  const siteKey = req.headers.get("x-site-key") || "";
  if (!siteKey) return json({ error: "Missing x-site-key" }, 400);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const conversationId = String(body?.conversation_id || "").trim();
  const after = String(body?.after || "").trim(); 
  const limit = Math.min(Math.max(Number(body?.limit || 50), 1), 200);

  if (!conversationId) return json({ error: "conversation_id required" }, 400);

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SERVICE_ROLE_KEY")!;
  const sb = createClient(supabaseUrl, serviceKey);

  const { data: convo, error: cErr } = await sb
    .from("conversations")
    .select("id, site_id, account_id")
    .eq("id", conversationId)
    .maybeSingle();

  if (cErr || !convo) return json({ error: "Conversation not found" }, 404);

  const { data: site, error: sErr } = await sb
    .from("sites")
    .select("id, site_key, is_active")
    .eq("id", convo.site_id)
    .maybeSingle();

  if (sErr || !site) return json({ error: "Site not found" }, 404);
  if (!site.is_active) return json({ error: "Site inactive" }, 403);
  if (site.site_key !== siteKey) return json({ error: "Invalid site_key for conversation" }, 403);

  let q = sb
    .from("messages")
    .select("id, role, content, created_at")
    .eq("conversation_id", convo.id)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (after) q = q.gt("created_at", after);

  const { data: messages, error: mErr } = await q;

  if (mErr) return json({ error: "Messages query failed", details: mErr.message }, 500);

  const last = (messages?.length ? messages[messages.length - 1].created_at : after) || null;

  return json({ ok: true, conversation_id: convo.id, messages: messages || [], cursor: last });
});
