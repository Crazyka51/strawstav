"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { MapPin, Calendar, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface MapProject {
  id: number
  title: string
  description: string
  image: string
  location: {
    lat: number
    lng: number
    address: string
  }
  category: string
  year: number
  url?: string
}

interface ProjectsMapProps {
  projects: MapProject[]
  mapApiKey?: string
  center?: { lat: number; lng: number }
  zoom?: number
}

// Declare google as a global variable
declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export default function ProjectsMap({
  projects,
  mapApiKey = "YOUR_GOOGLE_MAPS_API_KEY",
  center = { lat: 49.8175, lng: 15.473 }, // Střed ČR
  zoom = 7,
}: ProjectsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<MapProject | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])

  // Načtení Google Maps API
  useEffect(() => {
    const loadGoogleMapsApi = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${mapApiKey}&callback=initMap`
      script.async = true
      script.defer = true
      document.head.appendChild(script)

      // Definování callback funkce pro inicializaci mapy
      window.initMap = () => {
        setMapLoaded(true)
      }
    }

    if (!window.google) {
      loadGoogleMapsApi()
    } else {
      setMapLoaded(true)
    }

    return () => {
      // Odstranění callback funkce při unmount
      window.initMap = (() => {}) as any
    }
  }, [mapApiKey])

  // Inicializace mapy po načtení API
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    const mapOptions: any = {
      center: center,
      zoom: zoom,
      mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [{ color: "#7c93a3" }, { lightness: "-10" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [{ visibility: "on" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#a0a4a5" }],
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [{ color: "#62838e" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry.fill",
          stylers: [{ color: "#f5f5f5" }],
        },
        {
          featureType: "landscape.natural.terrain",
          elementType: "geometry.fill",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "poi.business",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "poi.medical",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "poi.park",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [{ color: "#e6f3d6" }, { visibility: "simplified" }],
        },
        {
          featureType: "poi.sports_complex",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: "-100" }, { visibility: "simplified" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [{ color: "#e4e4e4" }],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry.fill",
          stylers: [{ color: "#eef3f5" }],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry.stroke",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road.local",
          elementType: "geometry.fill",
          stylers: [{ color: "#eef3f5" }],
        },
        {
          featureType: "road.local",
          elementType: "geometry.stroke",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ saturation: "0" }, { lightness: "0" }, { visibility: "simplified" }],
        },
        {
          featureType: "water",
          elementType: "geometry.fill",
          stylers: [{ color: "#cfe5f4" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [{ color: "#738c9b" }],
        },
        {
          featureType: "water",
          elementType: "labels.text.stroke",
          stylers: [{ visibility: "off" }],
        },
      ],
    }

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
    setMap(newMap)

    // Přidání markerů pro projekty
    const newMarkers: any[] = []
    projects.forEach((project) => {
      const marker = new window.google.maps.Marker({
        position: { lat: project.location.lat, lng: project.location.lng },
        map: newMap,
        title: project.title,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillColor: "#a0001c",
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
          scale: 10,
        },
        animation: window.google.maps.Animation.DROP,
      })

      // Přidání event listeneru pro kliknutí na marker
      marker.addListener("click", () => {
        setSelectedProject(project)
        newMap.panTo({ lat: project.location.lat, lng: project.location.lng })
        newMap.setZoom(10)
      })

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)

    return () => {
      // Odstranění markerů při unmount
      newMarkers.forEach((marker) => marker.setMap(null))
    }
  }, [mapLoaded, projects, center, zoom])

  // Funkce pro reset mapy
  const resetMap = () => {
    if (map) {
      map.setCenter(center)
      map.setZoom(zoom)
      setSelectedProject(null)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Mapa našich projektů</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Podívejte se, kde všude jsme realizovali naše projekty. Klikněte na značku pro zobrazení detailů.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seznam projektů */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h3 className="text-lg font-medium mb-2">Projekty podle lokality</h3>
              <p className="text-sm text-gray-600 mb-4">Klikněte na projekt pro zobrazení na mapě</p>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedProject?.id === project.id ? "ring-2 ring-strawstav-red" : ""
                    }`}
                    onClick={() => {
                      setSelectedProject(project)
                      if (map) {
                        map.panTo({ lat: project.location.lat, lng: project.location.lng })
                        map.setZoom(10)
                      }
                    }}
                  >
                    <CardContent className="p-3 flex items-center">
                      <div className="relative w-16 h-16 rounded overflow-hidden mr-3 flex-shrink-0">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{project.title}</h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin size={12} className="mr-1" />
                          {project.location.address}
                        </div>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar size={12} className="mr-1" />
                          {project.year}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button variant="outline" onClick={resetMap} className="w-full mt-4">
                Zobrazit všechny projekty
              </Button>
            </div>
          </div>

          {/* Mapa */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="relative">
              <div ref={mapRef} className="w-full h-[500px] rounded-lg shadow-md"></div>

              {/* Detail vybraného projektu */}
              {selectedProject && (
                <Card className="absolute bottom-4 left-4 right-4 max-w-md shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="relative w-20 h-20 rounded overflow-hidden mr-4 flex-shrink-0">
                        <Image
                          src={selectedProject.image || "/placeholder.svg"}
                          alt={selectedProject.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold">{selectedProject.title}</h3>
                          <Badge className="bg-strawstav-red text-white">{selectedProject.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{selectedProject.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-2">
                          <MapPin size={12} className="mr-1" />
                          {selectedProject.location.address}
                        </div>
                        {selectedProject.url && (
                          <Link href={selectedProject.url} className="inline-block mt-2">
                            <Button variant="link" className="p-0 h-auto text-strawstav-red">
                              Detail projektu <ArrowRight size={14} className="ml-1" />
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
