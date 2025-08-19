// src/pages/BlogPost.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts } from "../data/blogPosts";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Post Not Found | Domi Websites Blog</title>
          <meta
            name="description"
            content="The requested blog post could not be found on Domi Websites."
          />
          <link rel="canonical" href="https://domiwebsites.com/blog" />
        </Helmet>
        <Header />
        <section className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center p-6">
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

  const blogUrl = `https://domiwebsites.com/blog/${post.slug}`;
  const imageUrl = post.image
    ? `https://domiwebsites.com${post.image}`
    : "https://domiwebsites.com/DomiLogo.webp";

  // JSON-LD para un post individual (sin reseñas)
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: imageUrl,
    author: { "@type": "Person", name: "Juan Cabrera" },
    publisher: {
      "@type": "Organization",
      name: "Domi Websites",
      logo: { "@type": "ImageObject", url: "https://domiwebsites.com/DomiLogo.webp" },
    },
    datePublished: post.date,
    dateModified: post.date,
    description: post.summary,
    mainEntityOfPage: { "@type": "WebPage", "@id": blogUrl },
  };

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Domi Websites Blog`}</title>
        <meta name="description" content={post.summary} />
        <link rel="canonical" href={blogUrl} />
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={blogUrl} />
        <meta property="og:type" content="article" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary} />
        <meta name="twitter:image" content={imageUrl} />
        {/* Structured data */}
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
          <p className="text-gray-600 mb-6">
            {new Date(post.date).toLocaleDateString()}
          </p>

          {post.image && (
            <img
              src={imageUrl}
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
