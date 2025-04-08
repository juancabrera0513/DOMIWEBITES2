import React from 'react';
import { Globe, Wrench, Server } from 'lucide-react';

const Services = () => {
  return (
    <section className="py-16 bg-white" id="services">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our <span className="text-red-600">Services</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <Globe className="w-10 h-10 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Website Design</h3>
          <p className="text-gray-600 mb-4">
            Our web design services are centered on creating visually stunning, user-friendly websites that leave a lasting impression. From conceptualization to execution, we work closely with you to bring your vision to life.
          </p>
          <a href="#pricing" className="text-blue-500 hover:underline">More info</a>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <Wrench className="w-10 h-10 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Website Maintenance</h3>
          <p className="text-gray-600 mb-4">
            Keeping your website up-to-date and running smoothly is essential. Our proactive maintenance ensures your site remains secure, optimized, and fully functional.
          </p>
          <a href="#contact" className="text-blue-500 hover:underline">More info</a>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <Server className="w-10 h-10 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Website Hosting</h3>
          <p className="text-gray-600 mb-4">
            Our hosting solutions provide the performance, security, and scalability your site needs to thrive. With 24/7 support, trust us to keep your online platform running smoothly.
          </p>
          <a href="#pricing" className="text-blue-500 hover:underline">More info</a>
        </div>
      </div>
    </section>
  );
};

export default Services;