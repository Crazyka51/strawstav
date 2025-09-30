import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/app/lib/server"

// GET /api/pages - Získání seznamu všech stránek
export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase.from("pages").select("*").order("updated_at", { ascending: false })

    if (error) {
      console.error("Chyba při načítání stránek:", error)
      return NextResponse.json({ error: "Nepodařilo se načíst stránky" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Neočekávaná chyba:", error)
    return NextResponse.json({ error: "Došlo k neočekávané chybě" }, { status: 500 })
  }
}

// POST /api/pages - Vytvoření nové stránky
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { slug, name, description, config } = body

    if (!slug || !name) {
      return NextResponse.json({ error: "Chybí povinné parametry: slug, name" }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // Transakce - vytvoření stránky a první verze
    // 1. Vytvoření stránky
    const { data: pageData, error: pageError } = await supabase
      .from("pages")
      .insert({ slug, name, description })
      .select("id")
      .single()

    if (pageError) {
      console.error("Chyba při vytváření stránky:", pageError)
      return NextResponse.json({ error: "Nepodařilo se vytvořit stránku" }, { status: 500 })
    }

    // 2. Vytvoření první verze konfigurace
    const { error: versionError } = await supabase.from("page_versions").insert({
      page_id: pageData.id,
      version_number: 1,
      config: config || {},
      is_current: true,
    })

    if (versionError) {
      console.error("Chyba při vytváření verze stránky:", versionError)
      return NextResponse.json({ error: "Nepodařilo se vytvořit verzi stránky" }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: pageData.id, slug })
  } catch (error) {
    console.error("Neočekávaná chyba:", error)
    return NextResponse.json({ error: "Došlo k neočekávané chybě" }, { status: 500 })
  }
}
