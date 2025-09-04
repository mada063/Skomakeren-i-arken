"use client";

import React from 'react'
import EditableText from '@/components/EditableText'

const WhoHome = () => {
  return (
    <div className='max-w-7xl mx-auto min-h-screen my-20 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center h-full'>
        <EditableText 
          id="who-title"
          defaultText="Hvem er vi"
          className="text-7xl uppercase font-semibold mt-12"
          tag="h2"
          page="home"
          component="WhoHome"
        />
        <EditableText 
          id="who-description"
          defaultText="Bedriften eies og driftes av Shukri Helshani"
          className="font-sans mt-4 mb-12 text-xl"
          tag="p"
          page="home"
          component="WhoHome"
        />
        <div className="relative w-full max-w-2xl">
          <img src="/images/skomaker4.jpg" alt="Who Home" className="rounded-lg w-full h-auto" />
          <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}

export default WhoHome
