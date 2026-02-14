import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import DevicePreview from "./DevicePreview";

const ProjectModal = ({ project, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  if (!project) return null;

  const key = project.i18nKey;
  const title = key ? t(`${key}.name`) : project.title;
  const description = key ? t(`${key}.short`) : project.description;
  const longDescription = key ? t(`${key}.long`) : project.longDescription;

  const closeLabel = t("common.cta.cancel", "Close");
  const visitLabel = t("portfolio.visit", "Visit site");

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} details`}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <button
        className="absolute inset-0 w-full h-full cursor-default"
        onClick={onClose}
        aria-label="Close modal"
        type="button"
      />

      <div className="relative w-full h-full flex items-stretch justify-center p-0 md:p-6">
        <div
          className={[
            "relative w-full h-full max-w-7xl",
            "rounded-none md:rounded-3xl",
            "overflow-hidden flex flex-col",
            "glass border border-white/10",
            "shadow-[0_30px_90px_rgba(0,0,0,.65)]",
          ].join(" ")}
          onClick={(e) => e.stopPropagation()} 
        >
          <header className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/10 bg-black/20 backdrop-blur z-10">
            <div className="min-w-0">
              <h3 className="text-base md:text-xl font-semibold text-white/90 truncate">
                {title}
              </h3>
              {project.location ? (
                <p className="text-[11px] md:text-xs text-white/55 truncate">
                  {project.location}
                </p>
              ) : null}
            </div>

            <button
              onClick={onClose}
              className="btn btn-outline btn-sm"
              type="button"
            >
              {closeLabel}
            </button>
          </header>

          <div className="flex-1 overflow-y-auto px-3 md:px-6 pb-5 md:pb-8 pt-4 space-y-6 md:space-y-8">
            {project.url ? <DevicePreview url={project.url} /> : null}

            <div className="max-w-6xl mx-auto grid gap-6 md:gap-8 md:grid-cols-2">
              <div className="space-y-3">
                {description ? (
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {description}
                  </p>
                ) : null}

                {longDescription ? (
                  <p className="text-white/55 text-sm leading-relaxed whitespace-pre-line">
                    {longDescription}
                  </p>
                ) : null}

                {project.kpis?.length ? (
                  <ul className="mt-3 space-y-2 text-xs md:text-sm text-white/70">
                    {project.kpis.map((k) => (
                      <li key={k} className="flex items-start gap-2">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,.35)]" />
                        <span className="leading-relaxed">{k}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="space-y-4 md:space-y-5">
                {project.tags?.length ? (
                  <div>
                    <p className="text-xs font-semibold text-white/60 mb-2 tracking-wide">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tTag) => (
                        <span
                          key={tTag}
                          className="text-[11px] px-2 py-1 rounded-full border border-white/10 bg-white/5 text-white/70"
                        >
                          {tTag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {project.category ? (
                  <div>
                    <p className="text-xs font-semibold text-white/60 mb-2 tracking-wide">
                      Category
                    </p>
                    <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border border-white/10 bg-white/5 text-white/80">
                      {project.category}
                    </span>
                  </div>
                ) : null}

                {project.url ? (
                  <div className="pt-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary inline-flex items-center gap-2 w-full sm:w-auto"
                    >
                      {visitLabel}
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
                    </a>

                    <p className="mt-2 text-[11px] text-white/45">
                      Tip: open in a new tab for the smoothest experience.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
