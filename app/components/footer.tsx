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
    <footer className="bg-strawstav-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Logo width={150} height={60} className="brightness-200" />
            </Link>
            <p className="text-gray-400 mb-4">
              Profesionální stavební činnost, úklid bytových domů, správa nemovitostí, údržba zeleně a zemní práce.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Služby</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#stavebni-cinnost"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Stavební činnost
                </Link>
              </li>
              <li>
                <Link href="#uklid" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Úklid bytových domů
                </Link>
              </li>
              <li>
                <Link href="#sprava" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Správa nemovitostí
                </Link>
              </li>
              <li>
                <Link href="#udrzba" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Údržba zeleně
                </Link>
              </li>
              <li>
                <Link href="#zemni-prace" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Zemní práce
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Rychlé odkazy</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="#galerie" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="#reference" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Reference
                </Link>
              </li>
              <li>
                <Link href="#kontakt" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Kontakt</h3>
            <address className="not-italic text-gray-400">
              <p className="mb-2">STRAWSTAV S.R.O.</p>
              <p className="mb-2">Prvního pluku 320/17</p>
              <p className="mb-2">Karlín, 186 00 Praha</p>
              <p className="mb-2">Tel: +420 602 766 755</p>
              <p>Email: info@strawstav.cz</p>
            </address>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} STRAWSTAV S.R.O. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  )
}
