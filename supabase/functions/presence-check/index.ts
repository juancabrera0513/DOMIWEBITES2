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

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SERVICE_ROLE_KEY")!;
  const sb = createClient(supabaseUrl, serviceKey);

  const { data: site } = await sb
    .from("sites")
    .select("id, account_id, is_active")
    .eq("site_key", siteKey)
    .maybeSingle();

  if (!site || !site.is_active) return json({ online: false, online_agents: [] });

  const { data: pres } = await sb
    .from("presence")
    .select("user_id, status, updated_at")
    .eq("account_id", site.account_id)
    .eq("status", "online");

  return json({ online: (pres?.length || 0) > 0, online_agents: pres || [] });
});
