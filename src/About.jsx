import React from 'react';

const About = () => (
  <section
    id="about"
    className="py-20 bg-gray-100 text-gray-900"
    aria-labelledby="about-heading"
    data-aos="fade-up"
  >
    <div className="max-w-5xl mx-auto px-6 text-center">
      <h2
        id="about-heading"
        className="text-4xl font-extrabold mb-8 [text-shadow:_0_1px_2px_rgb(0_0_0_/_15%)]"
        data-aos="fade-up"
      >
        Who <span className="text-red-600">We Are</span>
      </h2>

      <p
        className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        At <span className="font-semibold text-blue-700">Domi Websites</span>, we don’t just build websites — we build digital experiences
        designed to help small businesses grow and get noticed online.
      </p>

      <div className="space-y-10 text-left text-gray-800">
        <div data-aos="fade-right" data-aos-delay="200">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">Personal Approach</h3>
          <p>
            You won't be just another number. We take time to understand your business, your audience, and your goals. 
            Every site is crafted with intention and heart.
          </p>
        </div>

        <div data-aos="fade-left" data-aos-delay="300">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">Professional Quality</h3>
          <p>
            Expect clean design, fast load times, and mobile-first development. We keep things simple, modern, and focused on real results.
          </p>
        </div>

        <div data-aos="fade-right" data-aos-delay="400">
          <h3 className="text-2xl font-bold text-blue-800 mb-2">Built to Get You Clients</h3>
          <p>
            Every page is structured to inspire trust and make it easy for customers to reach you. Our goal is to help you attract and convert — not just exist online.
          </p>
        </div>
      </div>

      <div className="mt-14 text-md text-gray-600" data-aos="zoom-in" data-aos-delay="500">
        <p>
          🚀 We're currently expanding our local presence and would love for your business to be part of it.
          <br />
          <a href="#contact" className="text-blue-600 hover:underline font-medium">
            Let’s talk and see if we’re a good fit.
          </a>
        </p>
      </div>
    </div>
  </section>
);

export default About;
