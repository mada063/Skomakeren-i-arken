"use client";

import React from 'react'
import Image from 'next/image';
import EditableText from '@/components/EditableText';

const HomeSection = () => {
  return (
    <div className='max-w-7xl mx-auto min-h-screen my-20'>
      <div className='flex flex-col justify-center min-h-screen'>
        <EditableText 
          id="home-section-category"
          defaultText="Kvalitet"
          className="mb-4 font-sans"
          tag="p"
          page="home"
          component="HomeSection"
        />
        <div className='flex flex-row gap-6 justify-between'>
            <EditableText 
              id="home-section-title"
              defaultText="Din lokale reperatør"
              className="text-7xl uppercase font-semibold"
              tag="h2"
              page="home"
              component="HomeSection"
            />
            <EditableText 
              id="home-section-description"
              defaultText="Hos oss er vår spesialitet sko, vi tilbyr også tjenester som nøkkelreperasjon og kopiering, slik at du aldri mister tilgang til tingene dine! Vi tilbyr også skiltlaging."
              className="font-sans text-xl w-1/2"
              tag="p"
              page="home"
              component="HomeSection"
            />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
            <div className='mt-12 flex flex-col'>
                <Image
                    src='/images/sko_ikon.png'
                    height={150}
                    width={150}
                    className="h-10 w-fit"
                    alt='Sko ikon'
                />
                <EditableText 
                  id="home-section-shoes-title"
                  defaultText="Ekspert skoreparasjon"
                  className="font-semibold text-3xl mt-4"
                  tag="h4"
                  page="home"
                  component="HomeSection"
                />
                <EditableText 
                  id="home-section-shoes-description"
                  defaultText="Få nytt liv i skoene dine med vår ekspertise."
                  className="font-sans mt-4 text-xl"
                  tag="p"
                  page="home"
                  component="HomeSection"
                />
                <a
                    href="/sko"
                    className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit mt-4"
                >
                    <EditableText 
                      id="home-section-shoes-button"
                      defaultText="Skoreparasjon"
                      className="text-white"
                      tag="span"
                      page="home"
                      component="HomeSection"
                    />
                </a>
            </div>
            <div className='mt-12 flex flex-col'>
                <Image
                    src='/images/bil_ikon.png'
                    height={150}
                    width={150}
                    className="h-10 w-fit"
                    alt='Bil ikon'
                />
                <EditableText 
                  id="home-section-car-title"
                  defaultText="Bilnøkler"
                  className="font-semibold text-3xl mt-4"
                  tag="h4"
                  page="home"
                  component="HomeSection"
                />
                <EditableText 
                  id="home-section-car-description"
                  defaultText="Har du mistet nøklene dine? Vi kan hjelpe deg med å lage nye."
                  className="font-sans mt-4 text-xl"
                  tag="p"
                  page="home"
                  component="HomeSection"
                />
                <a
                    href="/bil-nokler"
                    className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit mt-4"
                >
                    <EditableText 
                      id="home-section-car-button"
                      defaultText="Bilnøkler"
                      className="text-white"
                      tag="span"
                      page="home"
                      component="HomeSection"
                    />
                </a>
            </div>
            <div className='mt-12 flex flex-col'>
                <Image
                    src='/images/nokkel_ikon.png'
                    height={150}
                    width={150}
                    className="h-10 w-fit"
                    alt='Nøkkel ikon'
                />
                <EditableText 
                  id="home-section-keys-title"
                  defaultText="Nøkler"
                  className="font-semibold text-3xl mt-4"
                  tag="h4"
                  page="home"
                  component="HomeSection"
                />
                <EditableText 
                  id="home-section-keys-description"
                  defaultText="Vi tilbyr nøkkelkopiering og reparasjon for alle typer nøkler."
                  className="font-sans mt-4 text-xl"
                  tag="p"
                  page="home"
                  component="HomeSection"
                />
                <a
                    href="/nokler"
                    className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit mt-4"
                >
                    <EditableText 
                      id="home-section-keys-button"
                      defaultText="Nøkler"
                      className="text-white"
                      tag="span"
                      page="home"
                      component="HomeSection"
                    />
                </a>
            </div>
            <div className='mt-12 flex flex-col'>
                <Image
                    src='/images/skilt_ikon.png'
                    height={150}
                    width={150}
                    className="h-10 w-fit"
                    alt='Skilt ikon'
                />
                <EditableText 
                  id="home-section-signs-title"
                  defaultText="Skiltlaging"
                  className="font-semibold text-3xl mt-4"
                  tag="h4"
                  page="home"
                  component="HomeSection"
                />
                <EditableText 
                  id="home-section-signs-description"
                  defaultText="Spesialtilpassede skilt for ditt behov. Vi graverer på metall."
                  className="font-sans mt-4 text-xl"
                  tag="p"
                  page="home"
                  component="HomeSection"
                />
                <a
                    href="/skilt"
                    className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit mt-4"
                >
                    <EditableText 
                      id="home-section-signs-button"
                      defaultText="Skiltlaging"
                      className="text-white"
                      tag="span"
                      page="home"
                      component="HomeSection"
                    />
                </a>
            </div>
        </div>

      </div>
    </div>
  )
}

export default HomeSection
