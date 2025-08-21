"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsScrolled(heroBottom < 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Determine if we should show black logo/menu
  const isHomePage = pathname === '/'
  const shouldShowBlack = !isHomePage || isScrolled

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="relative w-24 h-24">
          <Image
            src={shouldShowBlack ? "/images/logo_svart.png" : "/images/logo_hvit.png"}
            alt="Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>
        
        <div className="relative">
          <button 
            className={`p-2 transition-colors ${
              shouldShowBlack 
                ? 'text-black hover:bg-white active:bg-white ' 
                : 'text-white hover:bg-black/90 active:bg-black/90'
            } ${isMenuOpen ? (shouldShowBlack ? 'bg-white rounded-lg rounded-bl-none rounded-br-none' : 'bg-black/90 rounded-lg rounded-bl-none rounded-br-none') : 'rounded-lg'}`}
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
            <div className={`absolute right-0 w-64 rounded-lg rounded-tr-none transition-colors shadow-lg py-2 ${shouldShowBlack ? 'bg-white text-black' : 'bg-black/90 text-white'}`}>
              <div className="px-4 py-2">
                <h4 className="font-semibold text-lg mb-3">Meny</h4>
                <ul className="space-y-2">
                  <li><Link href="/kontakt" className="block hover:opacity-70">Kontakt oss</Link></li>
                  <li><Link href="/apningstider" className="block hover:opacity-70">Åpningstider</Link></li>
                  <li><Link href="/sko" className="block hover:opacity-70">Sko</Link></li>
                  <li><Link href="/skilt" className="block hover:opacity-70">Skilt</Link></li>
                  <li><Link href="/nokler" className="block hover:opacity-70">Nøkkler</Link></li>
                  <li><Link href="/bil-nokler" className="block hover:opacity-70">Bilnøkkler</Link></li>
                </ul>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <h4 className="font-semibold text-lg mb-3">Nyttige</h4>
                <ul className="space-y-2">
                  <li><Link href="/eksempler" className="block hover:opacity-70">Eksempler</Link></li>
                  <li><Link href="/login" className="block hover:opacity-70">Logg inn</Link></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
