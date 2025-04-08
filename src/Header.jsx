import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <a href="#home" className="text-xl font-bold text-red-600">DOMI Websites</a>
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
        <nav className={`md:flex gap-6 ${menuOpen ? 'block' : 'hidden'} mt-4 md:mt-0`}> 
          <a href="#home" className="text-blue-700 hover:text-red-600">Home</a>
          <a href="#about" className="text-blue-700 hover:text-red-600">About</a>
          <a href="#servicios" className="text-blue-700 hover:text-red-600">Services</a>
          <a href="#pricing" className="text-blue-700 hover:text-red-600">Pricing</a>
          <a href="#contact" className="text-blue-700 hover:text-red-600">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;