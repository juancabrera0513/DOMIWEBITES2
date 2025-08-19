// src/pages/HomePage.jsx
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeSection from "../sections/HomeSection";
import AboutSection from "../sections/AboutSection";
import ServicesSection from "../sections/ServicesSection";
import PricingSection from "../sections/PricingSection";
import ContactSection from "../sections/ContactSection";
import TestimonialsSection from "../sections/TestimonialsSection";

// --- Dejamos los reviews solo para UI; NO los pondremos en JSON-LD ---
const reviews = [
  { name: "Melii Soler", rating: 5, text: "I got the best service on the world. I got all what I expect, now my business has an online presence and my customers are satisfied and happy. Thanks so much!", date: "2025-08-01" },
  { name: "Katherine Areche", rating: 5, text: "I am delighted with your services. I have already completed three procedures with you and I highly recommend you.", date: "2025-08-01" },
  { name: "Ana Silvia Amador Aquino", rating: 5, text: "The best service in the world ❤️", date: "2025-08-01" },
  { name: "Darkis De Leon Soler", rating: 5, text: "Excellent service. Very customizable and patient with feedback. I’m very happy with the results!!!!", date: "2025-07-30" },
  { name: "Maria Cabrera", rating: 5, text: "Excellent service, thank you", date: "2025-07-28" }
];

const reviewsWithText = reviews.filter((r) => r.text && r.text.length > 0);
const avgRating =
  reviewsWithText.length > 0
    ? (
        reviewsWithText.reduce((acc, r) => acc + r.rating, 0) /
        reviewsWithText.length
      ).toFixed(1)
    : "5.0";

const description =
  "Custom websites for small businesses in St. Louis and the U.S. Mobile-optimized, SEO-ready, and professionally designed to help you grow online.";

const HomePage = () => (
  <>
    <Helmet>
      {/* TITLE */}
      <title>Web Design St. Louis | Small Business Websites | Domi Websites</title>
      {/* META DESCRIPTION */}
      <meta name="description" content={description} />
      {/* KEYWORDS */}
      <meta
        name="keywords"
        content="web design St. Louis, small business websites, custom websites, Domi Websites, SEO-ready websites, web design Missouri, responsive websites"
      />
      {/* OG / SOCIAL */}
      <meta property="og:title" content="Custom Web Design for Small Businesses | Domi Websites" />
      <meta property="og:description" content="Mobile-friendly, SEO-optimized websites for small business owners in St. Louis and across the U.S. Get a free consultation today!" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://domiwebsites.com/DomiLogo.webp" />
      <meta property="og:url" content="https://domiwebsites.com/" />
      <meta property="og:site_name" content="Domi Websites" />

      {/* SCHEMA LocalBusiness — SIN aggregateRating NI review */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Domi Websites",
          url: "https://domiwebsites.com",
          image: "https://domiwebsites.com/DomiLogo.webp",
          logo: "https://domiwebsites.com/DomiLogo.webp",
          description,
          telephone: "+1-314-376-9667",
          address: {
            "@type": "PostalAddress",
            addressLocality: "St. Louis",
            addressRegion: "MO",
            postalCode: "63101",
            addressCountry: "US",
          },
          priceRange: "$$"
          // 👆 Nada de aggregateRating ni review aquí
        })}
      </script>

      <link rel="canonical" href="https://domiwebsites.com/" />
    </Helmet>

    <Header />
    <HomeSection />
    <AboutSection />
    <ServicesSection />
    <PricingSection />

    {/* UI de testimonios sigue igual (solo presentación, sin JSON-LD de reviews) */}
    <TestimonialsSection avgRating={avgRating} reviews={reviewsWithText} />

    <ContactSection />
    <Footer />
  </>
);

export default HomePage;
