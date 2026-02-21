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

async function callAiReply(params: { message: string; conversation_id: string; pathname?: string }) {
  const url = Deno.env.get("AI_REPLY_URL") || "";
  const shared = Deno.env.get("DOMI_AI_SHARED_SECRET") || "";
  if (!url) throw new Error("Missing env: AI_REPLY_URL");
  if (!shared) throw new Error("Missing env: DOMI_AI_SHARED_SECRET");

  const r = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", "x-domi-secret": shared },
    body: JSON.stringify(params),
  });

  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((data as any)?.error || (data as any)?.details || "AI error");
  return data as { reply: string; request_live_agent: boolean };
}

async function fireTrackEvent(params: {
  site_key: string;
  visitor_external_id: string;
  event_type: string;
  pathname?: string;
  conversation_id?: string;
  referrer?: string | null;
  meta?: Record<string, unknown>;
}) {
  const url = Deno.env.get("TRACK_URL") || "";
  const shared = Deno.env.get("DOMI_AI_SHARED_SECRET") || "";
  if (!url) return;
  if (!shared) return;

  await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-site-key": params.site_key,
      "x-domi-secret": shared,
    },
    body: JSON.stringify({
      visitor_external_id: params.visitor_external_id,
      event_type: params.event_type,
      pathname: params.pathname || null,
      conversation_id: params.conversation_id || null,
      referrer: params.referrer || null,
      meta: params.meta || {},
    }),
  }).catch(() => {});
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
  const content = String(body?.message || "").trim();
  const pathname = String(body?.meta?.pathname || body?.pathname || "").trim();

  if (!conversationId || !content) {
    return json({ error: "conversation_id and message required" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const serviceKey =
    Deno.env.get("SERVICE_ROLE_KEY") ||
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
    "";

  if (!supabaseUrl) return json({ error: "Missing env: SUPABASE_URL" }, 500);
  if (!serviceKey) return json({ error: "Missing env: SERVICE_ROLE_KEY" }, 500);

  const sb = createClient(supabaseUrl, serviceKey);

  const { data: convo, error: cErr } = await sb
    .from("conversations")
    .select("id, account_id, site_id, mode, status, visitor_id")
    .eq("id", conversationId)
    .maybeSingle();

  if (cErr || !convo) return json({ error: "Conversation not found" }, 404);

  if (convo.status === "closed") {
    return json({
      closed: true,
      mode: "closed",
      request_live_agent: false,
      reply: "This chat is closed. Please start a new chat.",
    });
  }

  const { data: site, error: sErr } = await sb
    .from("sites")
    .select("id, site_key, is_active")
    .eq("id", convo.site_id)
    .maybeSingle();

  if (sErr || !site) return json({ error: "Site not found" }, 404);
  if (!site.is_active) return json({ error: "Site inactive" }, 403);
  if (site.site_key !== siteKey) return json({ error: "Invalid site_key for conversation" }, 403);

  const { data: visitor, error: vErr } = await sb
    .from("visitors")
    .select("external_id")
    .eq("id", convo.visitor_id)
    .maybeSingle();

  const visitorExternalId = visitor?.external_id || "";

  const { data: visitorMsg, error: mErr } = await sb
    .from("messages")
    .insert({
      conversation_id: convo.id,
      account_id: convo.account_id,
      role: "visitor",
      content,
      meta: { pathname: pathname || null },
    })
    .select("id, role, content, created_at")
    .maybeSingle();

  if (mErr || !visitorMsg) {
    return json({ error: "Message insert failed", details: mErr?.message }, 500);
  }

  await sb.from("conversations").update({ last_message_at: visitorMsg.created_at }).eq("id", convo.id);

  if (visitorExternalId) {
    await fireTrackEvent({
      site_key: siteKey,
      visitor_external_id: visitorExternalId,
      event_type: "message_sent",
      pathname,
      conversation_id: convo.id,
      meta: {},
    });
  }

  if (convo.mode === "live") {
    return json({
      reply: "",
      mode: "live",
      request_live_agent: false,
      closed: false,
      visitor_message: visitorMsg,
      bot_message: null,
      cursor: visitorMsg.created_at,
    });
  }

  let ai: { reply: string; request_live_agent: boolean };
  try {
    ai = await callAiReply({
      message: content,
      conversation_id: convo.id,
      pathname,
    });
  } catch (e) {
    return json({ error: "AI call failed", details: String(e) }, 500);
  }

  let botText = (ai.reply || "").trim();
  if (ai.request_live_agent && !botText) {
    botText = "Got it — I’ll connect you with a live agent now. One moment…";
  }

  const { data: botMsg, error: bErr } = await sb
    .from("messages")
    .insert({
      conversation_id: convo.id,
      account_id: convo.account_id,
      role: "bot",
      content: botText,
      meta: { model: "gpt-4.1-mini", pathname: pathname || null },
    })
    .select("id, role, content, created_at")
    .maybeSingle();

  if (bErr || !botMsg) return json({ error: "Bot message insert failed", details: bErr?.message }, 500);

  let newMode = convo.mode;
  if (ai.request_live_agent && convo.mode !== "waiting_agent") {
    newMode = "waiting_agent";
    await sb.from("conversations").update({ mode: newMode }).eq("id", convo.id);

    if (visitorExternalId) {
      await fireTrackEvent({
        site_key: siteKey,
        visitor_external_id: visitorExternalId,
        event_type: "agent_requested",
        pathname,
        conversation_id: convo.id,
        meta: { source: "ai" },
      });
    }
  }

  await sb.from("conversations").update({ last_message_at: botMsg.created_at }).eq("id", convo.id);

  return json({
    reply: botText,
    request_live_agent: ai.request_live_agent,
    mode: newMode,
    closed: false,
    visitor_message: visitorMsg,
    bot_message: botMsg,
    cursor: botMsg.created_at,
  });
});