"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero-section");
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setIsScrolled(heroBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lukker menyen når pathname endres
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Bestemmer om vi skal vise svart logo/meny på homepage
  const isHomePage = pathname === "/";
  const shouldShowBlack = !isHomePage || isScrolled;

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="relative w-24 h-24">
          {/* Show white logo on homepage hero, otherwise follow dark mode */}
          {!shouldShowBlack ? (
            <Image
              src="/images/logo_hvit.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          ) : (
            <>
              {/* Light mode: black logo */}
              <Image
                src="/images/logo_svart.png"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
                className="dark:hidden"
              />
              {/* Dark mode: white logo */}
              <Image
                src="/images/logo_hvit.png"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
                className="hidden dark:block"
              />
            </>
          )}
        </Link>

        <div className="relative">
          <button
            className={`p-2 transition-colors rounded-lg ${
              shouldShowBlack
                ? "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-100 dark:active:bg-gray-800"
                : "text-white hover:bg-black/90 active:bg-black/90"
            } ${
              isMenuOpen
                ? shouldShowBlack
                  ? "bg-gray-100 dark:bg-gray-800 rounded-bl-none rounded-br-none"
                  : "bg-black/90 rounded-bl-none rounded-br-none"
                : ""
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>

          {/* Menu Dropdown */}
          {isMenuOpen && (
            <div
              className={`absolute right-0 w-64 rounded-lg rounded-tr-none transition-colors shadow-lg py-2 ${
                shouldShowBlack
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  : "bg-black/90 text-white"
              }`}
            >
              <div className="px-4 py-2">
                <h4 className="font-semibold text-lg mb-3">Meny</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/kontakt" className="block hover:opacity-70">
                      Kontakt oss
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/apningstider"
                      className="block hover:opacity-70"
                    >
                      Åpningstider
                    </Link>
                  </li>
                  <li>
                    <Link href="/sko" className="block hover:opacity-70">
                      Sko
                    </Link>
                  </li>
                  <li>
                    <Link href="/skilt" className="block hover:opacity-70">
                      Skilt
                    </Link>
                  </li>
                  <li>
                    <Link href="/nokler" className="block hover:opacity-70">
                      Nøkkler
                    </Link>
                  </li>
                  <li>
                    <Link href="/bil-nokler" className="block hover:opacity-70">
                      Bilnøkkler
                    </Link>
                  </li>
                </ul>
              </div>
              <div
                className={`px-4 py-2 border-t ${
                  shouldShowBlack
                    ? "border-gray-200 dark:border-gray-700"
                    : "border-gray-200"
                }`}
              >
                <h4 className="font-semibold text-lg mb-3">Nyttige</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/eksempler" className="block hover:opacity-70">
                      Eksempler
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="block hover:opacity-70">
                      Logg inn
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
