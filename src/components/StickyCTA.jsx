// src/components/StickyCTA.jsx
import React from "react";
import { useTranslation } from "react-i18next";
const CALENDLY = "https://calendly.com/domiwebsites/30min";
const WHATS = "https://wa.me/13143769667";

export default function StickyCTA() {
  const { t } = useTranslation(["common"]);
  return (
    <div className="fixed bottom-4 left-0 right-0 z-40 md:hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass p-2 flex items-center gap-2">
          <a href={CALENDLY} className="btn-primary flex-1 btn-sm">{t("cta.book")}</a>
          <a href={WHATS} className="btn-wa btn-ico flex-1 btn-sm">💬 {t("cta.whatsapp")}</a>
          <button className="btn-ghost flex-1 btn-sm" onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}>
            {t("common:cta.contactModal")}
          </button>
        </div>
      </div>
    </div>
  );
}
