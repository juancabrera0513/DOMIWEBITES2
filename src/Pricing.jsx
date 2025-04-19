import React, { useState } from 'react';

const Pricing = () => {
  const [showSocial, setShowSocial] = useState(false);

  const toggleCategory = () => {
    setShowSocial(!showSocial);
  };

  return (
    <section id="pricing" className="py-14 bg-white text-gray-900" aria-labelledby="pricing-heading">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="pricing-heading" className="text-4xl font-extrabold text-center mb-8">
          Our <span className="text-red-800">Packages</span>
        </h2>

        <div className="text-center mb-10">
          <button
            onClick={toggleCategory}
            className="px-6 py-2 bg-gradient-to-r from-red-700 to-blue-700 text-white rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-105"
            type="button"
            aria-pressed={showSocial}
          >
            {showSocial ? 'Show Website Packages' : 'Show Social Media Packages'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(!showSocial ? webPackages : socialPackages).map((pkg, idx) => (
            <article
              key={idx}
              className={`flex flex-col justify-between bg-gray-50 p-6 rounded-lg shadow-xl border-t-4 transition duration-300 ease-in-out
                hover:scale-105 hover:border-blue-700 ${pkg.highlight ? 'border-blue-700' : 'border-red-700'}`}
              role="region"
              aria-labelledby={`package-${idx}`}
            >
              <div>
                <h3
                  id={`package-${idx}`}
                  className="text-xl font-bold mb-4 text-center text-red-800"
                >
                  {pkg.title}
                </h3>
                <p className={`text-center text-3xl font-semibold mb-4 ${
                  pkg.price === 'Free' ? 'text-green-600 font-extrabold animate-bounce' : 'text-blue-700'
                }`}>
                  {pkg.price}
                </p>
                <ul className="text-gray-800 space-y-2 mb-4 list-disc list-inside">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                className="inline-block mt-2 px-5 py-2.5 bg-gradient-to-r from-red-700 to-blue-700 text-white rounded-full shadow-md hover:scale-110 transition duration-300 ease-in-out text-center animate-pulse"
                role="button"
                aria-label={`Get started with ${pkg.title}`}
              >
                {pkg.button || 'Get Started'}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const webPackages = [
  {
    title: 'Starter Website',
    price: 'Free',
    features: [
      '1-page design',
      'Mobile responsive',
      'Hosting required',
      'Basic contact form',
      'Custom layout'
    ],
    highlight: false,
    button: 'Claim Now'
  },
  {
    title: 'Business Website',
    price: '$299',
    features: [
      'Up to 5 pages',
      'Custom design',
      'Contact form & map',
      'Mobile optimization',
      'Basic SEO'
    ],
    highlight: true,
    button: 'Most Popular'
  },
  {
    title: 'Pro Website',
    price: '$499+',
    features: [
      '10+ pages or e-commerce',
      'Advanced design',
      'Custom integrations',
      'SEO & analytics setup',
      'Priority support'
    ],
    highlight: false
  }
];

const socialPackages = [
  {
    title: 'Basic Social Media Boost',
    price: '$99/mo',
    features: [
      'Weekly content ideas',
      'Profile optimization',
      'Hashtag strategy',
      'Caption templates',
      'Google review support'
    ]
  },
  {
    title: 'Social Media Management',
    price: '$199/mo',
    features: [
      'Up to 3 posts/week',
      'Basic engagement',
      'Monthly performance summary',
      'Content calendar',
      'Google review support'
    ],
    highlight: true
  },
  {
    title: 'Growth Strategy',
    price: '$349/mo',
    features: [
      'Full content creation',
      'Reels and carousel posts',
      'Engagement plan',
      'Social ads support',
      'Google & Facebook review push'
    ]
  }
];

export default Pricing;
