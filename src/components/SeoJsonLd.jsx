import React from "react";
import { JsonLd } from "../lib/jsonld";

const SITE_URL = "https://domiwebsites.com";
const BUSINESS_ID = `${SITE_URL}#business`;
const WEBSITE_ID = `${SITE_URL}#website`;
const FOUNDER_ID = `${SITE_URL}#founder`;

const SERVICE_LINKS = [
  ["Web Design", "/web-design-st-louis"],
  ["Small Business Websites", "/small-business-websites"],
  ["Website Redesign", "/website-redesign-st-louis"],
  ["Local SEO", "/local-seo-st-louis"],
  ["Customer Follow-Up Tools", "/customer-follow-up-tools"],
  ["Custom Business Tools", "/custom-business-tools"],
];

export default function SeoJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": BUSINESS_ID,
        name: "Domi Websites",
        description:
          "St. Louis web design, local SEO, automation, and custom business software for small and growing businesses.",
        url: SITE_URL,
        image: `${SITE_URL}/domi-websites-custom-business-software-og.jpg`,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/DomiLogo.webp`,
          width: 500,
          height: 301,
        },
        telephone: "+1-314-376-9667",
        email: "admin@domiwebsites.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "St. Louis",
          addressRegion: "MO",
          addressCountry: "US",
        },
        areaServed: [
          { "@type": "City", name: "St. Louis" },
          { "@type": "State", name: "Missouri" },
          { "@type": "Country", name: "United States" },
        ],
        founder: { "@id": FOUNDER_ID },
        sameAs: [
          "https://www.facebook.com/domiwebsites",
          "https://www.instagram.com/domiwebsites",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-314-376-9667",
          email: "admin@domiwebsites.com",
          contactType: "sales",
          areaServed: "US",
          availableLanguage: ["English", "Spanish"],
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Websites and business tools",
          itemListElement: SERVICE_LINKS.map(([name, path]) => ({
            "@type": "Offer",
            url: `${SITE_URL}${path}`,
            itemOffered: {
              "@type": "Service",
              name,
              provider: { "@id": BUSINESS_ID },
              areaServed: "United States",
            },
          })),
        },
      },
      {
        "@type": "Person",
        "@id": FOUNDER_ID,
        name: "Juan Cabrera",
        jobTitle: "Founder and Business Solutions Developer",
        image: `${SITE_URL}/images/juan-optimized.webp`,
        worksFor: { "@id": BUSINESS_ID },
        knowsAbout: [
          "Web design",
          "Local SEO",
          "Business automation",
          "Custom business software",
        ],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: "Domi Websites",
        alternateName: "Domi Websites St. Louis",
        inLanguage: "en-US",
        publisher: { "@id": BUSINESS_ID },
      },
    ],
  };

  return <JsonLd data={graph} />;
}
