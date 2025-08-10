import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
  ];

  const closeMenu = () => setMenuOpen(false);

  const scrollOrNavigateHome = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      closeMenu();
    }
  };

  return (
    <header className="bg-white shadow fixed top-0 w-full z-50">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:text-blue-900 focus:px-3 focus:py-2 focus:rounded focus:shadow"
      >
        Skip to content
      </a>

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 h-20 relative">
        <Link
          to="/"
          className="z-20 flex items-center"
          onClick={scrollOrNavigateHome}
          aria-label="Domi Websites Home"
          rel="home"
        >
          <img
            src="/DomiLogo.webp"
            alt="Domi Websites"
            width="747"
            height="449"
            decoding="async"
            className="h-20 w-auto object-contain"
          />
        </Link>

        <button
          className="md:hidden text-3xl z-30"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          {menuOpen ? '×' : '☰'}
        </button>

        <nav
          id="main-navigation"
          className={`fixed top-16 left-0 w-full bg-white md:static md:flex md:flex-row md:items-center md:justify-end md:gap-6 p-6 md:p-0 shadow md:shadow-none rounded md:rounded-none transition-transform duration-300 ease-in-out z-20 ${
            menuOpen
              ? 'translate-y-0 opacity-100 pointer-events-auto'
              : '-translate-y-full opacity-0 pointer-events-none'
          } md:translate-y-0 md:opacity-100 md:pointer-events-auto`}
          aria-label="Main navigation"
        >
          <ul className="flex flex-col md:flex-row md:items-center md:gap-6">
            {navItems.map(({ name, path }) => {
              const isActive = location.pathname === path;
              return (
                <li key={name}>
                  <Link
                    to={path}
                    onClick={(e) => {
                      if (name === 'Home') {
                        scrollOrNavigateHome(e);
                      } else {
                        closeMenu();
                      }
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`block text-blue-900 hover:text-red-600 py-2 md:py-0 ${isActive ? 'font-semibold' : ''}`}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}

            {/* CTA: redirige a /contact y cierra el menú */}
            <li className="mt-4 md:mt-0">
              <Link
                to="/contact"
                onClick={closeMenu}
                className="block w-full md:w-auto bg-gradient-to-r from-red-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out text-center"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
