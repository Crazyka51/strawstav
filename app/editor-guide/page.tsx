import { Button } from "@/app/components/ui/button"
import Link from "next/link"
import {
  Settings,
  Layers,
  PlusCircle,
  Edit,
  Eye,
  Save,
  Undo,
  Redo,
  Download,
  Upload,
  Trash2,
  Move,
  Copy,
  Code,
  Layout,
  Type,
  ImageIcon,
  FileText,
  Palette,
  Globe,
} from "lucide-react"

export default function EditorGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4 text-strawstav-red">Příručka k editoru stránek STRAWSTAV</h1>
        <p className="text-xl text-gray-600">Kompletní průvodce pro úpravu obsahu webových stránek</p>
      </div>

      <div className="prose prose-lg max-w-none">
        <h2 className="flex items-center text-2xl font-bold mb-4">
          <Settings className="mr-2 h-6 w-6" /> Úvod a přehled funkcí
        </h2>
        <p>
          Editor stránek STRAWSTAV je nástroj pro správu a úpravu obsahu webových stránek bez nutnosti znalosti
          programování. Umožňuje intuitivní úpravy textu, obrázků, sekcí a dalších prvků stránky s okamžitým náhledem
          změn.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg my-6">
          <h3 className="text-xl font-bold mb-2">Hlavní funkce editoru:</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Úprava obsahu hlavní stránky v reálném čase</li>
            <li>Přidávání, úprava a mazání sekcí stránky</li>
            <li>Správa komponent v rámci sekcí (texty, nadpisy, obrázky, tlačítka)</li>
            <li>Úprava stylů a vzhledu stránky</li>
            <li>Náhled změn v reálném čase</li>
            <li>Export a import konfigurace stránky</li>
            <li>Historie změn s možností vrácení zpět</li>
          </ul>
        </div>

        <h2 className="flex items-center text-2xl font-bold mb-4 mt-10">
          <Layout className="mr-2 h-6 w-6" /> Navigace v editoru
        </h2>

        <h3 className="text-xl font-bold mt-6 mb-2">Hlavní panel nástrojů</h3>
        <p>
          V horní části editoru najdete hlavní panel nástrojů, který obsahuje nejdůležitější funkce pro práci s
          editorem:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2 text-lg font-semibold">
              <Undo className="mr-2 h-5 w-5" /> <Redo className="mr-2 h-5 w-5" /> Historie změn
            </div>
            <p className="text-gray-700">
              Tlačítka pro krok zpět a krok vpřed umožňují procházet historii změn a vrátit se k předchozím verzím.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2 text-lg font-semibold">
              <Settings className="mr-2 h-5 w-5" /> <Eye className="mr-2 h-5 w-5" /> Přepínání režimů
            </div>
            <p className="text-gray-700">
              Přepínání mezi režimem editace a náhledu umožňuje zobrazit stránku tak, jak bude vypadat pro návštěvníky.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2 text-lg font-semibold">
              <Download className="mr-2 h-5 w-5" /> <Upload className="mr-2 h-5 w-5" /> Export a import
            </div>
            <p className="text-gray-700">
              Možnost exportovat aktuální konfiguraci stránky do JSON souboru a později ji importovat zpět.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2 text-lg font-semibold">
              <Save className="mr-2 h-5 w-5" /> Uložení změn
            </div>
            <p className="text-gray-700">
              Tlačítko pro uložení provedených změn. Změny jsou automaticky ukládány do lokálního úložiště prohlížeče.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2 text-lg font-semibold">
              <Code className="mr-2 h-5 w-5" /> Generátor JSON
            </div>
            <p className="text-gray-700">
              Nástroj pro generování JSON konfigurace aktuální stránky, který lze použít pro zálohu nebo přenos.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2 text-lg font-semibold">
              <Globe className="mr-2 h-5 w-5" /> Zobrazení webu
            </div>
            <p className="text-gray-700">
              Otevře aktuální verzi webu v novém okně pro kontrolu změn v reálném prostředí.
            </p>
          </div>
        </div>

        <h2 className="flex items-center text-2xl font-bold mb-4 mt-10">
          <Layers className="mr-2 h-6 w-6" /> Práce se sekcemi
        </h2>

        <p>
          Sekce jsou základní stavební bloky stránky. Každá sekce může obsahovat různé komponenty jako texty, obrázky,
          tlačítka a další prvky.
        </p>

        <div className="bg-white p-6 rounded-lg border my-6">
          <h3 className="text-xl font-bold mb-4">Správa sekcí</h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <PlusCircle className="mr-3 h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Přidání nové sekce</h4>
                <p className="text-gray-700">
                  Klikněte na tlačítko "Přidat sekci" v panelu Správa sekcí a vyberte typ sekce, který chcete přidat.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Edit className="mr-3 h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Úprava sekce</h4>
                <p className="text-gray-700">
                  Klikněte na sekci v náhledu nebo v seznamu sekcí pro otevření editoru dané sekce. Zde můžete upravit
                  název, viditelnost a další nastavení sekce.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Move className="mr-3 h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Změna pořadí sekcí</h4>
                <p className="text-gray-700">
                  Pomocí šipek nahoru a dolů v seznamu sekcí můžete měnit pořadí sekcí na stránce.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Copy className="mr-3 h-6 w-6 text-indigo-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Duplikace sekce</h4>
                <p className="text-gray-700">
                  Kliknutím na tlačítko duplikace vytvoříte kopii vybrané sekce včetně všech jejích komponent.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Trash2 className="mr-3 h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Odstranění sekce</h4>
                <p className="text-gray-700">
                  Kliknutím na tlačítko odstranění smažete vybranou sekci. Před smazáním budete požádáni o potvrzení.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-2">Typy sekcí</h3>
        <p>Editor aktuálně podporuje následující typy sekcí:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold mb-2">Hero sekce</h4>
            <p className="text-gray-700">
              Úvodní sekce stránky s možností nastavení pozadí (obrázek nebo barva), výšky a překrytí.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold mb-2">Sekce služeb</h4>
            <p className="text-gray-700">
              Sekce pro prezentaci služeb s možností nastavení počtu sloupců, pozadí a odsazení.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold mb-2">Galerie</h4>
            <p className="text-gray-700">
              Sekce pro zobrazení obrázků v mřížce s možností nastavení počtu sloupců a poměru stran.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-bold mb-2">Textová sekce</h4>
            <p className="text-gray-700">Sekce pro zobrazení textového obsahu s možností formátování.</p>
          </div>
        </div>

        <h2 className="flex items-center text-2xl font-bold mb-4 mt-10">
          <FileText className="mr-2 h-6 w-6" /> Práce s komponentami
        </h2>

        <p>
          Komponenty jsou prvky, které tvoří obsah sekcí. Každá sekce může obsahovat různé typy komponent podle svého
          účelu.
        </p>

        <div className="bg-white p-6 rounded-lg border my-6">
          <h3 className="text-xl font-bold mb-4">Správa komponent</h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <PlusCircle className="mr-3 h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Přidání nové komponenty</h4>
                <p className="text-gray-700">
                  V editoru sekce klikněte na tlačítko "Přidat komponentu" a vyberte typ komponenty, který chcete
                  přidat.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Edit className="mr-3 h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Úprava komponenty</h4>
                <p className="text-gray-700">
                  Klikněte na komponentu v náhledu nebo v seznamu komponent pro otevření editoru dané komponenty. Zde
                  můžete upravit obsah a nastavení komponenty.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Move className="mr-3 h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Změna pořadí komponent</h4>
                <p className="text-gray-700">
                  Pomocí šipek nahoru a dolů v seznamu komponent můžete měnit pořadí komponent v sekci.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Trash2 className="mr-3 h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Odstranění komponenty</h4>
                <p className="text-gray-700">
                  Kliknutím na tlačítko odstranění smažete vybranou komponentu. Před smazáním budete požádáni o
                  potvrzení.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-2">Typy komponent</h3>
        <p>Editor aktuálně podporuje následující typy komponent:</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              <Type className="mr-2 h-5 w-5 text-blue-600" /> <span className="font-bold">Text</span>
            </div>
            <p className="text-gray-700">
              Textová komponenta s možností formátování pomocí WYSIWYG editoru. Podporuje různé styly, velikosti a
              zarovnání textu.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              <Type className="mr-2 h-5 w-5 text-purple-600" /> <span className="font-bold">Nadpis</span>
            </div>
            <p className="text-gray-700">
              Komponenta pro nadpisy různých úrovní (H1-H6) s možností nastavení velikosti, tučnosti a zarovnání.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              <ImageIcon className="mr-2 h-5 w-5 text-green-600" /> <span className="font-bold">Obrázek</span>
            </div>
            <p className="text-gray-700">
              Komponenta pro vložení obrázku s možností nastavení velikosti, zarovnání a alternativního textu.
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center mb-2">
              <FileText className="mr-2 h-5 w-5 text-amber-600" /> <span className="font-bold">Tlačítko</span>
            </div>
            <p className="text-gray-700">
              Komponenta pro vytvoření tlačítka s možností nastavení textu, barvy, velikosti a cílového odkazu.
            </p>
          </div>
        </div>

        <h2 className="flex items-center text-2xl font-bold mb-4 mt-10">
          <Palette className="mr-2 h-6 w-6" /> Úprava stylů
        </h2>

        <p>
          Editor umožňuje upravovat globální styly stránky, jako jsou barvy, typografie a odsazení. Tyto styly se
          aplikují na celou stránku a ovlivňují vzhled všech sekcí a komponent.
        </p>

        <div className="bg-white p-6 rounded-lg border my-6">
          <h3 className="text-xl font-bold mb-4">Globální styly</h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 h-6 w-6 bg-strawstav-red rounded-full flex-shrink-0 mt-1"></div>
              <div>
                <h4 className="font-semibold">Barvy</h4>
                <p className="text-gray-700">
                  Nastavení primární, sekundární, akcentové barvy a barev pozadí a textu. Tyto barvy se používají v
                  celém designu stránky.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Type className="mr-3 h-6 w-6 text-gray-800 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Typografie</h4>
                <p className="text-gray-700">
                  Nastavení fontů pro nadpisy a běžný text, základní velikosti písma a dalších typografických
                  vlastností.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Layout className="mr-3 h-6 w-6 text-gray-800 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold">Odsazení a rozložení</h4>
                <p className="text-gray-700">
                  Nastavení odsazení sekcí, maximální šířky kontejneru a dalších vlastností rozložení stránky.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="flex items-center text-2xl font-bold mb-4 mt-10">
          <Save className="mr-2 h-6 w-6" /> Ukládání a export/import
        </h2>

        <div className="bg-white p-6 rounded-lg border my-6">
          <h3 className="text-xl font-bold mb-4">Ukládání změn</h3>
          <p className="text-gray-700 mb-4">
            Změny provedené v editoru jsou automaticky ukládány do lokálního úložiště prohlížeče. Pro trvalé uložení
            klikněte na tlačítko "Uložit změny" v hlavním panelu nástrojů.
          </p>

          <h3 className="text-xl font-bold mb-4 mt-6">Export konfigurace</h3>
          <p className="text-gray-700 mb-4">
            Pro export aktuální konfigurace stránky klikněte na tlačítko "Export" v hlavním panelu nástrojů. Konfigurace
            bude uložena jako JSON soubor, který můžete použít pro zálohu nebo přenos na jiný server.
          </p>

          <h3 className="text-xl font-bold mb-4 mt-6">Import konfigurace</h3>
          <p className="text-gray-700 mb-4">
            Pro import konfigurace klikněte na tlačítko "Import" v hlavním panelu nástrojů a vyberte JSON soubor s
            konfigurací. Po importu se konfigurace aplikuje na aktuální stránku.
          </p>

          <h3 className="text-xl font-bold mb-4 mt-6">Generování JSON</h3>
          <p className="text-gray-700 mb-4">
            Pro generování JSON konfigurace aktuální stránky klikněte na tlačítko "Generovat JSON" v hlavním panelu
            nástrojů. Otevře se dialog s formátovaným JSON, který můžete zkopírovat do schránky nebo stáhnout jako
            soubor.
          </p>
        </div>

        <h2 className="flex items-center text-2xl font-bold mb-4 mt-10">
          <Settings className="mr-2 h-6 w-6" /> Co chybí k plné funkčnosti
        </h2>

        <p>
          Aktuální verze editoru je funkční pro základní úpravy obsahu hlavní stránky, ale pro plnou funkčnost by bylo
          potřeba implementovat následující:
        </p>

        <div className="bg-white p-6 rounded-lg border my-6">
          <h3 className="text-xl font-bold mb-4">Chybějící funkce</h3>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                1
              </div>
              <div>
                <h4 className="font-semibold">Napojení na backend</h4>
                <p className="text-gray-700">
                  Aktuálně editor ukládá změny pouze do localStorage prohlížeče. Pro plnou funkčnost by bylo potřeba
                  implementovat napojení na backend API pro ukládání a načítání konfigurace z databáze.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                2
              </div>
              <div>
                <h4 className="font-semibold">Správa médií</h4>
                <p className="text-gray-700">
                  Implementace knihovny médií pro nahrávání, správu a výběr obrázků a dalších souborů.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                3
              </div>
              <div>
                <h4 className="font-semibold">Verzování změn</h4>
                <p className="text-gray-700">
                  Systém pro ukládání a správu verzí stránky s možností návratu k předchozím verzím.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                4
              </div>
              <div>
                <h4 className="font-semibold">Podpora pro více jazyků</h4>
                <p className="text-gray-700">Možnost správy obsahu v různých jazykových verzích.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                5
              </div>
              <div>
                <h4 className="font-semibold">SEO nastavení</h4>
                <p className="text-gray-700">Rozšířené možnosti pro správu meta tagů a SEO nastavení stránky.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                6
              </div>
              <div>
                <h4 className="font-semibold">Mobilní náhled</h4>
                <p className="text-gray-700">
                  Možnost přepínání mezi desktop a mobilním náhledem pro kontrolu responzivity.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-3 h-6 w-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                7
              </div>
              <div>
                <h4 className="font-semibold">Autentizace a autorizace</h4>
                <p className="text-gray-700">
                  Systém pro přihlašování a správu oprávnění uživatelů pro přístup k editoru.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="flex items-center text-2xl font-bold mb-4 mt-10">
          <FileText className="mr-2 h-6 w-6" /> Závěr
        </h2>

        <p className="mb-6">
          Editor stránek STRAWSTAV je výkonný nástroj pro správu obsahu webových stránek. I v aktuální verzi umožňuje
          základní úpravy obsahu hlavní stránky s okamžitým náhledem změn. Pro plnou funkčnost by bylo potřeba
          implementovat výše uvedené chybějící funkce, ale i tak je editor použitelný pro běžné úpravy obsahu.
        </p>

        <div className="bg-gray-100 p-6 rounded-lg my-6">
          <h3 className="text-xl font-bold mb-2">Lze tedy tímto editovat hlavní stranu?</h3>
          <p className="text-gray-700">
            <strong>Ano, lze.</strong> Editor umožňuje úpravy obsahu hlavní stránky včetně přidávání, úpravy a mazání
            sekcí a komponent. Změny jsou ukládány do localStorage prohlížeče, takže jsou dostupné i po obnovení
            stránky. Pro trvalé uložení na server by bylo potřeba implementovat napojení na backend API.
          </p>
        </div>
      </div>
    </div>
  )
}
