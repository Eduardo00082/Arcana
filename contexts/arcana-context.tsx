"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// ═══════════════════════════════════════════════════════════════════════════
// TIPOS E INTERFACES
// ═══════════════════════════════════════════════════════════════════════════

export interface Card {
  id: string
  title: string
  content: string
  language: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ArcanaSettings {
  darkMode: boolean
  fogIntensity: number
  neonIntensity: number
  starCount: number
  autoStars: boolean
  performanceMode: boolean
  // ← NOVOS CONTROLES AVANÇADOS
  customFPS: number         // 15-60 FPS
  glowQuality: "none" | "low" | "medium" | "high"  // Qualidade do glow
  enableAnimations: boolean // Liga/desliga animações das estrelas
}

// Resultado das operações de backup
interface BackupResult {
  success: boolean
  message: string
  method?: "download" | "share" | "clipboard"
}

interface ArcanaContextType {
  cards: Card[]
  settings: ArcanaSettings
  addCard: (card: Omit<Card, "id" | "createdAt" | "updatedAt">) => void
  updateCard: (id: string, card: Partial<Card>) => void
  deleteCard: (id: string) => void
  updateSettings: (settings: Partial<ArcanaSettings>) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedTags: string[]
  setSelectedTags: (tags: string[]) => void
  exportData: () => Promise<BackupResult>
  importData: (data: string) => Promise<BackupResult>
  getBackupData: () => string
  shareBackup: () => Promise<BackupResult>
  copyBackupToClipboard: () => Promise<BackupResult>
}

const ArcanaContext = createContext<ArcanaContextType | null>(null)

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURAÇÕES DO BANCO DE DADOS
// ═══════════════════════════════════════════════════════════════════════════

const DB_NAME = "arcana-db"
const DB_VERSION = 1
const CARDS_STORE = "cards"
const SETTINGS_STORE = "settings"

// ═══════════════════════════════════════════════════════════════════════════
// UTILITÁRIOS DE DETECÇÃO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Detecta se o dispositivo é mobile
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768
}

// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURAÇÕES PADRÃO
// ═══════════════════════════════════════════════════════════════════════════

const defaultSettings: ArcanaSettings = {
  darkMode: false,
  fogIntensity: 50,
  neonIntensity: 70,
  starCount: isMobileDevice() ? 150 : 250,
  autoStars: true,
  performanceMode: isMobileDevice(),
  customFPS: 60,
  glowQuality: "high",
  enableAnimations: true,
}

const sampleCards: Card[] = []

// ═══════════════════════════════════════════════════════════════════════════
// FUNÇÕES DO INDEXEDDB
// ═══════════════════════════════════════════════════════════════════════════

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      if (!db.objectStoreNames.contains(CARDS_STORE)) {
        db.createObjectStore(CARDS_STORE, { keyPath: "id" })
      }

      if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
        db.createObjectStore(SETTINGS_STORE, { keyPath: "id" })
      }
    }
  })
}

// ═══════════════════════════════════════════════════════════════════════════
// FUNÇÕES AUXILIARES PARA BACKUP
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Gera o nome do arquivo de backup com data
 */
function getBackupFileName(): string {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  
  return `arcana-backup-${year}-${month}-${day}_${hours}-${minutes}.json`
}

/**
 * Verifica se a Web Share API está disponível
 */
function canShare(): boolean {
  if (typeof navigator === 'undefined') return false
  return !!navigator.share && !!navigator.canShare
}

/**
 * Download usando método tradicional (funciona na maioria dos navegadores desktop)
 */
async function downloadViaAnchor(blob: Blob, fileName: string): Promise<boolean> {
  try {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
    
    return true
  } catch (error) {
    console.error("Download via anchor failed:", error)
    return false
  }
}

/**
 * Download usando a API de File System Access (navegadores modernos)
 */
async function downloadViaFileSystem(blob: Blob, fileName: string): Promise<boolean> {
  try {
    if (!('showSaveFilePicker' in window)) {
      return false
    }

    const handle = await (window as any).showSaveFilePicker({
      suggestedName: fileName,
      types: [
        {
          description: 'JSON Files',
          accept: { 'application/json': ['.json'] },
        },
      ],
    })

    const writable = await handle.createWritable()
    await writable.write(blob)
    await writable.close()
    
    return true
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error("File System API failed:", error)
    }
    return false
  }
}

/**
 * Compartilhar usando Web Share API (ideal para mobile)
 */
async function shareFile(blob: Blob, fileName: string): Promise<boolean> {
  try {
    if (!canShare()) {
      return false
    }

    const file = new File([blob], fileName, { type: 'application/json' })
    
    if (!navigator.canShare({ files: [file] })) {
      return false
    }

    await navigator.share({
      files: [file],
      title: 'Arcana Backup',
      text: 'Backup das suas cartas do Arcana',
    })
    
    return true
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error("Share failed:", error)
    }
    return false
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PROVIDER PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════

export function ArcanaProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([])
  const [settings, setSettings] = useState<ArcanaSettings>(defaultSettings)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // ═════════════════════════════════════════════════════════════════════════
  // INICIALIZAÇÃO DO BANCO
  // ═════════════════════════════════════════════════════════════════════════

  useEffect(() => {
    const initDB = async () => {
      try {
        const db = await openDB()

        const cardsTransaction = db.transaction(CARDS_STORE, "readonly")
        const cardsStore = cardsTransaction.objectStore(CARDS_STORE)
        const cardsRequest = cardsStore.getAll()

        cardsRequest.onsuccess = () => {
          const loadedCards = cardsRequest.result
          if (loadedCards.length === 0) {
            setCards(sampleCards)
            const writeTransaction = db.transaction(CARDS_STORE, "readwrite")
            const writeStore = writeTransaction.objectStore(CARDS_STORE)
            sampleCards.forEach((card) => writeStore.add(card))
          } else {
            setCards(
              loadedCards.map((card: Card) => ({
                ...card,
                createdAt: new Date(card.createdAt),
                updatedAt: new Date(card.updatedAt),
              })),
            )
          }
        }

        const settingsTransaction = db.transaction(SETTINGS_STORE, "readonly")
        const settingsStore = settingsTransaction.objectStore(SETTINGS_STORE)
        const settingsRequest = settingsStore.get("main")

        settingsRequest.onsuccess = () => {
          if (settingsRequest.result) {
            setSettings(settingsRequest.result.data)
          }
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Failed to initialize IndexedDB:", error)
        setCards(sampleCards)
        setIsInitialized(true)
      }
    }

    initDB()
  }, [])

  // ═════════════════════════════════════════════════════════════════════════
  // FUNÇÕES DE PERSISTÊNCIA
  // ═════════════════════════════════════════════════════════════════════════

  const saveCards = async (newCards: Card[]) => {
    try {
      const db = await openDB()
      const transaction = db.transaction(CARDS_STORE, "readwrite")
      const store = transaction.objectStore(CARDS_STORE)

      store.clear()
      newCards.forEach((card) => store.add(card))
    } catch (error) {
      console.error("Failed to save cards:", error)
    }
  }

  const saveSettings = async (newSettings: ArcanaSettings) => {
    try {
      const db = await openDB()
      const transaction = db.transaction(SETTINGS_STORE, "readwrite")
      const store = transaction.objectStore(SETTINGS_STORE)

      store.put({ id: "main", data: newSettings })
    } catch (error) {
      console.error("Failed to save settings:", error)
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // CRUD DE CARDS
  // ═════════════════════════════════════════════════════════════════════════

  const addCard = (cardData: Omit<Card, "id" | "createdAt" | "updatedAt">) => {
    const newCard: Card = {
      ...cardData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const newCards = [...cards, newCard]
    setCards(newCards)
    saveCards(newCards)
  }

  const updateCard = (id: string, cardData: Partial<Card>) => {
    const newCards = cards.map((card) => 
      card.id === id ? { ...card, ...cardData, updatedAt: new Date() } : card
    )
    setCards(newCards)
    saveCards(newCards)
  }

  const deleteCard = (id: string) => {
    const newCards = cards.filter((card) => card.id !== id)
    setCards(newCards)
    saveCards(newCards)
  }

  const updateSettings = (newSettings: Partial<ArcanaSettings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    saveSettings(updated)
  }

  // ═════════════════════════════════════════════════════════════════════════
  // FUNÇÕES DE BACKUP - MELHORADAS PARA MOBILE
  // ═════════════════════════════════════════════════════════════════════════

  const getBackupData = (): string => {
    const backupData = {
      _meta: {
        version: "1.0",
        exportedAt: new Date().toISOString(),
        cardCount: cards.length,
      },
      cards,
      settings,
    }
    return JSON.stringify(backupData, null, 2)
  }

  const exportData = async (): Promise<BackupResult> => {
    try {
      const data = getBackupData()
      const blob = new Blob([data], { type: "application/json" })
      const fileName = getBackupFileName()

      if (isMobileDevice()) {
        const shared = await shareFile(blob, fileName)
        if (shared) {
          return {
            success: true,
            message: "Backup compartilhado com sucesso!",
            method: "share"
          }
        }
      }

      const savedViaFS = await downloadViaFileSystem(blob, fileName)
      if (savedViaFS) {
        return {
          success: true,
          message: "Backup salvo com sucesso!",
          method: "download"
        }
      }

      const downloaded = await downloadViaAnchor(blob, fileName)
      if (downloaded) {
        return {
          success: true,
          message: "Backup baixado com sucesso!",
          method: "download"
        }
      }

      await navigator.clipboard.writeText(data)
      return {
        success: true,
        message: "Dados copiados para a área de transferência! Cole em um arquivo .json",
        method: "clipboard"
      }

    } catch (error) {
      console.error("Export failed:", error)
      return {
        success: false,
        message: "Erro ao exportar dados. Tente novamente."
      }
    }
  }

  const shareBackup = async (): Promise<BackupResult> => {
    try {
      const data = getBackupData()
      const blob = new Blob([data], { type: "application/json" })
      const fileName = getBackupFileName()

      if (!canShare()) {
        return {
          success: false,
          message: "Compartilhamento não suportado neste navegador"
        }
      }

      const shared = await shareFile(blob, fileName)
      
      if (shared) {
        return {
          success: true,
          message: "Backup compartilhado com sucesso!",
          method: "share"
        }
      }

      return {
        success: false,
        message: "Não foi possível compartilhar. Tente baixar o arquivo."
      }

    } catch (error) {
      console.error("Share failed:", error)
      return {
        success: false,
        message: "Erro ao compartilhar. Tente novamente."
      }
    }
  }

  const copyBackupToClipboard = async (): Promise<BackupResult> => {
    try {
      const data = getBackupData()
      await navigator.clipboard.writeText(data)
      
      return {
        success: true,
        message: "Backup copiado! Cole em um arquivo .json para salvar.",
        method: "clipboard"
      }
    } catch (error) {
      console.error("Copy to clipboard failed:", error)
      return {
        success: false,
        message: "Erro ao copiar. Verifique as permissões do navegador."
      }
    }
  }

  const importData = async (data: string): Promise<BackupResult> => {
    try {
      const parsed = JSON.parse(data)
      
      if (!parsed.cards && !parsed.settings) {
        return {
          success: false,
          message: "Arquivo inválido. Não contém dados do Arcana."
        }
      }

      let importedCount = 0

      if (parsed.cards && Array.isArray(parsed.cards)) {
        const importedCards = parsed.cards.map((card: Card) => ({
          ...card,
          createdAt: new Date(card.createdAt),
          updatedAt: new Date(card.updatedAt),
        }))
        setCards(importedCards)
        await saveCards(importedCards)
        importedCount = importedCards.length
      }

      if (parsed.settings) {
        const importedSettings = {
          ...defaultSettings,
          ...parsed.settings,
        }
        setSettings(importedSettings)
        await saveSettings(importedSettings)
      }

      return {
        success: true,
        message: `Backup restaurado! ${importedCount} carta${importedCount !== 1 ? 's' : ''} importada${importedCount !== 1 ? 's' : ''}.`
      }

    } catch (error) {
      console.error("Import failed:", error)
      
      if (error instanceof SyntaxError) {
        return {
          success: false,
          message: "Arquivo corrompido ou formato inválido."
        }
      }

      return {
        success: false,
        message: "Erro ao importar dados. Verifique o arquivo."
      }
    }
  }

  // ═════════════════════════════════════════════════════════════════════════
  // LOADING STATE
  // ═════════════════════════════════════════════════════════════════════════

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-arcana-bg">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-arcana-purple border-t-transparent" />
          <span className="text-sm text-gray-500">Carregando...</span>
        </div>
      </div>
    )
  }

  // ═════════════════════════════════════════════════════════════════════════
  // PROVIDER
  // ═════════════════════════════════════════════════════════════════════════

  return (
    <ArcanaContext.Provider
      value={{
        cards,
        settings,
        addCard,
        updateCard,
        deleteCard,
        updateSettings,
        searchQuery,
        setSearchQuery,
        selectedTags,
        setSelectedTags,
        exportData,
        importData,
        getBackupData,
        shareBackup,
        copyBackupToClipboard,
      }}
    >
      {children}
    </ArcanaContext.Provider>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
// HOOK
// ═══════════════════════════════════════════════════════════════════════════

export function useArcana() {
  const context = useContext(ArcanaContext)
  if (!context) {
    throw new Error("useArcana must be used within an ArcanaProvider")
  }
  return context
}