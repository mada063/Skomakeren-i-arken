import React from 'react'

const Openings = () => {
  const days = [
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
    'Søndag',
  ];

  const times = [
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
    '10:00–21:00',
  ];

  return (
    <div className='max-w-5xl mx-auto min-h-screen py-8'>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className="w-full md:w-1/2">
          <img src="/images/kart.png" alt="Info Section" className="w-full h-auto object-contain" />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className='text-7xl uppercase font-semibold'>Åpningstider</h2>
          <ul className='mt-4 font-semibold text-xl space-y-4 w-1/2'>
            {days.map((day, idx) => (
              <li key={day} className='flex justify-between border-b border-black'>
                <span>{day}</span>
                <span>{times[idx]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Openings
