"use client"

import { useRef, useState } from "react"
import { useSafeEffect } from "@/hooks/use-safe-effect"
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
  {
    id: 7,
    title: "Realizace nového projektu",
    description: "Ukázka našich nejnovějších stavebních prací",
    image: "/IMG-20251006-WA0001.jpg",
  },
  {
    id: 8,
    title: "Renovace interiéru",
    description: "Kompletní rekonstrukce vnitřních prostor",
    image: "/IMG-20251006-WA0002.jpg",
  },
  {
    id: 9,
    title: "Dokončovací práce",
    description: "Precizní zpracování detailů na stavbě",
    image: "/IMG-20251006-WA0003.jpg",
  },
  {
    id: 10,
    title: "Modernizace bytové jednotky",
    description: "Rozsáhlá rekonstrukce bytových prostor",
    image: "/IMG-20251006-WA0004.jpg",
  },
  {
    id: 11,
    title: "Exteriérové úpravy",
    description: "Revitalizace vnějších ploch a okolí budovy",
    image: "/IMG-20251006-WA0005.jpg",
  },
  {
    id: 12,
    title: "Výstavba nového objektu",
    description: "Realizace projektu od základů až po dokončení",
    image: "/IMG-20251006-WA0006.jpg",
  },
  {
    id: 13,
    title: "Sanační práce",
    description: "Odborné řešení problémů s vlhkostí a statickou odolností",
    image: "/IMG-20251006-WA0007.jpg",
  },
  {
    id: 14,
    title: "Rekonstrukce bytového jádra",
    description: "Kompletní přestavba koupelny a kuchyňského prostoru",
    image: "/IMG-20251006-WA0008.jpg",
  },
  {
    id: 15,
    title: "Venkovní úpravy",
    description: "Terénní a zahradní práce kolem objektu",
    image: "/IMG-20251006-WA0009.jpg",
  },
  {
    id: 16,
    title: "Zateplení objektu",
    description: "Izolační práce pro vyšší energetickou efektivitu budovy",
    image: "/IMG-20251006-WA0010.jpg",
  },
  {
    id: 17,
    title: "Pokládka dlažby",
    description: "Profesionální pokládka venkovní dlažby",
    image: "/IMG-20251006-WA0011.jpg",
  },
  {
    id: 18,
    title: "Hydroizolační práce",
    description: "Ochrana stavby proti pronikání vody",
    image: "/IMG-20251006-WA0012.jpg",
  },
  {
    id: 19,
    title: "Komerční prostory",
    description: "Rekonstrukce obchodních a kancelářských prostor",
    image: "/IMG-20251006-WA0013.jpg",
  },
  {
    id: 20,
    title: "Půdní vestavba",
    description: "Rozšíření obytného prostoru do podkroví",
    image: "/IMG-20251006-WA0014.jpg",
  },
  {
    id: 21,
    title: "Komplexní rekonstrukce",
    description: "Rozsáhlá modernizace celého objektu",
    image: "/IMG-20251006-WA0015.jpg",
  },
  {
    id: 22,
    title: "Interiérové práce",
    description: "Pečlivé dokončovací práce v interiéru",
    image: "/IMG-20251006-WA0016.jpg",
  },
  {
    id: 23,
    title: "Stavební detaily",
    description: "Precizní řešení složitých stavebních prvků",
    image: "/IMG-20251006-WA0017.jpg",
  },
  {
    id: 24,
    title: "Specializované stavební práce",
    description: "Odborné řešení náročných stavebních požadavků",
    image: "/IMG-20251006-WA0018.jpg",
  },
  {
    id: 25,
    title: "Revitalizace objektu",
    description: "Kompletní obnova starší budovy",
    image: "/IMG-20251006-WA0019.jpg",
  },
  {
    id: 26,
    title: "Finální úpravy",
    description: "Dokončovací práce na realizovaném projektu",
    image: "/IMG-20251006-WA0020.jpg",
  },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  
  const [visibleProjects, setVisibleProjects] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  
  const loadMoreProjects = () => {
    setIsLoading(true)
    
    // Simulujeme načítání pro lepší UX
    setTimeout(() => {
      setVisibleProjects(prev => Math.min(prev + 8, projects.length))
      setIsLoading(false)
    }, 600)
  }

  useSafeEffect(() => {
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
          <span className="section-title-border">
            Naše projekty
          </span>
        </h2>

        <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-12">
          {projects.slice(0, visibleProjects).map((project) => (
            <div key={project.id} className="gallery-item relative group">
              <Image
                src={project.image || "/construction-team.jpg"}
                alt={project.title}
                width={800}
                height={600}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                priority={project.id <= 8}
              />
              <div className="gallery-overlay rounded-lg">
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
        
        {visibleProjects < projects.length && (
          <div className="flex justify-center mt-10">
            <button
              onClick={loadMoreProjects}
              disabled={isLoading}
              className="px-6 py-3 bg-strawstav-red text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md flex items-center space-x-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  <span>Načítání...</span>
                </>
              ) : (
                <>
                  <span>Zobrazit další projekty</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
