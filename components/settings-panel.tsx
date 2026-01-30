"use client"

import type React from "react"

import { useRef } from "react"
import { X, Download, Upload } from "lucide-react"
import { useArcana } from "@/contexts/arcana-context"

interface SettingsPanelProps {
  onClose: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const { settings, updateSettings, exportData, importData } = useArcana()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      importData(content)
      onClose()
    }
    reader.readAsText(file)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 backdrop-blur-sm md:p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[95vh] w-full max-w-xl overflow-hidden rounded-xl border border-arcana-purple/40 bg-arcana-dark/95 backdrop-blur-md md:max-h-[90vh] md:rounded-2xl"
        style={{
          boxShadow: `0 0 ${40 * (settings.neonIntensity / 100)}px rgba(147, 51, 234, ${0.4 * (settings.neonIntensity / 100)})`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-arcana-purple/20 p-3 md:items-center md:p-4">
          <div>
            <h2 className="text-lg font-bold text-foreground md:text-xl">Preferências Arcanas</h2>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              Modifique sua interface e segurança. O Arcana armazena os seus dados no seu próprio dispositivo. Nada de
              nuvem!
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-arcana-purple/20 hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[calc(95vh-5rem)] overflow-y-auto p-3 md:max-h-[calc(90vh-6rem)] md:p-4">
          <section className="mb-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:text-sm">
              Visual
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-arcana-dark/60 p-2.5 md:p-3">
                <span className="text-xs text-foreground md:text-sm">Modo escuro (Em breve)</span>
                <button
                  onClick={() => updateSettings({ darkMode: !settings.darkMode })}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    settings.darkMode ? "bg-arcana-purple" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                      settings.darkMode ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </div>

              <div className="rounded-lg bg-arcana-dark/60 p-2.5 md:p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-foreground md:text-sm">Intensidade da Névoa</span>
                  <span className="text-xs font-medium text-arcana-purple md:text-sm">{settings.fogIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.fogIntensity}
                  onChange={(e) => updateSettings({ fogIntensity: Number(e.target.value) })}
                  className="w-full accent-arcana-purple"
                />
              </div>

              <div className="rounded-lg bg-arcana-dark/60 p-2.5 md:p-3">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-foreground md:text-sm">Intensidade do Neon</span>
                  <span className="text-xs font-medium text-arcana-purple md:text-sm">{settings.neonIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.neonIntensity}
                  onChange={(e) => updateSettings({ neonIntensity: Number(e.target.value) })}
                  className="w-full accent-arcana-purple"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg bg-arcana-dark/60 p-2.5 md:p-3">
                <span className="text-xs text-foreground md:text-sm">Mudar Tema (Em breve)</span>
                <button className="rounded-lg border border-arcana-purple/40 bg-arcana-purple/20 px-3 py-1.5 text-xs font-medium text-arcana-pink transition-colors hover:bg-arcana-purple/30 md:px-4">
                  Importar Tema
                </button>
              </div>
            </div>
          </section>

          <section className="mb-6">
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:text-sm">
              Dados
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-arcana-dark/60 p-2.5 md:p-3">
                <span className="text-xs text-foreground md:text-sm">Fazer Backup Local</span>
                <button
                  onClick={exportData}
                  className="flex items-center gap-2 rounded-lg border border-arcana-purple/40 bg-arcana-purple/20 px-3 py-1.5 text-xs font-medium text-arcana-pink transition-colors hover:bg-arcana-purple/30 md:px-4"
                >
                  <Download className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  Backup
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-arcana-dark/60 p-2.5 md:p-3">
                <span className="text-xs text-foreground md:text-sm">Importar Backup</span>
                <input type="file" ref={fileInputRef} onChange={handleImport} accept=".json" className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 rounded-lg border border-arcana-purple/40 bg-arcana-purple/20 px-3 py-1.5 text-xs font-medium text-arcana-pink transition-colors hover:bg-arcana-purple/30 md:px-4"
                >
                  <Upload className="h-3 w-3 md:h-3.5 md:w-3.5" />
                  Importar
                </button>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:text-sm">
              Sobre
            </h3>

            <div className="space-y-2 rounded-lg bg-arcana-dark/60 p-3 md:p-4">
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-muted-foreground">Versão:</span>
                <span className="text-foreground">1.21 Beta</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-muted-foreground">Licença:</span>
                <span className="text-foreground">MIT</span>
              </div>
              <div className="flex justify-between text-xs md:text-sm">
                <span className="text-muted-foreground">Créditos::</span>
                <span className="text-foreground">​Luna e Eduardo</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
