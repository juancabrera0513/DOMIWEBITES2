import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const AUDIT_ITEMS = [
  "What’s slowing your site down",
  "SEO issues affecting your visibility on Google",
  "Design or UX problems that should be improved",
  "Clear recommendations on what to change",
];


const WHO_ITS_FOR = [
  "You already have a website but it’s not performing well",
  "Your site feels outdated or slow",
  "You’re not showing up on Google",
  "You want a clear idea of what to improve",
];

const NEXT_STEPS = [
  {
    number: "01",
    title: "Submit your website",
    desc: "Send us your website link along with a few basic details so we can review it properly.",
  },
  {
    number: "02",
    title: "We review your site",
    desc: "We look through the site and identify what may be affecting performance, visibility, and overall quality.",
  },
  {
    number: "03",
    title: "We show you what to change",
    desc: "You receive a clear audit with practical recommendations on what should be improved.",
  },
  {
    number: "04",
    title: "We can help if needed",
    desc: "If you want help making those changes, we can go over everything with you in a free consultation.",
  },
];

const FAQS = [
  {
    q: "What is included in the free website audit?",
    a: "We review your website and point out what may be affecting speed, visibility, usability, and overall performance. We also share clear suggestions on what to improve.",
  },
  {
    q: "Is this automated?",
    a: "No. Each audit is reviewed manually so the feedback is more useful and specific to your website.",
  },
  {
    q: "What happens after the audit?",
    a: "If you want help making the recommended changes, we can schedule a free consultation and talk through the next steps together.",
  },
  {
    q: "What if I do not have a website yet?",
    a: "We can help with that too. If you need a new website, you can contact us directly and we will talk through what you need.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="glass rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
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

export default function FreeAuditPage() {
  const revealRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  useEffect(() => {
    const els = revealRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.12 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const normalizeWebsite = (url) => {
    if (!url) return "";
    const trimmed = url.trim();

    if (
      trimmed.startsWith("http://") ||
      trimmed.startsWith("https://")
    ) {
      return trimmed;
    }

    return `https://${trimmed}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    setStatusType("");

    if (!form.name || !form.email || !form.website) {
      setStatus("Please fill out all required fields.");
      setStatusType("error");
      setLoading(false);
      return;
    }

    const website = normalizeWebsite(form.website);

    const { error } = await supabase.from("website_audit_requests").insert([
      {
        name: form.name.trim(),
        email: form.email.trim(),
        website,
        message: form.message.trim() || null,
      },
    ]);

    if (error) {
      setStatus("Something went wrong. Please try again.");
      setStatusType("error");
      setLoading(false);
      return;
    }

    setStatus(`Thanks, ${form.name}! We’ll review your site and send your results within 72 hours.`);
        setForm({
      name: "",
      email: "",
      website: "",
      message: "",
    });
    setLoading(false);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Free Website Audit | Domi Websites",
    description:
      "Get a free website audit from Domi Websites. We review your site and show you what to change to improve performance, visibility, and overall results.",
    url: "https://domiwebsites.com/audit",
    publisher: {
      "@type": "Organization",
      name: "Domi Websites",
      url: "https://domiwebsites.com",
    },
  };

  return (
    <>
      <Helmet>
        <title>Free Website Audit | Domi Websites</title>
        <meta
          name="description"
          content="Get a free website audit from Domi Websites. We review your site and show you what to change to improve performance, visibility, and overall results."
        />
        <link rel="canonical" href="https://domiwebsites.com/audit" />
        <meta property="og:title" content="Free Website Audit | Domi Websites" />
        <meta
          property="og:description"
          content="We review your website and show you exactly what to change to improve performance, visibility, and overall results."
        />
        <meta property="og:url" content="https://domiwebsites.com/audit" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Website Audit | Domi Websites" />
        <meta
          name="twitter:description"
          content="We review your website and show you exactly what to change to improve performance, visibility, and overall results."
        />
      </Helmet>

      <SeoJsonLd data={jsonLd} />
      <Header />

      <main ref={revealRef}>
        <section className="section relative overflow-hidden nexus-bg hero-grid">
          <div className="hero-vignette" />

          <div className="absolute inset-0 pointer-events-none">
            <div className="so-blob so-blob-a" />
            <div className="so-blob so-blob-b" />
            <div className="so-blob so-blob-c" />
          </div>

          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="max-w-3xl reveal">
              <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400 mb-4">
                FREE WEBSITE AUDIT
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-tight">
                We’ll show you exactly what to
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {" "}
                  change on your website
                </span>
              </h1>

              <p className="text-slate-300 mt-5 text-base md:text-lg leading-relaxed max-w-2xl">
                We review your site and point out what’s slowing it down,
                affecting your visibility, and what you should fix to improve it.
              </p>

              <p className="text-slate-400 mt-4 text-sm md:text-base max-w-xl">
                Simple, clear feedback you can actually use.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#audit-form"
                  className="btn btn-primary relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
                >
                  <span className="btn-shimmer" />
                  Get My Free Audit
                </a>

                <Link
                  to="/contact"
                  className="btn btn-outline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section relative overflow-hidden nexus-bg pt-0">
          <div className="hero-vignette" />

          <div className="absolute inset-0 pointer-events-none">
            <div className="so-blob so-blob-a" style={{ opacity: 0.1 }} />
            <div className="so-blob so-blob-b" style={{ opacity: 0.1 }} />
          </div>

          <div className="max-w-6xl mx-auto px-4 relative">
            <div className="reveal">
              <article className="relative rounded-3xl p-[1.5px] overflow-hidden ring-1 ring-cyan-400/30">
                <div className="so-featured-border" />

                <div
                  className="relative glass rounded-3xl p-5 md:p-8 border border-cyan-400/20"
                  style={{ background: "rgba(10,18,35,0.72)" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div
                      className="rounded-2xl border border-white/10 overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.03)" }}
                    >
                      <div className="relative">
                        <img
                          src="/images/audit-before.png"
                          alt="Before website example"
                          className="w-full h-auto block"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-black/45 backdrop-blur-md text-white border border-white/10">
                            BEFORE
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h2 className="text-xl font-semibold tracking-tight text-white">
                          Outdated
                        </h2>

                        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                          Hard to read, slower, and not built to make a strong
                          impression.
                        </p>
                      </div>
                    </div>

                    <div
                      className="rounded-2xl border border-cyan-400/20 overflow-hidden"
                      style={{ background: "rgba(34,211,238,0.05)" }}
                    >
                      <div className="relative">
                        <img
                          src="/images/audit-after.png"
                          alt="After website example"
                          className="w-full h-auto block"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-cyan-400/20 backdrop-blur-md text-cyan-100 border border-cyan-400/25">
                            AFTER
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h2 className="text-xl font-semibold tracking-tight text-white">
                          Modern
                        </h2>

                        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                          Cleaner, faster, and built to create a better experience.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <h3 className="text-white font-semibold text-xl md:text-2xl">
                      We help businesses go from this → to this
                    </h3>
                    <p className="text-slate-400 text-sm md:text-base mt-3">
                      Faster. Cleaner. Built to perform.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>


      

        <section
          className="section relative overflow-hidden"
          style={{ background: "rgba(6,12,24,0.95)" }}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12 reveal">
              <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400 mb-3">
                HOW IT WORKS
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                A simple process from
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {" "}
                  review to next steps
                </span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {NEXT_STEPS.map((step, i) => (
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

                  <h3 className="text-white font-semibold text-base mb-2">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

      
        <section
          id="audit-form"
          className="section relative overflow-hidden"
          style={{ background: "rgba(6,12,24,0.95)" }}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10 reveal">
              <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400 mb-3">
                GET YOUR FREE AUDIT
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Send us your
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {" "}
                  website
                </span>
              </h2>

              <p className="text-slate-400 text-sm md:text-base mt-4 max-w-xl mx-auto">
                Fill this out and we’ll take a look at your site.
              </p>
            </div>

            <div
              className="reveal glass rounded-3xl border border-white/10 p-6 md:p-8"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.07] transition"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-slate-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.07] transition"
                      placeholder="Your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Website URL
                  </label>
                  <input
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.07] transition"
                    placeholder="yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    What do you want to improve?{" "}
                    <span className="text-slate-500">(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-cyan-400/40 focus:bg-white/[0.07] transition resize-none"
                    placeholder="Tell us what you want to improve"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary w-full justify-center relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="btn-shimmer" />
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>

                {status && (
                  <p
                    className={`text-center text-sm pt-2 ${
                      statusType === "error"
                        ? "text-red-300"
                        : "text-emerald-300"
                    }`}
                  >
                    {status}
                  </p>
                )}
              </form>

              <p className="text-center text-[12px] text-slate-500 mt-5">
                We review each website manually, so spots are limited each week.
              </p>
            </div>
          </div>
        </section>

        <section className="section relative overflow-hidden nexus-bg">
          <div className="hero-vignette" />

          <div className="absolute inset-0 pointer-events-none">
            <div className="so-blob so-blob-a" style={{ opacity: 0.1 }} />
            <div className="so-blob so-blob-b" style={{ opacity: 0.1 }} />
          </div>

          <div className="max-w-4xl mx-auto px-4 relative">
            <div
              className="reveal glass rounded-3xl border border-white/10 p-8 md:p-10 text-center"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400 mb-4">
                NEED A NEW WEBSITE?
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Starting from
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {" "}
                  scratch?
                </span>
              </h2>

              <p className="text-slate-400 mt-4 text-base leading-relaxed max-w-2xl mx-auto">
                If you don’t have a website yet, we can help with that too. Reach
                out and we’ll talk through what you need.
              </p>

              <div className="mt-8">
                <Link
                  to="/contact"
                  className="btn btn-outline transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section relative overflow-hidden"
          style={{ background: "rgba(6,12,24,0.95)" }}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12 reveal">
              <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400 mb-3">
                FAQ
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                Common
                <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {" "}
                  questions
                </span>
              </h2>
            </div>

            <div className="space-y-3 reveal">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>
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

        .so-blob-a {
          left: -160px;
          top: -120px;
          background: rgba(34,211,238,.9);
        }

        .so-blob-b {
          right: -200px;
          top: 80px;
          background: rgba(99,102,241,.9);
          animation-duration: 13s;
        }

        .so-blob-c {
          left: 25%;
          bottom: -220px;
          background: rgba(168,85,247,.9);
          animation-duration: 15s;
        }

        @keyframes so-floaty {
          0% { transform: translate3d(0,0,0) scale(1); }
          50% { transform: translate3d(0,-16px,0) scale(1.03); }
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
          0% { transform: translateX(-10%); }
          50% { transform: translateX(10%); }
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
          0% { transform: translateX(-120%); }
          45% { transform: translateX(120%); }
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
          .so-blob,
          .so-featured-border,
          .btn-shimmer {
            animation: none !important;
          }

          .reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}