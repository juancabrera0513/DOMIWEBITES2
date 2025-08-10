import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLinkClick = () => setMenuOpen(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Blog', path: '/blog' },
  ];

  const openContactModal = () => {
    if (location.pathname === '/') {
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
    } else {
      navigate('/?contact=1');
    }
    if (window.gtag) window.gtag('event', 'click_cta', { place: 'header', action: 'open_modal' });
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 h-20 relative">
        <Link
          to="/"
          className="z-20 flex items-center"
          onClick={e => {
            if (location.pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              handleLinkClick();
            }
            setMenuOpen(false);
          }}
        >
          <img
            src="/DomiLogo.webp"
            alt="Domi Websites Logo"
            width="747"
            height="449"
            className="h-20 w-auto object-contain"
          />
        </Link>

        <button
          className="md:hidden text-3xl z-30"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          style={{ userSelect: 'none' }}
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
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map(({ name, path }) => (
            <Link
              key={name}
              to={path}
              onClick={
                name === "Home"
                  ? e => {
                      if (location.pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        handleLinkClick();
                      }
                      setMenuOpen(false);
                    }
                  : handleLinkClick
              }
              className="block text-blue-900 hover:text-red-600 w-full md:w-auto py-2 md:py-0"
            >
              {name}
            </Link>
          ))}

          <button
            type="button"
            onClick={openContactModal}
            className="block w-full md:w-auto bg-gradient-to-r from-red-600 to-blue-800 text-white px-6 py-2 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out text-center mt-4 md:mt-0"
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
