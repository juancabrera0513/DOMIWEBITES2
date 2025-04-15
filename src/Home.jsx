// COMPONENTE: Home.jsx
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
        <h3 className="text-xl uppercase tracking-wide text-gray-300 mb-2">Hello, Welcome to</h3>
        <h1 className="text-6xl font-extrabold mb-6 animate-pulse">
          <span className="text-red-600">DOMI</span> <span className="text-blue-500">WEBSITES</span>
        </h1>
        <h3 className="text-2xl font-semibold mb-6">
          We build <span className="text-red-400">Web Design</span>,{' '}
          <span className="text-red-400">Hosting</span> &{' '}
          <span className="text-red-400">Maintenance</span>
        </h3>
        <p className="mb-8 text-gray-200 max-w-2xl text-lg">
          Your business deserves a website that works as hard as you do. Domi Websites delivers tailored web solutions for growth.
        </p>
        <div className="flex justify-center gap-6 mb-8 text-3xl">
          <a
            href="https://www.facebook.com/domiwebsites"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Facebook"
            className="hover:text-blue-400"
          >
            <i className="bx bxl-facebook"></i>
          </a>
          <a
            href="https://www.instagram.com/domiwebsites"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Instagram"
            className="hover:text-pink-400"
          >
            <i className="bx bxl-instagram-alt"></i>
          </a>
        </div>
        <a
          href="#contact"
          className="inline-block px-10 py-4 bg-red-600 text-lg rounded-full shadow-lg hover:bg-red-700 hover:scale-110 animate-bounce transition duration-300 ease-in-out"
        >
          Contact us today!
        </a>
      </div>
    </section>
  );
};

export default Home;