import React from 'react'
import Image from 'next/image';

type Segment = {
    image: string;
    heading: string;
    subheading:string;
};

const segment: Segment[] = [
    {
        image: '/images/sko_ikon.png',
        heading: 'Eskpert skoreparasjon',
        subheading: 'Få nytt liv i skoene dine med vår ekspertise.',
    },
    {
        image: '/images/bil_ikon.png',
        heading: 'Bilnøkler',
        subheading: 'Har du mistet nøklene dine? Vi kan hjelpe deg med å lage nye.',
    },
    {
        image: '/images/nokkel_ikon.png',
        heading: 'Nøkler',
        subheading: 'Vi tilbyr nøkkelkopiering og reparasjon for alle typer nøkler.',
    },
    {
        image: '/images/skilt_ikon.png',
        heading: 'Skiltlaging',
        subheading: 'Spesialtilpassede skilt for ditt behov.',
    }
];

const HomeSection = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-col justify-center min-h-screen'>
        <p>Kvalitet</p>
        <div className='flex flex-row gap-6 justify-between'>
            <h2 className='text-7xl uppercase font-semibold'>Din lokale reperatør</h2>
            <p className='font-sans w-1/2'>Hos oss er vår spesialitet sko, vi tilbyr også tjenester som nøkkelreperasjon og kopiering, slik at du aldri mister tilgang til tingene dine! Vi tilbyr også skiltlaging</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8'>
            {segment.map((segment  , index) => (
            <div key={index} className='mt-12'>
                <Image
                    src={segment.image}
                    height={50}
                    width={50}
                    className="h-12 w-auto"
                    alt='Segment image'
                />
                <h4 className='font-semibold text-2xl mt-4'>{segment.heading}</h4>
                <p className='font-sans mt-4'>{segment.subheading}</p>
            </div>
            ))}
        </div>
        <div className="mt-8 flex justify-center md:justify-start">
  <a
    href="https://www.skomakeren.no/"
    className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg w-fit"
  >
    Lær mer
  </a>
</div>

      </div>
    </div>
  )
}

export default HomeSection
