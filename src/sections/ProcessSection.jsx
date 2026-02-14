import React, { useEffect, useRef } from "react";

export default function ProcessSection() {
  const ref = useRef(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("in")
        ),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const steps = [
    {
      n: "01",
      title: "Strategy & Offer Clarity",
      desc:
        "We define what you sell, who it's for, and how your website should guide visitors toward action.",
    },
    {
      n: "02",
      title: "UX & Conversion Structure",
      desc:
        "We design pages that remove confusion, highlight value, and make it easy to take the next step.",
    },
    {
      n: "03",
      title: "Build & Performance",
      desc:
        "Fast-loading, SEO-ready builds optimized for mobile and long-term scalability.",
    },
    {
      n: "04",
      title: "Systems & Automation",
      desc:
        "Forms, CRM routing, automations, booking flows — your website becomes a working system.",
    },
    {
      n: "05",
      title: "Launch & Optimization",
      desc:
        "Tracking, refinements, and continuous improvements based on real user behavior.",
    },
  ];

  return (
    <section className="section relative overflow-hidden nexus-bg hero-grid">
      <div className="hero-vignette" />
      <div className="max-w-6xl mx-auto px-4" ref={ref}>
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-cyan-400 mb-3">
            HOW IT WORKS
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            From website to business engine
          </h2>
          <p className="text-slate-300 mt-3 text-sm md:text-base">
            Every project follows a structured process designed to generate
            clarity, conversions, and scalable systems.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal group glass border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,.08)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="text-cyan-400 text-xs font-bold tracking-wider mb-2">
                {s.n}
              </div>
              <h3 className="text-white font-semibold mb-2">
                {s.title}
              </h3>
              <p className="text-slate-400 text-sm">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
