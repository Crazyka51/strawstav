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
    <section id="sluzby" ref={sectionRef} className="py-20 bg-gradient-to-b from-white via-strawstav-gray-light to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-strawstav-red opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-strawstav-red opacity-5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={titleRef} className="section-title">
          <span className="section-title-border">Naše služby</span>
        </h2>
        
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
          Poskytujeme komplexní služby v oblasti stavebnictví, správy nemovitostí a údržby budov s garantovanou kvalitou.
        </p>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service) => {
            const ServiceIcon = service.icon;
            
            return (
              <div 
                key={service.id} 
                className="service-card group hover:bg-white transition-all duration-300"
              >
                {/* Icon container */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-br from-strawstav-red to-strawstav-red-dark rounded-2xl p-5 text-white shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <ServiceIcon size={32} strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-900 group-hover:text-strawstav-red transition-colors duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-600 mb-6 text-center leading-relaxed">
                  {service.description}
                </p>
                
                {/* Button */}
                <button 
                  onClick={() => openServiceDetails(service)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-strawstav-red to-strawstav-red-dark text-white font-semibold rounded-lg hover:shadow-elegant transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                  type="button"
                >
                  Zjistit více
                  <ArrowRight size={20} />
                </button>
              </div>
            );
          })}
        </div>
        
        {/* Service details dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl bg-white p-0 overflow-hidden rounded-2xl shadow-elegant-lg" aria-labelledby="service-dialog-title">
            {selectedService && (
              <>
                <div className="bg-gradient-to-r from-strawstav-red to-strawstav-red-dark py-8 px-6 text-center relative">
                  <DialogTitle id="service-dialog-title" className="text-2xl font-bold text-white m-0">
                    {selectedService.title}
                  </DialogTitle>
                </div>
                
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Service description */}
                    <div>
                      <h4 className="font-bold mb-3 text-gray-900 text-lg">O službě</h4>
                      <p className="text-gray-600 leading-relaxed">{selectedService.description}</p>
                    </div>
                    
                    {/* Key points */}
                    <div>
                      <h4 className="font-bold mb-4 text-gray-900 text-lg">Co je zahrnuto</h4>
                      <div className="space-y-3">
                        {selectedService.keyPoints.map((point, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-strawstav-red to-strawstav-red-light mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{point}</span>
                          </div>
                        ))}
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-strawstav-red to-strawstav-red-light mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">Záruka kvality práce</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-strawstav-red to-strawstav-red-light mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">Zkušený profesionální tým</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Contact form */}
                    {!formSubmitted ? (
                      <>
                        <div className="border-t border-gray-200 pt-6">
                          <h4 className="font-bold mb-4 text-gray-900 text-lg">Máte zájem? Kontaktujte nás</h4>
                          <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Jméno a příjmení</label>
                              <input
                                type="text"
                                id="name"
                                value={formName}
                                onChange={(e) => setFormName(e.target.value)}
                                className="contact-input"
                                placeholder="Vaše jméno"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">E-mailová adresa</label>
                              <input
                                type="email"
                                id="email"
                                value={formEmail}
                                onChange={(e) => setFormEmail(e.target.value)}
                                className="contact-input"
                                placeholder="vase@email.cz"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Vaše zpráva</label>
                              <textarea
                                id="message"
                                value={formMessage}
                                onChange={(e) => setFormMessage(e.target.value)}
                                rows={4}
                                className="contact-input resize-none"
                                placeholder="Popište vaši poptávku..."
                                required
                              />
                            </div>
                            <div className="flex gap-4 pt-4">
                              <Button type="submit" className="flex-1 bg-gradient-to-r from-strawstav-red to-strawstav-red-dark hover:shadow-elegant text-white font-semibold py-3 rounded-lg transition-all duration-300">
                                Odeslat poptávku
                              </Button>
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsDialogOpen(false)}
                                className="px-6 border-2 border-gray-300 hover:border-gray-400"
                              >
                                Zavřít
                              </Button>
                            </div>
                          </form>
                        </div>
                      </>
                    ) : (
                      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 text-center">
                        <div className="text-5xl mb-3">✓</div>
                        <h4 className="font-bold mb-2 text-green-900 text-lg">Poptávka odeslána!</h4>
                        <p className="text-green-700 mb-6">Děkujeme za váš zájem. Ozveme se vám co nejdříve.</p>
                        <Button 
                          className="bg-gradient-to-r from-strawstav-red to-strawstav-red-dark text-white font-semibold px-6 py-2 rounded-lg hover:shadow-elegant transition-all duration-300" 
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
