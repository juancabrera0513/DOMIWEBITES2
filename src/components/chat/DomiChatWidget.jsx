import React, { useEffect, useMemo, useRef, useState } from "react";

const CHAT_ICON_SRC = "/chat-icon.png";

function uid() {
  return `v_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

function normalizePhoneForWhatsApp(phone) {
  const digits = String(phone || "").replace(/[^\d]/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return digits;
  return digits;
}

function buildWhatsAppLink(phone, text) {
  const p = normalizePhoneForWhatsApp(phone);
  const msg = encodeURIComponent(text || "");
  return `https://wa.me/${p}?text=${msg}`;
}

function buildMailto(email, subject, body) {
  const s = encodeURIComponent(subject || "");
  const b = encodeURIComponent(body || "");
  return `mailto:${email}?subject=${s}&body=${b}`;
}

const DOMI = {
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
    sun: null,
  },
};

function isWithinBusinessHours(now = new Date()) {
  const day = now.getDay(); 
  const hour = now.getHours();
  const map = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const key = map[day];
  const range = DOMI.hours[key];
  if (!range) return false;
  const [start, end] = range;
  return hour >= start && hour < end;
}


function renderMessageContent(raw = "") {
  const text = String(raw || "");

  const re =
    /((https?:\/\/[^\s]+)|(\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b)|(\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}))/gi;

  const nodes = [];
  let lastIndex = 0;
  let match;

  while ((match = re.exec(text)) !== null) {
    const full = match[0];
    const index = match.index;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    const lower = full.toLowerCase();

    if (lower.startsWith("http://") || lower.startsWith("https://")) {
      nodes.push(
        <a
          key={`url_${index}`}
          href={full}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-300 underline underline-offset-2 hover:text-sky-200 transition"
        >
          {full}
        </a>
      );
    }
    else if (full.includes("@")) {
      nodes.push(
        <a
          key={`mail_${index}`}
          href={`mailto:${full}`}
          className="text-sky-300 underline underline-offset-2 hover:text-sky-200 transition"
        >
          {full}
        </a>
      );
    }
    else {
      const digits = full.replace(/[^\d]/g, "");
      const domiDigits = DOMI.phone.replace(/[^\d]/g, ""); 

      if (digits.endsWith(domiDigits)) {
        const wa = buildWhatsAppLink(DOMI.phone, "Hi Domi Websites — I have a quick question.");
        nodes.push(
          <a
            key={`wa_${index}`}
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-300 underline underline-offset-2 hover:text-emerald-200 transition"
            title="Message on WhatsApp"
          >
            {full}
          </a>
        );
      } else {
        const tel = digits.length === 10 ? `+1${digits}` : `+${digits}`;
        nodes.push(
          <a
            key={`tel_${index}`}
            href={`tel:${tel}`}
            className="text-sky-300 underline underline-offset-2 hover:text-sky-200 transition"
            title="Call / Text"
          >
            {full}
          </a>
        );
      }
    }

    lastIndex = index + full.length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return nodes.length ? nodes : text;
}

export default function DomiChatWidget({ pathname = "/" }) {
  const [open, setOpen] = useState(false);

  const [visitorId] = useState(() => {
    try {
      const key = "domi_ai_visitor_id_v1";
      const existing = localStorage.getItem(key);
      if (existing) return existing;
      const created = uid();
      localStorage.setItem(key, created);
      return created;
    } catch {
      return uid();
    }
  });

  const [conversationId, setConversationId] = useState("");
  const [messages, setMessages] = useState([
    { id: "seed", role: "bot", content: "Hi! I’m Domi AI. How can I help today?" },
  ]);

  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [closed, setClosed] = useState(false);

  const listRef = useRef(null);
  const startedRef = useRef(false);

  const pollRef = useRef(null);
  const cursorRef = useRef(null);
  const seenIdsRef = useRef(new Set(["seed"]));

  const [showHint, setShowHint] = useState(false);
  const hintTimer1Ref = useRef(null);
  const hintTimer2Ref = useRef(null);
  const HINT_FLAG = "domi_ai_hint_shown_v2";

  const MAX_LEN = 1500;

  const hintText = useMemo(() => {
    if (pathname.startsWith("/pricing")) return { title: "Questions about plans?", subtitle: "Ask Domi AI" };
    if (pathname.startsWith("/services")) return { title: "Need help choosing a service?", subtitle: "Ask Domi AI" };
    if (pathname.startsWith("/work")) return { title: "Want a site like this?", subtitle: "Ask Domi AI" };
    if (pathname.startsWith("/contact")) return { title: "Want quick answers?", subtitle: "Chat with Domi AI" };
    return { title: "Free Consultation?", subtitle: "Ask Domi AI" };
  }, [pathname]);

  const FUNCTIONS_BASE = process.env.REACT_APP_SUPABASE_FUNCTIONS_BASE;
  const SITE_KEY = process.env.REACT_APP_DOMI_CHAT_SITE_KEY;
  const DOMI_SECRET = process.env.REACT_APP_DOMI_CHAT_SHARED_SECRET;

  const CHAT_START_URL = `${FUNCTIONS_BASE}/chat-start`;
  const CHAT_SEND_URL = `${FUNCTIONS_BASE}/chat-send`;
  const CHAT_MESSAGES_URL = `${FUNCTIONS_BASE}/chat-messages`;

  const headers = useMemo(
    () => ({
      "content-type": "application/json",
      "x-site-key": SITE_KEY || "",
      "x-domi-secret": DOMI_SECRET || "",
    }),
    [SITE_KEY, DOMI_SECRET]
  );

  function assertEnv() {
    if (!FUNCTIONS_BASE) throw new Error("Missing REACT_APP_SUPABASE_FUNCTIONS_BASE");
    if (!SITE_KEY) throw new Error("Missing REACT_APP_DOMI_CHAT_SITE_KEY");
    if (!DOMI_SECRET) throw new Error("Missing REACT_APP_DOMI_CHAT_SHARED_SECRET");
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    });
  }

  function addIncoming(incoming = []) {
    if (!Array.isArray(incoming) || incoming.length === 0) return;

    setMessages((prev) => {
      const merged = [...prev];
      for (const m of incoming) {
        if (!m?.id) continue;
        if (seenIdsRef.current.has(m.id)) continue;
        seenIdsRef.current.add(m.id);

        merged.push({
          id: m.id,
          role: m.role,
          content: m.content || "",
          created_at: m.created_at || null,
        });
      }
      return merged;
    });
  }

  function replaceTmpIfNeeded(tmpId, realMsg) {
    if (!tmpId || !realMsg?.id) return;
    setMessages((prev) =>
      prev.map((m) => (m.id === tmpId ? { ...m, id: realMsg.id, created_at: realMsg.created_at } : m))
    );
    seenIdsRef.current.add(realMsg.id);
  }

  async function startChat() {
    assertEnv();

    setBusy(true);
    setClosed(false);

    const r = await fetch(CHAT_START_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        visitor_external_id: visitorId,
        user_agent: navigator.userAgent,
        referrer: document.referrer || window.location.href,
        pathname: pathname || "/",
      }),
    });

    const j = await r.json().catch(() => ({}));
    setBusy(false);

    if (!r.ok) throw new Error(j?.error || "chat-start failed");

    cursorRef.current = null;
    setConversationId(j.conversation_id);
  }

  async function fetchNewMessages({ bootstrap = false } = {}) {
    if (!conversationId) return;

    assertEnv();

    const payload = { conversation_id: conversationId, limit: 100 };
    if (!bootstrap && cursorRef.current) payload.after = cursorRef.current;

    const r = await fetch(CHAT_MESSAGES_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j?.error || "chat-messages failed");

    addIncoming(j.messages || []);
    if (j?.cursor) cursorRef.current = j.cursor;
  }

  useEffect(() => {
    if (!open) return;

    scrollToBottom();

    if (conversationId) return;
    if (startedRef.current) return;

    startedRef.current = true;

    startChat()
      .then(() => scrollToBottom())
      .catch((e) => {
        startedRef.current = false;
        setMessages((m) => [
          ...m,
          { id: `sys_${Date.now()}`, role: "system", content: String(e?.message || e) },
        ]);
      });
  }, [open, conversationId, pathname]);

  useEffect(() => {
    if (!open) return;
    scrollToBottom();
  }, [open, messages.length]);

  useEffect(() => {
    if (!open || !conversationId) return;

    fetchNewMessages({ bootstrap: true }).catch((e) => {
      setMessages((m) => [
        ...m,
        { id: `sys_${Date.now()}`, role: "system", content: String(e?.message || e) },
      ]);
    });

    pollRef.current = setInterval(() => {
      if (busy) return;
      fetchNewMessages().catch(() => {});
    }, 1800);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = null;
    };
  }, [open, conversationId, busy]);

  useEffect(() => {
    if (open) return;

    let already = false;
    try {
      already = sessionStorage.getItem(HINT_FLAG) === "1";
    } catch {
      already = true;
    }
    if (already) return;

    hintTimer1Ref.current = setTimeout(() => {
      setShowHint(true);
      try {
        sessionStorage.setItem(HINT_FLAG, "1");
      } catch {}

      hintTimer2Ref.current = setTimeout(() => setShowHint(false), 8000);
    }, 4000);

    return () => {
      if (hintTimer1Ref.current) clearTimeout(hintTimer1Ref.current);
      if (hintTimer2Ref.current) clearTimeout(hintTimer2Ref.current);
      hintTimer1Ref.current = null;
      hintTimer2Ref.current = null;
    };
  }, [open]);

  async function sendText(text, { source = "typed" } = {}) {
    const content = String(text || "").trim();
    if (!content || !conversationId || busy || closed) return;

    if (content.length > MAX_LEN) {
      setMessages((m) => [
        ...m,
        { id: `sys_${Date.now()}`, role: "system", content: `Message too long (max ${MAX_LEN} chars).` },
      ]);
      return;
    }

    assertEnv();

    const tmpId = `tmp_${Date.now()}`;
    seenIdsRef.current.add(tmpId);
    setMessages((m) => [...m, { id: tmpId, role: "visitor", content }]);
    setBusy(true);
    setDraft("");

    const r = await fetch(CHAT_SEND_URL, {
      method: "POST",
      headers,
      body: JSON.stringify({
        conversation_id: conversationId,
        message: content,
        meta: { source, pathname },
      }),
    });

    const j = await r.json().catch(() => ({}));
    setBusy(false);

    if (!r.ok) {
      setMessages((m) => [
        ...m,
        { id: `sys_${Date.now()}`, role: "system", content: j?.error || "Send failed" },
      ]);
      return;
    }

    if (j.closed) {
      setClosed(true);
      if (j.visitor_message?.id) replaceTmpIfNeeded(tmpId, j.visitor_message);

      const botText = j.reply || "This chat is closed. Please start a new chat.";
      const botId = j.bot_message?.id || `bot_${Date.now()}`;
      if (!seenIdsRef.current.has(botId)) {
        seenIdsRef.current.add(botId);
        setMessages((m) => [
          ...m,
          { id: botId, role: "bot", content: botText, created_at: j.bot_message?.created_at || null },
        ]);
      }
      if (j.cursor) cursorRef.current = j.cursor;
      return;
    }

    if (j.visitor_message?.id) replaceTmpIfNeeded(tmpId, j.visitor_message);

    if (j.bot_message?.id) {
      if (!seenIdsRef.current.has(j.bot_message.id)) {
        seenIdsRef.current.add(j.bot_message.id);
        setMessages((m) => [
          ...m,
          {
            id: j.bot_message.id,
            role: "bot",
            content: j.reply || j.bot_message.content || "",
            created_at: j.bot_message.created_at || null,
          },
        ]);
      }
      if (j.cursor) cursorRef.current = j.cursor;
      return;
    }

    if (j.reply) {
      const botId = `bot_${Date.now()}`;
      seenIdsRef.current.add(botId);
      setMessages((m) => [...m, { id: botId, role: "bot", content: j.reply }]);
    }

    if (j.cursor) cursorRef.current = j.cursor;

    fetchNewMessages().catch(() => {});
  }

  function send() {
    const text = draft.trim();
    if (!text) return;
    return sendText(text, { source: "typed" });
  }

  function startNewChat() {
    startedRef.current = false;
    cursorRef.current = null;
    seenIdsRef.current = new Set(["seed"]);

    setMessages([{ id: "seed", role: "bot", content: "Hi! I’m Domi AI. How can I help today?" }]);
    setConversationId("");
    setClosed(false);
  }

  const canSend = open && !closed && !busy && !!draft.trim() && !!conversationId;
  const outsideHours = !isWithinBusinessHours(new Date());

  function handleWhatsApp() {
    const prefill = "Hi Domi Websites — I’d like help with a website / software project.";
    window.open(buildWhatsAppLink(DOMI.phone, prefill), "_blank", "noopener,noreferrer");
  }

  function handleEmail() {
    const subject = "Project inquiry — Domi Websites";
    const body =
      "Hi Domi Websites,\n\nI’d like help with:\n\n- Business name:\n- What I need (website / software / chatbot / SEO):\n- Timeline:\n- Budget range:\n\nThanks!";
    window.location.href = buildMailto(DOMI.email, subject, body);
  }

  return (
    <div className="fixed right-5 bottom-5 z-[9999]">
      {!open ? (
        <div className="relative">
          <div
            className={cx(
              "absolute bottom-[110px] right-0 w-[240px] md:w-[260px] pointer-events-none",
              "transition-all duration-300",
              showHint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
          >
            <div className="relative rounded-2xl border border-white/10 bg-black/55 backdrop-blur-xl shadow-2xl px-4 py-3">
              <div className="text-sm font-semibold text-white">{hintText.title}</div>
              <div className="mt-0.5 text-xs text-white/70">{hintText.subtitle}</div>
              <span className="absolute -bottom-2 right-6 h-4 w-4 rotate-45 bg-black/55 border-r border-b border-white/10" />
            </div>
          </div>

          <button
            onClick={() => {
              setShowHint(false);
              setOpen(true);
            }}
            className="relative h-[92px] w-[92px] md:h-[112px] md:w-[112px] transition-transform hover:scale-105"
            aria-label="Open chat"
            title="Chat"
          >
            <span
              className="absolute -inset-6 rounded-full blur-2xl opacity-70 pointer-events-none
              bg-[radial-gradient(circle_at_30%_30%,rgba(56,189,248,.45),transparent_55%),
                   radial-gradient(circle_at_70%_30%,rgba(168,85,247,.35),transparent_60%),
                   radial-gradient(circle_at_50%_85%,rgba(34,197,94,.25),transparent_62%)]"
            />

            <img src={CHAT_ICON_SRC} alt="Domi AI" className="relative h-full w-full object-contain" draggable="false" />

            <span
              className="absolute bottom-3 right-3 h-3.5 w-3.5 rounded-full
              bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.65)] border border-black/40"
            />
          </button>
        </div>
      ) : (
        <div className="w-[390px] max-w-[92vw] overflow-hidden rounded-3xl border border-white/10 bg-black/45 backdrop-blur-xl shadow-2xl">
          <div className="relative px-4 py-3 border-b border-white/10">
            <div className="absolute inset-0 pointer-events-none opacity-70 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,.18),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,.16),transparent_55%)]" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={CHAT_ICON_SRC}
                  alt="Domi AI"
                  className="h-12 w-12 rounded-2xl border border-white/10 bg-white/5 object-contain p-1"
                />
                <div>
                  <div className="text-base font-semibold text-white leading-tight">Domi AI</div>
                  <div className="text-[11px] text-white/60">
                    {closed ? "Chat closed" : busy ? "Thinking…" : "Online bot • agent on request"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="h-10 w-10 rounded-2xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition grid place-items-center"
                aria-label="Close chat"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          <div ref={listRef} className="px-4 py-4 h-[420px] overflow-auto space-y-3">
            {messages.map((m) => {
              const isVisitor = m.role === "visitor";
              const isBot = m.role === "bot";
              const isAgent = m.role === "agent";
              const isSystem = m.role === "system";

              return (
                <div
                  key={m.id}
                  className={cx(
                    "max-w-[88%] rounded-2xl px-4 py-3 border",
                    isVisitor && "ml-auto bg-emerald-500/10 border-emerald-300/25 text-emerald-50",
                    isBot && "bg-sky-500/10 border-sky-300/25 text-sky-50",
                    isAgent && "bg-purple-500/10 border-purple-300/25 text-purple-50",
                    isSystem && "bg-white/5 border-white/10 text-white/80"
                  )}
                >
                  <div className="text-[11px] opacity-70 font-semibold">
                    {isVisitor ? "You" : isBot ? "Domi AI" : isAgent ? "Agent" : "System"}
                  </div>

                  <div className="mt-1 text-sm whitespace-pre-wrap">{renderMessageContent(m.content)}</div>

                  {m.id === "seed" && (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        className="rounded-full px-3 py-1.5 text-xs border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition"
                      >
                        WhatsApp/Text
                      </button>
                      <button
                        type="button"
                        onClick={handleEmail}
                        className="rounded-full px-3 py-1.5 text-xs border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition"
                      >
                        Email
                      </button>
                      <a
                        href={DOMI.calendly}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full px-3 py-1.5 text-xs border border-white/10 bg-white/5 text-white/85 hover:bg-white/10 transition"
                      >
                        Book
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="px-4 py-4 border-t border-white/10">
            {outsideHours && (
              <div className="mb-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[12px] text-white/70">
                <div className="font-semibold text-white/80">We’re currently outside business hours.</div>
                <div className="mt-0.5">Text us anytime — we’ll reply ASAP.</div>
                <div className="mt-1 text-white/50">Mon–Fri 9 AM–6 PM • Sat 9 AM–12 PM • Sun Closed</div>
              </div>
            )}

            {closed ? (
              <button
                onClick={startNewChat}
                className="w-full rounded-2xl px-4 py-3 border border-white/10 bg-white/10 text-white hover:bg-white/15 transition"
              >
                Start new chat
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  placeholder={busy ? "…" : "Type your message…"}
                  className="flex-1 rounded-2xl px-4 py-3 bg-black/30 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-white/25"
                />
                <button
                  onClick={send}
                  disabled={!canSend}
                  className={cx(
                    "rounded-2xl px-4 py-3 border border-white/10 transition",
                    canSend ? "bg-white/10 text-white hover:bg-white/15" : "bg-white/5 text-white/40"
                  )}
                >
                  Send
                </button>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-[11px] text-white/45">
              <span>Powered by Domi AI</span>
              <span />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
