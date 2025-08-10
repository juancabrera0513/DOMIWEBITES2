// src/sections/ContactSection.jsx
import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactSection = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [subjectValue, setSubjectValue] = useState("");

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
    if (s) setSubjectValue(s);
  }, []);

  const onChangeSubject = (e) => setSubjectValue(e.target.value);

  const sendEmail = async (e) => {
    e.preventDefault();
    setFeedback(null);

    // honeypot
    if (formRef.current?.elements?.botcheck?.value) return;

    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      if (window.gtag) {
        window.gtag("event", "generate_lead", { form_location: "contact_page", method: "emailjs" });
      }
      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion();
      }

      formRef.current.reset();
      setSubjectValue("");
      window.location.href = "/thank-you";
    } catch {
      setIsSubmitting(false);
      setFeedback({ type: "error", msg: "Failed to send message. Please try again." });
      formRef.current?.fullName?.focus();
    }
  };

  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-br from-gray-100 to-white text-gray-900"
      aria-labelledby="contact-heading"
      data-aos="fade-up"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2
          id="contact-heading"
          className="text-4xl font-bold text-center"
          data-aos="fade-up"
          data-aos-delay="80"
        >
          Contact <span className="text-red-600">Us</span>
        </h2>

        {/* Short reassurance copy */}
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
          <input
            type="text"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name*"
              className="p-3 border rounded w-full"
              autoComplete="name"
              required
              aria-label="Full Name"
              disabled={isSubmitting}
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              className="p-3 border rounded w-full"
              autoComplete="email"
              required
              aria-label="Email"
              disabled={isSubmitting}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone*"
              className="p-3 border rounded w-full"
              autoComplete="tel"
              required
              aria-label="Phone"
              disabled={isSubmitting}
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject*"
              value={subjectValue}
              onChange={onChangeSubject}
              className="p-3 border rounded w-full"
              required
              aria-label="Subject"
              disabled={isSubmitting}
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message*"
            className="w-full p-3 border rounded h-32"
            required
            aria-label="Your Message"
            disabled={isSubmitting}
          />

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

        {/* FAQ */}
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
                How much does a website cost and what’s included?
                <svg className="ml-3 h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="mt-2 text-gray-700 text-sm">
                It depends on scope (pages, features, content). Every project includes custom design,
                mobile-first build, basic on-page SEO, performance best practices, and a lead form.
                We’ll send a tailored quote after a short discovery call.
              </p>
            </details>

            <details className="group p-4">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                How long will it take?
                <svg className="ml-3 h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="mt-2 text-gray-700 text-sm">
                Small marketing sites (1–5 sections) are often done in <span className="font-semibold">1–3 weeks</span>.
                Larger sites or special features may need more time. You’ll get a clear timeline upfront.
              </p>
            </details>

            <details className="group p-4">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                Do you handle hosting and domains?
                <svg className="ml-3 h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="mt-2 text-gray-700 text-sm">
                Yes. We can use your existing setup or provide managed hosting (SSL, backups, monitoring) and help with domain
                purchase/connection. We’ll recommend the most convenient option.
              </p>
            </details>

            <details className="group p-4">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                Is SEO or Analytics included?
                <svg className="ml-3 h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="mt-2 text-gray-700 text-sm">
                We ship with basic on-page SEO, performance optimizations, and <span className="font-semibold">Google Analytics 4</span> set up.
                Local SEO and Google Business Profile optimization are available as add-ons.
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
                We offer maintenance plans for updates, security, backups, and small content changes. Or we can hand it off with
                training—your call.
              </p>
            </details>

            <details className="group p-4">
              <summary className="flex items-center justify-between cursor-pointer font-semibold text-gray-900">
                How do you handle my data?
                <svg className="ml-3 h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 12a1 1 0 01-.707-.293l-5-5a1 1 0 111.414-1.414L10 9.586l4.293-4.293a1 1 0 111.414 1.414l-5 5A1 1 0 0110 12z" clipRule="evenodd" />
                </svg>
              </summary>
              <p className="mt-2 text-gray-700 text-sm">
                We never share or sell your information. We use it only to respond to your inquiry and deliver services. You can
                request deletion at any time. See our <a href="/privacy" className="underline">Privacy Policy</a>.
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
