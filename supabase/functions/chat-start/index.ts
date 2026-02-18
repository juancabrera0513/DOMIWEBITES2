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

function mustEnv(name: string) {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
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

  const externalId = String(body?.visitor_external_id || "").trim();
  if (!externalId) return json({ error: "visitor_external_id required" }, 400);

  const ua = String(body?.user_agent || "").slice(0, 500);
  const ref = String(body?.referrer || "").slice(0, 500);
  const pathname = String(body?.pathname || "").slice(0, 200);

  const supabaseUrl = mustEnv("SUPABASE_URL");
  const serviceKey =
    Deno.env.get("SERVICE_ROLE_KEY") ||
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
    "";
  if (!serviceKey) return json({ error: "Missing env: SERVICE_ROLE_KEY" }, 500);

  const sb = createClient(supabaseUrl, serviceKey);

  const { data: site, error: siteErr } = await sb
    .from("sites")
    .select("id, account_id, is_active")
    .eq("site_key", siteKey)
    .maybeSingle();

  if (siteErr || !site) return json({ error: "Invalid site_key" }, 404);
  if (!site.is_active) return json({ error: "Site inactive" }, 403);

  const { data: visitor, error: vErr } = await sb
    .from("visitors")
    .upsert(
      {
        site_id: site.id,
        external_id: externalId,
        user_agent: ua || null,
        referrer: ref || null,
      },
      { onConflict: "site_id,external_id" }
    )
    .select("id")
    .single();

  if (vErr || !visitor) return json({ error: "Visitor upsert failed", details: vErr?.message }, 500);

  
  const nowIso = new Date().toISOString();

  const { data: convo, error: cErr } = await sb
    .from("conversations")
    .insert({
      site_id: site.id,
      account_id: site.account_id,
      visitor_id: visitor.id,
      status: "open",
      mode: "bot",
      last_message_at: nowIso,
      subject: pathname ? `Started on ${pathname}` : null,
    } as any)
    .select("id")
    .single();

  if (cErr || !convo) return json({ error: "Conversation create failed", details: cErr?.message }, 500);

  return json({
    conversation_id: convo.id,
    account_id: site.account_id,
    site_id: site.id,
    visitor_id: visitor.id,
  });
});
