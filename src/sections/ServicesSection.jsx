// src/sections/ServicesSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Wrench,
  Server,
  CheckCircle,
  MapPin,
  BarChart2,
  Briefcase,
} from 'lucide-react';

const FeatureList = ({ items, cardId }) => (
  <ul className="space-y-2 mt-4" role="list" aria-describedby={cardId}>
    {items.map((item, i) => (
      <li key={i} className="flex items-start text-sm text-gray-700">
        <CheckCircle
          className="w-4 h-4 text-blue-700 mt-1 mr-2 flex-shrink-0"
          aria-hidden="true"
          focusable="false"
        />
        <span className="leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

const services = [
  { icon: Globe, title: 'Website Design', description: 'Custom websites that look great and perform even better. Fast loading, mobile-ready, and built to impress.', features: ['Fully custom layout', 'SEO-ready structure', 'Mobile & tablet optimization'], cta: 'See Packages', link: '/pricing' },
  { icon: MapPin, title: 'Local SEO Optimization', description: 'Improve your visibility in local search results and get found by nearby customers actively searching for your services.', features: ['Google Maps & Business listings', 'Localized keyword targeting', 'On-page SEO for service areas'], cta: 'Boost My Local SEO', link: '/contact' },
  { icon: Wrench, title: 'Maintenance', description: 'We take care of security, updates, backups and ongoing changes so your site always runs smoothly.', features: ['Security & uptime monitoring', 'Monthly content updates', 'Hands-off support'], cta: 'Request a Plan', link: '/contact' },
  { icon: Server, title: 'Hosting & Speed', description: 'High-performance hosting with 99.9% uptime, fast load speeds and daily backups for peace of mind.', features: ['Blazing fast performance', 'SSL & daily backups', '99.9% uptime guaranteed'], cta: 'Explore Hosting Plans', link: '/pricing' },
  { icon: BarChart2, title: 'Google Analytics Setup', description: 'Track visitors, pageviews and conversions with a complete Google Analytics + Tag Manager configuration.', features: ['Google Analytics 4 (GA4)', 'Event tracking setup', 'Conversion optimization insights'], cta: 'Get Tracking Setup', link: '/contact' },
  { icon: Briefcase, title: 'Google Business Profile', description: 'We optimize your Google Business Profile to improve credibility and increase calls and visits from local customers.', features: ['Profile creation & verification', 'Review strategy & response guide', 'Photo, hours & service optimization'], cta: 'Optimize My Profile', link: '/contact' },
];

const ServicesSection = () => (
  <section id="services" className="py-20 bg-white" aria-labelledby="services-heading">
    <h2
      id="services-heading"
      className="text-4xl font-bold text-center mb-12"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      What We <span className="text-red-700">Offer</span>
    </h2>

    {/* 👇 Efecto grupal: solo animamos la grilla una vez */}
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
      data-aos="fade-up"
      data-aos-delay="80"
      data-aos-duration="600"
    >
      {services.map((svc, i) => {
        const Icon = svc.icon;
        const cardId = `svc-${i}`;
        return (
          <article
            key={svc.title}
            aria-labelledby={`${cardId}-title`}
            aria-describedby={`${cardId}-desc`}
            className="
              bg-gray-50 p-6 sm:p-8 rounded-xl shadow
              hover:shadow-md transition-[box-shadow] duration-200 ease-out
              focus-within:ring-2 focus-within:ring-blue-700
            "
          >
            <Icon
              className="w-10 h-10 text-red-600 mb-4 mx-auto"
              aria-hidden="true"
              focusable="false"
            />
            <h3
              id={`${cardId}-title`}
              className="text-xl font-extrabold text-blue-900 mb-2 text-center"
            >
              {svc.title}
            </h3>
            <p id={`${cardId}-desc`} className="text-gray-800 text-sm leading-relaxed text-justify">
              {svc.description}
            </p>

            <FeatureList items={svc.features} cardId={cardId} />

            <Link
              to={svc.link}
              aria-label={`Learn more about ${svc.title}`}
              className="
                block mx-auto mt-6 text-sm text-center
                bg-gradient-to-r from-blue-700 to-red-600 text-white
                px-5 py-2 rounded-full font-semibold
                hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-700 transition-[box-shadow] duration-200
              "
              onClick={() => window.gtag && window.gtag('event', 'click_cta_service', { title: svc.title })}
            >
              {svc.cta}
            </Link>
          </article>
        );
      })}
    </div>
  </section>
);

export default ServicesSection;
