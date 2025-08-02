import React from 'react'

type Service = {
    name: string;
    price: string;
};

const services: Service[] = [
  { name: 'Flikk (hælsåling)', price: '350,- kr' },
  { name: 'Såling (halvsåling)', price: '400,- kr' },
  { name: 'Såling + flikk', price: '650,- kr' },
  { name: 'Typpesåling (1/4 såling)', price: '350,- kr' },
  { name: 'Vibram flikk', price: '400,- kr' },
  { name: 'Vibram såling', price: '470,- kr' },
  { name: 'Vibram såling + flikk', price: '770,- kr' },
  { name: 'Helsåling', price: '650,- kr' },
  { name: 'Flikk med lær', price: '400,- kr' },
  { name: 'Såling med lær', price: '470,- kr' },
  { name: 'Flikk + såling med lær', price: '700,- kr' },
  { name: 'Grimme rep (sålekant)', price: '300,- kr' },
  { name: 'Hælfesting', price: '250,- kr' },
  { name: 'Ny gelenk plate', price: '300,- kr' },
  { name: 'Liming av løse såler', price: 'Må se skoen' },
  { name: 'Mokkasinsøm', price: '250,- kr' },
  { name: 'Hælkappe', price: '300,- kr' },
  { name: 'Blokking av sko', price: '200,- kr' },
  { name: 'Glidelås skinn jakke', price: '700,- kr' },
  { name: 'Glidelås støvleter', price: '450,- kr' },
  { name: 'Reparasjon av glidelås', price: '200,- kr' },
  { name: 'Sy merker på vest/jakke', price: '450,- kr' },
  { name: 'Ny bukse knapp', price: '100,- kr' },
  { name: 'Lapping av skinn', price: '200,- kr' },
];

const ShoeService = () => {
  return (
    <div className='max-w-7xl mx-auto'>
        <h2 className="text-5xl md:text-7xl uppercase font-semibold">Våre tjenester</h2>
        <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b-2">
            <th className="py-2">Tjeneste</th>
            <th className="py-2">Pris</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-2">{service.name}</td>
              <td className="py-2">{service.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShoeService
