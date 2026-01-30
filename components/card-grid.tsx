"use client"

import { useArcana, type Card } from "@/contexts/arcana-context"
import { ArcanaCard } from "@/components/arcana-card"
import { Search, Sparkles, Plus, Filter, Inbox, Ghost } from "lucide-react"
import { useEffect, useState } from "react"

interface CardGridProps {
  onCardClick: (card: Card) => void
  onCreateClick?: () => void
}

export function CardGrid({ onCardClick, onCreateClick }: CardGridProps) {
  const { cards, searchQuery, selectedTags, settings } = useArcana()
  const [isVisible, setIsVisible] = useState(false)

  // Animação de entrada
  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [searchQuery, selectedTags])

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      searchQuery === "" ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => card.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  const neonIntensity = settings.neonIntensity / 100

  // Empty State - Deck vazio
  if (cards.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4 md:min-h-[500px]">
        <div className="text-center">
          {/* ✅ CORRIGIDO: delay incluído na shorthand */}
          <div 
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.1))",
              boxShadow: `0 0 ${40 * neonIntensity}px rgba(147, 51, 234, ${0.3 * neonIntensity})`,
              animation: "pulse 3s ease-in-out 0s infinite"
            }}
          >
            <Inbox className="h-12 w-12 text-arcana-purple" />
          </div>
          
          <h3 className="mb-2 text-xl font-semibold text-white">
            Seu deck está vazio
          </h3>
          <p className="mb-8 max-w-sm text-gray-400">
            Comece sua coleção criando sua primeira carta mágica. 
            Organize seus snippets de código favoritos!
          </p>
          
          {onCreateClick && (
            <button
              onClick={onCreateClick}
              className="group inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-semibold text-white transition-all hover:scale-105 active:scale-95"
              style={{
                background: "linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.3))",
                border: "1px solid rgba(147, 51, 234, 0.5)",
                boxShadow: `0 0 ${30 * neonIntensity}px rgba(147, 51, 234, ${0.4 * neonIntensity})`
              }}
            >
              <Plus className="h-5 w-5 transition-transform group-hover:rotate-90" />
              Criar Primeira Carta
              <Sparkles className="h-4 w-4 text-arcana-pink" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // Empty State - Nenhum resultado encontrado
  if (filteredCards.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center px-4 md:min-h-[500px]">
        <div className="text-center">
          <div 
            className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(234, 179, 8, 0.1))",
              boxShadow: `0 0 ${40 * neonIntensity}px rgba(251, 146, 60, ${0.2 * neonIntensity})`
            }}
          >
            <Ghost className="h-12 w-12 text-orange-400" />
          </div>
          
          <h3 className="mb-2 text-xl font-semibold text-white">
            Nenhuma carta encontrada
          </h3>
          <p className="mb-6 max-w-sm text-gray-400">
            {searchQuery && selectedTags.length > 0 ? (
              <>
                Não encontramos cartas para "<span className="text-arcana-cyan">{searchQuery}</span>" 
                com as tags selecionadas
              </>
            ) : searchQuery ? (
              <>
                Não encontramos cartas para "<span className="text-arcana-cyan">{searchQuery}</span>"
              </>
            ) : (
              "Nenhuma carta corresponde aos filtros selecionados"
            )}
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            {searchQuery && (
              <span 
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs"
                style={{
                  background: "rgba(34, 211, 238, 0.1)",
                  border: "1px solid rgba(34, 211, 238, 0.3)",
                  color: "#22d3ee"
                }}
              >
                <Search className="h-3 w-3" />
                {searchQuery}
              </span>
            )}
            {selectedTags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs"
                style={{
                  background: "rgba(147, 51, 234, 0.1)",
                  border: "1px solid rgba(147, 51, 234, 0.3)",
                  color: "#a855f7"
                }}
              >
                <Filter className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-400">
            {filteredCards.length === cards.length ? (
              <>
                <span className="font-semibold text-white">{cards.length}</span>
                {" "}carta{cards.length !== 1 ? 's' : ''} no deck
              </>
            ) : (
              <>
                <span className="font-semibold text-white">{filteredCards.length}</span>
                {" "}de{" "}
                <span className="text-gray-300">{cards.length}</span>
                {" "}carta{cards.length !== 1 ? 's' : ''}
              </>
            )}
          </span>
          
          {(searchQuery || selectedTags.length > 0) && (
            <div 
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs"
              style={{
                background: "rgba(147, 51, 234, 0.15)",
                border: "1px solid rgba(147, 51, 234, 0.3)"
              }}
            >
              <Filter className="h-3 w-3 text-arcana-purple" />
              <span className="text-arcana-purple">
                {[searchQuery ? 1 : 0, selectedTags.length].reduce((a, b) => a + b, 0)} filtro{((searchQuery ? 1 : 0) + selectedTags.length) !== 1 ? 's' : ''} ativo{((searchQuery ? 1 : 0) + selectedTags.length) !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        <span className="text-xs text-gray-500">
          Ordenado por: mais recente
        </span>
      </div>

      {/* Cards Grid with Staggered Animation */}
      <div 
        className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {filteredCards.map((card, index) => (
          <div
            key={card.id}
            className="transform transition-all duration-300"
            style={{
              // ✅ CORRIGIDO: delay incluído na shorthand
              animation: isVisible 
                ? `fadeSlideUp 0.4s ease-out ${index * 50}ms forwards` 
                : 'none',
              opacity: 0
            }}
          >
            <ArcanaCard 
              card={card} 
              onClick={() => onCardClick(card)} 
            />
          </div>
        ))}
      </div>

      {filteredCards.length >= 12 && (
        <div className="flex justify-center pt-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="h-3 w-3" />
            Mostrando todas as {filteredCards.length} cartas
          </div>
        </div>
      )}

      {/* Animation Keyframes */}
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  )
}
