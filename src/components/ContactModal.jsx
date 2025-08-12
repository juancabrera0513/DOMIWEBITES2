import React, { useEffect, useRef, useState } from 'react';

const MIN_NAME = 2;
const MIN_MSG = 10;

const ContactModal = ({ open, onClose }) => {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const msgRef = useRef(null);

  const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || `QomFGcKltdQDXhSSp`
  const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_ywkf6l7';
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_okjps2i';

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };
    const next = {};
    if (trimmed.name.length < MIN_NAME) next.name = `Please enter at least ${MIN_NAME} characters.`;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmed.email);
    if (!emailOk) next.email = 'Please enter a valid email.';
    if (trimmed.message.length < MIN_MSG) next.message = `Message must be at least ${MIN_MSG} characters.`;
    return { next, trimmed };
  };

  const focusFirstError = (errs) => {
    if (errs.name) return nameRef.current?.focus();
    if (errs.email) return emailRef.current?.focus();
    if (errs.message) return msgRef.current?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formRef.current?.elements?.botcheck?.value) return;

    const { next, trimmed } = validate();
    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      focusFirstError(next);
      return;
    }

    setSubmitting(true);
    try {
      const emailjs = (await import('@emailjs/browser')).default;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: trimmed.name,
          email: trimmed.email,
          message: trimmed.message,
          reply_to: trimmed.email,
        },
        PUBLIC_KEY
      );

      if (window.gtag) {
        window.gtag('event', 'generate_lead', { form_location: 'hero_modal', method: 'emailjs' });
      }

      setForm({ name: '', email: '', message: '' });
      setErrors({});
      onClose?.();
      window.location.href = '/thank-you';
    } catch {
      setSubmitting(false);
      alert('There was an error sending your message. Please try again or contact us via WhatsApp/Call.');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/60" aria-label="Close overlay" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white text-gray-900 rounded-2xl shadow-2xl p-6 md:p-7" data-aos="zoom-in" data-aos-duration="300">
        <button onClick={onClose} aria-label="Close" className="absolute right-3 top-3 rounded-full px-2 py-1 text-gray-500 hover:bg-gray-100">✕</button>

        <h3 className="text-2xl font-bold text-center mb-1 text-blue-900">Get Your Free Quote</h3>
        <p className="text-sm text-center text-gray-600 mb-4">
          We typically reply within <span className="font-semibold">one business day</span>. No obligation.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-3">
          <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <label className="sr-only" htmlFor="name">Your name</label>
          <input
            id="name"
            ref={nameRef}
            name="name"
            placeholder="Your name"
            autoComplete="name"
            maxLength={80}
            className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'}`}
            value={form.name}
            onChange={handleChange}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'err-name' : undefined}
          />
          {errors.name && <p id="err-name" className="text-xs text-red-600 -mt-2">{errors.name}</p>}

          <label className="sr-only" htmlFor="email">Your email</label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            name="email"
            placeholder="Your email"
            autoComplete="email"
            maxLength={120}
            className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'}`}
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && <p id="err-email" className="text-xs text-red-600 -mt-2">{errors.email}</p>}

          <label className="sr-only" htmlFor="message">Your message</label>
          <textarea
            id="message"
            ref={msgRef}
            name="message"
            rows={4}
            placeholder="Tell us about your project…"
            autoComplete="off"
            maxLength={2000}
            className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'}`}
            value={form.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'err-message' : undefined}
          />
          {errors.message && <p id="err-message" className="text-xs text-red-600 -mt-2">{errors.message}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mx-auto inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-white bg-gradient-to-r from-red-600 to-blue-600 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition min-w-[220px] disabled:opacity-60 disabled:hover:scale-100"
          >
            {submitting ? 'Sending…' : 'Get My Free Quote'}
          </button>

          <p className="text-xs text-center text-gray-500 mt-2">
            Prefer WhatsApp or Call? <a href="https://wa.me/13143769667" className="underline">WhatsApp</a> · <a href="tel:+13143769667" className="underline">Call</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
