import React from 'react';
import { Globe, Wrench, Server, CheckCircle } from 'lucide-react';

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

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        What We <span className="text-red-600">Offer</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {/* Website Design */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition">
          <Globe className="w-10 h-10 text-red-600 mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-2">Website Design</h3>
          <p className="text-gray-700 text-sm">
            Custom websites that look great and perform even better. Fast loading, mobile-ready, and built to impress.
          </p>
          {features([
            'Fully custom layout',
            'SEO-ready structure',
            'Mobile & tablet optimization'
          ])}
          <a
            href="#pricing"
            className="inline-block mt-6 text-sm bg-gradient-to-r from-blue-600 to-red-600 text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            See Packages
          </a>
        </div>

        {/* Maintenance */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition">
          <Wrench className="w-10 h-10 text-red-600 mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-2">Maintenance</h3>
          <p className="text-gray-700 text-sm">
            Never worry about updates or bugs. We take care of security, backups, and ongoing site maintenance so you don’t have to.
          </p>
          {features([
            'Security & uptime monitoring',
            'Monthly content updates',
            'Hands-off support'
          ])}
          <a
            href="#contact"
            className="inline-block mt-6 text-sm bg-gradient-to-r from-blue-600 to-red-600 text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Request a Plan
          </a>
        </div>

        {/* Hosting */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition">
          <Server className="w-10 h-10 text-red-600 mb-4" />
          <h3 className="text-xl font-bold text-blue-800 mb-2">Hosting & Speed</h3>
          <p className="text-gray-700 text-sm">
            We host your site on high-performance servers with 24/7 uptime monitoring, so your business is always online and lightning fast.
          </p>
          {features([
            'Blazing fast performance',
            'SSL & daily backups',
            '99.9% uptime guaranteed'
          ])}
          <a
            href="#pricing"
            className="inline-block mt-6 text-sm bg-gradient-to-r from-blue-600 to-red-600 text-white px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
