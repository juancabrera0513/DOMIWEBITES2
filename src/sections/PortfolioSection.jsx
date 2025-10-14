// src/sections/PortfolioSection.jsx
import React, { useMemo, useState, useEffect, useCallback } from "react";
import ProjectModal from "../components/ProjectModal";

// ——— Demo data (puedes sustituir con tu data real) ———
const RAW_PROJECTS = [
  { id: "kae",  title: "Kae’s Kitchen", category: "Food",   description: "Bakery storefront with promos.", image: "/portfolio/kae.jpg",  url: "", kpis: ["+28% order inquiries", "Load < 1.5s"], tags: ["Bakery", "E-commerce"] },
  { id: "glo",  title: "Glo Event Co",  category: "Events", description: "Premium booking pages.",          image: "/portfolio/glo.jpg",  url: "", kpis: ["2x booking leads", "Mobile-first"], tags: ["Events", "Booking"] },
  { id: "mama", title: "Mama Pacha",    category: "Retail", description: "Simplified navigation.",          image: "/portfolio/mama.jpg", url: "", kpis: ["Bounce rate ↓", "Time on page ↑"], tags: ["Retail"] },
];

const CATEGORIES = ["All", "Food", "Events", "Retail"];

// ——— Pill de filtro reutilizable ———
function CategoryPill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap",
        "border shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300",
        active
          ? "text-white border-transparent bg-gradient-to-r from-sky-500 to-indigo-500 shadow-md"
          : "text-slate-700 bg-white/90 border-slate-200 hover:bg-slate-50"
      ].join(" ")}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}

const PortfolioSection = () => {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);

  // Soporte de navegación con flechas para los filtros (opcional pero útil)
  const handleKeyNav = useCallback((e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const idx = CATEGORIES.indexOf(filter);
    const next =
      e.key === "ArrowRight"
        ? (idx + 1) % CATEGORIES.length
        : (idx - 1 + CATEGORIES.length) % CATEGORIES.length;
    setFilter(CATEGORIES[next]);
  }, [filter]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyNav);
    return () => window.removeEventListener("keydown", handleKeyNav);
  }, [handleKeyNav]);

  // Filtrado memorizado
  const projects = useMemo(() => {
    if (filter === "All") return RAW_PROJECTS;
    return RAW_PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="portfolio" className="section">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header + filtros (desktop) */}
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Portfolio</h2>
            <p className="text-slate-700 mt-2">Recent work across different industries.</p>
          </div>
          <div className="hidden md:flex gap-2">
            {CATEGORIES.map((c) => (
              <CategoryPill key={c} active={filter === c} onClick={() => setFilter(c)}>
                {c}
              </CategoryPill>
            ))}
          </div>
        </div>

        {/* Filtros (mobile): carrusel horizontal */}
        <div className="mt-4 md:hidden flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((c) => (
            <CategoryPill key={c} active={filter === c} onClick={() => setFilter(c)}>
              {c}
            </CategoryPill>
          ))}
        </div>

        {/* Grid de proyectos */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <article
              key={p.id}
              className="group card overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Botón que abre el modal (toda la tarjeta es clickeable y accesible) */}
              <button
                onClick={() => setModal(p)}
                className="text-left block w-full focus:outline-none"
                aria-haspopup="dialog"
                aria-label={`Open ${p.title} details`}
              >
                {/* Imagen / cover con overlay */}
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={`${p.title} preview`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 85vw"
                      onError={(e) => {
                        // si no carga, dejamos el fondo degradado
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  )}
                  {/* Overlay suave al hover */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors" />
                  {/* Etiqueta de categoría */}
                  <div className="absolute top-3 left-3">
                    <span className="chip chip-amber">{p.category}</span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-slate-700 text-sm mt-1 line-clamp-2">{p.description}</p>

                  {/* KPIs rápidos */}
                  {p.kpis?.length ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.kpis.map((k) => (
                        <span
                          key={k}
                          className="text-[11px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded-full border border-slate-200 bg-slate-50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* CTA “ver detalles” visible al hover en desktop */}
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 text-sm text-sky-700 group-hover:underline">
                      View details
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Modal de proyecto */}
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
};

export default PortfolioSection;
