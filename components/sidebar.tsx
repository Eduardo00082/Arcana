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
    <aside className="flex w-16 flex-col items-center justify-between gap-4 border-r border-arcana-purple/20 bg-arcana-dark/50 py-4 backdrop-blur-md lg:w-20">
      <nav className="flex flex-1 flex-col items-center gap-4">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onViewChange(id)}
            className={`group flex flex-col items-center gap-1 rounded-lg p-2 transition-all ${
              activeView === id ? "text-arcana-purple" : "text-muted-foreground hover:text-arcana-pink"
            }`}
          >
            <div
              className={`rounded-lg p-2 transition-all ${
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
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-medium lg:text-xs">{label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={onSettingsClick}
        className="group flex flex-col items-center gap-1 rounded-lg p-2 text-muted-foreground transition-all hover:text-arcana-pink"
      >
        <div className="rounded-lg p-2 transition-all group-hover:bg-arcana-purple/10">
          <Settings className="h-5 w-5" />
        </div>
        <span className="text-[10px] font-medium lg:text-xs">Config</span>
      </button>
    </aside>
  )
}
