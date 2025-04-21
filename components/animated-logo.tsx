"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Image from "next/image"

interface AnimatedLogoProps {
  className?: string
  width?: number
  height?: number
  autoPlay?: boolean
  onHover?: boolean
  delay?: number
}

export default function AnimatedLogo({
  className,
  width = 300,
  height = 150,
  autoPlay = false,
  onHover = false,
  delay = 0,
}: AnimatedLogoProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const strechaRef = useRef<HTMLImageElement>(null)
  const podkroviRef = useRef<HTMLImageElement>(null)
  const obrysdomuRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLImageElement>(null)
  const caraRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Nastavení počátečních stavů - vždy začínáme s neviditelnými prvky
    gsap.set([strechaRef.current, podkroviRef.current, obrysdomuRef.current, textRef.current], {
      opacity: 0,
    })
    gsap.set(caraRef.current, {
      opacity: 0,
      scaleX: 0,
      transformOrigin: "left center",
    })

    // Vytvoření timeline pro animaci
    const tl = gsap.timeline({
      paused: !autoPlay,
      delay: delay,
    })

    // Animace jednotlivých částí podle specifikace
    tl.to(strechaRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.inOut",
    })
      .to(
        podkroviRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .to(
        obrysdomuRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.2",
      )
      .to(textRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out",
      })
      .to(caraRef.current, {
        opacity: 1,
        scaleX: 1,
        duration: 0.3,
        ease: "power1.inOut",
      })

    // Přidání hover efektu, pokud je požadován
    if (onHover && containerRef.current) {
      containerRef.current.addEventListener("mouseenter", () => {
        // Resetujeme stav prvků před spuštěním animace
        gsap.set([strechaRef.current, podkroviRef.current, obrysdomuRef.current, textRef.current], {
          opacity: 0,
        })
        gsap.set(caraRef.current, {
          opacity: 0,
          scaleX: 0,
        })

        // Spustíme animaci od začátku
        tl.restart()
      })
    }

    return () => {
      if (onHover && containerRef.current) {
        containerRef.current.removeEventListener("mouseenter", () => {
          tl.restart()
        })
      }
      tl.kill()
    }
  }, [autoPlay, onHover, delay])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width, height }}>
      {/* Červená střecha */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          ref={strechaRef}
          src="/strecha.png"
          alt="Červená střecha"
          width={width}
          height={height / 3}
          className="w-auto h-auto"
        />
      </div>

      {/* Černé podkroví */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          ref={podkroviRef}
          src="/podkrovi.png"
          alt="Černé podkroví"
          width={width}
          height={height / 3}
          className="w-auto h-auto"
        />
      </div>

      {/* Obrys domu */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          ref={obrysdomuRef}
          src="/obrysdomu.png"
          alt="Obrys domu"
          width={width}
          height={height / 2}
          className="w-auto h-auto"
        />
      </div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Image ref={textRef} src="/text.png" alt="Text loga" width={width} height={height} className="w-auto h-auto" />
      </div>

      {/* Čára */}
      <div className="absolute inset-0 flex items-center justify-center mt-10">
        <Image
          ref={caraRef}
          src="/cara.png"
          alt="Podtržení"
          width={width / 2}
          height={height / 15}
          className="w-auto h-auto"
        />
      </div>
    </div>
  )
}
