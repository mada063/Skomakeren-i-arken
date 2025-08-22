"use client"

import React, { useState } from 'react'
import EditableText from '@/components/EditableText'

// Definerer bil
type Car = {
    id: string;
    brand: string;
    model: string;
    years: number[];
    keyTypes: string[];
};

const CarKeyService = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(false)

  // TODO: Implementere Firebase-henting
  // const fetchCars = async () => {
  //   // Henter biler fra Firebase 'cars' collection
  // }

  // TODO: Implementere søkefunksjonalitet
  // const filteredCars = cars.filter(car => 
  //   car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   car.keyTypes.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()))
  // )

  return (
    <div className='max-w-7xl mx-auto px-4 flex flex-col items-center'>
        <EditableText 
          id="bilnokler-title"
          defaultText="Bilnøkkler"
          className="text-5xl md:text-7xl uppercase font-semibold mb-8"
          tag="h2"
          page="bil-nokler"
        />
        
        {/* Søkefelt */}
        <div className="mb-4 w-full md:w-1/2">
          <input
            type="text"
            placeholder="Søk etter bilmerke, modell eller nøkkeltype"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Info-tekst */}
        <div className="mb-8 text-center text-gray-600 max-w-2xl">
          Om du ikke finner bilen din i listen er det bare til å ta kontakt, så skal vi se om vi kan lage den!
        </div>
    </div>
  )
}

export default CarKeyService 