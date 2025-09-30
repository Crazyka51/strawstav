"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/app/components/ui/card"

interface ProcessStep {
  icon: React.ReactNode
  title: string
  description: string
  color?: string
}

interface ProcessFlowProps {
  steps: ProcessStep[]
  title?: string
  description?: string
}

export default function ProcessFlow({ steps, title = "Jak probíhá spolupráce", description }: ProcessFlowProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animace nadpisu
    if (sectionRef.current) {
      const titleElement = sectionRef.current.querySelector(".section-title")
      const descElement = sectionRef.current.querySelector(".section-description")

      if (titleElement) {
        gsap.fromTo(
          titleElement,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }

      if (descElement) {
        gsap.fromTo(
          descElement,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    }

    // Animace spojovací čáry
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )
    }

    // Animace jednotlivých kroků - upravíme pro postupné zobrazování
    stepsRef.current.forEach((step, index) => {
      if (step) {
        // Animace ikony
        const icon = step.querySelector(".step-icon")
        if (icon) {
          gsap.fromTo(
            icon,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: 0.3 + index * 0.3, // Zvýšíme zpoždění mezi kroky
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
        }

        // Animace obsahu
        const content = step.querySelector(".step-content")
        if (content) {
          gsap.fromTo(
            content,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: 0.5 + index * 0.3, // Zvýšíme zpoždění mezi kroky
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
        }

        // Animace čísla kroku
        const number = step.querySelector(".step-number")
        if (number) {
          gsap.fromTo(
            number,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              delay: 0.7 + index * 0.3, // Zvýšíme zpoždění mezi kroky
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: step,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-bold mb-4 text-center">{title}</h2>
        {description && (
          <p className="section-description text-gray-600 text-center max-w-3xl mx-auto mb-16">{description}</p>
        )}

        <div className="relative">
          {/* Spojovací čára */}
          <div
            ref={lineRef}
            className="absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-strawstav-red via-red-600 to-strawstav-red hidden md:block"
            style={{ zIndex: 0 }}
          ></div>

          {/* Kroky procesu */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} ref={(el) => (stepsRef.current[index] = el)} className="flex flex-col items-center">
                <div className="relative mb-8">
                  <div
                    className={`step-icon w-20 h-20 rounded-full flex items-center justify-center ${
                      step.color || "bg-strawstav-red"
                    } text-white text-3xl shadow-lg`}
                  >
                    {step.icon}
                  </div>
                  <div className="step-number absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-strawstav-red text-strawstav-red flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                </div>

                <Card className="w-full step-content">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
