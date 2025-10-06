
"use client"

import { useRef, useState } from "react"
import { useSafeEffect } from "@/hooks/use-safe-effect"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/components/ui/tabs"

interface Stat {
  value: number
  label: string
  icon: React.ReactNode
  prefix?: string
  suffix?: string
  description?: string
  color?: string
}

interface StatCategory {
  id: string
  name: string
  stats: Stat[]
  description?: string
}

interface AnimatedStatsProps {
  categories: StatCategory[]
}

export default function AnimatedStats({ categories }: AnimatedStatsProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statRefs = useRef<(HTMLDivElement | null)[][]>([])
  const [hasAnimated, setHasAnimated] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState(categories[0].id)

  useSafeEffect(() => {
    try {
      gsap.registerPlugin(ScrollTrigger)

      // Vytvoření GSAP kontextu pro lepší správu paměti
      const ctx = gsap.context(() => {
        // Inicializace pole referencí pro každou kategorii
        categories.forEach((category, i) => {
          statRefs.current[i] = []
        })

        const animateStats = (categoryId: string) => {
          if (hasAnimated[categoryId]) return

          const categoryIndex = categories.findIndex((cat) => cat.id === categoryId)
          if (categoryIndex === -1) return

          const stats = statRefs.current[categoryIndex]
          if (!stats) return

          stats.forEach((stat, index) => {
            if (stat) {
              // Animace karty s pohybem nahoru a postupným objevováním
              gsap.fromTo(
                stat,
                { y: 50, opacity: 0, scale: 0.9 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "back.out(1.2)",
                },
              )

              // Animace kruhu
              const circleElement = stat.querySelector(".stat-circle-indicator")
              if (circleElement) {
                // Animace kruhu od plného (282.6) k hodnotě odpovídající procentu z maximální hodnoty v dané kategorii
                // Pro jednoduchost nastavíme vždy stejnou animaci
                gsap.fromTo(
                  circleElement, 
                  { strokeDashoffset: 282.6 }, 
                  {
                    strokeDashoffset: 0, // Plný kruh
                    duration: 1.5,
                    delay: index * 0.15 + 0.3,
                    ease: "power2.inOut"
                  }
                )
              }

              // Animace čísla
              const valueElement = stat.querySelector(".stat-value")
              if (valueElement) {
                const targetValue = Number.parseInt(valueElement.getAttribute("data-value") || "0")
                const prefix = valueElement.getAttribute("data-prefix") || ""
                const suffix = valueElement.getAttribute("data-suffix") || ""

                // Nastavíme počáteční hodnotu na 0
                valueElement.textContent = `${prefix}0${suffix}`

                // Vylepšená animace hodnoty s jemnějším průběhem
                gsap.to(valueElement, {
                  innerText: targetValue,
                  duration: 2,
                  delay: index * 0.15 + 0.5,
                  ease: "power1.inOut",
                  snap: { innerText: 1 },
                  onUpdate: function () {
                    const currentValue = Math.floor(Number(this.targets()[0].innerText))
                    valueElement.textContent = `${prefix}${currentValue}${suffix}`
                  },
                })
              }
            }
          })

          setHasAnimated((prev) => ({ ...prev, [categoryId]: true }))
        }

        // Nastavení ScrollTriggeru pro každou kategorii
        categories.forEach((category) => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top 70%",
            onEnter: () => {
              if (category.id === activeCategory) {
                animateStats(category.id)
              }
            },
          })
        })

        // Animace při změně kategorie
        if (activeCategory) {
          animateStats(activeCategory)
        }
      }, sectionRef) // Použití GSAP kontextu pro sectionRef scope

      // Funkce pro úklid
      return () => {
        // Vyčistíme GSAP kontext a všechny ScrollTriggery
        ctx.revert()
      }
    } catch (error) {
      console.error("Chyba při inicializaci GSAP animací:", error)
    }
  }, [categories, activeCategory, hasAnimated])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          <span className="border-b-4 border-strawstav-red px-2 pb-2">
            Naše úspěchy v číslech
          </span>
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Za dobu naší existence jsme dosáhli významných úspěchů v různých oblastech stavebnictví. Podívejte se na
          konkrétní čísla, která hovoří za nás.
        </p>

        <Tabs defaultValue={categories[0].id} onValueChange={setActiveCategory} className="mb-12">
          <TabsList className="flex flex-wrap justify-center bg-gray-50 p-1 rounded-lg border border-gray-100 shadow-sm">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="px-5 py-2 data-[state=active]:bg-white data-[state=active]:text-strawstav-red">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category, categoryIndex) => (
            <TabsContent key={category.id} value={category.id}>
              {category.description && (
                <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">{category.description}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.stats.map((stat, statIndex) => (
                  <div
                    key={statIndex}
                    ref={(el) => {
                      if (!statRefs.current[categoryIndex]) {
                        statRefs.current[categoryIndex] = []
                      }
                      statRefs.current[categoryIndex][statIndex] = el
                    }}
                    className={`${hasAnimated[category.id] ? "opacity-100" : "opacity-0"} transform transition-all`}
                  >
                    <div className="stat-card relative p-2 hover:scale-105 transition-transform duration-300 border border-gray-200 rounded-sm overflow-hidden shadow-sm">
                      <div className="bg-strawstav-red h-1"></div>
                      <div className="stat-circle-wrapper relative w-full aspect-square flex items-center justify-center">
                        {/* Pozadí kruhu s gradientem */}
                        <div className="stat-circle-bg absolute inset-0 rounded-full bg-gradient-to-br from-strawstav-red to-red-700 opacity-10"></div>
                        
                        {/* Animovaný kruh kolem dokola */}
                        <svg className="stat-circle absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle 
                            className="stat-circle-track"
                            cx="50" 
                            cy="50" 
                            r="45" 
                            fill="transparent"
                            strokeWidth="3"
                            stroke="rgba(0,0,0,0.05)"
                          />
                          <circle 
                            className="stat-circle-indicator"
                            cx="50" 
                            cy="50" 
                            r="45" 
                            fill="transparent"
                            strokeWidth="4"
                            stroke="#a0001c"
                            strokeDasharray="282.6"  // 2πr = 2 * π * 45
                            strokeDashoffset="282.6" // Bude animováno pomocí GSAP
                            strokeLinecap="round"
                          />
                        </svg>
                        
                        {/* Ikona v kruhu */}
                        <div className="stat-icon absolute top-6 left-1/2 transform -translate-x-1/2 p-2 bg-strawstav-red rounded-full shadow-sm text-2xl">
                          <div className="text-white">
                            {stat.icon}
                          </div>
                        </div>
                        
                        {/* Hodnota statistiky */}
                        <div
                          className="stat-value text-5xl font-bold text-gray-800"
                          data-value={stat.value}
                          data-prefix={stat.prefix || ""}
                          data-suffix={stat.suffix || ""}
                        >
                          {stat.prefix || ""}5{stat.suffix || ""}
                        </div>
                      </div>
                      
                      {/* Text pod kruhem */}
                      <div className="mt-3 text-center">
                        <div className="text-gray-700 font-medium">{stat.label}</div>
                        {stat.description && <div className="text-gray-500 text-sm mt-1">{stat.description}</div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
