
import React from "react";

const Footer = () => (
  <footer className="bg-blue-700 text-white border-t border-blue-600" role="contentinfo">
    <div className="max-w-4xl mx-auto px-4 py-3">
      <p className="text-sm flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span>© {new Date().getFullYear()} Domi Websites</span>
        <span className="opacity-60">•</span>
        <span>St. Louis, MO</span>
        <span className="opacity-60">•</span>
        <a href="tel:3143769667" className="underline hover:text-gray-200">
          314-376-9667
        </a>
        <span className="opacity-60">•</span>
        <a href="mailto:admin@domiwebsites.com" className="underline hover:text-gray-200">
          admin@domiwebsites.com
        </a>
        <span className="opacity-60">•</span>
        <a href="/privacy.html" className="underline hover:text-gray-200">
          Privacy Policy
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;