import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Melii Soler",
    text: "I got the best service in the world. I got all what I expect, now my business has an online presence and my customers are satisfied and happy. Thanks so much!",
  },
  {
    name: "Moephy moiseau",
    text: "",
  },
  {
    name: "Katherine Areche",
    text: "I am delighted with your services. I have already completed three procedures with you and I highly recommend you.",
  },
  {
    name: "Ana Silvia Amador Aquino",
    text: "The best service in the world ❤️",
  },
  {
    name: "Marielys Pérez Capellán",
    text: "",
  },
  {
    name: "Darkis De Leon Soler",
    text: "Excellent service. Very customizable and patient with feedback. I’m very happy with the results!!!!",
  },
  {
    name: "Maria Cabrera",
    text: "Excellent service, thank you",
  },
  {
    name: "Kelvyn Rosario",
    text: "",
  },
];

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-gray-50 to-white text-gray-900 relative overflow-hidden"
      aria-labelledby="testimonials-heading"
      data-aos="fade-up"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2
          id="testimonials-heading"
          className="text-4xl font-bold text-center mb-2"
          data-aos="fade-up"
        >
          What Our Clients <span className="text-red-600">Say</span>
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm" data-aos="fade-up" data-aos-delay="100">
          Based on verified reviews from <strong>Google</strong>
        </p>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000 }}
          pagination={{ clickable: true }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
        >
          {reviews
            .filter((review) => review.text.trim() !== "")
            .map((review, index) => (
              <SwiperSlide key={index}>
                <div
                  className="bg-white border border-gray-200 p-6 rounded-lg shadow-md h-full flex flex-col justify-between"
                  data-aos="zoom-in"
                  data-aos-delay={index * 75}
                >
                  <div className="flex items-center gap-1 mb-2 text-yellow-500">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-500" />
                      ))}
                  </div>
                  <p className="text-sm text-gray-800 italic mb-4">“{review.text}”</p>
                  <p className="text-right font-semibold text-blue-700">– {review.name}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TestimonialsSection;
