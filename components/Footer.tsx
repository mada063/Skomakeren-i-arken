import React from "react";

export default function Footer() {
  return (
    <footer className="bg-custom-brown dark:bg-gray-700 text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {/* Logo & Contact Info */}
        <div className="flex flex-col text-left">
          <img
            src="/images/logo_hvit.png"
            alt="Logo"
            className="w-32 h-auto -ml-6 mb-4 dark:hidden"
          />
          <img
            src="/images/logo_hvit.png"
            alt="Logo"
            className="w-32 h-auto -ml-6 mb-4 hidden dark:block"
          />
          <h2 className="font-semibold text-lg text-white dark:text-gray-100">
            SKOMAKEREN I ARKEN v/Helshani
          </h2>
          <p className="text-white dark:text-gray-300">
            Org. nummer: 988 846 236
          </p>
          <p className="text-white dark:text-gray-300">
            Telefonnummer:{" "}
            <a
              href="tel:46839387"
              className="underline hover:text-gray-300 dark:hover:text-gray-400"
            >
              468 39 387
            </a>
          </p>
        </div>

        {/* Meny Section */}
        <div className="flex flex-col text-left">
          <h4 className="font-semibold text-lg mb-3 uppercase text-white dark:text-gray-100">
            Meny
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/kontakt"
                className="underline hover:text-gray-300 dark:hover:text-gray-400 text-white dark:text-gray-300"
              >
                Kontakt oss
              </a>
            </li>
            <li>
              <a
                href="/apningstider"
                className="underline hover:text-gray-300 dark:hover:text-gray-400 text-white dark:text-gray-300"
              >
                Åpningstider
              </a>
            </li>
            <li>
              <a
                href="/sko"
                className="underline hover:text-gray-300 dark:hover:text-gray-400 text-white dark:text-gray-300"
              >
                Sko
              </a>
            </li>
            <li>
              <a
                href="/skilt"
                className="underline hover:text-gray-300 dark:hover:text-gray-400 text-white dark:text-gray-300"
              >
                Skilt
              </a>
            </li>
            <li>
              <a
                href="/nokler"
                className="underline hover:text-gray-300 dark:hover:text-gray-400 text-white dark:text-gray-300"
              >
                Nøkkler
              </a>
            </li>
            <li>
              <a
                href="/bil-nokler"
                className="underline hover:text-gray-300 dark:hover:text-gray-400 text-white dark:text-gray-300"
              >
                Bilnøkkler
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Section */}
        <div className="flex flex-col text-left">
          <h4 className="font-semibold text-lg mb-3 uppercase text-white dark:text-gray-100">
            Nyttige
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/eksempler"
                className="underline hover:text-gray-300 dark:hover:text-gray-400 text-white dark:text-gray-300"
              >
                Eksempler
              </a>
            </li>
            <li>
              <a
                href="/login"
                className="underline hover:text-gray-300 dark:hover:text-gray-400 text-white dark:text-gray-300"
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
