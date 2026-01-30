"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
  exportData: () => void
  importData: (data: string) => void
}

const ArcanaContext = createContext<ArcanaContextType | null>(null)

const DB_NAME = "arcana-db"
const DB_VERSION = 1
const CARDS_STORE = "cards"
const SETTINGS_STORE = "settings"

const defaultSettings: ArcanaSettings = {
  darkMode: true,
  fogIntensity: 50,
  neonIntensity: 70,
}

const sampleCards: Card[] = [
  {
    id: "1",
    title: "async/await patterns",
    content: `async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`,
    language: "typescript",
    tags: ["JavaScript", "Async"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Python Class",
    content: `class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    def greet(self):
        return f"Hello, {self.name}!"`,
    language: "python",
    tags: ["Python", "OOP"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "React useState Hook",
    content: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`,
    language: "tsx",
    tags: ["React", "Hooks"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "SQL Query",
    content: `SELECT users.name, orders.total
FROM users
INNER JOIN orders ON users.id = orders.user_id
WHERE orders.status = 'completed'
ORDER BY orders.total DESC
LIMIT 10;`,
    language: "sql",
    tags: ["SQL", "Database"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "CSS Glassmorphism",
    content: `.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}`,
    language: "css",
    tags: ["CSS", "UI"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "Docker Compose",
    content: `version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  db:
    image: postgres:14
    volumes:
      - pgdata:/var/lib/postgresql/data`,
    language: "yaml",
    tags: ["Docker", "DevOps"],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

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

export function ArcanaProvider({ children }: { children: ReactNode }) {
  const [cards, setCards] = useState<Card[]>([])
  const [settings, setSettings] = useState<ArcanaSettings>(defaultSettings)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

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
    const newCards = cards.map((card) => (card.id === id ? { ...card, ...cardData, updatedAt: new Date() } : card))
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

  const exportData = () => {
    const data = JSON.stringify({ cards, settings }, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `arcana-backup-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (data: string) => {
    try {
      const parsed = JSON.parse(data)
      if (parsed.cards) {
        const importedCards = parsed.cards.map((card: Card) => ({
          ...card,
          createdAt: new Date(card.createdAt),
          updatedAt: new Date(card.updatedAt),
        }))
        setCards(importedCards)
        saveCards(importedCards)
      }
      if (parsed.settings) {
        setSettings(parsed.settings)
        saveSettings(parsed.settings)
      }
    } catch (error) {
      console.error("Failed to import data:", error)
    }
  }

  if (!isInitialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-arcana-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-arcana-purple border-t-transparent" />
      </div>
    )
  }

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
      }}
    >
      {children}
    </ArcanaContext.Provider>
  )
}

export function useArcana() {
  const context = useContext(ArcanaContext)
  if (!context) {
    throw new Error("useArcana must be used within an ArcanaProvider")
  }
  return context
}
