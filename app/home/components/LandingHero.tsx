"use client";

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function LandingHero() {
  const { ref: heroRef, isIntersecting: heroVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: textRef, isIntersecting: textVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div id="hero-section" className="min-h-screen relative overflow-hidden">
      <div className="w-full min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-custom-brown"></div>
        <div 
          ref={heroRef}
          className={`absolute inset-0 bg-cover bg-no-repeat transition-all duration-1000 ${
            heroVisible ? 'animate-zoom-in-view' : 'animate-hidden'
          }`}
          style={{ 
            backgroundImage: "url('/images/skomaker2.jpg')",
            backgroundPosition: "center 70%"
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Sentrert på mobil, nederst på desktop */}
        <div 
          ref={textRef}
          className={`absolute inset-0 flex flex-col items-center justify-center md:justify-end gap-3 sm:gap-5 md:gap-6 text-center px-0 pb-0 md:pb-16 transition-all duration-1000 ${
            textVisible ? 'animate-fade-in-up' : 'animate-hidden'
          }`}
        >
          <h4 className="text-xs sm:text-base md:text-xl lg:text-2xl uppercase text-white">
            Åsane senter, Bygg B
          </h4>
          <div className="w-full h-[0.12rem] bg-white"></div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold uppercase text-white leading-tight">
            Skomakeren<br />i Arken
          </h1>
        </div>
      </div>
    </div>
  );
}
