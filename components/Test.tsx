import React from 'react'
import Image from 'next/image'

const Test = () => {
  return (
    <div className='px-40 bg-white text-black'>
      <div className='flex flex-col gap-16'>
        {/* Øverste del */}
        <div className='grid grid-cols-2 gap-16'>
            <div>
                <p className='text-base'>Skoreperasjon</p>
                <h2 className='text-6xl font-bold uppercase'>Ekspert Skoreperasjon</h2>
            </div>
            <Image src="/images/test.png" alt="test" width={100} height={100} />
        </div>
        {/* Nederste del */} 
        <div className='flex flex-col justify-start'>
            
                <h4>Tittel</h4>
                <p>Vi seter stor pris på a t du kønsker å komme i kontakt. Bla bla bla. gpoimdgpodmsfpg . imdgpfiosgpsdfjogpsdifjogpsdfogmpsdfogdspfogm</p>
                <button>Les mer</button>
            
        </div>
      </div>
    </div>
  )
}

export default Test
