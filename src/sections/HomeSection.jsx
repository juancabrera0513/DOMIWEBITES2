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
        <div className="absolute inset-0 -z-10 opacity-25 pointer-events-none">
          <video className="w-full h-full object-cover" autoPlay muted loop playsInline poster="/hero-mini-480.mp4">
            <source src="/domi-websites-hero-video.webm" type="video/webm" />
            <source src="/hero-mini-480.webm" type="video/webm" />
            <source src="/hero-mini-480.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div ref={heroRef} className="reveal grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                {t("h1", "Websites that turn {{highlight}} into clients.", {
                  highlight: t("highlight", "clicks"),
                })}
              </h1>
              <p className="mt-3 text-lg text-slate-700">
                {t("sub", "We build fast, modern sites for small businesses—designed to rank and convert.")}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip"><span className="dot" /> {t("common:badges.fast", "72h Delivery")}</span>
                <span className="chip chip-amber"><span className="dot dot-amber" /> {t("common:badges.seo", "SEO & Speed Optimized")}</span>
                <span className="chip"><span className="dot" /> {t("common:badges.reviews", "8+ Client Testimonials")}</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href={CALENDLY} className="btn btn-primary btn-lg btn-shine bounce">
                  {t("common:cta.book", "Free Consultation")}
                </a>
                <a href={WHATS} className="btn btn-wa btn-ico btn-lg btn-shine bounce">
                  💬 {t("common:cta.whatsapp", "WhatsApp")}
                </a>
                <button type="button" onClick={() => setOpen(true)} className="btn btn-ghost btn-lg">
                  {t("common:cta.contactModal", "Contact form")}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="glass p-4 md:p-6 hover-lift">
                <img src="/DomiLogoAnt.webp" alt="Domi Websites preview" className="w-full h-auto rounded-xl" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal open={open} setOpen={setOpen} />
    </>
  );
}
