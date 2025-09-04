"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="relative w-24 h-24">
          {/* Show white logo on homepage hero, otherwise show black logo */}
          {!shouldShowBlack ? (
            <Image
              src="/images/logo_hvit.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          ) : (
            <Image
              src="/images/logo_svart.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          )}
        </Link>

        <div className="flex items-center gap-2">
          {/* Logout button - only show when user is logged in */}
          {user && (
            <button
              onClick={handleLogout}
              className={`p-2 transition-colors rounded-lg ${
                shouldShowBlack
                  ? "text-gray-900 hover:bg-red-200 active:bg-red-200"
                  : "text-white hover:bg-black/90 active:bg-black/90"
              }`}
              aria-label="Logg ut"
              title="Logg ut"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </button>
          )}

          {/* Menu button */}
          <div className="relative">
            <button
              className={`p-2 transition-colors rounded-lg ${
                shouldShowBlack
                  ? "text-gray-900 hover:bg-gray-200 active:bg-gray-200"
                  : "text-white hover:bg-black/90 active:bg-black/90"
              } ${
                isMenuOpen
                  ? shouldShowBlack
                    ? "bg-white rounded-bl-none rounded-br-none hover:bg-white"
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
                  ? "bg-white text-gray-900"
                  : "bg-black/90 text-white"
              }`}
            >
              <div className="px-4 py-2">
                <h4 className="font-semibold text-lg mb-3">Meny</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="block hover:opacity-70">
                      Hjem
                    </Link>
                  </li>
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
                    ? "border-gray-200"
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
                  {user ? (
                    <li>
                      <Link href="/editor" className="block hover:opacity-70">
                        Rediger innhold
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link href="/login" className="block hover:opacity-70">
                        Logg inn
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
