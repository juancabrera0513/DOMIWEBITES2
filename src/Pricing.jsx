// COMPONENTE: Pricing.jsx
import React, { useState } from 'react';

const Pricing = () => {
  const [showHosting, setShowHosting] = useState(false);

  const toggleServices = () => {
    setShowHosting(!showHosting);
  };

  return (
    <section id="pricing" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Our <span className="text-red-600">Prices</span>
        </h2>

        <div className="text-center mb-10">
          <button
            onClick={toggleServices}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            type="button"
          >
            {showHosting ? 'Show Web Design Services' : 'Show Hosting Packages'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(!showHosting ? webDesignServices : hostingPackages).map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-4 text-red-600">{service.title}</h3>
              <ul className="text-gray-700 space-y-2 mb-4">
                {service.features.map((feature, i) => (
                  <li key={i} className="list-disc list-inside">{feature}</li>
                ))}
              </ul>
              <a href="#contact" className="inline-block mt-2 px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                Get a Quote
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const webDesignServices = [
  {
    title: 'Basic Web Design',
    features: [
      'Template-based design',
      'WordPress setup',
      'Up to 4 pages',
      'Basic SEO',
      'Responsive design'
    ]
  },
  {
    title: 'Standard Web Design',
    features: [
      'Custom HTML & CSS',
      'JavaScript interactivity',
      'Up to 10 pages',
      'Advanced SEO',
      'Responsive design',
      'Basic e-commerce setup'
    ]
  },
  {
    title: 'Premium Web Design',
    features: [
      'Custom HTML, CSS & React',
      'Advanced JavaScript features',
      'Unlimited pages',
      'Comprehensive SEO',
      'Responsive design',
      'Advanced e-commerce setup',
      'Custom integrations'
    ]
  }
];

const hostingPackages = [
  {
    title: 'Basic Hosting',
    features: [
      '10 GB Storage',
      '100 GB Bandwidth',
      '1 Domain',
      '5 Email Accounts',
      'Basic Support'
    ]
  },
  {
    title: 'Standard Hosting',
    features: [
      '50 GB Storage',
      'Unlimited Bandwidth',
      '5 Domains',
      '20 Email Accounts',
      'Priority Support'
    ]
  },
  {
    title: 'Premium Hosting',
    features: [
      'Unlimited Storage',
      'Unlimited Bandwidth',
      'Unlimited Domains',
      'Unlimited Email Accounts',
      '24/7 Support',
      'Free SSL Certificate'
    ]
  }
];

export default Pricing;
