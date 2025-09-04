"use client";

import React from 'react';
import Image from 'next/image';
import EditableText from '@/components/EditableText';

const NoklerLanding = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center min-h-screen">
        <div className="mb-16">
        <EditableText 
          id="nokler-category"
          defaultText="Nøkler"
          className="mb-4 font-sans"
          tag="p"
          page="nokler"
          component="NoklerLanding"
        />
          <div className="flex flex-row gap-6 justify-between">
            <EditableText 
              id="nokler-landing-title"
              defaultText="Nøkkeltjenester"
              className="text-5xl md:text-7xl uppercase font-semibold"
              tag="h2"
              page="nokler"
            />
            <Image
              src="/images/nokkel_ikon.png"
              height={150}
              width={150}
              className="h-12 w-auto"
              alt="Nøkkel ikon"
            />
          </div>
          <div className="gap-6 mt-8">
            <div className="mt-4">
              <EditableText 
                id="nokler-landing-heading"
                defaultText="Vi kopierer nøkler på stedet"
                className="font-semibold text-3xl mt-4"
                tag="h4"
                page="nokler"
              />
              <EditableText 
                id="nokler-landing-subheading"
                defaultText="Trenger du en ekstranøkkel? Vi kopierer raskt og presist med kvalitetsgaranti."
                className="font-sans mt-4 text-xl"
                tag="p"
                page="nokler"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center md:justify-start">
          <a
            href="#services"
            className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit"
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