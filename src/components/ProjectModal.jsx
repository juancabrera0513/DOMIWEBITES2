import React, { useEffect } from "react";

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`${project.title} details`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative glass rounded-2xl shadow-soft max-w-3xl w-full overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <button onClick={onClose} className="btn-outline">Close</button>
        </div>

        <div className="p-5 grid md:grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} screenshot`}
                className="w-full h-64 object-cover"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 768px) 50vw, 100vw"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            ) : (
              <div className="h-64 bg-hero" />
            )}
          </div>
          <div>
            <p className="text-slate-700">{project.description}</p>
            {project.kpis?.length ? (
              <ul className="mt-4 space-y-1 text-sm text-slate-700">
                {project.kpis.map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {k}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags?.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-slate-50">{t}</span>
              ))}
            </div>

            <div className="mt-5 flex gap-2">
              {project.url && (
                <a href={project.url} target="_blank" rel="noreferrer" className="btn-primary">Visit site</a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
