import React, { useMemo, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
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
          ? [
              "text-[#061019]",
              "border-white/10",
              "bg-[linear-gradient(90deg,rgba(34,211,238,1),rgba(96,165,250,1),rgba(167,139,250,1))]",
              "shadow-[0_0_0_1px_rgba(255,255,255,.08),0_16px_45px_rgba(34,211,238,.18)]",
              "hover:brightness-[1.03] hover:-translate-y-[1px]",
            ].join(" ")
          : [
              "text-white/80",
              "bg-white/5",
              "border-white/10",
              "hover:bg-white/10",
              "hover:border-white/15",
            ].join(" "),
      ].join(" ")}
      aria-pressed={active}
      type="button"
    >
      {children}
    </button>
  );
}

const CATEGORIES = PORTFOLIO_CATEGORIES || ["All"];

export default function PortfolioSection({ page = false }) {
  const { t } = useTranslation("portfolio");

  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);

  const viewDetailsLabel = t("view_details", "View details");

  const getCategoryLabel = (c) => {
    if (c === "All") return t("all", "All");
    return c;
  };

  const handleKeyNav = useCallback(
    (e) => {
      if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
      const idx = CATEGORIES.indexOf(filter);
      const next =
        e.key === "ArrowRight"
          ? (idx + 1) % CATEGORIES.length
          : (idx - 1 + CATEGORIES.length) % CATEGORIES.length;
      setFilter(CATEGORIES[next]);
    },
    [filter]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, [handleKeyNav]);

  const projects = useMemo(() => {
    if (filter === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section
      id={page ? "work" : "portfolio"}
      className={[
        "relative overflow-hidden nexus-bg hero-grid",
        page ? "pt-10 pb-16 md:pt-14 md:pb-24" : "section",
      ].join(" ")}
    >
      <div className="hero-vignette" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {page ? (
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-200/70 mb-3">
              {t("label", "Recent work")}
            </p>

            <h1 className="text-[40px] sm:text-[52px] md:text-[60px] font-extrabold text-white tracking-tight leading-[1.06]">
              {t("page_title", "Our")}{" "}
              <span className="grad-text">{t("page_title_accent", "Work")}</span>
            </h1>

            <p className="text-white/60 mt-4 leading-relaxed">
              {t(
                "sub",
                "Real projects for local and small businesses in different industries."
              )}
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-200/70 mb-2">
                {t("label", "Recent work")}
              </p>

              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                {t("title", "Portfolio")}{" "}
                <span className="grad-text">{t("title_accent", "")}</span>
              </h2>

              <p className="text-white/60 mt-3 leading-relaxed">
                {t(
                  "sub",
                  "Real projects for local and small businesses in different industries."
                )}
              </p>
            </div>

            <div className="hidden md:flex gap-2 flex-wrap justify-end">
              {CATEGORIES.map((c) => (
                <CategoryPill
                  key={c}
                  active={filter === c}
                  onClick={() => setFilter(c)}
                >
                  {getCategoryLabel(c)}
                </CategoryPill>
              ))}
            </div>
          </div>
        )}

        {page ? (
          <div className="mt-8 hidden md:flex gap-2 flex-wrap justify-center">
            {CATEGORIES.map((c) => (
              <CategoryPill
                key={c}
                active={filter === c}
                onClick={() => setFilter(c)}
              >
                {getCategoryLabel(c)}
              </CategoryPill>
            ))}
          </div>
        ) : null}

        <div className="mt-4 md:hidden flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((c) => (
            <CategoryPill
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
            >
              {getCategoryLabel(c)}
            </CategoryPill>
          ))}
        </div>

        <div className={page ? "mt-10" : "mt-10"} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => {
            const key = p.i18nKey;
            const title = key ? t(`${key}.name`) : p.title;
            const description = key ? t(`${key}.short`) : p.description;

            return (
              <article
                key={p.id}
                className={[
                  "group rounded-2xl overflow-hidden",
                  "bg-white/5 border border-white/10",
                  "shadow-[0_10px_30px_rgba(0,0,0,.35)]",
                  "hover:shadow-[0_30px_80px_rgba(0,0,0,.55)]",
                  "transition-all hover:-translate-y-1",
                ].join(" ")}
              >
                <button
                  onClick={() => setModal(p)}
                  className="text-left block w-full focus:outline-none"
                  aria-haspopup="dialog"
                  aria-label={t("open_details", { title })}
                  type="button"
                >
                  <div className="relative h-48 bg-black/40">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${title} preview`}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 85vw"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : null}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/0" />
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />

                    {p.category ? (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border border-white/10 bg-white/5 text-white/80">
                          {p.category}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-white/90">{title}</h3>
                    <p className="text-white/60 text-sm mt-1 leading-relaxed line-clamp-2">
                      {description}
                    </p>

                    {p.kpis?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.kpis.slice(0, 2).map((k) => (
                          <span
                            key={k}
                            className="text-[11px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-300/20"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {p.tags?.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.tags.slice(0, 3).map((tTag) => (
                          <span
                            key={tTag}
                            className="text-[11px] px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/70"
                          >
                            {tTag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-4">
                      <span className="inline-flex items-center gap-2 text-sm text-cyan-200/90 group-hover:underline underline-offset-4">
                        {viewDetailsLabel}
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
