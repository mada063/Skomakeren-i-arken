"use client";

import React from 'react'
import EditableText from '@/components/EditableText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const Openings = () => {
  const days = [
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
    'Søndag',
  ];

  const times = [
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
  ];

  const { ref: imageRef, isIntersecting: imageVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: textRef, isIntersecting: textVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className='max-w-5xl mx-auto min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 my-12 sm:my-16 md:my-20'>
      <div className='flex flex-col md:flex-row gap-6 sm:gap-8 justify-center items-center'>
        <div 
          ref={imageRef}
          className={`relative w-full md:w-1/2 max-w-md md:max-w-none transition-all duration-1000 ${
            imageVisible ? 'animate-zoom-in-view' : 'animate-hidden'
          }`}
        >
          <div className="bg-custom-brown rounded-lg absolute inset-0"></div>
          <img src="/images/kart.png" alt="Info Section" className="relative w-full h-auto object-contain z-10" />
        </div>
        <div 
          ref={textRef}
          className={`w-full md:w-1/2 transition-all duration-1000 ${
            textVisible ? 'animate-slide-in-right' : 'animate-hidden'
          }`}
        >
          <EditableText 
            id="openings-title"
            defaultText="Åpningstider"
            className="text-center md:text-left text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-semibold mb-6 sm:mb-8"
            tag="h2"
            page="apningstider"
            component="Openings"
          />
          <div className="w-full flex justify-center md:justify-start">
            <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3">
            <table className="w-full border-collapse text-center md:text-left">
              <thead>
                <tr className="border-b-2 sm:text-lg md:text-xl">
                  <th className="py-2">Dag</th>
                  <th className="py-2">Tid</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day, idx) => (
                  <tr key={day} className="border-b text-base sm:text-lg md:text-xl">
                    <td className="py-2">
                      <EditableText 
                        id={`openings-day-${idx + 1}`}
                        defaultText={day}
                        className="font-semibold"
                        tag="span"
                        page="apningstider"
                        component="Openings"
                      />
                    </td>
                    <td className="py-2">
                      <EditableText 
                        id={`openings-time-${idx + 1}`}
                        defaultText={times[idx]}
                        className="font-semibold"
                        tag="span"
                        page="apningstider"
                        component="Openings"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Openings
