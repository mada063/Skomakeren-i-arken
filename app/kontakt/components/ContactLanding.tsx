"use client";

import React from 'react'
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import EditableText from '@/components/EditableText';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const ContactLanding = () => {
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

  const { ref: contactRef, isIntersecting: contactVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col justify-center min-h-screen py-10 sm:py-16 md:py-20'>
        <div 
          ref={categoryRef}
          className={`transition-all duration-1000 ${
            categoryVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
          <EditableText 
            id="contact-category"
            defaultText="Lokalt"
            className="font-sans"
            tag="p"
            page="kontakt"
            component="ContactLanding"
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
                id="contact-title"
                defaultText="Kontakt oss"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase font-semibold max-w-sm"
                tag="h2"
                page="kontakt"
                component="ContactLanding"
              />
            </div>
            <div 
              ref={descriptionRef}
              className={`w-full lg:w-1/2 transition-all duration-1000 ${
                descriptionVisible ? 'animate-slide-in-right' : 'animate-hidden'
              }`}
            >
              <EditableText 
                id="contact-description"
                defaultText="Vi setter stor pris på at du ønsker å komme i kontakt med oss! Enten du har spørsmål, tilbakemeldinger, ønsker å samarveide, eller trenger hjelp med en tjeneste eller et produkt, står vi klare til å hjelpe deg"
                className="font-sans text-base sm:text-lg md:text-xl"
                tag="p"
                page="kontakt"
                component="ContactLanding"
              />
            </div>
        </div>
        <div 
          ref={contactRef}
          className={`mt-8 sm:mt-12 md:mt-16 flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center transition-all duration-1000 ${
            contactVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
            <div className={`mt-6 sm:mt-12 max-w-sm mx-auto sm:mx-0 transition-all duration-1000 ${
              contactVisible ? 'animate-fade-in' : 'animate-hidden'
            }`}>
                <div className="h-10 sm:h-12 w-auto flex items-center justify-center sm:justify-start">
                    <FaPhone size={40} color="#464646" className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                <EditableText 
                  id="contact-phone-heading"
                  defaultText="Du kan nå oss på nummeret vårt:"
                  className="font-semibold text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4 text-center sm:text-left"
                  tag="h4"
                  page="kontakt"
                  component="ContactLanding"
                />
                <EditableText 
                  id="contact-phone-number"
                  defaultText="+47 468 39 387"
                  className="font-sans text-lg sm:text-xl mt-3 sm:mt-4 text-center sm:text-left"
                  tag="p"
                  page="kontakt"
                  component="ContactLanding"
                />
            </div>
            <div className={`mt-6 sm:mt-12 max-w-sm mx-auto sm:mx-0 transition-all duration-1000 ${
              contactVisible ? 'animate-fade-in' : 'animate-hidden'
            }`}>
                <div className="h-10 sm:h-12 w-auto flex items-center justify-center sm:justify-start">
                    <FaEnvelope size={40} color="#464646" className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                <EditableText 
                  id="contact-email-heading"
                  defaultText="Du kan også nå oss på eposten vår:"
                  className="font-semibold text-xl sm:text-2xl md:text-3xl mt-3 sm:mt-4 text-center sm:text-left"
                  tag="h4"
                  page="kontakt"
                  component="ContactLanding"
                />
                <EditableText 
                  id="contact-email-address"
                  defaultText="shukri9@hotmail.com"
                  className="font-sans text-lg sm:text-xl mt-3 sm:mt-4 text-center sm:text-left"
                  tag="p"
                  page="kontakt"
                  component="ContactLanding"
                />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ContactLanding
