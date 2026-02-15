import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";
import SeoJsonLd from "../components/SeoJsonLd";

export default function ThankYouPage() {
  const title = "Thank You | Domi Websites";
  const description = "Message received. We’ll get back to you within one business day.";
  const canonical = "https://domiwebsites.com/thank-you";
  const ogImage = "https://domiwebsites.com/DomiLogo.webp";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex,follow" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImage} />
      </Helmet>

      <SeoJsonLd />
      <Header />

      <main id="main-content">
        <section className="section">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center glass rounded-2xl p-8 md:p-10 border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,.55)]">
              <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-200/70 mb-3">
                THANK YOU
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white">
                We got your message.
              </h1>

              <p className="mt-4 text-white/60 leading-relaxed">
                We typically reply within <span className="text-white/80 font-medium">one business day</span>.
                If it’s urgent, message us on WhatsApp from the Contact page.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Link to="/work" className="btn btn-primary">
                  View Our Work
                </Link>
                <Link to="/" className="btn btn-outline">
                  Back Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />
    </>
  );
}
