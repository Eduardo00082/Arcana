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
  const [hasAnimated, setHasAnimated] = useState(false)

  // Animação de entrada (primeira vez)
  useEffect(() => {
    if (!hasAnimated) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        setHasAnimated(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [hasAnimated])

  // Re-animar quando filtros mudam (após primeira animação)
  useEffect(() => {
    if (hasAnimated) {
      setIsVisible(false)
      const timer = setTimeout(() => setIsVisible(true), 50)
      return () => clearTimeout(timer)
    }
  }, [searchQuery, selectedTags, hasAnimated])

  const filteredCards = cards.filter((card) => {
    const matchesSearch =
      searchQuery === "" ||
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      card.language?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => card.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  const neonIntensity = settings.neonIntensity / 100

  // ═══════════════════════════════════════════════════════════════
  // Empty State - Deck vazio
  // ═══════════════════════════════════════════════════════════════
  if (cards.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          {/* 
            ═══════════════════════════════════════════════════════════
            📦 ÍCONE: TAMANHO DO CONTAINER DO ÍCONE (Deck Vazio)
            Tamanho: h-24 w-24 (96px)
            Opções: h-16 w-16, h-20 w-20, h-24 w-24, h-28 w-28, h-32 w-32
            ═══════════════════════════════════════════════════════════
          */}
          <div 
            className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 scale-100 translate-y-0" 
                : "opacity-0 scale-75 translate-y-8"
            }`}
            style={{
              background: "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.1))",
              boxShadow: `0 0 ${40 * neonIntensity}px rgba(147, 51, 234, ${0.3 * neonIntensity})`,
              transitionDelay: "100ms"
            }}
          >
            {/* 
              ═══════════════════════════════════════════════════════════
              📦 ÍCONE: TAMANHO DO ÍCONE INBOX
              Tamanho: h-12 w-12 (48px)
              Opções: h-8 w-8, h-10 w-10, h-12 w-12, h-14 w-14, h-16 w-16
              ═══════════════════════════════════════════════════════════
            */}
            <Inbox className={`h-12 w-12 text-arcana-purple transition-all duration-500 ${isVisible ? "animate-pulse" : ""}`} />
          </div>
          
          {/* 
            ═══════════════════════════════════════════════════════════
            📝 FONTE: TÍTULO "Seu deck está vazio"
            Tamanho: text-xl (20px)
            Opções: text-lg (18px), text-xl (20px), text-2xl (24px)
            ═══════════════════════════════════════════════════════════
          */}
          <h3 
            className={`mb-2 text-xl font-semibold text-white transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Seu deck está vazio
          </h3>
          
          {/* 
            ═══════════════════════════════════════════════════════════
            📝 FONTE: DESCRIÇÃO (Deck Vazio)
            Tamanho: text-base (16px) - padrão sem classe específica
            Opções: text-sm (14px), text-base (16px), text-lg (18px)
            ═══════════════════════════════════════════════════════════
          */}
          <p 
            className={`mb-8 max-w-sm text-gray-400 transition-all duration-700 ease-out ${
              isVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Comece sua coleção criando sua primeira carta. 
            Organize seus snippets de código favoritos!
          </p>
          
          {/* Botão */}
          {onCreateClick && (
            <button
              onClick={onCreateClick}
              className={`group inline-flex items-center gap-3 rounded-2xl px-8 py-4 font-semibold text-white transition-all duration-700 ease-out hover:scale-105 active:scale-95 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                background: "linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.3))",
                border: "1px solid rgba(147, 51, 234, 0.5)",
                boxShadow: `0 0 ${30 * neonIntensity}px rgba(147, 51, 234, ${0.4 * neonIntensity})`,
                transitionDelay: "400ms"
              }}
            >
              {/* 
                ═══════════════════════════════════════════════════════════
                🔘 ÍCONE: BOTÃO PLUS
                Tamanho: h-5 w-5 (20px)
                Opções: h-4 w-4, h-5 w-5, h-6 w-6
                ═══════════════════════════════════════════════════════════
              */}
              <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
              {/* 
                ═══════════════════════════════════════════════════════════
                📝 FONTE: TEXTO DO BOTÃO "Criar Primeira Carta"
                Tamanho: font-semibold (herdado do button)
                Para mudar, adicione: text-sm, text-base, text-lg
                ═══════════════════════════════════════════════════════════
              */}
              Criar Primeira Carta
              <Sparkles className="h-4 w-4 text-arcana-pink" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // ═══════════════════════════════════════════════════════════════
  // Empty State - Nenhum resultado
  // ═══════════════════════════════════════════════════════════════
  if (filteredCards.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          {/* 
            ═══════════════════════════════════════════════════════════
            👻 ÍCONE: TAMANHO DO CONTAINER DO ÍCONE (Nenhum Resultado)
            Tamanho: h-24 w-24 (96px)
            Opções: h-16 w-16, h-20 w-20, h-24 w-24, h-28 w-28, h-32 w-32
            ═══════════════════════════════════════════════════════════
          */}
          <div 
            className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl transition-all duration-500 ease-out ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{
              background: "linear-gradient(135deg, rgba(251, 146, 60, 0.2), rgba(234, 179, 8, 0.1))",
              boxShadow: `0 0 ${40 * neonIntensity}px rgba(251, 146, 60, ${0.2 * neonIntensity})`
            }}
          >
            {/* 
              ═══════════════════════════════════════════════════════════
              👻 ÍCONE: TAMANHO DO ÍCONE GHOST
              Tamanho: h-12 w-12 (48px)
              Opções: h-8 w-8, h-10 w-10, h-12 w-12, h-14 w-14, h-16 w-16
              ═══════════════════════════════════════════════════════════
            */}
            <Ghost className="h-12 w-12 text-orange-400" />
          </div>
          
          {/* 
            ═══════════════════════════════════════════════════════════
            📝 FONTE: TÍTULO "Nenhuma carta encontrada"
            Tamanho: text-xl (20px)
            Opções: text-lg (18px), text-xl (20px), text-2xl (24px)
            ═══════════════════════════════════════════════════════════
          */}
          <h3 className={`mb-2 text-xl font-semibold text-white transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            Nenhuma carta encontrada
          </h3>

          {/* 
            ═══════════════════════════════════════════════════════════
            📝 FONTE: DESCRIÇÃO (Nenhum Resultado)
            Tamanho: text-base (16px) - padrão sem classe específica
            Opções: text-sm (14px), text-base (16px), text-lg (18px)
            ═══════════════════════════════════════════════════════════
          */}
          <p className={`mb-6 max-w-sm text-gray-400 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "100ms" }}>
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
          
          <div className={`flex flex-wrap items-center justify-center gap-2 transition-all duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: "200ms" }}>
            {searchQuery && (
              /* 
                ═══════════════════════════════════════════════════════════
                🏷️ FONTE: BADGE DE BUSCA
                Tamanho: text-xs (12px)
                Opções: text-[10px], text-[11px], text-xs (12px), text-sm (14px)
                ═══════════════════════════════════════════════════════════
              */
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
              /* 
                ═══════════════════════════════════════════════════════════
                🏷️ FONTE: BADGE DE TAG FILTRADA
                Tamanho: text-xs (12px)
                Opções: text-[10px], text-[11px], text-xs (12px), text-sm (14px)
                ═══════════════════════════════════════════════════════════
              */
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

  // ═══════════════════════════════════════════════════════════════
// Grid de Cards - ALINHADO AO TOPO
// ═══════════════════════════════════════════════════════════════

/* 
  ═══════════════════════════════════════════════════════════
  📦 CONTAINER: WRAPPER PRINCIPAL DA GRID
  
  Largura: w-full (100%)
  Largura máxima: max-w-none (sem limite)
  Centralizar: mx-auto (quando usar max-width)
  Padding horizontal: px-0 (sem padding)
  
  Opções de largura máxima:
  - max-w-none (sem limite - padrão atual)
  - max-w-screen-sm (640px)
  - max-w-screen-md (768px)
  - max-w-screen-lg (1024px)
  - max-w-screen-xl (1280px)
  - max-w-screen-2xl (1536px)
  - max-w-4xl (896px)
  - max-w-5xl (1024px)
  - max-w-6xl (1152px)
  - max-w-7xl (1280px)
  
  Opções de padding: px-0, px-2, px-4, px-6, px-8
  
  Exemplo com limite: "w-full max-w-6xl mx-auto px-4"
  ═══════════════════════════════════════════════════════════
*/
return (
  <div className="w-full max-w-none px-0">
    {/* Results Header */}
    <div 
      className={`mb-4 flex items-center justify-between transition-all duration-500 ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* 
          ═══════════════════════════════════════════════════════════
          📝 FONTE: CONTADOR DE CARTAS (ex: "5 cartas no deck")
          Tamanho: text-sm (14px)
          Opções: text-xs (12px), text-sm (14px), text-base (16px)
          ═══════════════════════════════════════════════════════════
        */}
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
            /* 
              ═══════════════════════════════════════════════════════════
              🏷️ FONTE: BADGE DE FILTROS ATIVOS
              Tamanho: text-xs (12px)
              Opções: text-[10px], text-[11px], text-xs (12px), text-sm (14px)
              ═══════════════════════════════════════════════════════════
            */
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

        {/* 
          ═══════════════════════════════════════════════════════════
          📝 FONTE: TEXTO "Ordenado por: mais recente"
          Tamanho: text-xs (12px)
          Opções: text-[10px], text-[11px], text-xs (12px), text-sm (14px)
          ═══════════════════════════════════════════════════════════
        */}
        <span className="hidden text-xs text-gray-600 sm:block">
          Ordenado por: mais recente
        </span>
      </div>

      {/* 
        ═══════════════════════════════════════════════════════════
        📐 GRID: CONFIGURAÇÃO DE COLUNAS E ESPAÇAMENTO
        
        Colunas:
        - Mobile: grid-cols-2 (2 colunas)
        - Large (lg): lg:grid-cols-3 (3 colunas)
        - Extra Large (xl): xl:grid-cols-4 (4 colunas)
        
        Espaçamento:
        - Mobile: gap-3 (12px)
        - Small+: sm:gap-4 (16px)
        
        Opções de colunas: grid-cols-1, grid-cols-2, grid-cols-3, grid-cols-4
        Opções de gap: gap-2, gap-3, gap-4, gap-5, gap-6
        ═══════════════════════════════════════════════════════════
      */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {filteredCards.map((card, index) => (
          <div
            key={card.id}
            className={`transition-all duration-500 ${
              isVisible 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-8 scale-95"
            }`}
            style={{
              transitionDelay: isVisible ? `${100 + index * 50}ms` : "0ms"
            }}
          >
            <ArcanaCard 
              card={card} 
              onClick={() => onCardClick(card)} 
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      {filteredCards.length >= 12 && (
        <div 
          className={`flex justify-center pt-6 pb-4 transition-all duration-500 ${
            isVisible 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: `${100 + filteredCards.length * 50 + 100}ms`
          }}
        >
          {/* 
            ═══════════════════════════════════════════════════════════
            📝 FONTE: FOOTER "Mostrando todas as X cartas"
            Tamanho: text-xs (12px)
            Opções: text-[10px], text-[11px], text-xs (12px), text-sm (14px)
            ═══════════════════════════════════════════════════════════
          */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Sparkles className="h-3 w-3" />
            Mostrando todas as {filteredCards.length} cartas
          </div>
        </div>
      )}
    </div>
  )
}