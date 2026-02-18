import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
      {children}
    </span>
  );
}

function MiniPoint({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md p-4">
      <div className="text-white font-semibold text-sm">{title}</div>
      <div className="mt-1 text-sm text-white/60 leading-relaxed">{desc}</div>
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useTranslation(["services", "common"]);
  const rootRef = useRef(null);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const CALENDLY = "https://calendly.com/domiwebsites/30min";
  const WHATS = "https://wa.me/13143769667";

  const services = [
    {
      k: "websites",
      icon: "🌐",
      title: t("s_websites_title", "High-converting websites"),
      desc: t(
        "s_websites_desc",
        "Modern, fast websites built to turn visitors into calls, forms, and bookings."
      ),
      bullets: [
        t("s_websites_b1", "Mobile-first UX that looks premium."),
        t("s_websites_b2", "Speed + SEO foundations for local search."),
        t("s_websites_b3", "Clear CTAs: Call / WhatsApp / Book / Quote."),
      ],
    },
    {
      k: "redesign",
      icon: "✨",
      title: t("s_redesign_title", "Website redesigns"),
      desc: t(
        "s_redesign_desc",
        "If your current site feels outdated or doesn’t convert, we redesign it with a clean, modern system."
      ),
      bullets: [
        t("s_redesign_b1", "New UI, better layout, clearer messaging."),
        t("s_redesign_b2", "Fixes for trust: reviews, proof, structure."),
        t("s_redesign_b3", "Built to convert — not just look nice."),
      ],
    },
    {
      k: "systems",
      icon: "🧩",
      title: t("s_systems_title", "CRM-style systems & automation"),
      desc: t(
        "s_systems_desc",
        "Simple internal tools that help you follow up faster and run operations smoother."
      ),
      bullets: [
        t("s_systems_b1", "Lead capture + pipeline + reminders."),
        t("s_systems_b2", "Automations: notifications, forms, workflows."),
        t("s_systems_b3", "Less manual work, more consistency."),
      ],
    },
    {
      k: "custom",
      icon: "⚙️",
      title: t("s_custom_title", "Custom business software"),
      desc: t(
        "s_custom_desc",
        "When your business outgrows templates, we build custom software that fits your process."
      ),
      bullets: [
        t("s_custom_b1", "Dashboards, portals, internal apps."),
        t("s_custom_b2", "Scalable architecture for growth."),
        t("s_custom_b3", "Built like a real SaaS product."),
      ],
    },
  ];

  return (
    <section
      id="services"
      className="section relative overflow-hidden nexus-bg hero-grid"
      ref={rootRef}
    >
      <div className="hero-vignette" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/90 mb-2">
            {t("label", "Services")}
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            {t("title", "Digital systems built to")}{" "}
            <span className="grad-text">{t("title_grad", "drive growth")}</span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed">
            {t(
              "sub",
              "Websites, redesigns, automation, and CRM-style systems — built to help your business get more leads and run smoother."
            )}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CALENDLY}
              className="btn btn-primary w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
            >
              {t("common:cta.book", "Free Consultation")}
            </a>

            <a
              href={WHATS}
              className="btn btn-outline w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
            >
              {t("common:cta.whatsapp", "WhatsApp")}
            </a>
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <article
              key={s.k}
              className="reveal glass rounded-2xl border border-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,.55)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-xl">
                  <span>{s.icon}</span>
                </div>
                <h3 className="text-white font-semibold leading-tight">
                  {s.title}
                </h3>
              </div>

              <p className="mt-3 text-sm text-white/60 leading-relaxed">
                {s.desc}
              </p>

              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {s.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300/80" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-8 items-center">
          <div className="reveal">
            <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/90 mb-2">
              {t("responsive_label", "Built to scale")}
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              {t("responsive_title_1", "Mobile-first")}{" "}
              <span className="grad-text">
                {t("responsive_title_2", "— fast, clean, and conversion-ready")}
              </span>
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>{t("pill_1", "Fast loads")}</Pill>
              <Pill>{t("pill_2", "SEO-ready")}</Pill>
              <Pill>{t("pill_3", "Clear CTAs")}</Pill>
              <Pill>{t("pill_4", "SaaS-capable")}</Pill>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/work"
                className="btn btn-outline w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
              >
                {t("cta_secondary", "See more work")}
              </Link>

              <Link
                to="/contact"
                className="btn btn-primary w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
              >
                {t("cta_primary", "Start a Project")}
              </Link>
            </div>
          </div>

          <div className="relative reveal">
            <div className="glass rounded-3xl border border-white/10 p-6 md:p-7 shadow-[0_40px_120px_rgba(0,0,0,.65)]">
              <div className="text-white font-semibold text-lg">
                {t("concept_title", "A premium foundation")}
              </div>
              <div className="mt-1 text-sm text-white/60">
                {t("concept_sub", "Launch lean → scale into real software.")}
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-3">
                <MiniPoint
                  title={t("mini_1_t", "Designed to convert")}
                  desc={t("mini_1_d", "Messaging + layout built for leads.")}
                />
                <MiniPoint
                  title={t("mini_2_t", "Trust built-in")}
                  desc={t("mini_2_d", "Proof, structure, and clarity.")}
                />
                <MiniPoint
                  title={t("mini_3_t", "Automation-ready")}
                  desc={t("mini_3_d", "Forms, workflows, notifications.")}
                />
                <MiniPoint
                  title={t("mini_4_t", "Scales with you")}
                  desc={t("mini_4_d", "Portals, dashboards, CRM tools.")}
                />
              </div>
            </div>

            <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full orb bg-[rgba(34,211,238,.14)]" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-52 w-52 rounded-full orb bg-[rgba(167,139,250,.12)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
