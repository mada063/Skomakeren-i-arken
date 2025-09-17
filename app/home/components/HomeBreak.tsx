"use client";

import React from 'react'
import EditableText from '@/components/EditableText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const HomeBreak = () => {
  const { ref: breakRef, isIntersecting: breakVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className='bg-custom-brown text-white'>
      <div 
        ref={breakRef}
        className={`flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 transition-all duration-1000 ${
          breakVisible ? 'animate-fade-in' : 'animate-hidden'
        }`}
      >
        <EditableText 
          id="home-break-title"
          defaultText="Reparer i dag!"
          className="text-center sm:text-left text-3xl sm:text-4xl md:text-6xl lg:text-7xl uppercase font-semibold"
          tag="h2"
          page="home"
          component="HomeBreak"
        />
        <div className="w-full h-[0.1rem] bg-white mt-4 mb-4"></div>
        <EditableText 
          id="home-break-description"
          defaultText="Kom innom oss eller kontakt oss for en gratis befaring. Noen av våre tjenester kan ta mer enn 1 dag, men de fleste kan gjøres menst du venter."
          className="font-sans text-base sm:text-lg md:text-xl mt-4 max-w-xl text-center sm:text-left"
          tag="p"
          page="home"
          component="HomeBreak"
        />
      </div>
    </div>
  )
}

export default HomeBreak
