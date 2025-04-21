"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Maximize2, Calendar, MapPin } from "lucide-react"

interface BeforeAfterProject {
  id: number
  title: string
  description: string
  before: string
  after: string
  category: string
  location: string
  date: string
  client?: string
  additionalImages?: { before: string; after: string }[]
}

interface BeforeAfterGalleryProps {
  projects: BeforeAfterProject[]
  categories?: string[]
}

export default function BeforeAfterGallery({ projects, categories = [] }: BeforeAfterGalleryProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [activeProject, setActiveProject] = useState(projects[0])
  const [activeCategory, setActiveCategory] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [fullscreenProject, setFullscreenProject] = useState<BeforeAfterProject | null>(null)
  const [fullscreenSliderPosition, setFullscreenSliderPosition] = useState(50)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const fullscreenContainerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  // Filtrované projekty podle kategorie
  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

  // Získání unikátních kategorií, pokud nejsou poskytnuty
  const uniqueCategories =
    categories.length > 0 ? categories : [...new Set(projects.map((project) => project.category))]

  // Funkce pro ovládání slideru
  const handleMouseDown = (
    containerRefToUse: React.RefObject<HTMLDivElement>,
    setPositionFunc: (pos: number) => void,
  ) => {
    isDragging.current = true
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (
    e: React.MouseEvent,
    containerRefToUse: React.RefObject<HTMLDivElement>,
    setPositionFunc: (pos: number) => void,
  ) => {
    if (isDragging.current && containerRefToUse.current) {
      const rect = containerRefToUse.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const position = (x / rect.width) * 100

      // Omezení pozice mezi 0 a 100
      setPositionFunc(Math.max(0, Math.min(100, position)))
    }
  }

  const handleTouchMove = (
    e: React.TouchEvent,
    containerRefToUse: React.RefObject<HTMLDivElement>,
    setPositionFunc: (pos: number) => void,
  ) => {
    if (containerRefToUse.current) {
      const rect = containerRefToUse.current.getBoundingClientRect()
      const x = e.touches[0].clientX - rect.left
      const position = (x / rect.width) * 100

      // Omezení pozice mezi 0 a 100
      setPositionFunc(Math.max(0, Math.min(100, position)))
    }
  }

  const openFullscreen = (project: BeforeAfterProject) => {
    setFullscreenProject(project)
    setFullscreenSliderPosition(50)
    setCurrentImageIndex(0)
    setIsDialogOpen(true)
  }

  const nextImage = () => {
    if (!fullscreenProject) return
    const totalImages = (fullscreenProject.additionalImages?.length || 0) + 1
    setCurrentImageIndex((prev) => (prev + 1) % totalImages)
  }

  const prevImage = () => {
    if (!fullscreenProject) return
    const totalImages = (fullscreenProject.additionalImages?.length || 0) + 1
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }

  // Přidání a odstranění event listenerů
  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Získání aktuálního páru obrázků pro fullscreen
  const getCurrentImagePair = () => {
    if (!fullscreenProject) return { before: "", after: "" }

    if (currentImageIndex === 0) {
      return { before: fullscreenProject.before, after: fullscreenProject.after }
    }

    const additionalIndex = currentImageIndex - 1
    return fullscreenProject.additionalImages?.[additionalIndex] || { before: "", after: "" }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Před a po realizaci</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Posuňte slider a podívejte se na rozdíl před a po realizaci našich projektů. Přesvědčte se o kvalitě naší
          práce na vlastní oči.
        </p>

        {/* Kategorie projektů */}
        <Tabs defaultValue="all" className="mb-8">
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

        {/* Hlavní zobrazení před/po */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Náhledy projektů */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    activeProject.id === project.id ? "ring-2 ring-strawstav-red" : ""
                  }`}
                  onClick={() => setActiveProject(project)}
                >
                  <div className="relative h-32">
                    <Image
                      src={project.after || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-sm font-medium text-white truncate">{project.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {project.date}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={12} className="mr-1" />
                        {project.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Hlavní slider */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card className="overflow-hidden shadow-lg">
              <div
                ref={containerRef}
                className="relative h-[500px] overflow-hidden cursor-ew-resize"
                onMouseDown={() => handleMouseDown(containerRef, setSliderPosition)}
                onMouseMove={(e) => handleMouseMove(e, containerRef, setSliderPosition)}
                onTouchMove={(e) => handleTouchMove(e, containerRef, setSliderPosition)}
              >
                {/* Obrázek "před" */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={activeProject.before || "/placeholder.svg"}
                    alt={`Před: ${activeProject.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>

                {/* Obrázek "po" s clipPath */}
                <div
                  className="absolute inset-0 w-full h-full"
                  style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                  }}
                >
                  <Image
                    src={activeProject.after || "/placeholder.svg"}
                    alt={`Po: ${activeProject.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>

                {/* Slider */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                  onMouseDown={() => handleMouseDown(containerRef, setSliderPosition)}
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-strawstav-red"></div>
                  </div>
                </div>

                {/* Popisky "před" a "po" */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded">Před</div>
                <div className="absolute top-4 right-4 bg-strawstav-red text-white px-3 py-1 rounded">Po</div>

                {/* Tlačítko pro fullscreen */}
                <button
                  onClick={() => openFullscreen(activeProject)}
                  className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                >
                  <Maximize2 size={20} className="text-strawstav-red" />
                </button>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">{activeProject.title}</h3>
                <p className="text-gray-600 mb-4">{activeProject.description}</p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-1" />
                    {activeProject.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={16} className="mr-1" />
                    {activeProject.location}
                  </div>
                  {activeProject.client && (
                    <div className="flex items-center text-sm text-gray-500">
                      <span className="font-medium mr-1">Klient:</span> {activeProject.client}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialog pro fullscreen zobrazení */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-6xl p-0 overflow-hidden">
            <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 p-4">
              <DialogTitle className="text-white">{fullscreenProject?.title}</DialogTitle>
            </DialogHeader>

            <div
              ref={fullscreenContainerRef}
              className="relative h-[80vh] cursor-ew-resize"
              onMouseDown={() => handleMouseDown(fullscreenContainerRef, setFullscreenSliderPosition)}
              onMouseMove={(e) => handleMouseMove(e, fullscreenContainerRef, setFullscreenSliderPosition)}
              onTouchMove={(e) => handleTouchMove(e, fullscreenContainerRef, setFullscreenSliderPosition)}
            >
              {/* Obrázek "před" */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={getCurrentImagePair().before || "/placeholder.svg"}
                  alt={`Před: ${fullscreenProject?.title}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Obrázek "po" s clipPath */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  clipPath: `polygon(0 0, ${fullscreenSliderPosition}% 0, ${fullscreenSliderPosition}% 100%, 0 100%)`,
                }}
              >
                <Image
                  src={getCurrentImagePair().after || "/placeholder.svg"}
                  alt={`Po: ${fullscreenProject?.title}`}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Slider */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{ left: `${fullscreenSliderPosition}%` }}
                onMouseDown={() => handleMouseDown(fullscreenContainerRef, setFullscreenSliderPosition)}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-strawstav-red"></div>
                </div>
              </div>

              {/* Popisky "před" a "po" */}
              <div className="absolute top-20 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded">Před</div>
              <div className="absolute top-20 right-4 bg-strawstav-red text-white px-3 py-1 rounded">Po</div>

              {/* Navigační tlačítka */}
              {fullscreenProject &&
                fullscreenProject.additionalImages &&
                fullscreenProject.additionalImages.length > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
                      onClick={prevImage}
                    >
                      <ChevronLeft size={24} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100"
                      onClick={nextImage}
                    >
                      <ChevronRight size={24} />
                    </Button>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
                      {currentImageIndex + 1} / {(fullscreenProject.additionalImages?.length || 0) + 1}
                    </div>
                  </>
                )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}
