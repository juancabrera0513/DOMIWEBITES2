import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import { PROJECTS } from "../data/projects";
import { JsonLd } from "../lib/jsonld";

const SITE_URL = "https://domiwebsites.com";
const DEFAULT_IMAGE = `${SITE_URL}/domi-websites-custom-business-software-og.jpg`;

const pages = {
  "/": {
    title: "Web Design & Custom Software in St. Louis | Domi Websites",
    description:
      "St. Louis web design, local SEO, automation, AI chatbots, and custom business software for small businesses ready to generate more leads and grow.",
  },
  "/about": {
    title: "About Domi Websites | St. Louis Web Design Company",
    description:
      "Meet Domi Websites, a St. Louis web design and software company building conversion-focused websites, automation, and custom business systems.",
  },
  "/services": {
    title: "Web Design, SEO & Automation Services | St. Louis",
    description:
      "Explore website design, redesign, local SEO, CRM systems, AI chatbots, automation, and custom software services for St. Louis businesses.",
  },
  "/pricing": {
    title: "Website Design Packages & Software Pricing | St. Louis",
    description:
      "Compare transparent website and software packages for small businesses, with professional websites starting at $1,500.",
  },
  "/work": {
    title: "Web Design Portfolio & Client Projects | Domi Websites",
    description:
      "See websites and digital systems created by Domi Websites for businesses in St. Louis and beyond, including lead generation and booking experiences.",
  },
  "/contact": {
    title: "Contact a St. Louis Web Designer | Domi Websites",
    description:
      "Tell Domi Websites about your website, SEO, automation, or custom software project by WhatsApp, text, consultation, or project form.",
  },
  "/audit": {
    title: "Free Website Audit in St. Louis | SEO, Speed & UX Review",
    description:
      "Request a free manual website audit covering SEO, speed, mobile usability, trust, and conversion opportunities for your business website.",
  },
  "/special": {
    title: "Small Business Website Special | Domi Websites St. Louis",
    description:
      "Get a professionally designed small business website with mobile optimization, SEO foundations, lead capture, and launch support.",
  },
  "/blog": {
    title: "Small Business Web Design & SEO Blog | Domi Websites",
    description:
      "Practical guidance about web design, local SEO, website performance, lead generation, and digital growth for small businesses.",
  },
  "/privacy": {
    title: "Privacy Policy | Domi Websites",
    description:
      "Read the Domi Websites privacy policy and learn how information is collected, used, and protected.",
  },
  "/terms": {
    title: "Terms of Service | Domi Websites",
    description:
      "Read the terms governing use of the Domi Websites website and services.",
  },
  "/web-design-st-louis": {
    title: "Web Design in St. Louis for Small Businesses | Domi Websites",
    description:
      "Professional St. Louis web design for local businesses that want more calls, messages, appointments, and quote requests.",
  },
  "/small-business-websites": {
    title: "Small Business Website Design | Domi Websites",
    description:
      "Clear, professional small business websites that build trust and make it easy for customers to call, message, book, or buy.",
  },
  "/website-redesign-st-louis": {
    title: "Website Redesign in St. Louis | Domi Websites",
    description:
      "Modernize an outdated business website with clearer messaging, better mobile usability, faster loading, and stronger customer trust.",
  },
  "/local-seo-st-louis": {
    title: "Local SEO in St. Louis | Help Nearby Customers Find You",
    description:
      "Improve your local Google visibility with better service pages, accurate business information, useful content, and a practical review strategy.",
  },
  "/customer-follow-up-tools": {
    title: "Customer Follow-Up Tools for Small Businesses | Domi",
    description:
      "Organize new inquiries, respond faster, send reminders, and reduce missed opportunities with a follow-up process built for your business.",
  },
  "/custom-business-tools": {
    title: "Custom Business Tools & Internal Software | Domi Websites",
    description:
      "Replace scattered spreadsheets and generic apps with a private business tool built around your customers, jobs, team, and daily work.",
  },
};

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
  let type = "website";
  let image = DEFAULT_IMAGE;
  let isIndexableDynamicPage = false;

  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length);
    const post = blogPosts.find((item) => item.slug === slug);
    if (post) {
      isIndexableDynamicPage = true;
      seo = {
        title: `${post.title} | Domi Websites`,
        description: post.summary,
      };
      type = "article";
      image = post.image ? `${SITE_URL}${post.image}` : DEFAULT_IMAGE;
    }
  }

  if (path.startsWith("/work/")) {
    const id = path.slice("/work/".length);
    const project = PROJECTS.find((item) => item.id === id);
    if (project) {
      isIndexableDynamicPage = true;
      seo = {
        title: `${project.title} | Domi Websites Portfolio`,
        description: project.description,
      };
      image = project.image ? `${SITE_URL}${project.image}` : DEFAULT_IMAGE;
    }
  }

  if (!seo) {
    seo = {
      title: "Page Not Found | Domi Websites",
      description: "Explore web design, SEO, automation, and custom software services from Domi Websites.",
    };
  }

  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
  const robots = noindex || (!pages[path] && !isIndexableDynamicPage)
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
