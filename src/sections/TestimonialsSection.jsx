import React from "react";

const testimonials = [
  { name: "Kae’s Kitchen", role: "Bakery Owner", quote: "They delivered a clean storefront site with online ordering that my customers actually use. Sales up and zero headaches." },
  { name: "Glo Event Co", role: "Founder", quote: "Loads fast, looks premium, and the booking inquiries doubled within weeks. Worth every penny." },
  { name: "Mama Pacha", role: "Retail", quote: "The redesign improved navigation and product pages. Our bounce rate dropped noticeably." },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold">What clients say</h2>
        <div className="mt-8 overflow-x-auto no-scrollbar">
          <div className="grid grid-flow-col auto-cols-[85%] md:auto-cols-[33%] gap-4 snap-x snap-mandatory">
            {testimonials.map((t, i) => (
              <figure key={i} className="card p-6 snap-center">
                <blockquote className="text-slate-800 leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-slate-600">
                  <span className="font-semibold">{t.name}</span> • {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
