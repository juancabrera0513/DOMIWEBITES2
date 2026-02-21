import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "content-type, x-domi-secret",
      "access-control-allow-methods": "POST, OPTIONS",
    },
  });
}

function mustEnv(name: string) {
  const v = Deno.env.get(name);
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

type OpenAIRole = "system" | "user" | "assistant";
type Msg = { role: OpenAIRole; content: string };

const DOMI = {
  company: "Domi Websites",
  city: "St. Louis, MO",
  tz: "America/Chicago",
  phone: "(314) 376-9667",
  email: "admin@domiwebsites.com",
  calendly: "https://calendly.com/domiwebsites/30min",
  hours: {
    mon: [9, 18],
    tue: [9, 18],
    wed: [9, 18],
    thu: [9, 18],
    fri: [9, 18],
    sat: [9, 12],
    sun: null as null | [number, number],
  },
};

function getStlParts(now = new Date()) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: DOMI.tz,
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  });

  const parts = dtf.formatToParts(now);
  const weekday = (parts.find((p) => p.type === "weekday")?.value || "").toLowerCase();
  const hourStr = parts.find((p) => p.type === "hour")?.value || "";
  const hour = Number(hourStr);

  return { weekday, hour: Number.isFinite(hour) ? hour : now.getUTCHours() };
}

function isWithinBusinessHoursSTL(now = new Date()) {
  const { weekday, hour } = getStlParts(now);
  const map: Record<string, keyof typeof DOMI.hours> = {
    sun: "sun",
    mon: "mon",
    tue: "tue",
    wed: "wed",
    thu: "thu",
    fri: "fri",
    sat: "sat",
  };

  const key = map[weekday.slice(0, 3)] || "mon";
  const range = DOMI.hours[key];
  if (!range) return false;

  const [start, end] = range;
  return hour >= start && hour < end;
}

function isSpanish(text: string) {
  const t = (text || "").toLowerCase();
  return (
    /[áéíóúñ¿¡]/i.test(text) ||
    t.includes("hola") ||
    t.includes("buenas") ||
    t.includes("precio") ||
    t.includes("cuanto") ||
    t.includes("equipo de ventas") ||
    t.includes("contactar")
  );
}

function detectPurchaseSignals(text: string, pathname: string) {
  const t = `${pathname} ${text}`.toLowerCase();

  const strong =
    t.includes("ready") ||
    t.includes("get started") ||
    t.includes("start a project") ||
    t.includes("quote") ||
    t.includes("estimate") ||
    t.includes("budget") ||
    t.includes("timeline") ||
    t.includes("hire") ||
    t.includes("book") ||
    t.includes("calendly") ||
    t.includes("contract") ||
    t.includes("retainer") ||
    t.includes("pricing") ||
    t.includes("how much") ||
    t.includes("cost") ||
    t.includes("price") ||
    t.includes("cotizacion") ||
    t.includes("cotizar") ||
    t.includes("presupuesto") ||
    t.includes("precio") ||
    t.includes("cuanto cuesta") ||
    t.includes("/pricing");

  const askHuman =
    t.includes("sales") ||
    t.includes("equipo de ventas") ||
    t.includes("representative") ||
    t.includes("live agent") ||
    t.includes("talk to a human") ||
    t.includes("hablar con alguien") ||
    t.includes("humano") ||
    t.includes("agente") ||
    t.includes("contactar") ||
    t.includes("contact") ||
    t.includes("call me") ||
    t.includes("agent");

  return { strong, askHuman };
}

function isContactQuestion(text: string) {
  const t = (text || "").toLowerCase();
  return (
    t.includes("contact") ||
    t.includes("how can i contact") ||
    t.includes("how do i contact") ||
    t.includes("contactar") ||
    t.includes("como puedo contactar") ||
    t.includes("hablar con alguien") ||
    t.includes("sales team") ||
    t.includes("equipo de ventas") ||
    t.includes("representative") ||
    t.includes("agente") ||
    t.includes("agent")
  );
}

function systemPrompt(pathname: string, lang: "es" | "en", withinHours: boolean) {
  const baseFacts = `
BUSINESS FACTS (must be accurate):
- Company: ${DOMI.company}
- Location: ${DOMI.city} (serving local businesses)
- Phone / WhatsApp / Text: ${DOMI.phone}
- Email: ${DOMI.email}
- Booking: ${DOMI.calendly}
- Hours: Mon–Fri 9 AM–6 PM, Sat 9 AM–12 PM, Sun Closed (St. Louis time)
- We are NOT only websites: we do custom software + systems.

KNOWN PRICING (do not invent):
- Performance Website: starting at $1,500
- Website + Systems: custom scope (quote after discovery)
- Ongoing Growth: monthly retainer (quote after discovery)
SEO: scoped based on goals/competition; can be part of a plan or quoted separately. DO NOT invent ranges.
`.trim();

  const hoursRuleEn = withinHours
    ? `If the user explicitly asks for a person/agent, you may set request_live_agent=true.`
    : `We are currently OUTSIDE business hours. Do NOT say you will connect them to a live agent now. Instead: tell them we're closed, share WhatsApp/Text + Email + Booking, and say we'll reply ASAP during business hours. request_live_agent MUST be false while closed.`;

  const hoursRuleEs = withinHours
    ? `Si el usuario pide explícitamente agente/persona/ventas, puedes marcar request_live_agent=true.`
    : `Ahora mismo estamos FUERA de horario. NO digas que lo conectarás con un agente en vivo ahora. En su lugar: di que estamos cerrados, comparte WhatsApp/Text + Email + Calendly, y que responderemos ASAP en horario. request_live_agent DEBE ser false mientras estemos cerrados.`;

  const rulesEn = `
You are "Domi AI" for Domi Websites.
Be conversational, smart, and natural. Do not sound scripted.

CRITICAL RULES:
1) Answer the user's LAST message directly. Never reset the conversation.
2) Do NOT repeat the same answer twice. If user repeats, expand slightly with NEW helpful info.
3) Keep it concise (2–6 sentences). Ask at most ONE follow-up question.
4) If user asks how to contact someone / sales team / agent:
   Immediately give WhatsApp/Text, Email, and Booking link. No questions first.
5) Never guarantee "#1 on Google". Explain briefly + what you can control (local SEO, technical SEO, content, tracking).
6) If asked about a game:
   If it’s a web-based game, say YES you can build it as a web app and ask ONE scope question (platform/features).
7) If there are purchase signals (pricing, timeline, ready to start, quote):
   Offer to connect them with a person *inside this chat* OR give WhatsApp/Text + Email + Calendly.
   Only set request_live_agent=true when they explicitly ask for a person/agent or sales.
8) ${hoursRuleEn}

Current page pathname: "${pathname || "/"}"
`.trim();

  const rulesEs = `
Eres "Domi AI" para Domi Websites.
Responde natural, inteligente, sin sonar como robot.

REGLAS CRÍTICAS:
1) Responde a lo ÚLTIMO que dijo el usuario. Nunca “reinicies” la conversación.
2) No repitas la misma respuesta dos veces. Si repite, agrega info nueva.
3) Sé conciso (2–6 oraciones). Máximo UNA pregunta de seguimiento.
4) Si preguntan cómo contactar / equipo de ventas / agente:
   Da inmediatamente WhatsApp/Text, Email y link de Calendly. Sin preguntar primero.
5) Nunca garantices "#1 en Google". Explica breve + qué sí controlas (local SEO, técnico, contenido, tracking).
6) Si piden un juego:
   Si es webapp, di que SÍ lo puedes construir y pregunta UNA cosa de alcance.
7) Si hay intención de compra (precio, timeline, cotizar, listo para empezar):
   Ofrece conectar con una persona *en este mismo chat* o dar WhatsApp/Email/Calendly.
   Solo marca request_live_agent=true si el usuario pide explícitamente agente/persona/ventas.
8) ${hoursRuleEs}

Página actual: "${pathname || "/"}"
`.trim();

  return `${lang === "es" ? rulesEs : rulesEn}\n\n${baseFacts}`.trim();
}

function mapDbRoleToOpenAI(role: string): OpenAIRole | null {
  if (role === "visitor") return "user";
  if (role === "bot" || role === "agent") return "assistant";
  return null;
}

async function openaiChat(messages: Msg[]) {
  const apiKey = mustEnv("OPENAI_API_KEY");

  const r = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      temperature: 0.35,
      max_tokens: 380,
      messages,
    }),
  });

  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error((j as any)?.error?.message || "OpenAI error");

  const text = (j as any)?.choices?.[0]?.message?.content || "";
  return String(text).trim();
}

function contactReply(lang: "es" | "en", withinHours: boolean) {
  if (lang === "es") {
    if (!withinHours) {
      return `Ahora mismo estamos fuera de horario (hora de St. Louis). Puedes escribirnos y te respondemos ASAP:\n\n• WhatsApp/Text: ${DOMI.phone}\n• Email: ${DOMI.email}\n• Agenda 30 min: ${DOMI.calendly}\n\nHorario: Lun–Vie 9 AM–6 PM • Sáb 9 AM–12 PM • Dom cerrado.`;
    }
    return `Puedes contactarnos así:\n\n• WhatsApp/Text: ${DOMI.phone}\n• Email: ${DOMI.email}\n• Agenda 30 min: ${DOMI.calendly}\n\nSi quieres, dime “agente” y te conecto con una persona aquí mismo en el chat.`;
  }

  if (!withinHours) {
    return `We’re currently outside business hours (St. Louis time). Message us anytime and we’ll reply ASAP:\n\n• WhatsApp/Text: ${DOMI.phone}\n• Email: ${DOMI.email}\n• Book 30 min: ${DOMI.calendly}\n\nHours: Mon–Fri 9 AM–6 PM • Sat 9 AM–12 PM • Sun closed.`;
  }

  return `You can reach us here:\n\n• WhatsApp/Text: ${DOMI.phone}\n• Email: ${DOMI.email}\n• Book 30 min: ${DOMI.calendly}\n\nIf you want, say “agent” and I’ll connect you with a person right here in this chat.`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return json({ ok: true });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const shared = req.headers.get("x-domi-secret") || "";
  const expected = Deno.env.get("DOMI_AI_SHARED_SECRET") || "";
  if (!expected || shared !== expected) return json({ error: "Unauthorized" }, 401);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const message = String(body?.message || "").trim();
  const conversationId = String(body?.conversation_id || "").trim();
  const pathname = String(body?.pathname || "").trim();

  if (!message) return json({ error: "message required" }, 400);

  const lang: "es" | "en" = isSpanish(message) ? "es" : "en";
  const withinHours = isWithinBusinessHoursSTL(new Date());

  if (isContactQuestion(message)) {
    const reply = contactReply(lang, withinHours);
    const { askHuman } = detectPurchaseSignals(message, pathname);
    return json({ reply, request_live_agent: withinHours ? askHuman : false });
  }

  const supabaseUrl = mustEnv("SUPABASE_URL");
  const serviceKey = Deno.env.get("SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  if (!serviceKey) return json({ error: "Missing env: SERVICE_ROLE_KEY" }, 500);

  const sb = createClient(supabaseUrl, serviceKey);

  let history: Msg[] = [];
  if (conversationId) {
    const { data, error } = await sb
      .from("messages")
      .select("role, content, created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .limit(18);

    if (!error && data?.length) {
      history = data
        .map((m) => {
          const role = mapDbRoleToOpenAI(String(m.role || ""));
          if (!role) return null;
          return { role, content: String(m.content || "") } as Msg;
        })
        .filter(Boolean) as Msg[];
    }
  }

  const { strong, askHuman } = detectPurchaseSignals(message, pathname);

  const purchaseNudge =
    strong && !askHuman
      ? lang === "es"
        ? `Si detectas intención de compra, ofrece conectar con una persona aquí en el chat o dar WhatsApp/Email/Calendly, pero no fuerces.`
        : `If you detect purchase intent, offer to connect them with a person in this chat or provide WhatsApp/Email/Calendly, but don’t force it.`
      : "";

  const msgs: Msg[] = [
    { role: "system", content: systemPrompt(pathname, lang, withinHours) + (purchaseNudge ? `\n\n${purchaseNudge}` : "") },
    ...history.slice(-12),
    { role: "user", content: message },
  ];

  let reply = "";
  try {
    reply = await openaiChat(msgs);
  } catch (e) {
    return json({ error: "AI failed", details: String(e) }, 500);
  }

  return json({
    reply,
    request_live_agent: withinHours ? askHuman : false,
  });
});