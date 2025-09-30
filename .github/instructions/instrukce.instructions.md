applyTo: "**/*.ts,**/*.tsx"
```
# Základní pokyny před zahájením generování kódu
- Před generováním kódu se ujisti, že jsi se seznámil s existujícím kódem a architekturou projektu složka app/ a všech podsložek - app/blog app/o-mne app/pojistovaci-poradce app/projekty app/schuzka app/sluzby app/webovy-vyvojar. Musíš mít jasný přehled o obsahu každého souboru v těchto složkách
- Každý soubor ve složce analyzuješ, nikdy nebudeš odhadovat co pravděpodobně bude v souboru. Musíš mít jasný přehled o obsahu každého souboru. To znamená projít všechny řádky v každém souboru  - toto je důležité pro pochopení struktury a logiky projektu.
- Důležité dodržet globální volání footer,header, a efekty na backgroundu.
- Po přečtení pokynů vypiš , že jsi si pokyny přečetl a rozumíš jim a konkrétně vypiš co jsi si zapamatoval a na co má být kladen důraz.
# Project coding standards for TypeScript and React

## Základní pokyny
- Při generování kódu vždy dodržuj čistý a přehledný styl.
používej **ESLint** a **Prettier** pro formátování kódu. Používej **ESLint** s pravidly pro TypeScript a React. 
- Analyzuj strukturu kódu a dodržuj konvence pro pojmenovávání proměnných, funkcí a komponent. 
- Vždy se nejprve seznam s existujícím kódem a architekturou projektu, než začneš generovat nový kód.
- Používej **TypeScript** a favorizuj funkcionální programovací principy, kde je to možné.
- Komentuj klíčové části kódu a udržuj dokumentaci aktuální.
- Pokud generuješ kód pro **React**, používej funkční komponenty a dodržuj pravidla pro **hooks**.
- Implementuj odpovídající testy a **error handling**.

---


applyTo: "**/*.tsx,**/*.ts"
## Pokyny pro TypeScript a React
- Používej **PascalCase** pro názvy komponent, interface a typ aliasy.
- Názvy proměnných a funkcí drž v **camelCase**; soukromé členy předcházej podtržítkem (`_`).
- Optimalizuj **error handling** pomocí `try/catch` bloků u asynchronních operací.
- Implementuj testy a validaci vstupů s využitím knihoven jako `react-hook-form` a `yup`.
- Udržuj kód modularizovaný a přehledný a řádně komentuj všechny důležité části. Pokud komentáře chybí, přidej je.
- Každá nová stránka má globálně definovaný layout, který se aplikuje na všechny stránky. Globálně je volán header,footer, není třeba je psát do každé stránky.
---

# Další pokyny pro projekt



## Zásady pro práci s Tailwind CSS
- Používej utility třídy Tailwind CSS pro styling.
- Pokud je potřeba přidat vlastní třídy, uprav `tailwind.config.ts`.
- Vyhýbej se přetížení globálních stylů.

## Testování
- Používej `Jest` a `React Testing Library` pro testování komponent a stránek.
- Každá nová funkce nebo komponenta by měla mít odpovídající testy.

## Práce s knihovnami
- Dodržuj standardy pro knihovny jako `react-hook-form` a `yup`.
- Validace vstupů by měla být implementována konzistentně.

## Práce s animacemi
- Pro animace používej existující komponenty jako `animated-background.tsx` nebo `animated-counter.tsx`.
- Nové animace by měly být modularizované a znovupoužitelné.

## Optimalizace obrázků
- Používej `image-optimization.ts` pro optimalizaci obrázků.
- Obrázky ukládej do složky `public/images/`.

## Práce s kontextem
- Pro sdílení stavu mezi komponentami používej `toast-context.tsx` nebo vytvoř nový kontext.

## Práce s layoutem
- Nové stránky by měly používat globální layout definovaný v `app/layout.tsx`.
- Zajisti konzistenci mezi stránkami.

## Práce s assets
- Nové statické soubory ukládej do složky `public/`.
- Používej relativní cesty pro odkazování na assets.

## Práce s knihovnou `lib/utils.ts`
- Znovupoužitelné funkce by měly být přidány do `lib/utils.ts`.
- Před přidáním nové funkce zkontroluj, zda již podobná funkce neexistuje.
```

