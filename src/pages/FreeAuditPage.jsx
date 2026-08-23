import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  Gauge,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { JsonLd } from "../lib/jsonld";
import { normalizeWebsite, sendAuditRequest } from "../lib/auditRequest";

const SITE_URL = "https://domiwebsites.com";

const AUDIT_AREAS = [
  {
    icon: Gauge,
    title: "Speed & performance",
    desc: "What is slowing down the experience and costing you visitors.",
  },
  {
    icon: Search,
    title: "SEO visibility",
    desc: "Technical and on-page issues that make it harder to rank locally.",
  },
  {
    icon: Target,
    title: "Conversion clarity",
    desc: "Where visitors get confused, hesitate, or miss the next step.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & usability",
    desc: "Mobile, accessibility, credibility, and user-experience problems.",
  },
];

const DELIVERABLES = [
  "A prioritized list of the highest-impact issues",
  "Plain-English explanations with no technical jargon",
  "Quick wins you can implement immediately",
  "Recommendations for SEO, speed, UX, and conversions",
  "A clear next-step plan whether you hire us or not",
];

const STEPS = [
  ["01", "Send your URL", "Tell us where your website is and what you want it to do better."],
  ["02", "We inspect it manually", "A real specialist reviews the pages, performance, search signals, and customer journey."],
  ["03", "Get your action plan", "Within 72 hours, receive focused recommendations ordered by business impact."],
];

const FAQS = [
  {
    q: "Is the website audit really free?",
    a: "Yes. There is no charge and no obligation. We use it to show you useful opportunities before discussing any paid work.",
  },
  {
    q: "Is this just an automated score?",
    a: "No. Automated tools support the review, but a real person evaluates your messaging, mobile experience, SEO, credibility, and conversion path.",
  },
  {
    q: "How long does it take?",
    a: "Most audits are delivered within 72 business hours. If we need more context, we will email you before reviewing the site.",
  },
  {
    q: "Can you implement the recommendations?",
    a: "Absolutely, but you are free to use the action plan yourself or with another provider. If you want our help, we can scope the highest-priority improvements.",
  },
  {
    q: "What if I do not have a website yet?",
    a: "The audit is designed for existing sites. If you need a new website, visit our pricing page or contact us for a focused recommendation.",
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <article className="audit-faq">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-5 px-5 md:px-6 py-5 text-left"
      >
        <span className="font-semibold text-white">{q}</span>
        <span className={`audit-faq-plus ${open ? "is-open" : ""}`} aria-hidden="true">+</span>
      </button>
      {open && <p className="px-5 md:px-6 pb-5 text-sm leading-7 text-slate-400">{a}</p>}
    </article>
  );
}

export default function FreeAuditPage() {
  const pageRef = useRef(null);
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", website: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  useEffect(() => {
    const elements = pageRef.current?.querySelectorAll(".audit-reveal");
    if (!elements?.length) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in")),
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const handleChange = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setStatusType("");

    if (formRef.current?.elements?.botcheck?.value) return;

    const website = normalizeWebsite(form.website);
    if (
      form.name.trim().length < 2 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()) ||
      !website
    ) {
      setStatus("Please enter your name, a valid email, and a valid website URL.");
      setStatusType("error");
      return;
    }

    setLoading(true);
    try {
      await sendAuditRequest({ ...form, website });

      if (window.gtag) {
        window.gtag("event", "generate_lead", {
          form_location: "audit_page",
          method: "emailjs",
        });
      }
      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion();
      }

      setStatus(`You're in, ${form.name.trim()}. We'll send your audit within 72 business hours.`);
      setStatusType("success");
      setForm({ name: "", email: "", website: "", message: "" });
    } catch {
      setStatus("Something went wrong. Please try again or email admin@domiwebsites.com.");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const pageUrl = `${SITE_URL}/audit`;
  const title = "Free Website Audit in St. Louis | SEO, Speed & UX Review";
  const description =
    "Get a free, manual website audit from Domi Websites. Discover SEO, speed, mobile UX, trust, and conversion issues. Receive a prioritized action plan in 72 hours.";

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "Free Website Audit",
      serviceType: "Website SEO, performance, UX and conversion audit",
      description,
      url: pageUrl,
      provider: { "@id": `${SITE_URL}#business` },
      areaServed: [{ "@type": "City", name: "St. Louis" }, { "@type": "Country", name: "United States" }],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: pageUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Free Website Audit", item: pageUrl },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:site_name" content="Domi Websites" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={`${SITE_URL}/domi-websites-custom-business-software-og.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/domi-websites-custom-business-software-og.jpg`} />
      </Helmet>
      {structuredData.map((data, index) => <JsonLd key={index} data={data} />)}
      <Header />

      <main id="main-content" ref={pageRef} className="audit-page">
        <section className="audit-hero relative overflow-hidden">
          <div className="audit-orb audit-orb-a" />
          <div className="audit-orb audit-orb-b" />
          <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-16 items-center">
              <div className="audit-reveal">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.045em] leading-[1.02] text-white">
                  Find what is costing your website{" "}
                  <span className="audit-gradient-text">traffic, trust, and leads.</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-slate-300 max-w-2xl">
                  Get an expert review of your SEO, speed, mobile experience, and conversion path, plus a clear action plan you can actually use.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a href="#audit-form" className="btn btn-primary audit-primary-cta">
                    Get my free audit <ArrowRight size={17} />
                  </a>
                  <Link to="/work" className="btn btn-outline">See our work</Link>
                </div>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
                  {["100% free", "Reviewed by a real person", "Delivered in 72 hours"].map((item) => (
                    <span key={item} className="flex items-center gap-2">
                      <Check size={15} className="text-emerald-400" /> {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="audit-reveal audit-report-shell">
                <div className="audit-report-top">
                  <div>
                    <span className="audit-live-dot" /> Sample opportunity report
                  </div>
                  <span>domi analysis</span>
                </div>
                <div className="p-5 md:p-7">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-slate-500">Growth readiness</p>
                      <p className="mt-2 text-4xl font-black text-white">62<span className="text-lg text-slate-500">/100</span></p>
                    </div>
                    <div className="audit-score-ring"><TrendingUp size={22} /></div>
                  </div>
                  <div className="mt-7 space-y-4">
                    {[
                      ["Local SEO foundation", 54, "Needs attention"],
                      ["Mobile experience", 71, "Good start"],
                      ["Conversion clarity", 46, "High opportunity"],
                      ["Trust signals", 68, "Can improve"],
                    ].map(([label, score, note]) => (
                      <div key={label}>
                        <div className="flex justify-between gap-4 text-xs mb-2">
                          <span className="text-slate-300">{label}</span>
                          <span className="text-slate-500">{note}</span>
                        </div>
                        <div className="audit-meter"><span style={{ width: `${score}%` }} /></div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7 audit-insight">
                    <BarChart3 size={20} className="text-cyan-300" />
                    <div>
                      <p className="font-semibold text-white">Your top 3 opportunities</p>
                      <p className="text-sm text-slate-400 mt-1">Prioritized by business impact, not technical complexity.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="audit-strip">
          <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4">
            {AUDIT_AREAS.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="audit-area">
                <Icon size={21} />
                <h2>{title}</h2>
                <p>{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="audit-reveal">
                <h2 className="audit-heading audit-heading-first">A score alone does not tell you what to fix next.</h2>
                <p className="audit-copy">
                  Tools can identify symptoms. We connect those findings to the customer experience and your business goals, then organize the work in the right order.
                </p>
                <ul className="mt-7 space-y-4">
                  {DELIVERABLES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-slate-300">
                      <span className="audit-check"><Check size={14} /></span>{item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="audit-reveal audit-proof">
                <div className="grid gap-4">
                  <figure className="audit-proof-card is-before">
                    <figcaption><span>Before optimization</span><strong>Performance gaps</strong></figcaption>
                    <img
                      src="/images/audit-before.png"
                      alt="Lighthouse scores before website optimization: performance 63, accessibility 80, best practices 58, SEO 100"
                      width="1374"
                      height="330"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="audit-proof-arrow"><ArrowRight size={18} /></div>
                  <figure className="audit-proof-card is-after">
                    <figcaption><span>After optimization</span><strong>Measurable improvement</strong></figcaption>
                    <img
                      src="/images/audit-after.png"
                      alt="Lighthouse scores after website optimization: performance 93, accessibility 91, best practices 100, SEO 100"
                      width="1374"
                      height="330"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="audit-process py-20 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl audit-reveal">
              <h2 className="audit-heading audit-heading-first">Three steps to a clearer website roadmap.</h2>
            </div>
            <div className="mt-12 grid md:grid-cols-3 gap-5">
              {STEPS.map(([number, title, desc]) => (
                <article key={number} className="audit-step audit-reveal">
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="audit-form" className="py-20 md:py-28 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="audit-form-shell audit-reveal">
              <div className="audit-form-intro">
                <h2 className="text-3xl md:text-5xl font-black tracking-[-.04em] text-white leading-tight">
                  Your website should work as hard as you do.
                </h2>
                <p className="mt-5 text-slate-400 leading-7">
                  Send your URL and tell us what feels off. We will identify the strongest opportunities and send you a focused plan.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="audit-promise"><Clock3 /><span><strong>72-hour delivery</strong><small>During business days</small></span></div>
                  <div className="audit-promise"><ShieldCheck /><span><strong>No sales pressure</strong><small>Useful feedback comes first</small></span></div>
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="audit-form" noValidate>
                <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <label>Name<input name="name" value={form.name} onChange={handleChange} placeholder="Your name" autoComplete="name" maxLength={80} disabled={loading} required /></label>
                  <label>Work email<input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" autoComplete="email" maxLength={120} disabled={loading} required /></label>
                </div>
                <label>Website URL<input name="website" value={form.website} onChange={handleChange} placeholder="yourwebsite.com" autoComplete="url" maxLength={240} disabled={loading} required /></label>
                <label>
                  What would you like to improve? <span>(optional)</span>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="More leads, better Google visibility, a faster site..." maxLength={2000} disabled={loading} />
                </label>
                <button type="submit" disabled={loading} className="btn btn-primary w-full justify-center audit-primary-cta">
                  {loading ? "Submitting..." : "Request my free audit"} {!loading && <ArrowRight size={17} />}
                </button>
                {status && <div role="status" aria-live="polite" className={`audit-status ${statusType}`}>{status}</div>}
                <p className="text-center text-xs text-slate-500">Your information stays private. No spam, ever.</p>
              </form>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center audit-reveal">
              <h2 className="audit-heading audit-heading-first">Before you send your site</h2>
            </div>
            <div className="mt-10 space-y-3">
              {FAQS.map((faq) => <FaqItem key={faq.q} {...faq} />)}
            </div>
            <p className="mt-8 text-center text-sm text-slate-400">
              Starting from scratch? <Link to="/pricing" className="text-cyan-300 hover:text-cyan-200">Explore website packages →</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .audit-page{background:#050812;color:white}
        .audit-hero{background:radial-gradient(circle at 72% 30%,rgba(14,165,233,.13),transparent 35%),linear-gradient(180deg,#070b18 0%,#050812 100%)}
        .audit-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:52px 52px;mask-image:linear-gradient(to bottom,black,transparent)}
        .audit-orb{position:absolute;border-radius:999px;filter:blur(80px);opacity:.22;pointer-events:none}
        .audit-orb-a{width:420px;height:420px;background:#0ea5e9;right:-180px;top:-100px}
        .audit-orb-b{width:360px;height:360px;background:#7c3aed;left:-220px;bottom:-160px}
        .audit-gradient-text{background:linear-gradient(100deg,#67e8f9,#60a5fa 48%,#c084fc);background-clip:text;color:transparent}
        .audit-primary-cta{display:inline-flex;align-items:center;gap:.55rem}
        .audit-report-shell{border:1px solid rgba(148,163,184,.16);border-radius:28px;overflow:hidden;background:linear-gradient(145deg,rgba(15,23,42,.96),rgba(8,13,27,.92));box-shadow:0 40px 100px rgba(0,0,0,.4),0 0 60px rgba(14,165,233,.08)}
        .audit-report-top{display:flex;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid rgba(148,163,184,.12);color:#64748b;font-size:.75rem}
        .audit-live-dot{display:inline-block;width:7px;height:7px;margin-right:7px;border-radius:50%;background:#34d399;box-shadow:0 0 14px #34d399}
        .audit-score-ring{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;color:#67e8f9;border:1px solid rgba(103,232,249,.25);background:rgba(34,211,238,.08)}
        .audit-meter{height:6px;border-radius:99px;background:rgba(148,163,184,.12);overflow:hidden}.audit-meter span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#0ea5e9,#8b5cf6)}
        .audit-insight{display:flex;gap:.85rem;padding:1rem;border:1px solid rgba(34,211,238,.14);border-radius:16px;background:rgba(34,211,238,.05)}
        .audit-strip{border-block:1px solid rgba(148,163,184,.1);background:rgba(15,23,42,.45)}
        .audit-area{padding:2rem 1.5rem;border-right:1px solid rgba(148,163,184,.1)}.audit-area:last-child{border-right:0}.audit-area svg{color:#67e8f9}.audit-area h2{margin-top:1rem;font-size:.95rem;font-weight:700}.audit-area p{margin-top:.5rem;color:#64748b;font-size:.8rem;line-height:1.55}
        .audit-heading{margin-top:.75rem;font-size:clamp(2rem,4vw,3rem);font-weight:900;letter-spacing:-.04em;line-height:1.08;color:white}
        .audit-heading-first{margin-top:0}
        .audit-copy{margin-top:1.25rem;max-width:38rem;color:#94a3b8;line-height:1.8}
        .audit-check{width:24px;height:24px;display:grid;place-items:center;flex:none;border-radius:50%;color:#6ee7b7;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.18)}
        .audit-proof{padding:1rem;border-radius:28px;border:1px solid rgba(148,163,184,.12);background:rgba(15,23,42,.35)}
        .audit-proof-card{overflow:hidden;border-radius:19px;border:1px solid rgba(148,163,184,.12);background:#0b1020}.audit-proof-card figcaption{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:.9rem 1rem;font-size:.75rem;color:#64748b}.audit-proof-card strong{font-size:.72rem;color:#cbd5e1}.audit-proof-card img{width:100%;display:block}.audit-proof-card.is-after{border-color:rgba(52,211,153,.25);box-shadow:0 20px 50px rgba(16,185,129,.08)}
        .audit-proof-arrow{width:34px;height:34px;margin:-7px auto;position:relative;z-index:2;display:grid;place-items:center;border-radius:50%;background:#0f172a;border:1px solid rgba(103,232,249,.2);color:#67e8f9;transform:rotate(90deg)}
        .audit-process{background:linear-gradient(180deg,rgba(15,23,42,.42),rgba(7,11,24,.65));border-block:1px solid rgba(148,163,184,.08)}
        .audit-step{min-height:230px;padding:1.75rem;border-radius:24px;border:1px solid rgba(148,163,184,.12);background:linear-gradient(145deg,rgba(15,23,42,.7),rgba(15,23,42,.28));transition:.25s ease}.audit-step:hover{transform:translateY(-4px);border-color:rgba(34,211,238,.22)}.audit-step>span{font-size:.8rem;font-weight:800;color:#22d3ee}.audit-step h3{margin-top:3.5rem;font-size:1.15rem;font-weight:800}.audit-step p{margin-top:.75rem;color:#64748b;font-size:.9rem;line-height:1.7}
        .audit-form-shell{display:grid;grid-template-columns:.85fr 1.15fr;overflow:hidden;border:1px solid rgba(34,211,238,.16);border-radius:30px;background:linear-gradient(145deg,rgba(14,165,233,.08),rgba(15,23,42,.65));box-shadow:0 40px 100px rgba(0,0,0,.25)}
        .audit-form-intro{padding:2.25rem;background:radial-gradient(circle at 15% 0%,rgba(34,211,238,.12),transparent 40%);border-right:1px solid rgba(148,163,184,.1)}
        .audit-promise{display:flex;align-items:center;gap:.9rem;color:#67e8f9}.audit-promise svg{width:22px}.audit-promise span{display:flex;flex-direction:column}.audit-promise strong{font-size:.85rem;color:#e2e8f0}.audit-promise small{margin-top:.2rem;color:#64748b}
        .audit-form{padding:2.25rem;background:rgba(5,8,18,.45);display:flex;flex-direction:column;gap:1rem}.audit-form label{display:flex;flex-direction:column;gap:.55rem;color:#cbd5e1;font-size:.78rem;font-weight:700}.audit-form label span{font-weight:400;color:#64748b}.audit-form input,.audit-form textarea{width:100%;border:1px solid rgba(148,163,184,.15);border-radius:13px;background:rgba(255,255,255,.035);padding:.85rem 1rem;color:white;outline:none;transition:.2s}.audit-form input:focus,.audit-form textarea:focus{border-color:rgba(34,211,238,.5);box-shadow:0 0 0 3px rgba(34,211,238,.07)}.audit-form textarea{resize:vertical}
        .audit-status{padding:.8rem 1rem;border-radius:12px;font-size:.82rem}.audit-status.success{color:#a7f3d0;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2)}.audit-status.error{color:#fecaca;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2)}
        .audit-faq{border:1px solid rgba(148,163,184,.11);border-radius:18px;background:rgba(15,23,42,.38)}.audit-faq-plus{width:28px;height:28px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(148,163,184,.15);color:#94a3b8;font-size:1.15rem;transition:.2s}.audit-faq-plus.is-open{transform:rotate(45deg);color:#67e8f9}
        .audit-reveal{opacity:0;transform:translateY(20px);transition:opacity .55s ease,transform .55s ease}.audit-reveal.in{opacity:1;transform:none}
        @media(max-width:900px){.audit-form-shell{grid-template-columns:1fr}.audit-form-intro{border-right:0;border-bottom:1px solid rgba(148,163,184,.1)}}
        @media(max-width:767px){.audit-area{border-right:0;border-bottom:1px solid rgba(148,163,184,.1)}.audit-area:last-child{border-bottom:0}.audit-form,.audit-form-intro{padding:1.5rem}.audit-report-top{font-size:.58rem}}
        @media(prefers-reduced-motion:reduce){.audit-reveal{opacity:1;transform:none;transition:none}}
      `}</style>
    </>
  );
}
