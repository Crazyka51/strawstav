import Preloader from "@/components/preloader"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import AnimatedLogo from "@/components/animated-logo"

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Preloader />
      <Header />
      <Hero />
      <Services />
      <Gallery />
      <Contact />
      <Footer />

      {/* Ukázka animovaného loga, které se spustí při najetí myší */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Naše logo</h2>
          <div className="flex justify-center">
            <AnimatedLogo width={300} height={150} onHover={true} />
          </div>
        </div>
      </section>
    </main>
  )
}
