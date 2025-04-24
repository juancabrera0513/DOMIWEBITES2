import React from 'react';

const Home = () => {
  return (
    <section
      id="home"
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
        <source src="/bg-video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1
          id="home-heading"
          className="text-4xl md:text-5xl font-extrabold mb-4 text-white leading-tight [text-shadow:_0_1px_2px_rgb(0_0_0_/_90%)]"
        >
          A <span className="text-red-400">Custom Website</span> for Your Business?{' '}
          <br className="hidden md:block" />
          Let’s <span className="text-blue-400">Make It Happen</span>.
        </h1>

        <h2 className="text-lg md:text-xl font-medium mb-4 text-gray-200 [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]">
          If you don’t have a website,{' '}
          <span className="text-orange-400 font-semibold">you’re losing customers</span>.
          <br /> Let’s fix that —{' '}
          <span className="text-green-400 font-medium">without stress or complexity</span>.
        </h2>

        <p className="mb-6 text-gray-300 max-w-xl text-md md:text-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)]">
          We create <span className="text-white font-semibold">professional websites</span> for small businesses across the U.S. — 
          <span className="text-blue-400 font-semibold"> custom-built</span>, 
          <span className="text-white font-semibold"> fast</span>, and 
          <span className="text-red-300 font-semibold"> designed to look amazing on any device</span>.
        </p>

        <a
          href="#pricing"
          className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 rounded-full hover:scale-105 transition transform text-white font-semibold text-lg shadow-lg animate-bounce focus:outline focus:ring-2 focus:ring-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_85%)]"
        >
          🎯 Claim This April’s Offer
        </a>
      </div>
    </section>
  );
};

export default Home;
