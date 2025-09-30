import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

// Vytvoření Supabase klienta pro serverové komponenty a API routes
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Chybí Supabase URL nebo Service Role Key v proměnných prostředí")
  }

  return createClient<Database>(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  })
}
