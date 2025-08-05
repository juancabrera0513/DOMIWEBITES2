import React from 'react';
import { Link } from 'react-router-dom';

const HomeSection = () => {
  return (
    <section
      id="home"
      data-aos="fade-up"
      className="relative h-screen text-white"
      aria-labelledby="home-heading"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/domi-websites-hero-video.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          id="home-heading"
          className="text-4xl md:text-5xl font-extrabold mb-4 text-white leading-tight [text-shadow:_0_1px_2px_rgb(0_0_0_/_90%)]"
        >
          Web Design for Small Businesses in St. Louis
        </h1>

        <h2 className="text-lg md:text-xl font-medium mb-4 text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]">
          Want a Professional Website for Your Business? <br className="hidden md:block" /> Let’s Make It Happen.
        </h2>

        <p className="mb-6 text-white max-w-xl text-md md:text-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)]">
          At Domi Websites, we build fast, mobile-optimized websites for small business owners in St. Louis and throughout the U.S. Our custom websites are SEO-ready and designed to help your business grow online.
        </p>

        <Link
          to="/contact"
          className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 rounded-full hover:scale-105 transition transform text-white font-semibold text-lg shadow-lg focus:outline focus:ring-2 focus:ring-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_85%)]"
        >
          Book Your Free Consultation
        </Link>
      </div>
    </section>
  );
};

export default HomeSection;
