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

  const CALENDLY = "https://calendly.com/domiwebsites/website-consultation";
  const WHATS = "https://wa.me/13143769667";

  const services = [
    {
      k: "websites",
      path: "/web-design-st-louis",
      icon: "🌐",
      title: t("s_websites_title", "Websites that bring inquiries"),
      desc: t(
        "s_websites_desc",
        "Modern, fast websites built to turn visitors into calls, forms, and bookings."
      ),
      bullets: [
        t("s_websites_b1", "Looks professional on phones and computers."),
        t("s_websites_b2", "Built to help local customers find you."),
        t("s_websites_b3", "Clear buttons to call, message, book, or request a quote."),
      ],
    },
    {
      k: "redesign",
      path: "/website-redesign-st-louis",
      icon: "✨",
      title: t("s_redesign_title", "Website redesigns"),
      desc: t(
        "s_redesign_desc",
        "If your current site feels outdated or doesn’t convert, we redesign it with a clean, modern system."
      ),
      bullets: [
        t("s_redesign_b1", "A fresh look with a simpler layout."),
        t("s_redesign_b2", "Reviews and proof placed where customers need them."),
        t("s_redesign_b3", "A clear next step on every important page."),
      ],
    },
    {
      k: "systems",
      path: "/customer-follow-up-tools",
      icon: "🧩",
      title: t("s_systems_title", "Customer follow-up tools"),
      desc: t(
        "s_systems_desc",
        "Keep new inquiries organized, send reminders, and respond faster without adding more daily work."
      ),
      bullets: [
        t("s_systems_b1", "Keep every inquiry in one organized place."),
        t("s_systems_b2", "Automatic messages, notifications, and reminders."),
        t("s_systems_b3", "Less repetitive work and fewer missed opportunities."),
      ],
    },
    {
      k: "custom",
      path: "/custom-business-tools",
      icon: "⚙️",
      title: t("s_custom_title", "Tools made for your business"),
      desc: t(
        "s_custom_desc",
        "When off-the-shelf apps no longer fit, we build a private tool around the way your team works."
      ),
      bullets: [
        t("s_custom_b1", "Private workspaces for your team or customers."),
        t("s_custom_b2", "Keep jobs, customers, and information together."),
        t("s_custom_b3", "Easy to expand as your business grows."),
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

          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            {t("title", "Practical tools built to")}{" "}
            <span className="grad-text">{t("title_grad", "help your business grow")}</span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed">
            {t(
              "sub",
              "Websites and business tools that help you get more inquiries, respond faster, and stay organized."
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
              <Link
                to={s.path}
                className="inline-flex mt-5 text-sm font-semibold text-cyan-300 hover:underline underline-offset-4"
              >
                Explore {s.title}
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-14 grid lg:grid-cols-2 gap-8 items-center">
  <div className="reveal">

    <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
      A website that helps your business{" "}
      <span className="grad-text">
        get more leads and run smoother
      </span>
    </h3>

    <div className="mt-4 flex flex-wrap gap-2">
      <Pill>Looks professional</Pill>
      <Pill>Loads fast</Pill>
      <Pill>Shows up on Google</Pill>
      <Pill>Easy for customers to contact you</Pill>
    </div>

    <div className="mt-6 flex flex-col sm:flex-row gap-3">
      <Link
        to="/work"
        className="btn btn-outline w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
      >
        See more work
      </Link>

      <Link
        to="/contact"
        className="btn btn-primary w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
      >
        Start a Project
      </Link>
    </div>
  </div>

  <div className="relative reveal">
    <div className="glass rounded-3xl border border-white/10 p-6 md:p-7 shadow-[0_40px_120px_rgba(0,0,0,.65)]">
      <div className="text-white font-semibold text-lg">
        Not just a website
      </div>
      <div className="mt-1 text-sm text-white/60">
        This is a system for your business.
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        <MiniPoint
          title="Brings you leads"
          desc="Clear structure designed to generate calls and messages."
        />
        <MiniPoint
          title="Builds trust"
          desc="Professional design that makes your business look legit."
        />
        <MiniPoint
          title="Saves you time"
          desc="Forms, automatic follow-up, and organized information."
        />
        <MiniPoint
          title="Grows with you"
          desc="Add booking, customer tracking, or a private workspace later."
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
