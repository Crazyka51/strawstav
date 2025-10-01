"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import { getArticleBySlug, getRelatedArticles } from "@/app/data/blog-articles"

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const contentRef = useRef<HTMLDivElement>(null)
  const relatedRefs = useRef<(HTMLDivElement | null)[]>([])
  
  const article = getArticleBySlug(slug)
  
  // Pokud článek neexistuje, zobrazíme 404
  if (!article) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(slug, 3)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animace hlavního obsahu
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      )
    }

    // Animace souvisejících článků
    relatedRefs.current.forEach((article, index) => {
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

  // Převod markdown obsahu na HTML (jednoduchá verze)
  const formatContent = (content: string) => {
    return content
      .split("\n")
      .map((line, index) => {
        // Nadpisy
        if (line.startsWith("# ")) {
          return <h1 key={index} className="text-3xl md:text-4xl font-bold mb-6 mt-8">{line.slice(2)}</h1>
        }
        if (line.startsWith("## ")) {
          return <h2 key={index} className="text-2xl md:text-3xl font-bold mb-4 mt-6">{line.slice(3)}</h2>
        }
        if (line.startsWith("### ")) {
          return <h3 key={index} className="text-xl md:text-2xl font-semibold mb-3 mt-5">{line.slice(4)}</h3>
        }
        // Seznamy
        if (line.startsWith("- ")) {
          return <li key={index} className="ml-6 mb-2 text-gray-700">{line.slice(2)}</li>
        }
        // Číslované seznamy
        if (/^\d+\.\s/.test(line)) {
          return <li key={index} className="ml-6 mb-2 text-gray-700">{line.replace(/^\d+\.\s/, "")}</li>
        }
        // Prázdné řádky
        if (line.trim() === "") {
          return <br key={index} />
        }
        // Normální text
        return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{line}</p>
      })
  }

  return (
    <main className="relative overflow-hidden">
      <Header />

      {/* Hero sekce článku */}
      <div className="relative h-[400px] w-full">
        <Image
          src={article.image || "/placeholder.svg"}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        {/* Breadcrumb a obsah */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-white hover:text-gray-200 transition-colors mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Zpět na blog
            </Link>
            <Badge className="bg-strawstav-red text-white hover:bg-red-700 mb-4">
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Obsah článku */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Meta informace */}
            <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b">
              <div className="flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-3">
                  <Image
                    src={article.author.avatar || "/placeholder.svg"}
                    alt={article.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{article.author.name}</p>
                  <p className="text-sm text-gray-500">{article.author.position}</p>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar size={18} className="mr-2" />
                {formatDate(article.date)}
              </div>
              <div className="flex items-center text-gray-600">
                <Clock size={18} className="mr-2" />
                {article.readTime} min čtení
              </div>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      text: article.excerpt,
                      url: window.location.href,
                    })
                  }
                }}
                className="ml-auto flex items-center text-strawstav-red hover:text-red-700 transition-colors"
              >
                <Share2 size={18} className="mr-2" />
                Sdílet
              </button>
            </div>

            {/* Hlavní obsah */}
            <div ref={contentRef} className="prose prose-lg max-w-none">
              {article.content && formatContent(article.content)}
            </div>

            {/* CTA sekce */}
            <div className="mt-12 p-8 bg-gradient-to-r from-strawstav-red to-red-700 rounded-lg text-white">
              <h3 className="text-2xl font-bold mb-4">Máte zájem o naše služby?</h3>
              <p className="mb-6">
                Kontaktujte nás pro nezávaznou konzultaci a cenovou nabídku. Rádi vám pomůžeme s vaším projektem.
              </p>
              <Link href="/#kontakt">
                <Button variant="outline" className="bg-white text-strawstav-red hover:bg-gray-100">
                  Kontaktovat nás
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Související články */}
      {relatedArticles.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Další články</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {relatedArticles.map((relatedArticle, index) => (
                <div key={relatedArticle.id} ref={(el) => { relatedRefs.current[index] = el }} className="opacity-0">
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="relative h-48 w-full">
                      <Image
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-strawstav-red text-white hover:bg-red-700">
                          {relatedArticle.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6 flex-grow">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{relatedArticle.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedArticle.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(relatedArticle.date)}
                      </div>
                    </CardContent>
                    <CardFooter className="px-6 py-4 border-t">
                      <Link href={`/blog/${relatedArticle.slug}`} className="w-full">
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
      )}

      <Footer />
    </main>
  )
}
