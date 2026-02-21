import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function corsHeaders() {
  return {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type, x-domi-secret",
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

    const supabaseUrl = mustEnv("SUPABASE_URL");
    const serviceKey =
      Deno.env.get("SERVICE_ROLE_KEY") ||
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
      "";
    if (!serviceKey) return json({ error: "Missing env: SERVICE_ROLE_KEY" }, 500);

    const sb = createClient(supabaseUrl, serviceKey);

    const ONLINE_SECONDS = 100;
    const ABANDON_SECONDS = 5 * 60;

    const now = Date.now();
    const onlineCutoff = new Date(now - ONLINE_SECONDS * 1000).toISOString();
    const abandonCutoff = new Date(now - ABANDON_SECONDS * 1000).toISOString();

    const { error: offErr } = await sb
      .from("conversations")
      .update({ visitor_is_online: false })
      .eq("status", "open")
      .not("visitor_last_seen_at", "is", null)
      .lt("visitor_last_seen_at", onlineCutoff);

    if (offErr) return json({ error: "Offline update failed", details: offErr.message }, 500);

    const { data: abandonList, error: aSelErr } = await sb
      .from("conversations")
      .select("id, account_id")
      .eq("status", "open")
      .is("abandoned_at", null)
      .not("visitor_last_seen_at", "is", null)
      .lt("visitor_last_seen_at", abandonCutoff)
      .limit(50);

    if (aSelErr) return json({ error: "Abandon select failed", details: aSelErr.message }, 500);

    let marked = 0;
    let nudged = 0;

    if (abandonList && abandonList.length) {
      const ids = abandonList.map((c) => c.id);

      const { error: aUpdErr } = await sb
        .from("conversations")
        .update({ abandoned_at: new Date().toISOString() })
        .in("id", ids);

      if (aUpdErr) return json({ error: "Abandon update failed", details: aUpdErr.message }, 500);

      marked = ids.length;

      const nudgeText =
        Deno.env.get("ABANDON_NUDGE_TEXT") ||
        "Looks like you stepped away — reply anytime and we’ll jump back in.";

      const rows = abandonList.map((c) => ({
        conversation_id: c.id,
        account_id: c.account_id,
        role: "bot",
        content: nudgeText,
        meta: { system: "abandon_nudge" },
      }));

      const { error: mErr } = await sb.from("messages").insert(rows);
      if (!mErr) nudged = rows.length;
    }

    return json({ ok: true, marked_abandoned: marked, nudges_sent: nudged });
  } catch (e) {
    return json({ error: String(e?.message || e) }, 500);
  }
});