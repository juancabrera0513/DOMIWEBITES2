import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import SeoJsonLd from "../components/SeoJsonLd";
import { blogPosts } from "../data/blogPosts";

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function BlogPage() {
  const posts = useMemo(() => {
    return [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);

  const title = "Domi Websites Blog | Insights & Web Design Tips";
  const description =
    "Read the Domi Websites blog for tips on web design, SEO, and digital strategy tailored for small businesses in St. Louis and across the U.S.";
  const canonical = "https://domiwebsites.com/blog";
  const ogImage = "https://domiwebsites.com/DomiLogo.webp";

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Domi Websites Blog",
    url: canonical,
    description,
    isPartOf: { "@type": "WebSite", name: "Domi Websites", url: "https://domiwebsites.com" },
    publisher: {
      "@type": "Organization",
      name: "Domi Websites",
      logo: { "@type": "ImageObject", url: ogImage },
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://domiwebsites.com/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <script type="application/ld+json">{JSON.stringify(blogLd)}</script>
      </Helmet>

      <SeoJsonLd />
      <Header />

      <main id="main-content">
        <section className="section relative">
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-200/70 mb-3">
                BLOG
              </p>

              <h1 className="font-extrabold tracking-tight leading-[1.06]">
                <span className="block text-[40px] sm:text-[56px] md:text-[72px] text-white">
                  Insights for growth.
                </span>
                <span className="block text-[44px] sm:text-[62px] md:text-[80px] grad-text">
                  SEO, web, and automation.
                </span>
              </h1>

              <p className="mt-6 text-[15px] sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                Practical guides for small businesses — from high-converting websites to local SEO and scalable systems.
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-6">
              {posts.map((post) => {
                const url = `/blog/${post.slug}`;
                return (
                  <article
                    key={post.slug}
                    className="group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)] hover:shadow-[0_30px_80px_rgba(0,0,0,.55)] transition-all hover:-translate-y-1"
                  >
                    <Link to={url} className="block">
                      <div className="relative h-44 bg-black/40">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : null}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/0" />
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                      </div>

                      <div className="p-6">
                        <p className="text-xs text-white/50">{formatDate(post.date)}</p>
                        <h2 className="mt-2 text-xl font-semibold text-white/90 leading-snug">
                          {post.title}
                        </h2>
                        <p className="mt-3 text-white/60 text-sm leading-relaxed line-clamp-3">
                          {post.summary}
                        </p>

                        <div className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-200/90 group-hover:underline underline-offset-4">
                          Read more
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path
                              fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center text-sm text-white/55">
              Want a quick teardown of your current site?{" "}
              <Link to="/contact" className="text-cyan-200/90 underline underline-offset-4">
                Book a free consultation
              </Link>
              .
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />
    </>
  );
}
