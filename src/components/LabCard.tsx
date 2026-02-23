'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, FlaskConical, Play, CheckCircle2, AlertCircle, ListChecks } from 'lucide-react'

interface Lab {
  id: string
  name: string
  module: string
  desc: string
  port: number
  credentials: string
  steps: string[]
  vulns: string[]
}

interface LabCardProps {
  lab: Lab
}

export function LabCard({ lab }: LabCardProps) {
  const [expanded, setExpanded] = useState(false)
  const labUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.hostname}:${lab.port}/`
    : `http://localhost:${lab.port}/`

  return (
    <div id={`lab-${lab.id}`} className="rounded-2xl border border-white/10 bg-[var(--bg-card)]/60 backdrop-blur overflow-hidden hover:border-[var(--terminal)]/40 hover:bg-[var(--bg-card)]/80 transition-all duration-300 shadow-lg hover:shadow-[0_8px_40px_-12px_rgba(45,212,191,0.15)] scroll-mt-24">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--terminal)]/20 to-[var(--terminal)]/5 text-[var(--terminal)] group-hover:from-[var(--terminal)]/30 group-hover:to-[var(--terminal)]/10 transition-all">
              <FlaskConical className="h-7 w-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--terminal)] uppercase tracking-wider">{lab.module}</span>
              <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[var(--terminal)] transition-colors">
                {lab.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{lab.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/labs/${lab.id}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-[var(--accent)]/15 hover:border-[var(--accent)]/30"
            >
              <ListChecks className="h-4 w-4" />
              Modo lab
            </Link>
            <a
              href={labUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--bg-base)] font-bold text-sm hover:bg-[var(--accent-bright)] transition-colors"
            >
              <Play className="h-4 w-4" />
              Abrir
            </a>
            {expanded ? (
              <ChevronUp className="h-6 w-6 text-[var(--terminal)]" />
            ) : (
              <ChevronDown className="h-6 w-6 text-[var(--text-muted)] group-hover:text-[var(--terminal)]" />
            )}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-6 pb-6 pt-0 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[var(--accent)]" />
                Pasos
              </h4>
              <ol className="space-y-2">
                {lab.steps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[var(--text-muted)]">
                    <span className="shrink-0 flex h-5 w-5 items-center justify-center rounded bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-mono font-bold">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-[var(--danger)]" />
                Credenciales
              </h4>
              <code className="block p-3 rounded-xl bg-[var(--bg-base)] text-[var(--terminal)] text-sm font-mono border border-white/5">
                {lab.credentials}
              </code>
              <h4 className="text-sm font-semibold text-white mt-4 mb-2">Vulnerabilidades</h4>
              <div className="flex flex-wrap gap-2">
                {lab.vulns.map((v) => (
                  <span
                    key={v}
                    className="px-2 py-1 rounded-lg bg-[var(--danger)]/15 text-[var(--danger)] text-xs font-medium"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
