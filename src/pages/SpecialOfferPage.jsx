import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import ContactSection from "../sections/ContactSection";

const INCLUDED = [
  { label: "Up to 5 pages", desc: "Home, About, Services, Contact, and one more of your choice." },
  { label: "Mobile-friendly design", desc: "Looks and works great on phones, tablets, and desktops." },
  { label: "Contact form", desc: "A working form so leads can reach you directly from your site." },
  { label: "Basic SEO setup", desc: "Page titles, meta descriptions, and proper structure out of the box." },
  { label: "Google-ready setup", desc: "Sitemap, robots.txt, and Google Search Console ready to connect." },
  { label: "Delivered in 7 to 10 days", desc: "A fast, reliable turnaround without cutting corners." },
];

const BEST_FOR = [
  "Contractors",
  "Cleaning companies",
  "Real estate agents",
  "Insurance agencies",
  "Restaurants",
  "Landscaping companies",
  "Plumbers, electricians & HVAC",
  "Other service-based businesses",
];

const NOT_INCLUDED = [
  "Online stores or e-commerce",
  "Booking systems",
  "Membership websites",
  "Custom portals or advanced functionality",
  "Logo design",
  "Copywriting",
  "More than 5 pages",
];

const STEPS = [
  {
    number: "01",
    title: "Tell us about your business",
    desc: "Fill out the contact form with a few details about your business and what you need.",
  },
  {
    number: "02",
    title: "We plan your website",
    desc: "We review your goals and outline a clear plan before any work begins.",
  },
  {
    number: "03",
    title: "We design and build it",
    desc: "Our team builds your site with care, speed, and attention to detail.",
  },
  {
    number: "04",
    title: "You review before launch",
    desc: "You get to review the full site and request adjustments before it goes live.",
  },
];

const FAQS = [
  {
    q: "Who is this special for?",
    a: "Service-based businesses that need a professional website without complex features like e-commerce or custom portals.",
  },
  {
    q: "Is this for online stores?",
    a: "No. Online stores and advanced features are quoted separately. This special is for standard business websites only.",
  },
  {
    q: "What is the regular price?",
    a: "Our website projects normally start at $1,500. This is a limited special for qualifying standard business websites.",
  },
  {
    q: "How do I get started?",
    a: "Use the contact form below and mention the special, or call us at (314) 376-9667 to book a free consultation.",
  },
];

const HERO_STATS = [
  { value: "3 spots", label: "available now" },
  { value: "7 to 10 days", label: "delivery time" },
  { value: "$1,500+", label: "regular pricing" },
];

const SectionLabel = ({ children }) => (
  <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400 mb-3">
    {children}
  </p>
);

const GradientHeading = ({ plain, gradient, level = 2 }) => {
  const Tag = `h${level}`;
  const baseClass =
    level === 1
      ? "text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight"
      : "text-3xl md:text-4xl font-extrabold text-white";

  return (
    <Tag className={baseClass}>
      {plain && `${plain} `}
      <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
        {gradient}
      </span>
    </Tag>
  );
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.035)" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className="text-white font-medium text-sm md:text-base">{q}</span>
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center border border-white/15 text-slate-400 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1v10M1 6h10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-white/8 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

export default function SpecialOfferPage() {
  const revealRef = useRef(null);

  useEffect(() => {
    const els = revealRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Special Website Offer | Domi Websites | St. Louis",
    description:
      "Limited website special for qualifying service-based businesses. Get a professional 5-page website for $499. Regular website projects start at $1,500.",
    url: "https://domiwebsites.com/special",
    publisher: {
      "@type": "Organization",
      name: "Domi Websites",
      url: "https://domiwebsites.com",
    },
  };

  return (
    <>
      <Helmet>
        <title>Special Website Offer | Domi Websites | St. Louis</title>
        <meta
          name="description"
          content="Limited website special for qualifying service-based businesses. Get a professional 5-page website for $499. Regular website projects start at $1,500."
        />
        <link rel="canonical" href="https://domiwebsites.com/special" />
        <meta property="og:title" content="Special Website Offer | Domi Websites | St. Louis" />
        <meta
          property="og:description"
          content="Limited website special for qualifying service-based businesses. Get a professional 5-page website for $499. Regular website projects start at $1,500."
        />
        <meta property="og:url" content="https://domiwebsites.com/special" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Special Website Offer | Domi Websites | St. Louis" />
        <meta
          name="twitter:description"
          content="Limited website special for qualifying service-based businesses. Get a professional 5-page website for $499. Regular website projects start at $1,500."
        />
      </Helmet>

      <SeoJsonLd data={jsonLd} />
      <Header />

      <main ref={revealRef}>

        {/* Hero */}
        <section className="section relative overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="so-blob so-blob-a" />
            <div className="so-blob so-blob-b" />
            <div className="so-blob so-blob-c" />
          </div>

          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              <div className="reveal">
                <SectionLabel>Limited Offer</SectionLabel>
                <GradientHeading
                  level={1}
                  plain="A professional website"
                  gradient="for your business"
                />
                <p className="text-slate-300 mt-5 text-base md:text-lg leading-relaxed max-w-lg">
                  We build clean, fast, mobile-ready websites for service-based
                  businesses. This is a limited offer, only a few spots are
                  available at this price.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="#contact"
                    className="btn btn-primary relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
                  >
                    <span className="btn-shimmer" />
                    Claim this offer
                  </a>
                  <a
                    href="tel:3143769667"
                    className="btn btn-outline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
                  >
                    Call (314) 376-9667
                  </a>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  {HERO_STATS.map((s) => (
                    <div
                      key={s.label}
                      className="glass rounded-2xl border border-white/10 px-5 py-3.5 min-w-[120px]"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <div className="text-xl font-extrabold text-white">{s.value}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 tracking-wide">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal" style={{ animationDelay: "80ms" }}>
                <article className="relative rounded-3xl p-[1.5px] overflow-hidden ring-1 ring-cyan-400/30">
                  <div className="so-featured-border" />
                  <div
                    className="relative glass rounded-3xl p-8 border border-cyan-400/20"
                    style={{ background: "rgba(10,18,35,0.72)" }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-cyan-400/15 text-cyan-200 border border-cyan-400/25">
                        LIMITED SPECIAL
                      </span>
                      <span className="text-[11px] text-amber-400 font-semibold tracking-wide">
                        3 SPOTS LEFT
                      </span>
                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                      Starter Website
                    </h2>

                    <div className="mt-4 rounded-2xl border border-white/10 bg-black/10 p-5">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="text-xs text-white/50 mb-1">Special price</div>
                          <div className="text-5xl font-extrabold text-white">$499</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-white/50 mb-1">Regular projects start at</div>
                          <div className="text-xl font-semibold text-white/40 line-through decoration-white/30">$1,500</div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm mt-5 leading-relaxed">
                      A clean, professional website for businesses that need a
                      strong online presence without a full custom build.
                    </p>

                    <div className="mt-6 pt-6 border-t border-white/8 space-y-3">
                      {INCLUDED.map((item) => (
                        <div key={item.label} className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <a
                        href="#contact"
                        className="btn btn-primary w-full justify-center relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
                      >
                        <span className="btn-shimmer" />
                        Start this project
                      </a>
                      <p className="text-center text-[11px] text-slate-500 mt-3">
                        Standard pricing applies after these spots are filled.
                      </p>
                    </div>
                  </div>
                </article>
              </div>

            </div>
          </div>
        </section>

        {/* Details */}
        <section
          className="section relative overflow-hidden"
          style={{ background: "rgba(6,12,24,0.95)" }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-14 reveal">
              <SectionLabel>Details</SectionLabel>
              <GradientHeading plain="Everything" gradient="in this offer" />
              <p className="text-slate-400 text-sm mt-4 max-w-lg mx-auto leading-relaxed">
                A clear breakdown of what is included, who this is built for,
                and what falls outside the scope of this special.
              </p>
            </div>

            {/* Included items */}
            <div className="reveal mb-6">
              <div
                className="glass rounded-3xl border border-white/10 p-8 md:p-10"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <div className="mb-8">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    What is included
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Every item below is part of the $499 special. No add-on costs.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {INCLUDED.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/8 p-5"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 shrink-0" />
                        <span className="text-white font-medium text-sm">{item.label}</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed pl-4">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Best fit + Not included */}
            <div className="grid md:grid-cols-2 gap-6 reveal" style={{ animationDelay: "60ms" }}>

              <div
                className="glass rounded-3xl border border-white/10 p-8"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <h3 className="text-white font-semibold text-lg mb-1">
                  Best fit
                </h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  This special works best for local and service-based businesses
                  that need a clean, professional online presence.
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {BEST_FOR.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="glass rounded-3xl border border-white/10 p-8"
                style={{ background: "rgba(255,255,255,0.03)" }}
              >
                <h3 className="text-white font-semibold text-lg mb-1">
                  Quoted separately
                </h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  The following are outside the scope of this special and are
                  priced separately based on your project needs.
                </p>
                <div className="space-y-3">
                  {NOT_INCLUDED.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-slate-400">
                      <svg
                        className="mt-0.5 shrink-0 w-4 h-4 text-slate-600"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M4 4l8 8M12 4l-8 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div
                  className="mt-6 rounded-2xl border border-white/8 px-4 py-3"
                  style={{ background: "rgba(168,85,247,0.05)" }}
                >
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Need something more complex?{" "}
                    <Link to="/contact" className="text-cyan-300 hover:underline">
                      Contact us
                    </Link>{" "}
                    and we will scope the right project for your needs.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section relative overflow-hidden nexus-bg">
          <div className="hero-vignette" />
          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="text-center mb-12 reveal">
              <SectionLabel>Process</SectionLabel>
              <GradientHeading plain="How it" gradient="works" />
              <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
                Four straightforward steps. No surprises along the way.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {STEPS.map((step, i) => (
                <div
                  key={step.number}
                  className="reveal glass rounded-2xl border border-white/10 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_rgba(34,211,238,.07)]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    animationDelay: `${i * 60}ms`,
                  }}
                >
                  <div className="text-[11px] font-bold tracking-[0.25em] text-cyan-400 mb-3">
                    {step.number}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="section relative overflow-hidden"
          style={{ background: "rgba(6,12,24,0.95)" }}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12 reveal">
              <SectionLabel>FAQ</SectionLabel>
              <GradientHeading plain="Common" gradient="questions" />
            </div>
            <div className="space-y-3 reveal">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="section relative overflow-hidden nexus-bg">
          <div className="hero-vignette" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="so-blob so-blob-a" style={{ opacity: 0.1 }} />
            <div className="so-blob so-blob-b" style={{ opacity: 0.1 }} />
          </div>

          <div className="max-w-2xl mx-auto px-4 relative text-center reveal">
            <SectionLabel>Ready to start?</SectionLabel>
            <GradientHeading plain="Only 3 spots available" gradient="at this price" />
            <p className="text-slate-400 mt-4 text-base leading-relaxed">
              Once these spots are filled, standard pricing applies. If this looks
              like a fit, reach out and mention the special.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#contact"
                className="btn btn-primary relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
              >
                <span className="btn-shimmer" />
                Claim this offer
              </a>
              <a
                href="tel:3143769667"
                className="btn btn-outline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
              >
                Call (314) 376-9667
              </a>
            </div>

            <p className="text-[12px] text-slate-500 mt-5">
              Mention the special when you reach out. No commitment required to talk.
            </p>
          </div>
        </section>

        <div id="contact">
          <ContactSection />
        </div>
      </main>

      <Footer />

      <style>{`
        .so-blob {
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 999px;
          filter: blur(72px);
          opacity: 0.16;
          animation: so-floaty 11s ease-in-out infinite;
          transform: translate3d(0,0,0);
        }
        .so-blob-a { left: -160px; top: -120px; background: rgba(34,211,238,.9); }
        .so-blob-b { right: -200px; top: 80px; background: rgba(99,102,241,.9); animation-duration: 13s; }
        .so-blob-c { left: 25%; bottom: -220px; background: rgba(168,85,247,.9); animation-duration: 15s; }

        @keyframes so-floaty {
          0%   { transform: translate3d(0,0,0) scale(1); }
          50%  { transform: translate3d(0,-16px,0) scale(1.03); }
          100% { transform: translate3d(0,0,0) scale(1); }
        }

        .so-featured-border {
          position: absolute;
          inset: -2px;
          background:
            radial-gradient(800px circle at 20% 10%, rgba(34,211,238,.4), transparent 55%),
            radial-gradient(800px circle at 80% 70%, rgba(99,102,241,.4), transparent 60%),
            linear-gradient(90deg, rgba(34,211,238,.3), rgba(99,102,241,.3), rgba(168,85,247,.3));
          opacity: 0.85;
          animation: so-borderShift 8s linear infinite;
        }

        @keyframes so-borderShift {
          0%   { transform: translateX(-10%); }
          50%  { transform: translateX(10%); }
          100% { transform: translateX(-10%); }
        }

        .btn-shimmer {
          position: absolute;
          inset: -2px;
          background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.18) 40%, transparent 60%);
          transform: translateX(-120%);
          animation: so-shimmer 2.8s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes so-shimmer {
          0%   { transform: translateX(-120%); }
          45%  { transform: translateX(120%); }
          100% { transform: translateX(120%); }
        }

        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .so-blob, .so-featured-border, .btn-shimmer { animation: none !important; }
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>
    </>
  );
}