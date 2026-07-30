import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import { blogPosts } from "../data/blogPosts";

const BLOG_GRADIENTS = {
  cyan: "linear-gradient(135deg, #082f49 0%, #0e7490 48%, #172554 100%)",
  violet: "linear-gradient(135deg, #2e1065 0%, #6d28d9 48%, #172554 100%)",
  blue: "linear-gradient(135deg, #172554 0%, #1d4ed8 52%, #083344 100%)",
  emerald: "linear-gradient(135deg, #052e2b 0%, #047857 48%, #172554 100%)",
  pink: "linear-gradient(135deg, #500724 0%, #be185d 48%, #312e81 100%)",
  amber: "linear-gradient(135deg, #451a03 0%, #b45309 48%, #312e81 100%)",
};

function formatDate(dateStr) {
  try {
    const d = new Date(`${dateStr}T12:00:00`);
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
  const ogImage = "https://domiwebsites.com/domi-websites-custom-business-software-og.jpg";

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
              <h1 className="font-extrabold tracking-tight leading-[1.06]">
                <span className="block text-[40px] sm:text-[56px] md:text-[72px] text-white">
                  Insights for growth.
                </span>
                <span className="block text-[44px] sm:text-[62px] md:text-[80px] grad-text">
                  Get found, earn trust, and grow.
                </span>
              </h1>

              <p className="mt-6 text-[15px] sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                Straightforward advice to help your business improve its website, reach more local customers, and make better technology decisions.
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
                        ) : (
                          <div
                            className="absolute inset-0 overflow-hidden"
                            style={{ background: BLOG_GRADIENTS[post.theme] || BLOG_GRADIENTS.blue }}
                            aria-hidden="true"
                          >
                            <div className="absolute -left-10 -top-16 h-52 w-52 rounded-full border border-white/15 bg-white/5 blur-[1px]" />
                            <div className="absolute right-8 top-8 h-20 w-20 rotate-12 rounded-2xl border border-white/15 bg-white/10" />
                            <div className="absolute bottom-[-70px] right-[-30px] h-60 w-60 rounded-full bg-cyan-300/15 blur-2xl" />
                            <div className="absolute inset-0 opacity-25 hero-grid" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/0" />
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                      </div>

                      <div className="p-6">
                        <p className="text-xs text-white/50">
                          {post.updated ? `Updated ${formatDate(post.updated)}` : formatDate(post.date)}
                        </p>
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
              Want a clear review of your current site?{" "}
              <Link to="/contact" className="text-cyan-200/90 underline underline-offset-4">
                Book a free consultation
              </Link>
              .
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
