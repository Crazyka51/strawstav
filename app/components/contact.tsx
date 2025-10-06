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
    <section id="kontakt" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 ref={titleRef} className="section-title">
          <span className="section-title-border">
            Kontaktujte nás
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
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
                placeholder="Vaše jméno"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="contact-input"
                placeholder="vas@email.cz"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="contact-input"
                placeholder="+420 123 456 789"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Zpráva
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="contact-input"
                placeholder="Vaše zpráva..."
              ></textarea>
            </div>

            <button type="submit" disabled={isSubmitting} className="contact-button flex items-center justify-center">
              {isSubmitting ? "Odesílání..." : "Odeslat zprávu"}
            </button>

            {submitMessage && <div className="bg-green-50 text-green-800 p-4 rounded-md">{submitMessage}</div>}
          </form>

          <div ref={infoRef} className="space-y-8">
            <div className="flex items-start">
              <div className="contact-icon bg-strawstav-red bg-opacity-10 p-3 rounded-full mr-4">
                <Phone className="text-strawstav-red" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Telefon</h3>
                <p className="text-gray-600">+420 602 766 755</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="contact-icon bg-strawstav-red bg-opacity-10 p-3 rounded-full mr-4">
                <Mail className="text-strawstav-red" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">E-mail</h3>
                <p className="text-gray-600">info@strawstav.cz</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="contact-icon bg-strawstav-red bg-opacity-10 p-3 rounded-full mr-4">
                <MapPin className="text-strawstav-red" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Adresa</h3>
                <p className="text-gray-600">
                  STRAWSTAV S.R.O.
                  <br />
                  Prvního pluku 320/17
                  <br />
                  Karlín, 186 00, Praha 8
                </p>
              </div>
            </div>

            <div className="mt-8 h-64 rounded-lg overflow-hidden shadow-md border border-gray-200">
              <a 
                href="https://www.openstreetmap.org/?mlat=50.09121814453243&mlon=14.441955517554467&zoom=17" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block w-full h-full"
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
                <div className="absolute top-0 left-0 right-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-20 text-white p-2 text-center">
                  Klikněte pro zobrazení na OpenStreetMap
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
