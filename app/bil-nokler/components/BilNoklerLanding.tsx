"use client";

import React from 'react';
import Image from 'next/image';
import EditableText from '@/components/EditableText';

const BilNoklerLanding = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center min-h-screen">
        <div className="mb-16">
          <div className="flex flex-row gap-6 items-center">
            <EditableText 
              id="bilnokler-landing-title"
              defaultText="Bilnøkkel ekspertise"
              className="text-5xl md:text-7xl uppercase font-semibold"
              tag="h2"
              page="bil-nokler"
            />
            <Image
              src="/images/gravering_ikon.png"
              height={50}
              width={50}
              className="h-12 w-auto"
              alt="Bilnøkkel ikon"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="mt-4">
              <EditableText 
                id="bilnokler-landing-heading"
                defaultText="Profesjonell bilnøkkel service"
                className="font-semibold text-2xl mt-4"
                tag="h4"
                page="bil-nokler"
              />
              <EditableText 
                id="bilnokler-landing-subheading"
                defaultText="Vi programmerer og kopierer bilnøkler for alle merker. Rask service og kvalitetsgaranti."
                className="font-sans mt-4"
                tag="p"
                page="bil-nokler"
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

export default BilNoklerLanding; 