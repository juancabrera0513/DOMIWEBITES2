// src/pages/Blog.jsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../data/blogPosts";
import Header from "../components/Header";
import Footer from "../components/Footer";

// --- Elimina JSON-LD de reseñas SOLO en /blog ---
function stripReviewSchemas() {
  try {
    var nodes = document.querySelectorAll('script[type="application/ld+json"]');
    var badTypes = { Review: true, AggregateRating: true };

    nodes.forEach(function (s) {
      // No tocar nuestro script del listado del blog
      if (s.id === "blog-listing-ld") return;

      var txt = s.textContent || "";
      // Rápido: evita parsear si no aparecen palabras clave
      if (!/\"@type\"\s*:/.test(txt)) return;

      try {
        var json = JSON.parse(txt);
        var typesRaw = json && json["@type"];
        var types = Array.isArray(typesRaw) ? typesRaw : (typesRaw ? [typesRaw] : []);

        var hasBadType =
          types.some(function (t) { return !!badTypes[t]; }) ||
          (json && json.itemReviewed && badTypes[json.itemReviewed["@type"]]);

        if (hasBadType) {
          s.parentElement && s.parentElement.removeChild(s);
        }
      } catch (e) {
        // Si falla el parseo, lo ignoramos
      }
    });
  } catch (e) {
    // Silencioso
  }
}

const Blog = () => {
  useEffect(() => {
    // Solo en /blog (esta página)
    stripReviewSchemas();
  }, []);

  return (
    <>
      <Helmet>
        <title>Domi Websites Blog | Insights & Web Design Tips</title>
        <meta
          name="description"
          content="Read the Domi Websites blog for tips on web design, SEO, and digital strategy tailored for small businesses in St. Louis and across the U.S."
        />
        <link rel="canonical" href="https://domiwebsites.com/blog" />

        {/* JSON-LD correcto del listado (sin reseñas). 
            Le ponemos id para NO borrarlo en stripReviewSchemas(). */}
        <script id="blog-listing-ld" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Domi Websites Blog",
            "url": "https://domiwebsites.com/blog",
            "image": "https://domiwebsites.com/DomiLogo.webp",
            "description":
              "Custom websites for small businesses in St. Louis and the U.S. Mobile-optimized, SEO-ready, and professionally designed to help you grow online.",
            "publisher": {
              "@type": "Organization",
              "name": "Domi Websites",
              "logo": { "@type": "ImageObject", "url": "https://domiwebsites.com/DomiLogo.webp" }
            },
            "hasPart": blogPosts.map(function (p) {
              return {
                "@type": "BlogPosting",
                "headline": p.title,
                "url": "https://domiwebsites.com/blog/" + p.slug,
                "mainEntityOfPage": { "@type": "WebPage", "@id": "https://domiwebsites.com/blog/" + p.slug },
                "image": "https://domiwebsites.com" + p.image,
                "datePublished": p.date,
                "dateModified": p.date,
                "author": { "@type": "Person", "name": "Juan Cabrera" }
              };
            })
          })}
        </script>
      </Helmet>

      <Header />
      <section className="py-24 bg-white min-h-screen" aria-labelledby="blog-heading">
        <div className="max-w-4xl mx-auto px-4">
          <h1 id="blog-heading" className="text-4xl font-bold mb-8 text-center pt-10">
            <span className="text-red-600">Domi Websites</span> Blog
          </h1>
          <div className="space-y-10">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="mb-4 w-full h-48 object-cover rounded"
                    loading="lazy"
                  />
                )}
                <h2 className="text-2xl font-bold mb-2 text-blue-800">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {new Date(post.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-4">{post.summary}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-blue-600 font-semibold hover:underline"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
