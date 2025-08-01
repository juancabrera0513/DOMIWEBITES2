import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <a href="#home" className="text-xl font-bold text-red-600">DOMI WEBSITES</a>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <nav className={`${menuOpen ? 'flex flex-col items-start' : 'hidden'} md:flex md:flex-row md:items-center md:gap-6 mt-4 md:mt-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow md:shadow-none rounded md:rounded-none space-y-4 md:space-y-0 transition-all duration-300 ease-in-out`}>
          <a href="#home" className="block text-blue-700 hover:text-red-600 w-full md:w-auto">Home</a>
          <a href="#about" className="block text-blue-700 hover:text-red-600 w-full md:w-auto">About</a>
          <a href="#services" className="block text-blue-700 hover:text-red-600 w-full md:w-auto">Services</a>
          <a href="#pricing" className="block text-blue-700 hover:text-red-600 w-full md:w-auto">Pricing</a>
          <a href="#contact" className="block w-full md:w-auto bg-gradient-to-r from-red-600 to-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out text-center">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
