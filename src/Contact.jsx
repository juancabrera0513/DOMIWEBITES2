import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_ywkf6l7',
      'template_68t4i9b',
      form.current,
      'QomFGcKltdQDXhSSp'
    ).then(() => {
      alert("Message sent successfully!");
    }).catch(() => {
      alert("Failed to send message. Please try again.");
    });

    e.target.reset();
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Contact <span className="text-red-600">Us</span>
        </h2>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" className="w-full p-3 border rounded" required />
          <input type="email" name="email" placeholder="Email" className="w-full p-3 border rounded" required />
          <input type="tel" name="phone" placeholder="Phone" className="w-full p-3 border rounded" required />
          <input type="text" name="subject" placeholder="Subject" className="w-full p-3 border rounded" required />
          <textarea name="message" placeholder="Message" className="w-full p-3 border rounded h-32" required></textarea>
          <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">
            Send
          </button>
        </form>
        <div className="text-center mt-6 text-blue-700">
          <p>St. Louis, Missouri</p>
          <p>Phone: 314-376-9667 | 973-782-3985</p>
          <p>Email: admin@domiwebsites.com</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;