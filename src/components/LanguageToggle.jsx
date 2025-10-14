import React from "react";
import { useTranslation } from "react-i18next";

export default function LanguageToggle({ compact = false }) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.toLowerCase().startsWith("es") ? "es" : "en";

  const setLang = (l) => {
    try { localStorage.setItem("lang", l); } catch {}
    i18n.changeLanguage(l);
  };

  // tamaños
  const pad = compact ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-[13px]";

  const base =
    "font-medium transition rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300";

  const active =
    "text-white shadow-sm bg-gradient-to-r from-sky-500 to-indigo-500";

  const idle = "text-slate-700 hover:bg-slate-50";

  return (
    <div
      className="inline-flex items-center rounded-full border border-slate-200 bg-white shadow-sm"
      role="group"
      aria-label="Language selector"
    >
      <button
        type="button"
        onClick={() => setLang("en")}
        className={`${pad} ${base} ${lang === "en" ? active : idle}`}
        aria-pressed={lang === "en"}
        title="English"
      >
        🇺🇸 EN
      </button>
      <button
        type="button"
        onClick={() => setLang("es")}
        className={`${pad} ${base} ${lang === "es" ? active : idle}`}
        aria-pressed={lang === "es"}
        title="Español"
      >
        🇪🇸 ES
      </button>
    </div>
  );
}
