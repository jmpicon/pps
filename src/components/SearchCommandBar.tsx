'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, ArrowRight, BookOpen, X } from 'lucide-react'
import { allModules } from '@/content/modules/registry'

interface SearchCommandBarProps {
  open: boolean
  onClose: () => void
}

export function SearchCommandBar({ open, onClose }: SearchCommandBarProps) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const router = useRouter()

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    const out: { module: (typeof allModules)[0]; lesson: (typeof allModules)[0]['lessons'][0] }[] = []
    for (const mod of allModules) {
      for (const lesson of mod.lessons) {
        const match =
          mod.title.toLowerCase().includes(q) ||
          lesson.title.toLowerCase().includes(q) ||
          lesson.objectives.some((o) => o.toLowerCase().includes(q)) ||
          lesson.keyPoints.some((p) => p.toLowerCase().includes(q))
        if (match) out.push({ module: mod, lesson })
      }
    }
    return out.slice(0, 8)
  }, [query])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelected((s) => Math.min(s + 1, results.length - 1))
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelected((s) => Math.max(s - 1, 0))
        return
      }
      if (e.key === 'Enter' && results[selected]) {
        e.preventDefault()
        router.push(`/lessons/${results[selected].lesson.slug}`)
        onClose()
      }
    },
    [open, onClose, results, selected, router]
  )

  useEffect(() => {
    setSelected(0)
  }, [query])


  if (!open) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-200"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-xl z-[101] transition-all duration-200"
        role="dialog"
        aria-label="Búsqueda rápida"
      >
        <div className="mx-4 rounded-2xl bg-[var(--bg-surface)] border border-white/10 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
            <Search className="h-5 w-5 text-[var(--text-dim)] shrink-0" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar lecciones..."
              className="flex-1 bg-transparent text-white placeholder:text-[var(--text-dim)] focus:outline-none text-lg"
              autoFocus
            />
            <kbd className="hidden sm:inline px-2 py-1 rounded bg-white/10 text-[var(--text-dim)] text-xs font-mono">
              Esc
            </kbd>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-8 text-center text-[var(--text-muted)]">
                {query ? 'Sin resultados' : 'Escribe para buscar...'}
              </div>
            ) : (
              <ul className="py-2">
                {results.map(({ module: mod, lesson }, i) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/lessons/${lesson.slug}`}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        i === selected ? 'bg-[var(--accent)]/15' : 'hover:bg-white/5'
                      }`}
                      onMouseEnter={() => setSelected(i)}
                    >
                      <BookOpen className="h-4 w-4 text-[var(--accent)] shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-white truncate">{lesson.title}</div>
                        <div className="text-sm text-[var(--text-dim)] truncate">
                          M{mod.number}. {mod.title}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[var(--text-dim)] shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-xs text-[var(--text-dim)]">
            <span>↑↓ navegar · Enter abrir</span>
            <span className="font-mono">⌘K</span>
          </div>
        </div>
      </div>
    </>
  )
}
