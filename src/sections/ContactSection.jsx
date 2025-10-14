import React from "react";
import { useTranslation } from "react-i18next";

const CALENDLY = "https://calendly.com/domiwebsites/30min";
const WHATS = "https://wa.me/13143769667";

export default function ContactSection(){
  const { t } = useTranslation(["contact","common"]);

  const openModal = () => window.dispatchEvent(new Event("open-contact-modal"));

  return (
    <section id="contact" className="section">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="card p-8 lg:col-span-2">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {t("contact:title")}
            </h2>
            <p className="text-slate-700 mt-2">{t("contact:sub")}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <a href={CALENDLY} className="btn-primary btn-lg">{t("common:cta.book")}</a>
              <a href={WHATS} className="btn-wa btn-ico btn-lg">
                <WAIcon /> {t("common:cta.whatsapp")}
              </a>
              <button className="btn-ghost btn-lg" onClick={openModal}>
                {t("contact:open_form")}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="chip"><span className="dot" /> 72h Delivery</span>
              <span className="chip chip-amber"><span className="dot dot-amber" /> SEO & Speed</span>
              <span className="chip"><span className="dot" /> Client Testimonials</span>
            </div>
          </div>

          <div className="card p-8">
            <h3 className="text-xl font-bold mb-3">Direct</h3>
            <ul className="space-y-2 text-slate-700">
              <li>📞 <a className="underline" href="tel:+13143769667">314-376-9667</a></li>
              <li>💬 <a className="underline" href={WHATS}>WhatsApp</a></li>
              <li>📍 St. Louis, MO</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function WAIcon(){
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-[1.05rem] w-[1.05rem]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.5 0 .18 5.31.18 11.87a11.7 11.7 0 0 0 1.65 6.01L0 24l6.3-1.82a11.87 11.87 0 0 0 5.76 1.48h.01c6.56 0 11.88-5.31 11.88-11.87a11.8 11.8 0 0 0-3.41-8.31Z"/>
      <path d="M12.06 21.3c-1.99 0-3.92-.53-5.62-1.54l-.4-.24-3.74 1.08 1-3.64-.26-.37A9.85 9.85 0 0 1 2.82 11.9c0-5.1 4.14-9.24 9.24-9.24 2.47 0 4.79.96 6.54 2.7a9.2 9.2 0 0 1 2.71 6.53c0 5.1-4.15 9.24-9.25 9.24Z" fill="none"/>
    </svg>
  );
}
