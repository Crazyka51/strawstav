"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/ui/accordion"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Search } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
  category: string
}

interface FaqAccordionProps {
  questions: FaqItem[]
  categories?: string[]
}

export default function FaqAccordion({ questions, categories = [] }: FaqAccordionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  // Filtrování otázek podle vyhledávání a kategorie
  const filteredQuestions = questions.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || item.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Získání unikátních kategorií, pokud nejsou poskytnuty
  const uniqueCategories =
    categories.length > 0 ? categories : [...new Set(questions.map((question) => question.category))]

  // Zvýraznění hledaného textu
  const highlightText = (text: string) => {
    if (!searchQuery || searchQuery === "") return text

    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"))
    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 font-medium">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Často kladené dotazy</h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Našli jste odpověď na svou otázku? Pokud ne, neváhejte nás kontaktovat a rádi vám pomůžeme.
        </p>

        {/* Vyhledávání */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Hledat v otázkách..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 text-lg"
            />
          </div>
        </div>

        {/* Kategorie */}
        {uniqueCategories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Button
              variant={activeCategory === "all" ? "default" : "outline"}
              onClick={() => setActiveCategory("all")}
              className={activeCategory === "all" ? "bg-strawstav-red hover:bg-red-700" : ""}
            >
              Všechny otázky
            </Button>
            {uniqueCategories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-strawstav-red hover:bg-red-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Výsledky vyhledávání */}
        {searchQuery && (
          <p className="text-center mb-6">
            {filteredQuestions.length === 0
              ? "Žádné výsledky nenalezeny"
              : `Nalezeno ${filteredQuestions.length} ${
                  filteredQuestions.length === 1
                    ? "výsledek"
                    : filteredQuestions.length >= 2 && filteredQuestions.length <= 4
                      ? "výsledky"
                      : "výsledků"
                }`}
          </p>
        )}

        {/* Accordion s otázkami */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="bg-white rounded-lg shadow-md">
            {filteredQuestions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 text-left">
                  <div className="flex items-start">
                    <span className="text-strawstav-red font-bold mr-3">Q:</span>
                    <span className="font-medium">{highlightText(item.question)}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 bg-gray-50">
                  <div className="flex items-start">
                    <span className="text-strawstav-red font-bold mr-3">A:</span>
                    <div className="prose">{highlightText(item.answer)}</div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Nenašli jste odpověď? */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Nenašli jste odpověď na svou otázku?</p>
          <Button className="bg-strawstav-red hover:bg-red-700 text-white">Kontaktujte nás</Button>
        </div>
      </div>
    </section>
  )
}
