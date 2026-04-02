import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import './Banner.css'

const slides = [
  {
    image: "/banner_img/banner_1.webp",
    title: "Learn Smarter",
    subtitle: "Modern courses & interactive learning",
  },
  {
    image: "/banner_img/banner_2.jpg",
    title: "Submit Assignments",
    subtitle: "Track progress & deadlines easily",
  },
  {
    image: "/banner_img/banner_3.jpg",
    title: "Grow Your Skills",
    subtitle: "Build your future with confidence",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-4xl md:text-6xl font-bold pacifico-regular">{slide.title}</h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-3 rounded-full text-white"
      >
        <ChevronRight size={28} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
