import Preloader from "@/components/preloader"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import AnimatedLogo from "@/components/animated-logo"
import TimelineProjects from "@/components/timeline-projects"
import AnimatedStats from "@/components/animated-stats"
import BeforeAfterGallery from "@/components/before-after-gallery"
import BlogSection from "@/components/blog-section"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import ProcessFlow from "@/components/process-flow"
import FaqAccordion from "@/components/faq-accordion"
import BuildingCalculator from "@/components/building-calculator"
import { Building, Calendar, Users, Heart, Award, Hammer, FileText, PencilRuler, CheckCircle } from "lucide-react"

// Ukázková data projektů pro časovou osu
const projectsData = [
  {
    id: 1,
    year: 2018,
    title: "Bytový dům Praha",
    description: "Kompletní výstavba bytového domu s 24 jednotkami včetně podzemních garáží a zelené střechy.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Bytová výstavba",
    details: {
      client: "Městská část Praha 6",
      location: "Praha 6, Dejvice",
      team: "15 členů týmu",
      duration: "18 měsíců",
      awards: ["Stavba roku 2019 - finalista", "Cena za energetickou efektivitu"],
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
  {
    id: 2,
    year: 2019,
    title: "Rekonstrukce historické budovy",
    description:
      "Citlivá rekonstrukce památkově chráněného objektu v centru Brna s důrazem na zachování původních prvků.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Rekonstrukce",
    details: {
      client: "Národní památkový ústav",
      location: "Brno, historické centrum",
      team: "12 členů týmu",
      duration: "24 měsíců",
      awards: ["Cena za zachování historického dědictví"],
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
  {
    id: 3,
    year: 2020,
    title: "Průmyslový areál Ostrava",
    description: "Výstavba moderního průmyslového areálu s administrativní budovou a výrobními halami.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Průmyslové stavby",
    details: {
      client: "TechnoSteel s.r.o.",
      location: "Ostrava, průmyslová zóna",
      team: "25 členů týmu",
      duration: "14 měsíců",
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
  {
    id: 4,
    year: 2022,
    title: "Rezidenční komplex Plzeň",
    description: "Realizace luxusního rezidenčního komplexu s 50 bytovými jednotkami a relaxační zónou.",
    image: "/placeholder.svg?height=600&width=800",
    category: "Bytová výstavba",
    details: {
      client: "Plzeňské bydlení a.s.",
      location: "Plzeň, Slovany",
      team: "20 členů týmu",
      duration: "22 měsíců",
      awards: ["Nejlepší rezidenční projekt 2022 - Plzeňský kraj"],
      gallery: [
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
        "/placeholder.svg?height=600&width=800",
      ],
    },
  },
]

// Ukázková data pro statistiky
const statsCategories = [
  {
    id: "general",
    name: "Obecné statistiky",
    stats: [
      { value: 120, label: "Dokončených projektů", icon: <Building size={40} />, suffix: "+" },
      { value: 15, label: "Let zkušeností", icon: <Calendar size={40} /> },
      { value: 45, label: "Zaměstnanců", icon: <Users size={40} /> },
      { value: 98, label: "Spokojených klientů", icon: <Heart size={40} />, suffix: "%" },
    ],
  },
  {
    id: "projects",
    name: "Typy projektů",
    stats: [
      { value: 65, label: "Rodinných domů", icon: <Building size={40} /> },
      { value: 28, label: "Bytových domů", icon: <Building size={40} /> },
      { value: 15, label: "Komerčních objektů", icon: <Building size={40} /> },
      { value: 12, label: "Průmyslových staveb", icon: <Building size={40} /> },
    ],
  },
  {
    id: "awards",
    name: "Ocenění a certifikace",
    stats: [
      { value: 8, label: "Stavba roku", icon: <Award size={40} /> },
      { value: 12, label: "Odborných certifikací", icon: <Award size={40} /> },
      { value: 5, label: "Mezinárodních ocenění", icon: <Award size={40} /> },
      { value: 15, label: "Regionálních ocenění", icon: <Award size={40} /> },
    ],
  },
]

// Ukázková data pro galerii před a po
const beforeAfterProjects = [
  {
    id: 1,
    title: "Rekonstrukce koupelny",
    description: "Kompletní rekonstrukce koupelny včetně výměny všech zařizovacích předmětů a obkladů.",
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
    category: "Interiér",
    location: "Praha",
    date: "2022-05",
    client: "Rodina Novákových",
    additionalImages: [
      { before: "/placeholder.svg?height=600&width=800", after: "/placeholder.svg?height=600&width=800" },
      { before: "/placeholder.svg?height=600&width=800", after: "/placeholder.svg?height=600&width=800" },
    ],
  },
  {
    id: 2,
    title: "Fasáda bytového domu",
    description: "Renovace fasády bytového domu včetně zateplení a výměny oken.",
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
    category: "Exteriér",
    location: "Brno",
    date: "2021-09",
    client: "SVJ Brno-střed",
  },
  {
    id: 3,
    title: "Rekonstrukce kuchyně",
    description: "Modernizace kuchyně s novými spotřebiči a pracovní plochou.",
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
    category: "Interiér",
    location: "Ostrava",
    date: "2022-02",
    client: "Manželé Svobodovi",
  },
  {
    id: 4,
    title: "Revitalizace zahrady",
    description: "Kompletní úprava zahrady včetně terénních úprav a výsadby nové zeleně.",
    before: "/placeholder.svg?height=600&width=800",
    after: "/placeholder.svg?height=600&width=800",
    category: "Exteriér",
    location: "Plzeň",
    date: "2021-06",
    client: "Rodina Dvořákových",
  },
]

// Ukázková data pro blog
const blogArticles = [
  {
    id: 1,
    title: "Jak vybrat správný materiál pro stavbu rodinného domu",
    excerpt:
      "Výběr správného materiálu pro stavbu rodinného domu je klíčovým rozhodnutím, které ovlivní nejen cenu, ale i kvalitu a životnost stavby. V tomto článku vám poradíme, jak se v nabídce materiálů zorientovat.",
    image: "/placeholder.svg?height=600&width=800",
    date: "2023-05-15",
    readTime: 5,
    author: {
      name: "Ing. Jan Novák",
      avatar: "/placeholder.svg?height=100&width=100",
      position: "Hlavní architekt",
    },
    category: "Materiály",
    slug: "jak-vybrat-spravny-material",
  },
  {
    id: 2,
    title: "Pasivní domy: Budoucnost bydlení s minimální spotřebou energie",
    excerpt:
      "Pasivní domy představují moderní přístup k bydlení, který klade důraz na minimální spotřebu energie a maximální komfort. Zjistěte, jaké jsou výhody pasivního domu a zda je tato volba vhodná i pro vás.",
    image: "/placeholder.svg?height=600&width=800",
    date: "2023-04-22",
    readTime: 7,
    author: {
      name: "Ing. Petra Svobodová",
      avatar: "/placeholder.svg?height=100&width=100",
      position: "Energetický specialista",
    },
    category: "Energetika",
    slug: "pasivni-domy-budoucnost-bydleni",
  },
  {
    id: 3,
    title: "Trendy v interiérovém designu pro rok 2023",
    excerpt:
      "Jaké jsou aktuální trendy v interiérovém designu? Přinášíme vám přehled nejnovějších trendů, které budou dominovat v roce 2023. Od barev přes materiály až po nábytek a doplňky.",
    image: "/placeholder.svg?height=600&width=800",
    date: "2023-03-10",
    readTime: 4,
    author: {
      name: "Mgr. Lucie Černá",
      avatar: "/placeholder.svg?height=100&width=100",
      position: "Interiérová designérka",
    },
    category: "Design",
    slug: "trendy-v-interierovem-designu-2023",
  },
]

// Ukázková data pro reference
const testimonials = [
  {
    id: 1,
    client: "Jan Novák",
    company: "Novák Development",
    position: "Jednatel",
    text: "Spolupráce se STRAWSTAV byla bezproblémová od začátku až do konce. Oceňuji především profesionální přístup, dodržení termínů a vysokou kvalitu provedení. Určitě budeme spolupracovat i na dalších projektech.",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    projectType: "Bytový dům",
  },
  {
    id: 2,
    client: "Petra Svobodová",
    company: "SVJ Brno-střed",
    position: "Předsedkyně výboru",
    text: "Naše SVJ si vybralo společnost STRAWSTAV pro rekonstrukci fasády a výměnu oken. Výsledek předčil naše očekávání. Práce byly provedeny ve vysoké kvalitě a v dohodnutém termínu. Komunikace byla vždy rychlá a vstřícná.",
    image: "/placeholder.svg?height=200&width=200",
    rating: 5,
    projectType: "Rekonstrukce bytového domu",
  },
  {
    id: 3,
    client: "Martin Dvořák",
    company: "TechnoSteel s.r.o.",
    position: "Technický ředitel",
    text: "Pro naši společnost STRAWSTAV realizoval výstavbu nové výrobní haly. Oceňuji především flexibilitu při řešení změn v projektu a schopnost dodržet stanovený rozpočet. Spolupráce byla na vysoké profesionální úrovni.",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4,
    projectType: "Průmyslová hala",
  },
]

// Ukázková data pro proces spolupráce
const processSteps = [
  {
    icon: <PencilRuler size={32} />,
    title: "Návrh",
    description: "Vytvoříme návrh podle vašich požadavků a představ. Zohledníme všechny vaše potřeby a přání.",
  },
  {
    icon: <FileText size={32} />,
    title: "Projekt",
    description: "Zpracujeme kompletní projektovou dokumentaci včetně všech potřebných povolení a vyjádření.",
  },
  {
    icon: <Hammer size={32} />,
    title: "Realizace",
    description: "Provedeme stavbu podle schváleného projektu s důrazem na kvalitu a dodržení termínů.",
  },
  {
    icon: <CheckCircle size={32} />,
    title: "Předání",
    description: "Předáme vám hotovou stavbu včetně veškeré dokumentace a zaškolení pro užívání.",
  },
]

// Ukázková data pro FAQ
const faqQuestions = [
  {
    question: "Jak dlouho trvá výstavba rodinného domu?",
    answer:
      "Doba výstavby rodinného domu závisí na mnoha faktorech, jako je velikost, složitost projektu, použité materiály a technologie. Standardně se pohybuje v rozmezí 6-12 měsíců od zahájení stavby. V případě dřevostaveb může být doba kratší, přibližně 3-6 měsíců.",
    category: "Výstavba",
  },
  {
    question: "Jaké jsou výhody pasivního domu?",
    answer:
      "Pasivní dům nabízí několik významných výhod: výrazně nižší náklady na vytápění a chlazení (až o 90% oproti běžným stavbám), vyšší komfort bydlení díky stabilní teplotě a kvalitnímu vnitřnímu prostředí, ekologický provoz s minimálními emisemi CO2 a vyšší hodnotu nemovitosti na trhu. Počáteční investice je sice vyšší, ale vrátí se v průběhu užívání stavby.",
    category: "Energetika",
  },
  {
    question: "Poskytujete i služby v oblasti rekonstrukcí?",
    answer:
      "Ano, kromě nových staveb se specializujeme i na rekonstrukce. Nabízíme kompletní rekonstrukce bytů, rodinných domů, bytových domů i komerčních objektů. Zajistíme vše od návrhu přes stavební povolení až po realizaci. Specializujeme se také na rekonstrukce historických budov s důrazem na zachování původních prvků.",
    category: "Rekonstrukce",
  },
  {
    question: "Jak probíhá financování stavby?",
    answer:
      "Financování stavby obvykle probíhá formou postupných plateb podle předem dohodnutého harmonogramu. Standardně se platí záloha při podpisu smlouvy (obvykle 10-20% z celkové ceny) a dále jsou platby rozděleny podle dokončených etap stavby. Poslední platba (5-10%) je uhrazena po úspěšném předání stavby a odstranění případných vad a nedodělků.",
    category: "Finance",
  },
  {
    question: "Jaká je záruka na provedenou stavbu?",
    answer:
      "Na provedenou stavbu poskytujeme záruku v délce 60 měsíců (5 let) na stavební část a 24 měsíců (2 roky) na technologické části a zařízení. Záruka se vztahuje na vady způsobené chybou v projektu nebo v provedení stavby. Podmínkou záruky je provádění pravidelné údržby podle předaného manuálu užívání stavby.",
    category: "Záruka",
  },
  {
    question: "Zajišťujete i projekční činnost?",
    answer:
      "Ano, nabízíme kompletní projekční služby od studie přes projekt pro stavební povolení až po prováděcí dokumentaci. Naši projektanti mají bohaté zkušenosti s různými typy staveb a jsou schopni navrhnout řešení přesně podle vašich požadavků. Samozřejmostí je i inženýrská činnost pro získání potřebných povolení.",
    category: "Projektování",
  },
]

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Preloader />
      <div className="relative z-10">
        <Header />
        <Hero />
      </div>
      <AnimatedStats categories={statsCategories} />
      <Services />
      <ProcessFlow
        steps={processSteps}
        description="Podívejte se, jak probíhá spolupráce s námi od prvního kontaktu až po předání hotového díla."
      />
      <TimelineProjects projects={projectsData} />
      <BeforeAfterGallery projects={beforeAfterProjects} />
      <Gallery />
      <TestimonialsCarousel testimonials={testimonials} />
      <BlogSection articles={blogArticles} />
      <FaqAccordion questions={faqQuestions} />
      <BuildingCalculator />
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
