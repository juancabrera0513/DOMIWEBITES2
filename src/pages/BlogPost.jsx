import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async"; // ⬅️ Nuevo
import { blogPosts } from "../data/blogPosts";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Domi Websites Blog`;
      const metaDesc = document.querySelector("meta[name='description']");
      if (metaDesc) {
        metaDesc.setAttribute("content", post.summary);
      }
    }
  }, [post]);

  if (!post) {
    return (
      <>
        <Header />
        <section className="min-h-screen flex items-center justify-center bg-white">
          <div>
            <h1 className="text-3xl font-bold text-red-600 mb-4">Post not found</h1>
            <Link to="/blog" className="text-blue-700 underline">
              ← Back to Blog
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  // Snippet Schema.org para este post
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image ? `https://domiwebsites.com${post.image}` : undefined,
    "author": {
      "@type": "Person",
      "name": "Juan Cabrera"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Domi Websites",
      "logo": {
        "@type": "ImageObject",
        "url": "https://domiwebsites.com/DomiLogo.webp"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "description": post.summary,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://domiwebsites.com/blog/${post.slug}`
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Domi Websites Blog`}</title>
        <meta name="description" content={post.summary} />
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </Helmet>
      <Header />
      <section className="py-24 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="mb-4 text-sm text-gray-600">
            <Link to="/" className="hover:underline text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/blog" className="hover:underline text-blue-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{post.title}</span>
          </nav>
          <h1 className="text-3xl font-extrabold mb-2 text-blue-900">{post.title}</h1>
          <p className="text-gray-600 mb-6">{new Date(post.date).toLocaleDateString()}</p>
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="mb-6 w-full h-56 object-cover rounded"
              loading="lazy"
            />
          )}
          <div
            className="prose prose-blue max-w-none text-justify"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-10">
            <Link to="/blog" className="text-blue-700 underline">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default BlogPost;
