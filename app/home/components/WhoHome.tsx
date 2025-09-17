"use client";

import React from 'react'
import EditableText from '@/components/EditableText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const WhoHome = () => {
  const { ref: textRef, isIntersecting: textVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: imageRef, isIntersecting: imageVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className='max-w-7xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 my-12 sm:my-16 md:my-20 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center h-full'>
        <div 
          ref={textRef}
          className={`transition-all duration-1000 ${
            textVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
          <EditableText 
            id="who-title"
            defaultText="Hvem er vi"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase font-semibold mt-8 sm:mt-10 md:mt-12 text-center"
            tag="h2"
            page="home"
            component="WhoHome"
          />
          <EditableText 
            id="who-description"
            defaultText="Bedriften eies og driftes av Shukri Helshani"
            className="font-sans mt-4 mb-8 sm:mb-10 md:mb-12 text-base sm:text-lg md:text-xl text-center"
            tag="p"
            page="home"
            component="WhoHome"
          />
        </div>
        <div 
          ref={imageRef}
          className={`relative w-full max-w-2xl transition-all duration-1000 ${
            imageVisible ? 'animate-zoom-in-view' : 'animate-hidden'
          }`}
        >
          <div className="bg-custom-brown rounded-lg absolute inset-0"></div>
          <img src="/images/skomaker4.jpg" alt="Who Home" className="relative rounded-lg w-full h-auto z-10" />
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg z-20"></div>
        </div>
      </div>
    </div>
  )
}

export default WhoHome
