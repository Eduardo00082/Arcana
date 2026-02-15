// hooks/use-device-optimization.ts
"use client"

import { useState, useEffect } from "react"
import { useIsMobile } from "./use-mobile"

export function useDeviceOptimization() {
  const isMobile = useIsMobile()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Detecta preferência do usuário por reduzir movimento
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    motionQuery.addEventListener('change', handleMotionChange)
    
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Reduzir efeitos se for mobile OU se o usuário preferir
  const shouldReduceEffects = isMobile || prefersReducedMotion

  return { isMobile, prefersReducedMotion, shouldReduceEffects }
}