"use client"

import { useArcana, type Card } from "@/contexts/arcana-context"
import { Code2 } from "lucide-react"

interface ArcanaCardProps {
  card: Card
  onClick: () => void
}

export function ArcanaCard({ card, onClick }: ArcanaCardProps) {
  const { settings } = useArcana()
  const previewLines = card.content.split("\n").slice(0, 6).join("\n")
  const neonIntensity = settings.neonIntensity / 100

  const languageColors: Record<string, string> = {
    typescript: "#3178c6",
    javascript: "#f7df1e",
    tsx: "#61dafb",
    python: "#3776ab",
    css: "#264de4",
    html: "#e34f26",
    sql: "#00758f",
    json: "#292929",
    bash: "#4eaa25",
    go: "#00add8",
    rust: "#dea584",
    other: "#6b7280",
  }

  const langColor = languageColors[card.language] || languageColors.other

  /* 
    ═══════════════════════════════════════════════════════════════════════════
    📐 ALTURA DO CARD
    Mobile: h-48 (192px) | Desktop: md:h-56 (224px)
    Opções: h-40, h-44, h-48, h-52, h-56, h-60, h-64
    ═══════════════════════════════════════════════════════════════════════════
  */

  return (
    <button
      onClick={onClick}
      className="group relative flex h-48 w-full flex-col overflow-hidden rounded-2xl text-left transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98] md:h-56"
      style={{
        background: "linear-gradient(180deg, rgba(26, 15, 46, 0.9) 0%, rgba(15, 10, 26, 0.95) 100%)",
        border: "1px solid rgba(147, 51, 234, 0.3)",
        boxShadow: `
          0 4px 20px rgba(0, 0, 0, 0.3),
          0 0 ${20 * neonIntensity}px rgba(147, 51, 234, ${0.15 * neonIntensity})
        `,
      }}
    >
      {/* Top Glow Line */}
      <div 
        className="absolute left-4 right-4 top-0 h-px opacity-60 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, ${langColor}80, transparent)`
        }}
      />

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-all duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at top, ${langColor}08 0%, transparent 70%)`,
          boxShadow: `
            inset 0 0 ${40 * neonIntensity}px rgba(217, 70, 239, ${0.08 * neonIntensity}),
            0 0 ${30 * neonIntensity}px rgba(147, 51, 234, ${0.25 * neonIntensity})
          `,
        }}
      />

      {/* Content Container */}
      <div className="relative flex h-full flex-col p-4">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          {/* Language Badge */}
          <div 
            className="flex items-center gap-1.5 rounded-lg px-2 py-1 transition-all duration-300 group-hover:scale-105"
            style={{
              background: `${langColor}15`,
              border: `1px solid ${langColor}40`,
            }}
          >
            <div 
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: langColor }}
            />
            {/* 
              ═══════════════════════════════════════════════════════════
              🏷️ FONTE: BADGE DA LINGUAGEM (ex: "TYPESCRIPT")
              Mobile: text-[11px] | Desktop: md:text-xs (12px)
              Opções: text-[9px], text-[10px], text-[11px], text-xs, text-sm
              ═══════════════════════════════════════════════════════════
            */}
            <span 
              className="text-[7px] font-semibold uppercase tracking-wider md:text-xs"
              style={{ color: langColor }}
            >
              {card.language}
            </span>
          </div>

{/* 
  ═══════════════════════════════════════════════════════════
  🏷️ FONTE: TAG PRINCIPAL (ex: "REACT")
  Mobile: text-[10px] | Desktop: md:text-[11px]
  Max largura Mobile: max-w-[80px] | Desktop: md:max-w-[100px]
  Opções max-w: max-w-[60px], max-w-[80px], max-w-[100px], max-w-[120px]
  ═══════════════════════════════════════════════════════════
*/}
{card.tags[0] && (
  <span 
    className="max-w-[65px] truncate rounded-full px-2 py-1 text-[7px] font-medium uppercase tracking-wide transition-all duration-300 group-hover:scale-105 md:max-w-[100px] md:text-[11px]"
    style={{
      background: "rgba(236, 72, 153, 0.15)",
      border: "1px solid rgba(236, 72, 153, 0.3)",
      color: "#f472b6"
    }}
    title={card.tags[0]}
  >
    {card.tags[0]}
  </span>
          )}
        </div>

        {/* 
          ═══════════════════════════════════════════════════════════
          📝 FONTE: TÍTULO DO CARD
          Mobile: text-base (16px) | Desktop: md:text-lg (18px)
          Opções: text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px)
          ═══════════════════════════════════════════════════════════
        */}
        <h3 className="mb-3 line-clamp-2 text-base font-bold leading-tight text-white transition-colors group-hover:text-arcana-pink md:text-lg">
          {card.title}
        </h3>

        {/* Code Preview */}
        <div 
          className="relative flex-1 overflow-hidden rounded-lg"
          style={{
            background: "rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.05)"
          }}
        >
          {/* Code Icon */}
          <div className="absolute right-2 top-2 opacity-20 transition-opacity group-hover:opacity-40">
            <Code2 className="h-4 w-4 text-arcana-purple" />
          </div>

          {/* Line Numbers Decoration */}
          <div className="absolute bottom-0 left-0 top-0 w-6 border-r border-white/5 bg-black/20" />

          {/* Code Content */}
          <pre className="h-full overflow-hidden py-2 pl-8 pr-3">
            {/* 
              ═══════════════════════════════════════════════════════════
              💻 FONTE: PREVIEW DO CÓDIGO
              Mobile: text-[11px] | Desktop: md:text-xs (12px)
              Opções: text-[9px], text-[10px], text-[11px], text-xs, text-sm
              ═══════════════════════════════════════════════════════════
            */}
            <code 
              className="block font-mono text-[11px] leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300 md:text-xs"
              style={{ tabSize: 2 }}
            >
              {previewLines}
            </code>
          </pre>

          {/* Fade Overlay */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
            style={{
              background: "linear-gradient(to top, rgba(15, 10, 26, 0.95), transparent)"
            }}
          />
        </div>

        {/* Footer - Tags count indicator */}
        {card.tags.length > 1 && (
          <div className="mt-2 flex items-center justify-end">
            {/* 
              ═══════════════════════════════════════════════════════════
              🔢 FONTE: CONTADOR DE TAGS (ex: "+2 tags")
              Mobile: text-[10px] | Desktop: md:text-[11px]
              Opções: text-[8px], text-[9px], text-[10px], text-[11px], text-xs
              ═══════════════════════════════════════════════════════════
            */}
            <span className="text-[10px] text-gray-500 transition-colors group-hover:text-gray-400 md:text-[11px]">
              +{card.tags.length - 1} tag{card.tags.length > 2 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Border Glow on Hover */}
      <div 
        className="absolute bottom-0 left-4 right-4 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.6), transparent)`
        }}
      />

      {/* Corner Decorations */}
      <div 
        className="absolute right-0 top-0 h-12 w-12 opacity-30 transition-opacity group-hover:opacity-50"
        style={{
          background: `radial-gradient(circle at top right, ${langColor}30, transparent 70%)`
        }}
      />
    </button>
  )
}