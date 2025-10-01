# Blog Structure Documentation

## Přehled struktury blogu

Blogový systém je implementován pomocí Next.js App Router a zahrnuje:

### Soubory a složky

```
app/
├── data/
│   └── blog-articles.ts     # Centralizovaná data všech článků
├── blog/
│   ├── page.tsx             # Seznam všech článků (/blog)
│   └── [slug]/
│       └── page.tsx         # Detail jednotlivého článku (/blog/[slug])
└── page.tsx                 # Hlavní stránka (používá data z blog-articles.ts)
```

### Datová struktura

**blog-articles.ts** obsahuje:
- `BlogArticle` interface - Typová definice pro blogové články
- `blogArticles` array - Pole všech článků s kompletními daty
- `getArticleBySlug()` - Funkce pro získání článku podle slug
- `getRelatedArticles()` - Funkce pro získání souvisejících článků

### Vlastnosti článku

Každý článek obsahuje:
- `id` - Unikátní identifikátor
- `title` - Nadpis článku
- `excerpt` - Krátký úvodní text (zobrazuje se v seznamu)
- `image` - Hlavní obrázek článku
- `date` - Datum publikace (formát: YYYY-MM-DD)
- `readTime` - Odhadovaný čas čtení v minutách
- `author` - Informace o autorovi (jméno, avatar, pozice)
- `category` - Kategorie článku
- `slug` - URL slug pro article (použito v routingu)
- `content` - Plný obsah článku (markdown formát, volitelné)

### Použití

#### Přidání nového článku

1. Otevřete `app/data/blog-articles.ts`
2. Přidejte nový objekt do pole `blogArticles`
3. Vyplňte všechny požadované vlastnosti
4. Ujistěte se, že `slug` je unikátní

Příklad:
```typescript
{
  id: 4,
  title: "Název nového článku",
  excerpt: "Krátký popis článku...",
  image: "/cesta-k-obrazku.jpg",
  date: "2024-01-15",
  readTime: 5,
  author: {
    name: "Jméno Autora",
    avatar: "/cesta-k-avataru.jpg",
    position: "Pozice",
  },
  category: "Kategorie",
  slug: "nazev-noveho-clanku",
  content: `
# Nadpis článku

Váš obsah zde...
  `,
}
```

#### Formátování obsahu článku

Obsah článku (`content`) podporuje jednoduchý markdown:
- `# Nadpis` - Hlavní nadpis (H1)
- `## Podnadpis` - Podnadpis (H2)
- `### Podnadpis 3. úrovně` - Menší podnadpis (H3)
- `- Položka` - Odrážkový seznam
- `1. Položka` - Číslovaný seznam
- Prázdné řádky vytvářejí odstavce

### Stránky

#### /blog
- Zobrazuje všechny články v mřížce (grid layout)
- Animace při scrollování pomocí GSAP
- Tlačítko zpět na hlavní stránku
- Proklik na detail každého článku

#### /blog/[slug]
- Detail jednotlivého článku
- Hero sekce s velkým obrázkem
- Meta informace (autor, datum, čas čtení)
- Kompletní obsah článku
- CTA sekce pro kontakt
- Související články (až 3)
- Tlačítko zpět na seznam článků
- Možnost sdílení (pokud prohlížeč podporuje Web Share API)

### Styly a animace

- Použití Tailwind CSS pro konzistentní design
- GSAP animace pro plynulé efekty při scrollování
- Responzivní design (mobile-first)
- Hover efekty na kartách článků

### Navigace

- Z hlavní stránky (`/`) -> tlačítko "Všechny články" -> `/blog`
- Z blogu (`/blog`) -> tlačítko "Číst článek" -> `/blog/[slug]`
- Z detailu (`/blog/[slug]`) -> tlačítko "Zpět na blog" -> `/blog`
- Z detailu (`/blog/[slug]`) -> Související články -> `/blog/[jiný-slug]`
