import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/server"

// POST /api/pages/[slug]/versions/[version]/restore - Obnovení konkrétní verze stránky
export async function POST(request: NextRequest, { params }: { params: { slug: string; version: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const { slug, version } = params
    const versionNumber = Number.parseInt(version, 10)

    if (isNaN(versionNumber)) {
      return NextResponse.json({ error: "Neplatné číslo verze" }, { status: 400 })
    }

    // Získání stránky podle slugu
    const { data: pageData, error: pageError } = await supabase.from("pages").select("id").eq("slug", slug).single()

    if (pageError || !pageData) {
      if (pageError?.code === "PGRST116") {
        return NextResponse.json({ error: "Stránka nenalezena" }, { status: 404 })
      }
      return NextResponse.json({ error: pageError?.message || "Chyba při načítání stránky" }, { status: 500 })
    }

    // Získání konkrétní verze
    const { data: versionData, error: versionError } = await supabase
      .from("page_versions")
      .select("config")
      .eq("page_id", pageData!.id)
      .eq("version_number", versionNumber)
      .single()

    if (versionError || !versionData) {
      if (versionError?.code === "PGRST116") {
        return NextResponse.json({ error: "Verze nenalezena" }, { status: 404 })
      }
      return NextResponse.json({ error: versionError?.message || "Chyba při načítání verze" }, { status: 500 })
    }

    // Získání poslední verze
    const { data: lastVersionData, error: lastVersionError } = await supabase
      .from("page_versions")
      .select("version_number")
      .eq("page_id", pageData!.id)
      .order("version_number", { ascending: false })
      .limit(1)
      .single()

    if (lastVersionError && lastVersionError.code !== "PGRST116") {
      return NextResponse.json({ error: lastVersionError?.message || "Chyba při načítání poslední verze" }, { status: 500 })
    }

    const nextVersionNumber = lastVersionData?.version_number ? lastVersionData.version_number + 1 : 1

    // Nastavení všech předchozích verzí jako neaktuálních
    const { error: resetError } = await supabase
      .from("page_versions")
      .update({ is_current: false })
      .eq("page_id", pageData!.id)

    if (resetError) {
      return NextResponse.json({ error: resetError.message }, { status: 500 })
    }

    // Vytvoření nové verze na základě obnovené verze
    const body = await request.json()
    const { data: newVersionData, error: newVersionError } = await supabase
      .from("page_versions")
      .insert({
        page_id: pageData!.id,
        version_number: nextVersionNumber,
        config: versionData!.config,
        is_current: true,
        created_by: body.created_by || `Obnoveno z verze ${versionNumber}`,
      })
      .select()
      .single()

    if (newVersionError || !newVersionData) {
      return NextResponse.json({ error: newVersionError?.message || "Chyba při vytváření nové verze" }, { status: 500 })
    }

    // Aktualizace času poslední úpravy stránky
    const { error: updateError } = await supabase
      .from("pages")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", pageData!.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message || "Chyba při aktualizaci stránky" }, { status: 500 })
    }

    return NextResponse.json({
      message: `Verze ${versionNumber} byla úspěšně obnovena jako verze ${nextVersionNumber}`,
      version: nextVersionNumber,
    })
  } catch (error) {
    console.error("Chyba při obnovování verze stránky:", error)
    return NextResponse.json({ error: "Interní chyba serveru" }, { status: 500 })
  }
}
