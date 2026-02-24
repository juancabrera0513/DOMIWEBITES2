import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const CONSENT_KEY = "domi_cookie_consent_v1";
const VISITOR_KEY = "domi_ai_visitor_id_v1";
const SESSION_KEY = "domi_session_id_v1";

function uid(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getConsent() {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    const parsed = raw ? safeParse(raw) : null;
    const consent = parsed?.consent;
    return consent === "granted" || consent === "denied" ? consent : null;
  } catch {
    return null;
  }
}

function getOrCreate(key, make, storage) {
  try {
    const v = storage.getItem(key);
    if (v) return v;
    const created = make();
    storage.setItem(key, created);
    return created;
  } catch {
    return make();
  }
}

export default function useDomiTracker() {
  const loc = useLocation();

  const FUNCTIONS_BASE = process.env.REACT_APP_SUPABASE_FUNCTIONS_BASE;
  const SITE_KEY = process.env.REACT_APP_DOMI_CHAT_SITE_KEY;
  const DOMI_SECRET = process.env.REACT_APP_DOMI_CHAT_SHARED_SECRET;

  const TRACK_URL = `${FUNCTIONS_BASE}/track`;

  const sessionId = useMemo(() => {
    return getOrCreate(SESSION_KEY, () => uid("s"), sessionStorage);
  }, []);

  const [consent, setConsent] = useState(() => getConsent());

  useEffect(() => {
    const onUpdate = () => setConsent(getConsent());

    window.addEventListener("domi-consent-updated", onUpdate);
    window.addEventListener("storage", onUpdate);

    return () => {
      window.removeEventListener("domi-consent-updated", onUpdate);
      window.removeEventListener("storage", onUpdate);
    };
  }, []);

  const visitorExternalId = useMemo(() => {
    if (consent !== "granted") return null;
    return getOrCreate(VISITOR_KEY, () => uid("v"), localStorage);
  }, [consent]);

  useEffect(() => {
    if (!FUNCTIONS_BASE || !SITE_KEY || !DOMI_SECRET) return;

    fetch(TRACK_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-site-key": SITE_KEY,
        "x-domi-secret": DOMI_SECRET,
      },
      body: JSON.stringify({
        visitor_external_id: visitorExternalId,
        event_type: "page_view",
        pathname: loc.pathname,
        referrer: document.referrer || null,
        meta: {
          session_id: sessionId,
          screen: `${window.innerWidth}x${window.innerHeight}`,
          tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
          consent,
        },
        user_agent: navigator.userAgent,
      }),
    }).catch(() => {});
  }, [
    loc.pathname,
    FUNCTIONS_BASE,
    SITE_KEY,
    DOMI_SECRET,
    TRACK_URL,
    visitorExternalId,
    sessionId,
    consent,
  ]);
}