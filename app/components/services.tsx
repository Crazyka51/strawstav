"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Hammer, Sparkles, Building2, Leaf, Truck } from "lucide-react"

const services = [
  {
    id: "stavebni-cinnost",
    title: "Stavební činnost",
    description:
      "Kompletní stavební práce od základů až po střechu. Specializujeme se na výstavbu rodinných domů, rekonstrukce bytů a komerčních prostor.",
    icon: Hammer,
    color: "text-strawstav-red",
    animation: "rotate",
  },
  {
    id: "uklid",
    title: "Úklid bytových domů",
    description:
      "Pravidelný i jednorázový úklid společných prostor bytových domů. Zajišťujeme čistotu a hygienu ve všech prostorách.",
    icon: Sparkles,
    color: "text-strawstav-red",
    animation: "sparkle",
  },
  {
    id: "sprava",
    title: "Správa nemovitostí",
    description:
      "Komplexní správa bytových domů a komerčních nemovitostí. Zajišťujeme technickou, ekonomickou i právní správu.",
    icon: Building2,
    color: "text-strawstav-red",
    animation: "door",
  },
  {
    id: "udrzba",
    title: "Údržba zeleně",
    description:
      "Profesionální péče o zeleň kolem bytových domů a komerčních objektů. Sekání trávy, stříhání keřů, výsadba rostlin.",
    icon: Leaf,
    color: "text-strawstav-red",
    animation: "wave",
  },
  {
    id: "zemni-prace",
    title: "Zemní práce",
    description:
      "Výkopové práce, terénní úpravy, příprava staveniště. Disponujeme vlastní technikou pro efektivní realizaci zemních prací.",
    icon: Truck,
    color: "text-strawstav-red",
    animation: "dig",
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate section title
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    // Animate service cards
    const cards = cardsRef.current?.querySelectorAll(".service-card")
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )
    }

    // Setup icon animations
    services.forEach((service) => {
      const icon = document.querySelector(`.icon-${service.id}`)

      if (icon) {
        // Create hover animations based on service type
        const card = icon.closest(".service-card")

        if (card) {
          card.addEventListener("mouseenter", () => {
            switch (service.animation) {
              case "rotate":
                gsap.to(icon, { rotation: 15, duration: 0.3, yoyo: true, repeat: 1 })
                break
              case "sparkle":
                gsap.to(icon, { scale: 1.2, brightness: 1.5, duration: 0.3, yoyo: true, repeat: 1 })
                break
              case "door":
                gsap.to(icon, { scaleX: 1.2, duration: 0.3, yoyo: true, repeat: 1 })
                break
              case "wave":
                gsap.to(icon, { rotation: 10, duration: 0.5, ease: "sine.inOut", yoyo: true, repeat: 1 })
                break
              case "dig":
                gsap.to(icon, { y: 5, duration: 0.2, yoyo: true, repeat: 3 })
                break
            }
          })
        }
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="sluzby" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="section-title">
          Naše služby
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className={`service-icon ${service.color} icon-${service.id}`}>
                <service.icon size={64} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-center">{service.title}</h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
