import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-custom-brown text-white py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        
        {/* Logo & Contact Info */}
        <div className="flex flex-col text-left">
          <img src="/images/logo_hvit.png" alt="Logo" className="w-32 h-auto -ml-6 mb-4" />
          <h2 className="font-semibold text-lg">SKOMAKEREN I ARKEN v/Helshani</h2>
          <p>Org. nummer: 988 846 236</p>
          <p>
            Telefonnummer:{' '}
            <a href="tel:46839387" className="underline hover:text-gray-300">
              468 39 387
            </a>
          </p>
        </div>

        {/* Meny Section */}
        <div className="flex flex-col text-left">
          <h4 className="font-semibold text-lg mb-3 uppercase">Meny</h4>
          <ul className="space-y-2 ">
            <li><a href="/kontakt" className="underline hover:text-gray-300">Kontakt oss</a></li>
            <li><a href="/apningstider" className="underline hover:text-gray-300">Åpningstider</a></li>
            <li><a href="/sko" className="underline hover:text-gray-300">Sko</a></li>
            <li><a href="/skilt" className="underline hover:text-gray-300">Skilt</a></li>
            <li><a href="/nokler" className="underline hover:text-gray-300">Nøkkler</a></li>
            <li><a href="/bilnokler" className="underline hover:text-gray-300">Bilnøkkler</a></li>
          </ul>
        </div>

        {/* Useful Section */}
        <div className="flex flex-col text-left">
          <h4 className="font-semibold text-lg mb-3 uppercase">Nyttige</h4>
          <ul className="space-y-2">
            <li><a href="/eksempler" className="underline hover:text-gray-300">Eksempler</a></li>
            <li><a href="/login" className="underline hover:text-gray-300">Logg inn</a></li>
          </ul>
        </div>

      </div>
    </footer>
  )
}

export default Footer
