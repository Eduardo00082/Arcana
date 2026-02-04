"use client"

import { LayoutGrid, Sparkles, Settings, Info } from "lucide-react"
import { useArcana } from "@/contexts/arcana-context"

interface SidebarProps {
  activeView: "deck" | "boost" | "sobre"
  onViewChange: (view: "deck" | "boost" | "sobre") => void
  onSettingsClick: () => void
}

const navItems = [
  { id: "deck" as const, label: "Deck", icon: LayoutGrid },
  { id: "boost" as const, label: "Boost", icon: Sparkles },
  { id: "sobre" as const, label: "Sobre", icon: Info },
]

export function Sidebar({ activeView, onViewChange, onSettingsClick }: SidebarProps) {
  const { settings } = useArcana()

  return (
    <aside 
  className="flex h-auto md:h-full w-11 flex-col items-center justify-between border-r border-arcana-purple/50 bg-arcana-dark/30 py-8 backdrop-blur-md lg:w-20"
      // ┌─────────────────────────────────────────────────────────────┐
      // │ LARGURA DA SIDEBAR                                         │
      // │ w-16 = 64px (padrão)                                       │
      // │ lg:w-20 = 80px (em telas grandes)                          │
      // │ Outros valores: w-12 (48px), w-14 (56px), w-24 (96px)      │
      // ├─────────────────────────────────────────────────────────────┤
      // │ PADDING VERTICAL                                           │
      // │ py-4 = 16px em cima e embaixo                              │
      // │ Outros valores: py-2 (8px), py-3 (12px), py-6 (24px)       │
      // ├─────────────────────────────────────────────────────────────┤
      // │ BORDA                                                       │
      // │ border-r = borda direita                                   │
      // │ border-arcana-purple/20 = cor roxa com 20% opacidade       │
      // ├─────────────────────────────────────────────────────────────┤
      // │ FUNDO                                                       │
      // │ bg-arcana-dark/50 = fundo escuro com 50% opacidade         │
      // │ backdrop-blur-md = desfoque médio do fundo                 │
      // └─────────────────────────────────────────────────────────────┘
    >
      {/* ══════════════════════════════════════════════════════════════
          CONTAINER DOS ITENS DE NAVEGAÇÃO
          gap-4 = 16px entre cada item
          Outros valores: gap-2 (8px), gap-3 (12px), gap-6 (24px)
          ══════════════════════════════════════════════════════════════ */}
      <nav className="flex flex-col items-center gap-5">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`group flex flex-col items-center gap-1 rounded-lg p-1 transition-all ${
              activeView === id 
                ? "text-arcana-purple" 
                : "text-muted-foreground hover:text-arcana-pink"
            }`}
            // ┌─────────────────────────────────────────────────────────┐
            // │ ESPAÇAMENTO DO BOTÃO                                   │
            // │ gap-1 = 4px entre ícone e texto                        │
            // │ p-2 = 8px de padding interno                           │
            // │ rounded-lg = borda arredondada (8px)                   │
            // └─────────────────────────────────────────────────────────┘
          >
            <div
              className={`rounded-lg p-1 transition-all ${
                activeView === id 
                  ? "bg-arcana-purple/20" 
                  : "group-hover:bg-arcana-purple/10"
              }`}
              // ┌─────────────────────────────────────────────────────────┐
              // │ CONTAINER DO ÍCONE                                     │
              // │ p-2 = 8px de padding ao redor do ícone                 │
              // │ rounded-lg = borda arredondada (8px)                   │
              // │ bg-arcana-purple/20 = fundo roxo 20% quando ativo      │
              // │ bg-arcana-purple/10 = fundo roxo 10% no hover          │
              // └─────────────────────────────────────────────────────────┘
              style={
                activeView === id
                  ? {
                      // GLOW DO ÍCONE ATIVO
                      // Multiplicador do neonIntensity: 15 (padrão)
                      // Opacidade do glow: 0.5 (padrão)
                      boxShadow: `0 0 ${10 * (settings.neonIntensity / 100)}px rgba(147, 51, 234, ${0.5 * (settings.neonIntensity / 100)})`,
                    }
                  : undefined
              }
            >
              {/* ─────────────────────────────────────────────────────────
                  TAMANHO DO ÍCONE
                  h-5 w-5 = 20px x 20px
                  Outros valores: 
                    h-4 w-4 = 16px
                    h-6 w-6 = 24px
                    h-7 w-7 = 28px
                  ───────────────────────────────────────────────────────── */}
              <Icon className="h-4 w-4" />
            </div>

            {/* ─────────────────────────────────────────────────────────
                TEXTO DO LABEL
                text-[10px] = 10px (padrão)
                lg:text-xs = 12px em telas grandes
                Outros valores: text-[8px], text-[9px], text-[11px]
                font-medium = peso da fonte (500)
                ───────────────────────────────────────────────────────── */}
            <span className="text-[7px] font-medium lg:text-xs">{label}</span>
          </button>
        ))}
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          BOTÃO DE CONFIGURAÇÕES
          Mesma estrutura dos itens de navegação
          ══════════════════════════════════════════════════════════════ */}
      <button
        onClick={onSettingsClick}
        className="group flex flex-col items-center gap-1 rounded-lg p-2 text-muted-foreground transition-all hover:text-arcana-pink"
      >
        <div className="rounded-lg p-2 transition-all group-hover:bg-arcana-purple/10">
          {/* TAMANHO DO ÍCONE DE CONFIG: h-5 w-5 = 20px */}
          <Settings className="h-4 w-4" />
        </div>
        {/* TAMANHO DO TEXTO: text-[10px] = 10px */}
        <span className="text-[7px] font-medium lg:text-xs">Config</span>
      </button>
    </aside>
  )
}