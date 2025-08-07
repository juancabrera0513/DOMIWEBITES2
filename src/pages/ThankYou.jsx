import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ThankYou = () => {
  return (
    <>
      <Helmet>
        <title>Thank You | Domi Websites</title>
        <meta
          name="description"
          content="We’ve received your quote request. We'll contact you within 24 hours."
        />
        <link rel="canonical" href="https://domiwebsites.com/thank-you" />
        <link rel="icon" href="/DomiLogo.webp" type="image/webp" />
        <meta property="og:title" content="Thank You | Domi Websites" />
        <meta
          property="og:description"
          content="Thanks for reaching out. We'll be in touch soon!"
        />
        <meta property="og:image" content="/DomiLogo.webp" />
        <meta property="og:url" content="https://domiwebsites.com/thank-you" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />
      <main className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-white">
        <div className="text-center max-w-md mx-auto">
          <img
            src="/DomiLogo.webp"
            alt="Domi Websites Logo"
            className="mx-auto mb-6 w-32 h-auto"
          />
          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Thank you for your request!
          </h1>
          <p className="text-lg mb-4">
            We’ve received your quote request and will get back to you within 24 hours.
          </p>
          <p className="mb-6">
            Need to reach us faster?{' '}
            <a
              href="https://wa.me/13143769667"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              Chat with us on WhatsApp
            </a>
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ThankYou;
