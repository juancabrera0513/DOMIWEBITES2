import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();

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
        alert("Message sent successfully!");
        gtag_report_conversion(); // Marca la conversión aquí
      })
      .catch(() => {
        alert("Failed to send message. Please try again.");
      });

    e.target.reset();
  };

  return (
    <section id="contact" className="py-16 bg-white" aria-labelledby="contact-heading">
      <div className="max-w-3xl mx-auto px-4">
        <h2
          id="contact-heading"
          className="text-4xl font-bold text-center mb-8 text-gray-900"
        >
          Contact <span className="text-red-700">Us</span>
        </h2>
        <form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-4"
          aria-label="Contact form"
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="w-full p-3 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            className="w-full p-3 border rounded h-32"
            required
          ></textarea>

          <button
            type="submit"
            onClick={() => gtag_report_conversion()}
            className="bg-gradient-to-r from-red-700 to-blue-800 text-white px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg transition duration-300 ease-in-out font-semibold"
            aria-label="Send contact message"
          >
            Send
          </button>
        </form>

        <div className="text-center mt-6 text-blue-700" aria-label="Contact info">
          <p>St. Louis, Missouri</p>
          <p>
            Phone:{' '}
            <a href="tel:3143769667" className="hover:underline text-blue-500">
              314-376-9667
            </a>{' '}
            |{' '}
            <a href="tel:9737823985" className="hover:underline text-blue-500">
              973-782-3985
            </a>
          </p>
          <p>
            Email:{' '}
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
