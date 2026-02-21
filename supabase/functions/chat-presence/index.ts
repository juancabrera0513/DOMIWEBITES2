import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function corsHeaders() {
  return {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type, x-site-key, x-domi-secret",
    "access-control-allow-methods": "POST, OPTIONS",
  };
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders() });
}

function mustEnv(name: string) {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders() });
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

    const shared = req.headers.get("x-domi-secret") || "";
    const expected = Deno.env.get("DOMI_AI_SHARED_SECRET") || "";
    if (!expected || shared !== expected) return json({ error: "Unauthorized" }, 401);

    const siteKey = req.headers.get("x-site-key") || "";
    if (!siteKey) return json({ error: "Missing x-site-key" }, 400);

    const body = await req.json().catch(() => null);
    if (!body) return json({ error: "Invalid JSON" }, 400);

    const conversationId = String(body?.conversation_id || "").trim();
    const eventType = String(body?.event_type || "").trim(); 
    const pathname = String(body?.pathname || "").slice(0, 200) || null;

    if (!conversationId) return json({ error: "conversation_id required" }, 400);
    if (!eventType) return json({ error: "event_type required" }, 400);

    const supabaseUrl = mustEnv("SUPABASE_URL");
    const serviceKey =
      Deno.env.get("SERVICE_ROLE_KEY") ||
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
      "";
    if (!serviceKey) return json({ error: "Missing env: SERVICE_ROLE_KEY" }, 500);

    const sb = createClient(supabaseUrl, serviceKey);

    const { data: convo, error: cErr } = await sb
      .from("conversations")
      .select("id, site_id, status")
      .eq("id", conversationId)
      .maybeSingle();

    if (cErr || !convo) return json({ error: "Conversation not found" }, 404);
    if (convo.status === "closed") return json({ ok: true, closed: true });

    const { data: site, error: sErr } = await sb
      .from("sites")
      .select("id, site_key, is_active")
      .eq("id", convo.site_id)
      .maybeSingle();

    if (sErr || !site) return json({ error: "Site not found" }, 404);
    if (!site.is_active) return json({ error: "Site inactive" }, 403);
    if (site.site_key !== siteKey) return json({ error: "Invalid site_key for conversation" }, 403);

    const now = new Date();
    const nowIso = now.toISOString();

    const update: any = {
      visitor_last_seen_at: nowIso,
      visitor_is_online: true,
      last_message_at: nowIso, 
    };

    if (eventType === "typing") {
      const until = new Date(now.getTime() + 5000).toISOString();
      update.visitor_typing_until = until;
    }

    if (pathname) {
    }

    await sb.from("conversations").update(update).eq("id", conversationId);

    return json({ ok: true });
  } catch (e) {
    return json({ error: String(e?.message || e) }, 500);
  }
});