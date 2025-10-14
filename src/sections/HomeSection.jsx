// src/sections/HomeSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ContactModal from "../components/ContactModal";

const CALENDLY = "https://calendly.com/domiwebsites/30min";
const WHATS = "https://wa.me/13143769667";

export default function HomeSection() {
  const { t } = useTranslation(["home", "common"]);
  const [open, setOpen] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && el.classList.add("in")),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section className="section section-hero-gradient relative overflow-hidden">
        {/* video de fondo con velo para legibilidad */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <video
            className="w-full h-full object-cover opacity-40"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-mini-480.mp4"
          >
            <source src="/domi-websites-hero-video.webm" type="video/webm" />
            <source src="/hero-mini-480.webm" type="video/webm" />
            <source src="/hero-mini-480.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/30 to-white/50" />
        </div>

        <div className="max-w-6xl mx-auto px-4">
          {/* SIEMPRE centrado */}
          <div
            ref={heroRef}
            className="reveal mx-auto flex max-w-3xl flex-col items-center text-center gap-5"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              {t("h1", "Websites that turn {{highlight}} into clients.", {
                highlight: t("highlight", "clicks"),
              })}
            </h1>

            <p className="mt-2 text-lg md:text-xl text-slate-700">
              {t(
                "sub",
                "We build fast, modern sites for small businesses—designed to rank and convert."
              )}
            </p>

            {/* badges centrados */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="chip">
                <span className="dot" /> {t("common:badges.fast", "72h Delivery")}
              </span>
              <span className="chip chip-amber">
                <span className="dot dot-amber" /> {t("common:badges.seo", "SEO & Speed Optimized")}
              </span>
              <span className="chip">
                <span className="dot" /> {t("common:badges.reviews", "8+ Client Testimonials")}
              </span>
            </div>

            {/* CTAs centrados */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={CALENDLY} className="btn btn-primary btn-lg btn-shine bounce">
                {t("common:cta.book", "Free Consultation")}
              </a>
              <a href={WHATS} className="btn btn-wa btn-ico btn-lg btn-shine bounce">
                💬 {t("common:cta.whatsapp", "WhatsApp")}
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="btn btn-ghost btn-lg"
              >
                {t("common:cta.contactModal", "Contact form")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <ContactModal open={open} setOpen={setOpen} />
    </>
  );
}
