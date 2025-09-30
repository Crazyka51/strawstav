# Popis komponent ve složce `app/components` a `app/components/ui`

Tento soubor popisuje účel a použití jednotlivých komponent v projektu. Každá komponenta má stručný popis, k čemu slouží na stránce.

## Hlavní komponenty (`app/components`)

- **advanced-logo-editor.tsx** – Pokročilý editor loga STRAWSTAV. Umožňuje detailní nastavení pozic, velikostí a animací jednotlivých vrstev loga a generuje kód pro použití v aplikaci.
- **animated-logo.tsx** – Komponenta pro animované zobrazení loga STRAWSTAV. Zajišťuje animaci jednotlivých částí loga při načtení nebo na hover.
- **animated-stats.tsx** – Sekce s animovanými statistikami. Zobrazuje čísla/statistiky s animací při scrollu a umožňuje přepínání kategorií.
- **before-after-gallery.tsx** – Galerie před/po. Umožňuje porovnat fotografie projektů před a po realizaci pomocí slideru.
- **blog-section.tsx** – Výpis článků/blogu s animacemi při scrollu. Slouží k prezentaci novinek a článků.
- **building-calculator.tsx** – Kalkulačka orientační ceny stavby. Uživatel zadá parametry a získá odhad ceny stavby.
- **contact.tsx** – Kontaktní sekce s formulářem pro odeslání zprávy a kontaktními údaji.
- **faq-accordion.tsx** – Accordion pro často kladené dotazy (FAQ). Umožňuje vyhledávání a filtrování otázek podle kategorií.
- **footer.tsx** – Patka webu s kontakty, odkazy a informacemi o firmě.
- **gallery.tsx** – Galerie referenčních projektů s obrázky a popisy.
- **header.tsx** – Hlavička webu s logem a navigací.
- **hero.tsx** – Úvodní sekce stránky s hlavním sloganem, animací a tlačítkem.
- **json-generator.tsx** – Generátor JSON konfigurací pro různé části webu.
- **logo-editor.tsx** – Jednodušší editor loga STRAWSTAV. Umožňuje nastavit pozice vrstev loga a vygenerovat kód.
- **logo-svg.tsx** – SVG varianta loga STRAWSTAV.
- **logo.tsx** – Komponenta pro zobrazení finálního loga STRAWSTAV.
- **page-renderer.tsx** – Komponenta pro dynamické vykreslování obsahu stránky podle konfigurace.
- **preloader.tsx** – Preloader s animací loga, který se zobrazuje při načítání stránky.
- **process-flow.tsx** – Komponenta pro zobrazení postupu/spolupráce formou kroků s animacemi.
- **projects-map.tsx** – Mapa realizovaných projektů s možností výběru a zobrazení detailu projektu.
- **services.tsx** – Výpis nabízených služeb s ikonami a animacemi.
- **testimonials-carousel.tsx** – Carousel s referencemi a hodnoceními klientů.
- **theme-provider.tsx** – Poskytovatel tématu (světlý/tmavý režim) pro celý web.
- **timeline-projects.tsx** – Časová osa projektů. Zobrazuje projekty v chronologickém pořadí s animacemi.

## UI komponenty (`app/components/ui`)

Tyto komponenty slouží jako stavební bloky pro tvorbu uživatelského rozhraní. Většina z nich je založena na knihovně Radix UI a poskytuje stylované a přístupné prvky:

- **accordion.tsx** – Skládací sekce (accordion) pro zobrazování/skrytí obsahu.
- **alert-dialog.tsx** – Dialogové okno pro upozornění a potvrzení akcí.
- **alert.tsx** – Komponenta pro zobrazení upozornění.
- **aspect-ratio.tsx** – Udržuje poměr stran pro obrázky/videa.
- **avatar.tsx** – Komponenta pro zobrazení uživatelského avataru.
- **badge.tsx** – Odznak pro zvýraznění informace (např. štítek kategorie).
- **breadcrumb.tsx** – Navigační „drobečková“ lišta.
- **button.tsx** – Stylované tlačítko.
- **calendar.tsx** – Komponenta pro výběr data.
- **card.tsx** – Karta pro oddělení obsahu (např. v galeriích, kalkulačce).
- **carousel.tsx** – Carousel pro posouvání obsahu (např. reference).
- **chart.tsx** – Komponenta pro zobrazení grafů.
- **checkbox.tsx** – Zaškrtávací políčko.
- **collapsible.tsx** – Komponenta pro skládací sekce.
- **command.tsx** – Komponenta pro příkazovou paletu.
- **context-menu.tsx** – Kontextové menu (pravé tlačítko myši).
- **dialog.tsx** – Dialogové okno (modal).
- **drawer.tsx** – Vysouvací panel (např. menu z boku).
- **dropdown-menu.tsx** – Rozbalovací menu.
- **form.tsx** – Komponenta pro formuláře.
- **hover-card.tsx** – Karta zobrazující se při najetí myší.
- **input-otp.tsx** – Vstup pro jednorázové kódy (OTP).
- **input.tsx** – Textové pole pro zadávání údajů.
- **label.tsx** – Popisek k formulářovým prvkům.
- **menubar.tsx** – Horizontální menu.
- **navigation-menu.tsx** – Navigační menu s více úrovněmi.
- **pagination.tsx** – Stránkování obsahu.
- **popover.tsx** – Vyskakovací okno (tooltip s větším obsahem).
- **progress.tsx** – Indikátor průběhu.
- **radio-group.tsx** – Skupina radio buttonů.
- **resizable.tsx** – Komponenta pro změnu velikosti panelů.
- **scroll-area.tsx** – Oblast s vlastním scrollbarem.
- **select.tsx** – Rozbalovací výběrové pole.
- **separator.tsx** – Oddělovač obsahu.
- **sheet.tsx** – Vysouvací panel (podobné draweru).
- **sidebar.tsx** – Boční panel/navigace.
- **skeleton.tsx** – Skeleton loader (placeholder při načítání).
- **slider.tsx** – Posuvník (např. pro nastavení hodnoty).
- **sonner.tsx** – Komponenta pro toast notifikace.
- **switch.tsx** – Přepínač (on/off).
- **table.tsx** – Tabulka.
- **tabs.tsx** – Záložky pro přepínání obsahu.
- **textarea.tsx** – Vstupní pole pro víceřádkový text.
- **toast.tsx** – Toast notifikace.
- **toaster.tsx** – Kontejner pro toast notifikace.
- **toggle-group.tsx** – Skupina přepínacích tlačítek.
- **toggle.tsx** – Přepínací tlačítko.
- **tooltip.tsx** – Tooltip (nápověda při najetí).
- **use-mobile.tsx** – Hook pro detekci mobilního zařízení.
- **use-toast.ts** – Hook pro práci s toast notifikacemi.

---

Tento přehled slouží pro rychlou orientaci v projektu a pochopení, jaké komponenty jsou k dispozici a k čemu slouží.
