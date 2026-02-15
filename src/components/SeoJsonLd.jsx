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
const OG_IMAGE = LOGO;

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
    areaServed: [
      { "@type": "City", name: CITY },
      { "@type": "Country", name: COUNTRY },
    ],
    sameAs: SAME_AS.length ? SAME_AS : undefined,
    serviceType: [
      "Web Design",
      "Website Redesign",
      "Technical SEO",
      "Website Maintenance",
      "Custom Software Development",
      "CRM Systems",
      "Automation Tools",
      "AI Chatbots",
    ],
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

  return (
    <>
      <JsonLd data={business} />
      <JsonLd data={website} />
    </>
  );
}
