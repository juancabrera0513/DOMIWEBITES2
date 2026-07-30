import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import pages from "../data/seoPages.json";
import { JsonLd } from "../lib/jsonld";

const SITE_URL = "https://domiwebsites.com";
const DEFAULT_IMAGE = `${SITE_URL}/domi-websites-custom-business-software-og.jpg`;

const privatePrefixes = [
  "/admin",
  "/auth",
  "/set-password",
  "/forgot-password",
  "/thank-you",
];

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

export default function RouteSeo() {
  const { pathname } = useLocation();
  const path = normalizePath(pathname);
  const noindex = privatePrefixes.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  );

  let seo = pages[path];
  const type = seo?.type || "website";
  const image = seo?.image || DEFAULT_IMAGE;

  if (!seo) {
    seo = {
      title: "Page Not Found | Domi Websites",
      description: "Explore web design, SEO, automation, and custom software services from Domi Websites.",
    };
  }

  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
  const robots = noindex || !pages[path]
    ? "noindex,follow"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const isIndexable = robots.startsWith("index");
  const pageSchema = isIndexable
    ? {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${canonical}#webpage`,
        url: canonical,
        name: seo.title,
        description: seo.description,
        isPartOf: { "@id": `${SITE_URL}#website` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: image,
        },
        inLanguage: "en-US",
      }
    : null;

  const breadcrumbItems = [{ name: "Home", url: `${SITE_URL}/` }];
  if (path.startsWith("/blog/")) {
    breadcrumbItems.push({ name: "Blog", url: `${SITE_URL}/blog` });
  } else if (path.startsWith("/work/")) {
    breadcrumbItems.push({ name: "Our Work", url: `${SITE_URL}/work` });
  }
  if (path !== "/" && isIndexable) {
    breadcrumbItems.push({
      name: seo.title.split("|")[0].trim(),
      url: canonical,
    });
  }
  const breadcrumbSchema =
    breadcrumbItems.length > 1
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
          })),
        }
      : null;

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="robots" content={robots} />
        <link rel="canonical" href={canonical} />

        <meta property="og:site_name" content="Domi Websites" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonical} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content={seo.title} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content={seo.title} />
      </Helmet>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />
    </>
  );
}
