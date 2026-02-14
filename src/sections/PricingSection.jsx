import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function PricingSection() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const tiers = [
    {
      name: "Performance Website",
      price: "Starting at $1,500",
      desc: "For businesses that need a modern site built to convert.",
      featured: false,
      bullets: [
        "Conversion-focused UX",
        "Speed + SEO-ready structure",
        "Analytics + tracking setup",
        "Mobile-first implementation",
      ],
    },
    {
      name: "Website + Systems",
      price: "Custom Scope",
      desc: "For businesses that need automation, CRM, and scalable workflows.",
      featured: true,
      bullets: [
        "CRM integration + lead routing",
        "Automations (follow-ups, reminders)",
        "Booking systems + notifications",
        "Dashboards / internal tools",
      ],
    },
    {
      name: "Ongoing Growth",
      price: "Monthly Retainer",
      desc: "Continuous improvements, new pages, and system optimization.",
      featured: false,
      bullets: [
        "Performance monitoring",
        "Landing pages + experiments",
        "System optimization & iteration",
        "Priority support + updates",
      ],
    },
  ];

  return (
    <section id="pricing" className="section relative overflow-hidden nexus-bg hero-grid">
      <div className="hero-vignette" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        <div className="blob blob-c" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative" ref={ref}>
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400 mb-3">
            INVESTMENT
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Pricing that matches{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
              real outcomes
            </span>
          </h2>
          <p className="text-slate-300 mt-4 text-sm md:text-base">
            Sites are important. Systems are what scale. Every project is scoped based on complexity and goals.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <article
              key={t.name}
              className={[
                "reveal relative rounded-3xl p-[1px] overflow-hidden",
                t.featured ? "ring-1 ring-cyan-400/30" : "ring-1 ring-white/10",
              ].join(" ")}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className={["price-border", t.featured ? "is-featured" : ""].join(" ")} />

              <div
                className={[
                  "relative glass rounded-3xl p-8 border",
                  t.featured ? "border-cyan-400/25" : "border-white/10",
                  "transition-all duration-300 hover:-translate-y-1",
                  "hover:shadow-[0_0_55px_rgba(34,211,238,.12)]",
                ].join(" ")}
              >
                {t.featured ? (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide bg-cyan-400/15 text-cyan-200 border border-cyan-400/25">
                      MOST POPULAR
                    </span>
                  </div>
                ) : null}

                <h3 className="text-white text-lg font-semibold">{t.name}</h3>
                <div className="mt-3 flex items-baseline gap-2">
                  <div className="text-2xl md:text-3xl font-extrabold text-white">
                    {t.price}
                  </div>
                </div>
                <p className="text-slate-400 text-sm mt-3">{t.desc}</p>

                <div className="mt-6 space-y-2">
                  {t.bullets.map((b) => (
                    <div key={b} className="flex items-start gap-2 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    to="/contact"
                    className={[
                      "btn w-full justify-center relative overflow-hidden",
                      t.featured ? "btn-primary" : "btn-outline",
                      "transition-all duration-300 hover:-translate-y-0.5",
                      t.featured
                        ? "hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
                        : "hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]",
                    ].join(" ")}
                  >
                    <span className="btn-shimmer" />
                    Start a project
                  </Link>

                  <div className="mt-3 text-center text-[12px] text-slate-400">
                    Prefer details?{" "}
                    <Link to="/services" className="text-cyan-300 hover:underline">
                      See services →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm">
            If you’re not sure what tier fits, I’ll recommend the right path in a quick call.
          </p>
        </div>
      </div>

      <style>{`
        .blob{
          position:absolute;
          width:520px;
          height:520px;
          border-radius:999px;
          filter: blur(70px);
          opacity: .18;
          transform: translate3d(0,0,0);
          animation: floaty 10s ease-in-out infinite;
        }
        .blob-a{ left:-180px; top:-140px; background: rgba(34,211,238,.85); }
        .blob-b{ right:-220px; top:120px; background: rgba(99,102,241,.85); animation-duration: 12s; }
        .blob-c{ left:20%; bottom:-260px; background: rgba(168,85,247,.85); animation-duration: 14s; }

        @keyframes floaty{
          0%{ transform: translate3d(0,0,0) scale(1); }
          50%{ transform: translate3d(0,-18px,0) scale(1.03); }
          100%{ transform: translate3d(0,0,0) scale(1); }
        }

        .price-border{
          position:absolute;
          inset:-2px;
          background: radial-gradient(900px circle at 20% 10%, rgba(34,211,238,.35), transparent 55%),
                      radial-gradient(900px circle at 80% 70%, rgba(99,102,241,.35), transparent 60%),
                      linear-gradient(90deg, rgba(34,211,238,.25), rgba(99,102,241,.25), rgba(168,85,247,.25));
          opacity:.55;
          filter: blur(0px);
          animation: borderShift 8s linear infinite;
        }
        .price-border.is-featured{
          opacity:.8;
        }

        @keyframes borderShift{
          0%{ transform: translateX(-10%); }
          50%{ transform: translateX(10%); }
          100%{ transform: translateX(-10%); }
        }

        .btn-shimmer{
          position:absolute;
          inset:-2px;
          background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.18) 40%, transparent 60%);
          transform: translateX(-120%);
          animation: shimmer 2.8s ease-in-out infinite;
          pointer-events:none;
        }
        @keyframes shimmer{
          0%{ transform: translateX(-120%); }
          45%{ transform: translateX(120%); }
          100%{ transform: translateX(120%); }
        }

        @media (prefers-reduced-motion: reduce){
          .blob, .price-border, .btn-shimmer{ animation: none !important; }
        }
      `}</style>
    </section>
  );
}
