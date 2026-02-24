import React, { useEffect, useMemo, useState } from "react";

const CONSENT_KEY = "domi_cookie_consent_v1";


function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function readConsent() {
  const raw = localStorage.getItem(CONSENT_KEY);
  const parsed = raw ? safeParse(raw) : null;
  const consent = parsed?.consent;
  if (consent === "granted" || consent === "denied") return consent;
  return null;
}

function writeConsent(consent) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({
      consent, 
      ts: Date.now(),
      v: 1,
    })
  );
}

function gtagConsentUpdate(consent) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  const status = consent === "granted" ? "granted" : "denied";

  window.gtag("consent", "update", {
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
    analytics_storage: status,
    functionality_storage: "granted",
    security_storage: "granted",
  });

  if (status === "granted") {
    window.gtag("set", "ads_data_redaction", false);
  }
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  const links = useMemo(
    () => [
      { href: "/privacy", label: "Privacy Policy" },
    ],
    []
  );

  useEffect(() => {
    const saved = readConsent();
    if (!saved) {
      setShow(true);
      return;
    }
    gtagConsentUpdate(saved);
    setShow(false);
  }, []);

  const accept = () => {
    writeConsent("granted");
    gtagConsentUpdate("granted");
    setShow(false);
  };

  const decline = () => {
    writeConsent("denied");
    gtagConsentUpdate("denied");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[9999] px-4 pb-4">
      <div className="mx-auto max-w-4xl">
        <div className="glass border border-white/10 rounded-2xl p-4 md:p-5 shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-white/80 leading-relaxed">
              <div className="text-white font-semibold mb-1">We use cookies</div>
              <p className="text-sm md:text-[15px]">
                We use cookies to improve site performance, measure traffic, and
                run ads. You can accept or decline non-essential cookies.{" "}
                {links.map((l, idx) => (
                  <React.Fragment key={l.href}>
                    <a href={l.href} className="underline text-cyan-300">
                      {l.label}
                    </a>
                    {idx < links.length - 1 ? " • " : ""}
                  </React.Fragment>
                ))}
                .
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center">
              <button
                onClick={decline}
                className="px-4 py-2 rounded-xl border border-white/15 text-white/80 hover:text-white hover:border-white/25 transition"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold hover:opacity-90 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>

        <p className="mt-2 text-[11px] text-white/40 text-center">
          You can change your choice anytime by clearing site data in your
          browser.
        </p>
      </div>
    </div>
  );
}