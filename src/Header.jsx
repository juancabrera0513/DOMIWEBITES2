import React, { useState } from 'react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 h-20 relative">
        <a href="#home" className="z-20 flex items-center">
          <img
            src="/DomiLogo.png"
            alt="Domi Websites Logo"
            className="h-20 w-auto object-contain"
          />
        </a>

        {/* Botón menú */}
        <button
          className="md:hidden text-3xl z-30"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          style={{ userSelect: 'none' }}
        >
          {menuOpen ? '×' : '☰'}
        </button>

        {/* Menú móvil/desplegable */}
        <nav
          id="main-navigation"
          className={`fixed top-16 left-0 w-full bg-white md:static md:flex md:flex-row md:items-center md:justify-end md:gap-6 p-6 md:p-0 shadow md:shadow-none rounded md:rounded-none transition-transform duration-300 ease-in-out z-20 ${
            menuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
          } md:translate-y-0 md:opacity-100 md:pointer-events-auto`}
          role="navigation"
          aria-label="Main navigation"
        >
          {['Home', 'About', 'Services', 'Pricing'].map((section) => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              onClick={handleLinkClick}
              className="block text-blue-900 hover:text-red-600 w-full md:w-auto py-2 md:py-0"
            >
              {section}
            </a>
          ))}

          <a
            href="#contact"
            onClick={handleLinkClick}
            className="block w-full md:w-auto bg-gradient-to-r from-red-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out text-center mt-4 md:mt-0 animate-pulse"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
