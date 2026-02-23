'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Play, CheckCircle2, AlertCircle } from 'lucide-react'

const STORAGE_KEY = 'pps-lab-'

interface LabViewProps {
  slug: string
  name: string
  port: number
  credentials: string
  steps: string[]
  vulns: string[]
}

type SetStateAction<T> = T | ((prev: T) => T)

function useStoredState<T>(key: string, initial: T): [T, (v: SetStateAction<T>) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initial
    try {
      const s = localStorage.getItem(STORAGE_KEY + key)
      return s ? JSON.parse(s) : initial
    } catch {
      return initial
    }
  })
  const set = (v: SetStateAction<T>) => {
    setState((prev) => {
      const next = typeof v === 'function' ? (v as (prev: T) => T)(prev) : v
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY + key, JSON.stringify(next))
        } catch {}
      }
      return next
    })
  }
  return [state, set]
}

export function LabView({ slug, name, port, credentials, steps, vulns }: LabViewProps) {
  const [completed, setCompleted] = useStoredState<string[]>(`${slug}-completed`, [])
  const [notes, setNotes] = useStoredState<string>(`${slug}-notes`, '')
  const [solutionsOpen, setSolutionsOpen] = useState(false)

  const labUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}:${port}/`
    : `http://localhost:${port}/`

  const toggleStep = (i: number) => {
    const step = String(i)
    setCompleted((prev) =>
      prev.includes(step) ? prev.filter((s) => s !== step) : [...prev, step]
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Instrucciones */}
        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h1 className="text-2xl font-bold text-white">{name}</h1>
            <a
              href={labUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--bg-base)] font-bold text-sm hover:bg-[var(--accent-bright)]"
            >
              <Play className="h-4 w-4" />
              Abrir lab
            </a>
          </div>

          <div className="space-y-6">
            <section className="p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                Pasos
              </h2>
              <ol className="space-y-3">
                {steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <button
                      type="button"
                      onClick={() => toggleStep(i)}
                      className={`shrink-0 flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                        completed.includes(String(i))
                          ? 'bg-[var(--success)]/20 text-[var(--success)]'
                          : 'bg-white/5 text-[var(--text-muted)] hover:bg-[var(--accent)]/15 hover:text-[var(--accent)]'
                      }`}
                    >
                      {completed.includes(String(i)) ? '✓' : i + 1}
                    </button>
                    <span className="text-[var(--text)] pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section className="p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-[var(--danger)]" />
                Credenciales
              </h2>
              <code className="block p-3 rounded-xl bg-[var(--bg-base)] text-[var(--terminal)] font-mono text-sm">
                {credentials}
              </code>
            </section>

            <section className="p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-white/5">
              <h2 className="text-lg font-bold text-white mb-4">Vulnerabilidades</h2>
              <div className="flex flex-wrap gap-2">
                {vulns.map((v) => (
                  <span
                    key={v}
                    className="px-2 py-1 rounded-lg bg-[var(--danger)]/15 text-[var(--danger)] text-sm font-medium"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </section>

            <section className="p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-white/5">
              <button
                type="button"
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                className="flex items-center gap-2 text-[var(--accent)] font-semibold"
              >
                {solutionsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                Solución / Pistas
              </button>
              {solutionsOpen && (
                <div className="mt-4 p-4 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--text-muted)] text-sm">
                  TODO: Añadir soluciones o pistas cuando el profesor las proporcione.
                  Consulta las lecciones asociadas para guías de explotación.
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Checklist / Notas */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-white/5">
            <h2 className="text-lg font-bold text-white mb-4">Notas del alumno</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Escribe tus notas, resultados, comandos..."
              className="w-full h-40 resize-none rounded-xl bg-[var(--bg-base)] border border-white/5 px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent)]/50"
            />
            <p className="mt-2 text-xs text-[var(--text-dim)]">
              Se guarda automáticamente en tu navegador
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
