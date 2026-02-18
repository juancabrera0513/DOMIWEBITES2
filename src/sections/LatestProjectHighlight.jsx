import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LATEST_PROJECT_URL = "https://www.gloeventco.com/";

export default function LatestProjectHighlight() {
  const { t } = useTranslation(["home"]);

  const label = t("latest_project_label", "Live project preview");
  const title = t("latest_project_title", "Latest Project Highlight");
  const subtitle = t(
    "latest_project_sub",
    "A real client build — modern redesign, fast performance, and conversion-focused UX."
  );

  const ctaPrimary = t("latest_project_cta_primary", "Start a Project");
  const ctaSecondary = t("latest_project_cta_secondary", "See more work");

  const note = t(
    "latest_project_note",
    "Explore the full site experience — open the live project in a new tab."
  );

  const hostname = useMemo(() => {
    try {
      return new URL(LATEST_PROJECT_URL).hostname;
    } catch {
      return LATEST_PROJECT_URL;
    }
  }, []);

  const Frame = ({ children, tallMobile = false }) => (
    <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
      <div className="h-10 bg-white/5 flex items-center px-4 gap-2 border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 text-[12px] text-white/55 truncate">
          {hostname}
        </span>
      </div>

      <div
        className={
          tallMobile
            ? "relative h-[560px] bg-black"
            : "relative aspect-[16/9] bg-black"
        }
      >
        {children}
      </div>
    </div>
  );

  return (
    <section
      id="latest-project"
      className="section relative overflow-hidden nexus-bg hero-grid"
    >
      <div className="hero-vignette" />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6 md:mb-8">
          <div className="max-w-2xl">
            <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/90 mb-2">
              {label}
            </p>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-tight">
              {title}
            </h2>

            <p className="mt-3 text-sm md:text-base text-white/60 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
            <Link to="/work" className="btn btn-outline w-full sm:w-auto">
              {ctaSecondary}
            </Link>

            <Link to="/contact" className="btn btn-primary w-full sm:w-auto">
              {ctaPrimary}
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="hidden md:flex justify-center">
            <div className="relative origin-top scale-[0.90] lg:scale-[0.90]">
              
              <div className="absolute -inset-4 rounded-[32px] bg-gradient-to-r from-cyan-400/20 via-indigo-500/20 to-violet-500/20 blur-2xl opacity-70 pointer-events-none" />

              <Frame>
                <iframe
                  src={LATEST_PROJECT_URL}
                  title="Latest project live preview"
                  className="w-[1200px] h-[675px] border-0 relative z-10"
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Frame>
            </div>
          </div>

          <div className="block md:hidden">
            <Frame tallMobile>
              <iframe
                src={LATEST_PROJECT_URL}
                title="Latest project live preview (mobile)"
                className="w-full h-full border-0"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Frame>
          </div>

          <div className="text-center">
            <p className="text-[11px] text-white/45">{note}</p>
            <a
              href={LATEST_PROJECT_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex mt-2 text-sm text-cyan-200/90 hover:text-cyan-100 underline underline-offset-4"
            >
              {t("latest_project_open_live_inline", "Open the live site →")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
