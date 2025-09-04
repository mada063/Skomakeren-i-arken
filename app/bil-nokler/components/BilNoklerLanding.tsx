"use client";

import React from 'react';
import Image from 'next/image';
import EditableText from '@/components/EditableText';

const BilNoklerLanding = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center min-h-screen">
        <div className="mb-16">
        <EditableText 
          id="bilnokler-category"
          defaultText="Bilnøkler"
          className="mb-4 font-sans"
          tag="p"
          page="bil-nokler"
          component="BilNoklerLanding"
        />
          <div className="flex flex-row gap-6 justify-between">
            <EditableText 
              id="bilnokler-landing-title"
              defaultText="Bilnøkkel ekspertise"
              className="text-5xl md:text-7xl uppercase font-semibold max-w-3xl"
              tag="h2"
              page="bil-nokler"
            />
            <Image
              src="/images/bil_ikon.png"
              height={150}
              width={150}
              className="h-12 w-auto"
              alt="Bilnøkkel ikon"
            />
          </div>
          <div className="gap-6 mt-8">
            <div className="mt-4">
              <EditableText 
                id="bilnokler-landing-heading"
                defaultText="Profesjonell bilnøkkel service"
                className="font-semibold text-3xl mt-4"
                tag="h4"
                page="bil-nokler"
              />
              <EditableText 
                id="bilnokler-landing-subheading"
                defaultText="Vi programmerer og kopierer bilnøkler for alle merker. Rask service og kvalitetsgaranti."
                className="font-sans mt-4 text-xl"
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