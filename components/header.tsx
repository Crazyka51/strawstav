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

    // Handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 50) {
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="header-logo">
          <Logo width={150} height={60} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="#sluzby" className="nav-item nav-link">
            Služby
          </Link>
          <Link href="#galerie" className="nav-item nav-link">
            Galerie
          </Link>
          <Link href="#reference" className="nav-item nav-link">
            Reference
          </Link>
          <Link href="#kontakt" className="nav-item nav-link">
            Kontakt
          </Link>
          <Link href="/logo-editor" className="nav-item nav-link flex items-center">
            <Settings size={16} className="mr-1" />
            Editor loga
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black focus:outline-none"
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
          <Link href="/logo-editor" className="mobile-nav-link flex items-center" onClick={() => setIsMenuOpen(false)}>
            <Settings size={16} className="mr-1" />
            Editor loga
          </Link>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)} />}
    </header>
  )
}
