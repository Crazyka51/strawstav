"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Link from "next/link"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Funkce pro spuštění animací
    const startAnimations = () => {
      // Animate heading with letter-by-letter effect
      const heading = headingRef.current
      if (heading) {
        const text = heading.innerText
        heading.innerHTML = ""

        // Create spans for each letter
        text.split("").forEach((char, index) => {
          const span = document.createElement("span")
          span.textContent = char
          span.style.display = "inline-block"
          span.style.opacity = "0"
          span.style.transform = "translateY(20px)"
          
          // Přidej větší mezeru za písmenem "V"
          if (char === "V") {
            span.style.marginRight = "0.3em"
          }
          
          heading.appendChild(span)
        })

        // Animate each letter
        gsap.to(heading.children, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.05,
          ease: "power2.out",
          onComplete: () => {
            // Add a subtle glow to the last letter
            const lastLetter = heading.children[heading.children.length - 1]
            gsap.to(lastLetter, {
              textShadow: "0 0 8px rgba(196, 18, 48, 0.8)",
              duration: 0.5,
              repeat: 1,
              yoyo: true,
            })
          },
        })
      }

      // Animate subheading
      gsap.fromTo(
        subheadingRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.8, ease: "power2.out" },
      )

      // Animate button
      gsap.fromTo(
        buttonRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1, ease: "power2.out" },
      )

      // Parallax effect for background shapes
      const shapes = document.querySelectorAll(".hero-shape")
      shapes.forEach((shape, index) => {
        gsap.fromTo(
          shape,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 0.1 + index * 0.05,
            duration: 1,
            delay: 0.5 + index * 0.2,
            ease: "power2.out",
          },
        )

        // Parallax on scroll
        gsap.to(shape, {
          y: -50 - index * 20,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    }

    // Nasloucháme události z preloaderu
    const handlePreloaderComplete = () => {
      setIsVisible(true)
      startAnimations()
    }

    // Přidáme posluchač události
    document.addEventListener("preloaderComplete", handlePreloaderComplete)

    // Záložní řešení - pokud by událost nebyla vyslána, spustíme animace po 4 sekundách
    const fallbackTimer = setTimeout(() => {
      startAnimations()
    }, 4000)

    return () => {
      document.removeEventListener("preloaderComplete", handlePreloaderComplete)
      clearTimeout(fallbackTimer)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center pt-20 overflow-hidden transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ background: "linear-gradient(to bottom, #ffffff, #f5f5f5)" }}
    >
      {/* Background shapes inspired by logo */}
      <div className="hero-shape absolute top-[20%] left-[10%] w-32 h-32 bg-strawstav-red opacity-5 rounded-tr-3xl rotate-12"></div>
      <div className="hero-shape absolute bottom-[30%] right-[15%] w-48 h-24 bg-strawstav-black opacity-5 rounded-bl-3xl -rotate-12"></div>
      <div className="hero-shape absolute top-[40%] right-[25%] w-24 h-24 bg-strawstav-red opacity-5 rotate-45"></div>
      <div className="hero-shape absolute bottom-[20%] left-[20%] w-36 h-20 bg-strawstav-black opacity-5 -rotate-15"></div>

      <div className="container mx-auto px-4 text-center z-10">
        <h1 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-strawstav-black">
          STRAWSTAV
          <br />
          S.R.O.
        </h1>
        <p ref={subheadingRef} className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Profesionální stavební činnost, úklid bytových domů, správa nemovitostí, údržba zeleně a zemní práce.
        </p>
        <Link
          href="#sluzby"
          ref={buttonRef}
          className="inline-block bg-strawstav-red text-white font-medium py-3 px-8 rounded-md hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
        >
          Naše služby
        </Link>
      </div>
    </section>
  )
}
