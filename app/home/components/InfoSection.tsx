"use client";

import React from 'react'
import EditableText from '@/components/EditableText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const InfoSection = () => {
  const { ref: imageRef, isIntersecting: imageVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: textRef, isIntersecting: textVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className='max-w-7xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8 my-12 sm:my-16 md:my-20 flex items-center justify-center'>
      <div className='flex flex-col md:flex-row justify-between gap-6 md:gap-10 it'>
        <div 
          ref={imageRef}
          className={`relative w-full max-w-2xl transition-all duration-1000 ${
            imageVisible ? 'animate-zoom-in-view' : 'animate-hidden'
          }`}
        >
          <div className="bg-custom-brown rounded-lg absolute inset-0"></div>
          <img src="" alt="Info Section" className="relative rounded-lg w-full h-auto z-10" />
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg z-20"></div>
        </div>
        <div 
          ref={textRef}
          className={`transition-all duration-1000 ${
            textVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
            <EditableText 
              id="info-title"
              defaultText="Hvorfor oss?"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase font-semibold mt-4 text-center md:text-left"
              tag="h2"
              page="home"
              component="InfoSection"
            />
            <EditableText 
              id="info-description"
              defaultText="Eksempeltekst pioakpdsofakpsdfkoaspdo aspdfko aspdofk pasddkofpo ooasdpfasdof osdodaofoasodfo oooo  oosam,mvb bsåp,åpqdlksdv naldskmvåwqåpåf åpsfåasdckmavsdvpaom"
              className="font-sans mt-4 text-base sm:text-lg md:text-xl text-center md:text-left"
              tag="p"
              page="home"
              component="InfoSection"
            />
            <a
          href="/kontakt"
          className="mt-8 bg-custom-blue text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg inline-block text-sm sm:text-base"
        >
          <EditableText 
            id="info-contact-button"
            defaultText="Kontakt oss"
            className="text-white"
            tag="span"
            page="home"
            component="InfoSection"
          />
        </a>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
