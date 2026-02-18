import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

const CHAT_CLOSE_URL =
  "https://anyngvsepgjsvilmafhl.functions.supabase.co/chat-close";

function timeAgo(iso) {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

async function closeChat(conversationId) {
  const ok = window.confirm("Close this chat?");
  if (!ok) return;

  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  if (!token) throw new Error("No session token. Please login again.");

  const r = await fetch(CHAT_CLOSE_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ conversation_id: conversationId }),
  });

  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j?.error || "Close failed");
  return j;
}

export default function AdminInbox() {
  const nav = useNavigate();

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState("");
  const [convos, setConvos] = useState([]);

  const [activeId, setActiveId] = useState("");
  const activeConvo = useMemo(
    () => convos.find((c) => c.id === activeId) || null,
    [convos, activeId]
  );

  const [msgs, setMsgs] = useState([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [msgsError, setMsgsError] = useState("");

  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  const bottomRef = useRef(null);
  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, []);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoadingUser(true);
      const { data, error } = await supabase.auth.getUser();
      if (!mounted) return;

      if (error || !data?.user) {
        setUser(null);
        setLoadingUser(false);
        nav("/admin/login");
        return;
      }

      setUser(data.user);
      setLoadingUser(false);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      const u = session?.user || null;
      setUser(u);
      if (!u) nav("/admin/login");
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [nav]);

  const loadConvos = useCallback(async () => {
    if (!user?.id) return;

    setLoadingList(true);
    setListError("");

    try {
      const { data, error } = await supabase
        .from("conversations")
        .select(
          "id, created_at, last_message_at, status, mode, assigned_to, subject, visitor_id, account_id, site_id"
        )
        .eq("status", "open")
        .in("mode", ["waiting_agent", "live"])
        .order("last_message_at", { ascending: false, nullsFirst: false })
        .limit(50);

      if (error) throw error;

      const uid = user.id;
      const filtered = (data || []).filter((c) => {
        if (c.mode === "waiting_agent") return true;
        if (c.mode === "live") return !c.assigned_to || c.assigned_to === uid;
        return false;
      });

      setConvos(filtered);

      if (activeId && !filtered.some((c) => c.id === activeId)) {
        setActiveId("");
        setMsgs([]);
      }
    } catch (e) {
      setListError(e?.message || String(e));
    } finally {
      setLoadingList(false);
    }
  }, [user?.id, activeId]);

  const loadMessages = useCallback(
    async (conversationId) => {
      if (!conversationId) return;

      setLoadingMsgs(true);
      setMsgsError("");

      try {
        const { data, error } = await supabase
          .from("messages")
          .select("id, created_at, role, content")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true })
          .limit(300);

        if (error) throw error;

        setMsgs(data || []);
        scrollToBottom();
      } catch (e) {
        setMsgsError(e?.message || String(e));
        setMsgs([]);
      } finally {
        setLoadingMsgs(false);
      }
    },
    [scrollToBottom]
  );

  useEffect(() => {
    if (!user?.id) return;
    loadConvos();
  }, [user?.id, loadConvos]);

  useEffect(() => {
    if (!activeId) return;
    loadMessages(activeId);
  }, [activeId, loadMessages]);

  /**
   * REALTIME
   * - channel A: conversations list (waiting/live changes)
   * - channel B: messages for active conversation only (super fast)
   */
  useEffect(() => {
    if (!user?.id) return;

    const listCh = supabase.channel("admin-inbox:conversations");

    listCh.on(
      "postgres_changes",
      { event: "*", schema: "public", table: "conversations" },
      () => {
        loadConvos();
      }
    );

    listCh.subscribe();

    return () => {
      supabase.removeChannel(listCh);
    };
  }, [user?.id, loadConvos]);

  useEffect(() => {
    if (!user?.id) return;

    if (!activeId) return;

    const msgCh = supabase.channel(`admin-inbox:messages:${activeId}`);

    msgCh.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `conversation_id=eq.${activeId}`,
      },
      (payload) => {
        const row = payload?.new;
        if (!row?.id) return;

        setMsgs((prev) => {
          if (prev.some((m) => m.id === row.id)) return prev;
          return [...prev, row];
        });

        scrollToBottom();
        loadConvos();
      }
    );

    msgCh.subscribe();

    return () => {
      supabase.removeChannel(msgCh);
    };
  }, [user?.id, activeId, loadConvos, scrollToBottom]);

  const acceptChat = useCallback(
    async (c) => {
      if (!user?.id || !c?.id) return;

      const ok = window.confirm("Accept this chat and go LIVE?");
      if (!ok) return;

      setListError("");
      try {
        const { data, error } = await supabase
          .from("conversations")
          .update({ mode: "live", assigned_to: user.id })
          .eq("id", c.id)
          .eq("mode", "waiting_agent")
          .is("assigned_to", null)
          .select("id")
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Chat already accepted (or state changed).");

        setActiveId(c.id);
        await loadConvos();
      } catch (e) {
        setListError(e?.message || String(e));
        await loadConvos();
      }
    },
    [user?.id, loadConvos]
  );

  const sendAgentMessage = useCallback(async () => {
    if (!activeConvo?.id) return;
    if (activeConvo.mode !== "live") return;

    const text = draft.trim();
    if (!text) return;

    setSending(true);
    setMsgsError("");

    try {
      const { error } = await supabase.from("messages").insert({
        conversation_id: activeConvo.id,
        account_id: activeConvo.account_id,
        role: "agent",
        content: text,
        meta: {},
      });

      if (error) throw error;

      setDraft("");
    } catch (e) {
      setMsgsError(e?.message || String(e));
    } finally {
      setSending(false);
    }
  }, [activeConvo, draft]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    nav("/admin/login");
  }, [nav]);

  const waitingCount = useMemo(
    () => convos.filter((c) => c.mode === "waiting_agent").length,
    [convos]
  );
  const liveCount = useMemo(
    () => convos.filter((c) => c.mode === "live").length,
    [convos]
  );

  if (loadingUser) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/80">
        Loading admin…
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
        <aside className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-white">Admin Inbox</h1>
              <p className="mt-1 text-sm text-white/60">
                Logged in: {user?.email || "—"}
              </p>
              <p className="mt-2 text-xs text-white/40">
                waiting: {waitingCount} • live: {liveCount}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={loadConvos}
                className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/90 hover:bg-white/10"
              >
                Refresh
              </button>
              <button
                onClick={signOut}
                className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/90 hover:bg-white/10"
              >
                Sign out
              </button>
            </div>
          </div>

          {listError ? (
            <div className="mt-4 text-sm text-red-300">{listError}</div>
          ) : null}

          <div className="mt-5 space-y-3">
            {loadingList ? (
              <div className="text-white/60 text-sm">Loading chats…</div>
            ) : null}
            {!loadingList && convos.length === 0 ? (
              <div className="text-white/60 text-sm">
                No waiting/live chats yet.
              </div>
            ) : null}

            {convos.map((c) => {
              const isActive = c.id === activeId;
              const isWaiting = c.mode === "waiting_agent";
              const isLive = c.mode === "live";
              const mine = !!c.assigned_to && c.assigned_to === user?.id;

              return (
                <div
                  key={c.id}
                  className={[
                    "rounded-2xl border p-4 transition",
                    isActive
                      ? "border-white/30 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => setActiveId(c.id)}
                      className="text-left flex-1"
                      title={c.id}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={[
                            "text-xs font-bold px-2 py-1 rounded-full border",
                            isWaiting
                              ? "border-amber-300/30 text-amber-200 bg-amber-400/10"
                              : "border-emerald-300/30 text-emerald-200 bg-emerald-400/10",
                          ].join(" ")}
                        >
                          {isWaiting ? "WAITING" : "LIVE"}
                        </span>
                        {isLive && mine ? (
                          <span className="text-xs text-white/70">
                            assigned to you
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-2 text-sm text-white/80 break-all">
                        {c.subject ? c.subject : c.id}
                      </div>
                      <div className="mt-2 text-xs text-white/50">
                        {timeAgo(c.last_message_at || c.created_at)}
                      </div>
                      <div className="mt-2 text-xs text-white/40">
                        assigned_to:{" "}
                        {c.assigned_to
                          ? String(c.assigned_to).slice(0, 8) + "…"
                          : "—"}
                      </div>
                    </button>

                    {isWaiting ? (
                      <button
                        onClick={() => acceptChat(c)}
                        className="shrink-0 px-3 py-2 rounded-xl bg-emerald-500/15 text-emerald-200 border border-emerald-300/20 hover:bg-emerald-500/25"
                      >
                        Accept
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

        <main className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5 min-h-[70vh] flex flex-col">
          {!activeConvo ? (
            <div className="text-white/70 text-lg">Select a conversation.</div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-white font-semibold">Conversation</div>
                  <div className="mt-1 text-xs text-white/50 break-all">
                    {activeConvo.id}
                  </div>
                  <div className="mt-2 text-xs text-white/60">
                    mode:{" "}
                    <span className="text-white/80 font-semibold">
                      {activeConvo.mode}
                    </span>{" "}
                    • status:{" "}
                    <span className="text-white/80 font-semibold">
                      {activeConvo.status}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => loadMessages(activeConvo.id)}
                    className="px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-white/90 hover:bg-white/10"
                  >
                    Refresh messages
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        await closeChat(activeConvo.id);
                        await loadConvos();
                        setActiveId("");
                        setMsgs([]);
                        setDraft("");
                      } catch (e) {
                        alert(e?.message || String(e));
                      }
                    }}
                    className="px-3 py-2 rounded-xl border border-red-300/20 bg-red-500/10 text-red-100 hover:bg-red-500/20"
                  >
                    Close chat
                  </button>
                </div>
              </div>

              <div className="mt-4 flex-1 overflow-auto rounded-2xl border border-white/10 bg-black/20 p-4">
                {loadingMsgs ? (
                  <div className="text-white/60 text-sm">Loading messages…</div>
                ) : null}
                {msgsError ? (
                  <div className="text-sm text-red-300">{msgsError}</div>
                ) : null}
                {!loadingMsgs && msgs.length === 0 ? (
                  <div className="text-white/60 text-sm">No messages yet.</div>
                ) : null}

                <div className="space-y-3">
                  {msgs.map((m) => {
                    const mine = m.role === "agent";
                    const isBot = m.role === "bot";
                    return (
                      <div
                        key={m.id}
                        className={[
                          "max-w-[85%] rounded-2xl px-4 py-3 border",
                          mine
                            ? "ml-auto bg-emerald-500/10 border-emerald-300/20 text-emerald-50"
                            : isBot
                            ? "bg-sky-500/10 border-sky-300/20 text-sky-50"
                            : "bg-white/5 border-white/10 text-white",
                        ].join(" ")}
                      >
                        <div className="text-xs opacity-70 flex items-center justify-between gap-3">
                          <span className="font-semibold">
                            {m.role === "visitor"
                              ? "Visitor"
                              : m.role === "agent"
                              ? "Agent"
                              : "Bot"}
                          </span>
                          <span>{new Date(m.created_at).toLocaleString()}</span>
                        </div>
                        <div className="mt-2 text-sm whitespace-pre-wrap">
                          {m.content}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendAgentMessage();
                    }
                  }}
                  placeholder={
                    activeConvo.mode === "live"
                      ? "Type a message…"
                      : "Accept the chat to go live…"
                  }
                  disabled={sending || activeConvo.mode !== "live"}
                  className="flex-1 rounded-2xl px-4 py-3 bg-black/20 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-white/25 disabled:opacity-60"
                />
                <button
                  onClick={sendAgentMessage}
                  disabled={sending || activeConvo.mode !== "live" || !draft.trim()}
                  className="px-4 py-3 rounded-2xl border border-white/10 bg-white/10 text-white hover:bg-white/15 disabled:opacity-50"
                >
                  {sending ? "Sending…" : "Send"}
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
