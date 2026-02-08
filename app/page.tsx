"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Starfield } from "@/components/starfield"
import { Code2, Lock, Zap, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleNavigate = () => {
    setIsExiting(true)
    setTimeout(() => {
      router.push("/deck")
    }, 800)
  }

  /* ════════════════════════════════════════════════════════════════
     🎯 FEATURES: LISTA DE RECURSOS EXIBIDOS
  ════════════════════════════════════════════════════════════════ */
  const features = [
    { icon: Code2, text: "Snippets organizados" },
    { icon: Lock, text: "100% local e privado" },
    { icon: Zap, text: "Acesso instantâneo" },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <Starfield />

      {/* ════════════════════════════════════════════════════════════════
          ✨ TRANSIÇÃO: FLASH DE SAÍDA
      ════════════════════════════════════════════════════════════════ */}
      <div 
        className={`pointer-events-none fixed inset-0 z-50 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 transition-opacity duration-500 ${
          isExiting ? "opacity-100" : "opacity-0"
        }`}
        style={{ mixBlendMode: "screen" }}
      />

      {/* ════════════════════════════════════════════════════════════════
          ✨ TRANSIÇÃO: CORTINA DE SAÍDA
      ════════════════════════════════════════════════════════════════ */}
      <div 
        className={`pointer-events-none fixed inset-0 z-40 bg-black transition-all duration-700 ease-in-out ${
          isExiting ? "opacity-100" : "opacity-0"
        }`}
        style={{
          clipPath: isExiting ? "circle(150% at 50% 50%)" : "circle(0% at 50% 50%)",
          transition: "clip-path 0.8s ease-in-out, opacity 0.3s ease-out",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════
          🔮 ORBS: ESFERAS DE GRADIENTE NO FUNDO
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

      {/* ════════════════════════════════════════════════════════════════
          📐 CONTAINER CENTRAL: LAYOUT COM VH PROPORCIONAL
          
          ── VALORES VH (Mobile) ──
          Escalam automaticamente com a altura da tela!
          
          ── VALORES FIXOS (Desktop md+) ──
          Usa valores em rem/px para controle preciso
          
          ── TABELA DE CONVERSÃO ──
          Básico (740px)  │ Intermediário (900px) │ Premium (1000px)
          7vh = 52px      │ 7vh = 63px            │ 7vh = 70px
      ════════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-between px-4 py-[7vh] md:h-auto md:justify-center md:gap-12 md:py-12 lg:gap-16 lg:py-16">
        
        {/* ═══════════════════════════════════════════════════════════════
            📦 BLOCO 1: LOGO
            
            ── TAMANHO VH ──
            h-[12vh] = 12% da altura da tela
            Básico: 89px │ Intermediário: 108px │ Premium: 120px
            
            ── ASPECTO ──
            Mantém proporção quadrada com aspect-square
        ═══════════════════════════════════════════════════════════════ */}
        <div 
          className={`transition-all duration-700 ${
            isExiting 
              ? "scale-150 opacity-0 blur-lg" 
              : isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 -translate-y-10"
          }`}
        >
          <div className="relative h-[16vh] w-[16vh] min-h-[80px] min-w-[80px] md:h-28 md:w-28 lg:h-32 lg:w-32">
            <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 opacity-50 blur-2xl md:rounded-3xl" />
            <img 
              src="/images/icon.png"
              alt="Arcana Logo"
              className="relative h-full w-full rounded-2xl border-2 border-purple-500/50 object-cover shadow-lg md:rounded-3xl"
              style={{ boxShadow: "0 0 30px rgba(147, 51, 234, 0.4)" }}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            📦 BLOCO 2: CONTEÚDO CENTRAL
            
            ── GAP VH ──
            gap-[2.5vh] = espaçamento proporcional à tela
            Básico: 19px │ Intermediário: 23px │ Premium: 25px
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center gap-[2.5vh] text-center md:gap-5 lg:gap-6">
          
          {/* ════════════════════════════════════════════════════════════════
              📝 "Bem-vindo ao" - BASE (1x)
              
              ── TAMANHO VH ──
              text-[3.5vh] = 3.5% da altura
              Básico: 26px │ Intermediário: 32px │ Premium: 35px
          ════════════════════════════════════════════════════════════════ */}
          <h2
            className={`text-[3.5vh] font-medium tracking-wide transition-all duration-700 md:text-3xl lg:text-4xl xl:text-5xl ${
              isExiting 
                ? "-translate-y-10 opacity-0 blur-sm" 
                : isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
            }`}
            style={{
              marginTop: 'clamp(-30px, -4vh, -15px)',
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
              📝 "ARCANA" - TÍTULO (3.5x)
              
              ── TAMANHO VH ──
              text-[10vh] = 10% da altura (IMPACTANTE!)
              Básico: 74px │ Intermediário: 90px │ Premium: 100px
          ════════════════════════════════════════════════════════════════ */}
<h1
  className={`arcana-title font-black tracking-wider transition-all duration-700 md:text-8xl lg:text-9xl ${
    isExiting 
      ? "scale-110 opacity-0 blur-md" 
      : isVisible 
        ? "opacity-100 scale-100" 
        : "opacity-0 scale-90"
  }`}
  style={{
    background: "linear-gradient(90deg, #d946ef 0%, #a855f7 20%, #6366f1 40%, #3b82f6 60%, #22d3ee 80%, #06b6d4 100%)",
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
              📝 TAGLINE (0.8x)
              
              ── TAMANHO VH ──
              text-[2.2vh] = sutil mas legível
              Básico: 16px │ Intermediário: 20px │ Premium: 22px
          ════════════════════════════════════════════════════════════════ */}
          <p
  className={`-mt-[4vh] text-[2.2vh] font-medium italic tracking-wide transition-all duration-700 md:mt-0 md:text-xl lg:text-2xl xl:text-3xl ${
    isExiting 
      ? "translate-y-10 opacity-0 blur-sm" 
      : isVisible 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 translate-y-10"
  }`}
  style={{
    marginTop: 'clamp(-30px, -4vh, -20px)',
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
              🏷️ FEATURES - BADGES (0.6x)
              
              ── MARGIN VH ──
              mt-[6vh] = espaço generoso proporcional
              Básico: 44px │ Intermediário: 54px │ Premium: 60px
              
              ── GAP VH ──
              gap-[1.5vh] = espaçamento entre badges
              Básico: 11px │ Intermediário: 14px │ Premium: 15px
          ════════════════════════════════════════════════════════════════ */}
<div 
  className={`flex flex-wrap justify-center transition-all duration-700 md:mt-8 md:gap-4 lg:mt-10 lg:gap-5 ${
    isExiting 
      ? "translate-y-10 opacity-0 blur-sm" 
      : isVisible 
        ? "opacity-100 translate-y-0" 
        : "opacity-0 translate-y-10"
  }`}
  style={{
    marginTop: 'clamp(35px, 6vh, 70px)',
    gap: 'clamp(10px, 3vh, 30px)'
  }}
>
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-[0.8vh] rounded-full border border-purple-500/30 bg-purple-950/30 px-[2vh] py-[1vh] backdrop-blur-sm transition-all hover:border-purple-400/50 hover:bg-purple-900/40 md:gap-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 ${
                  isExiting ? "scale-90" : ""
                }`}
                style={{
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.1)",
                  transitionDelay: isExiting ? `${150 + index * 50}ms` : `${600 + index * 100}ms`,
                }}
              >
                <feature.icon className="h-[1.8vh] w-[1.8vh] min-h-[14px] min-w-[14px] text-purple-400 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                <span 
  className="font-medium text-purple-200 md:text-base lg:text-lg"
  style={{ fontSize: 'clamp(12px, 1.5vh, 18px)' }}
>
  {feature.text}
</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            📦 BLOCO 3: BOTÃO + HINT
            
            ── GAP VH ──
            gap-[2vh] = espaço entre botão e hint
            Básico: 15px │ Intermediário: 18px │ Premium: 20px
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col items-center gap-[2vh] md:gap-5 lg:gap-6">
          
          {/* ════════════════════════════════════════════════════════════════
              🔘 BOTÃO CTA (0.9x)
              
              ── PADDING VH ──
              px-[3vh] py-[1.8vh] = botão proporcional
              text-[2.2vh] = texto legível em todas as telas
          ════════════════════════════════════════════════════════════════ */}
          <button
            onClick={handleNavigate}
            disabled={isExiting}
            className={`group relative overflow-hidden rounded-2xl px-[3vh] py-[1.8vh] text-[2.2vh] font-semibold text-white transition-all duration-500 hover:scale-105 hover:shadow-2xl active:scale-95 disabled:pointer-events-none md:rounded-3xl md:px-10 md:py-4 md:text-xl lg:px-12 lg:py-5 lg:text-2xl ${
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
                ? "0 0 80px rgba(168, 85, 247, 0.8), 0 0 160px rgba(168, 85, 247, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                : "0 0 40px rgba(168, 85, 247, 0.4), 0 0 80px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              transitionDelay: isExiting ? "0ms" : "700ms",
            }}
          >
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "linear-gradient(135deg, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.3))" }}
            />
            <span className="relative z-10 flex items-center gap-[1vh] tracking-wide md:gap-3">
              {isExiting ? "Entrando..." : "Começar agora"}
              <ArrowRight className={`h-[2.5vh] w-[2.5vh] min-h-[18px] min-w-[18px] transition-transform md:h-7 md:w-7 lg:h-8 lg:w-8 ${isExiting ? "translate-x-2" : "group-hover:translate-x-1"}`} />
            </span>
            <div
              className="absolute inset-0 translate-x-[-100%] opacity-50 transition-transform duration-1000 group-hover:translate-x-[100%]"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)" }}
            />
            <div 
              className={`absolute inset-0 rounded-2xl opacity-75 md:rounded-3xl ${isExiting ? "hidden" : ""}`}
              style={{
                background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.2))",
                animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
              }}
            />
          </button>

          {/* ════════════════════════════════════════════════════════════════
              📝 HINT (0.5x)
              
              ── TAMANHO VH ──
              text-[1.3vh] = discreto mas legível
              Básico: 10px │ Intermediário: 12px │ Premium: 13px
          ════════════════════════════════════════════════════════════════ */}
<p
  className={`text-gray-500 transition-all duration-700 md:text-sm lg:text-base ${
    isExiting 
      ? "translate-y-5 opacity-0" 
      : isVisible 
        ? "opacity-100" 
        : "opacity-0"
  }`}
  style={{ 
    transitionDelay: isExiting ? "200ms" : "1000ms",
    fontSize: 'clamp(10px, 1.3vh, 14px)'
  }}
>
            Seus dados ficam salvos localmente no seu dispositivo
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          🎬 ANIMAÇÕES GLOBAIS
      ════════════════════════════════════════════════════════════════ */}
<style jsx global>{`
  .arcana-title {
    font-size: clamp(60px, 9vh, 100px);
    margin-top: clamp(-30px, -4vh, -15px);
  }
  
  @media (min-width: 768px) {
    .arcana-title {
      font-size: 6rem;      /* md: ~96px */
      margin-top: 0;
    }
  }
  
  @media (min-width: 1024px) {
    .arcana-title {
      font-size: 8rem;      /* lg: ~128px */
    }
  }
  
  @media (min-width: 1280px) {
    .arcana-title {
      font-size: 9rem;     /* xl: ~160px */
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0) translateX(0); }
    25% { transform: translateY(-20px) translateX(10px); }
    50% { transform: translateY(-10px) translateX(-10px); }
    75% { transform: translateY(-30px) translateX(5px); }
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