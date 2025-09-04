import React from "react";

export default function Footer() {
  return (
    <footer className="bg-custom-brown text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* Logo & Contact Info */}
        <div className="flex flex-col text-left">
          <img
            src="/images/logo_hvit.png"
            alt="Logo"
            className="w-32 h-auto -ml-6 mb-4"
          />
          <h2 className="font-semibold text-lg text-white">
            SKOMAKEREN I ARKEN v/Helshani
          </h2>
          <p className="text-white">
            Org. nummer: 988 846 236
          </p>
          <p className="text-white">
            Telefonnummer:{" "}
            <a
              href="tel:46839387"
              className="underline hover:text-gray-300"
            >
              468 39 387
            </a>
          </p>
        </div>

        {/* Meny Section */}
        <div className="flex flex-col text-left">
          <h4 className="font-semibold text-lg mb-3 uppercase text-white">
            Meny
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="underline hover:text-gray-300 text-white"
              >
                Hjem
              </a>
            </li>
            <li>
              <a
                href="/kontakt"
                className="underline hover:text-gray-300 text-white"
              >
                Kontakt oss
              </a>
            </li>
            <li>
              <a
                href="/apningstider"
                className="underline hover:text-gray-300 text-white"
              >
                Åpningstider
              </a>
            </li>
            <li>
              <a
                href="/sko"
                className="underline hover:text-gray-300 text-white"
              >
                Sko
              </a>
            </li>
            <li>
              <a
                href="/skilt"
                className="underline hover:text-gray-300 text-white"
              >
                Skilt
              </a>
            </li>
            <li>
              <a
                href="/nokler"
                className="underline hover:text-gray-300 text-white"
              >
                Nøkkler
              </a>
            </li>
            <li>
              <a
                href="/bil-nokler"
                className="underline hover:text-gray-300 text-white"
              >
                Bilnøkkler
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Section */}
        <div className="flex flex-col text-left">
          <h4 className="font-semibold text-lg mb-3 uppercase text-white">
            Nyttige
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/eksempler"
                className="underline hover:text-gray-300 text-white"
              >
                Eksempler
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="underline hover:text-gray-300 text-white"
              >
                Logg inn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
