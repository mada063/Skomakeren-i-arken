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
        heading: 'Du kan nå oss på nummeret vårt:',
        subheading: '+47 468 39 387',
    },
    {
        image: '/images/bil_ikon.png',
        heading: 'Du kan også sende oss en e-post:',
        subheading: 'shukri9@hotmail.com',
    },
];

const ContactLanding = () => {
  return (
    <div className='max-w-7xl mx-auto'>
      <div className='flex flex-col justify-center min-h-screen'>
        <p>Lokalt</p>
        <div className='flex flex-row gap-6 justify-between'>
            <h2 className='text-7xl uppercase font-semibold'>Kontakt oss</h2>
            <p className='font-sans w-1/2'>Vi setter stor pris på at du ønsker å komme i kontakt med oss! Enten du har spørsmål, tilbakemeldinger, ønsker å samarveide, eller trenger hjelp med en tjeneste eller et produkt, står vi klare til å hjelpe deg</p>
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
      </div>
    </div>
  )
}

export default ContactLanding
