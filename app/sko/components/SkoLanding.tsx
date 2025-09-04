"use client";

import React from 'react';
import Image from 'next/image';
import EditableText from '@/components/EditableText';

const SkoLanding = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col justify-center min-h-screen">
        <div className="mb-16">
          <EditableText 
            id="sko-category"
            defaultText="Skoreperasjon"
            className="mb-4 font-sans"
            tag="p"
            page="sko"
            component="SkoLanding"
          />
          <div className="flex flex-row gap-6 justify-between">
            <EditableText 
              id="sko-landing-title"
              defaultText="Ekspert skoreparasjon"
              className="text-5xl md:text-7xl uppercase font-semibold max-w-3xl"
              tag="h2"
              page="sko"
            />
            <Image
              src="/images/sko_ikon.png"
              height={150}
              width={150}
              className="h-12 w-auto"
              alt="Sko ikon"
            />
          </div>
          <div className="gap-6 mt-8">
            <div className="mt-4">
              <EditableText 
                id="sko-landing-heading"
                defaultText="Reparer skoene dine profesjonelt"
                className="font-semibold text-3xl mt-4"
                tag="h4"
                page="sko"
              />
              <EditableText 
                id="sko-landing-subheading"
                defaultText="Vi tilbyr førsteklasses skoreparasjon for alle typer sko. Bærekraftig, raskt og pålitelig."
                className="font-sans mt-4 text-xl"
                tag="p"
                page="sko"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkoLanding; 