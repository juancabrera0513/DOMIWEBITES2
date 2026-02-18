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
  const accountId = String(body?.account_id || "").trim();
  const status = String(body?.status || "").trim(); 

  if (!accountId) return json({ error: "account_id required" }, 400);
  if (!["online", "away", "offline"].includes(status)) {
    return json({ error: "status must be online|away|offline" }, 400);
  }

  const userId = userData.user.id;

  const admin = createClient(supabaseUrl, serviceKey);

  const { data: member, error: memErr } = await admin
    .from("account_users")
    .select("account_id, user_id, role")
    .eq("account_id", accountId)
    .eq("user_id", userId)
    .maybeSingle();

  if (memErr) return json({ error: "Membership check failed", details: memErr.message }, 500);
  if (!member) return json({ error: "Not a member of this account" }, 403);

  const now = new Date().toISOString();
  const { error: pErr } = await admin.from("presence").upsert(
    {
      account_id: accountId,
      user_id: userId,
      status,
      last_seen_at: now,
      updated_at: now,
    },
    { onConflict: "account_id,user_id" }
  );

  if (pErr) return json({ error: "Presence upsert failed", details: pErr.message }, 500);

  return json({ ok: true, account_id: accountId, user_id: userId, status });
});
