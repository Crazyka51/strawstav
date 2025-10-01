"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { blogArticles } from "@/app/data/blog-articles"

export default function BlogPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const articleRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animace článků
    articleRefs.current.forEach((article, index) => {
      if (article) {
        gsap.fromTo(
          article,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: article,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Formátování data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <main className="relative overflow-hidden">
      <Header />
      
      <div ref={sectionRef} className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          {/* Nadpis a navigace zpět */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center text-strawstav-red hover:text-red-700 transition-colors mb-6"
            >
              <ArrowLeft size={20} className="mr-2" />
              Zpět na hlavní stránku
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Odborné články a novinky</h1>
            <p className="text-gray-600 text-lg max-w-3xl">
              Přečtěte si naše nejnovější články o trendech ve stavebnictví, technologiích a tipech pro vaše stavební
              projekty.
            </p>
          </div>

          {/* Grid článků */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article, index) => (
              <div key={article.id} ref={(el) => { articleRefs.current[index] = el }} className="opacity-0">
                <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-strawstav-red text-white hover:bg-red-700">{article.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
                        <Image
                          src={article.author.avatar || "/placeholder.svg"}
                          alt={article.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{article.author.name}</p>
                        <p className="text-xs text-gray-500">{article.author.position}</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                    <div className="flex items-center text-sm text-gray-500 mt-auto">
                      <div className="flex items-center mr-4">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(article.date)}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {article.readTime} min
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 py-4 border-t">
                    <Link href={`/blog/${article.slug}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Číst článek
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
