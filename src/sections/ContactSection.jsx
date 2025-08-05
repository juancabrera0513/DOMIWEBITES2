import React, { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const form = useRef();
  const [subjectValue, setSubjectValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    // Extrae subject de la URL si existe
    const hash = window.location.hash;
    if (hash.includes("?")) {
      const query = new URLSearchParams(hash.split("?")[1]);
      const subject = query.get("subject");
      if (subject) setSubjectValue(subject);
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    emailjs
      .sendForm(
        "service_ywkf6l7",
        "template_68t4i9b",
        form.current,
        "QomFGcKltdQDXhSSp"
      )
      .then(() => {
        setFeedback({ type: "success", msg: "Message sent successfully!" });
        setIsSubmitting(false);
        e.target.reset();
        setSubjectValue("");
        // Google conversion (solo al éxito)
        if (typeof window.gtag_report_conversion === "function") {
          window.gtag_report_conversion();
        }
      })
      .catch(() => {
        setFeedback({ type: "error", msg: "Failed to send message. Please try again." });
        setIsSubmitting(false);
        // Focus en el nombre al error
        if (form.current?.fullName) form.current.fullName.focus();
      });
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
          className="text-4xl font-bold text-center mb-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Contact <span className="text-red-600">Us</span>
        </h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-5 bg-white p-6 rounded-lg shadow-md"
          aria-label="Contact form"
          data-aos="fade-up"
          data-aos-delay="200"
        >
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
              onChange={(e) => setSubjectValue(e.target.value)}
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
          ></textarea>

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
        </form>

        {feedback && (
          <div
            className={`mt-6 text-center text-base font-semibold ${
              feedback.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
            role="alert"
          >
            {feedback.msg}
          </div>
        )}

        <div
          className="text-center mt-10 text-blue-700 space-y-2"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p>📍 St. Louis, Missouri</p>
          <p>
            📞 Phone:{" "}
            <a href="tel:3143769667" className="hover:underline text-blue-500">
              314-376-9667
            </a>{" "}
            |{" "}
            <a
              href="https://wa.me/13143769667"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-green-600"
            >
              WhatsApp
            </a>
          </p>
          <p>
            📧 Email:{" "}
            <a
              href="mailto:admin@domiwebsites.com"
              className="hover:underline text-blue-500"
            >
              admin@domiwebsites.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
