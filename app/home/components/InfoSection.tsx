"use client";

import React from 'react'
import EditableText from '@/components/EditableText'

const InfoSection = () => {
  return (
    <div className='max-w-7xl mx-auto min-h-screen my-20'>
      <div className='flex flex-col md:flex-row justify-between gap-6'>
        <div className="relative w-full max-w-2xl">
          <img src="/images/skomaskin.jpg" alt="Info Section" className="rounded-lg w-full h-auto" />
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
        </div>
        <div>
            <EditableText 
              id="info-title"
              defaultText="Hvorfor oss?"
              className="text-7xl uppercase font-semibold mt-4"
              tag="h2"
              page="home"
              component="InfoSection"
            />
            <EditableText 
              id="info-description"
              defaultText="Eksempeltekst pioakpdsofakpsdfkoaspdo aspdfko aspdofk pasddkofpo ooasdpfasdof osdodaofoasodfo oooo  oosam,mvb bsåp,åpqdlksdv naldskmvåwqåpåf åpsfåasdckmavsdvpaom"
              className="font-sans mt-4 text-xl"
              tag="p"
              page="home"
              component="InfoSection"
            />
            <a
          href="https://www.skomakeren.no/"
          className="mt-8 bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg inline-block"
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
