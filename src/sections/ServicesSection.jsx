// src/sections/ServicesSection.jsx
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const CALENDLY = "https://calendly.com/domiwebsites/30min";

export default function ServicesSection() {
  const { t } = useTranslation(["services", "common"]);
  const wrapRef = useRef(null);

  // pequeña animación on-scroll
  useEffect(() => {
    const els = wrapRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Tarjetas (10) usando i18n
  const cards = [
    { k: "s1",  icon: "🎨", title: t("s1t","Web Design"),               desc: t("s1d","Modern, mobile-first layouts tailored to your brand and goals.") },
    { k: "s2",  icon: "📍", title: t("s2t","Local SEO"),                desc: t("s2d","On-page SEO and content structure to win in your service areas.") },
    { k: "s3",  icon: "🛒", title: t("s3t","E-commerce"),               desc: t("s3d","Lightweight stores with clean UX and easy checkout.") },
    { k: "s4",  icon: "🛡️", title: t("s4t","Care Plans"),              desc: t("s4d","We keep your site fast, secure, and updated month after month.") },
    { k: "s5",  icon: "🚀", title: t("s5t","Landing Pages (Ads)"),      desc: t("s5d","Ultra-fast pages for Google/Meta campaigns.") },
    { k: "s6",  icon: "⚡", title: t("s6t","Speed Optimization"),       desc: t("s6d","Core Web Vitals & instant load.") },
    { k: "s7",  icon: "📊", title: t("s7t","Analytics & Tracking"),     desc: t("s7d","GA4, GTM, events & funnels.") },
    { k: "s8",  icon: "✍️", title: t("s8t","Brand & Copy"),            desc: t("s8d","Clear messaging and tone of voice.") },
    { k: "s9",  icon: "🔗", title: t("s9t","Integrations & Automations"),desc: t("s9d","Zapier/Make, CRM, forms & webhooks.") },
    { k: "s10", icon: "🌐", title: t("s10t","Hosting Setup"),           desc: t("s10d","CDN, domains, SSL & deployment flow.") },
  ];

  const bulletA = t("bullets.rui", "Responsive UI");
  const bulletB = t("bullets.analytics", "Analytics ready");

  return (
    <section id="services" className="section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              {t("title", "Services")}
            </h2>
            <p className="text-slate-700 mt-2">
              {t("sub", "Fast results, modern design and real performance.")}
            </p>
          </div>
          <a href={CALENDLY} className="btn btn-primary btn-sm btn-shine">
            {t("common:cta.book")}
          </a>
        </div>

        {/* Grid de servicios */}
        <div ref={wrapRef} className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <article
              key={c.k}
              className="card p-5 reveal transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{c.icon}</span>
                  <h3 className="text-lg font-bold">{c.title}</h3>
                </div>
                {/* badge que aparece al hover */}
                <span className="chip chip-amber opacity-0 group-hover:opacity-100 transition">
                  +
                </span>
              </div>

              <p className="text-slate-700 mt-2">{c.desc}</p>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2">
                  <span className="dot" /> {bulletA}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="dot dot-amber" /> {bulletB}
                </span>
              </div>

              <div className="mt-5 flex gap-2">
                <a href={CALENDLY} className="btn btn-primary btn-sm btn-shine">
                  {t("cta_primary", "Get started")}
                </a>
                <a href={CALENDLY} className="btn btn-ghost btn-sm">
                  {t("cta_secondary", "Details")}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Mini CTA de cierre */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="chip"><span className="dot" /> {t("bullets.kw", "Keyword mapping")}</span>
          <span className="chip chip-amber"><span className="dot dot-amber" /> {t("bullets.schema", "Schema JSON-LD")}</span>
          <span className="chip"><span className="dot" /> {t("bullets.reports", "Monthly reports")}</span>
        </div>
      </div>
    </section>
  );
}
