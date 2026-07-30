import React, { useRef } from "react";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Melii Soler",
    text: "I got the best service in the world. I got all what I expected. Now my business has an online presence and my customers are satisfied and happy. Thanks so much!",
  },
  {
    name: "Katherine Areche",
    text: "I am delighted with your services. I have already completed three procedures with you and I highly recommend you.",
  },
  {
    name: "Ana Silvia Amador Aquino",
    text: "The best service in the world.",
  },
  {
    name: "Darkis De Leon Soler",
    text: "Excellent service. Very customizable and patient with feedback. I’m very happy with the results!",
  },
  {
    name: "Maria Cabrera",
    text: "Excellent service, thank you.",
  },
];

function StarsRow() {
  return (
    <div className="flex items-center gap-1 text-amber-400" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className="h-4 w-4 fill-current opacity-90" />
      ))}
    </div>
  );
}

function Avatar({ name }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  return (
    <div className="h-10 w-10 rounded-full grid place-items-center text-xs font-bold text-white bg-white/10 border border-white/10">
      {initials}
    </div>
  );
}

export default function TestimonialsSection() {
  const listRef = useRef(null);

  const move = (direction) => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    listRef.current?.scrollBy({
      left: direction * 376,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="testimonials"
      className="section relative overflow-hidden nexus-bg hero-grid"
      aria-labelledby="testimonials-heading"
    >
      <div className="hero-vignette" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            What clients <span className="grad-text">say</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/60">
            Feedback shared by Domi Websites clients on Google.
          </p>
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            className="hidden md:grid place-items-center absolute -left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass border border-white/10 hover:bg-white/10 transition z-20"
            aria-label="Show previous reviews"
            onClick={() => move(-1)}
          >
            ‹
          </button>

          <button
            type="button"
            className="hidden md:grid place-items-center absolute -right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass border border-white/10 hover:bg-white/10 transition z-20"
            aria-label="Show more reviews"
            onClick={() => move(1)}
          >
            ›
          </button>

          <div
            ref={listRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {REVIEWS.map((review) => (
              <figure
                key={review.name}
                className="min-w-[285px] sm:min-w-[340px] lg:min-w-[360px] snap-start"
              >
                <div className="glass h-full min-h-[220px] rounded-2xl border border-white/10 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,.55)]">
                  <div>
                    <StarsRow />
                    <blockquote className="mt-4 text-sm text-white/85 leading-7">
                      “{review.text}”
                    </blockquote>
                  </div>

                  <figcaption className="mt-6 flex items-center gap-3">
                    <Avatar name={review.name} />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-white truncate">
                        {review.name}
                      </div>
                      <div className="text-xs text-white/45">Google review</div>
                    </div>
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
