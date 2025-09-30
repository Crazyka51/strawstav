"use client"

import { createContext, useContext, useState, type ReactNode, useCallback } from "react"

// Typy pro konfiguraci stránky
export interface PageConfig {
  sections: Section[]
  styles: {
    colors: {
      primary: string
      secondary: string
      background: string
      text: string
    }
    typography: {
      headingFont: string
      bodyFont: string
      baseFontSize: string
    }
    spacing: {
      sectionPadding: string
      contentWidth: string
    }
  }
  meta: {
    title: string
    description: string
    keywords: string
  }
}

export interface Section {
  id: string
  type: string
  title: string
  visible: boolean
  order: number
  settings: Record<string, any>
  components: Component[]
}

export interface Component {
  id: string
  type: string
  visible: boolean
  settings: Record<string, any>
  content: Record<string, any>
}

// Kontext pro sdílení stavu editoru
interface PageEditorContextType {
  config: PageConfig
  updateConfig: (newConfig: PageConfig) => void
  selectedSection: string | null
  setSelectedSection: (id: string | null) => void
  selectedComponent: string | null
  setSelectedComponent: (id: string | null) => void
  isEditMode: boolean
  setEditMode: (mode: boolean) => void
  history: PageConfig[]
  historyIndex: number
  undo: () => void
  redo: () => void
  addHistoryState: (config: PageConfig) => void
  isLoading: boolean
  isSaving: boolean
}

const PageEditorContext = createContext<PageEditorContextType | undefined>(undefined)

export const usePageEditor = () => {
  const context = useContext(PageEditorContext)
  if (!context) {
    throw new Error("usePageEditor must be used within a PageEditorProvider")
  }
  return context
}

interface PageEditorProviderProps {
  children: ReactNode
  initialConfig: PageConfig
  isLoading: boolean
  isSaving: boolean
  onSave: (config: PageConfig) => Promise<void>
}

export const PageEditorProvider = ({
  children,
  initialConfig,
  isLoading,
  isSaving,
  onSave,
}: PageEditorProviderProps) => {
  const [config, setConfig] = useState<PageConfig>(initialConfig)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [isEditMode, setEditMode] = useState(true)
  const [history, setHistory] = useState<PageConfig[]>([initialConfig])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Funkce pro přidání stavu do historie
  const addHistoryState = useCallback(
    (newConfig: PageConfig) => {
      // Oříznutí historie od aktuálního indexu
      const newHistory = history.slice(0, historyIndex + 1)

      // Přidání nového stavu
      newHistory.push(newConfig)

      // Omezení velikosti historie
      if (newHistory.length > 50) {
        newHistory.shift()
      }

      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
    },
    [history, historyIndex],
  )

  // Funkce pro aktualizaci konfigurace
  const updateConfig = useCallback(
    (newConfig: PageConfig) => {
      setConfig(newConfig)
      addHistoryState(newConfig)
    },
    [addHistoryState],
  )

  // Funkce pro krok zpět
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setConfig(history[historyIndex - 1])
    }
  }, [history, historyIndex])

  // Funkce pro krok vpřed
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setConfig(history[historyIndex + 1])
    }
  }, [history, historyIndex])

  return (
    <PageEditorContext.Provider
      value={{
        config,
        updateConfig,
        selectedSection,
        setSelectedSection,
        selectedComponent,
        setSelectedComponent,
        isEditMode,
        setEditMode,
        history,
        historyIndex,
        undo,
        redo,
        addHistoryState,
        isLoading,
        isSaving,
      }}
    >
      {children}
    </PageEditorContext.Provider>
  )
}
