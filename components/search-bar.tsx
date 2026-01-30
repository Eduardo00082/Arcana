"use client"

import { useState } from "react"
import { Search, X, Command } from "lucide-react"
import { useArcana } from "@/contexts/arcana-context"

export function SearchBar() {
  const { searchQuery, setSearchQuery, settings } = useArcana()
  const [isFocused, setIsFocused] = useState(false)

  const neonIntensity = settings.neonIntensity / 100
  const isActive = isFocused || searchQuery.length > 0

  const handleClear = () => {
    setSearchQuery("")
  }

  return (
    <div className="mb-6">
      <div
        className={`relative flex items-center overflow-hidden rounded-2xl transition-all duration-300 ${
          isActive ? "scale-[1.01]" : "scale-100"
        }`}
        style={{
          background: isActive
            ? "linear-gradient(135deg, rgba(26, 15, 46, 0.95) 0%, rgba(15, 10, 26, 0.98) 100%)"
            : "linear-gradient(135deg, rgba(26, 15, 46, 0.8) 0%, rgba(15, 10, 26, 0.9) 100%)",
          border: isActive
            ? "1px solid rgba(147, 51, 234, 0.5)"
            : "1px solid rgba(147, 51, 234, 0.25)",
          boxShadow: isActive
            ? `
                0 4px 20px rgba(0, 0, 0, 0.3),
                0 0 ${30 * neonIntensity}px rgba(147, 51, 234, ${0.3 * neonIntensity}),
                inset 0 1px 0 rgba(255, 255, 255, 0.05)
              `
            : `
                0 2px 10px rgba(0, 0, 0, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.03)
              `,
        }}
      >
        {/* Top Glow Line */}
        <div
          className="absolute left-8 right-8 top-0 h-px transition-opacity duration-300"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.5), transparent)",
            opacity: isActive ? 1 : 0,
          }}
        />

        {/* Search Icon */}
        <div
          className={`ml-4 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
            isActive ? "scale-110" : "scale-100"
          }`}
          style={{
            background: isActive ? "rgba(147, 51, 234, 0.15)" : "transparent",
          }}
        >
          <Search
            className={`h-5 w-5 transition-colors duration-300 ${
              isActive ? "text-arcana-purple" : "text-gray-500"
            }`}
          />
        </div>

        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Pesquisar cartas, tags, código..."
          className="flex-1 bg-transparent px-4 py-4 text-white placeholder:text-gray-500 focus:outline-none"
          style={{ caretColor: "#a855f7" }}
        />

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 pr-4">
          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={handleClear}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-all hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Keyboard Shortcut Hint */}
          {!searchQuery && !isFocused && (
            <div
              className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 sm:flex"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Command className="h-3 w-3 text-gray-500" />
              <span className="text-[10px] font-medium text-gray-500">K</span>
            </div>
          )}

          {/* Character Count */}
          {searchQuery && (
            <span className="hidden text-xs text-gray-600 sm:block">
              {searchQuery.length} char
            </span>
          )}
        </div>

        {/* Focus Ring Effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            boxShadow: `inset 0 0 ${20 * neonIntensity}px rgba(147, 51, 234, ${0.1 * neonIntensity})`,
            opacity: isFocused ? 1 : 0,
          }}
        />

        {/* Bottom Glow Line */}
        <div
          className="absolute bottom-0 left-8 right-8 h-px transition-opacity duration-300"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.4), transparent)",
            opacity: searchQuery ? 1 : 0,
          }}
        />
      </div>

      {/* Search Hint Text */}
      {isFocused && !searchQuery && (
        <div
          className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500"
          style={{ animation: "fadeSlideDown 0.3s ease-out" }}
        >
          <span>Busque por <span className="text-arcana-cyan">título</span></span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <span>Busque por <span className="text-arcana-pink">tags</span></span>
          <span className="h-1 w-1 rounded-full bg-gray-600" />
          <span>Busque por <span className="text-arcana-purple">código</span></span>
        </div>
      )}

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
