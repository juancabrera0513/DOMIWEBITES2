import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function PricingSection({ asPage = false }) {
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
      name: "Starter Website",
      price: "$1,500",
      note: "Starts at",
      desc: "Everything you need to look professional online and make it easy for customers to contact you.",
      featured: false,
      bullets: [
        "Up to 5 pages built around your business",
        "Looks great on phones and computers",
        "Contact or appointment request form",
        "Set up to be understood by Google",
        "Personal help when your site goes live",
      ],
      cta: "Build my website",
    },
    {
      name: "Growth Website",
      price: "$2,500",
      note: "Starts at",
      desc: "For businesses ready to explain their services better and turn more visitors into real inquiries.",
      featured: false,
      bullets: [
        "Up to 10 pages with clear service details",
        "A clear path from visitor to customer",
        "Better visibility in local Google searches",
        "Project gallery, menu, or helpful articles",
        "See where your inquiries come from",
      ],
      cta: "Grow my business",
    },
    {
      name: "Website That Follows Up",
      price: "$4,500",
      note: "Starts at",
      desc: "Capture new inquiries, reply faster, and keep every potential customer organized.",
      featured: true,
      bullets: [
        "Everything in the Growth Website",
        "One organized list of customers and inquiries",
        "Automatic email or text follow-up",
        "Online booking and appointment reminders",
        "A website assistant for common questions",
      ],
      cta: "Improve my follow-up",
    },
    {
      name: "Custom Business Tool",
      price: "$7,500+",
      note: "Based on your needs",
      desc: "A private tool made for the way your team works, without forcing your business into a generic app.",
      featured: false,
      bullets: [
        "A private workspace for your team or clients",
        "Keep customers, jobs, and information together",
        "Give each team member the right access",
        "Connect the tools you already use",
        "Training and personal launch support",
      ],
      cta: "Discuss my idea",
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

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 relative" ref={ref}>
        <div className="text-center max-w-3xl mx-auto">
          {asPage ? (
            <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Website & software pricing for{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                your next stage of growth
              </span>
            </h1>
          ) : (
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Website & software pricing for{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                your next stage of growth
              </span>
            </h2>
          )}
          <p className="text-slate-300 mt-4 text-sm md:text-base">
            Choose what fits today. Every package can grow with your business later.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          {tiers.map((tier, index) => (
            <article
              key={tier.name}
              className={[
                "reveal relative rounded-3xl p-[1px] overflow-hidden",
                tier.featured ? "ring-1 ring-cyan-400/30" : "ring-1 ring-white/10",
              ].join(" ")}
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <div className={["price-border", tier.featured ? "is-featured" : ""].join(" ")} />

              <div
                className={[
                  "relative glass rounded-3xl p-7 border h-full flex flex-col",
                  tier.featured ? "border-cyan-400/25" : "border-white/10",
                  "transition-all duration-300 hover:-translate-y-1",
                  "hover:shadow-[0_0_55px_rgba(34,211,238,.12)]",
                ].join(" ")}
              >
                <h2 className="text-white text-xl md:text-2xl font-bold leading-tight min-h-[3.5rem]">
                  {tier.name}
                </h2>
                <div className="mt-5 flex items-end gap-2">
                  <div className="font-display text-[2.65rem] leading-none font-black text-white tabular-nums tracking-[-0.045em]">
                    {tier.price}
                  </div>
                  <div className="pb-1 text-sm text-slate-400">{tier.note}</div>
                </div>
                <div className="my-5 h-px bg-gradient-to-r from-cyan-300/35 via-white/10 to-transparent" />
                <p className="text-slate-300 text-[15px] leading-7 min-h-[7rem]">{tier.desc}</p>

                <div className="mt-5 space-y-3.5 flex-1">
                  {tier.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-3 text-[15px] leading-6 text-slate-200">
                      <span className="mt-0.5 h-5 w-5 rounded-full bg-cyan-300/10 border border-cyan-300/20 text-cyan-300 grid place-items-center shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span className="pt-px">{bullet}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    to="/contact"
                    className={[
                      "btn w-full justify-center relative overflow-hidden",
                      tier.featured ? "btn-primary" : "btn-outline",
                      "transition-all duration-300 hover:-translate-y-0.5",
                    ].join(" ")}
                  >
                    <span className="btn-shimmer" />
                    {tier.cta}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-400 text-sm">
            You will receive a clear list of what is included and a final price before any work begins.
          </p>
          <Link to="/audit" className="inline-block mt-3 text-sm text-cyan-300 hover:underline">
            Not sure which one fits? Start with a free website review
          </Link>
        </div>
      </div>

      <style>{`
        .blob{position:absolute;width:520px;height:520px;border-radius:999px;filter:blur(70px);opacity:.18;transform:translate3d(0,0,0);animation:floaty 10s ease-in-out infinite}
        .blob-a{left:-180px;top:-140px;background:rgba(34,211,238,.85)}
        .blob-b{right:-220px;top:120px;background:rgba(99,102,241,.85);animation-duration:12s}
        .blob-c{left:20%;bottom:-260px;background:rgba(168,85,247,.85);animation-duration:14s}
        @keyframes floaty{0%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(0,-18px,0) scale(1.03)}100%{transform:translate3d(0,0,0) scale(1)}}
        .price-border{position:absolute;inset:-2px;background:radial-gradient(900px circle at 20% 10%,rgba(34,211,238,.35),transparent 55%),radial-gradient(900px circle at 80% 70%,rgba(99,102,241,.35),transparent 60%),linear-gradient(90deg,rgba(34,211,238,.25),rgba(99,102,241,.25),rgba(168,85,247,.25));opacity:.55;animation:borderShift 8s linear infinite}
        .price-border.is-featured{opacity:.8}
        article:has(.price-border.is-featured) .glass{background:linear-gradient(155deg,rgba(15,54,74,.82),rgba(30,41,77,.78) 55%,rgba(47,36,84,.76))}
        @keyframes borderShift{0%{transform:translateX(-10%)}50%{transform:translateX(10%)}100%{transform:translateX(-10%)}}
        .btn-shimmer{position:absolute;inset:-2px;background:linear-gradient(110deg,transparent 20%,rgba(255,255,255,.18) 40%,transparent 60%);transform:translateX(-120%);animation:shimmer 2.8s ease-in-out infinite;pointer-events:none}
        @keyframes shimmer{0%{transform:translateX(-120%)}45%{transform:translateX(120%)}100%{transform:translateX(120%)}}
        @media(prefers-reduced-motion:reduce){.blob,.price-border,.btn-shimmer{animation:none!important}}
      `}</style>
    </section>
  );
}
