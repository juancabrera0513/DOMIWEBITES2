import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../sections/ContactSection";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation(["meta"]);
  return (
    <>
      <Helmet>
        <title>{t("meta:title")} | Contact</title>
        <meta
          name="description"
          content="Contact Domi Websites by WhatsApp, text message, consultation, or project form."
        />
      </Helmet>
      <Header />
      <main id="main-content">
        <ContactSection standalone />
      </main>
      <Footer />
    </>
  );
}
