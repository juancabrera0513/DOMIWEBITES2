// src/sections/ContactSection.jsx
import React, { useEffect, useRef, useState } from "react";

const MIN_NAME = 2;
const MIN_MSG = 10;

const ContactSection = () => {
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const subjectRef = useRef(null);
  const msgRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [subjectValue, setSubjectValue] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const SERVICE_ID  = process.env.REACT_APP_EMAILJS_SERVICE_ID  || "service_ywkf6l7";
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_68t4i9b";
  const PUBLIC_KEY  = process.env.REACT_APP_EMAILJS_PUBLIC_KEY  || "QomFGcKltdQDXhSSp";

  // Prefill subject from ?subject= or from hash "#...?...subject="
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let s = params.get("subject");
    if (!s && window.location.hash.includes("?")) {
      const hashQuery = new URLSearchParams(window.location.hash.split("?")[1]);
      s = hashQuery.get("subject");
    }
    if (s) {
      setSubjectValue(s);
      setForm((f) => ({ ...f, subject: s }));
    }
  }, []);

  // Accessibility: focus title on mount to reduce scroll “saltos”
  useEffect(() => {
    const h = document.getElementById("contact-heading");
    if (h) h.focus();
    // Optional: fuerza al tope si vienes de otra ruta
    window.scrollTo(0, 0);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "subject") setSubjectValue(value);
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const trimmed = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };
    const next = {};
    if (trimmed.fullName.length < MIN_NAME) next.fullName = `Please enter at least ${MIN_NAME} characters.`;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmed.email);
    if (!emailOk) next.email = "Please enter a valid email.";
    // Phone optional; if present, must be plausible
    if (trimmed.phone && !/^[\d\s()+-]{7,}$/.test(trimmed.phone)) {
      next.phone = "Please enter a valid phone (digits, spaces, +, (), -).";
    }
    if (!trimmed.subject) next.subject = "Please add a subject.";
    if (trimmed.message.length < MIN_MSG) next.message = `Message must be at least ${MIN_MSG} characters.`;
    return { next, trimmed };
  };

  const focusFirstError = (errs) => {
    if (errs.fullName) return nameRef.current?.focus();
    if (errs.email) return emailRef.current?.focus();
    if (errs.phone) return phoneRef.current?.focus();
    if (errs.subject) return subjectRef.current?.focus();
    if (errs.message) return msgRef.current?.focus();
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setFeedback(null);

    // honeypot
    if (formRef.current?.elements?.botcheck?.value) return;

    const { next, trimmed } = validate();
    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      focusFirstError(next);
      return;
    }

    setIsSubmitting(true);
    try {
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          fullName: trimmed.fullName,
          email: trimmed.email,
          phone: trimmed.phone,
          subject: trimmed.subject,
          message: trimmed.message,
          reply_to: trimmed.email,
        },
        PUBLIC_KEY
      );

      if (window.gtag) {
        window.gtag("event", "generate_lead", { form_location: "contact_page", method: "emailjs" });
      }
      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion();
      }

      // Reset
      setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
      setSubjectValue("");
      setErrors({});
      window.location.href = "/thank-you";
    } catch {
      setIsSubmitting(false);
      setFeedback({ type: "error", msg: "Failed to send message. Please try again." });
      nameRef.current?.focus();
    }
  };

  return (
    <section
      id="contact"
      className="pt-28 pb-16 bg-gradient-to-br from-gray-100 to-white text-gray-900 scroll-mt-24 md:scroll-mt-28"
      aria-labelledby="contact-heading"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2
          id="contact-heading"
          tabIndex="-1"
          className="text-4xl font-bold text-center"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          Contact <span className="text-red-600">Us</span>
        </h2>

        <p
          className="mt-3 mb-8 text-center text-gray-700"
          data-aos="fade-up"
          data-aos-delay="140"
        >
          Tell us a bit about your project. We typically reply within{" "}
          <span className="font-semibold text-blue-900">one business day</span>. No obligation.
        </p>

        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="space-y-5 bg-white p-6 rounded-lg shadow-md"
          aria-label="Contact form"
          data-aos="fade-up"
          data-aos-delay="220"
          noValidate
        >
          {/* honeypot */}
          <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full name */}
            <div>
              <input
                ref={nameRef}
                type="text"
                name="fullName"
                placeholder="Full Name*"
                className={`p-3 border rounded w-full ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                autoComplete="name"
                aria-label="Full Name"
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "err-name" : undefined}
                value={form.fullName}
                onChange={onChange}
                disabled={isSubmitting}
                maxLength={80}
              />
              {errors.fullName && <p id="err-name" className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Email*"
                className={`p-3 border rounded w-full ${errors.email ? "border-red-500" : "border-gray-300"}`}
                autoComplete="email"
                aria-label="Email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
                value={form.email}
                onChange={onChange}
                disabled={isSubmitting}
                maxLength={120}
              />
              {errors.email && <p id="err-email" className="text-xs text-red-600 mt-1">{errors.email}</p>}
            </div>

            {/* Phone (optional) */}
            <div>
              <input
                ref={phoneRef}
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                className={`p-3 border rounded w-full ${errors.phone ? "border-red-500" : "border-gray-300"}`}
                autoComplete="tel"
                aria-label="Phone"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "err-phone" : undefined}
                value={form.phone}
                onChange={onChange}
                disabled={isSubmitting}
                maxLength={30}
              />
              {errors.phone && <p id="err-phone" className="text-xs text-red-600 mt-1">{errors.phone}</p>}
            </div>

            {/* Subject */}
            <div>
              <input
                ref={subjectRef}
                type="text"
                name="subject"
                placeholder="Subject*"
                className={`p-3 border rounded w-full ${errors.subject ? "border-red-500" : "border-gray-300"}`}
                aria-label="Subject"
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "err-subject" : undefined}
                value={subjectValue}
                onChange={onChange}
                disabled={isSubmitting}
                maxLength={120}
              />
              {errors.subject && <p id="err-subject" className="text-xs text-red-600 mt-1">{errors.subject}</p>}
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              ref={msgRef}
              name="message"
              placeholder="Your Message*"
              className={`w-full p-3 border rounded h-32 ${errors.message ? "border-red-500" : "border-gray-300"}`}
              aria-label="Your Message"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "err-message" : undefined}
              value={form.message}
              onChange={onChange}
              disabled={isSubmitting}
              maxLength={2000}
            />
            {errors.message && <p id="err-message" className="text-xs text-red-600 mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-gradient-to-r from-red-600 to-blue-800 text-white px-6 py-3 rounded-full font-semibold w-full md:w-auto transition duration-300 ease-in-out
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg"}
            `}
            aria-busy={isSubmitting}
            aria-label="Send message"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {/* Privacy note */}
          <p className="text-xs text-gray-500 text-center md:text-left">
            We’ll never share your information. By submitting this form, you agree to our{" "}
            <a href="/privacy" className="underline">Privacy Policy</a>.
          </p>
        </form>

        {feedback?.type === "error" && (
          <div className="mt-6 text-center text-base font-semibold text-red-600" role="alert">
            {feedback.msg}
          </div>
        )}

        {/* FAQ - 4 preguntas enfocadas a conversión */}
        <section
          aria-labelledby="faq-heading"
          className="mt-12"
          data-aos="fade-up"
          data-aos-delay="260"
        >
          <h3 id="faq-heading" className="text-2xl font-bold text-blue-900 text-center mb-4">
            Frequently Asked Questions
          </h3>

          <div className="bg-white rounded-xl shadow divide-y divide-gray-200">
            <details className="group p-4">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                How long does it take to build a website?
                <svg className="ml-3 h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="mt-2 text-gray-700 text-sm">
                Most small business websites are ready in <span className="font-semibold">2–4 weeks</span> once we have your content.
                We’ll confirm your exact timeline during your free quote.
              </p>
            </details>

            <details className="group p-4">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                Do I need to provide content and images?
                <svg className="ml-3 h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="mt-2 text-gray-700 text-sm">
                We can use what you already have or help source photos and write copy that fits your brand. Tell us what you need during your consultation.
              </p>
            </details>

            <details className="group p-4">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                Will my site be easy to update later?
                <svg className="ml-3 h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="mt-2 text-gray-700 text-sm">
                Yes. We use user-friendly tools so you can update text, photos, or products yourself. If you prefer, we also offer ongoing support.
              </p>
            </details>

            <details className="group p-4">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                What happens after launch?
                <svg className="ml-3 h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="mt-2 text-gray-700 text-sm">
                We provide post-launch support to ensure everything runs smoothly, plus tips to attract more clients online. Ask about SEO & Local Marketing add-ons during your free quote.
              </p>
            </details>
          </div>
        </section>

        {/* Contact info */}
        <div
          className="text-center mt-10 text-blue-700 space-y-2"
          data-aos="fade-up"
          data-aos-delay="320"
        >
          <p>📍 St. Louis, Missouri</p>
          <p>
            📞 Phone:{" "}
            <a
              href="tel:3143769667"
              className="hover:underline text-blue-500"
              onClick={() => window.gtag && window.gtag("event", "click_call", { place: "contact_page" })}
            >
              314-376-9667
            </a>{" "}
            |{" "}
            <a
              href="https://wa.me/13143769667"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-green-600"
              onClick={() => window.gtag && window.gtag("event", "click_whatsapp", { place: "contact_page" })}
            >
              WhatsApp
            </a>
          </p>
          <p>
            📧 Email:{" "}
            <a href="mailto:admin@domiwebsites.com" className="hover:underline text-blue-500">
              admin@domiwebsites.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
