"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

  // Získání unikátních kategorií, pokud nejsou poskytnuty
  const uniqueCategories =
    categories.length > 0 ? categories : [...new Set(projects.map((project) => project.category))]

  // Filtrované projekty podle kategorie
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animace časové osy
    if (lineRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        },
      )
    }

    // Animace projektů
    projectRefs.current.forEach((project, index) => {
      if (project) {
        const direction = index % 2 === 0 ? -50 : 50

        gsap.fromTo(
          project,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: project,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [filteredProjects])

  const openProjectDetails = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Naše významné projekty</h2>
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
          {/* Časová osa */}
          <div
            ref={lineRef}
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-strawstav-red to-red-800 h-full"
          />

          {/* Projekty */}
          <div className="relative z-10">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (projectRefs.current[index] = el)}
                className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center mb-20`}
              >
                {/* Rok */}
                <div className="w-24 h-24 rounded-full bg-white border-4 border-strawstav-red flex items-center justify-center z-10 shadow-lg mb-6 md:mb-0">
                  <span className="text-2xl font-bold">{project.year}</span>
                </div>

                {/* Obsah */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"} w-full md:w-auto`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="relative h-64 w-full">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-60" />
                      <div className="absolute top-4 right-4">
                        <Badge
                          variant="secondary"
                          className="bg-strawstav-red text-white hover:bg-red-700 transition-colors"
                        >
                          {project.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-2xl font-bold mb-1 drop-shadow-md">{project.title}</h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin size={16} className="mr-1" />
                          {project.details.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={16} className="mr-1" />
                          {project.details.duration}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Users size={16} className="mr-1" />
                          {project.details.team}
                        </div>
                      </div>
                      <Button
                        onClick={() => openProjectDetails(project)}
                        className="w-full bg-strawstav-red hover:bg-red-700 text-white"
                      >
                        Zobrazit detail <ChevronRight size={16} className="ml-1" />
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
