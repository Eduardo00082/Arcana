// hooks/use-first-visit.ts
"use client"

import { useState, useEffect } from "react"

const STORAGE_KEY = "arcana_has_visited"

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verifica se já visitou antes
    const hasVisited = localStorage.getItem(STORAGE_KEY)
    setIsFirstVisit(!hasVisited)
    setIsLoading(false)
  }, [])

  const markAsVisited = () => {
    localStorage.setItem(STORAGE_KEY, "true")
    setIsFirstVisit(false)
  }

  // Para debug/reset (pode remover em produção)
  const resetFirstVisit = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsFirstVisit(true)
  }

  return { 
    isFirstVisit, 
    isLoading, 
    markAsVisited,
    resetFirstVisit // útil para testes
  }
}