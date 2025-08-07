import React from "react";

const Footer = () => (
  <footer className="bg-blue-700 text-white py-8 mt-16" role="contentinfo">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center text-sm flex flex-col items-center gap-y-2">
        <p>
          © {new Date().getFullYear()} Domi Websites | All Rights Reserved.
        </p>
        <p className="flex flex-col sm:flex-row justify-center items-center gap-y-2 gap-x-3">
          <span>📍 St. Louis, MO</span>
          <span className="hidden sm:inline">|</span>
          <a
            href="tel:3143769667"
            className="underline hover:text-gray-200 py-2 px-2 inline-block text-base"
            style={{ minWidth: 48, minHeight: 48 }}
          >
            📞 314-376-9667
          </a>
          <span className="hidden sm:inline">|</span>
          <a
            href="mailto:admin@domiwebsites.com"
            className="underline hover:text-gray-200 py-2 px-2 inline-block text-base"
            style={{ minWidth: 48, minHeight: 48 }}
          >
            📧 admin@domiwebsites.com
          </a>
        </p>
        <p>
          <a
            href="/privacy-policy.html"
            className="underline hover:text-gray-200 py-2 px-2 inline-block text-base"
            style={{ minWidth: 48, minHeight: 48 }}
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;