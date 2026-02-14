"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import Logo from "./logo"
import { Menu, X, Settings } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    // Animate nav items
    const navItems = document.querySelectorAll(".nav-item")
    gsap.fromTo(navItems, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 4 })

    // Logo animation
    gsap.fromTo(".header-logo", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, delay: 3.8 })

    // Handle scroll event with better logo behavior
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      if (scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        isScrolled 
          ? "bg-white/98 backdrop-blur-xl shadow-elegant py-2 border-b border-gray-100" 
          : "bg-white/95 backdrop-blur-xl py-3 border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center min-h-[70px] max-h-[70px] overflow-hidden">
        <Link href="/" className="header-logo flex items-center justify-center hover:scale-105 transition-transform duration-300">
          <Logo 
            width={isScrolled ? 120 : 140} 
            height={isScrolled ? 48 : 56}
            className={`transition-all duration-300`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-2">
          <Link href="#sluzby" className="nav-item nav-link px-4 py-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-300">
            Služby
          </Link>
          <Link href="#galerie" className="nav-item nav-link px-4 py-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-300">
            Galerie
          </Link>
          <Link href="#reference" className="nav-item nav-link px-4 py-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-300">
            Reference
          </Link>
          <Link href="#kontakt" className="nav-item nav-link px-4 py-2 rounded-lg hover:bg-gray-100/50 transition-colors duration-300">
            Kontakt
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black focus:outline-none p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Zavřít menu" : "Otevřít menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="pt-20 pb-6">
          <Link href="#sluzby" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Služby
          </Link>
          <Link href="#galerie" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Galerie
          </Link>
          <Link href="#reference" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Reference
          </Link>
          <Link href="#kontakt" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Kontakt
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />}
    </header>
  )
}
