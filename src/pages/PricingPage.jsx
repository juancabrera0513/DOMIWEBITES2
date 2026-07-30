import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingSection from "../sections/PricingSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import SeoJsonLd from "../components/SeoJsonLd";
import { JsonLd } from "../lib/jsonld";

export default function PricingPage() {
  const title = "Website Design Packages & Software Pricing | St. Louis";
  const description =
    "Compare clear website and business tool packages starting at $1,500 from Domi Websites in St. Louis.";
  const canonical = "https://domiwebsites.com/pricing";

  const offerCatalog = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Domi Websites Packages",
    url: canonical,
    itemListElement: [
      {
        "@type": "Offer",
        name: "Starter Website",
        price: "1500",
        priceCurrency: "USD",
        description:
          "Professional website with up to five pages, mobile-friendly design, contact form, Google setup, and launch support.",
        itemOffered: { "@type": "Service", name: "Starter Website Design" },
      },
      {
        "@type": "Offer",
        name: "Growth Website",
        price: "2500",
        priceCurrency: "USD",
        description:
          "Business website with detailed service pages, better local visibility, a project gallery or articles, and inquiry tracking.",
        itemOffered: { "@type": "Service", name: "Growth Website Design" },
      },
      {
        "@type": "Offer",
        name: "Website That Follows Up",
        price: "4500",
        priceCurrency: "USD",
        description:
          "Business website with an organized customer list, automatic follow-up, online booking, reminders, and a website assistant.",
        itemOffered: { "@type": "Service", name: "Website and Customer Follow-up System" },
      },
      {
        "@type": "Offer",
        name: "Custom Business Tool",
        price: "7500",
        priceCurrency: "USD",
        description:
          "A private business tool for keeping customers, jobs, team access, and daily information organized in one place.",
        itemOffered: { "@type": "Service", name: "Custom Business Tool Development" },
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <link rel="canonical" href={canonical} />
        <meta property="og:site_name" content="Domi Websites" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://domiwebsites.com/domi-websites-custom-business-software-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://domiwebsites.com/domi-websites-custom-business-software-og.jpg" />
      </Helmet>

      <SeoJsonLd />
      <JsonLd data={offerCatalog} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://domiwebsites.com" },
            { "@type": "ListItem", position: 2, name: "Pricing", item: canonical },
          ],
        }}
      />
      <Header />
      <main id="main-content">
        <PricingSection asPage />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  );
}
