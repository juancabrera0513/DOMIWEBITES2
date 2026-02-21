import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function corsHeaders(extra: Record<string, string> = {}) {
  return {
    "content-type": "application/json; charset=utf-8",
    "access-control-allow-origin": "*",
    "access-control-allow-headers": "content-type, x-site-key, x-domi-secret",
    "access-control-allow-methods": "POST, OPTIONS",
    ...extra,
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

function getClientIp(req: Request): string {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();

  return "";
}

async function sha256Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sendResendEmail(params: {
  to: string;
  from: string;
  subject: string;
  html: string;
}) {
  const apiKey = Deno.env.get("RESEND_API_KEY") || "";
  if (!apiKey) throw new Error("Missing env: RESEND_API_KEY");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      to: params.to,
      from: params.from,
      subject: params.subject,
      html: params.html,
    }),
  });

  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j as any)?.message || "Resend send failed");
  return j;
}

Deno.serve(async (req) => {
  try {
    if (req.method === "OPTIONS") return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders() });
    if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

    const shared = req.headers.get("x-domi-secret") || "";
    const expected = Deno.env.get("DOMI_AI_SHARED_SECRET") || "";
    
   
    if (!expected || shared !== expected) {
      return json(
        {
          error: "Unauthorized",
          debug: {
            expectedLen: (expected || "").length,
            sharedLen: (shared || "").length,
            hasSiteKey: !!req.headers.get("x-site-key"),
          },
        },
        401
      );
    }
    const siteKey = req.headers.get("x-site-key") || "";
    if (!siteKey) return json({ error: "Missing x-site-key" }, 400);

    const body = await req.json().catch(() => null);
    if (!body) return json({ error: "Invalid JSON" }, 400);

    const eventType = String(body?.event_type || "").trim();
    const pathname = String(body?.pathname || "").slice(0, 200) || null;
    const referrer = String(body?.referrer || "").slice(0, 500) || null;

    const externalId = String(body?.visitor_external_id || "").trim();
    if (!externalId) return json({ error: "visitor_external_id required" }, 400);

    if (!eventType) return json({ error: "event_type required" }, 400);

    const conversationId = body?.conversation_id ? String(body.conversation_id).trim() : null;

    const meta = (body?.meta && typeof body.meta === "object") ? body.meta : {};
    const ua = String(body?.user_agent || req.headers.get("user-agent") || "").slice(0, 500);
    const cfCountry = (req.headers.get("cf-ipcountry") || "").slice(0, 8) || null;

    const ip = getClientIp(req);
    const ipHash = ip ? await sha256Hex(ip) : null;

    const supabaseUrl = mustEnv("SUPABASE_URL");
    const serviceKey =
      Deno.env.get("SERVICE_ROLE_KEY") ||
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ||
      "";
    if (!serviceKey) return json({ error: "Missing env: SERVICE_ROLE_KEY" }, 500);

    const sb = createClient(supabaseUrl, serviceKey);

    const { data: site, error: siteErr } = await sb
      .from("sites")
      .select("id, account_id, is_active, name")
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
          referrer: referrer || null,
          ip_hash: ipHash,
        },
        { onConflict: "site_id,external_id" }
      )
      .select("id")
      .single();

    if (vErr || !visitor) return json({ error: "Visitor upsert failed", details: vErr?.message }, 500);

    const { error: eErr } = await sb.from("visitor_events").insert({
      site_id: site.id,
      visitor_id: visitor.id,
      conversation_id: conversationId,
      event_type: eventType,
      pathname,
      referrer,
      meta: {
        ...meta,
        country: meta?.country || cfCountry,
      },
    });

    if (eErr) return json({ error: "Event insert failed", details: eErr.message }, 500);

    if (eventType === "chat_opened" || eventType === "agent_requested") {
      const to = Deno.env.get("NOTIFY_EMAIL_TO") || "admin@domiwebsites.com";
      const from = Deno.env.get("RESEND_FROM") || "Domi AI <no-reply@domiwebsites.com>";
      const adminUrl = Deno.env.get("ADMIN_INBOX_URL") || "";

      const subject =
        eventType === "chat_opened"
          ? `New chat opened (${site.name || "site"})`
          : `Live agent requested (${site.name || "site"})`;

      const when = new Date().toISOString();
      const html = `
        <div style="font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;line-height:1.5">
          <h2 style="margin:0 0 12px">${subject}</h2>
          <p style="margin:0 0 8px"><b>Site:</b> ${site.name || site.id}</p>
          <p style="margin:0 0 8px"><b>Event:</b> ${eventType}</p>
          <p style="margin:0 0 8px"><b>Page:</b> ${pathname || "-"}</p>
          <p style="margin:0 0 8px"><b>Visitor:</b> ${externalId}</p>
          <p style="margin:0 0 8px"><b>Country:</b> ${cfCountry || "-"}</p>
          <p style="margin:0 0 8px"><b>Time:</b> ${when}</p>
          ${
            conversationId
              ? `<p style="margin:0 0 8px"><b>Conversation:</b> ${conversationId}</p>`
              : ""
          }
          ${
            adminUrl
              ? `<p style="margin-top:16px"><a href="${adminUrl}" target="_blank" rel="noreferrer">Open Admin Inbox</a></p>`
              : ""
          }
        </div>
      `;

      await sendResendEmail({ to, from, subject, html });
    }

    return json({ ok: true });
  } catch (e) {
    return json({ error: String(e?.message || e) }, 500);
  }
});