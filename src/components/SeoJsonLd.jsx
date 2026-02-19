import React from "react";
import { JsonLd } from "../lib/jsonld";

const SITE_URL = "https://domiwebsites.com";
const BUSINESS_NAME = "Domi Websites";
const PHONE = "+1-314-376-9667";
const EMAIL = "admin@domiwebsites.com";
const CITY = "St. Louis";
const REGION = "MO";
const COUNTRY = "US";

const LOGO = `${SITE_URL}/DomiLogo.webp`;
const OG_IMAGE = `${SITE_URL}/domi-websites-custom-business-software-og.jpg`;

const SAME_AS = [
  "https://www.facebook.com/domiwebsites",
  "https://www.instagram.com/domiwebsites",
].filter(Boolean);

export default function SeoJsonLd() {
  const business = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}#business`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    image: OG_IMAGE,
    logo: LOGO,
    telephone: PHONE,
    email: EMAIL,

    address: {
      "@type": "PostalAddress",
      addressLocality: CITY,
      addressRegion: REGION,
      addressCountry: COUNTRY,
    },

    areaServed: {
      "@type": "City",
      name: CITY,
    },

    sameAs: SAME_AS,

    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital & Software Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Redesign" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Technical SEO" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Software Development" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "CRM Systems" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Automation" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Chatbots" } }
      ]
    },

    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      email: EMAIL,
      contactType: "customer support",
      areaServed: COUNTRY,
      availableLanguage: ["en"],
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}#website`,
    url: SITE_URL,
    name: BUSINESS_NAME,
    publisher: { "@id": `${SITE_URL}#business` },
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}#organization`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: LOGO,
    sameAs: SAME_AS,
  };

  return (
    <>
      <JsonLd data={business} />
      <JsonLd data={website} />
      <JsonLd data={organization} />
    </>
  );
}
