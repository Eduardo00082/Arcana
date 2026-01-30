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
    <aside className="flex w-full flex-row items-center justify-between gap-2 border-b border-arcana-purple/20 bg-arcana-dark/50 px-4 py-2 backdrop-blur-md md:w-16 md:flex-col md:border-b-0 md:border-r md:py-4 lg:w-20">
      <nav className="flex flex-1 flex-row items-center gap-2 md:flex-col md:gap-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`group flex flex-col items-center gap-0.5 rounded-lg p-1.5 transition-all md:gap-1 md:p-2 ${
              activeView === id ? "text-arcana-purple" : "text-muted-foreground hover:text-arcana-pink"
            }`}
          >
            <div
              className={`rounded-lg p-1.5 transition-all md:p-2 ${
                activeView === id ? "bg-arcana-purple/20" : "group-hover:bg-arcana-purple/10"
              }`}
              style={
                activeView === id
                  ? {
                      boxShadow: `0 0 ${15 * (settings.neonIntensity / 100)}px rgba(147, 51, 234, ${0.5 * (settings.neonIntensity / 100)})`,
                    }
                  : undefined
              }
            >
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <span className="text-[9px] font-medium md:text-[10px] lg:text-xs">{label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={onSettingsClick}
        className="group flex flex-col items-center gap-0.5 rounded-lg p-1.5 text-muted-foreground transition-all hover:text-arcana-pink md:gap-1 md:p-2"
      >
        <div className="rounded-lg p-1.5 transition-all group-hover:bg-arcana-purple/10 md:p-2">
          <Settings className="h-4 w-4 md:h-5 md:w-5" />
        </div>
        <span className="text-[9px] font-medium md:text-[10px] lg:text-xs">Config</span>
      </button>
    </aside>
  )
}
