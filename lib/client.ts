import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

// Singleton instance pro klientskou část
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

// Vytvoření Supabase klienta pro klientské komponenty
export function createClientSupabaseClient() {
  if (supabaseInstance) return supabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Chybí Supabase URL nebo Anon Key v proměnných prostředí")
  }

  supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}
