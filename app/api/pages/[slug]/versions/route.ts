import { NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/app/lib/server"

// GET /api/pages/[slug]/versions - Získání všech verzí stránky
export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const supabase = createServerSupabaseClient()

    // 1. Získání informací o stránce
    const { data: pageData, error: pageError } = await supabase.from("pages").select("*").eq("slug", slug).single()

    if (pageError) {
      if (pageError.code === "PGRST116") {
        return NextResponse.json({ error: "Stránka nebyla nalezena" }, { status: 404 })
      }
      console.error("Chyba při načítání stránky:", pageError)
      return NextResponse.json({ error: "Nepodařilo se načíst stránku" }, { status: 500 })
    }

    // 2. Získání všech verzí stránky
    const { data: versions, error: versionsError } = await supabase
      .from("page_versions")
      .select("*")
      .eq("page_id", pageData.id)
      .order("version_number", { ascending: false })

    if (versionsError) {
      console.error("Chyba při načítání verzí stránky:", versionsError)
      return NextResponse.json({ error: "Nepodařilo se načíst verze stránky" }, { status: 500 })
    }

    return NextResponse.json(versions)
  } catch (error) {
    console.error("Neočekávaná chyba:", error)
    return NextResponse.json({ error: "Došlo k neočekávané chybě" }, { status: 500 })
  }
}
