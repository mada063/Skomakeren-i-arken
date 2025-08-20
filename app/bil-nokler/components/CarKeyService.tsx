"use client"

import React, { useState } from 'react'
import EditableText from '@/components/EditableText'

type CarKeyService = {
    name: string;
    price: string;
    description?: string;
};

const carKeyServices: CarKeyService[] = [
  { name: 'Ny bilnøkkel', price: 'Fra 800,- kr', description: 'Programmering av ny bilnøkkel' },
  { name: 'Kopiering av bilnøkkel', price: 'Fra 400,- kr', description: 'Kopiering av eksisterende nøkkel' },
  { name: 'Reparasjon av bilnøkkel', price: 'Fra 200,- kr', description: 'Reparasjon av skadet nøkkel' },
  { name: 'Batteriskifte', price: '50,- kr', description: 'Skifte av batteri i bilnøkkel' },
  { name: 'Fjernlåsing av bilnøkkel', price: 'Fra 300,- kr', description: 'Fjernlåsing av nøkkel' },
  { name: 'Programmering av fjernkontroll', price: 'Fra 250,- kr', description: 'Programmering av fjernkontroll til bil' },
  { name: 'Ny fjernkontroll', price: 'Fra 600,- kr', description: 'Ny fjernkontroll til bil' },
  { name: 'Reparasjon av fjernkontroll', price: 'Fra 150,- kr', description: 'Reparasjon av skadet fjernkontroll' },
  { name: 'Kopiering av fjernkontroll', price: 'Fra 350,- kr', description: 'Kopiering av eksisterende fjernkontroll' },
  { name: 'Diagnostikk av bilnøkkel', price: '100,- kr', description: 'Diagnostikk av nøkkelproblemer' },
];

const CarKeyService = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredServices = carKeyServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='max-w-7xl mx-auto px-4 flex flex-col items-center'>
        <EditableText 
          id="bilnokler-title"
          defaultText="Bilnøkkler"
          className="text-5xl md:text-7xl uppercase font-semibold mb-8"
          tag="h2"
          page="bil-nokler"
        />
        
        {/* Search Bar */}
        <div className="mb-4 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Søk her"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* New text line */}
        <div className="mb-8 text-center text-gray-600 max-w-2xl">
          Om du ikke finner bilen din i listen er det bare til å ta kontakt, så skal vi se om vi kan lage den!
        </div>

        <div className="w-full md:w-1/2">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b-2">
                <th className="py-2">Bil</th>
                <th className="py-2">Pris</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">
                    <div>
                      <div className="font-medium">{service.name}</div>
                      {service.description && (
                        <div className="text-sm text-gray-600">{service.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-2">{service.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Ingen tjenester funnet for "{searchTerm}"
            </div>
          )}
        </div>
    </div>
  )
}

export default CarKeyService 