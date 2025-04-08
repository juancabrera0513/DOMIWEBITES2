import React from 'react';

const About = () => (
  <section id="about" className="py-16 bg-gray-100">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-8">About <span className="text-red-600">Us</span></h2>
      <div className="space-y-6 text-gray-700">
        <div>
          <h3 className="text-xl font-semibold text-blue-700">Our Commitment</h3>
          <p>We work closely with you to ensure every detail aligns with your goals, helping your business thrive online.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-700">Our Expertise</h3>
          <p>We specialize in custom web design, creating digital experiences that reflect your identity and connect with your audience.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-blue-700">Innovation and Excellence</h3>
          <p>We use the latest technologies to build beautiful, functional, and user-friendly websites that grow your business.</p>
        </div>
      </div>
    </div>
  </section>
);

export default About;