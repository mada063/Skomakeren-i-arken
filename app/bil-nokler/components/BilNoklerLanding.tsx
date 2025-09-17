"use client";

import React from 'react';
import Image from 'next/image';
import EditableText from '@/components/EditableText';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const BilNoklerLanding = () => {
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
            id="bilnokler-category"
            defaultText="Bilnøkler"
            className="mb-4 font-sans text-center sm:text-left"
            tag="p"
            page="bil-nokler"
            component="BilNoklerLanding"
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
                id="bilnokler-landing-title"
                defaultText="Bilnøkkel ekspertise"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-semibold max-w-3xl text-center sm:text-left"
                tag="h2"
                page="bil-nokler"
              />
            </div>
            <Image
              src="/images/bil_ikon.png"
              height={150}
              width={150}
              className="h-8 sm:h-10 md:h-12 w-auto"
              alt="Bilnøkkel ikon"
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
                id="bilnokler-landing-heading"
                defaultText="Profesjonell bilnøkkel service"
                className="font-semibold text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4 text-center sm:text-left"
                tag="h4"
                page="bil-nokler"
              />
              <EditableText 
                id="bilnokler-landing-subheading"
                defaultText="Vi programmerer og kopierer bilnøkler for alle merker. Rask service og kvalitetsgaranti."
                className="font-sans mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-center sm:text-left"
                tag="p"
                page="bil-nokler"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BilNoklerLanding; 