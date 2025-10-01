import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/server"
import type { Database } from "@/lib/types"

type Page = Database['public']['Tables']['pages']['Row']
type PageVersion = Database['public']['Tables']['page_versions']['Row']

interface RouteParams {
  params: {
    slug: string
    version: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { slug, version } = params
    const versionNumber = Number.parseInt(version, 10)

    if (isNaN(versionNumber)) {
      return NextResponse.json({ error: "Neplatné číslo verze" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Získání informací o stránce
    const { data: pageDataResult, error: pageError } = await supabase.from("pages").select("*").eq("slug", slug).single()

    if (pageError || !pageDataResult) {
      if (pageError?.code === "PGRST116") {
        return NextResponse.json({ error: "Stránka nebyla nalezena" }, { status: 404 })
      }
      console.error("Chyba při načítání stránky:", pageError)
      return NextResponse.json({ error: "Nepodařilo se načíst stránku" }, { status: 500 })
    }
    
    const pageData: Page = pageDataResult

    // Získání konkrétní verze stránky
    const { data: versionDataResult, error: versionError } = await supabase
      .from("page_versions")
      .select("*")
      .eq("page_id", pageData.id)
      .eq("version_number", versionNumber)
      .single()

    if (versionError || !versionDataResult) {
      if (versionError?.code === "PGRST116") {
        return NextResponse.json({ error: "Verze nebyla nalezena" }, { status: 404 })
      }
      console.error("Chyba při načítání verze stránky:", versionError)
      return NextResponse.json({ error: "Nepodařilo se načíst verzi stránky" }, { status: 500 })
    }
    
    const versionData: PageVersion = versionDataResult

    // Spojení dat stránky a konfigurace
    const result = {
      ...pageData,
      config: versionData.config,
      version: versionData.version_number,
      is_current: versionData.is_current,
      created_at: versionData.created_at,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Neočekávaná chyba:", error)
    return NextResponse.json({ error: "Došlo k neočekávané chybě" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = createServerSupabaseClient()
    const { slug, version } = params
    const versionNumber = Number.parseInt(version, 10)

    if (isNaN(versionNumber)) {
      return NextResponse.json({ error: "Neplatné číslo verze" }, { status: 400 })
    }

    // Získání stránky podle slugu
    const { data: pageDataResult, error: pageError } = await supabase.from("pages").select("id").eq("slug", slug).single()

    if (pageError || !pageDataResult) {
      if (pageError?.code === "PGRST116") {
        return NextResponse.json({ error: "Stránka nenalezena" }, { status: 404 })
      }
      return NextResponse.json({ error: pageError?.message || "Chyba při načítání stránky" }, { status: 500 })
    }
    
    const pageData = pageDataResult as { id: string }

    // Získání konkrétní verze
    const { data: versionDataResult, error: versionError } = await supabase
      .from("page_versions")
      .select("id")
      .eq("page_id", pageData.id)
      .eq("version_number", versionNumber)
      .single()

    if (versionError || !versionDataResult) {
      if (versionError?.code === "PGRST116") {
        return NextResponse.json({ error: "Verze nenalezena" }, { status: 404 })
      }
      return NextResponse.json({ error: versionError?.message || "Chyba při načítání verze" }, { status: 500 })
    }
    
    const versionData = versionDataResult as { id: string }

    // Nastavení všech předchozích verzí jako neaktuálních
    const { error: resetError } = await supabase
      .from("page_versions")
      // @ts-ignore - Supabase type issue
      .update({ is_current: false } as any)
      .eq("page_id", pageData.id)

    if (resetError) {
      return NextResponse.json({ error: resetError.message }, { status: 500 })
    }

    // Nastavení požadované verze jako aktuální
    const { error: updateError } = await supabase
      .from("page_versions")
      // @ts-ignore - Supabase type issue
      .update({ is_current: true } as any)
      .eq("id", versionData.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Aktualizace času poslední úpravy stránky
    const { error: pageUpdateError } = await supabase
      .from("pages")
      // @ts-ignore - Supabase type issue
      .update({ updated_at: new Date().toISOString() } as any)
      .eq("id", pageData.id)

    if (pageUpdateError) {
      console.error("Chyba při aktualizaci času poslední změny:", pageUpdateError)
      // Nekritická chyba, pokračujeme
    }

    return NextResponse.json({
      success: true,
      message: `Verze ${versionNumber} byla nastavena jako aktuální`,
    })
  } catch (error) {
    console.error("Neočekávaná chyba:", error)
    return NextResponse.json({ error: "Došlo k neočekávané chybě" }, { status: 500 })
  }
}
