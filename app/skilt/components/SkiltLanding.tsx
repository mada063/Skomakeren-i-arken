"use client";

import React from 'react';
import Image from 'next/image';
import EditableText from '@/components/EditableText';

const SkiltLanding = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center min-h-screen">
        <div className="mb-16">
        <EditableText 
          id="skilt-category"
          defaultText="Skilt"
          className="mb-4 font-sans"
          tag="p"
          page="skilt"
          component="SkiltLanding"
        />
          <div className="flex flex-row gap-6 items-center justify-between">
            <EditableText 
              id="skilt-landing-title"
              defaultText="Flotte skilt"
              className="text-5xl md:text-7xl uppercase font-semibold"
              tag="h2"
              page="skilt"
            />
            <Image
              src="/images/skilt_ikon.png"
              height={150}
              width={150}
              className="h-12 w-auto"
              alt="Skilt ikon"
            />
          </div>
          <div className="w-1/2 mt-8">
            <div className="mt-4">
              <EditableText 
                id="skilt-landing-heading"
                defaultText="Profesjonelle skilt til alle formål"
                className="font-semibold text-2xl mt-4"
                tag="h4"
                page="skilt"
              />
              <EditableText 
                id="skilt-landing-subheading"
                defaultText="Bestill dørskilt, navneskilt og kontorskilt med rask levering og høy kvalitet. Vi lager blant annet postkasseskilt, dørskilt, navneskilt, hundemerker, hestegrimeskilt i plast messing og aluminium"
                className="font-sans mt-4"
                tag="p"
                page="skilt"
              />
            </div>
          </div>
        </div>

        <div className=" flex justify-center md:justify-start">
          <a
            href="#services"
            className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit"
          >
            <EditableText 
              id="skilt-contact-button"
              defaultText="Kontakt oss"
              className="text-white"
              tag="span"
              page="skilt"
              component="SkiltLanding"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SkiltLanding; 