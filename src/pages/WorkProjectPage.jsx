import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";

import { PROJECTS } from "../data/projects";

const SITE_URL = "https://domiwebsites.com";

function safeText(v, fallback = "") {
  if (typeof v !== "string") return fallback;
  return v.trim() || fallback;
}

export default function WorkProjectPage() {
  const { id } = useParams();

  const project = useMemo(() => {
    const pid = String(id || "").trim();
    return PROJECTS.find((p) => String(p.id) === pid) || null;
  }, [id]);

  if (!project) {
    const url = `${SITE_URL}/work`;
    return (
      <>
        <Helmet>
          <title>Project Not Found | Domi Websites</title>
          <meta
            name="description"
            content="The project you are looking for was not found. Browse our work portfolio."
          />
          <meta name="robots" content="noindex,follow" />
          <link rel="canonical" href={url} />
        </Helmet>

        <Header />
        <main id="main-content" className="section">
          <div className="container">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Project not found
              </h1>
              <p className="text-white/60 mt-2">
                That URL doesn’t match a project in our portfolio.
              </p>
              <div className="mt-6">
                <Link to="/work" className="btn btn-primary">
                  Back to Our Work
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const name = safeText(project.title, "Project");
  const summary = safeText(project.description, "");
  const category = safeText(project.category, "");
  const url = `${SITE_URL}/work/${project.id}`;
  const imageUrl = project.image
    ? `${SITE_URL}${project.image}`
    : `${SITE_URL}/domi-websites-custom-business-software-og.jpg`;

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description: summary,
    url,
    image: imageUrl,
    author: { "@type": "Organization", name: "Domi Websites" },
    about: category ? [{ "@type": "Thing", name: category }] : undefined,
  };

  return (
    <>
      <Helmet>
        <title>{`${name} | Our Work | Domi Websites`}</title>
        <meta
          name="description"
          content={summary || "Project details and deliverables."}
        />
        <link rel="canonical" href={url} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${name} | Domi Websites`} />
        <meta
          property="og:description"
          content={summary || "Project details and deliverables."}
        />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${name} | Domi Websites`} />
        <meta
          name="twitter:description"
          content={summary || "Project details and deliverables."}
        />
        <meta name="twitter:image" content={imageUrl} />

        <script type="application/ld+json">{JSON.stringify(portfolioSchema)}</script>
      </Helmet>

      <SeoJsonLd />
      <Header />

      <main id="main-content" className="section">
        <div className="container">
          <nav className="text-sm text-white/60">
            <Link to="/" className="hover:underline text-cyan-200/90">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/work" className="hover:underline text-cyan-200/90">
              Our Work
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/70">{name}</span>
          </nav>

          <div className="mt-6 grid lg:grid-cols-[1.15fr_.85fr] gap-6">
            <article className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
              <div className="relative h-[260px] sm:h-[340px] bg-black/35">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${name} preview`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/0" />
                {category ? (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-white/10 bg-white/5 text-white/80">
                      {category}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {name}
                </h1>
                {summary ? (
                  <p className="text-white/60 mt-3 leading-relaxed">{summary}</p>
                ) : null}

                {project.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-8 grid gap-6">
                  {project.challenge ? (
                    <section>
                      <h2 className="text-lg font-bold text-white">The business needed</h2>
                      <p className="mt-2 text-white/65 leading-relaxed">{project.challenge}</p>
                    </section>
                  ) : null}

                  {project.solution ? (
                    <section>
                      <h2 className="text-lg font-bold text-white">What we built</h2>
                      <p className="mt-2 text-white/65 leading-relaxed">{project.solution}</p>
                    </section>
                  ) : null}

                  {project.details?.length ? (
                    <section>
                      <h2 className="text-lg font-bold text-white">Included in the project</h2>
                      <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-white/70">
                        {project.details.map((detail) => (
                          <li key={detail} className="flex items-start gap-2">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}

                  {project.goals?.length ? (
                    <section>
                      <h2 className="text-lg font-bold text-white">Built to support</h2>
                      <ul className="mt-3 space-y-2 text-white/70">
                        {project.goals.map((goal) => (
                          <li key={goal} className="flex items-start gap-2">
                            <svg className="mt-1 h-4 w-4 shrink-0 text-emerald-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5A1 1 0 015.704 9.29l2.793 2.793 6.793-6.793a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-outline"
                    >
                      Visit live website
                    </a>
                  ) : null}
                  <Link to="/contact" className="btn btn-primary">
                    Build something similar
                  </Link>
                  <Link to="/work" className="btn btn-outline">
                    View more work
                  </Link>
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
                <h3 className="text-white font-semibold">
                  Looking for something similar?
                </h3>
                <p className="text-white/60 mt-2">
                  Tell us what your business needs. We will recommend a clear,
                  practical approach without unnecessary complexity.
                </p>
                <div className="mt-4">
                  <Link to="/services" className="btn btn-outline w-full">
                    Explore Services
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
                <h3 className="text-white font-semibold">More projects</h3>
                <div className="mt-3 space-y-3">
                  {PROJECTS.filter((p) => p.id !== project.id)
                    .slice(0, 3)
                    .map((p) => (
                      <Link
                        key={p.id}
                        to={`/work/${p.id}`}
                        className="block rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-3"
                      >
                        <div className="text-white/90 font-medium text-sm">
                          {p.title}
                        </div>
                        <div className="text-white/60 text-xs mt-1 line-clamp-2">
                          {p.description}
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
