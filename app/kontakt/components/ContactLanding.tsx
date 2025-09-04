"use client";

import React from 'react'
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import EditableText from '@/components/EditableText';

const ContactLanding = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-col justify-center min-h-screen'>
        <EditableText 
          id="contact-category"
          defaultText="Lokalt"
          className="font-sans"
          tag="p"
          page="kontakt"
          component="ContactLanding"
        />
        <div className='flex flex-row gap-6 justify-between'>
            <EditableText 
              id="contact-title"
              defaultText="Kontakt oss"
              className="text-7xl uppercase font-semibold max-w-sm"
              tag="h2"
              page="kontakt"
              component="ContactLanding"
            />
            <EditableText 
              id="contact-description"
              defaultText="Vi setter stor pris på at du ønsker å komme i kontakt med oss! Enten du har spørsmål, tilbakemeldinger, ønsker å samarveide, eller trenger hjelp med en tjeneste eller et produkt, står vi klare til å hjelpe deg"
              className="font-sans w-1/2 text-xl"
              tag="p"
              page="kontakt"
              component="ContactLanding"
            />
        </div>
        <div className='mt-16 flex flex-row gap-6 justify-center'>
            <div className='mt-12 max-w-sm'>
                <div className="h-12 w-auto flex items-center">
                    <FaPhone size={50} color="#464646" />
                </div>
                <EditableText 
                  id="contact-phone-heading"
                  defaultText="Du kan nå oss på nummeret vårt:"
                  className="font-semibold text-3xl mt-4"
                  tag="h4"
                  page="kontakt"
                  component="ContactLanding"
                />
                <EditableText 
                  id="contact-phone-number"
                  defaultText="+47 468 39 387"
                  className="font-sans text-xl mt-4"
                  tag="p"
                  page="kontakt"
                  component="ContactLanding"
                />
            </div>
            <div className='mt-12 max-w-sm'>
                <div className="h-12 w-auto flex items-center">
                    <FaEnvelope size={50} color="#464646" />
                </div>
                <EditableText 
                  id="contact-email-heading"
                  defaultText="Du kan også nå oss på eposten vår:"
                  className="font-semibold text-3xl mt-4"
                  tag="h4"
                  page="kontakt"
                  component="ContactLanding"
                />
                <EditableText 
                  id="contact-email-address"
                  defaultText="shukri9@hotmail.com"
                  className="font-sans text-xl mt-4"
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
