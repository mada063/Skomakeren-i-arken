"use client";

import React from 'react'
import Image from 'next/image';
import EditableText from '@/components/EditableText';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const HomeSection = () => {
  const { ref: categoryRef, isIntersecting: categoryVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: titleRef, isIntersecting: titleVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: descriptionRef, isIntersecting: descriptionVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: gridRef, isIntersecting: gridVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className='max-w-7xl mx-auto min-h-screen my-10 sm:my-16 md:my-20 px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col justify-center min-h-screen'>
        <div 
          ref={categoryRef}
          className={`transition-all duration-1000 ${
            categoryVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
          <EditableText 
            id="home-section-category"
            defaultText="Kvalitet"
            className="mb-4 font-sans text-center lg:text-left"
            tag="p"
            page="home"
            component="HomeSection"
          />
        </div>
        <div className='w-full flex flex-col lg:flex-row justify-between gap-4 sm:gap-6'>
            <div 
              ref={titleRef}
              className={`transition-all duration-1000 ${
                titleVisible ? 'animate-slide-in-left' : 'animate-hidden'
              }`}
            >
              <EditableText 
                id="home-section-title"
                defaultText="Din lokale reperatør"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-semibold text-center lg:text-left"
                tag="h2"
                page="home"
                component="HomeSection"
              />
            </div>
            <div 
              ref={descriptionRef}
              className={`w-full lg:w-1/2 transition-all duration-1000 ${
                descriptionVisible ? 'animate-slide-in-right' : 'animate-hidden'
              }`}
            >
              <EditableText 
                id="home-section-description"
                defaultText="Hos oss er vår spesialitet sko, vi tilbyr også tjenester som nøkkelreperasjon og kopiering, slik at du aldri mister tilgang til tingene dine! Vi tilbyr også skiltlaging."
                className="font-sans text-base sm:text-lg md:text-xl text-center lg:text-left"
                tag="p"
                page="home"
                component="HomeSection"
              />
            </div>
        </div>
        <div 
          ref={gridRef}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 transition-all duration-1000 ${
            gridVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
            <div className={`mt-6 sm:mt-12 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 ${
              gridVisible ? 'animate-fade-in' : 'animate-hidden'
            }`}>
                <Image
                    src='/images/sko_ikon.png'
                    height={150}
                    width={150}
                    className="h-8 sm:h-10 w-auto mx-auto sm:mx-0"
                    alt='Sko ikon'
                />
                <EditableText 
                  id="home-section-shoes-title"
                  defaultText="Ekspert skoreparasjon"
                  className="font-semibold text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4"
                  tag="h4"
                  page="home"
                  component="HomeSection"
                />
                <EditableText 
                  id="home-section-shoes-description"
                  defaultText="Få nytt liv i skoene dine med vår ekspertise."
                  className="font-sans mt-3 sm:mt-4 text-base sm:text-lg md:text-xl"
                  tag="p"
                  page="home"
                  component="HomeSection"
                />
                <a
                    href="/sko"
                    className="bg-custom-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit mt-3 sm:mt-4 text-sm sm:text-base mx-auto lg:mx-0"
                >
                    <EditableText 
                      id="home-section-shoes-button"
                      defaultText="Skoreparasjon"
                      className="text-white"
                      tag="span"
                      page="home"
                      component="HomeSection"
                    />
                </a>
            </div>
            <div className={`mt-6 sm:mt-12 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 ${
              gridVisible ? 'animate-fade-in' : 'animate-hidden'
            }`}>
                <Image
                    src='/images/bil_ikon.png'
                    height={150}
                    width={150}
                    className="h-8 sm:h-10 w-auto mx-auto sm:mx-0"
                    alt='Bil ikon'
                />
                <EditableText 
                  id="home-section-car-title"
                  defaultText="Bilnøkler"
                  className="font-semibold text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4"
                  tag="h4"
                  page="home"
                  component="HomeSection"
                />
                <EditableText 
                  id="home-section-car-description"
                  defaultText="Har du mistet nøklene dine? Vi kan hjelpe deg med å lage nye."
                  className="font-sans mt-3 sm:mt-4 text-base sm:text-lg md:text-xl"
                  tag="p"
                  page="home"
                  component="HomeSection"
                />
                <a
                    href="/bil-nokler"
                    className="bg-custom-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit mt-3 sm:mt-4 text-sm sm:text-base mx-auto lg:mx-0"
                >
                    <EditableText 
                      id="home-section-car-button"
                      defaultText="Bilnøkler"
                      className="text-white"
                      tag="span"
                      page="home"
                      component="HomeSection"
                    />
                </a>
            </div>
            <div className={`mt-6 sm:mt-12 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 ${
              gridVisible ? 'animate-fade-in' : 'animate-hidden'
            }`}>
                <Image
                    src='/images/nokkel_ikon.png'
                    height={150}
                    width={150}
                    className="h-8 sm:h-10 w-auto mx-auto sm:mx-0"
                    alt='Nøkkel ikon'
                />
                <EditableText 
                  id="home-section-keys-title"
                  defaultText="Nøkler"
                  className="font-semibold text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4"
                  tag="h4"
                  page="home"
                  component="HomeSection"
                />
                <EditableText 
                  id="home-section-keys-description"
                  defaultText="Vi tilbyr nøkkelkopiering og reparasjon for alle typer nøkler."
                  className="font-sans mt-3 sm:mt-4 text-base sm:text-lg md:text-xl"
                  tag="p"
                  page="home"
                  component="HomeSection"
                />
                <a
                    href="/nokler"
                    className="bg-custom-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit mt-3 sm:mt-4 text-sm sm:text-base mx-auto lg:mx-0"
                >
                    <EditableText 
                      id="home-section-keys-button"
                      defaultText="Nøkler"
                      className="text-white"
                      tag="span"
                      page="home"
                      component="HomeSection"
                    />
                </a>
            </div>
            <div className={`mt-6 sm:mt-12 flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-1000 ${
              gridVisible ? 'animate-fade-in' : 'animate-hidden'
            }`}>
                <Image
                    src='/images/skilt_ikon.png'
                    height={150}
                    width={150}
                    className="h-8 sm:h-10 w-auto mx-auto sm:mx-0"
                    alt='Skilt ikon'
                />
                <EditableText 
                  id="home-section-signs-title"
                  defaultText="Skiltlaging"
                  className="font-semibold text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4"
                  tag="h4"
                  page="home"
                  component="HomeSection"
                />
                <EditableText 
                  id="home-section-signs-description"
                  defaultText="Spesialtilpassede skilt for ditt behov. Vi graverer på metall."
                  className="font-sans mt-3 sm:mt-4 text-base sm:text-lg md:text-xl"
                  tag="p"
                  page="home"
                  component="HomeSection"
                />
                <a
                    href="/skilt"
                    className="bg-custom-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit mt-3 sm:mt-4 text-sm sm:text-base mx-auto lg:mx-0"
                >
                    <EditableText 
                      id="home-section-signs-button"
                      defaultText="Skiltlaging"
                      className="text-white"
                      tag="span"
                      page="home"
                      component="HomeSection"
                    />
                </a>
            </div>
        </div>

      </div>
    </div>
  )
}

export default HomeSection
