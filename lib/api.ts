export interface Page {
  id: string
  slug: string
  name: string
  description: string | null
  is_published: boolean
  created_at: string
  updated_at: string
  config?: any
  version?: number
}

export interface PageVersion {
  id: string
  page_id: string
  version_number: number
  config: any
  is_current: boolean
  created_at: string
  created_by: string | null
}

// Helper function to get the base URL for API calls
function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Client-side
    return ''
  }
  // Server-side - pro development používáme localhost:3002
  return 'http://localhost:3002'
}

// Funkce pro práci se stránkami
export async function getPages(): Promise<Page[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/pages`)
  if (!response.ok) {
    throw new Error("Nepodařilo se načíst stránky")
  }
  return response.json()
}

export async function getPage(slug: string): Promise<Page> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/pages/${slug}`)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Nepodařilo se načíst stránku ${slug}`)
  }
  return response.json()
}

export async function createPage(
  slug: string,
  name: string,
  description?: string
): Promise<Page> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/pages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug,
      name,
      description,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Nepodařilo se vytvořit stránku")
  }
  return response.json()
}

export async function updatePage(
  slug: string,
  data: {
    name?: string
    description?: string
    config?: any
    createNewVersion?: boolean
  },
): Promise<{ success: boolean; message: string; version?: number }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/pages/${slug}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Nepodařilo se aktualizovat stránku ${slug}`)
  }

  return response.json()
}

export async function deletePage(slug: string): Promise<{ success: boolean; message: string }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/pages/${slug}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Nepodařilo se smazat stránku ${slug}`)
  }

  return response.json()
}

// Funkce pro práci s verzemi stránek
export async function getPageVersions(slug: string): Promise<PageVersion[]> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/pages/${slug}/versions`)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Nepodařilo se načíst verze stránky ${slug}`)
  }
  return response.json()
}

export async function getPageVersion(slug: string, version: number): Promise<Page> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/pages/${slug}/versions/${version}`)
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Nepodařilo se načíst verzi ${version} stránky ${slug}`)
  }
  return response.json()
}

export async function setCurrentVersion(slug: string, version: number): Promise<{ success: boolean; message: string }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/pages/${slug}/versions/${version}`, {
    method: "PUT",
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Nepodařilo se nastavit verzi ${version} jako aktuální`)
  }

  return response.json()
}

export async function restoreVersion(
  slug: string,
  version: number,
  data?: { created_by?: string },
): Promise<{ message: string; version: number }> {
  const baseUrl = getBaseUrl()
  const response = await fetch(`${baseUrl}/api/pages/${slug}/versions/${version}/restore`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data || {}),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || `Nepodařilo se obnovit verzi ${version}`)
  }

  return response.json()
}
