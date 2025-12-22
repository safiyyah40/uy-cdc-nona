import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Komponen Slideshow Utama
 */
export default function Slideshow({ slides = [] }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, nextSlide, current]);

  if (!slides || slides.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 px-6 lg:px-12">
        Tidak ada slide untuk ditampilkan.
      </div>
    );
  }

  return (
    <div className="w-full mb-20 px-6 lg:px-12">
      <div className="relative w-full mx-auto pb-[42.85%] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[current].id || current}
            src={slides[current].photo_url}
            alt={slides[current].alt_text || "Slide Image"}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.0 }}
          />
        </AnimatePresence>

        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-4 rounded-full shadow-xl transition-all z-10 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-7 h-7 text-[#006241]" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-4 rounded-full shadow-xl transition-all z-10 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight className="w-7 h-7 text-[#006241]" />
            </button>
          </>
        )}

        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === current
                  ? "bg-[#006241] scale-125"
                  : "bg-white/60 hover:bg-white/90"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
