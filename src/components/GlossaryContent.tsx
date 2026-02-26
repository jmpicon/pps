'use client'

import { useState, useMemo } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { glossaryTerms } from '@/content/glossary'
import { ChevronDown, ChevronRight, Search, BookMarked } from 'lucide-react'

const categoryColors: Record<string, { color: string; bg: string; border: string }> = {
  'Fundamentos':      { color: 'var(--accent)',   bg: 'rgba(34,211,238,0.08)',  border: 'rgba(34,211,238,0.2)' },
  'Inyección':        { color: 'var(--danger)',   bg: 'rgba(248,113,113,0.08)', border: 'rgba(248,113,113,0.2)' },
  'Autenticación':    { color: 'var(--violet)',   bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
  'Cifrado':          { color: 'var(--terminal)', bg: 'rgba(45,212,191,0.08)',  border: 'rgba(45,212,191,0.2)' },
  'Control de acceso':{ color: 'var(--warning)',  bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.2)' },
  'Headers':          { color: 'var(--accent)',   bg: 'rgba(34,211,238,0.06)',  border: 'rgba(34,211,238,0.15)' },
  'Configuración':    { color: 'var(--orange)',   bg: 'rgba(251,146,60,0.08)',  border: 'rgba(251,146,60,0.2)' },
  'DevSecOps':        { color: 'var(--success)',  bg: 'rgba(52,211,153,0.08)',  border: 'rgba(52,211,153,0.2)' },
  'Defensa':          { color: 'var(--success)',  bg: 'rgba(52,211,153,0.06)',  border: 'rgba(52,211,153,0.15)' },
  'Normativa':        { color: 'var(--text-muted)', bg: 'rgba(148,163,184,0.06)', border: 'rgba(148,163,184,0.15)' },
}

const ALL = 'Todas'

export function GlossaryContent() {
  const [openTerm, setOpenTerm] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL)

  const categories = useMemo(() => {
    const cats = Array.from(new Set(glossaryTerms.map((t) => t.category ?? 'General')))
    return [ALL, ...cats]
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return glossaryTerms.filter((t) => {
      const matchCat = activeCategory === ALL || t.category === activeCategory
      const matchQ = !q || t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q)
      return matchCat && matchQ
    })
  }, [query, activeCategory])

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Glosario' }]} />

      {/* Header */}
      <div className="mb-8">
        <div className="badge badge-cyan mb-4">
          <BookMarked className="h-3.5 w-3.5" />
          {glossaryTerms.length} términos
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-3 tracking-tight">
          Glosario
        </h1>
        <p className="text-[var(--text-muted)] text-lg">
          Términos clave de ciberseguridad del curso. Busca o filtra por categoría.
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-dim)]" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar término o definición..."
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--bg-card)]/80 border border-white/8 text-white placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-[var(--accent)]/40 focus:bg-[var(--bg-card)] transition-all font-['Outfit']"
        />
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => {
          const conf = cat !== ALL ? categoryColors[cat] : null
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
              style={isActive && conf
                ? { background: conf.bg, borderColor: conf.border, color: conf.color }
                : isActive
                ? { background: 'rgba(34,211,238,0.1)', borderColor: 'rgba(34,211,238,0.25)', color: 'var(--accent)' }
                : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: 'var(--text-dim)' }
              }
            >
              {cat}
              {cat !== ALL && (
                <span className="ml-1 opacity-60">
                  ({glossaryTerms.filter((t) => t.category === cat).length})
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Results count */}
      {query && (
        <p className="text-sm text-[var(--text-dim)] mb-4">
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para &ldquo;{query}&rdquo;
        </p>
      )}

      {/* Terms */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-dim)]">
          <BookMarked className="h-10 w-10 mx-auto mb-3 opacity-30" />
          <p>No se encontraron términos para &ldquo;{query}&rdquo;</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(({ term, definition, category }) => {
            const isOpen = openTerm === term
            const conf = category ? categoryColors[category] : null
            return (
              <div
                key={term}
                className="rounded-xl border overflow-hidden transition-all duration-200"
                style={{
                  background: isOpen && conf ? conf.bg : 'rgba(17,17,32,0.7)',
                  borderColor: isOpen && conf ? conf.border : 'rgba(255,255,255,0.06)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenTerm(isOpen ? null : term)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/3 transition-colors"
                >
                  <span className="shrink-0 transition-transform duration-200" style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                    <ChevronRight className="h-4 w-4" style={{ color: conf?.color ?? 'var(--text-dim)' }} />
                  </span>
                  <span className="font-bold text-white flex-1">{term}</span>
                  {category && conf && (
                    <span
                      className="badge text-[10px] shrink-0"
                      style={{ background: conf.bg, borderColor: conf.border, color: conf.color }}
                    >
                      {category}
                    </span>
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pl-[calc(1.25rem+1rem+0.75rem)]">
                    <p className="text-sm text-[var(--text)] leading-relaxed">{definition}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
