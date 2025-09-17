"use client";

import React from 'react'
import EditableText from '@/components/EditableText'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const ShoeService = () => {
  const { ref: titleRef, isIntersecting: titleVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const { ref: tableRef, isIntersecting: tableVisible } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <div className='max-w-7xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20'>
        <div 
          ref={titleRef}
          className={`transition-all duration-1000 ${
            titleVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
          <EditableText 
            id="shoe-service-title"
            defaultText="Våre tjenester"
            className="text-3xl sm:text-5xl md:text-6xl uppercase font-semibold mb-6 sm:mb-10 md:mb-12 text-center"
            tag="h2"
            page="sko"
            component="ShoeService"
          />
        </div>
        <div 
          ref={tableRef}
          className={`w-full md:w-3/4 lg:w-2/3 transition-all duration-1000 ${
            tableVisible ? 'animate-fade-in' : 'animate-hidden'
          }`}
        >
          <div className="overflow-x-auto rounded-lg shadow-sm">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="text-left border-b-2 text-base sm:text-lg md:text-xl">
                <th className="py-3 px-3 sm:px-4">Tjeneste</th>
                <th className="py-3 px-3 sm:px-4">Pris</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-1-name"
                    defaultText="Flikk (hælsåling)"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-1-price"
                    defaultText="350,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-2-name"
                    defaultText="Såling (halvsåling)"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-2-price"
                    defaultText="400,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-3-name"
                    defaultText="Såling + flikk"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-3-price"
                    defaultText="650,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-4-name"
                    defaultText="Typpesåling (1/4 såling)"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-4-price"
                    defaultText="350,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-5-name"
                    defaultText="Vibram flikk"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-5-price"
                    defaultText="400,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-6-name"
                    defaultText="Vibram såling"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-6-price"
                    defaultText="470,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-7-name"
                    defaultText="Vibram såling + flikk"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-7-price"
                    defaultText="770,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-8-name"
                    defaultText="Helsåling"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-8-price"
                    defaultText="650,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-9-name"
                    defaultText="Flikk med lær"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-9-price"
                    defaultText="400,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-10-name"
                    defaultText="Såling med lær"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-10-price"
                    defaultText="470,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-11-name"
                    defaultText="Flikk + såling med lær"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-11-price"
                    defaultText="700,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-12-name"
                    defaultText="Grimme rep (sålekant)"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-12-price"
                    defaultText="300,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-13-name"
                    defaultText="Hælfesting"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-13-price"
                    defaultText="250,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-14-name"
                    defaultText="Ny gelenk plate"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-14-price"
                    defaultText="300,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-15-name"
                    defaultText="Liming av løse såler"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-15-price"
                    defaultText="Må se skoen"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-16-name"
                    defaultText="Mokkasinsøm"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-16-price"
                    defaultText="250,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-17-name"
                    defaultText="Hælkappe"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-17-price"
                    defaultText="300,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-18-name"
                    defaultText="Blokking av sko"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-18-price"
                    defaultText="200,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-19-name"
                    defaultText="Glidelås skinn jakke"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-19-price"
                    defaultText="700,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-20-name"
                    defaultText="Glidelås støvleter"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-20-price"
                    defaultText="450,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-21-name"
                    defaultText="Reparasjon av glidelås"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-21-price"
                    defaultText="200,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-22-name"
                    defaultText="Sy merker på vest/jakke"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-22-price"
                    defaultText="450,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-23-name"
                    defaultText="Ny bukse knapp"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-23-price"
                    defaultText="100,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-base sm:text-lg md:text-xl last:border-b-0">
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-24-name"
                    defaultText="Lapping av skinn"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-3 px-3 sm:px-4">
                  <EditableText 
                    id="shoe-service-24-price"
                    defaultText="200,- kr"
                    className="text-base sm:text-lg md:text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                </tr>
            </tbody>
          </table>
          </div>
        </div>
    </div>
  )
}

export default ShoeService
