// src/pages/HomePage.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import ServicesSection from "../sections/ServicesSection";
import PortfolioSection from "../sections/PortfolioSection";
import PricingSection from "../sections/PricingSection";
import ContactSection from "../sections/ContactSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import StickyCTA from "../components/StickyCTA";
import SeoJsonLd from "../components/SeoJsonLd";
import { useTranslation } from "react-i18next";

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
        <AboutSection />
        <ServicesSection />
        <PortfolioSection />
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
