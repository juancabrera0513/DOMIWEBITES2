import React from 'react';

const About = () => (
  <section id="about" className="py-16 bg-gray-100 text-gray-900" aria-labelledby="about-heading">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <h2 id="about-heading" className="text-4xl font-bold mb-10">
        About <span className="text-red-700">Us</span>
      </h2>

      <div className="space-y-10 text-gray-800 text-left">
        <article aria-labelledby="commitment-heading">
          <h3 id="commitment-heading" className="text-2xl font-semibold text-blue-800 mb-2">
            Our Commitment
          </h3>
          <p>
            We work closely with you to ensure every detail aligns with your goals. Our mission is to help your business thrive
            through a strong, impactful online presence.
          </p>
        </article>

        <article aria-labelledby="expertise-heading">
          <h3 id="expertise-heading" className="text-2xl font-semibold text-blue-800 mb-2">
            Our Expertise
          </h3>
          <p>
            With years of experience in web design, we craft digital experiences that reflect your brand identity, speak to your audience,
            and drive results. From modern UI/UX to technical SEO, we’ve got you covered.
          </p>
        </article>

        <article aria-labelledby="innovation-heading">
          <h3 id="innovation-heading" className="text-2xl font-semibold text-blue-800 mb-2">
            Innovation and Excellence
          </h3>
          <p>
            We use the latest technologies to develop beautiful, functional, and user-friendly websites. Whether it’s a simple landing page
            or a complex e-commerce platform, we deliver solutions that grow with your business.
          </p>
        </article>
      </div>
    </div>
  </section>
);

export default About;
