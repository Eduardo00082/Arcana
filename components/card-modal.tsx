"use client"

import { useState, useEffect } from "react"
import { X, Pencil, Trash2, Copy, Check } from "lucide-react"
import { useArcana, type Card } from "@/contexts/arcana-context"
import { EditCardModal } from "@/components/edit-card-modal"
import { highlightCode } from "@/lib/syntax-highlighter"

interface CardModalProps {
  card: Card
  onClose: () => void
}

export function CardModal({ card, onClose }: CardModalProps) {
  const { deleteCard, settings } = useArcana()
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Animação de entrada (flip)
  useEffect(() => {
    const timer = setTimeout(() => setIsFlipped(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsClosing(true)
    setIsFlipped(false)
    setTimeout(onClose, 400)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(card.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja excluir esta carta?")) {
      deleteCard(card.id)
      handleClose()
    }
  }

  if (isEditing) {
    return <EditCardModal card={card} onClose={() => setIsEditing(false)} onSave={() => setIsEditing(false)} />
  }

  const highlightedCode = highlightCode(card.content, card.language)

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 transition-all duration-500 md:p-4 ${
        isFlipped && !isClosing 
          ? "backdrop-blur-md bg-black/40" 
          : "backdrop-blur-none bg-black/0"
      }`}
      style={{ perspective: "1500px" }}
      onClick={handleClose}
    >
      {/* Card Container com Flip 3D */}
      <div
        className="relative w-full max-w-3xl transition-all duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative max-h-[90vh] w-full overflow-hidden rounded-2xl bg-[#0a0515] md:max-h-[85vh] md:rounded-3xl"
          style={{
            backfaceVisibility: "hidden",
            border: "3px solid transparent",
            backgroundImage: "linear-gradient(#0a0515, #0a0515), linear-gradient(135deg, #22d3ee, #9333ea, #d946ef)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            boxShadow: `0 0 ${60 * (settings.neonIntensity / 100)}px rgba(147, 51, 234, ${0.6 * (settings.neonIntensity / 100)}), 0 0 ${30 * (settings.neonIntensity / 100)}px rgba(34, 211, 238, ${0.3 * (settings.neonIntensity / 100)})`,
          }}
        >
          <button
            onClick={handleClose}
            className="absolute right-3 top-3 z-10 rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white md:right-6 md:top-6"
          >
            <X className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          <div className="max-h-[90vh] overflow-y-auto p-4 md:p-8">
            <h2 className="mb-4 text-center text-xl font-bold tracking-wide text-white md:mb-6 md:text-3xl">
              {card.title}
            </h2>

            <div
              className="mb-6 overflow-auto rounded-xl p-4 md:mb-8 md:rounded-2xl md:p-6"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(147, 51, 234, 0.3)",
                maxHeight: "50vh",
              }}
            >
              <pre className="font-mono text-xs leading-relaxed md:text-sm">
                <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
              <button
                onClick={() => setIsEditing(true)}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-600 bg-black/40 text-gray-400 transition-all hover:border-gray-400 hover:bg-gray-800/40 hover:text-white md:h-14 md:w-14"
              >
                <Pencil className="h-4 w-4 md:h-5 md:w-5" />
              </button>

              <button
                onClick={handleDelete}
                className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-arcana-purple bg-arcana-purple/20 text-arcana-purple transition-all hover:border-arcana-pink hover:bg-arcana-pink/20 hover:text-arcana-pink md:h-14 md:w-14"
                style={{
                  boxShadow: `0 0 ${20 * (settings.neonIntensity / 100)}px rgba(147, 51, 234, ${0.4 * (settings.neonIntensity / 100)})`,
                }}
              >
                <Trash2 className="h-4 w-4 md:h-5 md:w-5" />
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-full border-2 border-arcana-cyan bg-arcana-cyan/10 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-arcana-cyan/20 md:gap-3 md:px-8 md:py-3.5 md:text-base"
                style={{
                  boxShadow: `0 0 ${25 * (settings.neonIntensity / 100)}px rgba(34, 211, 238, ${0.5 * (settings.neonIntensity / 100)})`,
                }}
              >
                {copied ? <Check className="h-4 w-4 md:h-5 md:w-5" /> : <Copy className="h-4 w-4 md:h-5 md:w-5" />}
                <span>{copied ? "Copiado!" : "Copiar"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}