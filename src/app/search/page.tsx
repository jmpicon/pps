'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search as SearchIcon } from 'lucide-react'
import { allModules } from '@/content/modules/registry'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase().trim()
    const out: { module: typeof allModules[0]; lesson: typeof allModules[0]['lessons'][0] }[] = []
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
    return out
  }, [query])

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <h1 className="text-2xl font-bold text-white mb-6">Búsqueda</h1>

      <div className="relative mb-8">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-dim)]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título, módulo, objetivos..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-card)] border border-white/5 text-white placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)]/50"
          aria-label="Buscar"
        />
      </div>

      {query && (
        <div className="space-y-2">
          {results.length === 0 ? (
            <p className="text-[var(--text-muted)]">No se encontraron resultados.</p>
          ) : (
            <>
              <p className="text-sm text-[var(--text-dim)]">{results.length} resultado(s)</p>
              {results.map(({ module: mod, lesson }) => (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.slug}`}
                  className="block p-4 rounded-xl bg-[var(--bg-card)]/80 border border-white/5 hover:border-[var(--accent)]/30 transition-colors"
                >
                  <div className="font-medium text-white">{lesson.title}</div>
                  <div className="text-sm text-[var(--accent)] mt-0.5">
                    M{mod.number}. {mod.title}
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}
