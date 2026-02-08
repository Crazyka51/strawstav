"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Hourglass } from "lucide-react"

export default function Preloader() {
  const [isMounted, setIsMounted] = useState(false)
  const preloaderRef = useRef<HTMLDivElement>(null)
  const loaderIconRef = useRef<HTMLDivElement>(null)
  const logoContainerRef = useRef<HTMLDivElement>(null)
  const strechaRef = useRef<HTMLImageElement>(null)
  const podkroviRef = useRef<HTMLImageElement>(null)
  const obrysdomuRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLImageElement>(null)
  const caraRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    // Zajistíme, že logo container je na začátku skrytý
    gsap.set(logoContainerRef.current, { opacity: 0 })

    // Nastavíme animaci přesýpacích hodin
    gsap.to(loaderIconRef.current, {
      rotation: 360,
      duration: 1.5,
      repeat: 1,
      ease: "power1.inOut",
      onComplete: startLogoAnimation,
    })

    function startLogoAnimation() {
      // Skryjeme ikonu přesýpacích hodin a zobrazíme container loga
      gsap.to(loaderIconRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          if (loaderIconRef.current) {
            loaderIconRef.current.style.display = "none"
          }
          gsap.to(logoContainerRef.current, {
            opacity: 1,
            duration: 0.3,
          })
        },
      })

      const tl = gsap.timeline({
        onComplete: () => {
          // Hide preloader after animation completes and a small delay
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 0.5,
            delay: 0.5,
            onComplete: () => {
              if (preloaderRef.current) {
                preloaderRef.current.style.display = "none"

                // Vyšleme vlastní událost, že preloader byl dokončen
                // DŮLEŽITÉ: Vyšleme událost až po úplném skrytí preloaderu
                setTimeout(() => {
                  document.dispatchEvent(new CustomEvent("preloaderComplete"))
                }, 100)
              }
            },
          })
        },
      })

      // Set initial states
      gsap.set([strechaRef.current, podkroviRef.current, obrysdomuRef.current, textRef.current], {
        opacity: 0,
      })
      gsap.set(caraRef.current, {
        opacity: 0,
        scaleX: 0,
        transformOrigin: "left center",
      })

      // 1. Animate červená střecha (0.6s)
      tl.to(strechaRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
      })

      // 2. Animate černé podkroví (0.6s)
      tl.to(
        podkroviRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3",
      )

      // 3. Animate obrys domu (0.8s)
      tl.to(
        obrysdomuRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.3",
      )

      // 4. Animate text (0.5s)
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      })

      // 5. Animate čára (0.3s)
      tl.to(caraRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        ease: "power1.inOut",
      })
    }

    return () => {
      // GSAP handles null/undefined values gracefully, so we can pass the refs directly
      if (loaderIconRef.current) gsap.killTweensOf(loaderIconRef.current)
      if (logoContainerRef.current) gsap.killTweensOf(logoContainerRef.current)
      if (strechaRef.current) gsap.killTweensOf(strechaRef.current)
      if (podkroviRef.current) gsap.killTweensOf(podkroviRef.current)
      if (obrysdomuRef.current) gsap.killTweensOf(obrysdomuRef.current)
      if (textRef.current) gsap.killTweensOf(textRef.current)
      if (caraRef.current) gsap.killTweensOf(caraRef.current)
    }
  }, [isMounted])

  // Render nothing on server to prevent hydration issues
  if (!isMounted) {
    return null
  }

  return (
    <div ref={preloaderRef} className="preloader">
      {/* Ikona přesýpacích hodin */}
      <div ref={loaderIconRef} className="absolute flex items-center justify-center">
        <Hourglass size={64} className="text-strawstav-red animate-pulse" />
      </div>

      {/* Logo container - na začátku skrytý */}
      <div ref={logoContainerRef} className="preloader-content">
        <div className="relative w-full h-full">
          {/* Červená střecha */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translate(${-24}px, ${-61}px) scale(${1})` }}
          >
            <Image
              ref={strechaRef}
              src="/strecha.png"
              alt="Červená střecha"
              width={300}
              height={100}
              className="w-auto h-auto"
            />
          </div>

          {/* Černé podkroví */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translate(${-1}px, ${-39}px) scale(${1})` }}
          >
            <Image
              ref={podkroviRef}
              src="/podkrovi.png"
              alt="Černé podkroví"
              width={300}
              height={100}
              className="w-auto h-auto"
            />
          </div>

          {/* Obrys domu */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translate(${2}px, ${-25}px) scale(${0.95})` }}
          >
            <Image
              ref={obrysdomuRef}
              src="/obrysdomu.png"
              alt="Obrys domu"
              width={300}
              height={100}
              className="w-auto h-auto"
            />
          </div>

          {/* Text */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translate(${0}px, ${2}px) scale(${1})` }}
          >
            <Image ref={textRef} src="/text.png" alt="Text" width={300} height={150} className="w-auto h-auto" />
          </div>

          {/* Čára */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translate(${-100}px, ${75}px) scale(${1})` }}
          >
            <Image ref={caraRef} src="/cara.png" alt="Čára" width={150} height={10} className="w-auto h-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
