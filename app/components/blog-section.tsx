"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Calendar, Clock, ChevronRight } from "lucide-react"

interface BlogArticle {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  readTime: number
  author: {
    name: string
    avatar: string
    position: string
  }
  category: string
  slug: string
}

interface BlogSectionProps {
  articles: BlogArticle[]
  showMoreLink?: string
}

export default function BlogSection({ articles, showMoreLink = "/blog" }: BlogSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
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
  }, [articles])

  // Formátování data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Odborné články a novinky</h2>
            <p className="text-gray-600 max-w-2xl">
              Přečtěte si naše nejnovější články o trendech ve stavebnictví, technologiích a tipech pro vaše stavební
              projekty.
            </p>
          </div>
          <Link href={showMoreLink} className="mt-4 md:mt-0">
            <Button variant="outline" className="flex items-center">
              Všechny články <ChevronRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
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
    </section>
  )
}
