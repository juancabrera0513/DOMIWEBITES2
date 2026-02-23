import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import ProjectModal from "../components/ProjectModal";

import { PROJECTS, PORTFOLIO_CATEGORIES } from "../data/projects";

function CategoryPill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all select-none",
        "border focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/40",
        active
          ? "text-[#061019] border-white/10 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 shadow-[0_0_0_1px_rgba(255,255,255,.08),0_16px_45px_rgba(34,211,238,.18)] hover:-translate-y-[1px]"
          : "text-white/80 bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/15",
      ].join(" ")}
      aria-pressed={active}
      type="button"
    >
      {children}
    </button>
  );
}

const CATEGORIES = PORTFOLIO_CATEGORIES || ["All"];

export default function WorkPage() {
  const { t } = useTranslation(["meta", "portfolio"]);

  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const projects = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  const title =
    t("meta:work_title", "Our Work | Domi Websites") ||
    "Our Work | Domi Websites";

  const description =
    t(
      "meta:work_description",
      "Websites that convert and custom software that scales."
    ) || "Websites that convert and custom software that scales.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://domiwebsites.com/work" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <SeoJsonLd />
      <Header />

      <main
        id="main-content"
        className="nexus-bg hero-grid relative overflow-hidden"
      >
        <div className="hero-vignette" />

        <section className="section relative z-10">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-200/70 mb-3">
                OUR WORK
              </p>

              <h1 className="font-extrabold tracking-tight leading-[1.05] text-center">
                <span className="block text-[40px] sm:text-[56px] md:text-[72px] lg:text-[88px] text-white">
                  Websites that convert.
                </span>

                <span className="block text-[48px] sm:text-[64px] md:text-[82px] lg:text-[98px] grad-text">
                  Custom software that scales.
                </span>
              </h1>

              <p className="mt-8 text-[15px] sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed text-center">
                We design high-performing websites and build custom software
                including CRMs, automation platforms, AI-powered chatbots, and
                intelligent internal tools engineered to streamline operations
                and drive scalable growth.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {[
                  "Mobile-first",
                  "Conversion-focused",
                  "AI-enabled",
                  "Automation-ready",
                  "Built to scale",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full text-sm bg-white/5 border border-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-14 flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((c) => (
                <CategoryPill
                  key={c}
                  active={filter === c}
                  onClick={() => setFilter(c)}
                >
                  {c === "All" ? t("portfolio:all", "All") : c}
                </CategoryPill>
              ))}
            </div>

            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => {
                const projectTitle = p.title;
                const projectDesc = p.description;

                return (
                  <article
                    key={p.id}
                    className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)] hover:shadow-[0_30px_80px_rgba(0,0,0,.55)] transition-all hover:-translate-y-1"
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setModal(p)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setModal(p);
                        }
                      }}
                      className="text-left block w-full focus:outline-none"
                      aria-haspopup="dialog"
                      aria-label={`Open details for ${projectTitle}`}
                    >
                      <div className="relative h-48 bg-black/40">
                        {p.image && (
                          <img
                            src={p.image}
                            alt={projectTitle}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />
                      </div>

                      <div className="p-5">
                        <h3 className="text-white font-semibold text-lg">
                          {projectTitle}
                        </h3>
                        <p className="text-white/60 text-sm mt-2 line-clamp-2">
                          {projectDesc}
                        </p>

                        <div className="mt-4">
                          <Link
                            to={`/work/${p.id}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 text-cyan-200/90 text-sm font-medium group-hover:underline underline-offset-4"
                            aria-label={`View ${projectTitle} details page`}
                          >
                            {t("portfolio:view_details", "View details")}
                            <span aria-hidden>→</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </>
  );
}
