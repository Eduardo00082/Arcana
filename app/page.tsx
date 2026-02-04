"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Starfield } from "@/components/starfield"
import { Sparkles, Code2, Lock, Zap, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Função para navegar com animação de saída
  const handleNavigate = () => {
    setIsExiting(true)
    // Espera a animação terminar antes de navegar
    setTimeout(() => {
      router.push("/deck")
    }, 800)
  }

  /* ════════════════════════════════════════════════════════════════
     🎯 FEATURES: LISTA DE RECURSOS EXIBIDOS
     Ícones disponíveis: Code2, Lock, Zap, Sparkles, etc (lucide-react)
     Para adicionar mais, apenas adicione objetos ao array
  ════════════════════════════════════════════════════════════════ */
  const features = [
    { icon: Code2, text: "Snippets organizados" },
    { icon: Lock, text: "100% local e privado" },
    { icon: Zap, text: "Acesso instantâneo" },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Starfield Background */}
      <Starfield />

      {/* ════════════════════════════════════════════════════════════════
          ✨ TRANSIÇÃO: FLASH DE SAÍDA
          Cores: from-purple-600 via-pink-500 to-cyan-500
          Duração: duration-500 (500ms)
      ════════════════════════════════════════════════════════════════ */}
      <div 
        className={`pointer-events-none fixed inset-0 z-50 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 transition-opacity duration-500 ${
          isExiting ? "opacity-100" : "opacity-0"
        }`}
        style={{
          mixBlendMode: "screen",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════
          ✨ TRANSIÇÃO: CORTINA DE SAÍDA
          Duração: 0.8s (800ms)
          Efeito: Círculo expandindo do centro
      ════════════════════════════════════════════════════════════════ */}
      <div 
        className={`pointer-events-none fixed inset-0 z-40 bg-black transition-all duration-700 ease-in-out ${
          isExiting ? "opacity-100" : "opacity-0"
        }`}
        style={{
          clipPath: isExiting 
            ? "circle(150% at 50% 50%)" 
            : "circle(0% at 50% 50%)",
          transition: "clip-path 0.8s ease-in-out, opacity 0.3s ease-out",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════
          🔮 ORBS: ESFERAS DE GRADIENTE NO FUNDO
          Tamanho: h-96 w-96 (384px)
          Blur: blur-[120px]
          Cores: bg-purple-600/20, bg-cyan-600/20
          Opções tamanho: h-64 w-64, h-80 w-80, h-96 w-96, h-[500px] w-[500px]
          Opções blur: blur-[80px], blur-[100px], blur-[120px], blur-[150px]
      ════════════════════════════════════════════════════════════════ */}
      <div 
        className={`absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-[120px] transition-all duration-700 ${
          isExiting ? "scale-150 opacity-0" : "animate-pulse"
        }`} 
      />
      <div 
        className={`absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-600/20 blur-[120px] transition-all duration-700 ${
          isExiting ? "scale-150 opacity-0" : "animate-pulse"
        }`} 
        style={{ animationDelay: "1s" }} 
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-2 py-12">
        {/* ════════════════════════════════════════════════════════════════
    🖼️ LOGO: IMAGEM DO APP
    Container Mobile: h-24 w-24 (96px) | Desktop: md:h-32 md:w-32 (128px)
    Caminho: /images/logo-do-app.jpg (mude para o seu arquivo)
    Borda: rounded-3xl (24px)
    Opções container: h-20 w-20, h-24 w-24, h-28 w-28, h-32 w-32, h-40 w-40
    Opções borda: rounded-xl, rounded-2xl, rounded-3xl, rounded-full
════════════════════════════════════════════════════════════════ */}
<div 
  className={`mb-8 transition-all duration-700 ${
    isExiting 
      ? "scale-150 opacity-0 blur-lg" 
      : isVisible 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 -translate-y-10"
  }`}
>
  <div className="relative h-24 w-24 md:h-32 md:w-32">
    {/* Glow animado atrás da logo */}
    <div className="absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 opacity-50 blur-2xl" />
    
    {/* Imagem da logo */}
    <img 
      src="/images/icon.png"
      alt="Arcana Logo"
      className="relative h-full w-full rounded-3xl object-cover border-2 border-purple-500/50 shadow-lg"
      style={{
        boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)"
      }}
    />
  </div>
</div>

        {/* Main Content */}
        <div className="flex flex-col items-center text-center">
          {/* ════════════════════════════════════════════════════════════════
              📝 TEXTO: "Bem-vindo ao"
              Mobile: text-3xl (30px) | Desktop: md:text-4xl lg:text-5xl
              Opções: text-2xl, text-3xl, text-4xl, text-5xl
              Cores do gradiente: #d946ef, #a855f7, #6366f1, #3b82f6, #22d3ee
          ════════════════════════════════════════════════════════════════ */}
          <h2
            className={`text-3xl font-medium tracking-wide transition-all duration-700 md:text-4xl lg:text-5xl ${
              isExiting 
                ? "-translate-y-10 opacity-0 blur-sm" 
                : isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
            }`}
            style={{
              background: "linear-gradient(90deg, #d946ef 0%, #a855f7 30%, #6366f1 50%, #3b82f6 70%, #22d3ee 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transitionDelay: isExiting ? "0ms" : "100ms",
            }}
          >
            Bem-vindo ao
          </h2>

          {/* ════════════════════════════════════════════════════════════════
              📝 TÍTULO: "ARCANA" (Logo Principal)
              Mobile: text-7xl (72px) | Desktop: md:text-8xl lg:text-9xl (96px/128px)
              Opções: text-6xl, text-7xl, text-8xl, text-9xl
              Cores do gradiente: #d946ef → #22d3ee
              Glow: drop-shadow com purple e cyan
          ════════════════════════════════════════════════════════════════ */}
          <h1
            className={`mt-4 text-7xl font-black tracking-wider transition-all duration-700 md:text-8xl lg:text-9xl ${
              isExiting 
                ? "scale-110 opacity-0 blur-md" 
                : isVisible 
                  ? "opacity-100 scale-100" 
                  : "opacity-0 scale-90"
            }`}
            style={{
              background:
                "linear-gradient(90deg, #d946ef 0%, #a855f7 20%, #6366f1 40%, #3b82f6 60%, #22d3ee 80%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: isExiting 
                ? "drop-shadow(0 0 60px rgba(147, 51, 234, 0.8)) drop-shadow(0 0 120px rgba(34, 211, 238, 0.5))"
                : "drop-shadow(0 0 40px rgba(147, 51, 234, 0.6)) drop-shadow(0 0 80px rgba(34, 211, 238, 0.3))",
              transitionDelay: isExiting ? "50ms" : "200ms",
            }}
          >
            ARCANA
          </h1>

          {/* ════════════════════════════════════════════════════════════════
              📝 TAGLINE: "Sua Biblioteca Local"
              Mobile: text-xl (20px) | Desktop: md:text-2xl lg:text-3xl
              Opções: text-lg, text-xl, text-2xl, text-3xl
              Cor: Gradiente purple (#8b5cf6 → #a855f7)
          ════════════════════════════════════════════════════════════════ */}
          <p
            className={`mt-4 text-xl font-medium italic tracking-wide transition-all duration-700 md:text-2xl lg:text-3xl ${
              isExiting 
                ? "translate-y-10 opacity-0 blur-sm" 
                : isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
            }`}
            style={{
              background: "linear-gradient(90deg, #8b5cf6, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 30px rgba(139, 92, 246, 0.8)",
              transitionDelay: isExiting ? "100ms" : "300ms",
            }}
          >
            Sua Biblioteca Local
          </p>

          {/* ════════════════════════════════════════════════════════════════
              🏷️ FEATURES: BADGES DE RECURSOS
              Gap Mobile: gap-4 (16px) | Desktop: md:gap-6 (24px)
              Padding Mobile: px-4 py-2 | Desktop: md:px-6 md:py-3
              Ícone Mobile: h-4 w-4 | Desktop: md:h-5 md:w-5
              Texto Mobile: text-sm | Desktop: md:text-base
          ════════════════════════════════════════════════════════════════ */}
          <div 
            className={`mt-12 flex flex-wrap justify-center gap-4 transition-all duration-700 md:gap-6 ${
              isExiting 
                ? "translate-y-10 opacity-0 blur-sm" 
                : isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionDelay: isExiting ? "150ms" : "500ms",
            }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/30 px-4 py-2 backdrop-blur-sm transition-all hover:border-purple-400/50 hover:bg-purple-900/40 md:px-6 md:py-3 ${
                  isExiting ? "scale-90" : ""
                }`}
                style={{
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)",
                  transitionDelay: isExiting ? `${150 + index * 50}ms` : `${600 + index * 100}ms`,
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

        {/* ════════════════════════════════════════════════════════════════
            🔘 BOTÃO CTA: "Começar agora"
            Padding Mobile: px-12 py-5 | Desktop: md:px-16 md:py-6
            Texto Mobile: text-xl (20px) | Desktop: md:text-2xl (24px)
            Margem top Mobile: mt-16 | Desktop: md:mt-20
            Borda arredondada: rounded-2xl (16px)
            Opções padding: px-8 py-4, px-10 py-5, px-12 py-5, px-16 py-6
            Opções texto: text-lg, text-xl, text-2xl
        ════════════════════════════════════════════════════════════════ */}
        <button
          onClick={handleNavigate}
          disabled={isExiting}
          className={`group relative mt-16 overflow-hidden rounded-2xl px-12 py-5 text-xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95 disabled:pointer-events-none md:mt-20 md:px-16 md:py-6 md:text-2xl ${
            isExiting 
              ? "scale-125 opacity-0 blur-lg" 
              : isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-10"
          }`}
          style={{
            border: "2px solid rgba(168, 85, 247, 0.5)",
            background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.2))",
            boxShadow: isExiting
              ? `
                0 0 80px rgba(168, 85, 247, 0.8),
                0 0 160px rgba(168, 85, 247, 0.4),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `
              : `
                0 0 40px rgba(168, 85, 247, 0.4),
                0 0 80px rgba(168, 85, 247, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            transitionDelay: isExiting ? "0ms" : "700ms",
          }}
        >
          {/* Animated Background */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: "linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.3))",
            }}
          />

          {/* ════════════════════════════════════════════════════════════════
              🔘 BOTÃO: CONTEÚDO INTERNO
              Ícone seta: h-6 w-6 (24px)
              Opções ícone: h-5 w-5, h-6 w-6, h-7 w-7
          ════════════════════════════════════════════════════════════════ */}
          <span className="relative z-10 flex items-center gap-3 tracking-wide">
            {isExiting ? "Entrando..." : "Começar agora"}
            <ArrowRight className={`h-6 w-6 transition-transform ${isExiting ? "translate-x-2" : "group-hover:translate-x-1"}`} />
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
            className={`absolute inset-0 rounded-2xl opacity-75 ${isExiting ? "hidden" : ""}`}
            style={{
              background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.2))",
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
            }}
          />
        </button>

        {/* ════════════════════════════════════════════════════════════════
            ✨ PARTÍCULAS FLUTUANTES
            Quantidade: 6 partículas (mude o Array(6))
            Tamanho: h-2 w-2 (8px)
            Cores: #a855f7 (purple), #ec4899 (pink), #22d3ee (cyan)
            Animação: float (4-6.5s)
            Opções tamanho: h-1 w-1, h-2 w-2, h-3 w-3
            Opções quantidade: Array(4), Array(6), Array(8), Array(10)
        ════════════════════════════════════════════════════════════════ */}
        <div className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${isExiting ? "opacity-0" : ""}`}>
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

        {/* ════════════════════════════════════════════════════════════════
            📝 HINT: TEXTO INFERIOR
            Mobile: text-sm (14px) | Desktop: md:text-base (16px)
            Cor: text-gray-500
            Margem top: mt-12 (48px)
        ════════════════════════════════════════════════════════════════ */}
        <p
          className={`mt-12 text-sm text-gray-500 transition-all duration-700 md:text-base ${
            isExiting 
              ? "translate-y-5 opacity-0" 
              : isVisible 
                ? "opacity-100" 
                : "opacity-0"
          }`}
          style={{
            transitionDelay: isExiting ? "200ms" : "1000ms",
          }}
        >
          Seus dados ficam salvos localmente no seu dispositivo
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          🎬 ANIMAÇÕES GLOBAIS
          
          float: Animação de flutuação das partículas
          - Duração base: 4s (mude no style das partículas)
          - Movimento Y: -30px máximo
          - Movimento X: -10px a +10px
          
          ping: Animação do pulse ring do botão
          - Duração: 2s
          - Scale: 1.1 (110%)
      ════════════════════════════════════════════════════════════════ */}
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