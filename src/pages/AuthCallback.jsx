import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const nav = useNavigate();
  const [msg, setMsg] = useState("Finishing sign-in…");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setMsg("Signed in. Redirecting…");
        setTimeout(() => nav("/admin/inbox", { replace: true }), 500);
      } else {
        setMsg("No session found. Redirecting to login…");
        setTimeout(() => nav("/admin/login", { replace: true }), 800);
      }
    })();
  }, [nav]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white/80">
      {msg}
    </div>
  );
}
