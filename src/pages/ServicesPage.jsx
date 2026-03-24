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
          Read →
        </div>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  const { t } = useTranslation(["meta", "services", "common"]);
  const revealRef = useReveal();

  const title = "Services | Domi Websites";
  const description =
    "Websites, redesigns, automation, and custom business systems to help your business get more leads and run smoother.";

  const services = [
    {
      icon: "🌐",
      title: "Growth Websites",
      tag: "Web + SEO",
      desc:
        "Modern websites designed to make your business look professional, build trust, and turn visitors into calls, bookings, and leads.",
      bullets: [
        "Mobile-first design with clear calls-to-action.",
        "Fast, modern, and built with SEO fundamentals.",
        "Pages structured to build trust and generate leads.",
      ],
    },
    {
      icon: "🎨",
      title: "Redesign & Conversion Upgrades",
      tag: "Best for existing sites",
      desc:
        "If your website looks outdated or isn’t bringing leads, we redesign it with a better layout, better messaging, and a better user flow.",
      bullets: [
        "Modern design that makes your business look more premium.",
        "Better structure so users know what to do next.",
        "Improved layout focused on conversions.",
      ],
    },
    {
      icon: "🧠",
      title: "CRM-Style Business Systems",
      tag: "Software",
      desc:
        "Custom business systems to manage leads, customers, projects, and operations built specifically for how your business works.",
      bullets: [
        "Lead tracking and customer management.",
        "Dashboards, notes, statuses, assignments.",
        "Automations to reduce manual work.",
      ],
    },
    {
      icon: "⚙️",
      title: "Automation & Integrations",
      tag: "Ops",
      desc:
        "We connect your forms, emails, booking tools, and systems so your business runs smoother and you respond faster to new leads.",
      bullets: [
        "Reduce repetitive tasks.",
        "Faster follow-ups with new leads.",
        "Systems that grow with your business.",
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <SeoJsonLd />
      <Header />

      <main id="main-content">
        <section className="section relative overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette" />
          <div className="container relative z-10 text-center">
            <Pill>Services</Pill>

            <h1 className="mt-4 font-extrabold tracking-tight leading-[1.02] text-white">
              <span className="block text-[40px] sm:text-[52px] md:text-[64px]">
                Websites + Business Systems
              </span>

              <span className="block mt-2 text-[22px] sm:text-[26px] text-white/80 font-semibold">
                Built to bring leads and make your business run smoother
              </span>
            </h1>

            <p className="mt-5 text-base text-white/60 max-w-3xl mx-auto leading-relaxed">
              Most businesses don’t just need a website. They need better systems.
              We build websites, automations, and custom tools that help you get more leads,
              stay organized, and grow.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn btn-primary">
                Start a Project
              </Link>

              <Link to="/work" className="btn btn-outline">
                See Work
              </Link>
            </div>
          </div>
        </section>

        <section className="section nexus-bg hero-grid">
          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-white">
                Simple services. Built the right way.
              </h2>
              <p className="mt-3 text-white/60">
                Tell me what your business needs and I’ll recommend the best solution.
                Website, redesign, or a custom system.
              </p>
            </div>

            <div className="mt-10 grid lg:grid-cols-2 gap-5">
              {services.map((s, i) => (
                <ServiceCard key={i} {...s} />
              ))}
            </div>
          </div>
        </section>

        <section className="section nexus-bg hero-grid">
          <div className="container relative z-10 text-center">
            <h3 className="text-3xl font-bold text-white">
              Tell me about your business and what you want to improve
            </h3>
            <p className="mt-3 text-white/60">
              Website, redesign, automation, or a custom system.
              We’ll build something that actually helps your business grow.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact" className="btn btn-primary">
                Start a Project
              </Link>

              <Link to="/pricing" className="btn btn-outline">
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}