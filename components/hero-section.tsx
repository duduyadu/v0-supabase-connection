"use client";

import { useState, useEffect, useCallback } from "react";
import { CalendarCheck, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const heroImages = [
  { src: "/images/hero-5.jpg", alt: "Gyeongbokgung Autumn" },
  { src: "/images/hero-4.jpg", alt: "Seoul Skyline with Namsan Tower" },
  { src: "/images/hero-2.jpg", alt: "COEX Starfield Library" },
  { src: "/images/hero-3.jpg", alt: "Korean City Landscape" },
];

const content = {
  vi: {
    title1: "Du hoc Han Quoc,",
    title2: "cung di se duoc.",
    description: "Tu chuan bi den dinh cu, Aju E&J dong hanh cung ban.",
    cta: "Tu van mien phi",
  },
  ko: {
    title1: "\uD55C\uAD6D \uC720\uD559,",
    title2: "\uD568\uAED8\uB77C\uC11C \uAC00\uB2A5\uD55C \uAE38.",
    description: "\uC900\uBE44\uBD80\uD130 \uC815\uCC29\uAE4C\uC9C0, Aju E&J\uAC00 \uB3D9\uD589\uD569\uB2C8\uB2E4.",
    cta: "\uBB34\uB8CC\uC0C1\uB2F4",
  },
};

interface HeroSectionProps {
  lang: "vi" | "ko";
}

export function HeroSection({ lang }: HeroSectionProps) {
  const t = content[lang];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % heroImages.length);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[85vh] lg:min-h-screen flex items-center overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={image.src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === currentSlide ? 1 : 0 }}
        >
          <img
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-black/25" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.05) 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
            <span className="block text-white">{t.title1}</span>
            <span className="block text-white/90 mt-2">{t.title2}</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed mb-12 text-pretty font-light" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.25)' }}>
            {t.description}
          </p>

          <a href="#contact">
            <button
              type="button"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-10 sm:py-4 border border-white/40 text-white font-medium text-sm sm:text-base md:text-lg hover:bg-white hover:text-[#2b3a67] transition-all duration-500 tracking-wide"
            >
              <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
              {t.cta}
            </button>
          </a>
        </div>
      </div>

      <div className="absolute bottom-20 lg:bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          type="button"
          onClick={prevSlide}
          className="hidden sm:flex w-10 h-10 border border-white/20 items-center justify-center text-white hover:bg-white/10 transition-colors duration-500 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 cursor-pointer ${
                index === currentSlide
                  ? "w-8 h-0.5 bg-white"
                  : "w-4 h-0.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          className="hidden sm:flex w-10 h-10 border border-white/20 items-center justify-center text-white hover:bg-white/10 transition-colors duration-500 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
        <span className="text-white/40 text-[10px] font-medium tracking-[0.25em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/40 animate-bounce" />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to bottom, transparent, #f5f0e8)' }}
      />
    </section>
  );
}
