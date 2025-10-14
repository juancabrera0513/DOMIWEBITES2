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
        <div
          className="glass rounded-2xl p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-lg"
          role="region"
          aria-label="Quick actions"
        >
          {/*
            - Por defecto: 2 columnas (mejor para textos largos)
            - Desde 370px: 3 columnas
          */}
          <div className="grid grid-cols-2 min-[370px]:grid-cols-3 gap-1">
            {/* Calendly */}
            <a
              href={CALENDLY}
              className="btn btn-primary btn-sm w-full min-w-0 truncate text-[13px] leading-tight rounded-full"
            >
              {/* Abrevia en <=320px */}
              <span className="max-[320px]:hidden">{t("cta.book", "Free Consultation")}</span>
              <span className="min-[321px]:hidden">{t("cta.book", "Free Consultation").split(" ")[0]}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={WHATS}
              className="btn btn-wa btn-ico btn-sm w-full min-w-0 truncate text-[13px] leading-tight rounded-full"
              aria-label="WhatsApp"
            >
              {/* En muy angosto solo el ícono; desde 321px muestra texto */}
              <span className="min-[321px]:hidden">💬</span>
              <span className="max-[320px]:hidden">💬 {t("cta.whatsapp", "WhatsApp")}</span>
            </a>

            {/* Contacto: en 2-cols ocupa toda la fila; en 3-cols es una columna normal */}
            <button
              type="button"
              className="btn btn-ghost btn-sm w-full min-w-0 truncate text-[13px] leading-tight rounded-full col-span-2 min-[370px]:col-span-1"
              onClick={() => window.dispatchEvent(new Event("open-contact-modal"))}
            >
              <span className="max-[320px]:hidden">{t("common:cta.contactModal", "Contact form")}</span>
              <span className="min-[321px]:hidden">{t("common:cta.contactModal", "Contact").split(" ")[0]}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
