"use client"

import { Badge } from "@/app/components/ui/badge"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import Image from "next/image"
import { Card, CardContent } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

interface Testimonial {
  id: number
  client: string
  company: string
  position: string
  text: string
  image: string
  rating: number
  projectType: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([])
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Funkce pro navigaci
  const goToNext = () => {
    if (isAnimating) return
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    if (isAnimating) return
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToIndex = (index: number) => {
    if (isAnimating || index === activeIndex) return
    setActiveIndex(index)
  }

  // Animace při změně aktivního indexu
  useEffect(() => {
    if (testimonialRefs.current.length === 0) return

    setIsAnimating(true)

    // Skrytí všech testimonials
    testimonialRefs.current.forEach((ref, index) => {
      if (ref && index !== activeIndex) {
        gsap.to(ref, {
          opacity: 0,
          x: index < activeIndex ? -50 : 50,
          duration: 0.3,
          onComplete: () => {
            if (ref) {
              ref.style.display = "none"
              ref.className = ref.className.replace("block opacity-100", "hidden opacity-0")
            }
          }
        })
      }
    })

    // Zobrazení aktivního testimonial
    const activeRef = testimonialRefs.current[activeIndex]
    if (activeRef) {
      activeRef.style.display = "block"
      activeRef.className = activeRef.className.replace("hidden opacity-0", "block opacity-100")
      
      gsap.fromTo(
        activeRef,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          delay: 0.1,
          onComplete: () => setIsAnimating(false),
        },
      )
    }
  }, [activeIndex])

  // Automatické přepínání
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
      autoplayTimerRef.current = setInterval(goToNext, 8000)
    }

    startAutoplay()

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
        autoplayTimerRef.current = null
      }
    }
  }, [activeIndex])

  // Zastavení autoplay při hoveru
  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current)
      autoplayTimerRef.current = null
    }
  }

  // Obnovení autoplay po hoveru
  const resumeAutoplay = () => {
    if (!autoplayTimerRef.current) {
      autoplayTimerRef.current = setInterval(goToNext, 8000)
    }
  }

  // Vykreslení hvězdiček pro hodnocení
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    )
  }

  // Inicializace prvního elementu při mount
  useEffect(() => {
    if (testimonialRefs.current[0]) {
      gsap.set(testimonialRefs.current[0], { opacity: 1, x: 0 })
    }
  }, [])

  // Cleanup při unmount
  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Co o nás říkají klienti</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Přečtěte si, co o spolupráci s námi říkají naši spokojení klienti. Jejich zpětná vazba je pro nás tím
          nejcennějším oceněním.
        </p>

        <div
          ref={carouselRef}
          className="relative max-w-5xl mx-auto"
          onMouseEnter={stopAutoplay}
          onMouseLeave={resumeAutoplay}
        >
          <div className="overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                ref={(el) => {
                  testimonialRefs.current[index] = el
                }}
                className={index === activeIndex ? "block opacity-100" : "hidden opacity-0"}
              >
                <Card className="border-none shadow-xl">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      {/* Obrázek klienta */}
                      <div className="relative h-64 md:h-auto bg-strawstav-red">
                        <div className="absolute inset-0 bg-gradient-to-br from-strawstav-red to-red-800 opacity-90" />
                        <div className="relative h-full flex flex-col items-center justify-center p-6 text-white">
                          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white mb-4">
                            <Image
                              src={testimonial.image || "/construction-team.jpg"}
                              alt={testimonial.client}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </div>
                          <h3 className="text-xl font-bold text-center">{testimonial.client}</h3>
                          <p className="text-sm text-center mb-2">{testimonial.position}</p>
                          <p className="text-sm font-bold text-center">{testimonial.company}</p>
                          <div className="mt-4">{renderStars(testimonial.rating)}</div>
                        </div>
                      </div>

                      {/* Text reference */}
                      <div className="md:col-span-2 p-8 flex flex-col justify-center">
                        <div className="text-strawstav-red mb-4">
                          <Quote size={40} />
                        </div>
                        <p className="text-gray-700 text-lg italic mb-6">{testimonial.text}</p>
                        <div className="mt-auto">
                          <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-300">
                            {testimonial.projectType}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigační tlačítka */}
          <div className="flex justify-between mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "bg-strawstav-red scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Přejít na referenci ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrev}
                disabled={isAnimating}
                className="h-10 w-10 rounded-full"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                disabled={isAnimating}
                className="h-10 w-10 rounded-full"
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
