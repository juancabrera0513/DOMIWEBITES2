import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function RequireAdmin({ children }) {
  const nav = useNavigate();
  const loc = useLocation();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;

      if (!data?.user) {
        nav("/admin/login", { replace: true, state: { from: loc.pathname } });
        return;
      }

      setReady(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      const u = session?.user || null;
      if (!u) nav("/admin/login", { replace: true, state: { from: loc.pathname } });
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, [nav, loc.pathname]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/80">
        Loading admin…
      </div>
    );
  }

  return children;
}
