import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContactModal from '../components/ContactModal';

const HomeSection = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-contact-modal', handler);

    const params = new URLSearchParams(location.search);
    if (params.get('contact') === '1') {
      setOpen(true);
      params.delete('contact');
      navigate(
        { pathname: location.pathname, search: params.toString() ? `?${params}` : '' },
        { replace: true }
      );
    }
    return () => window.removeEventListener('open-contact-modal', handler);
  }, [location, navigate]);

  return (
    <section id="home" data-aos="fade-up" className="relative h-screen text-white" aria-labelledby="home-heading">
      <video className="absolute inset-0 w-full h-full object-cover z-0" autoPlay loop muted playsInline preload="metadata" aria-hidden="true">
        <source src="/hero-mini-480.webm" type="video/webm" />
        <source src="/hero-mini-480.mp4" type="video/mp4" media="(min-width: 768px)" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 id="home-heading" className="text-balance text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]">
          Web Design for{' '}
          <span className="bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
            Small Businesses
          </span>{' '}
          in St. Louis
        </h1>

        <h2 className="text-lg md:text-xl font-medium mb-4 text-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_80%)]">
          Want a Professional Website for Your Business? <br className="hidden md:block" /> Let’s Make It Happen.
        </h2>

        <p className="mb-6 text-white max-w-xl text-md md:text-lg [text-shadow:_0_1px_2px_rgb(0_0_0_/_70%)]">
          At Domi Websites, we build fast, mobile-optimized websites for small business owners in St. Louis and throughout the U.S. Our custom websites are SEO-ready and designed to help your business grow online.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="inline-block px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 rounded-full hover:scale-105 transition transform text-white font-semibold text-lg shadow-lg focus:outline focus:ring-2 focus:ring-white [text-shadow:_0_1px_2px_rgb(0_0_0_/_85%)]"
        >
          Book Your Free Consultation
        </button>
      </div>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
};

export default HomeSection;
