import { Suspense } from "react"
import Preloader from "@/app/components/preloader"
import Header from "@/app/components/header"
import Footer from "@/app/components/footer"
import PageRenderer from "@/app/components/page-renderer"
import { Skeleton } from "@/app/components/ui/skeleton"
import Hero from "@/app/components/hero"
import Services from "@/app/components/services"
import Gallery from "@/app/components/gallery"
import Contact from "@/app/components/contact"
import TimelineProjects from "@/app/components/timeline-projects"
import AnimatedStats from "@/app/components/animated-stats"
import BeforeAfterGallery from "@/app/components/before-after-gallery"
import BlogSection from "@/app/components/blog-section"
import TestimonialsCarousel from "@/app/components/testimonials-carousel"
import ProcessFlow from "@/app/components/process-flow"
import FaqAccordion from "@/app/components/faq-accordion"
import BackToTop from "@/app/components/back-to-top"
import { Building, Calendar, Users, Heart, Award, Hammer, FileText, PencilRuler, CheckCircle } from "lucide-react"
import { blogArticles } from "@/app/data/blog-articles"

// Data realizovaných projektů STRAWSTAV
const projectsData = [
  {
    id: 1,
    year: 2021,
    title: "Rekonstrukce rodinného domu",
    description: "Kompletní rekonstrukce rodinného domu včetně zateplení fasády, výměny oken a modernizace interiérů.",
    image: "/IMG_20210710_002649.jpg",
    category: "Rodinné domy - rekonstrukce",
    details: {
      client: "Soukromý investor",
      location: "Střední Čechy",
      team: "4 členové týmu",
      duration: "8 měsíců",
      awards: [],
      gallery: [
        "/IMG_20210710_002649.jpg",
        "/fasada_po.jpg",
        "/fasada_po1.jpg",
        "/fasada_po2.jpg",
        "/fasada_po3.jpg",
      ],
    },
  },
  {
    id: 2,
    year: 2023,
    title: "Fasádní práce bytového domu",
    description:
      "Kompletní sanace a rekonstrukce fasády bytového domu včetně odvlhčení zdiva a instalace ventilačního systému.",
    image: "/fasada_po.jpg",
    category: "Fasády a zateplení",
    details: {
      client: "SVJ Bytový dům",
      location: "Praha a okolí",
      team: "6 členů týmu",
      duration: "4 měsíce",
      awards: [],
      gallery: [
        "/fasada_pred.jpg",
        "/fasada_po.jpg",
        "/fasada_po4.jpg",
        "/fasada_po5.jpg",
      ],
    },
  },
  {
    id: 3,
    year: 2022,
    title: "Odvětrání suterénu",
    description: "Instalace odvětrávacího systému pro eliminaci vlhkosti v suterénních prostorách.",
    image: "/odvetravani_1.jpg",
    category: "Odvětrání a izolace",
    details: {
      client: "Správa nemovitostí",
      location: "Praha a okolí",
      team: "3 členové týmu",
      duration: "2 měsíce",
      gallery: [
        "/odvetravani_1.jpg",
        "/odvetravani_2.jpg",
        "/odvetravani_3.jpg",
        "/odvetravani_4.jpg",
        "/odvetravani_5.jpg",
      ],
    },
  },
  {
    id: 4,
    year: 2020,
    title: "Zemní práce a terénní úpravy",
    description: "Výkopové práce, příprava staveniště a terénní úpravy pro nové stavební projekty.",
    image: "/bagr.jpg",
    category: "Zemní práce",
    details: {
      client: "Různí klienti",
      location: "Střední Čechy",
      team: "5 členů týmu",
      duration: "Průběžně dle projektů",
      awards: [],
      gallery: [
        "/bagr.jpg",
        "/plosina.jpg",
      ],
    },
  },
]

// Statistiky firmy STRAWSTAV
const statsCategories = [
  {
    id: "general",
    name: "Naše úspěchy v číslech",
    stats: [
      { value: 85, label: "Dokončených projektů", icon: <Building size={30} />, suffix: "+", color: "from-strawstav-red to-red-700" },
      { value: 12, label: "Let zkušeností", icon: <Calendar size={30} />, color: "from-blue-500 to-blue-700" },
      { value: 15, label: "Kvalifikovaných pracovníků", icon: <Users size={30} />, color: "from-amber-500 to-amber-700" },
      { value: 95, label: "Spokojených klientů", icon: <Heart size={30} />, suffix: "%", color: "from-green-500 to-green-700" },
    ],
  },
  {
    id: "projects",
    name: "Specializace",
    stats: [
      { value: 35, label: "Rekonstrukcí domů", icon: <Building size={30} />, color: "from-strawstav-red to-red-800" },
      { value: 25, label: "Fasádních prací", icon: <Building size={30} />, color: "from-orange-400 to-orange-600" },
      { value: 15, label: "Zemních prací", icon: <Hammer size={30} />, color: "from-amber-600 to-amber-800" },
      { value: 10, label: "Správa nemovitostí", icon: <Building size={30} />, color: "from-blue-500 to-blue-700" },
    ],
  },
  {
    id: "services",
    name: "Služby",
    stats: [
      { value: 5, label: "Hlavních služeb", icon: <Award size={30} />, color: "from-purple-500 to-purple-700" },
      { value: 24, label: "Hodin denně k dispozici", icon: <Calendar size={30} />, suffix: "/7", color: "from-green-600 to-green-800" },
      { value: 100, label: "Bezpečnost práce", icon: <Award size={30} />, suffix: "%", color: "from-blue-500 to-blue-700" },
      { value: 2, label: "Roky záruky", icon: <Award size={30} />, color: "from-strawstav-red to-red-700" },
    ],
  },
]

// Před a po - realizované projekty
const beforeAfterProjects = [
  {
    id: 1,
    title: "Rekonstrukce fasády bytového domu",
    description:
      "Kompletní sanace a renovace poškozené fasády bytového domu včetně odvlhčení a instalace ventilačních otvorů.",
    before: "/fasada_pred.jpg",
    after: "/fasada_po.jpg",
    category: "Fasády",
    location: "Praha a okolí",
    date: "2023-04",
    client: "SVJ Bytový dům",
    additionalImages: [
      { before: "/fasada_pred1.jpg", after: "/fasada_po1.jpg" },
      { before: "/fasada_pred2.jpg", after: "/fasada_po2.jpg" },
      { before: "/fasada_pred3.jpg", after: "/fasada_po3.jpg" },
    ],
  },
  {
    id: 2,
    title: "Dokončení fasády s odvětráním",
    description: "Finální úpravy fasády s instalací odvětrávacího systému pro optimální vlhkost zdiva.",
    before: "/fasada_po3.jpg",
    after: "/fasada_po4.jpg",
    category: "Fasády",
    location: "Praha a okolí",
    date: "2023-05",
    client: "SVJ Bytový dům",
    additionalImages: [{ before: "/fasada_po4.jpg", after: "/fasada_po5.jpg" }],
  },
  {
    id: 3,
    title: "Instalace odvětrání v suterénu",
    description: "Profesionální řešení problému s vlhkostí v suterénních prostorách.",
    before: "/odvetravani_1.jpg",
    after: "/odvetravani_5.jpg",
    category: "Odvětrání",
    location: "Střední Čechy",
    date: "2022-08",
    client: "Správa nemovitostí",
  },
]

// Reference od našich klientů
const testimonials = [
  {
    id: 1,
    client: "Marie Novotná",
    company: "SVJ Rezidenční dům",
    position: "Předsedkyně výboru",
    text: "S firmou STRAWSTAV jsme spolupracovali na rekonstrukci fasády našeho bytového domu. Vše proběhlo přesně podle plánu, komunikace byla vždy jasná a výsledek překonal naše očekávání. Velmi doporučujeme!",
    image: "/client1.jpg",
    rating: 5,
    projectType: "Rekonstrukce fasády",
  },
  {
    id: 2,
    client: "Tomáš Prokůpek",
    company: "Správa nemovitostí Praha",
    position: "Technický manažer",
    text: "STRAWSTAV pro nás řešil problémy s vlhkostí v suterénech několika objektů. Jejich řešení s odvětrávacími systémy bylo velmi účinné. Profesionální přístup a kvalitní práce.",
    image: "/client2.jpg",
    rating: 5,
    projectType: "Odvětrání suterénů",
  },
  {
    id: 3,
    client: "Jiří Starý",
    company: "Soukromý investor",
    position: "Vlastník nemovitosti",
    text: "Rekonstrukce našeho rodinného domu proběhla bez problémů. Oceňujeme zejména dodržení termínů a rozpočtu. Tým STRAWSTAV byl vždy připraven řešit jakékoliv otázky nebo problémy.",
    image: "/client3.jpg",
    rating: 4,
    projectType: "Rekonstrukce rodinného domu",
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

// Často kladené otázky
const faqQuestions = [
  {
    question: "Jaké služby nabízíte?",
    answer:
      "Nabízíme komplexní stavební služby zahrnující rekonstrukce rodinných domů, fasádní práce, odvlhčování a odvětrání, zemní práce, úklid bytových domů, správu nemovitostí a údržbu zeleně. Všechny práce provádíme s důrazem na kvalitu a dodržení termínů.",
    category: "Služby",
  },
  {
    question: "Jak řešíte problémy s vlhkostí?",
    answer:
      "Problémy s vlhkostí řešíme komplexně pomocí moderních odvětrávacích systémů. Nejdříve provedeme odbornou diagnostiku příčiny vlhkosti, následně navrhneme optimální řešení. Instalujeme ventilační systémy, které zajišťují trvalé odstranění vlhkosti a předcházejí vzniku plesní.",
    category: "Odvětrání",
  },
  {
    question: "Jak dlouho trvá rekonstrukce fasády?",
    answer:
      "Doba rekonstrukce fasády závisí na velikosti objektu a rozsahu prací. Běžná rekonstrukce fasády rodinného domu trvá 2-4 týdny, u bytových domů 1-3 měsíce. Při komplexních rekonstrukcích včetně zateplení a výměny oken může být doba delší.",
    category: "Rekonstrukce",
  },
  {
    question: "Jak probíhá spolupráce a platby?",
    answer:
      "Spolupráce začíná nezaváznou konzultací a oceněním. Po schválení nabídky uzavírame smlouvu a dohodneme se na harmonogramu prací. Platby probíhají postupně podle dokončených etap. Záloha při podpisu smlouvy činí obvykle 30% z celkové ceny.",
    category: "Finance",
  },
  {
    question: "Jaká je záruka na vaše práce?",
    answer:
      "Na všechny naše práce poskytujeme záruku 24 měsíců (2 roky). Záruka se vztahuje na vady způsobené chybou v provedení prác. U fasádních prací a odvětrávacích systémů poskytujeme rozšířenou záruku na funkčnost systému. Vždy jsme připraveni rychle řešit jakékoliv reklamace.",
    category: "Záruka",
  },
  {
    question: "Poskytujete i poradenství a konzultace?",
    answer:
      "Ano, nabízíme bezplatné konzultace a poradenství v oblasti stavebních prací. Naši odborníci vám pomohou vybrat nejlepší řešení pro váš projekt, poradí s výběrem materiálů a technologií. Každý projekt začínáme důkladnou analýzou a návrhem řešení.",
    category: "Konzultace",
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
      {/* Dynamický obsah zatím odstraněn */}
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
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  )
}
