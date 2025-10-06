"use client"

import { useRef, useState, useCallback } from "react"
import { useSafeEffect } from "@/hooks/use-safe-effect"
import { gsap } from "gsap"
import Image from "next/image"
import { Card, CardContent } from "@/app/components/ui/card"
import { Badge } from "@/app/components/ui/badge"
import { Button } from "@/app/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { ChevronRight, Calendar, MapPin, Users, Award } from "lucide-react"

interface ProjectDetail {
  client: string
  location: string
  team: string
  duration: string
  awards?: string[]
  gallery: string[]
}

interface Project {
  id: number
  year: number
  title: string
  description: string
  image: string
  category: string
  details: ProjectDetail
}

interface TimelineProjectsProps {
  projects: Project[]
  categories?: string[]
}

export default function TimelineProjects({ projects, categories = [] }: TimelineProjectsProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState("all")
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const [timelineVisible, setTimelineVisible] = useState(false)

  // Získání unikátních kategorií, pokud nejsou poskytnuty
  const uniqueCategories =
    categories.length > 0 ? categories : [...new Set(projects.map((project) => project.category))]

  // Filtrované projekty podle kategorie
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  // Intersection Observer pro časovou osu
  const timelineObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !timelineVisible) {
        setTimelineVisible(true)
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0, transformOrigin: "top" },
            { scaleY: 1, duration: 1.2, ease: "power2.out" }
          )
        }
      }
    })
  }, [timelineVisible])

  // Intersection Observer pro projekty
  const projectObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const projectElement = entry.target as HTMLElement
        const projectIndex = parseInt(projectElement.dataset.index || '0')
        
        if (!visibleProjects.has(projectIndex)) {
          setVisibleProjects(prev => new Set([...prev, projectIndex]))
          
          // Animace pro mobilní zařízení
          const mobileCard = projectElement.querySelector('.md\\:hidden')
          if (mobileCard) {
            gsap.fromTo(
              mobileCard,
              { x: -30, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
            )
          }

          // Animace pro desktop
          const desktopCard = projectElement.querySelector('.hidden.md\\:flex')
          if (desktopCard) {
            const direction = projectIndex % 2 === 0 ? -50 : 50
            const card = desktopCard.querySelector('.w-5\\/12 .overflow-hidden')
            const yearBadge = desktopCard.querySelector('.w-16.h-16')
            
            if (card) {
              gsap.fromTo(
                card,
                { x: direction, opacity: 0, scale: 0.9 },
                { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
              )
            }
            
            if (yearBadge) {
              gsap.fromTo(
                yearBadge,
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, delay: 0.3, ease: "back.out(1.7)" }
              )
            }
          }
        }
      }
    })
  }, [visibleProjects])

  // Nastavení Intersection Observerů
  useSafeEffect(() => {
    const timelineObserverInstance = new IntersectionObserver(timelineObserver, {
      threshold: 0.1,
      rootMargin: '0px 0px -20% 0px'
    })

    const projectObserverInstance = new IntersectionObserver(projectObserver, {
      threshold: 0.2,
      rootMargin: '0px 0px -15% 0px'
    })

    // Připojení observerů
    if (timelineRef.current) {
      timelineObserverInstance.observe(timelineRef.current)
    }

    projectRefs.current.forEach((project) => {
      if (project) {
        projectObserverInstance.observe(project)
      }
    })

    return () => {
      timelineObserverInstance.disconnect()
      projectObserverInstance.disconnect()
    }
  }, [filteredProjects, timelineObserver, projectObserver])

  // Reset viditelnosti při změně kategorie
  useSafeEffect(() => {
    setVisibleProjects(new Set())
    setTimelineVisible(false)
  }, [activeCategory])

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          <span className="section-title-border">
            Naše významné projekty
          </span>
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Prohlédněte si naše nejvýznamnější projekty realizované v průběhu let. Každý projekt odráží naši vášeň pro
          kvalitu a preciznost.
        </p>

        {/* Filtry kategorií */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="flex flex-wrap justify-center">
            <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>
              Všechny projekty
            </TabsTrigger>
            {uniqueCategories.map((category) => (
              <TabsTrigger key={category} value={category} onClick={() => setActiveCategory(category)}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div ref={timelineRef} className="relative">
          {/* Časová osa - tenčí a modernější */}
          <div
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-strawstav-red/80 via-strawstav-red to-strawstav-red/80 h-full rounded-full"
          />
          {/* Doplňující body na lini */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-strawstav-red rounded-full top-0 shadow-sm" />
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-strawstav-red rounded-full bottom-0 shadow-sm" />

          {/* Projekty */}
          <div className="relative z-10">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { projectRefs.current[index] = el }}
                data-index={index}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center mb-8`}
              >
                {/* Rok - menší design */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-strawstav-red to-red-700 flex items-center justify-center z-10 shadow-md mb-4 md:mb-0 border-2 border-white">
                  <span className="text-sm font-bold text-white">{project.year}</span>
                </div>

                {/* Obsah - kompaktní design */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"} w-full md:max-w-md`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-l-strawstav-red">
                    <div className="relative h-40 w-full">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant="secondary"
                          className="bg-white/90 text-strawstav-red text-xs font-medium backdrop-blur-sm"
                        >
                          {project.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="text-lg font-bold mb-2 text-strawstav-black line-clamp-2">{project.title}</div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                      
                      <div className="flex flex-col gap-1 mb-3">
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin size={12} className="mr-1 text-strawstav-red" />
                          {project.details.location}
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar size={12} className="mr-1 text-strawstav-red" />
                          {project.details.duration}
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => openProjectDetails(project)}
                        size="sm"
                        className="w-full bg-strawstav-red hover:bg-red-700 text-white text-xs h-8"
                      >
                        Detail projektu <ChevronRight size={12} className="ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialog s detaily projektu */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                  <DialogDescription>
                    <Badge className="bg-strawstav-red text-white mt-2">{selectedProject.category}</Badge>
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <div className="relative h-64 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={selectedProject.image || "/placeholder.svg"}
                        alt={selectedProject.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {selectedProject.details.gallery.slice(0, 4).map((img, i) => (
                        <div key={i} className="relative h-24 rounded-lg overflow-hidden">
                          <Image
                            src={img || "/placeholder.svg"}
                            alt={`Galerie ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">O projektu</h3>
                    <p className="text-gray-600 mb-4">{selectedProject.description}</p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start">
                        <MapPin size={18} className="text-strawstav-red mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Lokalita</h4>
                          <p className="text-gray-600">{selectedProject.details.location}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Calendar size={18} className="text-strawstav-red mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Doba realizace</h4>
                          <p className="text-gray-600">{selectedProject.details.duration}</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Users size={18} className="text-strawstav-red mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Realizační tým</h4>
                          <p className="text-gray-600">{selectedProject.details.team}</p>
                        </div>
                      </div>

                      {selectedProject.details.awards && selectedProject.details.awards.length > 0 && (
                        <div className="flex items-start">
                          <Award size={18} className="text-strawstav-red mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Ocenění</h4>
                            <ul className="text-gray-600 list-disc list-inside">
                              {selectedProject.details.awards.map((award, i) => (
                                <li key={i}>{award}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button className="w-full bg-strawstav-red hover:bg-red-700 text-white">
                      Kontaktujte nás pro podobný projekt
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
