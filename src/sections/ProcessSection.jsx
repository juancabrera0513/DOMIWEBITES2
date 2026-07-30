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
      title: "Understand Your Business",
      desc:
        "We define what you sell, who it's for, and how your website should guide visitors toward action.",
    },
    {
      n: "02",
      title: "Plan the Right Pages",
      desc:
        "We design pages that remove confusion, highlight value, and make it easy to take the next step.",
    },
    {
      n: "03",
      title: "Design and Build",
      desc:
        "We build a fast, professional website that works beautifully on phones and computers.",
    },
    {
      n: "04",
      title: "Save You Time",
      desc:
        "We can add forms, online booking, reminders, and faster follow-up where they help most.",
    },
    {
      n: "05",
      title: "Launch With Confidence",
      desc:
        "We test everything, help you go live, and make improvements based on real results.",
    },
  ];

  return (
    <section className="section relative overflow-hidden nexus-bg hero-grid">
      <div className="hero-vignette" />
      <div className="max-w-6xl mx-auto px-4" ref={ref}>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            A simple process from idea to launch
          </h2>
          <p className="text-slate-300 mt-3 text-sm md:text-base">
            You always know what we are working on, why it matters, and what comes next.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-5 gap-6">
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="reveal group glass border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(34,211,238,.08)]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="text-cyan-400 text-xs font-bold mb-2">
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
