import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

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

  const DESKTOP_IMG = "/images/mockups/desktop.webp";
  const MOBILE_IMG = "/images/mockups/mobile.webp";

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
              {t("responsive_label", "Our work in action")}
            </p>

            <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
              {t("responsive_title_1", "Responsive")}{" "}
              <span className="grad-text">
                {t("responsive_title_2", "across all devices")}
              </span>
            </h3>

            <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed">
              {t(
                "responsive_desc",
                "We design mobile-first, then scale up to desktop — so your site feels premium everywhere and your users never struggle to navigate."
              )}
            </p>

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
            <div className="glass rounded-3xl border border-white/10 p-4 md:p-5 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <div className="h-10 bg-white/5 flex items-center px-4 gap-2 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-[12px] text-white/55 truncate">
                    {t("responsive_bar", "Live preview")}
                  </span>
                </div>

                <div className="relative aspect-[16/10] bg-black">
                  <img
                    src={DESKTOP_IMG}
                    alt={t("responsive_desktop_alt", "Desktop website preview")}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 left-6 sm:left-10 md:left-14">
              <div className="glass rounded-[2.5rem] border border-white/10 p-3 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
                <div className="relative w-[190px] sm:w-[210px] md:w-[230px] aspect-[9/19] rounded-[2.2rem] bg-black overflow-hidden border border-white/10">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-2xl z-10 border border-white/10" />
                  <img
                    src={MOBILE_IMG}
                    alt={t("responsive_mobile_alt", "Mobile website preview")}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full orb bg-[rgba(34,211,238,.18)]" />
            <div className="pointer-events-none absolute -bottom-16 -left-12 h-52 w-52 rounded-full orb bg-[rgba(167,139,250,.16)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
