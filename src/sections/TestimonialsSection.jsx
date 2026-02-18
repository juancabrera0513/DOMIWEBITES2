import React, { useEffect, useMemo, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Melii Soler",
    text: "I got the best service in the world. I got all what I expect, now my business has an online presence and my customers are satisfied and happy. Thanks so much!",
  },
  {
    name: "Katherine Areche",
    text: "I am delighted with your services. I have already completed three procedures with you and I highly recommend you.",
  },
  { name: "Ana Silvia Amador Aquino", text: "The best service in the world ❤️" },
  {
    name: "Darkis De Leon Soler",
    text: "Excellent service. Very customizable and patient with feedback. I’m very happy with the results!!!!",
  },
  { name: "Maria Cabrera", text: "Excellent service, thank you" },
];

function StarsRow() {
  return (
    <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current opacity-90" />
      ))}
    </div>
  );
}

function Avatar({ name = "" }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div className="h-9 w-9 rounded-full grid place-items-center text-xs font-semibold text-white bg-white/10 border border-white/10">
      {initials || "★"}
    </div>
  );
}

export default function TestimonialsSection() {
  const reviews = useMemo(() => REVIEWS.filter((r) => (r.text || "").trim() !== ""), []);
  const swiperRef = useRef(null);
  const [ready, setReady] = useState(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => setReady(true), []);

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
            Based on verified Google reviews.
          </p>
        </div>

        <div className="relative mt-10">
          <button
            type="button"
            className="hidden md:grid place-items-center absolute -left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass border border-white/10 hover:bg-white/10 transition z-20"
            aria-label="Previous"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            ‹
          </button>

          <button
            type="button"
            className="hidden md:grid place-items-center absolute -right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full glass border border-white/10 hover:bg-white/10 transition z-20"
            aria-label="Next"
            onClick={() => swiperRef.current?.slideNext()}
          >
            ›
          </button>

          <div className="overflow-hidden rounded-3xl">
            <Swiper
              onSwiper={(s) => (swiperRef.current = s)}
              modules={[Autoplay, Pagination, Navigation]}
              slidesPerView="auto"
              spaceBetween={16}
              loop={reviews.length > 3}
              grabCursor
              pagination={{ clickable: true }}
              autoplay={
                prefersReducedMotion
                  ? false
                  : {
                      delay: 3200,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
              }
              className="testimonials-swiper"
            >
              {reviews.map((review, idx) => (
                <SwiperSlide
                  key={`${review.name}-${idx}`}
                  className="!w-[300px] sm:!w-[340px] lg:!w-[360px]"
                >
                  <figure className="h-full">
                    <div className="glass h-[210px] rounded-2xl border border-white/10 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,.55)]">
                      <div>
                        <StarsRow />
                        <blockquote className="mt-3 text-sm text-white/85 leading-relaxed line-clamp-4">
                          “{review.text}”
                        </blockquote>
                      </div>

                      <figcaption className="mt-4 flex items-center gap-3">
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
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <style>{`
            .testimonials-swiper .swiper-wrapper { align-items: stretch; }
            .testimonials-swiper .swiper-pagination { position: relative; margin-top: 14px; }
            .testimonials-swiper .swiper-pagination-bullet { background: rgba(255,255,255,.35); opacity: 1; }
            .testimonials-swiper .swiper-pagination-bullet-active { background: rgba(34,211,238,.95); }
          `}</style>
        </div>

        {ready ? null : null}
      </div>
    </section>
  );
}
