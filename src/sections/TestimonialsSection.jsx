// src/sections/TestimonialsSection.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";

// Fallback (por si no cargas tus reviews previos)
const FALLBACK = [
  { name: "Kae’s Kitchen", role: "Bakery Owner", quote: "They delivered a clean storefront site with online ordering that my customers actually use. Sales up and zero headaches." },
  { name: "Glo Event Co", role: "Founder",       quote: "Loads fast, looks premium, and the booking inquiries doubled within weeks. Worth every penny." },
  { name: "Mama Pacha",   role: "Retail",        quote: "The redesign improved navigation and product pages. Our bounce rate dropped noticeably." }
];

function loadExtraTestimonials() {
  try {
    // eslint-disable-next-line global-require
    const mod = require("../data/testimonials");
    const raw = (mod && (mod.testimonials || mod.default)) || [];
    return Array.isArray(raw) ? raw : [];
  } catch (_) {
    // Si no existe el archivo o falla el require, intentamos con window
    if (typeof window !== "undefined" && Array.isArray(window.__EXTRA_TESTIMONIALS__)) {
      return window.__EXTRA_TESTIMONIALS__;
    }
    return [];
  }
}

function keyOf(t) {
  return `${(t.name || "").trim()}|${(t.quote || "").trim()}`.toLowerCase();
}

function Avatar({ name = "" }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");
  return (
    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 text-white grid place-items-center font-semibold shadow">
      {initials || "★"}
    </div>
  );
}

function Stars({ n = 5 }) {
  return (
    <div className="flex gap-0.5 text-amber-500" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} aria-hidden>★</span>
      ))}
    </div>
  );
}

const TestimonialsSection = () => {
  const scrollerRef = useRef(null);
  const [isHovering, setHovering] = useState(false);

  const testimonials = useMemo(() => {
    const extra = loadExtraTestimonials();
    const map = new Map();
    [...extra, ...FALLBACK].forEach((t) => {
      const k = keyOf(t);
      if (!map.has(k)) map.set(k, t);
    });
    return Array.from(map.values());
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let raf;
    let last = 0;

    const step = (ts) => {
      if (isHovering) {
        raf = requestAnimationFrame(step);
        last = ts;
        return;
      }
      if (!last) last = ts;
      const dt = ts - last;
      last = ts;

      const overflow = el.scrollWidth > el.clientWidth + 8;
      if (overflow) {
        el.scrollLeft += dt * 0.06; // desplazamiento suave
        if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 2) {
          el.scrollLeft = 0; // loop
        }
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isHovering]);

  const scrollByAmount = (dir = 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">What clients say</h2>
          <p className="text-slate-700 mt-2">Real results from small businesses we work with.</p>
        </div>

        {/* Carrusel / Grid */}
        <div
          className="relative mt-8"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onTouchStart={() => setHovering(true)}
          onTouchEnd={() => setHovering(false)}
        >
          {/* Botones laterales (desktop) */}
          <button
            type="button"
            className="hidden md:grid place-items-center absolute -left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 border border-slate-200 shadow hover:bg-white"
            onClick={() => scrollByAmount(-1)}
            aria-label="Previous testimonials"
          >
            ‹
          </button>

          <button
            type="button"
            className="hidden md:grid place-items-center absolute -right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 border border-slate-200 shadow hover:bg-white"
            onClick={() => scrollByAmount(1)}
            aria-label="Next testimonials"
          >
            ›
          </button>

          <div ref={scrollerRef} className="overflow-x-auto no-scrollbar snap-x snap-mandatory md:snap-none">
            <div className="grid grid-flow-col auto-cols-[88%] sm:auto-cols-[70%] md:auto-cols-auto md:grid-flow-row md:grid-cols-3 gap-4">
              {testimonials.map((t, i) => (
                <figure
                  key={`${t.name}-${i}`}
                  className="snap-center md:snap-none card p-6 bg-gradient-to-b from-white to-slate-50/80 border border-slate-100 hover:-translate-y-1 hover:shadow-xl transition-all"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <Avatar name={t.name} />
                    <div className="flex-1">
                      <Stars n={5} />
                      <blockquote className="mt-2 text-slate-800 leading-relaxed">“{t.quote}”</blockquote>
                      <figcaption className="mt-4 text-sm text-slate-600">
                        <span className="font-semibold">{t.name}</span>
                        {t.role ? <> • {t.role}</> : null}
                      </figcaption>
                    </div>
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </div>

        {/* Micro-CTA */}
        <div className="mt-6 text-center text-sm text-slate-600">
          Want a quick teardown of your current site?{" "}
          <a href="https://calendly.com/domiwebsites/30min" className="text-sky-700 underline">
            Book a free consultation
          </a>
          .
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
