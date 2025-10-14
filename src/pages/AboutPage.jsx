import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutSection from "../sections/AboutSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import StickyCTA from "../components/StickyCTA";
import { useTranslation } from "react-i18next";

export default function AboutPage() {
  const { t } = useTranslation(["meta"]);
  return (
    <>
      <Helmet>
        <title>{t("meta:title")} — About</title>
        <meta name="description" content="About Domi Websites: speed-first design, Local SEO, and hands-on support." />
      </Helmet>
      <Header />
      <main id="main-content">
        <AboutSection />
        <TestimonialsSection />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
