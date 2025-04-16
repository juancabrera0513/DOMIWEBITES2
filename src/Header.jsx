import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-2">
        {/* Utilizamos h1 para el título principal del sitio */}
        <h1 className="text-xl font-bold text-red-700">
          <a href="#home">DOMI WEBSITES</a>
        </h1>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <nav
          className={`${
            menuOpen ? 'flex flex-col items-start' : 'hidden'
          } md:flex md:flex-row md:items-center md:gap-6 mt-4 md:mt-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 shadow md:shadow-none rounded md:rounded-none space-y-4 md:space-y-0 transition-all duration-300 ease-in-out`}
        >
          {/* Cambiamos los enlaces de navegación a botones con aria-labels para mejorar la accesibilidad */}
          <button
            onClick={handleLinkClick}
            className="block text-blue-900 hover:text-red-700 w-full md:w-auto"
            aria-label="Navigate to Home section"
          >
            <a href="#home">Home</a>
          </button>
          <button
            onClick={handleLinkClick}
            className="block text-blue-900 hover:text-red-700 w-full md:w-auto"
            aria-label="Navigate to About section"
          >
            <a href="#about">About</a>
          </button>
          <button
            onClick={handleLinkClick}
            className="block text-blue-900 hover:text-red-700 w-full md:w-auto"
            aria-label="Navigate to Services section"
          >
            <a href="#services">Services</a>
          </button>
          <button
            onClick={handleLinkClick}
            className="block text-blue-900 hover:text-red-700 w-full md:w-auto"
            aria-label="Navigate to Pricing section"
          >
            <a href="#pricing">Pricing</a>
          </button>
          <button
            onClick={handleLinkClick}
            className="block w-full md:w-auto bg-gradient-to-r from-red-700 to-blue-800 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out text-center"
            aria-label="Navigate to Contact section"
          >
            <a href="#contact">Contact</a>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
