// src/components/SeoJsonLd.jsx
import React from "react";
import { JsonLd } from "../lib/jsonld";

// === Ajusta estos datos si hace falta ===
const SITE_URL = "https://domiwebsites.com";
const BUSINESS_NAME = "Domi Websites";
const PHONE = "+1-314-376-9667";           // del Footer
const EMAIL = "hello@domiwebsites.com";    // cambia si corresponde
const CITY = "St. Louis";
const REGION = "MO";
const LOGO = `${SITE_URL}/logo.png`;       // si no existe, no pasa nada
const SAME_AS = [
  "https://www.facebook.com/",
  "https://www.instagram.com/",
  "https://www.linkedin.com/"
].filter(Boolean);

// FAQ (coherente con PricingSection)
const PRICING_FAQ = [
  { q: "How fast can we launch?", a: "Many sites launch in 7–14 days depending on scope and feedback speed." },
  { q: "Do you write copy?", a: "We help polish your copy and structure. We can also draft initial copy on request." },
  { q: "Do you offer hosting?", a: "We can set up modern hosting/CDN and include it inside a Care Plan if preferred." },
  { q: "What’s a Care Plan?", a: "Monthly updates, security, performance checks, backups, and small content edits." },
];

// Paquetes (coherentes con PricingSection)
const PLANS = [
  {
    name: "Starter Presence",
    description: "A clean one-page site to get your business online fast.",
    price: 799,
    priceCurrency: "USD",
  },
  {
    name: "Smart Launch",
    description: "Multi-page site with services and a simple blog.",
    price: 1299,
    priceCurrency: "USD",
  },
  {
    name: "Business Pro",
    description: "Premium UI, conversion blocks, and Local SEO structure.",
    price: 1899,
    priceCurrency: "USD",
  },
];

export default function SeoJsonLd() {
  // LocalBusiness
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}#localbusiness`,
    name: BUSINESS_NAME,
    image: [`${SITE_URL}/og-image.jpg`],
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: REGION,
      addressCountry: "US",
    },
    sameAs: SAME_AS,
    areaServed: {
      "@type": "City",
      name: CITY,
    },
    logo: LOGO,
  };

  // WebSite + SearchAction
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // FAQPage
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Product para cada plan (visibles como ofertas/servicios)
  const products = PLANS.map((p, idx) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.name} — ${BUSINESS_NAME}`,
    description: p.description,
    brand: BUSINESS_NAME,
    sku: `plan-${idx + 1}`,
    offers: {
      "@type": "Offer",
      priceCurrency: p.priceCurrency,
      price: p.price,
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}#pricing`,
    },
  }));

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd data={website} />
      <JsonLd data={faq} />
      {products.map((p, i) => <JsonLd key={i} data={p} />)}
    </>
  );
}
