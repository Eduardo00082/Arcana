"use client"

import { useEffect, useRef } from "react"
import { useArcana } from "@/contexts/arcana-context"

interface Star {
  x: number
  y: number
  size: number
  baseOpacity: number
  pulseSpeed: number
  pulseOffset: number
  color: { r: number; g: number; b: number }
  glowMultiplier: number
  type: "small" | "medium" | "large" | "bright"
}

const STAR_COLORS = [
  { r: 168, g: 85, b: 247 },
  { r: 147, g: 197, b: 253 },
  { r: 34, g: 211, b: 238 },
  { r: 236, g: 72, b: 153 },
  { r: 255, g: 255, b: 255 },
  { r: 199, g: 210, b: 254 },
]

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationIdRef = useRef<number>(0)
  const lastFrameTimeRef = useRef<number>(0)
  
  const { settings } = useArcana()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768

    // FPS baseado nas configurações
    const targetFPS = settings.performanceMode 
      ? 30 
      : settings.customFPS
    const frameDelay = 1000 / targetFPS

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      generateStars()
    }

    const generateStars = () => {
      const stars: Star[] = []
      
      let starCount: number
      if (settings.autoStars) {
        const area = window.innerWidth * window.innerHeight
        const baseCount = Math.floor(area / 2500)
        starCount = settings.performanceMode ? Math.floor(baseCount * 0.6) : baseCount
      } else {
        starCount = settings.starCount
      }

      // Se 0 estrelas, não gera nada
      if (starCount === 0) {
        starsRef.current = []
        return
      }

      for (let i = 0; i < starCount; i++) {
        const random = Math.random()
        let type: Star["type"]
        let size: number
        let baseOpacity: number
        let pulseSpeed: number
        let glowMultiplier: number

        const performanceAdjustment = settings.performanceMode ? 0.1 : 0

        if (random < 0.5 + performanceAdjustment) {
          type = "small"
          size = Math.random() * 1 + 0.5
          baseOpacity = Math.random() * 0.4 + 0.2
          pulseSpeed = Math.random() * 0.003 + 0.001
          glowMultiplier = settings.performanceMode ? 1.5 : 2
        } else if (random < 0.8 + performanceAdjustment * 0.5) {
          type = "medium"
          size = Math.random() * 1.5 + 1
          baseOpacity = Math.random() * 0.5 + 0.3
          pulseSpeed = Math.random() * 0.004 + 0.002
          glowMultiplier = settings.performanceMode ? 2 : 3
        } else if (random < 0.95) {
          type = "large"
          size = Math.random() * 2 + 1.5
          baseOpacity = Math.random() * 0.6 + 0.4
          pulseSpeed = Math.random() * 0.005 + 0.002
          glowMultiplier = settings.performanceMode ? 2.5 : 4
        } else {
          if (settings.performanceMode) {
            type = "medium"
            size = Math.random() * 1.5 + 1
            baseOpacity = Math.random() * 0.5 + 0.3
            pulseSpeed = Math.random() * 0.004 + 0.002
            glowMultiplier = 2
          } else {
            type = "bright"
            size = Math.random() * 2.5 + 2
            baseOpacity = Math.random() * 0.3 + 0.7
            pulseSpeed = Math.random() * 0.006 + 0.003
            glowMultiplier = 6
          }
        }

        const color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]

        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          baseOpacity,
          pulseSpeed,
          pulseOffset: Math.random() * Math.PI * 2,
          color,
          glowMultiplier,
          type,
        })
      }

      starsRef.current = stars
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = (time: number) => {
      // Controle de FPS
      if (time - lastFrameTimeRef.current < frameDelay) {
        animationIdRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTimeRef.current = time

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Se não tem estrelas, só limpa e retorna
      if (starsRef.current.length === 0) {
        animationIdRef.current = requestAnimationFrame(animate)
        return
      }

      starsRef.current.forEach((star) => {
        // Se animações estão desligadas, usa valores fixos
        const pulse = settings.enableAnimations 
          ? Math.sin(time * star.pulseSpeed + star.pulseOffset)
          : 0
        
        const pulseIntensity = star.type === "bright" ? 0.5 : 0.3
        const currentOpacity = star.baseOpacity * (0.7 + pulse * pulseIntensity)
        const currentSize = star.size * (1 + (settings.enableAnimations ? pulse * 0.15 : 0))
        const glowSize = currentSize * star.glowMultiplier

        const { r, g, b } = star.color

        // Renderização baseada na qualidade de glow
        if (settings.glowQuality === "none") {
          // Sem glow - apenas pontos sólidos
          ctx.beginPath()
          ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`
          ctx.fill()
          
        } else if (settings.glowQuality === "low") {
          // Glow mínimo (1 gradiente simples)
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize * 0.5
          )
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

          ctx.beginPath()
          ctx.arc(star.x, star.y, glowSize * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()
          
        } else if (settings.glowQuality === "medium") {
          // Glow simplificado (2 cores)
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize
          )
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.5})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

          ctx.beginPath()
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()

          // Núcleo
          ctx.beginPath()
          ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`
          ctx.fill()
          
        } else {
          // High quality - qualidade completa (4 cores)
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, glowSize
          )
          gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.6})`)
          gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.3})`)
          gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.1})`)
          gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

          ctx.beginPath()
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2)
          ctx.fillStyle = gradient
          ctx.fill()

          const coreGradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, currentSize
          )
          coreGradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`)
          coreGradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.8})`)
          coreGradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)

          ctx.beginPath()
          ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2)
          ctx.fillStyle = coreGradient
          ctx.fill()

          if (star.type === "bright" || star.type === "large") {
            ctx.beginPath()
            ctx.arc(star.x, star.y, currentSize * 0.3, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 1.2})`
            ctx.fill()
          }
        }
      })

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animationIdRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [
    settings.starCount, 
    settings.autoStars, 
    settings.performanceMode,
    settings.customFPS,
    settings.glowQuality,
    settings.enableAnimations
  ])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(34, 211, 238, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.05) 0%, transparent 70%),
          radial-gradient(ellipse at center, #0f0a1a 0%, #080510 40%, #030108 100%)
        `,
      }}
    />
  )
}