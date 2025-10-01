// Typy pro blogové články
export interface BlogArticle {
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
  content?: string // Kompletní obsah článku pro detail stránku
}

// Data blogových článků
export const blogArticles: BlogArticle[] = [
  {
    id: 1,
    title: "Fasádní práce: Kdy je čas na rekonstrukci?",
    excerpt:
      "Fasáda domu není jen estetická záležitost, ale také důležitá ochrana stavby. Jak poznat, kdy je čas na rekonstrukci fasády a jak postupovat? V článku najdete praktické rady od našich odborníků.",
    image: "/fasada_po.jpg",
    date: "2023-09-15",
    readTime: 6,
    author: {
      name: "Pavel Sláma",
      avatar: "/author-pavel.jpg",
      position: "Vedoucí stavebních prací",
    },
    category: "Fasády",
    slug: "fasady-kdy-rekonstrukce",
    content: `
# Fasádní práce: Kdy je čas na rekonstrukci?

Fasáda vašeho domu je mnohem více než jen estetický prvek – je to důležitá ochranná vrstva, která chrání celou stavbu před povětrnostními vlivy, vlhkostí a tepelnými ztrátami. Včasná údržba a případná rekonstrukce fasády jsou klíčové pro dlouhodobou životnost budovy.

## Jak poznat, že je čas na rekonstrukci fasády?

Existuje několik jasných signálů, které naznačují, že vaše fasáda potřebuje odbornou péči:

### 1. Praskliny a odlupující se omítka
Drobné praskliny mohou být na první pohled neškodné, ale časem se rozšiřují a umožňují vnikání vlhkosti do zdiva. Odlupující se omítka je pak jasným varováním, že fasáda ztrácí svou ochrannou funkci.

### 2. Viditelná vlhkost a plísně
Tmavé skvrny, plísně nebo řasy na fasádě jsou znamením, že fasáda není dostatečně vodoodpudivá. Vlhkost pronikající do zdiva může způsobit vážné konstrukční problémy.

### 3. Vybledlá barva
Ačkoliv vyblednutí barvy může působit jen jako kosmetický problém, často signalizuje degradaci povrchové úpravy fasády. Stará barva ztrácí své ochranné vlastnosti.

### 4. Zvýšené tepelné ztráty
Pokud zaznamenáváte výrazně vyšší náklady na vytápění, může to být způsobeno nedostatečnou tepelnou izolací fasády.

## Proces rekonstrukce fasády

Rekonstrukce fasády vyžaduje odborný přístup a precizní provedení:

1. **Diagnostika stavu** - Odborné posouzení aktuálního stavu fasády
2. **Návrh řešení** - Výběr vhodných materiálů a technologií
3. **Příprava podkladu** - Očištění, opravy, penetrace
4. **Zateplení** - Pokud je potřeba, aplikace izolačního systému
5. **Finální úprava** - Aplikace omítek a barev

## Proč zvolit STRAWSTAV?

Naše firma má dlouholeté zkušenosti s rekonstrukcí fasád všech typů budov. Používáme pouze kvalitní certifikované materiály a postupujeme podle nejnovších technologických standardů. Každý projekt realizujeme s důrazem na detail a spokojenost klienta.

Máte pochybnosti o stavu vaší fasády? Kontaktujte nás pro nezávaznou konzultaci a cenovou nabídku.
    `,
  },
  {
    id: 2,
    title: "Problémy s vlhkostí? Řešením je odvětrání",
    excerpt:
      "Vlhkost v suterénu nebo přízemních prostorách může způsobit vážné škody. Jak účinně řešit problémy s vlhkostí pomocí moderních odvětrávacích systémů? Praktické rady a řešení od STRAWSTAV.",
    image: "/odvetravani_1.jpg",
    date: "2023-07-10",
    readTime: 5,
    author: {
      name: "Pavel Sláma",
      avatar: "/author-pavel.jpg",
      position: "Technický specialista",
    },
    category: "Odvětrání",
    slug: "problemy-s-vlhkosti-resenim-odvetravani",
    content: `
# Problémy s vlhkostí? Řešením je odvětrání

Vlhkost v budově je problém, který není radno podceňovat. Může vést k rozvoji plísní, poškození stavebních konstrukcí a zhoršení kvality vzduchu v interiéru. Moderní odvětrávací systémy nabízejí účinné řešení těchto problémů.

## Příčiny vzniku vlhkosti

Vlhkost v budovách může mít různé příčiny:

### Vzlínání vlhkosti ze země
Klasický problém starších budov bez kvalitní hydroizolace. Vlhkost z půdy postupně proniká do zdiva a šíří se směrem nahoru.

### Nedostatečné větrání
Moderní těsná okna a dveře sice šetří energii, ale mohou způsobit nedostatečnou výměnu vzduchu a kondenzaci vlhkosti.

### Poškozená hydroizolace
Praskliny ve spodní stavbě nebo poškozená izolace umožňují vnikání vody do konstrukce.

## Řešení: Efektivní odvětrávací systémy

Profesionálně navržený odvětrávací systém dokáže účinně řešit problémy s vlhkostí:

### 1. Mechanické odvětrávání
Systém s ventilátory zajišťuje pravidelnou výměnu vzduchu a odvádí vlhkost z problematických prostor.

### 2. Tlakové odvětrání
Vytváří mírný přetlak v prostoru, který brání vzlínání vlhkosti ze země.

### 3. Přirozené odvětrání
Správně umístěné větrací otvory využívají přirozený proudění vzduchu.

## Naše služby

STRAWSTAV nabízí komplexní řešení problémů s vlhkostí:

- Diagnostika příčin vlhkosti
- Návrh optimálního odvětrávacího systému
- Profesionální instalace
- Servis a údržba systémů

Neváhejte nás kontaktovat pro konzultaci. Pomůžeme vám najít nejvhodnější řešení pro váš konkrétní případ.
    `,
  },
  {
    id: 3,
    title: "Zemní práce: Základ každé úspěšné stavby",
    excerpt:
      "Správně provedené zemní práce jsou základem každé kvalitní stavby. Co vše zahrnují zemní práce a proč je důležité svěřit je odborníkům? Seznamte se s našimi službami v oblasti zemních prací.",
    image: "/bagr.jpg",
    date: "2023-05-20",
    readTime: 4,
    author: {
      name: "Pavel Sláma",
      avatar: "/author-pavel.jpg",
      position: "Vedoucí zemních prací",
    },
    category: "Zemní práce",
    slug: "zemni-prace-zaklad-uspesne-stavby",
    content: `
# Zemní práce: Základ každé úspěšné stavby

Přestože zemní práce nejsou tou nejviditelnější částí stavby, jsou naprosto klíčové pro její stabilitu a dlouhou životnost. Špatně provedené základy nebo nedostatečná příprava terénu mohou vést k vážným problémům v budoucnosti.

## Co zahrnují zemní práce?

Zemní práce jsou široká kategorie stavebních činností:

### Výkopy
- Výkopy pro základy budov
- Rýhy pro inženýrské sítě
- Jámy pro bazény nebo nádrže
- Terénní úpravy

### Přesun a úprava zeminy
- Odstranění ornice
- Navážky a vyrovnání terénu
- Hutně podkladních vrstev
- Odvoz přebytečné zeminy

### Bourací práce
- Demolice starých staveb
- Odstranění starých základů
- Likvidace zpevněných ploch

## Proč je důležitá odbornost?

Zemní práce vyžadují:

1. **Správné posouzení půdních podmínek** - Různé typy půd vyžadují odlišný přístup
2. **Přesné měření a vytyčení** - Základy musí být v přesných pozicích
3. **Znalost bezpečnostních předpisů** - Práce s těžkou technikou je riziková
4. **Správnou techniku** - Kvalitní a pravidelně servisované stroje

## Naše služby v oblasti zemních prací

STRAWSTAV disponuje moderní technikou a zkušeným týmem:

- Kompletní zemní práce pro novostavby
- Terénní úpravy
- Výkopy a rýhy
- Bourací práce
- Odvoz a likvidace materiálu

Máte v plánu stavbu nebo rekonstrukci? Kontaktujte nás pro nezávaznou cenovou nabídku na zemní práce.
    `,
  },
]

// Funkce pro získání článku podle slug
export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug)
}

// Funkce pro získání souvisejících článků
export function getRelatedArticles(currentSlug: string, limit: number = 3): BlogArticle[] {
  return blogArticles.filter((article) => article.slug !== currentSlug).slice(0, limit)
}
