import React, { useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import { blogPosts } from "../data/blogPosts";

function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const els = root.querySelectorAll(".reveal");
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.22em] uppercase text-white/70">
      {children}
    </span>
  );
}

function ServiceCard({ icon, title, desc, bullets, tag }) {
  return (
    <article className="group glass rounded-2xl border border-white/10 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,.55)]">
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">
          <span aria-hidden="true">{icon}</span>
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-white/90">{title}</h3>
            {tag ? (
              <span className="text-[11px] px-2 py-1 rounded-full border border-cyan-300/20 bg-cyan-300/10 text-cyan-200/90">
                {tag}
              </span>
            ) : null}
          </div>

          <p className="mt-2 text-sm sm:text-base text-white/60 leading-relaxed">{desc}</p>

          {bullets?.length ? (
            <ul className="mt-4 space-y-2 text-sm text-white/60">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-cyan-300/90 shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function FAQItem({ q, a }) {
  return (
    <details className="group glass rounded-2xl border border-white/10 p-5 sm:p-6">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-white/90 font-semibold">{q}</h4>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition group-open:rotate-45">
            +
          </span>
        </div>
      </summary>
      <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed">{a}</p>
    </details>
  );
}

function ResourceCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block glass rounded-2xl border border-white/10 overflow-hidden hover:bg-white/5 transition"
    >
      <div className="relative h-36 bg-black/40">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/0" />
      </div>
      <div className="p-5">
        <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">Resource</div>
        <h3 className="mt-2 text-base sm:text-lg font-semibold text-white/90 leading-snug">
          {post.title}
        </h3>
        {post.summary ? (
          <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-2">{post.summary}</p>
        ) : null}
        <div className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-200/90 group-hover:underline underline-offset-4">
          Read
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  const { t } = useTranslation(["meta", "services", "common"]);
  const revealRef = useReveal();

  const title = t("services_meta_title", "Services | Domi — Websites, Redesign & Business Systems");
  const description = t(
    "services_meta_description",
    "Digital systems for modern businesses: websites, redesigns, CRM-style tools, and automation to help you get more leads and run smoother."
  );

  const services = [
    {
      icon: "🌐",
      title: t("svc1_title", "Growth Websites"),
      tag: t("svc1_tag", "Web + SEO"),
      desc: t(
        "svc1_desc",
        "Modern websites built for speed, clarity, and conversion — so your business looks premium and customers know exactly what to do next."
      ),
      bullets: [
        t("svc1_b1", "Mobile-first design with clear calls-to-action."),
        t("svc1_b2", "Fast load times + SEO fundamentals baked in."),
        t("svc1_b3", "Structured pages for services, locations, and trust."),
      ],
    },
    {
      icon: "🎨",
      title: t("svc2_title", "Redesign & Conversion Upgrades"),
      tag: t("svc2_tag", "Best for existing sites"),
      desc: t(
        "svc2_desc",
        "If you already have a website, we redesign it with a modern UI and a better flow — so it converts more visitors into calls, bookings, and leads."
      ),
      bullets: [
        t("svc2_b1", "Stronger layout, messaging, and user flow."),
        t("svc2_b2", "Fix UX issues that make people bounce."),
        t("svc2_b3", "Cleaner visuals without losing your brand."),
      ],
    },
    {
      icon: "🧠",
      title: t("svc3_title", "CRM-Style Business Systems"),
      tag: t("svc3_tag", "Software"),
      desc: t(
        "svc3_desc",
        "Custom internal tools to manage leads, customers, and operations — designed like real software, not spreadsheets."
      ),
      bullets: [
        t("svc3_b1", "Lead capture + pipeline tracking."),
        t("svc3_b2", "Dashboards, notes, statuses, assignments."),
        t("svc3_b3", "Automations that reduce manual work."),
      ],
    },
    {
      icon: "⚙️",
      title: t("svc4_title", "Automation & Integrations"),
      tag: t("svc4_tag", "Ops"),
      desc: t(
        "svc4_desc",
        "Connect your tools and streamline your workflow: forms, booking, notifications, payments, and follow-ups."
      ),
      bullets: [
        t("svc4_b1", "Less back-and-forth and fewer repetitive tasks."),
        t("svc4_b2", "Faster response times to new leads."),
        t("svc4_b3", "Systems that scale as you grow."),
      ],
    },
  ];

  const faqs = [
    {
      q: t("faq1_q", "Do you only build websites?"),
      a: t(
        "faq1_a",
        "No — we build websites AND business systems. Think: redesigns, CRM-style tools, automations, and custom software that helps you operate and grow."
      ),
    },
    {
      q: t("faq2_q", "I already have a website. Can you improve it?"),
      a: t(
        "faq2_a",
        "Yes. Redesigns are common. We’ll modernize the UI, improve the flow, and optimize for conversions — without breaking what already works."
      ),
    },
    {
      q: t("faq3_q", "Will my site be mobile-friendly?"),
      a: t(
        "faq3_a",
        "Always. We design mobile-first so the experience feels premium on phones, tablets, and desktop."
      ),
    },
    {
      q: t("faq4_q", "How do you start a project?"),
      a: t(
        "faq4_a",
        "You tell us what you need, we recommend the best path, then we build a clean plan with milestones. You’ll see progress fast and you’ll always know what’s next."
      ),
    },
  ];

  const resourcePosts = useMemo(() => {
    const priority = [
      "how-to-choose-web-design-agency-st-louis",
      "local-seo-basics-small-business",
      "how-to-get-more-reviews-google",
      "build-service-area-pages-local-seo",
      "common-web-design-mistakes-to-avoid",
      "write-homepage-that-converts",
    ];

    const bySlug = new Map(blogPosts.map((p) => [p.slug, p]));
    const chosen = priority.map((s) => bySlug.get(s)).filter(Boolean);

    if (chosen.length >= 4) return chosen.slice(0, 4);

    const remaining = blogPosts
      .filter((p) => !chosen.some((c) => c.slug === p.slug))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return [...chosen, ...remaining].slice(0, 4);
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <SeoJsonLd />
      <Header />

      <main id="main-content">
        <section className="section relative overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette" />
          <div className="container relative z-10" ref={revealRef}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="reveal">
                <Pill>{t("services_pill", "Services")}</Pill>
              </div>

              <h1 className="reveal mt-4 font-extrabold tracking-tight leading-[1.02] text-white">
                <span className="block text-[36px] sm:text-[46px] md:text-[56px] lg:text-[64px]">
                  {t("services_h1_a", "Websites")}
                  <span className="text-white/60"> + </span>
                  <span className="grad-text">{t("services_h1_b", "Business Systems")}</span>
                </span>

                <span className="block mt-2 text-[20px] sm:text-[24px] md:text-[28px] text-white/80 font-semibold">
                  {t("services_h2", "Built to convert leads and simplify operations")}
                </span>
              </h1>

              <p className="reveal mt-5 text-sm sm:text-base md:text-lg text-white/60 leading-relaxed">
                {t(
                  "services_sub",
                  "Whether you need a new website, a full redesign, or a CRM-style system — we build scalable digital solutions that help businesses run smoother and grow faster."
                )}
              </p>

              <div className="reveal mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="btn btn-primary w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
                >
                  {t("services_cta_primary", "Start a Project")}
                </Link>

                <Link
                  to="/work"
                  className="btn btn-outline w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
                >
                  {t("services_cta_secondary", "See Work")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section relative overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette" />
          <div className="container relative z-10" ref={revealRef}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="reveal text-[11px] tracking-[0.25em] uppercase text-cyan-300/90">
                {t("services_label", "What we can build for you")}
              </p>
              <h2 className="reveal mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {t("services_title", "Clear offers, premium execution")}
              </h2>
              <p className="reveal mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
                {t(
                  "services_desc2",
                  "Pick what matches your business today — we’ll guide the strategy so the final result feels modern, fast, and intentional."
                )}
              </p>
            </div>

            <div className="mt-10 grid lg:grid-cols-2 gap-4 sm:gap-5">
              {services.map((s, i) => (
                <div key={i} className="reveal" style={{ animationDelay: `${i * 70}ms` }}>
                  <ServiceCard {...s} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section relative overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette" />
          <div className="container relative z-10" ref={revealRef}>
            <div className="max-w-4xl mx-auto text-center mb-8">
              <p className="reveal text-[11px] tracking-[0.25em] uppercase text-cyan-300/90">
                {t("resources_label", "Resources")}
              </p>
              <h2 className="reveal mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {t("resources_title", "Guides to help you get more leads")}
              </h2>
              <p className="reveal mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
                {t(
                  "resources_sub",
                  "Practical reads on web design, local SEO, reviews, and service-area strategy — built for small businesses."
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {resourcePosts.map((p, i) => (
                <div key={p.slug} className="reveal" style={{ animationDelay: `${i * 70}ms` }}>
                  <ResourceCard post={p} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link to="/blog" className="btn btn-outline w-full sm:w-auto">
                {t("resources_cta", "Explore the Blog")}
              </Link>
            </div>
          </div>
        </section>

        <section className="section relative overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette" />
          <div className="container relative z-10" ref={revealRef}>
            <div className="max-w-4xl mx-auto text-center mb-8">
              <p className="reveal text-[11px] tracking-[0.25em] uppercase text-cyan-300/90">
                {t("responsive_label", "Designed for real users")}
              </p>
              <h2 className="reveal mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {t("responsive_title", "Responsive across every screen")}
              </h2>
              <p className="reveal mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
                {t(
                  "responsive_sub",
                  "Most customers find you on mobile first. We make sure your site feels premium and clear on every device."
                )}
              </p>
            </div>

            <div className="reveal">
              <div className="glass rounded-3xl border border-white/10 p-3 sm:p-4 md:p-5 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
                {React.createElement(require("../components/ResponsiveDevicesSection").default)}
              </div>
            </div>
          </div>
        </section>

        <section className="section relative overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette" />
          <div className="container relative z-10" ref={revealRef}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="reveal text-[11px] tracking-[0.25em] uppercase text-cyan-300/90">
                {t("faq_label", "FAQ")}
              </p>
              <h2 className="reveal mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {t("faq_title", "Questions, answered")}
              </h2>
              <p className="reveal mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
                {t("faq_sub", "Quick answers to the most common questions before you start.")}
              </p>
            </div>

            <div className="mt-10 max-w-4xl mx-auto grid gap-3">
              {faqs.map((f, i) => (
                <div key={i} className="reveal" style={{ animationDelay: `${i * 70}ms` }}>
                  <FAQItem q={f.q} a={f.a} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section relative overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette" />
          <div className="container relative z-10" ref={revealRef}>
            <div className="max-w-5xl mx-auto">
              <div className="reveal glass rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
                <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-6 items-center">
                  <div>
                    <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/90">
                      {t("cta_label", "Next step")}
                    </p>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {t("cta_title", "Tell me what you need — I’ll recommend the best path")}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-white/60 leading-relaxed">
                      {t(
                        "cta_desc",
                        "New site, redesign, or a custom system — we’ll keep it simple and build something that looks premium and helps your business grow."
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      to="/contact"
                      className="btn btn-primary w-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
                    >
                      {t("cta_primary", "Start a Project")}
                    </Link>

                    <Link
                      to="/pricing"
                      className="btn btn-outline w-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
                    >
                      {t("cta_secondary", "View Pricing")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
