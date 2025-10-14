import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";

const CALENDLY = "https://calendly.com/domiwebsites/30min";
const WHATS = "https://wa.me/13143769667";

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title>Domi Websites — Blog</title>
        <meta name="description" content="Articles about web design, Local SEO and conversions." />
      </Helmet>
      <Header />
      <main id="main-content" className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="glass rounded-2xl p-8 md:p-12 shadow-soft">
            <h1 className="text-3xl md:text-4xl font-extrabold">Blog</h1>
            <p className="text-white/80 mt-2">Coming soon. Want a consultation meanwhile?</p>
            <div className="mt-6 flex gap-2">
              <a href={WHATS} className="btn-outline">WhatsApp</a>
              <a href={CALENDLY} className="btn-primary">Free Consultation</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
