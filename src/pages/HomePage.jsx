import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import SeoJsonLd from "../components/SeoJsonLd";

import HomeSection from "../sections/HomeSection";
import LatestProjectHighlight from "../sections/LatestProjectHighlight";
import FounderSection from "../sections/FounderSection";
import ServicesSection from "../sections/ServicesSection";
import ProcessSection from "../sections/ProcessSection";
import PricingSection from "../sections/PricingSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ContactSection from "../sections/ContactSection";






const HomePage = () => {
  const { t } = useTranslation(["meta"]);

  return (
    <>
      <Helmet>
        <title>{t("meta:title")}</title>
        <meta name="description" content={t("meta:description")} />
        <meta property="og:title" content={t("meta:title")} />
        <meta property="og:description" content={t("meta:description")} />
        <meta property="og:type" content="website" />
      </Helmet>

      <SeoJsonLd />
      <Header />

      <main id="main-content">
        <HomeSection />
        <LatestProjectHighlight />
        <FounderSection />
        <ServicesSection />
        <ProcessSection />
        <PricingSection />
        <TestimonialsSection />

        <ContactSection />
      </main>

      <Footer />
      <StickyCTA />
    </>
  );
};

export default HomePage;
