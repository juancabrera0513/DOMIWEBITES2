import React from "react";
import { Link } from "react-router-dom";

function Feature({ text }) {
  return (
    <div
      className={[
        "group relative overflow-hidden",
        "rounded-xl border border-white/10 bg-white/5 backdrop-blur-md",
        "px-4 py-3",
        "transition-all duration-300",
        "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/7",
        "hover:shadow-[0_18px_55px_rgba(0,0,0,.55)]",
      ].join(" ")}
    >
      <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,.18),transparent_55%)]" />
      <div className="relative z-10 flex items-start gap-3">
        <div className="mt-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,.9)]" />
        <span className="text-sm text-white/80 leading-snug">{text}</span>
      </div>
    </div>
  );
}

export default function FounderSection() {
  return (
    <section className="section relative overflow-hidden nexus-bg hero-grid">
      <div className="hero-vignette" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-[520px] w-[520px] rounded-full bg-blue-600/12 blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:gap-20 lg:grid-cols-[0.95fr_1.05fr]">
          {/* IMAGE */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] lg:max-w-[380px] founder-enter">
              <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-cyan-500/30 via-blue-500/18 to-transparent blur-3xl opacity-90" />

              <div className="group relative rounded-[30px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_35px_90px_rgba(0,0,0,.62)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_45px_120px_rgba(0,0,0,.75)]">
                {/* top shine */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.14),transparent_55%)]" />
                {/* edge ring */}
                <div className="absolute inset-0 pointer-events-none rounded-[30px] ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300" />

                <img
                  src="/images/juan.webp"
                  alt="Juan Cabrera"
                  className="w-full aspect-[4/5] object-cover scale-[1.02] transition-transform duration-500 group-hover:scale-[1.06]"
                  loading="lazy"
                  decoding="async"
                />

                {/* stronger bottom gradient + readable text */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-transparent" />
                  <div className="relative z-10">
                    <p className="text-lg font-semibold tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,.75)]">
                      Juan Cabrera
                    </p>
                    <p className="text-sm text-white/75 drop-shadow-[0_2px_10px_rgba(0,0,0,.75)]">
                      Founder & Systems Developer · St. Louis, MO
                    </p>
                  </div>
                </div>

                {/* subtle highlight edge */}
                <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-white/5" />
              </div>
            </div>
          </div>

          {/* TEXT */}
          <div className="space-y-8 founder-enter founder-delay">
            <div className="space-y-4">
              <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/90 font-semibold">
                OUR TEAM
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight">
                Websites are the surface.{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
                  Systems are the power.
                </span>
              </h2>

              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
                Most websites look good. Very few actually{" "}
                <span className="text-white font-semibold">
                  generate leads, automate work, or improve operations.
                </span>
              </p>

              <p className="text-white/55 leading-relaxed max-w-2xl">
                I build high-performance websites and custom business systems (CRM,
                automations, internal tools) that reduce manual work, increase
                conversions, and help local businesses scale with clarity.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Feature text="Conversion-focused UX + clear offers" />
              <Feature text="Automation: forms, follow-ups, CRM" />
              <Feature text="Performance-first builds (fast, SEO-ready)" />
              <Feature text="Scalable systems built to grow" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-3">
              <Link
                to="/contact"
                className="btn btn-primary w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
              >
                Start a project
              </Link>

              <Link
                to="/services"
                className="btn btn-outline w-full sm:w-auto transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
              >
                See services
              </Link>
            </div>

            <p className="text-[11px] text-white/40">
              Built for local businesses — fast load times, clean UX, and systems
              that reduce manual work.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes founderFadeUp {
          from { opacity: 0; transform: translateY(26px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        .founder-enter {
          opacity: 0;
          animation: founderFadeUp .9s ease forwards;
          will-change: transform, opacity, filter;
        }
        .founder-delay { animation-delay: 120ms; }
      `}</style>
    </section>
  );
}
