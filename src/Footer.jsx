import React from 'react';

const Footer = () => (
  <footer className="bg-blue-700 text-white text-center py-6 mt-16" role="contentinfo">
    <div className="max-w-4xl mx-auto px-4 space-y-3">
      <p>© 2025 Domi Websites | All Rights Reserved.</p>
      
      <p>
        📍 St. Louis, MO &nbsp;|&nbsp; 📞{' '}
        <a href="tel:3143769667" className="underline hover:text-gray-300">
          314-376-9667
        </a>{' '}
        &nbsp;|&nbsp;{' '}
        <a
          href="mailto:admin@domiwebsites.com"
          className="underline hover:text-gray-300"
        >
          admin@domiwebsites.com
        </a>
      </p>

      <p>
        <a
          href="/privacy-policy.html"
          className="underline hover:text-gray-300 text-sm"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
