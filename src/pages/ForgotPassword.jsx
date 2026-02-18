import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setMsg("");

    try {
      const redirectTo = `${window.location.origin}/set-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
      if (error) throw error;
      setMsg("Password reset email sent. Check your inbox.");
    } catch (e2) {
      setErr(e2?.message || String(e2));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
        <h1 className="text-2xl font-semibold text-white">Reset password</h1>
        <p className="mt-1 text-sm text-white/60">We’ll email you a reset link.</p>

        {err ? <div className="mt-4 text-sm text-red-300">{err}</div> : null}
        {msg ? <div className="mt-4 text-sm text-emerald-200">{msg}</div> : null}

        <form onSubmit={submit} className="mt-5 space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-2xl px-4 py-3 bg-black/20 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-white/25"
            autoComplete="email"
          />

          <button
            disabled={busy}
            className="w-full rounded-2xl px-4 py-3 border border-white/10 bg-white/10 text-white hover:bg-white/15 disabled:opacity-60"
          >
            {busy ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <div className="mt-4 text-xs text-white/60 flex items-center justify-between">
          <Link to="/admin/login" className="hover:text-white">
            Back to login
          </Link>
          <Link to="/" className="hover:text-white">
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
