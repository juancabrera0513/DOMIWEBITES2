import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeSection = () => {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const formRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_ywkf6l7';
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_okjps2i';

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

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formRef.current?.elements?.botcheck?.value) return;

    setSubmitting(true);
    try {
      const emailjs = (await import('@emailjs/browser')).default;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message, reply_to: form.email },
        PUBLIC_KEY
      );

      if (window.gtag) {
        window.gtag('event', 'generate_lead', { form_location: 'hero_modal', method: 'emailjs' });
      }

      setForm({ name: '', email: '', message: '' });
      setOpen(false);
      window.location.href = '/thank-you';
    } catch {
      setSubmitting(false);
      alert('There was an error sending your message. Please try again or contact us via WhatsApp/Call.');
    }
  };

  return (
    <section
      id="home"
      data-aos="fade-up"
      className="relative h-screen text-white"
      aria-labelledby="home-heading"
    >
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        {/* Como antes: WEBM global */}
        <source src="/hero-mini-480.webm" type="video/webm" />
        {/* MP4 solo en desktop/tablet para no penalizar iOS */}
        <source src="/hero-mini-480.webm.mp4" type="video/mp4" media="(min-width: 768px)" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
      <h1
          id="home-heading"
          className="text-balance text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
        >
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

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white text-gray-900 rounded-2xl shadow-2xl p-6 md:p-7" data-aos="zoom-in" data-aos-duration="300">
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 rounded-full px-2 py-1 text-gray-500 hover:bg-gray-100"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold text-center mb-1 text-blue-900">Get Your Free Quote</h3>
            <p className="text-sm text-center text-gray-600 mb-4">
              We typically reply within <span className="font-semibold">one business day</span>. No obligation.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="grid gap-3" noValidate>
              <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <label className="sr-only" htmlFor="name">Your name</label>
              <input
                id="name"
                name="name"
                required
                placeholder="Your name"
                autoComplete="name"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={form.name}
                onChange={handleChange}
              />

              <label className="sr-only" htmlFor="email">Your email</label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Your email"
                autoComplete="email"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={form.email}
                onChange={handleChange}
              />

              <label className="sr-only" htmlFor="message">Your message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Tell us about your project…"
                autoComplete="off"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={form.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={submitting}
                className="mx-auto inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-600 to-blue-600 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition min-w-[220px]"
              >
                {submitting ? 'Sending…' : 'Get My Free Quote'}
              </button>

              <p className="text-xs text-center text-gray-500 mt-2">
                Prefer WhatsApp or Call?{' '}
                <a href="https://wa.me/13143769667" className="underline">WhatsApp</a> ·{' '}
                <a href="tel:+13143769667" className="underline">Call</a>
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HomeSection;
