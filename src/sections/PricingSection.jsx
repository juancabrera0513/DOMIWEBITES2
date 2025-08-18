// src/sections/PricingSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const packages = [
  {
    title: 'Starter Presence',
    features: [
      'Single-page website',
      'Custom design and branding',
      'Mobile responsive',
      'Basic SEO setup',
      'Contact form integration',
    ],
    highlight: false,
  },
  {
    title: 'Smart Launch',
    features: [
      'Up to 3 custom pages',
      'Mobile optimized and fast-loading',
      'SEO optimization',
      'Google Analytics setup',
      'Contact form with map',
    ],
    highlight: true, // Most Popular
  },
  {
    title: 'Business Pro',
    features: [
      'Up to 5 pages',
      'Blog or gallery included',
      'Advanced SEO and speed optimization',
      'Animations and branding consistency',
      '1 month post-launch support',
    ],
    highlight: false,
  },
  {
    title: 'E-Commerce Pro',
    features: [
      'Online store setup (up to 20 products)',
      'Payment gateway integration',
      'Inventory management setup',
      'Advanced SEO & speed optimization',
      'Training for managing your store',
    ],
    highlight: false,
  },
];

const PricingSection = () => {
  return (
    <section
      id="pricing"
      className="py-20 bg-gray-100 text-gray-900"
      aria-labelledby="pricing-heading"
      role="region"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="pricing-heading"
          className="text-4xl font-extrabold text-center mb-8"
          data-aos="fade-up"
        >
          Website Packages for <span className="text-red-600">Your Business</span>
        </h2>

        <p className="text-center max-w-2xl mx-auto mb-10 text-lg">
          We build professional, fast, and SEO-ready websites to help your business attract more clients online.
          <br />
          <span className="font-semibold text-blue-700">
            Custom-tailored pricing based on your goals, scope, and timeline.
          </span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {packages.map((pkg, idx) => (
            <article
              key={idx}
              className={`flex flex-col justify-between bg-white p-7 rounded-xl shadow-xl border-2 transition-transform duration-300 ease-in-out hover:scale-105 relative ${
                pkg.highlight
                  ? 'border-blue-700 ring-2 ring-blue-300 shadow-2xl z-10 animate-bounce-slow'
                  : 'border-gray-200'
              }`}
              aria-describedby={`pkg-desc-${idx}`}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              {/* Most Popular badge */}
              {pkg.highlight && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-red-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow uppercase tracking-wider animate-pulse z-20">
                  Most Popular
                </div>
              )}

              <div>
                <h3
                  className="text-xl font-bold mb-3 text-center text-red-600"
                  id={`pkg-title-${idx}`}
                >
                  {pkg.title}
                </h3>

                {/* Mensaje en lugar de precios */}
                <p className="text-center text-base font-semibold text-blue-700 mb-3">
                  Get a custom quote — no obligation
                </p>

                <ul
                  className="mb-4 space-y-2 text-sm text-gray-800"
                  id={`pkg-desc-${idx}`}
                  aria-label={`Features of ${pkg.title} package`}
                >
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600" aria-hidden="true">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                to="/contact"
                className={`px-5 py-2.5 rounded-full shadow-md text-center font-semibold transition 
                  ${
                    pkg.highlight
                      ? 'bg-gradient-to-r from-blue-700 to-red-600 text-white hover:from-blue-800 hover:to-red-700 scale-105'
                      : 'bg-gradient-to-r from-red-600 to-blue-700 text-white hover:from-red-700 hover:to-blue-800'
                  }
                `}
                aria-label={`Get custom quote for ${pkg.title}`}
              >
                Get My Free Quote
              </Link>
            </article>
          ))}
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Tell us your goals and an estimated timeline to receive the fastest, most accurate quote.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
