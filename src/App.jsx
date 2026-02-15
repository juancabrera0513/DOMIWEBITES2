import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";

import WorkPage from "./pages/WorkPage";
import WorkProjectPage from "./pages/WorkProjectPage";

import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";

import ThankYouPage from "./pages/ThankYouPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <div className="min-h-screen relative overflow-hidden nexus-bg hero-grid">
      <div className="hero-vignette pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10">
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<WorkProjectPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          <Route path="/thank-you" element={<ThankYouPage />} />

          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
}
