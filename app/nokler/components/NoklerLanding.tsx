"use client";

import React from 'react';
import Image from 'next/image';
import EditableText from '@/components/EditableText';

const NoklerLanding = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center min-h-screen">
        <div className="mb-16">
          <div className="flex flex-row gap-6 items-center">
            <EditableText 
              id="nokler-landing-title"
              defaultText="Nøkkeltjenester"
              className="text-5xl md:text-7xl uppercase font-semibold"
              tag="h2"
              page="nokler"
            />
            <Image
              src="/images/nokkel_ikon.png"
              height={50}
              width={50}
              className="h-12 w-auto"
              alt="Nøkkel ikon"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="mt-4">
              <EditableText 
                id="nokler-landing-heading"
                defaultText="Vi kopierer nøkler på stedet"
                className="font-semibold text-2xl mt-4"
                tag="h4"
                page="nokler"
              />
              <EditableText 
                id="nokler-landing-subheading"
                defaultText="Trenger du en ekstranøkkel? Vi kopierer raskt og presist med kvalitetsgaranti."
                className="font-sans mt-4"
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
            Se våre tjenester
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoklerLanding; 