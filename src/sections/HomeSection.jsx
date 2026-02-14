import React from "react";
import { Link } from "react-router-dom";

export default function HomeSection() {
  return (
    <section className="relative overflow-hidden nexus-bg hero-grid">
      <div className="hero-vignette" />

      <div className="container hero-wrap">
        <div className="text-center max-w-5xl mx-auto px-2">
          <h1 className="font-extrabold tracking-tight leading-[1.03]">
            <span className="block text-[38px] sm:text-[50px] md:text-[64px] lg:text-[76px] xl:text-[84px] text-white">
              We build
            </span>

            <span className="block text-[48px] sm:text-[64px] md:text-[82px] lg:text-[98px] xl:text-[108px] grad-text">
              custom business software
            </span>

            <span className="block text-[38px] sm:text-[50px] md:text-[64px] lg:text-[76px] xl:text-[84px] text-white">
              that drives growth
            </span>
          </h1>

          <p className="mt-8 text-[15px] sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            Whether you need a{" "}
            <span className="text-white font-medium">new website</span>, a{" "}
            <span className="text-white font-medium">full redesign</span>, or a{" "}
            <span className="text-white font-medium">custom CRM system</span>, we build{" "}
            <span className="text-white font-medium">scalable digital solutions</span> that help
            businesses improve operations,{" "}
            <span className="text-white font-medium">automate workflows</span>, and{" "}
            <span className="text-white font-medium">increase revenue</span>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
  <Link to="/work" className="btn btn-primary">
    View Our Work →
  </Link>

  <Link to="/contact" className="btn btn-outline">
    Start a Project
  </Link>
</div>

        </div>
      </div>
    </section>
  );
}
