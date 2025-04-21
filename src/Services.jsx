import React from 'react';
import { Globe, Wrench, Server } from 'lucide-react';

const Services = () => {
  return (
    <section className="py-16 bg-white" id="services">
      <h2 className="text-4xl font-bold text-center mb-12">
        What We <span className="text-red-600">Offer</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {/* Website Design */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
          <Globe className="w-10 h-10 text-red-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-blue-900">Website Design</h3>
          <p className="text-gray-700 mb-4">
            Custom websites that look great and perform even better. We focus on fast loading, mobile-friendly designs made to impress and convert.
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
            <li>Fully custom layout</li>
            <li>Built with SEO in mind</li>
            <li>Mobile & tablet optimized</li>
          </ul>
          <a
            href="#pricing"
            className="inline-block text-sm bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            See Packages
          </a>
        </div>

        {/* Maintenance */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
          <Wrench className="w-10 h-10 text-red-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-blue-900">Maintenance</h3>
          <p className="text-gray-700 mb-4">
            Never worry about updates or security. We keep your site running smooth, secure, and always online — so you can focus on your business.
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
            <li>Ongoing support</li>
            <li>Security monitoring</li>
            <li>Content updates</li>
          </ul>
          <a
            href="#contact"
            className="inline-block text-sm bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Request a Plan
          </a>
        </div>

        {/* Hosting */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105">
          <Server className="w-10 h-10 text-red-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-blue-900">Hosting & Speed</h3>
          <p className="text-gray-700 mb-4">
            Fast, reliable hosting for your website — backed by top-tier infrastructure and 24/7 monitoring. We handle everything for you.
          </p>
          <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
            <li>Blazing fast load times</li>
            <li>Free SSL & backups</li>
            <li>99.9% uptime guarantee</li>
          </ul>
          <a
            href="#pricing"
            className="inline-block text-sm bg-gradient-to-r from-red-600 to-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
