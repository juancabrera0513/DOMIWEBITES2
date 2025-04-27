import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();
  const [subjectValue, setSubjectValue] = useState('');

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes('?')) {
      const query = new URLSearchParams(hash.split('?')[1]);
      const subject = query.get('subject');
      if (subject) {
        setSubjectValue(subject);
      }
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_ywkf6l7',
        'template_68t4i9b',
        form.current,
        'QomFGcKltdQDXhSSp'
      )
      .then(() => {
        alert('Message sent successfully!');
        gtag_report_conversion();
      })
      .catch(() => {
        alert('Failed to send message. Please try again.');
      });

    e.target.reset();
  };

  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-br from-gray-100 to-white text-gray-900"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2
          id="contact-heading"
          className="text-4xl font-bold text-center mb-10"
        >
          Contact <span className="text-red-600">Us</span>
        </h2>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-5 bg-white p-6 rounded-lg shadow-md"
          aria-label="Contact form"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="p-3 border rounded w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 border rounded w-full"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              className="p-3 border rounded w-full"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={subjectValue}
              onChange={(e) => setSubjectValue(e.target.value)}
              className="p-3 border rounded w-full"
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full p-3 border rounded h-32"
            required
          ></textarea>

          <button
            type="submit"
            onClick={() => gtag_report_conversion()}
            className="bg-gradient-to-r from-red-600 to-blue-800 text-white px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out font-semibold w-full md:w-auto"
          >
            Send Message
          </button>
        </form>

        <div className="text-center mt-10 text-blue-700 space-y-2">
          <p>📍 St. Louis, Missouri</p>
          <p>
            📞 Phone:{' '}
            <a href="tel:3143769667" className="hover:underline text-blue-500">
              314-376-9667
            </a>{' '}
            |{' '}
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
            📧 Email:{' '}
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

export default Contact;
