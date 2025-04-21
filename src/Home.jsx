import React from 'react';

const Home = () => {
  return (
    <section id="home" className="relative h-screen text-white" aria-labelledby="home-heading">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      >
        <source src="/bg-video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 id="home-heading" className="text-5xl font-extrabold mb-4 text-white">
          <span className="text-red-600">DOMI</span> <span className="text-blue-400">WEBSITES</span>
        </h1>

        <h2 className="text-xl font-semibold mb-4">
          We build <span className="text-red-400">Web Design</span>,{' '}
          <span className="text-red-400">Hosting</span> &{' '}
          <span className="text-red-400">Maintenance</span>
        </h2>

        <p className="mb-6 text-gray-200 max-w-xl text-lg">
          Your business deserves a website that works as hard as you do. Domi Websites delivers tailored web solutions for growth.
        </p>

        <p className="text-sm text-yellow-300 font-medium mb-2 animate-pulse">
          Limited spots available this month!
        </p>

        <a
          href="#contact"
          className="inline-block px-5 py-3 bg-gradient-to-r from-red-600 to-blue-600 rounded-full hover:scale-105 transition transform text-white font-semibold text-lg shadow-lg animate-bounce focus:outline focus:ring-2 focus:ring-white"
        >
          🎯 Claim Your Free Website Today!
        </a>
      </div>
    </section>
  );
};

export default Home;
