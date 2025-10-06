"use client"

import { useRef, useState } from "react"
import { useSafeEffect } from "@/hooks/use-safe-effect"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Hammer, Sparkles, Building2, Leaf, Truck, ChevronRight, ArrowRight } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/app/components/ui/dialog"
import { Button } from "@/app/components/ui/button"

const services = [
  {
    id: "stavebni-cinnost",
    title: "Stavební činnost",
    description:
      "Kompletní stavební práce od základů až po střechu. Specializujeme se na výstavbu rodinných domů, rekonstrukce bytů a komerčních prostor.",
    icon: Hammer,
    bgColor: "bg-strawstav-red",
    iconBg: "bg-white",
    iconColor: "text-strawstav-red",
    animation: "rotate",
    buttonText: "Více o stavební činnosti",
    keyPoints: [
      "Výstavba rodinných domů",
      "Rekonstrukce bytů",
      "Komerční stavby"
    ]
  },
  {
    id: "uklid",
    title: "Úklid bytových domů",
    description:
      "Pravidelný i jednorázový úklid společných prostor bytových domů. Zajišťujeme čistotu a hygienu ve všech prostorách.",
    icon: Sparkles,
    bgColor: "bg-gray-700",
    iconBg: "bg-white",
    iconColor: "text-gray-700",
    animation: "sparkle",
    buttonText: "Více o úklidu",
    keyPoints: [
      "Pravidelný úklid", 
      "Jednorázový úklid", 
      "Generální úklid"
    ]
  },
  {
    id: "sprava",
    title: "Správa nemovitostí",
    description:
      "Komplexní správa bytových domů a komerčních nemovitostí. Zajišťujeme technickou, ekonomickou i právní správu.",
    icon: Building2,
    bgColor: "bg-stone-700",
    iconBg: "bg-white",
    iconColor: "text-stone-700",
    animation: "door",
    buttonText: "Více o správě nemovitostí",
    keyPoints: [
      "Technická správa", 
      "Ekonomická správa", 
      "Právní správa"
    ]
  },
  {
    id: "udrzba",
    title: "Údržba zeleně",
    description:
      "Profesionální péče o zeleň kolem bytových domů a komerčních objektů. Sekání trávy, stříhání keřů, výsadba rostlin.",
    icon: Leaf,
    bgColor: "bg-stone-600",
    iconBg: "bg-white",
    iconColor: "text-stone-600",
    animation: "wave",
    buttonText: "Více o údržbě zeleně",
    keyPoints: [
      "Sekání trávy", 
      "Stříhání keřů", 
      "Výsadba rostlin"
    ]
  },
  {
    id: "zemni-prace",
    title: "Zemní práce",
    description:
      "Výkopové práce, terénní úpravy, příprava staveniště. Disponujeme vlastní technikou pro efektivní realizaci zemních prací.",
    icon: Truck,
    bgColor: "bg-zinc-800",
    iconBg: "bg-white",
    iconColor: "text-zinc-800",
    animation: "dig",
    buttonText: "Více o zemních pracích",
    keyPoints: [
      "Výkopové práce", 
      "Terénní úpravy", 
      "Příprava staveniště"
    ]
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  
  const openServiceDetails = (service: typeof services[0]) => {
    setSelectedService(service)
    setIsDialogOpen(true)
    setFormSubmitted(false)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Bezpečné logování a zpracování formuláře na klientské straně
    if (typeof window !== 'undefined') {
      console.log('Formulář odeslán:', { formName, formEmail, formMessage })
      // V produkčním prostředí by zde byl kód pro odeslání dat na server
    }
    setFormSubmitted(true)
    setFormName('')
    setFormEmail('')
    setFormMessage('')
  }

  useSafeEffect(() => {
    try {
      // Registrace ScrollTrigger pluginu
      gsap.registerPlugin(ScrollTrigger)
      
      // Vytvoření GSAP kontextu pro lepší správu paměti
      const ctx = gsap.context(() => {
        // Animace nadpisu
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              scrollTrigger: {
                trigger: titleRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
        }

        // Animace service karet
        const cards = cardsRef.current?.querySelectorAll(".service-card")
        if (cards && cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.1,
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            },
          )
        }
      }, sectionRef) // Použití GSAP kontextu pro sectionRef scope

      // Funkce pro úklid
      return () => {
        // Vyčistíme GSAP kontext a všechny ScrollTriggery
        ctx.revert()
      }
    } catch (error) {
      console.error("Chyba při inicializaci GSAP animací:", error)
    }
  }, [])

  return (
    <section id="sluzby" ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-10">
          <span className="border-b-4 border-strawstav-red px-2 pb-2">
            Naše služby
          </span>
        </h2>
        
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Poskytujeme komplexní služby v oblasti stavebnictví, správy nemovitostí a údržby budov.
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {services.map((service) => {
            // Příprava icon komponenty mimo JSX pro lepší výkon a hydrataci
            const ServiceIcon = service.icon;
            
            return (
              <div key={service.id} className="service-card service-card-traditional border border-gray-200 bg-white shadow-sm rounded-sm overflow-hidden">
                {/* Jednoduchý pruh nahoře */}
                <div className="bg-strawstav-red h-2"></div>
                
                {/* Ikona a obsah */}
                <div className="p-6 flex flex-col h-full">
                  {/* Ikona */}
                  <div className="flex justify-center mb-5">
                    <div className="bg-strawstav-red rounded-full p-4 text-white">
                      <ServiceIcon size={28} strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Název služby */}
                  <h3 className="text-xl font-bold mb-3 text-center">{service.title}</h3>
                  
                  {/* Popis */}
                  <p className="text-gray-700 mb-4 text-center">{service.description}</p>
                  
                  {/* Tlačítko */}
                  <button 
                    onClick={() => openServiceDetails(service)}
                    className="text-strawstav-red font-medium hover:underline mt-auto flex items-center justify-center"
                    type="button"
                  >
                    Zjistit více
                    <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Dialog pro detaily služby */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl bg-white p-0 overflow-hidden" aria-labelledby="service-dialog-title">
            {selectedService && (
              <>
                <div className="bg-strawstav-red py-3 px-6 text-center relative">
                  <DialogTitle id="service-dialog-title" className="text-xl font-bold text-white m-0">
                    {selectedService.title}
                  </DialogTitle>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <h4 className="font-medium mb-3 text-gray-900">O službě:</h4>
                    <p className="text-gray-700 mb-4">{selectedService.description}</p>
                    
                    <h4 className="font-medium mb-3 text-gray-900">Zahrnuje:</h4>
                    <ul className="mb-6">
                      {selectedService.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-center mb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-strawstav-red mr-2"></div>
                          <span>{point}</span>
                        </li>
                      ))}
                      <li className="flex items-center mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-strawstav-red mr-2"></div>
                        <span>Záruka kvality</span>
                      </li>
                      <li className="flex items-center mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-strawstav-red mr-2"></div>
                        <span>Zkušený tým</span>
                      </li>
                    </ul>
                    
                    {!formSubmitted ? (
                      <>
                        <h4 className="font-medium mb-3 text-gray-900">Máte zájem o tuto službu?</h4>
                        <form onSubmit={handleFormSubmit} className="space-y-4 border-t border-gray-200 pt-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Jméno</label>
                            <input
                              type="text"
                              id="name"
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-sm"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                            <input
                              type="email"
                              id="email"
                              value={formEmail}
                              onChange={(e) => setFormEmail(e.target.value)}
                              className="w-full p-2 border border-gray-300 rounded-sm"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Zpráva</label>
                            <textarea
                              id="message"
                              value={formMessage}
                              onChange={(e) => setFormMessage(e.target.value)}
                              rows={3}
                              className="w-full p-2 border border-gray-300 rounded-sm"
                              required
                            />
                          </div>
                          <div className="flex gap-4">
                            <Button type="submit" className="bg-strawstav-red hover:bg-red-800 text-white">
                              Odeslat poptávku
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Zavřít
                            </Button>
                          </div>
                        </form>
                      </>
                    ) : (
                      <div className="p-4 bg-green-50 text-green-800 rounded-sm border border-green-200 text-center">
                        <h4 className="font-medium mb-2">Děkujeme za vaši poptávku!</h4>
                        <p>Ozveme se vám co nejdříve.</p>
                        <Button 
                          className="mt-4 bg-strawstav-red hover:bg-red-800 text-white" 
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Zavřít
                        </Button>
                      </div>
                    )}
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
