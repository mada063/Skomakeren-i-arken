"use client";

import React from 'react'
import EditableText from '@/components/EditableText'

const HomeBreak = () => {
  return (
    <div className='bg-custom-brown text-white'>
      <div className='flex flex-col max-w-7xl mx-auto py-20'>
        <EditableText 
          id="home-break-title"
          defaultText="Reparer i dag!"
          className="max-w-7xl text-7xl uppercase font-semibold"
          tag="h2"
          page="home"
          component="HomeBreak"
        />
        <div className="w-full h-[0.1rem] bg-white mt-4 mb-4"></div>
        <EditableText 
          id="home-break-description"
          defaultText="Kom innom oss eller kontakt oss for en gratis befaring. Noen av våre tjenester kan ta mer enn 1 dag, men de fleste kan gjøres menst du venter."
          className="font-sans text-xl mt-4 max-w-xl"
          tag="p"
          page="home"
          component="HomeBreak"
        />
      </div>
    </div>
  )
}

export default HomeBreak
