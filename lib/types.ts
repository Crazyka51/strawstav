export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string
          slug: string
          name: string
          description: string | null
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          description?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          description?: string | null
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      page_versions: {
        Row: {
          id: string
          page_id: string
          version_number: number
          config: Json
          is_current: boolean
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          page_id: string
          version_number: number
          config: Json
          is_current?: boolean
          created_at?: string
          created_by?: string | null
        }
        Update: {
          id?: string
          page_id?: string
          version_number?: number
          config?: Json
          is_current?: boolean
          created_at?: string
          created_by?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
