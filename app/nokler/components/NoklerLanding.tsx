"use client";

import React from 'react';
import Image from 'next/image';
import EditableText from '@/components/EditableText';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const NoklerLanding = () => {
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

  const { ref: buttonRef, isIntersecting: buttonVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center min-h-screen py-10 sm:py-16 md:py-20">
        <div className="mb-8 sm:mb-12 md:mb-16">
        <div 
          ref={categoryRef}
          className={`transition-all duration-1000 ${
            categoryVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
          <EditableText 
            id="nokler-category"
            defaultText="Nøkler"
            className="mb-4 font-sans text-center sm:text-left"
            tag="p"
            page="nokler"
            component="NoklerLanding"
          />
        </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-between">
            <div 
              ref={titleRef}
              className={`transition-all duration-1000 ${
                titleVisible ? 'animate-slide-in-left' : 'animate-hidden'
              }`}
            >
              <EditableText 
                id="nokler-landing-title"
                defaultText="Nøkkeltjenester"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-semibold text-center sm:text-left"
                tag="h2"
                page="nokler"
              />
            </div>
            <Image
              src="/images/nokkel_ikon.png"
              height={150}
              width={150}
              className="h-8 sm:h-10 md:h-12 w-auto"
              alt="Nøkkel ikon"
            />
          </div>
          <div className="gap-6 mt-6 sm:mt-8">
            <div 
              ref={descriptionRef}
              className={`mt-4 transition-all duration-1000 ${
                descriptionVisible ? 'animate-slide-in-right' : 'animate-hidden'
              }`}
            >
              <EditableText 
                id="nokler-landing-heading"
                defaultText="Vi kopierer nøkler på stedet"
                className="font-semibold text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4 text-center sm:text-left"
                tag="h4"
                page="nokler"
              />
              <EditableText 
                id="nokler-landing-subheading"
                defaultText="Trenger du en ekstranøkkel? Vi kopierer raskt og presist med kvalitetsgaranti."
                className="font-sans mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-center sm:text-left"
                tag="p"
                page="nokler"
              />
            </div>
          </div>
        </div>

        <div 
          ref={buttonRef}
          className={`mt-6 sm:mt-8 flex justify-center sm:justify-start transition-all duration-1000 ${
            buttonVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
          <a
            href="#services"
            className="bg-custom-blue text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit text-sm sm:text-base"
          >
            <EditableText 
              id="nokler-services-button"
              defaultText="Se våre tjenester"
              className="text-white"
              tag="span"
              page="nokler"
              component="NoklerLanding"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoklerLanding; 