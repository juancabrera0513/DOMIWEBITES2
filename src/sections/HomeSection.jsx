import React from "react";
import { Link } from "react-router-dom";

export default function HomeSection() {
  return (
    <section className="home-hero nexus-bg hero-grid">
      <div className="home-hero__visual" aria-hidden="true">
        <div className="home-hero__aurora" />
        <div className="home-hero__glow home-hero__glow--cyan" />
        <div className="home-hero__glow home-hero__glow--violet" />
        <span className="home-hero__ring home-hero__ring--outer" />
        <span className="home-hero__ring home-hero__ring--inner" />
        <span className="home-hero__trail home-hero__trail--one" />
        <span className="home-hero__trail home-hero__trail--two" />
      </div>
      <div className="home-hero__shade" aria-hidden="true" />

      <div className="container relative z-10">
        <div className="text-center max-w-5xl mx-auto px-2">
          <h1 className="font-extrabold tracking-tight leading-[1.03]">
            <span className="block text-[38px] sm:text-[50px] md:text-[64px] lg:text-[76px] xl:text-[84px] text-white">
              We build
            </span>

            <span className="block text-[48px] sm:text-[64px] md:text-[82px] lg:text-[98px] xl:text-[108px] grad-text">
              websites and tools
            </span>

            <span className="block text-[38px] sm:text-[50px] md:text-[64px] lg:text-[76px] xl:text-[84px] text-white">
              that help you grow
            </span>
          </h1>

          <p
            className="mt-8 text-[15px] sm:text-lg text-white/90 max-w-3xl mx-auto leading-relaxed"
            style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
          >
            Whether you need a new website, a better way to follow up with
            customers, or a private tool for your team, we build solutions that
            help you <span className="text-white font-medium">win more business</span>,{" "}
            <span className="text-white font-medium">save time</span>, and{" "}
            <span className="text-white font-medium">stay organized</span>.
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
