import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  const title = "Privacy Policy | Domi Websites";
  const description =
    "Read Domi Websites' privacy policy to understand how we collect, use, and protect your information.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://domiwebsites.com/privacy" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            description,
            url: "https://domiwebsites.com/privacy",
          })}
        </script>
      </Helmet>

      <Header />

      <main className="section relative overflow-hidden nexus-bg hero-grid">
        <div className="hero-vignette" />

        <div className="container relative z-10 max-w-4xl">
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10">
            <p className="text-sm text-white/50 mb-2">Last updated: October 2025</p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Privacy Policy
            </h1>

            <div className="space-y-6 text-white/70 leading-relaxed">
              <p>
                At Domi Websites, we value your privacy. This Privacy Policy outlines how
                we collect, use, and safeguard your personal information when you visit
                our website or interact with our services.
              </p>

              <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact details provided through forms (name, email, phone).</li>
                <li>Usage data via Google Analytics and advertising platforms.</li>
                <li>Payment information processed securely through Stripe.</li>
              </ul>

              <h2 className="text-xl font-semibold text-white">How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to inquiries and deliver services.</li>
                <li>To improve website performance and user experience.</li>
                <li>For advertising and retargeting purposes.</li>
                <li>To securely process payments.</li>
              </ul>

              <h2 className="text-xl font-semibold text-white">Third-Party Services</h2>
              <p>
                We use tools such as Google Analytics, Google Ads, Stripe, and EmailJS.
                These services may collect technical data under their own privacy policies.
              </p>

              <h2 className="text-xl font-semibold text-white">Cookies</h2>
              <p>
                We use cookies to enhance functionality and analyze traffic. You can
                manage cookies in your browser settings.
              </p>

              <h2 className="text-xl font-semibold text-white">Data Protection</h2>
              <p>
                We implement SSL encryption and industry-standard security practices.
                We never sell your personal data.
              </p>

              <h2 className="text-xl font-semibold text-white">Contact</h2>
              <p>
                Questions? Email us at{" "}
                <a
                  href="mailto:hello@domiwebsites.com"
                  className="underline text-cyan-300"
                >
                  hello@domiwebsites.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
