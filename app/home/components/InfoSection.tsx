import React from 'react'

const InfoSection = () => {
  return (
    <div className='max-w-7xl mx-auto min-h-screen'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-6'>
        <img src="/images/InfoSection.png" alt="Info Section" className="w-full h-auto" />
        <div>
            <h2 className='text-7xl uppercase font-semibold'>Hvorfor oss?</h2>
            <p className='font-sans mt-4'>Eksempeltekst pioakpdsofakpsdfkoaspdo aspdfko aspdofk pasddkofpo ooasdpfasdof osdodaofoasodfo oooo  oosam,mvb bsåp,åpqdlksdv naldskmvåwqåpåf åpsfåasdckmavsdvpaom</p>
            <a
          href="https://www.skomakeren.no/"
          className="bg-custom-blue text-white px-6 py-3 rounded-lg transition-all duration-300 hover:bg-opacity-80 hover:scale-105 hover:shadow-lg inline-block"
        >
          Kontakt oss
        </a>
        </div>
      </div>
    </div>
  )
}

export default InfoSection
