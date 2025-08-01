import React from 'react';
import { Globe, Wrench, Server, CheckCircle, MapPin, BarChart2, Briefcase } from 'lucide-react';

const features = (items) => (
  <ul className="space-y-2 mt-4">
    {items.map((item, i) => (
      <li key={i} className="flex items-start text-sm text-gray-700">
        <CheckCircle className="w-4 h-4 text-blue-600 mt-1 mr-2" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const services = [
  {
    icon: <Globe className="w-10 h-10 text-red-600 mb-4" />,
    title: 'Website Design',
    description: 'Custom websites that look great and perform even better. Fast loading, mobile-ready, and built to impress.',
    features: [
      'Fully custom layout',
      'SEO-ready structure',
      'Mobile & tablet optimization',
    ],
    cta: 'See Packages',
    link: '#pricing',
  },
  {
    icon: <Wrench className="w-10 h-10 text-red-600 mb-4" />,
    title: 'Maintenance',
    description: 'We take care of security, updates, backups and ongoing changes so your site always runs smoothly.',
    features: [
      'Security & uptime monitoring',
      'Monthly content updates',
      'Hands-off support',
    ],
    cta: 'Request a Plan',
    link: '#contact',
  },
  {
    icon: <Server className="w-10 h-10 text-red-600 mb-4" />,
    title: 'Hosting & Speed',
    description: 'High-performance hosting with 99.9% uptime, fast load speeds and daily backups for peace of mind.',
    features: [
      'Blazing fast performance',
      'SSL & daily backups',
      '99.9% uptime guaranteed',
    ],
    cta: 'Learn More',
    link: '#pricing',
  },
  {
    icon: <MapPin className="w-10 h-10 text-red-600 mb-4" />,
    title: 'Local SEO Optimization',
    description: 'Improve your visibility in local search results and get found by nearby customers actively searching for your services.',
    features: [
      'Google Maps & Business listings',
      'Localized keyword targeting',
      'On-page SEO for service areas',
    ],
    cta: 'Boost My Local SEO',
    link: '#contact',
  },
  {
    icon: <BarChart2 className="w-10 h-10 text-red-600 mb-4" />,
    title: 'Google Analytics Setup',
    description: 'Track visitors, pageviews and conversions with a complete Google Analytics + Tag Manager configuration.',
    features: [
      'Google Analytics 4 (GA4)',
      'Event tracking setup',
      'Conversion optimization insights',
    ],
    cta: 'Get Tracking Setup',
    link: '#contact',
  },
  {
    icon: <Briefcase className="w-10 h-10 text-red-600 mb-4" />,
    title: 'Google Business Profile',
    description: 'We optimize your Google Business Profile to improve credibility and increase calls and visits from local customers.',
    features: [
      'Profile creation & verification',
      'Review strategy & response guide',
      'Photo, hours & service optimization',
    ],
    cta: 'Optimize My Profile',
    link: '#contact',
  },
];

const Services = () => (
  <section
    id="services"
    className="py-20 bg-white"
    aria-labelledby="services-heading"
    data-aos="fade-up"
  >
    <h2
      id="services-heading"
      className="text-4xl font-bold text-center mb-12"
      data-aos="fade-up"
    >
      What We <span className="text-red-600">Offer</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition"
          data-aos="fade-up"
          data-aos-delay={`${100 + index * 100}`}
        >
          {service.icon}
          <h3 className="text-xl font-bold text-blue-800 mb-2">{service.title}</h3>
          <p className="text-gray-700 text-sm">{service.description}</p>
          {features(service.features)}
          <a
            href={service.link}
            className="inline-block mt-6 text-sm bg-gradient-to-r from-blue-600 to-red-600 text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            {service.cta}
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default Services;
