import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function SetPassword() {
  const nav = useNavigate();

  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) {
      }
    })();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setOk("");

    if (pw.length < 8) return setErr("Password must be at least 8 characters.");
    if (pw !== pw2) return setErr("Passwords do not match.");

    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: pw });
      if (error) throw error;

      setOk("Password updated. Redirecting…");
      setTimeout(() => nav("/admin/login", { replace: true }), 800);
    } catch (e2) {
      setErr(e2?.message || String(e2));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
        <h1 className="text-2xl font-semibold text-white">Set new password</h1>
        <p className="mt-1 text-sm text-white/60">Choose a strong password.</p>

        {err ? <div className="mt-4 text-sm text-red-300">{err}</div> : null}
        {ok ? <div className="mt-4 text-sm text-emerald-200">{ok}</div> : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="New password"
            type="password"
            className="w-full rounded-2xl px-4 py-3 bg-black/20 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-white/25"
            autoComplete="new-password"
          />

          <input
            value={pw2}
            onChange={(e) => setPw2(e.target.value)}
            placeholder="Confirm new password"
            type="password"
            className="w-full rounded-2xl px-4 py-3 bg-black/20 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-white/25"
            autoComplete="new-password"
          />

          <button
            disabled={busy}
            className="w-full rounded-2xl px-4 py-3 border border-white/10 bg-white/10 text-white hover:bg-white/15 disabled:opacity-60"
          >
            {busy ? "Updating…" : "Update password"}
          </button>
        </form>

        <div className="mt-4 text-xs text-white/60">
          <Link to="/admin/login" className="hover:text-white">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
