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
  Heart
} from "lucide-react"

export function DeckContent() {
  const { settings, searchQuery, setSearchQuery } = useArcana()
  
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [activeView, setActiveView] = useState<"deck" | "boost" | "sobre">("deck")
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [viewTransition, setViewTransition] = useState(true)

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
              <div className="relative mx-auto mb-8 flex h-32 w-32 items-center justify-center">
                {/* ✅ CORRIGIDO: delay incluído na shorthand */}
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.2))",
                    animation: "pulse 3s ease-in-out 0s infinite",
                    boxShadow: `0 0 ${40 * neonIntensity}px rgba(147, 51, 234, ${0.4 * neonIntensity})`
                  }}
                />
                
                {/* ✅ CORRIGIDO: delay incluído na shorthand */}
                <div 
                  className="absolute inset-4 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(34, 211, 238, 0.2), rgba(147, 51, 234, 0.3))",
                    animation: "pulse 3s ease-in-out 0.5s infinite"
                  }}
                />
                
                <div 
                  className="relative flex h-16 w-16 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #9333ea, #ec4899)",
                    boxShadow: `0 0 ${30 * neonIntensity}px rgba(147, 51, 234, ${0.6 * neonIntensity})`
                  }}
                >
                  <Rocket className="h-8 w-8 text-white" />
                </div>

                {/* ✅ CORRIGIDO: delay incluído na shorthand */}
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
              
              <h3 className="mb-3 text-2xl font-bold text-white">
                Arcana Boost
              </h3>
              <p className="mb-6 text-gray-400">
                Recursos avançados em desenvolvimento
              </p>

              <div className="mx-auto grid max-w-md gap-3">
                {[
                  { icon: Zap, label: "Snippets com IA", color: "#22d3ee" },
                  { icon: Layers, label: "Coleções", color: "#a855f7" },
                  { icon: Sparkles, label: "Templates Mágicos", color: "#ec4899" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      border: "1px solid rgba(255, 255, 255, 0.08)"
                    }}
                  >
                    <div 
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ background: `${feature.color}20` }}
                    >
                      <feature.icon className="h-5 w-5" style={{ color: feature.color }} />
                    </div>
                    <span className="text-sm text-gray-300">{feature.label}</span>
                    <span 
                      className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium uppercase"
                      style={{
                        background: "rgba(251, 146, 60, 0.15)",
                        color: "#fb923c"
                      }}
                    >
                      Em breve
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case "sobre":
        return (
          <div className="flex min-h-full items-center justify-center px-4 py-8">
            <div className="max-w-lg text-center">
              <div className="relative mx-auto mb-8 h-36 w-36">
                <div 
                  className="absolute inset-0 rounded-3xl opacity-50 blur-2xl"
                  style={{
                    background: "linear-gradient(135deg, #9333ea, #ec4899)",
                  }}
                />
                <img 
                  src="/images/logo-do-app.jpg" 
                  alt="Arcana Logo" 
                  className="relative h-36 w-36 rounded-3xl object-cover"
                  style={{
                    border: "2px solid rgba(147, 51, 234, 0.5)",
                    boxShadow: `0 0 ${40 * neonIntensity}px rgba(147, 51, 234, ${0.4 * neonIntensity})`
                  }}
                />
              </div>
              
              <h3 
                className="mb-2 text-4xl font-black tracking-wider"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #a855f7 50%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ARCANA
              </h3>
              
              <p className="mb-6 text-lg font-medium text-arcana-cyan">
                Seu espaço pessoal de snippets
              </p>
              
              <p className="mb-8 leading-relaxed text-gray-400">
                Gerenciador de snippets e informações técnicas com armazenamento 
                local e privado. Organize, busque e acesse seus códigos favoritos 
                com estilo.
              </p>

              <div 
                className="mb-8 grid grid-cols-3 gap-3 rounded-2xl p-4"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)"
                }}
              >
                {[
                  { label: "Versão", value: "0.1" },
                  { label: "Licença", value: "MIT" },
                  { label: "Storage", value: "Local" },
                ].map((info, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs uppercase tracking-wider text-gray-500">
                      {info.label}
                    </p>
                    <p className="mt-1 font-semibold text-white">
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* ✅ CORRIGIDO: delay incluído na shorthand */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <span>Criado com</span>
                <Heart className="h-4 w-4 text-arcana-pink" style={{ animation: "pulse 2s ease-in-out 0s infinite" }} />
                <span>por Luna e</span>
                <a href="https://github.com/Eduardo00082" target="_blank" rel="noopener noreferrer" className="font-medium text-arcana-cyan hover:text-arcana-purple transition-colors cursor-pointer">Eduardo00082</a>
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
      <Starfield intensity={settings.fogIntensity} />

      <div className="relative z-10 flex h-screen flex-col md:flex-row">
        <Sidebar 
          activeView={activeView} 
          onViewChange={setActiveView} 
          onSettingsClick={() => setIsSettingsOpen(true)} 
        />

        <main className="flex-1 overflow-hidden p-3 md:p-6">
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-2xl md:rounded-3xl"
            style={{
              border: "1px solid rgba(147, 51, 234, 0.25)",
              background: "rgba(5, 0, 15, 0.3)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              boxShadow: `
                0 0 ${40 * neonIntensity}px rgba(147, 51, 234, ${0.15 * neonIntensity}),
                inset 0 1px 0 rgba(255, 255, 255, 0.02)
              `,
            }}
          >
            <div 
              className="absolute left-8 right-8 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.3), transparent)"
              }}
            />

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
                    <h2 className="text-lg font-bold text-white md:text-xl">
                      Arcana Boost
                    </h2>
                    <p className="text-xs text-gray-500 md:text-sm">
                      Recursos premium e avançados
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div 
              className={`flex-1 overflow-y-auto overflow-x-hidden p-4 transition-all duration-300 md:p-6 ${
                viewTransition ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(147, 51, 234, 0.3) transparent'
              }}
            >
              {renderContent()}
            </div>

            <div 
              className="absolute bottom-0 left-8 right-8 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.2), transparent)"
              }}
            />
          </div>
        </main>
      </div>

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
          <Plus className="h-7 w-7 text-white transition-transform duration-300 group-hover:rotate-90 md:h-8 md:w-8" />
          
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

          {/* ✅ CORRIGIDO: delay incluído na shorthand */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.3))",
              animation: "ping 2s cubic-bezier(0, 0, 0.2, 1) 1s infinite"
            }}
          />
        </button>
      )}

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
