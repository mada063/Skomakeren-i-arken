"use client";

import React from 'react'
import EditableText from '@/components/EditableText'

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
    <div className='max-w-5xl mx-auto min-h-screen flex items-center justify-center'>
      <div className='flex flex-col md:flex-row gap-6 justify-center'>
        <div className="w-full md:w-1/2">
          <img src="/images/kart.png" alt="Info Section" className="w-full h-auto object-contain" />
        </div>
        <div className="w-full md:w-1/2">
          <EditableText 
            id="openings-title"
            defaultText="Åpningstider"
            className="text-7xl uppercase font-semibold"
            tag="h2"
            page="apningstider"
            component="Openings"
          />
          <div className="w-1/2">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b-2 text-xl">
                  <th className="py-2">Dag</th>
                  <th className="py-2">Tid</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day, idx) => (
                  <tr key={day} className="border-b text-xl">
                    <td className="py-2">
                      <EditableText 
                        id={`openings-day-${idx + 1}`}
                        defaultText={day}
                        className="font-semibold"
                        tag="span"
                        page="apningstider"
                        component="Openings"
                      />
                    </td>
                    <td className="py-2">
                      <EditableText 
                        id={`openings-time-${idx + 1}`}
                        defaultText={times[idx]}
                        className="font-semibold"
                        tag="span"
                        page="apningstider"
                        component="Openings"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Openings
