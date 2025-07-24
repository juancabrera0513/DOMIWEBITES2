import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-14 bg-gray-100 text-gray-900" aria-labelledby="pricing-heading">
      <div className="max-w-6xl mx-auto px-4">
        <h2 id="pricing-heading" className="text-4xl font-extrabold text-center mb-8">
          Website Packages for Your Business
        </h2>

        <p className="text-center max-w-2xl mx-auto mb-10 text-lg">
          We build professional, fast, and SEO-ready websites to help your business attract more clients online.
          Book your free consultation to find the best fit for your goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {packages.map((pkg, idx) => (
            <article
              key={idx}
              className={`flex flex-col justify-between bg-white p-6 rounded-lg shadow-xl border-t-4 ${
                pkg.highlight ? 'border-blue-700' : 'border-red-600'
              }`}
            >
              <div>
                <h3 className="text-xl font-bold mb-2 text-center text-red-600">{pkg.title}</h3>
                <p className="text-center text-3xl font-bold text-blue-700 mb-4">{pkg.price}</p>
                <ul className="mb-4 space-y-2 text-sm text-gray-800">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-blue-700 text-white rounded-full shadow-md text-center font-medium hover:scale-105 transition"
              >
                Book Consultation
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const packages = [
  {
    title: 'Starter Presence',
    price: '$799',
    features: [
      'Single-page website',
      'Custom design and branding',
      'Mobile responsive',
      'Basic SEO setup',
      'Contact form integration'
    ],
    highlight: false
  },
  {
    title: 'Smart Launch',
    price: '$1,299',
    features: [
      'Up to 3 custom pages',
      'Mobile optimized and fast-loading',
      'SEO optimization',
      'Google Analytics setup',
      'Contact form with map'
    ],
    highlight: true
  },
  {
    title: 'Business Pro',
    price: '$1,899',
    features: [
      'Up to 5 pages',
      'Blog or gallery included',
      'Advanced SEO and speed optimization',
      'Animations and branding consistency',
      '1 month post-launch support'
    ],
    highlight: false
  },
  {
    title: 'E-Commerce Pro',
    price: '$2,799',
    features: [
      'Online store setup (up to 20 products)',
      'Payment gateway integration',
      'Inventory management setup',
      'Advanced SEO & speed optimization',
      'Training for managing your store'
    ],
    highlight: false
  }
];

export default Pricing;
