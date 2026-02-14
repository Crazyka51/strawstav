"use client"

import type React from "react"

import { useRef, type FormEvent, useState } from "react"
import { useSafeEffect } from "@/hooks/use-safe-effect"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Phone, Mail, MapPin } from "lucide-react"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  useSafeEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate section title
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      },
    )

    // Animate form
    gsap.fromTo(
      formRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      },
    )

    // Animate contact info
    gsap.fromTo(
      infoRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      },
    )

    // Animate contact icons on hover
    const icons = document.querySelectorAll(".contact-icon")
    icons.forEach((icon) => {
      const element = icon as HTMLElement
      element.addEventListener("mouseenter", () => {
        gsap.to(element, { scale: 1.2, duration: 0.3 })
      })
      element.addEventListener("mouseleave", () => {
        gsap.to(element, { scale: 1, duration: 0.3 })
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage("Děkujeme za zprávu! Budeme vás kontaktovat co nejdříve.")
      setFormData({ name: "", email: "", phone: "", message: "" })

      // Clear message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("")
      }, 5000)
    }, 1500)
  }

  return (
    <section id="kontakt" ref={sectionRef} className="py-20 bg-gradient-to-b from-white via-strawstav-gray-light to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-strawstav-red opacity-5 rounded-full translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-strawstav-red opacity-5 rounded-full -translate-x-1/2 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 ref={titleRef} className="section-title">
          <span className="section-title-border">
            Kontaktujte nás
          </span>
        </h2>

        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16 text-lg">
          Máte zájem o naše služby? Neváhejte nás kontaktovat. Rádi bychom vám pomohli s vaším projektem.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-elegant">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Jméno a příjmení
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="contact-input"
                placeholder="Jakub Novák"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                E-mailová adresa
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="contact-input"
                placeholder="jakub@example.cz"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-2">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="contact-input"
                placeholder="+420 602 123 456"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                Vaše zpráva
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="contact-input resize-none"
                placeholder="Popište vaši poptávku..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="contact-button flex items-center justify-center font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  Odesílání...
                </>
              ) : (
                "Odeslat zprávu"
              )}
            </button>

            {submitMessage && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 rounded-xl border-2 border-green-200 font-medium">
                ✓ {submitMessage}
              </div>
            )}
          </form>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8">
            {/* Phone */}
            <div className="bg-white p-6 rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="contact-icon bg-gradient-to-br from-strawstav-red to-strawstav-red-dark p-4 rounded-xl text-white flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Telefon</h3>
                  <p className="text-gray-600 text-lg">
                    <a href="tel:+420602766755" className="hover:text-strawstav-red transition-colors duration-300 font-semibold">
                      +420 602 766 755
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="contact-icon bg-gradient-to-br from-strawstav-red to-strawstav-red-dark p-4 rounded-xl text-white flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">E-mail</h3>
                  <p className="text-gray-600 text-lg">
                    <a href="mailto:info@strawstav.cz" className="hover:text-strawstav-red transition-colors duration-300 font-semibold">
                      info@strawstav.cz
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white p-6 rounded-2xl shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="contact-icon bg-gradient-to-br from-strawstav-red to-strawstav-red-dark p-4 rounded-xl text-white flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Adresa</h3>
                  <p className="text-gray-600 leading-relaxed">
                    STRAWSTAV S.R.O.<br />
                    Prvního pluku 320/17<br />
                    Karlín, 186 00, Praha 8
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 h-80 rounded-2xl overflow-hidden shadow-elegant border-2 border-gray-100 hover:shadow-elegant-lg transition-all duration-300">
              <a 
                href="https://www.openstreetmap.org/?mlat=50.09121814453243&mlon=14.441955517554467&zoom=17" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block w-full h-full group"
                title="Zobrazit sídlo firmy na OpenStreetMap"
              >
                <iframe 
                  src="https://www.openstreetmap.org/export/embed.html?bbox=14.436934590339662%2C50.08868590210622%2C14.446976444769546%2C50.0937495801953&amp;layer=mapnik&amp;marker=50.09121814453243%2C14.441955517554467" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  title="Mapa sídla firmy STRAWSTAV S.R.O."
                  aria-label="Interaktivní mapa sídla firmy STRAWSTAV S.R.O. na OpenStreetMap"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 pointer-events-none">
                  <span className="text-white font-semibold bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                    Klikněte pro úplnou mapu
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
