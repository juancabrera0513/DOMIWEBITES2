import React, { useState } from 'react';

const Pricing = () => {
  const [showSocial, setShowSocial] = useState(false);

  const handleAutofill = (title) => {
    const subjectInput = document.querySelector('input[name="subject"]');
    if (subjectInput) {
      subjectInput.value = title;
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="pricing"
      className="py-14 bg-gray-100 text-gray-900"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="pricing-heading"
          className="text-4xl font-extrabold text-center mb-8"
        >
          Our <span className="text-red-800">Packages</span>
        </h2>

        <div className="text-center mb-10">
          <button
            onClick={() => setShowSocial(!showSocial)}
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
              className={`flex flex-col justify-between bg-white p-6 rounded-lg shadow-xl border-t-4 transition duration-300 ease-in-out
                hover:scale-105 hover:border-blue-700 ${pkg.highlight ? 'border-blue-700' : 'border-red-700'}`}
              role="region"
              aria-labelledby={`package-${idx}`}
            >
              <div>
                <h3
                  id={`package-${idx}`}
                  className="text-xl font-bold mb-2 text-center text-red-800"
                >
                  {pkg.title}
                </h3>
                {pkg.price && (
                  <p className={`text-center text-3xl font-semibold mb-4 ${
                    pkg.price === 'Free' ? 'text-green-600 font-extrabold animate-bounce' : 'text-blue-700'
                  }`}>
                    {pkg.price}
                  </p>
                )}
                {pkg.notice && (
                  <p className="text-center text-sm font-medium text-yellow-600 mb-2">
                    {pkg.notice}
                  </p>
                )}
                <ul className="text-gray-800 space-y-2 mb-4 list-disc list-inside">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleAutofill(pkg.title)}
                className="inline-block mt-2 px-5 py-2.5 bg-gradient-to-r from-red-700 to-blue-700 text-white rounded-full shadow-md hover:scale-110 transition duration-300 ease-in-out text-center animate-pulse"
                role="button"
                aria-label={`Get started with ${pkg.title}`}
              >
                {pkg.button || 'Get Started'}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const webPackages = [
  {
    title: 'Essential Start',
    price: 'Free',
    features: [
      'Custom one-page website',
      'Mobile responsive design',
      'Hosting required (not included)',
      'Basic contact form',
      'Fast delivery'
    ],
    notice: 'Limited availability – this month only!',
    highlight: false,
    button: 'Claim Now'
  },
  {
    title: 'Smart Launch',
    price: 'Starting at $299+',
    features: [
      'Everything in Essential Start',
      'Up to 5 custom pages',
      'Interactive contact form & map',
      'Mobile optimization',
      'Basic SEO setup'
    ],
    highlight: true,
    button: 'Most Popular'
  },
  {
    title: 'Elite Presence',
    price: 'Starting at $499+',
    features: [
      'Everything in Smart Launch',
      '10+ pages or e-commerce',
      'Custom animations and effects',
      'Advanced SEO & analytics setup',
      'Priority support & updates'
    ],
    highlight: false
  }
];

const socialPackages = [
  {
    title: 'Basic Social Media Boost',
    features: [
      'Weekly content ideas',
      'Profile optimization',
      'Hashtag strategy',
      'Caption templates',
      'Google review encouragement'
    ],
    button: 'Inquire Now'
  },
  {
    title: 'Social Media Management',
    features: [
      'Everything in Basic Boost',
      'Up to 3 posts/week',
      'Monthly content calendar',
      'Basic engagement handling',
      'Performance reporting'
    ],
    highlight: true,
    button: 'Grow With Us'
  },
  {
    title: 'Growth Strategy Plan',
    features: [
      'Everything in Management',
      'Reels and carousel posts',
      'Audience growth strategy',
      'Social ad support',
      'Google & Facebook review push'
    ],
    button: 'Let’s Scale'
  }
];

export default Pricing;
