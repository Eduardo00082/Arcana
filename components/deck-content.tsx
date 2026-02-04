"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { CardGrid } from "@/components/card-grid"
import { Starfield } from "@/components/starfield"
import { CardModal } from "@/components/card-modal"
import { CreateCardModal } from "@/components/create-card-modal"
import { SettingsPanel } from "@/components/settings-panel"
import { useArcana, type Card } from "@/contexts/arcana-context"
import { 
  Plus, 
  Search, 
  X, 
  Sparkles, 
  Rocket, 
  Layers,
  Zap,
  Heart,
  Wand2
} from "lucide-react"

export function DeckContent() {
  const { settings, searchQuery, setSearchQuery } = useArcana()
  
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [activeView, setActiveView] = useState<"deck" | "boost" | "sobre">("deck")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  
  /* ════════════════════════════════════════════════════════════════
     ⏱️ ANIMAÇÃO INICIAL: SINCRONIZAÇÃO COM WELCOME
     initialDelay: Tempo para esperar a transição da Welcome (ms)
     Opções: 200, 300, 400, 500
  ════════════════════════════════════════════════════════════════ */
  const [isReady, setIsReady] = useState(false)
  const [viewTransition, setViewTransition] = useState(false)
  const initialDelay = 400 // ← Ajuste aqui para sincronizar

  // Delay inicial ao carregar a página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
      setViewTransition(true)
    }, initialDelay)
    
    return () => clearTimeout(timer)
  }, [])

  // Transição ao mudar de view (deck/boost/sobre)
  useEffect(() => {
    if (isReady) {
      setViewTransition(false)
      const timer = setTimeout(() => setViewTransition(true), 50)
      return () => clearTimeout(timer)
    }
  }, [activeView, isReady])

  const neonIntensity = settings.neonIntensity / 100

  useEffect(() => {
    setViewTransition(false)
    const timer = setTimeout(() => setViewTransition(true), 50)
    return () => clearTimeout(timer)
  }, [activeView])

  const isSearchActive = isSearchFocused || searchQuery.length > 0

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  const renderContent = () => {
    switch (activeView) {
      case "deck":
        return <CardGrid onCardClick={setSelectedCard} />

      case "boost":
        return (
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <div className="text-center">
              {/* ════════════════════════════════════════════════════════
                  🚀 BOOST: CONTAINER DO ÍCONE
                  Tamanho: h-32 w-32 (128px)
                  Opções: h-24 w-24, h-28 w-28, h-32 w-32, h-36 w-36
              ════════════════════════════════════════════════════════ */}
              <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.2))",
                    animation: "pulse 3s ease-in-out 0s infinite",
                    boxShadow: `0 0 ${40 * neonIntensity}px rgba(147, 51, 234, ${0.4 * neonIntensity})`
                  }}
                />
                
                <div 
                  className="absolute inset-4 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(147, 51, 234, 0.3))",
                    animation: "pulse 3s ease-in-out 0.5s infinite"
                  }}
                />
                
                {/* ════════════════════════════════════════════════════════
                    🚀 BOOST: ÍCONE CENTRAL
                    Container: h-16 w-16 (64px)
                    Ícone: h-8 w-8 (32px)
                    Opções container: h-12 w-12, h-14 w-14, h-16 w-16, h-20 w-20
                    Opções ícone: h-6 w-6, h-7 w-7, h-8 w-8, h-10 w-10
                ════════════════════════════════════════════════════════ */}
                <div 
                  className="relative flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #9333ea, #ec4899)",
                    boxShadow: `0 0 ${30 * neonIntensity}px rgba(147, 51, 234, ${0.6 * neonIntensity})`
                  }}
                >
                  <Rocket className="h-8 w-8 text-white" />
                </div>

                <div 
                  className="absolute -right-2 top-4 h-3 w-3 rounded-full bg-arcana-cyan"
                  style={{ animation: "float 4s ease-in-out 0s infinite" }}
                />
                <div 
                  className="absolute -left-1 bottom-6 h-2 w-2 rounded-full bg-arcana-pink"
                  style={{ animation: "float 4s ease-in-out 1s infinite" }}
                />
                <div 
                  className="absolute right-4 bottom-2 h-2.5 w-2.5 rounded-full bg-arcana-purple"
                  style={{ animation: "float 4s ease-in-out 2s infinite" }}
                />
              </div>
              
              {/* ════════════════════════════════════════════════════════
                  📝 BOOST: TÍTULO
                  Tamanho: text-2xl (24px)
                  Opções: text-xl, text-2xl, text-3xl
              ════════════════════════════════════════════════════════ */}
              <h3 className="mb-3 text-2xl font-bold text-white">
                Arcana Boost
              </h3>

              {/* ════════════════════════════════════════════════════════
                  📝 BOOST: DESCRIÇÃO
                  Tamanho: text-base (16px) - padrão
                  Opções: text-sm, text-base, text-lg
              ════════════════════════════════════════════════════════ */}
              <p className="mb-6 text-gray-400">
                Recursos avançados em desenvolvimento
              </p>

              <div className="mx-auto grid max-w-md gap-3">
                {[
                  { icon: Zap, label: "Snippets com IA", color: "#22d3ee" },
                  { icon: Layers, label: "Coleções", color: "#a855f7" },
                  { icon: Sparkles, label: "Templates Mágicos", color: "#ec4899" },
                  { icon: Wand2, label: "E muito mais! ✨", color: "#fb923c", isSpecial: true },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}
                  >
                    {/* ════════════════════════════════════════════════════════
                        🎯 BOOST: ÍCONE DOS FEATURES
                        Container: h-10 w-10 (40px)
                        Ícone: h-5 w-5 (20px)
                    ════════════════════════════════════════════════════════ */}
                    <div 
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: `${feature.color}20` }}
                    >
                      <feature.icon className="h-5 w-5" style={{ color: feature.color }} />
                    </div>
  {/* ════════════════════════════════════════════════════════
    📝 BOOST: LABEL DOS FEATURES
    Tamanho: text-sm (14px)
    Opções: text-xs, text-sm, text-base
════════════════════════════════════════════════════════ */}
<span 
  className={`text-sm ${feature.isSpecial ? "font-medium text-orange-400" : "text-gray-300"}`}
>
  {feature.label}
</span>
                    {/* ════════════════════════════════════════════════════════
                        🏷️ BOOST: BADGE "EM BREVE"
                        Tamanho: text-[10px]
                        Opções: text-[8px], text-[9px], text-[10px], text-xs
                        Nota: Não aparece no item "E muito mais!"
                    ════════════════════════════════════════════════════════ */}
                    {!feature.isSpecial && (
                      <span 
                        className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium uppercase"
                        style={{
                          background: "rgba(251, 146, 60, 0.15)",
                          color: "#fb923c"
                        }}
                      >
                        Em breve
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "sobre":
        return (
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <div className="max-w-2xl text-center">
              {/* ════════════════════════════════════════════════════════
                  🖼️ SOBRE: LOGO
                  Tamanho: h-40 w-40 (160px)
                  Opções: h-32 w-32, h-36 w-36, h-40 w-40, h-48 w-48
              ════════════════════════════════════════════════════════ */}
              <div className="relative mx-auto mb-8 h-40 w-40">
                <div 
                  className="absolute inset-0 rounded-3xl opacity-50 blur-3xl"
                  style={{
                    background: "linear-gradient(135deg, #9333ea, #ec4899)",
                    animation: "pulse 4s ease-in-out 0s infinite"
                  }}
                />
                <img 
                  src="/images/icon.png" 
                  alt="Arcana Logo" 
                  className="relative h-40 w-40 rounded-3xl object-cover transition-transform duration-300 hover:scale-105"
                  style={{
                    border: "2px solid rgba(147, 51, 234, 0.5)",
                    boxShadow: `0 0 ${40 * neonIntensity}px rgba(147, 51, 234, ${0.4 * neonIntensity})`
                  }}
                />
              </div>
              
              {/* ════════════════════════════════════════════════════════
    📝 SOBRE: NOME DO APP "ARCANA" (COM ANIMAÇÃO RGB)
    Mobile: text-5xl (48px) | Desktop: md:text-6xl (60px)
    Opções: text-4xl, text-5xl, text-6xl, text-7xl
    
    🎨 ANIMAÇÃO:
    - Duração: 8s (mude no animation)
    - Cores: Edite no @keyframes rgbGradient
════════════════════════════════════════════════════════ */}
<h3 
  className="arcana-title mb-3 text-5xl font-black tracking-wider md:text-6xl"
  style={{
    background: "linear-gradient(135deg, var(--color-1), var(--color-2), var(--color-3), var(--color-4), var(--color-1))",
    backgroundSize: "300% 300%",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "rgbGradient 8s ease infinite, textGlow 2s ease-in-out infinite alternate",
    filter: "drop-shadow(0 0 30px rgba(147, 51, 234, 0.5))"
  }}
>
  ARCANA
</h3>

<style jsx>{`
  .arcana-title {
    --color-1: #ffffff;
    --color-2: #a855f7;
    --color-3: #ec4899;
    --color-4: #22d3ee;
  }
  
  @keyframes rgbGradient {
    0%, 100% {
      background-position: 0% 50%;
    }
    25% {
      background-position: 50% 100%;
    }
    50% {
      background-position: 100% 50%;
    }
    75% {
      background-position: 50% 0%;
    }
  }
  
  @keyframes textGlow {
    0% {
      filter: drop-shadow(0 0 20px rgba(147, 51, 234, 0.4)) drop-shadow(0 0 40px rgba(236, 72, 153, 0.2));
    }
    100% {
      filter: drop-shadow(0 0 30px rgba(236, 72, 153, 0.6)) drop-shadow(0 0 60px rgba(34, 211, 238, 0.3));
    }
  }
`}</style>
              
              {/* ════════════════════════════════════════════════════════
                  📝 SOBRE: TAGLINE
                  Mobile: text-lg (18px) | Desktop: md:text-xl (20px)
                  Opções: text-base, text-lg, text-xl, text-2xl
              ════════════════════════════════════════════════════════ */}
              <p className="mb-2 text-lg font-semibold text-arcana-cyan md:text-xl">
                Sua Biblioteca de Códigos
              </p>
              
              {/* ════════════════════════════════════════════════════════
                  🏷️ SOBRE: BADGE VERSÃO
                  Tamanho: text-xs (12px)
                  Opções: text-[10px], text-[11px], text-xs, text-sm
              ════════════════════════════════════════════════════════ */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5" style={{
                background: "rgba(147, 51, 234, 0.15)",
                border: "1px solid rgba(147, 51, 234, 0.3)"
              }}>
                <span className="text-xs font-medium text-arcana-purple">v0.2.0-beta</span>
              </div>
              
              {/* ════════════════════════════════════════════════════════
                  📝 SOBRE: DESCRIÇÃO
                  Mobile: text-base (16px) | Desktop: md:text-lg (18px)
                  Opções: text-sm, text-base, text-lg
              ════════════════════════════════════════════════════════ */}
              <p className="mb-10 text-base leading-relaxed text-gray-400 md:text-lg">
                Gerenciador de snippets e informações técnicas com armazenamento 
                local e privado. Organize, busque e acesse seus códigos favoritos 
                com segurança e elegância.
              </p>

              {/* Info Cards */}
              <div 
                className="mb-10 grid grid-cols-3 gap-4 rounded-2xl p-6"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
                }}
              >
                {[
                  { label: "Licença", value: "MIT" },
                  { label: "Storage", value: "Local" },
                  { label: "Open Source", value: "GitHub" },
                ].map((info, index) => (
                  <div key={index} className="text-center">
                    {/* ════════════════════════════════════════════════════════
                        📝 SOBRE: INFO CARDS - LABEL
                        Mobile: text-[10px] | Desktop: md:text-xs (12px)
                        Opções: text-[8px], text-[9px], text-[10px], text-xs
                    ════════════════════════════════════════════════════════ */}
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 md:text-xs">
                      {info.label}
                    </p>
                    {/* ════════════════════════════════════════════════════════
                        📝 SOBRE: INFO CARDS - VALOR
                        Mobile: text-sm (14px) | Desktop: md:text-base (16px)
                        Opções: text-xs, text-sm, text-base, text-lg
                    ════════════════════════════════════════════════════════ */}
                    <p className="mt-2 text-sm font-bold text-white md:text-base">
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="space-y-4">
                {/* ════════════════════════════════════════════════════════
                    🔗 SOBRE: BOTÃO GITHUB
                    Ícone: h-5 w-5 (20px)
                    Texto: text-sm (14px)
                ════════════════════════════════════════════════════════ */}
                <a 
                  href="https://github.com/Eduardo00082/Arcana" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group mx-auto flex w-fit items-center gap-3 rounded-xl px-5 py-3 transition-all duration-300 hover:scale-105"
                  style={{
                    background: "rgba(147, 51, 234, 0.1)",
                    border: "1px solid rgba(147, 51, 234, 0.3)",
                  }}
                >
                  <svg className="h-5 w-5 text-arcana-purple transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="text-sm font-semibold text-arcana-purple transition-colors group-hover:text-arcana-pink">
                    Ver no GitHub
                  </span>
                </a>

                {/* ════════════════════════════════════════════════════════
                    📝 SOBRE: CRÉDITOS
                    Texto: text-sm (14px)
                    Ícone coração: h-4 w-4 (16px)
                ════════════════════════════════════════════════════════ */}
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <span>Criado com</span>
                  <Heart 
                    className="h-4 w-4 text-arcana-pink" 
                    style={{ animation: "pulse 2s ease-in-out 0s infinite" }} 
                  />
                  <span>por</span>
                  <span className="font-medium text-white">Luna</span>
                  <span className="text-gray-500">&</span>
                  <a 
                    href="https://github.com/Eduardo00082" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="font-semibold text-arcana-cyan transition-all duration-200 hover:scale-105 hover:text-arcana-purple"
                  >
                    Eduardo00082
                  </a>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return <CardGrid onCardClick={setSelectedCard} />
    }
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <Starfield />

      <div className="relative z-10 flex h-screen flex-row">
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView} 
          onSettingsClick={() => setIsSettingsOpen(true)} 
        />

        {/* ════════════════════════════════════════════════════════════════
            📦 MAIN: CONTAINER EXTERNO (margem do painel)
            Padding Mobile: p-3 (12px) | Desktop: md:p-6 (24px)
            Opções: p-2, p-3, p-4, p-5, p-6, p-8
            flex-1: Ocupa todo espaço restante após a Sidebar
        ════════════════════════════════════════════════════════════════ */}
        <main className="flex-1 overflow-hidden p-1 md:p-3">
          {/* ════════════════════════════════════════════════════════════════
              📦 PAINEL PRINCIPAL: CARD COM BORDA ROXA
              Altura: h-full (100%)
              Borda arredondada Mobile: rounded-2xl (16px)
              Borda arredondada Desktop: md:rounded-3xl (24px)
              Opções: rounded-xl, rounded-2xl, rounded-3xl
          ════════════════════════════════════════════════════════════════ */}
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-2xl md:rounded-3xl"
            style={{
              border: "0px solid rgba(147, 51, 234, 0.25)",
              background: "rgba(5, 0, 15, 0.3)",
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: `
                0 0 ${40 * neonIntensity}px rgba(147, 51, 234, ${0.15 * neonIntensity}),
                inset 0 1px 0 rgba(255, 255, 255, 0.02)
              `,
            }}
          >
            {/* Linha decorativa superior */}
            <div 
              className="absolute left-8 right-8 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)"
              }}
            />

            {/* ════════════════════════════════════════════════════════════════
                🔍 SEARCH BAR (só aparece na view "deck")
            ════════════════════════════════════════════════════════════════ */}
            {activeView === "deck" && (
              <div className="flex-shrink-0 p-4 pb-0 md:p-6 md:pb-0">
                <div
                  className={`relative flex items-center overflow-hidden rounded-2xl transition-all duration-300 ${
                    isSearchActive ? "scale-[1.01]" : "scale-100"
                  }`}
                  style={{
                    background: isSearchActive
                      ? "rgba(20, 10, 40, 0.6)"
                      : "rgba(15, 8, 30, 0.4)",
                    border: isSearchActive
                      ? "1px solid rgba(147, 51, 234, 0.4)"
                      : "1px solid rgba(147, 51, 234, 0.2)",
                    boxShadow: isSearchActive
                      ? `0 0 ${25 * neonIntensity}px rgba(147, 51, 234, ${0.2 * neonIntensity})`
                      : undefined,
                  }}
                >
                  {/* ════════════════════════════════════════════════════════
                      🔍 SEARCH: ÍCONE DE BUSCA
                      Container Mobile: h-9 w-9 | Desktop: md:h-10 md:w-10
                      Ícone Mobile: h-4 w-4 | Desktop: md:h-5 md:w-5
                  ════════════════════════════════════════════════════════ */}
                  <div
                    className={`ml-3 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 md:ml-4 md:h-10 md:w-10 ${
                      isSearchActive ? "scale-105" : "scale-100"
                    }`}
                    style={{
                      background: isSearchActive ? "rgba(147, 51, 234, 0.15)" : "transparent",
                    }}
                  >
                    <Search
                      className={`h-4 w-4 transition-colors duration-300 md:h-5 md:w-5 ${
                        isSearchActive ? "text-arcana-purple" : "text-gray-500"
                      }`}
                    />
                  </div>

                  {/* ════════════════════════════════════════════════════════
                      🔍 SEARCH: INPUT DE TEXTO
                      Fonte Mobile: text-sm (14px) | Desktop: md:text-base (16px)
                      Padding Mobile: px-3 py-3 | Desktop: md:px-4 md:py-4
                  ════════════════════════════════════════════════════════ */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Pesquisar cartas, tags, código..."
                    className="flex-1 bg-transparent px-3 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none md:px-4 md:py-4 md:text-base"
                    style={{ caretColor: "#a855f7" }}
                  />

                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white/10 hover:text-white md:mr-4"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Header da view Boost */}
            {activeView === "boost" && (
              <div className="flex-shrink-0 p-4 pb-0 md:p-6 md:pb-0">
                <div className="flex items-center gap-3">
                  <div 
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(34, 211, 238, 0.15)",
                    }}
                  >
                    <Rocket className="h-5 w-5 text-arcana-cyan" />
                  </div>
                  <div>
                    {/* ════════════════════════════════════════════════════════
                        📝 BOOST HEADER: TÍTULO
                        Mobile: text-lg (18px) | Desktop: md:text-xl (20px)
                    ════════════════════════════════════════════════════════ */}
                    <h2 className="text-lg font-bold text-white md:text-xl">
                      Arcana Boost
                    </h2>
                    {/* ════════════════════════════════════════════════════════
                        📝 BOOST HEADER: SUBTÍTULO
                        Mobile: text-xs (12px) | Desktop: md:text-sm (14px)
                    ════════════════════════════════════════════════════════ */}
                    <p className="text-xs text-gray-500 md:text-sm">
                      Recursos premium e avançados
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════════════════════════════════════════════════════
                📦 ÁREA DE CONTEÚDO PRINCIPAL (CardGrid, Boost, Sobre)
                Padding Mobile: p-4 (16px) | Desktop: md:p-6 (24px)
                Opções: p-2, p-3, p-4, p-5, p-6, p-8
                flex-1: Ocupa todo espaço vertical restante
                overflow-y-auto: Scroll vertical quando necessário
            ════════════════════════════════════════════════════════════════ */}
            <div 
              className={`flex-1 overflow-y-auto overflow-x-hidden p-2 transition-all duration-300 md:p-6 ${
                viewTransition ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(147, 51, 234, 0.3) transparent'
              }}
            >
              {renderContent()}
            </div>

            {/* Linha decorativa inferior */}
            <div 
              className="absolute bottom-0 left-8 right-8 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.2), transparent)"
              }}
            />
          </div>
        </main>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          ➕ FAB: BOTÃO FLUTUANTE "NOVA CARTA"
          Tamanho Mobile: h-14 w-14 (56px) | Desktop: md:h-16 md:w-16 (64px)
          Posição Mobile: bottom-4 right-4 | Desktop: md:bottom-8 md:right-8
          Opções tamanho: h-12 w-12, h-14 w-14, h-16 w-16, h-18 w-18
          Opções posição: bottom-4, bottom-6, bottom-8
      ════════════════════════════════════════════════════════════════ */}
      {activeView === "deck" && (
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="group fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1 active:scale-95 md:bottom-8 md:right-8 md:h-16 md:w-16"
          style={{
            background: "linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.8))",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: `
              0 4px 20px rgba(0, 0, 0, 0.4),
              0 0 ${35 * neonIntensity}px rgba(147, 51, 234, ${0.6 * neonIntensity}),
              inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
          }}
        >
          {/* ════════════════════════════════════════════════════════
              ➕ FAB: ÍCONE PLUS
              Mobile: h-7 w-7 (28px) | Desktop: md:h-8 md:w-8 (32px)
              Opções: h-5 w-5, h-6 w-6, h-7 w-7, h-8 w-8
          ════════════════════════════════════════════════════════ */}
          <Plus className="h-7 w-7 text-white transition-transform duration-300 group-hover:rotate-90 md:h-8 md:w-8" />
          
          {/* Tooltip "Nova Carta" */}
          <span 
            className="absolute right-full mr-3 hidden whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-white opacity-0 transition-all group-hover:opacity-100 pointer-events-none md:block"
            style={{
              background: "rgba(15, 10, 26, 0.95)",
              border: "1px solid rgba(147, 51, 234, 0.4)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
            }}
          >
            Nova Carta
            <Sparkles className="ml-1.5 inline-block h-3.5 w-3.5 text-arcana-pink" />
          </span>

          {/* Efeito ping */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.3))",
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) 1s infinite"
            }}
          />
        </button>
      )}

      {/* Modais */}
      {selectedCard && (
        <CardModal card={selectedCard} onClose={() => setSelectedCard(null)} />
      )}
      {isCreateModalOpen && (
        <CreateCardModal onClose={() => setIsCreateModalOpen(false)} />
      )}
      {isSettingsOpen && (
        <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.7;
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(147, 51, 234, 0.3);
          border-radius: 3px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(147, 51, 234, 0.5);
        }
      `}</style>
    </div>
  )
}