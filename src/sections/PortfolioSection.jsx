import React, { useMemo, useState } from "react";
import ProjectModal from "../components/ProjectModal";

const RAW_PROJECTS = [
  { id: "kae",  title: "Kae’s Kitchen", category: "Food",   description: "Bakery storefront with promos.", image: "/portfolio/kae.jpg",  url: "", kpis: ["+28% order inquiries", "Load < 1.5s"], tags: ["Bakery", "E-commerce"] },
  { id: "glo",  title: "Glo Event Co",  category: "Events", description: "Premium booking pages.",          image: "/portfolio/glo.jpg",  url: "", kpis: ["2x booking leads", "Mobile-first"], tags: ["Events", "Booking"] },
  { id: "mama", title: "Mama Pacha",    category: "Retail", description: "Simplified navigation.",          image: "/portfolio/mama.jpg", url: "", kpis: ["Bounce rate ↓", "Time on page ↑"], tags: ["Retail"] },
];

const CATEGORIES = ["All", "Food", "Events", "Retail"];

const PortfolioSection = () => {
  const [filter, setFilter] = useState("All");
  const [modal, setModal] = useState(null);

  const projects = useMemo(() => {
    if (filter === "All") return RAW_PROJECTS;
    return RAW_PROJECTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="portfolio" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Portfolio</h2>
            <p className="text-slate-700 mt-2">Recent work across different industries.</p>
          </div>
          <div className="hidden md:flex gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`btn-outline ${filter===c ? "ring-2 ring-sky-200 border-sky-300" : ""}`}
                aria-pressed={filter === c}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 md:hidden flex gap-2 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`btn-outline ${filter===c ? "ring-2 ring-sky-200 border-sky-300" : ""}`}
              aria-pressed={filter === c}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <article key={p.id} className="card overflow-hidden hover-lift">
              <button onClick={() => setModal(p)} className="text-left block w-full focus:outline-none" aria-haspopup="dialog" aria-label={`Open ${p.title} details`}>
                <div className="relative h-44 bg-hero">
                  {p.image && (
                    <img
                      src={p.image}
                      alt={`${p.title} preview`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="text-slate-700 text-sm mt-1 line-clamp-2">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags?.slice(0,3).map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-lg border border-slate-200 bg-slate-50">{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
      {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
};

export default PortfolioSection;
