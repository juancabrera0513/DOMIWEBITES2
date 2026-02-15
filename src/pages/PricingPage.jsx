import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingSection from "../sections/PricingSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import StickyCTA from "../components/StickyCTA";
import SeoJsonLd from "../components/SeoJsonLd";

export default function PricingPage() {
  const title =
    "Website & Software Pricing | Domi Websites — St. Louis";

  const description =
    "Pricing for performance websites, website + systems (CRM, automation, AI chatbots), and ongoing growth retainers. Custom solutions built to scale your business.";

  const canonical = "https://domiwebsites.com/pricing";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />

        <meta property="og:site_name" content="Domi Websites" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content="https://domiwebsites.com/DomiLogo.webp" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://domiwebsites.com/DomiLogo.webp" />
      </Helmet>

      <SeoJsonLd />
      <Header />

      <main id="main-content">
        <PricingSection />
        <TestimonialsSection />
      </main>

      <Footer />
      <StickyCTA />
    </>
  );
}
