import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection = () => (
  <section
    id="about"
    className="py-20 bg-gray-100 text-gray-900"
    aria-labelledby="about-heading"
    data-aos="fade-up"
  >
    <div className="max-w-5xl mx-auto px-6 text-center">
      <h2
        id="about-heading"
        tabIndex="-1"
        className="text-4xl font-extrabold mb-8 focus:outline-none"
        data-aos="fade-up"
      >
        About <span className="text-red-600">Domi Websites</span>
      </h2>

      <p
        className="text-lg text-blue-900 mb-6 max-w-3xl mx-auto leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        At <span className="font-semibold text-blue-700">Domi Websites</span>, our <span className="font-semibold">mission is to empower small businesses and entrepreneurs</span> with high-quality, custom websites and real results.<br />
        Based in St. Louis and serving clients nationwide, we help small businesses build a strong online presence with honest work and real partnership.
      </p>

      <div className="mb-8 text-md text-blue-800 font-semibold" data-aos="fade-up" data-aos-delay="130">
        <span>💡 <span className="italic">“We believe in honest work, transparency, and building long-term partnerships with every client.”</span></span>
      </div>

      <div className="space-y-10 text-left text-gray-800">
        <div data-aos="fade-right" data-aos-delay="200">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">Personal Approach</h3>
          <p>
            You won't be just another number. We take time to understand your business, your audience, and your goals. 
            Every site is crafted with intention and heart.
          </p>
        </div>

        <div data-aos="fade-left" data-aos-delay="300">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">Professional Quality</h3>
          <p>
            Expect clean design, fast load times, and mobile-first development. We keep things simple, modern, and focused on real results.
          </p>
        </div>

        <div data-aos="fade-right" data-aos-delay="400">
          <h3 className="text-2xl font-bold text-blue-900 mb-2">Built to Get You Clients</h3>
          <p>
            Every page is structured to inspire trust and make it easy for customers to reach you. Our goal is to help you attract and convert — not just exist online.
          </p>
        </div>
      </div>

      <div className="mt-14 flex justify-center items-center" data-aos="zoom-in" data-aos-delay="500">
        <Link
          to="/contact"
          className="inline-block bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition animate-bounce"
        >
          Let’s Talk
        </Link>
      </div>
    </div>
  </section>
);

export default AboutSection;