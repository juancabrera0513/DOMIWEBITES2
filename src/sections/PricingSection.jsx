// src/sections/PricingSection.jsx
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import FAQTabs from "../components/FAQTabs";
import { faqsByCategory } from "../data/faqs";

const CALENDLY = "https://calendly.com/domiwebsites/30min";
const WHATS = "https://wa.me/13143769667";

export default function PricingSection() {
  const { t } = useTranslation(["pricing", "common"]);
  const wrapRef = useRef(null);

  useEffect(() => {
    const els = wrapRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const BUILDS = [
    {
      id: "starter",
      title: t("starter", "Starter Presence"),
      pitch: t("starter_pitch", "A clean one-page site to get online fast."),
      price: t("starter_price", "$499"),
      period: t("starter_period", "one-time"),
      features: [
        t("features.s1", "1–3 sections"),
        t("features.s2", "Mobile-first"),
        t("features.s3", "Basic SEO"),
        t("features.s4", "Contact form"),
      ],
      cta: t("starter_cta", "Start Starter"),
    },
    {
      id: "smart",
      featured: true,
      title: t("smart", "Smart Launch"),
      pitch: t("smart_pitch", "Multi-page site with services and a simple blog."),
      price: t("smart_price", "$1,299"),
      period: t("smart_period", "one-time"),
      features: [
        t("features.m1", "Up to 6 pages"),
        t("features.m2", "Blog ready"),
        t("features.m3", "On-page SEO"),
        t("features.m4", "Analytics"),
      ],
      cta: t("smart_cta", "Choose Smart"),
    },
    {
      id: "pro",
      title: t("pro", "Business Pro"),
      pitch: t("pro_pitch", "Premium UI, conversion blocks & Local SEO structure."),
      price: t("pro_price", "Custom"),
      period: t("pro_period", "quote"),
      features: [
        t("features.p1", "8–12 pages"),
        t("features.p2", "Lead magnet / E-commerce"),
        t("features.p3", "Schema JSON-LD"),
        t("features.p4", "Speed pass"),
      ],
      cta: t("pro_cta", "Choose Pro"),
    },
  ];

  const CARE = [
    {
      id: "care-lite",
      title: "Care Lite",
      price: "$49",
      period: "/ mo",
      features: ["Backups", "Security checks", "Uptime monitor", "Email support"],
      cta: "Choose Lite",
    },
    {
      id: "care-standard",
      featured: true,
      title: "Care Standard",
      price: "$99",
      period: "/ mo",
      features: ["All Lite", "Monthly updates", "Speed checks", "1 small task/mo"],
      cta: "Choose Standard",
    },
    {
      id: "care-pro",
      title: "Care Pro",
      price: "$179",
      period: "/ mo",
      features: ["All Standard", "Priority support", "2 small tasks/mo", "Quarterly report"],
      cta: "Choose Pro Care",
    },
  ];

  return (
    <section id="pricing" className="section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header centrado con 1 solo WhatsApp global */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">{t("title", "Pricing")}</h2>
          <p className="text-slate-700 mt-2">
            {t("sub", "Pick a package and we’ll tailor it to your industry.")}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <a href={WHATS} className="btn btn-wa btn-ico btn-sm btn-shine">💬 {t("common:cta.whatsapp")}</a>
            <a href={CALENDLY} className="btn btn-primary btn-sm btn-shine">{t("common:cta.book")}</a>
          </div>
        </div>

        {/* Build plans */}
        <div ref={wrapRef} className="mt-8 grid md:grid-cols-3 gap-4 items-stretch">
          {BUILDS.map((p) => (
            <article
              key={p.id}
              className={
                "card p-6 reveal flex flex-col h-full " +
                (p.featured ? "ring-1 ring-indigo-200 shadow-lg" : "")
              }
            >
              {p.featured && (
                <div className="mb-3 flex justify-center">
                  <span className="chip">Most popular</span>
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-bold text-center">{p.title}</h3>
                <p className="text-slate-700 mt-1 text-center">{p.pitch}</p>

                <div className="mt-4 select-none flex justify-center items-baseline gap-2">
                  <span className="text-3xl font-extrabold">{p.price}</span>
                  <span className="text-slate-600">/ {p.period}</span>
                </div>

                <ul className="mt-4 space-y-2 text-sm text-slate-700 max-w-xs mx-auto">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ÚNICO CTA en la card */}
              <div className="mt-auto pt-4 flex justify-center">
                <a
                  href={CALENDLY}
                  className={"btn btn-primary btn-lg btn-shine " + (p.featured ? "bounce" : "")}
                >
                  {p.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Care plans (botones alineados y 1 solo CTA por card) */}
        <div className="mt-12">
          <h3 className="text-xl font-extrabold text-center mb-4">Care Plans (monthly)</h3>
          <div className="grid md:grid-cols-3 gap-4 items-stretch">
            {CARE.map((p) => (
              <article
                key={p.id}
                className={
                  "card p-6 flex flex-col h-full " +
                  (p.featured ? "ring-1 ring-emerald-200 shadow-lg" : "")
                }
              >
                {p.featured && (
                  <div className="mb-3 flex justify-center">
                    <span className="chip chip-amber">Best value</span>
                  </div>
                )}

                <div className="flex-1">
                  <h4 className="text-lg font-bold text-center">{p.title}</h4>
                  <div className="mt-3 select-none flex justify-center items-baseline gap-2">
                    <span className="text-3xl font-extrabold">{p.price}</span>
                    <span className="text-slate-600">{p.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm text-slate-700 max-w-xs mx-auto">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 flex justify-center">
                  <a href={CALENDLY} className="btn btn-primary btn-lg btn-shine">{p.cta}</a>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-6xl mx-auto mt-12">
          <FAQTabs data={faqsByCategory} initialLimit={4} title="FAQs" />
        </div>
      </div>
    </section>
  );
}
