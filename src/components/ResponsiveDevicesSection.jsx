import { motion } from "framer-motion";

export default function ResponsiveDevicesSection() {
  const desktopMp4 = "/videos/desktop.mp4";
  const desktopWebm = "/videos/desktop.webm";
  const mobileMp4 = "/videos/mobile.mp4";
  const mobileWebm = "/videos/mobile2.webm";

  return (
    <section className="relative py-24 overflow-hidden nexus-bg hero-grid">
      <div className="hero-vignette" />

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <span className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-medium">
            Built for modern businesses
          </span>

          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-white">Responsive</span>{" "}
            <span className="grad-text">across all devices</span>
          </h2>

          <p className="mt-6 text-white/60 max-w-2xl mx-auto text-lg">
            Whether it’s a custom CRM system, automation platform, or high-performance
            website, your software works seamlessly on desktop, tablet, and mobile.
          </p>
        </div>

        <div className="relative flex justify-center items-center">
          <motion.div
            initial={{ x: -140, y: -60, opacity: 0, rotate: -2 }}
            whileInView={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.35 }}
            className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-gray-800 to-gray-900 p-3"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="flex-1 bg-gray-700/50 rounded-md h-7 mx-4 flex items-center px-3">
                <span className="text-xs text-gray-400">domi.systems/dashboard</span>
              </div>
            </div>

            <div className="bg-black rounded-xl overflow-hidden aspect-[16/10]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src={desktopMp4} type="video/mp4" />
                <source src={desktopWebm} type="video/webm" />
              </video>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 160, y: 140, opacity: 0, rotate: 6 }}
            whileInView={{ x: 0, y: 0, opacity: 1, rotate: 2 }}
            transition={{ duration: 0.95, ease: "easeOut", delay: 0.12 }}
            viewport={{ once: true, amount: 0.35 }}
            className="
              absolute
              right-4 bottom-[-34px] sm:right-12 sm:bottom-[-46px] lg:right-24
              w-28 sm:w-36 md:w-44
              rounded-[2rem] overflow-hidden
              border border-white/10 shadow-2xl
              bg-gradient-to-b from-gray-800 to-gray-900 p-2
            "
          >
            <div className="bg-black rounded-[1.5rem] overflow-hidden aspect-[9/19]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                <source src={mobileMp4} type="video/mp4" />
                <source src={mobileWebm} type="video/webm" />
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
