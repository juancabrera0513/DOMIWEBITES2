import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-blue-700 text-white py-8 mt-16" role="contentinfo">
    <div className="max-w-4xl mx-auto px-4">
      {/* Logo centrado y grande en todas las pantallas */}
      <div className="flex justify-center mb-2">
        <Link to="/" aria-label="Go to homepage">
          <img
            src="/DomiLogo.webp"
            alt="Domi Websites Logo"
            width={120}
            height={72}
            className="h-20 w-auto object-contain transition-transform duration-200"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Info */}
      <div className="text-center text-sm">
        <p>
          © {new Date().getFullYear()} Domi Websites | All Rights Reserved.
        </p>
        <p>
          📍 St. Louis, MO &nbsp;|&nbsp; 📞{" "}
          <a href="tel:3143769667" className="underline hover:text-gray-200">
            314-376-9667
          </a>{" "}
          |{" "}
          <a
            href="mailto:admin@domiwebsites.com"
            className="underline hover:text-gray-200"
          >
            admin@domiwebsites.com
          </a>
        </p>
        <p>
          <a
            href="/privacy-policy.html"
            className="underline hover:text-gray-200"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
