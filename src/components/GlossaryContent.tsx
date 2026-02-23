'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { glossaryTerms } from '@/content/glossary'
import { ChevronDown, ChevronRight } from 'lucide-react'

export function GlossaryContent() {
  const [openTerm, setOpenTerm] = useState<string | null>(null)

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Estudio', href: '/' }, { label: 'Glosario' }]} />

      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        Glosario
      </h1>
      <p className="text-[var(--text-muted)] mb-10">
        Términos clave del curso. Haz clic para expandir.
      </p>

      <div className="space-y-2">
        {glossaryTerms.map(({ term, definition }) => {
          const isOpen = openTerm === term
          return (
            <div
              key={term}
              className="rounded-2xl bg-[var(--bg-card)]/60 border border-white/10 overflow-hidden hover:border-[var(--accent)]/20 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenTerm(isOpen ? null : term)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-[var(--accent)] shrink-0">
                  {isOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </span>
                <h2 className="font-bold text-white text-lg flex-1">{term}</h2>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pl-[calc(1.25rem+1.25rem+0.75rem)]">
                  <p className="text-[var(--text-muted)] leading-relaxed">{definition}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
