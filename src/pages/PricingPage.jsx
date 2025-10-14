import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingSection from "../sections/PricingSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import StickyCTA from "../components/StickyCTA";
import { useTranslation } from "react-i18next";

export default function PricingPage() {
  const { t } = useTranslation(["meta"]);
  return (
    <>
      <Helmet>
        <title>{t("meta:title")} — Pricing</title>
        <meta name="description" content="Transparent pricing packages: Starter, Smart Launch, and Business Pro." />
      </Helmet>
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
