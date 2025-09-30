"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

const projects = [
  {
    id: 1,
    title: "Rekonstrukce fasády - Rezidenční dům",
    description: "Kompletní obnova fasády bytového domu včetně zateplení",
    image: "/fasada_po.jpg",
  },
  {
    id: 2,
    title: "Odvětrání suterénů - Bytový komplex",
    description: "Instalace odvětrávacího systému proti vlhkosti",
    image: "/odvetravani_1.jpg",
  },
  {
    id: 3,
    title: "Zemní práce - Výstavba",
    description: "Příprava staveniště a zemní práce pro novou výstavbu",
    image: "/bagr.jpg",
  },
  {
    id: 4,
    title: "Rekonstrukce podkroví",
    description: "Kompletní přestavba podkroví na obytný prostor",
    image: "/podkrovi.png",
  },
  {
    id: 5,
    title: "Střešní práce",
    description: "Výměna střešní krytiny a oprava konstrukce",
    image: "/strecha.png",
  },
  {
    id: 6,
    title: "Stavební práce na výšce",
    description: "Specializované práce pomocí plošin a lezeckých technik",
    image: "/plosina.jpg",
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
                src={project.image || "/construction-team.jpg"}
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
