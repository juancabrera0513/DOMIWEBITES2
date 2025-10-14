// src/sections/AboutSection.jsx
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const CALENDLY = "https://calendly.com/domiwebsites/30min";
const WHATS = "https://wa.me/13143769667";

export default function AboutSection() {
  const { t } = useTranslation(["about", "common"]);
  const rootRef = useRef(null);

  // Animación simple al entrar en viewport
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const FEATURES = [
    { k: "f1", icon: "⚡", title: t("f1t", "Speed-First"), desc: t("f1d") },
    { k: "f2", icon: "📍", title: t("f2t", "Local SEO"), desc: t("f2d") },
    { k: "f3", icon: "🤝", title: t("f3t", "Hands-On Support"), desc: t("f3d") },
  ];

  const STATS = [
    { k: "s1", icon: "🚀", title: t("s1t", "Fast launch"), desc: t("s1d") },
    { k: "s2", icon: "📈", title: t("s2t", "Rank & convert"), desc: t("s2d") },
    { k: "s3", icon: "🧩", title: t("s3t", "Built to grow"), desc: t("s3d") },
  ];

  const PROCESS = [
    { k: "p1", step: "01", title: t("p1t", "Discover"), desc: t("p1d") },
    { k: "p2", step: "02", title: t("p2t", "Design"), desc: t("p2d") },
    { k: "p3", step: "03", title: t("p3t", "Build"), desc: t("p3d") },
    { k: "p4", step: "04", title: t("p4t", "Launch"), desc: t("p4d") },
  ];

  return (
    <section id="about" className="section">
      <div className="max-w-6xl mx-auto px-4" ref={rootRef}>
        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold">{t("title", "About Domi Websites")}</h2>
          <p className="text-slate-700 mt-3">{t("desc")}</p>
          <div className="mt-3">
            <span className="chip chip-amber">{t("sub")}</span>
          </div>
        </div>

        {/* What clients value (stats) */}
        <div className="mt-10">
          <h3 className="text-center font-extrabold text-xl">{t("stats_title", "What clients value")}</h3>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STATS.map((s, i) => (
              <article
                key={s.k}
                className="reveal card p-5 hover:-translate-y-1 hover:shadow-xl transition-all"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl select-none">{s.icon}</span>
                  <div>
                    <h4 className="font-bold">{s.title}</h4>
                    <p className="text-sm text-slate-700 mt-1">{s.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <article
              key={f.k}
              className="reveal card p-6 hover:-translate-y-1 hover:shadow-xl transition-all"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl select-none">{f.icon}</span>
                <div>
                  <h4 className="font-bold">{f.title}</h4>
                  <p className="text-slate-700 mt-1">{f.desc}</p>
                </div>
              </div>

              {/* micro-bullets para “valor” */}
              <ul className="mt-4 text-sm text-slate-700 space-y-2">
                {f.k === "f1" && (
                  <>
                    <li className="flex items-center gap-2"><span className="dot" /> Core Web Vitals</li>
                    <li className="flex items-center gap-2"><span className="dot" /> Optimized media</li>
                  </>
                )}
                {f.k === "f2" && (
                  <>
                    <li className="flex items-center gap-2"><span className="dot" /> Service & location pages</li>
                    <li className="flex items-center gap-2"><span className="dot" /> On-page structure</li>
                  </>
                )}
                {f.k === "f3" && (
                  <>
                    <li className="flex items-center gap-2"><span className="dot" /> Updates & backups</li>
                    <li className="flex items-center gap-2"><span className="dot" /> Small monthly edits</li>
                  </>
                )}
              </ul>
            </article>
          ))}
        </div>

        {/* Process / Timeline */}
        <div className="mt-12">
          <h3 className="text-center font-extrabold text-xl">{t("process_title", "How we work")}</h3>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {PROCESS.map((p, i) => (
              <article
                key={p.k}
                className="reveal card p-5 text-center md:text-left hover:-translate-y-1 hover:shadow-xl transition-all"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex md:block items-center justify-center md:justify-start gap-3">
                  <span className="chip">{p.step}</span>
                  <h4 className="font-bold">{p.title}</h4>
                </div>
                <p className="text-slate-700 mt-2">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-12 glass p-6 rounded-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-extrabold">{t("cta_title", "Ready to move?")}</h4>
              <p className="text-slate-700 mt-1">{t("cta_desc", "Book a quick intro or message us on WhatsApp. We reply fast.")}</p>
              <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="chip"><span className="dot" /> {t("common:badges.fast", "72h Delivery")}</span>
                <span className="chip chip-amber"><span className="dot dot-amber" /> {t("common:badges.seo", "SEO & Speed")}</span>
                <span className="chip"><span className="dot" /> {t("common:badges.reviews", "8+ Client Testimonials")}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <a href={CALENDLY} className="btn btn-primary btn-lg btn-shine">
                {t("cta_primary", t("common:cta.book", "Free Consultation"))}
              </a>
              <a href={WHATS} className="btn btn-wa btn-ico btn-lg btn-shine">
                💬 {t("cta_secondary", t("common:cta.whatsapp", "WhatsApp"))}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
