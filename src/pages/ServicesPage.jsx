import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServicesSection from "../sections/ServicesSection";
import PortfolioSection from "../sections/PortfolioSection";
import StickyCTA from "../components/StickyCTA";
import { useTranslation } from "react-i18next";

export default function ServicesPage() {
  const { t } = useTranslation(["meta"]);
  return (
    <>
      <Helmet>
        <title>{t("meta:title")} — Services</title>
        <meta name="description" content="Web design, Local SEO, e-commerce and care plans to help you convert more." />
      </Helmet>
      <Header />
      <main id="main-content">
        <ServicesSection />
        <PortfolioSection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
