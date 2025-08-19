// src/pages/Blog.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../data/blogPosts";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Blog = () => (
  <>
    <Helmet>
      <title>Domi Websites Blog | Insights & Web Design Tips</title>
      <meta
        name="description"
        content="Read the Domi Websites blog for tips on web design, SEO, and digital strategy tailored for small businesses in St. Louis and across the U.S."
      />
      <link rel="canonical" href="https://domiwebsites.com/blog" />

      {/* Guard para eliminar reviews en JSON-LD */}
      <script>
        {`
          (function(){
            try {
              var allowedRoot = { Blog:1, BlogPosting:1, Article:1, CollectionPage:1 };

              function clean(obj){
                if(!obj || typeof obj!=='object') return obj;
                if(Array.isArray(obj)) return obj.map(clean);

                var t = obj['@type'];
                // Solo si es Blog/BlogPosting/Article/CollectionPage -> eliminar ratings/reviews
                if(
                  t && (
                    allowedRoot[t] ||
                    (Array.isArray(t) && t.some(function(x){ return allowedRoot[x]; }))
                  )
                ){
                  if('aggregateRating' in obj) delete obj.aggregateRating;
                  if('review' in obj) delete obj.review;
                }
                for(var k in obj){ obj[k] = clean(obj[k]); }
                return obj;
              }

              document.querySelectorAll('script[type="application/ld+json"]').forEach(function(s){
                if(s.id==="blog-listing-ld") return; // deja intacto nuestro script
                try{
                  var data = JSON.parse(s.textContent);
                  var cleaned = clean(data);
                  s.textContent = JSON.stringify(cleaned);
                }catch(e){}
              });
            } catch(e){}
          })();
        `}
      </script>

      {/* Nuestro JSON-LD del Blog */}
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
            "logo": {
              "@type": "ImageObject",
              "url": "https://domiwebsites.com/DomiLogo.webp"
            }
          },
          "hasPart": blogPosts.map((p) => ({
            "@type": "BlogPosting",
            "headline": p.title,
            "url": `https://domiwebsites.com/blog/${p.slug}`,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://domiwebsites.com/blog/${p.slug}`
            },
            "image": `https://domiwebsites.com${p.image}`,
            "datePublished": p.date,
            "dateModified": p.date,
            "author": {
              "@type": "Person",
              "name": "Juan Cabrera"
            }
          }))
        })}
      </script>
    </Helmet>

    <Header />
    <section
      className="py-24 bg-white min-h-screen"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h1
          id="blog-heading"
          className="text-4xl font-bold mb-8 text-center pt-10"
        >
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

export default Blog;
