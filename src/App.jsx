import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import useDomiTracker from "./hooks/useDomiTracker";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";
import CookieBanner from "./components/CookieBanner";
import RouteSeo from "./components/RouteSeo";

const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const WorkPage = lazy(() => import("./pages/WorkPage"));
const WorkProjectPage = lazy(() => import("./pages/WorkProjectPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const SpecialOfferPage = lazy(() => import("./pages/SpecialOfferPage"));
const FreeAuditPage = lazy(() => import("./pages/FreeAuditPage"));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage"));
const ThankYouPage = lazy(() => import("./pages/ThankYouPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const AuthCallback = lazy(() => import("./pages/AuthCallback"));
const SetPassword = lazy(() => import("./pages/SetPassword"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const RequireAdmin = lazy(() => import("./pages/admin/RequireAdmin"));
const AdminInbox = lazy(() => import("./pages/admin/AdminInbox"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const DomiChatWidget = lazy(() => import("./components/chat/DomiChatWidget"));

export default function App() {
  const { pathname } = useLocation();

  const isAdminRoute = pathname.startsWith("/admin");

  useDomiTracker();

  return (
    <div className="min-h-screen relative overflow-hidden nexus-bg hero-grid">
      <div className="hero-vignette pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10">
        <ScrollToTop />

        <Suspense
          fallback={
            <main className="min-h-[70vh] grid place-items-center" aria-live="polite">
              <span className="sr-only">Loading page</span>
              <div className="h-9 w-9 rounded-full border-2 border-cyan-300/25 border-t-cyan-300 animate-spin" />
            </main>
          }
        >
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<WorkProjectPage />} />

          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/special" element={<SpecialOfferPage />} />
          <Route path="/audit" element={<FreeAuditPage />} />
          <Route path="/web-design-st-louis" element={<ServiceDetailPage />} />
          <Route path="/small-business-websites" element={<ServiceDetailPage />} />
          <Route path="/website-redesign-st-louis" element={<ServiceDetailPage />} />
          <Route path="/local-seo-st-louis" element={<ServiceDetailPage />} />
          <Route path="/customer-follow-up-tools" element={<ServiceDetailPage />} />
          <Route path="/custom-business-tools" element={<ServiceDetailPage />} />

          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />

          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/inbox"
            element={
              <RequireAdmin>
                <AdminInbox />
              </RequireAdmin>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
        <RouteSeo />

        {!isAdminRoute && <CookieBanner />}
      </div>

      {!isAdminRoute && (
        <Suspense fallback={null}>
          <DomiChatWidget pathname={pathname} />
        </Suspense>
      )}
    </div>
  );
}
