"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Rodinný dům Brno",
    description: "Kompletní výstavba rodinného domu na klíč",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    title: "Rekonstrukce bytu Praha",
    description: "Celková rekonstrukce bytové jednotky",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "Komerční prostory Ostrava",
    description: "Přestavba komerčních prostor",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    title: "Bytový dům Plzeň",
    description: "Revitalizace bytového domu",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 5,
    title: "Zahradní úpravy Olomouc",
    description: "Kompletní úprava zahrady a okolí domu",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 6,
    title: "Průmyslová hala Liberec",
    description: "Výstavba průmyslové haly",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

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

    // Animate gallery items
    const items = galleryRef.current?.querySelectorAll(".gallery-item")
    if (items) {
      gsap.fromTo(
        items,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="galerie" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="section-title">
          Naše projekty
        </h2>

        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {projects.map((project) => (
            <div key={project.id} className="gallery-item">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="gallery-overlay">
                <div className="text-center p-4">
                  <h3 className="gallery-title">{project.title}</h3>
                  <p className="text-white mt-2 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
