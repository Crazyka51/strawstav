import { NextResponse, type NextRequest } from "next/server"
import { createServerSupabaseClient } from "@/lib/server"
import type { Database } from "@/lib/types"

type Page = Database['public']['Tables']['pages']['Row']
type PageVersion = Database['public']['Tables']['page_versions']['Row']

interface RouteParams {
  params: {
    slug: string
  }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = createServerSupabaseClient()
    const { slug } = params

    // Získání stránky podle slugu
    const { data: pageDataResult, error: pageError } = await supabase.from("pages").select("*").eq("slug", slug).single()

    if (pageError || !pageDataResult) {
      if (pageError?.code === "PGRST116") {
        return NextResponse.json({ error: "Stránka nenalezena" }, { status: 404 })
      }
      console.error("Chyba při načítání stránky:", pageError)
      return NextResponse.json({ error: "Nepodařilo se načíst stránku" }, { status: 500 })
    }
    
    const pageData: Page = pageDataResult

    // Získání aktuální verze konfigurace
    const { data: versionDataResult, error: versionError } = await supabase
      .from("page_versions")
      .select("*")
      .eq("page_id", pageData.id)
      .eq("is_current", true)
      .single()

    if (versionError || !versionDataResult) {
      console.error("Chyba při načítání konfigurace stránky:", versionError)
      return NextResponse.json({ error: "Nepodařilo se načíst konfiguraci stránky" }, { status: 500 })
    }
    
    const versionData: PageVersion = versionDataResult

    // Spojení dat stránky a konfigurace
    const result = {
      ...pageData,
      config: versionData.config,
      version: versionData.version_number,
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
    const { slug } = params
    const body = await request.json()
    const { name, description, config, createNewVersion = false } = body

    // Získání stránky podle slugu
    const { data: pageDataResult, error: pageError } = await supabase.from("pages").select("*").eq("slug", slug).single()

    if (pageError || !pageDataResult) {
      if (pageError?.code === "PGRST116") {
        return NextResponse.json({ error: "Stránka nenalezena" }, { status: 404 })
      }
      console.error("Chyba při načítání stránky:", pageError)
      return NextResponse.json({ error: "Nepodařilo se načíst stránku" }, { status: 500 })
    }
    
    const pageData: Page = pageDataResult

    // Aktualizace základních informací o stránce
    if (name || description !== undefined) {
      const updateData: any = {}
      if (name) updateData.name = name
      if (description !== undefined) updateData.description = description
      updateData.updated_at = new Date().toISOString()

      const { error: updateError } = await supabase.from("pages").update(updateData).eq("id", pageData.id)

      if (updateError) {
        console.error("Chyba při aktualizaci stránky:", updateError)
        return NextResponse.json({ error: "Nepodařilo se aktualizovat stránku" }, { status: 500 })
      }
    }

    // Aktualizace konfigurace stránky
    if (config) {
      if (createNewVersion) {
        // Získání poslední verze
        const { data: lastVersion, error: versionError } = await supabase
          .from("page_versions")
          .select("version_number")
          .eq("page_id", pageData.id)
          .order("version_number", { ascending: false })
          .limit(1)
          .single()

        if (versionError && versionError.code !== "PGRST116") {
          console.error("Chyba při získávání poslední verze:", versionError)
          return NextResponse.json({ error: "Nepodařilo se získat poslední verzi" }, { status: 500 })
        }

        const newVersionNumber = lastVersion?.version_number ? lastVersion!.version_number + 1 : 1

        // Nastavení všech verzí jako neaktuálních
        await supabase.from("page_versions").update({ is_current: false }).eq("page_id", pageData.id)

        // Vytvoření nové verze
        const { error: insertError } = await supabase.from("page_versions").insert({
          page_id: pageData.id,
          version_number: newVersionNumber,
          config,
          is_current: true,
        })

        if (insertError) {
          console.error("Chyba při vytváření nové verze:", insertError)
          return NextResponse.json({ error: "Nepodařilo se vytvořit novou verzi" }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: "Stránka byla aktualizována s novou verzí",
          version: newVersionNumber,
        })
      } else {
        // Aktualizace aktuální verze
        const { error: updateError } = await supabase
          .from("page_versions")
          .update({ config })
          .eq("page_id", pageData.id)
          .eq("is_current", true)

        if (updateError) {
          console.error("Chyba při aktualizaci konfigurace:", updateError)
          return NextResponse.json({ error: "Nepodařilo se aktualizovat konfiguraci" }, { status: 500 })
        }

        return NextResponse.json({
          success: true,
          message: "Konfigurace stránky byla aktualizována",
        })
      }
    }

    return NextResponse.json({ success: true, message: "Stránka byla aktualizována" })
  } catch (error) {
    console.error("Neočekávaná chyba:", error)
    return NextResponse.json({ error: "Došlo k neočekávané chybě" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const supabase = createServerSupabaseClient()
    const { slug } = params

    // Smazání stránky (kaskádově smaže i všechny verze díky ON DELETE CASCADE)
    const { error } = await supabase.from("pages").delete().eq("slug", slug)

    if (error) {
      console.error("Chyba při mazání stránky:", error)
      return NextResponse.json({ error: "Nepodařilo se smazat stránku" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Stránka byla smazána" })
  } catch (error) {
    console.error("Neočekávaná chyba:", error)
    return NextResponse.json({ error: "Došlo k neočekávané chybě" }, { status: 500 })
  }
}
