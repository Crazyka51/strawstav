"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import Link from "next/link"
import Logo from "./logo"
import { Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  useEffect(() => {
    // Animate footer elements
    gsap.fromTo(".footer-content", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.2 })
  }, [])

  return (
    <footer className="bg-gradient-to-b from-strawstav-black to-black text-white py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-strawstav-red opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-strawstav-red opacity-5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand section */}
          <div className="space-y-4">
            <Link href="/" className="inline-block mb-4 hover:scale-105 transition-transform duration-300">
              <Logo width={150} height={60} className="brightness-200" />
            </Link>
            <p className="text-gray-300 leading-relaxed text-sm">
              Profesionální stavební činnost, úklid bytových domů, správa nemovitostí, údržba zeleně a zemní práce.
            </p>
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-strawstav-red hover:scale-110 transition-all duration-300 p-2 rounded-lg hover:bg-white/10">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-strawstav-red hover:scale-110 transition-all duration-300 p-2 rounded-lg hover:bg-white/10">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-strawstav-red hover:scale-110 transition-all duration-300 p-2 rounded-lg hover:bg-white/10">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2">
              Služby
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-strawstav-red to-strawstav-red-light rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#stavebni-cinnost"
                  className="text-gray-300 hover:text-strawstav-red transition-all duration-300 flex items-center hover:translate-x-1"
                >
                  <span className="w-1 h-1 bg-strawstav-red rounded-full mr-2"></span>
                  Stavební činnost
                </Link>
              </li>
              <li>
                <Link href="#uklid" className="text-gray-300 hover:text-strawstav-red transition-all duration-300 flex items-center hover:translate-x-1">
                  <span className="w-1 h-1 bg-strawstav-red rounded-full mr-2"></span>
                  Úklid bytových domů
                </Link>
              </li>
              <li>
                <Link href="#sprava" className="text-gray-300 hover:text-strawstav-red transition-all duration-300 flex items-center hover:translate-x-1">
                  <span className="w-1 h-1 bg-strawstav-red rounded-full mr-2"></span>
                  Správa nemovitostí
                </Link>
              </li>
              <li>
                <Link href="#udrzba" className="text-gray-300 hover:text-strawstav-red transition-all duration-300 flex items-center hover:translate-x-1">
                  <span className="w-1 h-1 bg-strawstav-red rounded-full mr-2"></span>
                  Údržba zeleně
                </Link>
              </li>
              <li>
                <Link href="#zemni-prace" className="text-gray-300 hover:text-strawstav-red transition-all duration-300 flex items-center hover:translate-x-1">
                  <span className="w-1 h-1 bg-strawstav-red rounded-full mr-2"></span>
                  Zemní práce
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2">
              Rychlé odkazy
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-strawstav-red to-strawstav-red-light rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-300 hover:text-strawstav-red transition-all duration-300 flex items-center hover:translate-x-1">
                  <span className="w-1 h-1 bg-strawstav-red rounded-full mr-2"></span>
                  O nás
                </Link>
              </li>
              <li>
                <Link href="#galerie" className="text-gray-300 hover:text-strawstav-red transition-all duration-300 flex items-center hover:translate-x-1">
                  <span className="w-1 h-1 bg-strawstav-red rounded-full mr-2"></span>
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="#reference" className="text-gray-300 hover:text-strawstav-red transition-all duration-300 flex items-center hover:translate-x-1">
                  <span className="w-1 h-1 bg-strawstav-red rounded-full mr-2"></span>
                  Reference
                </Link>
              </li>
              <li>
                <Link href="#kontakt" className="text-gray-300 hover:text-strawstav-red transition-all duration-300 flex items-center hover:translate-x-1">
                  <span className="w-1 h-1 bg-strawstav-red rounded-full mr-2"></span>
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2">
              Kontakt
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-strawstav-red to-strawstav-red-light rounded-full"></span>
            </h3>
            <address className="not-italic text-gray-300 text-sm space-y-2">
              <p className="font-semibold text-white">STRAWSTAV S.R.O.</p>
              <p>Prvního pluku 320/17</p>
              <p>Karlín, 186 00 Praha</p>
              <p className="text-strawstav-red hover:text-strawstav-red-light transition-colors duration-300 cursor-pointer">Tel: +420 602 766 755</p>
              <p className="text-strawstav-red hover:text-strawstav-red-light transition-colors duration-300 cursor-pointer">Email: info@strawstav.cz</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} STRAWSTAV S.R.O. &mdash; Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}
