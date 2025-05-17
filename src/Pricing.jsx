import React, { useState } from 'react';

const Pricing = () => {
  const [showContact, setShowContact] = useState(false);

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
      data-aos="fade-up"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          id="pricing-heading"
          className="text-4xl font-extrabold text-center mb-8"
          data-aos="fade-up"
        >
          Our <span className="text-red-600">Packages</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {webPackages.map((pkg, idx) => (
            <article
              key={idx}
              className={`flex flex-col justify-between bg-white p-6 rounded-lg shadow-xl border-t-4 transition duration-300 ease-in-out hover:scale-105 hover:border-blue-700 ${
                pkg.highlight ? 'border-blue-700' : 'border-red-600'
              }`}
              role="region"
              aria-labelledby={`package-${idx}`}
              data-aos="fade-up"
              data-aos-delay={100 * (idx + 1)}
            >
              <div>
                <h3
                  id={`package-${idx}`}
                  className="text-xl font-bold mb-2 text-center text-red-600"
                >
                  {pkg.title}
                </h3>
                <div className="text-center mb-4">
                  {pkg.oldPrice && (
                    <p className="text-sm text-gray-400 line-through">{pkg.oldPrice}</p>
                  )}
                  <p
                    className={`text-3xl font-bold ${
                      pkg.price === 'Free' ? 'text-green-600 animate-bounce' : 'text-blue-700'
                    }`}
                  >
                    {pkg.price}
                  </p>
                </div>
                {pkg.notice && (
                  <p className="text-center text-sm font-medium text-yellow-600 mb-2">
                    {pkg.notice}
                  </p>
                )}
                <ul className="mb-4 space-y-3 text-sm text-gray-800">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleAutofill(pkg.title)}
                className="mt-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-blue-700 text-white rounded-full shadow-md hover:scale-110 transition duration-300 ease-in-out text-center font-medium"
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
    oldPrice: null,
    features: [
      'Custom one-page design',
      'Mobile responsive layout',
      'Basic contact form',
      'Optimized for conversions',
      'Delivered in 3-5 business days'
    ],
    notice: 'Limited to 5 businesses this month – Act fast!',
    highlight: false,
    button: 'Claim Your Free Site'
  },
  {
    title: 'Smart Launch',
    price: '$499',
    oldPrice: '$699',
    features: [
      'Everything in Essential Start',
      'Up to 5 custom pages',
      'Interactive contact section with map',
      'Speed & SEO optimization',
      'Basic analytics integration'
    ],
    highlight: true,
    button: 'Best Value – Start Now'
  },
  {
    title: 'Elite Presence',
    price: '$799',
    oldPrice: '$999',
    features: [
      'Everything in Smart Launch',
      'Up to 10 pages',
      'Animations & transitions',
      'Blog or gallery support',
      'Priority delivery'
    ],
    highlight: false,
    button: 'Get My Premium Site'
  },
  {
    title: 'Power Pro',
    price: '$1,499',
    oldPrice: '$1,999',
    features: [
      'Everything in Elite Presence',
      'E-commerce or booking integration',
      'Custom admin dashboard',
      'Advanced analytics and tracking',
      '1 month post-launch support'
    ],
    highlight: false,
    button: 'Start My Business Site'
  }
];


export default Pricing;
