import React, { useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blogPosts } from "../data/blogPosts";

const SITE_URL = "https://domiwebsites.com";
const DEFAULT_OG = `${SITE_URL}/og.webp`;

function toISO(dateStr) {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return null;
    return d.toISOString();
  } catch (_) {
    return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams();

  const post = useMemo(() => blogPosts.find((p) => p.slug === slug), [slug]);
  const index = useMemo(() => blogPosts.findIndex((p) => p.slug === slug), [slug]);
  const prev = index > 0 ? blogPosts[index - 1] : null;
  const next = index >= 0 && index < blogPosts.length - 1 ? blogPosts[index + 1] : null;

  if (!post) return <Navigate to="/blog" replace />;

  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | Domi Websites Blog`;
  const description = post.summary || "Read the latest insights from Domi Websites.";
  const image = post.image ? `${SITE_URL}${post.image}` : DEFAULT_OG;
  const publishedISO = toISO(post.date);
  const modifiedISO = toISO(post.updated || post.date);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description,
    image: [image],
    datePublished: publishedISO || undefined,
    dateModified: modifiedISO || undefined,
    author: { "@type": "Person", name: "Juan Cabrera" },
    publisher: {
      "@type": "Organization",
      name: "Domi Websites",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/DomiLogo.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />

        <meta property="og:site_name" content="Domi Websites" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main id="main-content" className="section">
        <div className="container max-w-4xl">
          <nav className="text-sm text-white/55">
            <Link to="/" className="hover:underline text-cyan-200/90">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:underline text-cyan-200/90">
              Blog
            </Link>
          </nav>

          <header className="mt-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {post.title}
            </h1>
            <p className="mt-3 text-white/55 text-sm">
              {new Date(post.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          {post.image ? (
            <div className="mt-7 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-[240px] md:h-[360px] object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}

          <article className="mt-10 glass rounded-2xl border border-white/10 p-7 md:p-9">
            <div
              className="prose prose-invert max-w-none prose-a:text-cyan-200/90 prose-a:underline prose-a:underline-offset-4 prose-strong:text-white"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          <section className="mt-8 glass rounded-2xl border border-white/10 p-6 md:p-7">
            <h2 className="text-xl font-extrabold text-white">Need help implementing this?</h2>
            <p className="mt-2 text-white/60">
              We build conversion-focused websites and custom software (CRMs, automation tools, AI chatbots,
              and internal platforms).
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="btn btn-primary">
                Start a Project
              </Link>
              <Link to="/work" className="btn btn-outline">
                See Our Work
              </Link>
              <Link to="/services" className="btn btn-outline">
                Explore Services
              </Link>
            </div>
          </section>

          {(prev || next) ? (
            <section className="mt-8 grid sm:grid-cols-2 gap-4">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="block glass rounded-2xl border border-white/10 p-5 hover:bg-white/5 transition"
                >
                  <div className="text-[11px] tracking-[0.25em] uppercase text-white/55">
                    Previous
                  </div>
                  <div className="mt-2 font-semibold text-white/90 leading-snug">
                    {prev.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {next ? (
                <Link
                  to={`/blog/${next.slug}`}
                  className="block glass rounded-2xl border border-white/10 p-5 hover:bg-white/5 transition"
                >
                  <div className="text-[11px] tracking-[0.25em] uppercase text-white/55">
                    Next
                  </div>
                  <div className="mt-2 font-semibold text-white/90 leading-snug">
                    {next.title}
                  </div>
                </Link>
              ) : null}
            </section>
          ) : null}

          <div className="mt-10">
            <Link to="/blog" className="text-cyan-200/90 hover:underline underline-offset-4">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
