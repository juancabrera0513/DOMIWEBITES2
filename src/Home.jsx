import React from 'react';

const Home = () => {
  return (
    <section id="home" className="relative h-screen text-white">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/bg-video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h3 className="text-lg uppercase tracking-wide text-gray-300">Hello, Welcome to</h3>
        <h1 className="text-5xl font-bold mb-4">
          <span className="text-red-600">DOMI</span> <span className="text-blue-500">WEBSITES</span>
        </h1>
        <h3 className="text-xl font-medium mb-4">
          We build <span className="text-red-400">Web Design</span>,{' '}
          <span className="text-red-400">Hosting</span> &{' '}
          <span className="text-red-400">Maintenance</span>
        </h3>
        <p className="mb-6 text-gray-200 max-w-xl">
          Your business deserves a website that works as hard as you do. Domi Websites delivers tailored web solutions for growth.
        </p>
        <div className="flex justify-center gap-4 mb-6">
          <a href="https://www.facebook.com/domiwebsites" target="_blank" rel="noopener noreferrer" aria-label="Visit Facebook" className="hover:text-blue-400">
            <i className="bx bxl-facebook text-2xl"></i>
          </a>
          <a href="https://www.instagram.com/domiwebsites" target="_blank" rel="noopener noreferrer" aria-label="Visit Instagram" className="hover:text-pink-400">
            <i className="bx bxl-instagram-alt text-2xl"></i>
          </a>
        </div>
        <a href="#contact" className="inline-block px-6 py-3 bg-red-600 rounded hover:bg-red-700 transition">
          Contact us today!
        </a>
      </div>
    </section>
  );
};

export default Home;
