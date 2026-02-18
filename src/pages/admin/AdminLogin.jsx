import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function AdminLogin() {
  const nav = useNavigate();
  const loc = useLocation();

  const from = useMemo(() => loc.state?.from || "/admin/inbox", [loc.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;
      nav(from, { replace: true });
    } catch (e2) {
      setErr(e2?.message || String(e2));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
        <h1 className="text-2xl font-semibold text-white">Admin Login</h1>
        <p className="mt-1 text-sm text-white/60">Sign in to manage live chats.</p>

        {err ? <div className="mt-4 text-sm text-red-300">{err}</div> : null}

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-2xl px-4 py-3 bg-black/20 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-white/25"
            autoComplete="email"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full rounded-2xl px-4 py-3 bg-black/20 border border-white/10 text-white placeholder:text-white/40 outline-none focus:border-white/25"
            autoComplete="current-password"
          />

          <button
            disabled={busy}
            className="w-full rounded-2xl px-4 py-3 border border-white/10 bg-white/10 text-white hover:bg-white/15 disabled:opacity-60"
          >
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-xs text-white/60 flex items-center justify-between">
          <Link to="/forgot-password" className="hover:text-white">
            Forgot password?
          </Link>
          <Link to="/" className="hover:text-white">
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
