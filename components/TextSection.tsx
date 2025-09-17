"use client";

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

type Segment = {
  slug: string; // brukes for å filtrere etter URL
  image: string;
  title: string;
  heading: string;
  subheading: string;
};

const segments: Segment[] = [
  {
    slug: '/sko',
    image: '/images/sko_ikon.png',
    title: 'Ekspert skoreparasjon',
    heading: 'Reparer skoene dine profesjonelt',
    subheading: 'Vi tilbyr førsteklasses skoreparasjon for alle typer sko. Bærekraftig, raskt og pålitelig.',
  },
  {
    slug: '/nokler',
    image: '/images/nokkel_ikon.png',
    title: 'Nøkkeltjenester',
    heading: 'Vi kopierer nøkler på stedet',
    subheading: 'Trenger du en ekstranøkkel? Vi kopierer raskt og presist med kvalitetsgaranti.',
  },
  {
    slug: '/bil-nokler',
    image: '/images/gravering_ikon.png',
    title: 'Personlig gravering',
    heading: 'Gjør gaven unik',
    subheading: 'Vi graverer på metall, tre og mer – perfekt til gaver og priser.',
  },
  {
    slug: '/skilt',
    image: '/images/skilt_ikon.png',
    title: 'Skilt og merking',
    heading: 'Profesjonelle skilt til alle formål',
    subheading: 'Bestill dørskilt, navneskilt og kontorskilt med rask levering og høy kvalitet.',
  },
];

const TextSection = () => {
  const pathname = usePathname();

  const filteredSegments = segments.filter(seg => pathname.includes(seg.slug));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center min-h-screen">
        {filteredSegments.length > 0 ? (
          filteredSegments.map((segment, index) => (
            <div key={index} className="mb-16">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center sm:justify-start text-center sm:text-left">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase font-semibold">{segment.title}</h2>
                <Image
                  src={segment.image}
                  height={50}
                  width={50}
                  className="h-10 sm:h-12 w-auto"
                  alt="Segment image"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="mt-4 text-center md:text-left">
                  <h4 className="font-semibold text-xl sm:text-2xl mt-2 sm:mt-4">{segment.heading}</h4>
                  <p className="font-sans mt-3 sm:mt-4 text-base sm:text-lg">{segment.subheading}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg sm:text-xl text-center mt-12">Ingen tjenester tilgjengelige for denne siden.</p>
        )}

        <div className="mt-8 flex justify-center md:justify-start">
          <a
            href="https://www.skomakeren.no/"
            className="bg-custom-blue text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit text-sm sm:text-base"
          >
            Lær mer
          </a>
        </div>
      </div>
    </div>
  );
};

export default TextSection;
