import React, { useState } from 'react';

const Pricing = () => {
  const [showHosting, setShowHosting] = useState(false);

  const toggleServices = () => {
    setShowHosting(!showHosting);
  };

  return (
    <section
      id="pricing"
      className="py-14 bg-white text-gray-900"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="pricing-heading"
          className="text-4xl font-extrabold text-center mb-8"
        >
          Our <span className="text-red-800">Prices</span>
        </h2>

        <div className="text-center mb-10">
          <button
            onClick={toggleServices}
            className="px-6 py-2 bg-gradient-to-r from-red-700 to-blue-700 text-white rounded-full hover:scale-110 shadow-lg transition duration-300 ease-in-out"
            type="button"
            aria-pressed={showHosting}
            aria-label={showHosting ? 'Show web design services' : 'Show hosting packages'}
          >
            {showHosting ? 'Show Web Design Services' : 'Show Hosting Packages'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(!showHosting ? webDesignServices : hostingPackages).map((service, idx) => (
            <article
              key={idx}
              className="flex flex-col justify-between bg-gray-50 p-6 rounded-lg shadow-xl border-t-4 border-red-700 hover:scale-105 hover:border-blue-700 transition duration-300 ease-in-out"
              role="region"
              aria-labelledby={`service-${idx}`}
            >
              <div>
                <h3
                  id={`service-${idx}`}
                  className="text-xl font-bold mb-4 text-red-800 text-center"
                >
                  {service.title}
                </h3>
                <ul className="text-gray-800 space-y-2 mb-4 list-disc list-inside">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                className="inline-block mt-2 px-6 py-3 bg-gradient-to-r from-red-700 to-blue-700 text-white rounded-full shadow-lg hover:scale-110 transition duration-300 ease-in-out text-center"
                role="button"
                aria-label={`Request quote for ${service.title}`}
              >
                Get a Quote
              </a>
            </article>
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
