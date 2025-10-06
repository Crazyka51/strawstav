"use client"

import { useState } from "react"
import { useSafeEffect } from "@/hooks/use-safe-effect"
import { ChevronUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Funkce pro kontrolu pozice scrollu a zobrazení/skrytí tlačítka
  const toggleVisibility = () => {
    if (typeof window === 'undefined') return;
    
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Funkce pro scrollování nahoru
  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useSafeEffect(() => {
    // Jsme si jisti, že jsme na klientské straně díky useSafeEffect
    // Přidání event listeneru pro scroll
    window.addEventListener("scroll", toggleVisibility)
    
    // Inicializace stavu tlačítka při načtení
    toggleVisibility()
    
    // Odstranění event listeneru při unmount komponenty
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <button 
      className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Zpět nahoru"
    >
      <ChevronUp size={24} />
    </button>
  )
}