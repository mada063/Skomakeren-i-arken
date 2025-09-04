"use client";

import React from 'react'
import EditableText from '@/components/EditableText'

const ShoeService = () => {
  return (
    <div className='max-w-7xl mx-auto flex flex-col items-center mb-20'>
        <EditableText 
          id="shoe-service-title"
          defaultText="Våre tjenester"
          className="text-5xl md:text-7xl uppercase font-semibold mb-12"
          tag="h2"
          page="sko"
          component="ShoeService"
        />
        <div className="w-1/2">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b-2 text-xl">
                <th className="py-2">Tjeneste</th>
                <th className="py-2">Pris</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-1-name"
                    defaultText="Flikk (hælsåling)"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-1-price"
                    defaultText="350,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-2-name"
                    defaultText="Såling (halvsåling)"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-2-price"
                    defaultText="400,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-3-name"
                    defaultText="Såling + flikk"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-3-price"
                    defaultText="650,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-4-name"
                    defaultText="Typpesåling (1/4 såling)"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-4-price"
                    defaultText="350,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-5-name"
                    defaultText="Vibram flikk"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-5-price"
                    defaultText="400,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-6-name"
                    defaultText="Vibram såling"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-6-price"
                    defaultText="470,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-7-name"
                    defaultText="Vibram såling + flikk"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-7-price"
                    defaultText="770,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-8-name"
                    defaultText="Helsåling"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-8-price"
                    defaultText="650,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-9-name"
                    defaultText="Flikk med lær"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-9-price"
                    defaultText="400,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-10-name"
                    defaultText="Såling med lær"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-10-price"
                    defaultText="470,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-11-name"
                    defaultText="Flikk + såling med lær"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-11-price"
                    defaultText="700,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-12-name"
                    defaultText="Grimme rep (sålekant)"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-12-price"
                    defaultText="300,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-13-name"
                    defaultText="Hælfesting"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-13-price"
                    defaultText="250,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-14-name"
                    defaultText="Ny gelenk plate"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-14-price"
                    defaultText="300,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-15-name"
                    defaultText="Liming av løse såler"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-15-price"
                    defaultText="Må se skoen"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-16-name"
                    defaultText="Mokkasinsøm"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-16-price"
                    defaultText="250,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-17-name"
                    defaultText="Hælkappe"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-17-price"
                    defaultText="300,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-18-name"
                    defaultText="Blokking av sko"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-18-price"
                    defaultText="200,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-19-name"
                    defaultText="Glidelås skinn jakke"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-19-price"
                    defaultText="700,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-20-name"
                    defaultText="Glidelås støvleter"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-20-price"
                    defaultText="450,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-21-name"
                    defaultText="Reparasjon av glidelås"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-21-price"
                    defaultText="200,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-22-name"
                    defaultText="Sy merker på vest/jakke"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-22-price"
                    defaultText="450,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-23-name"
                    defaultText="Ny bukse knapp"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-23-price"
                    defaultText="100,- kr"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
              </tr>
              <tr className="border-b text-xl">
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-24-name"
                    defaultText="Lapping av skinn"
                    className="text-xl"
                    tag="span"
                    page="sko"
                    component="ShoeService"
                  />
                </td>
                <td className="py-2">
                  <EditableText 
                    id="shoe-service-24-price"
                    defaultText="200,- kr"
                    className="text-xl"
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
  )
}

export default ShoeService
