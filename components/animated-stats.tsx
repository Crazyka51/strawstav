"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface Stat {
  value: number
  label: string
  icon: React.ReactNode
  prefix?: string
  suffix?: string
  description?: string
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
  const sectionRef = useRef<HTMLElement>(null)
  const statRefs = useRef<(HTMLDivElement | null)[][]>([])
  const [hasAnimated, setHasAnimated] = useState<Record<string, boolean>>({})
  const [activeCategory, setActiveCategory] = useState(categories[0].id)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initialize refs array for each category
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
          // Animate card
          gsap.fromTo(
            stat,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              ease: "power2.out",
            }
          )

          // Animate number
          const valueElement = stat.querySelector(".stat-value")
          if (valueElement) {
            const targetValue = parseInt(valueElement.getAttribute("data-value") || "5")
            const prefix = valueElement.getAttribute("data-prefix") || ""
            const suffix = valueElement.getAttribute("data-suffix") || ""

            gsap.fromTo(
              valueElement,
              { innerText: 0 },
              {
                innerText: targetValue,
                duration: 2,
                ease: "power2.out",
                snap: { innerText: 1 },
                onUpdate: function() {
                  const currentValue = Math.round(parseFloat(this.targets()[0].innerText))
                  valueElement.textContent = `${prefix}${currentValue}${suffix}`
                }
              }
            )
          }
        }
      })

      setHasAnimated((prev) => ({ ...prev, [categoryId]: true }))
    }

    // Set up ScrollTrigger for each category
    categories.forEach((category) => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          if (category.id === activeCategory) {
            animateStats(category.id)
          }
        }
      })
    })

    // Animate active category
    if (activeCategory) {
      animateStats(activeCategory)
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [categories, activeCategory, hasAnimated])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Naše úspěchy v číslech</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Za dobu naší existence jsme dosáhli významných úspěchů v různých oblastech stavebnictví. Podívejte se na
          konkrétní čísla, která hovoří za nás.
        </p>

        <Tabs defaultValue={categories[0].id} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="flex flex-wrap justify-center">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
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
                    className={hasAnimated[category.id] ? "opacity-100" : "opacity-0"}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-strawstav-red to-red-800"></div>
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                        <div className="text-strawstav-red mb-4 text-4xl">{stat.icon}</div>
                        <div
                          className="stat-value text-4xl font-bold mb-2"
                          data-value={stat.value}
                          data-prefix={stat.prefix || ""}
                          data-suffix={stat.suffix || ""}
                        >
                          {stat.prefix || ""}0{stat.suffix || ""}
                        </div>
                        <div className="text-gray-700 font-medium mb-2">{stat.label}</div>
                        {stat.description && <div className="text-gray-500 text-sm">{stat.description}</div>}
                      </CardContent>
                    </Card>
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