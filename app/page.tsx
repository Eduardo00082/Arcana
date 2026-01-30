"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Starfield } from "@/components/starfield"
import { Sparkles, Code2, Lock, Zap, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    { icon: Code2, text: "Snippets organizados" },
    { icon: Lock, text: "100% local e privado" },
    { icon: Zap, text: "Acesso instantâneo" },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Starfield Background */}
      <Starfield />

      {/* Gradient Orbs */}
      <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-600/20 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 animate-pulse rounded-full bg-cyan-600/20 blur-[120px]" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12">
        {/* Logo Image (opcional) */}
        <div 
          className={`mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="relative h-24 w-24 md:h-32 md:w-32">
            <div className="absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 opacity-50 blur-2xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-3xl border-2 border-purple-500/50 bg-black/50 backdrop-blur-sm">
              <Sparkles className="h-12 w-12 text-purple-400 md:h-16 md:w-16" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center">
          {/* Welcome Text */}
          <h2
            className={`text-3xl font-medium tracking-wide transition-all duration-1000 delay-100 md:text-4xl lg:text-5xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              background: "linear-gradient(90deg, #d946ef 0%, #a855f7 30%, #6366f1 50%, #3b82f6 70%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Bem-vindo ao
          </h2>

          {/* ARCANA Logo */}
          <h1
            className={`mt-4 text-7xl font-black tracking-wider transition-all duration-1000 delay-200 md:text-8xl lg:text-9xl ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{
              background:
                "linear-gradient(90deg, #d946ef 0%, #a855f7 20%, #6366f1 40%, #3b82f6 60%, #22d3ee 80%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(147, 51, 234, 0.6)) drop-shadow(0 0 80px rgba(34, 211, 238, 0.3))",
            }}
          >
            ARCANA
          </h1>

          {/* Tagline */}
          <p
            className={`mt-4 text-xl font-medium italic tracking-wide transition-all duration-1000 delay-300 md:text-2xl lg:text-3xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              background: "linear-gradient(90deg, #8b5cf6, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(139, 92, 246, 0.8)",
            }}
          >
            Seu espaço pessoal de código
          </p>

          {/* Features */}
          <div 
            className={`mt-12 flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-500 md:gap-6 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-2 backdrop-blur-sm transition-all hover:border-purple-400/50 hover:bg-purple-900/40 md:px-6 md:py-3"
                style={{
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)",
                  animationDelay: `${600 + index * 100}ms`,
                }}
              >
                <feature.icon className="h-4 w-4 text-purple-400 md:h-5 md:w-5" />
                <span className="text-sm font-medium text-purple-200 md:text-base">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => router.push("/deck")}
          className={`group relative mt-16 overflow-hidden rounded-2xl px-12 py-5 text-xl font-semibold text-white transition-all duration-500 delay-700 hover:scale-105 hover:shadow-2xl active:scale-95 md:mt-20 md:px-16 md:py-6 md:text-2xl ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            border: "2px solid rgba(168, 85, 247, 0.5)",
            background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.2))",
            boxShadow: `
              0 0 40px rgba(168, 85, 247, 0.4),
              0 0 80px rgba(168, 85, 247, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
          }}
        >
          {/* Animated Background */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.3))",
            }}
          />

          {/* Button Content */}
          <span className="relative z-10 flex items-center gap-3 tracking-wide">
            Começar agora
            <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
          </span>

          {/* Shine Effect */}
          <div
            className="absolute inset-0 translate-x-[-100%] opacity-50 transition-transform duration-1000 group-hover:translate-x-[100%]"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
            }}
          />

          {/* Pulse Ring */}
          <div 
            className="absolute inset-0 rounded-2xl opacity-75"
            style={{
              background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.2))",
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
        </button>

        {/* Floating Particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
                background: i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#ec4899" : "#22d3ee",
                opacity: 0.3,
                animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
                boxShadow: `0 0 20px ${i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#ec4899" : "#22d3ee"}`,
              }}
            />
          ))}
        </div>

        {/* Bottom Hint */}
        <p
          className={`mt-12 text-sm text-gray-500 transition-all duration-1000 delay-1000 md:text-base ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Seus dados ficam salvos localmente no seu navegador
        </p>
      </div>

      {/* Global Animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
    </main>
  )
}
