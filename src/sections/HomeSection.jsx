import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HomeSection() {
  const desktopVideo = "/videos/desktop.webm";
  const mobileVideo = "/videos/mobile.webm";

  return (
    <section className="relative overflow-hidden nexus-bg hero-grid pt-32 pb-36">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-0" />

<div className="pointer-events-none absolute inset-0 z-0">
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

  <motion.div
    initial={{ x: -140, y: -120, opacity: 0, rotate: -6 }}
    animate={{ x: 0, y: 0, opacity: 0.5, rotate: -2 }}
    transition={{ duration: 1.05, ease: "easeOut" }}
    className="
      absolute left-4 top-8 sm:left-8 sm:top-10
      w-[clamp(320px,52vw,760px)]
      rounded-2xl overflow-hidden
      border border-white/10 shadow-2xl
      bg-gradient-to-b from-gray-800 to-gray-900 p-3
    "
  >
   <div className="bg-black rounded-xl overflow-hidden aspect-[16/10]">
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    className="w-full h-full object-cover"
  >
    <source src="/videos/desktop.mp4" type="video/mp4" />
    <source src="/videos/desktop.webm" type="video/webm" />
  </video>
</div>

  </motion.div>

  <motion.div
    initial={{ x: 140, y: 140, opacity: 0, rotate: 10 }}
    animate={{ x: 0, y: 0, opacity: 0.6, rotate: 4 }}
    transition={{ duration: 1.15, ease: "easeOut", delay: 0.15 }}
    className="
absolute right-12 bottom-16 sm:right-20 sm:bottom-20
      w-[clamp(140px,16vw,220px)]
      rounded-[2rem] overflow-hidden
      border border-white/10 shadow-2xl
      bg-gradient-to-b from-gray-800 to-gray-900 p-2
    "
  >
    <div className="bg-black rounded-[1.5rem] overflow-hidden aspect-[9/19]">
      <video
        src={mobileVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    </div>
  </motion.div>
</div>


      <div className="container relative z-10">
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

          <p
  className="mt-8 text-[15px] sm:text-lg text-white max-w-3xl mx-auto leading-relaxed"
  style={{ textShadow: "0 2px 18px rgba(0,0,0,0.55)" }}
>
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
