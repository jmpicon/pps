'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyableCodeProps {
  code: string
  title?: string
  className?: string
}

export function CopyableCode({ code, title, className = '' }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      try {
        const ta = document.createElement('textarea')
        ta.value = code
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {}
    }
  }

  return (
    <div className={`rounded-2xl bg-[var(--bg-card)]/80 backdrop-blur border border-white/5 overflow-hidden ${className}`}>
      {title && (
        <div className="px-5 py-3 bg-[var(--bg-elevated)] text-sm text-[var(--text-muted)] border-b border-white/5 font-mono font-semibold flex items-center justify-between">
          <span>{title}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--accent)]/20 hover:text-[var(--accent)] transition-all"
            aria-label="Copiar código"
          >
            {copied ? <Check className="h-4 w-4 text-[var(--success)]" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}
      <div className="relative group">
        <pre className="p-5 overflow-x-auto text-sm font-mono text-[var(--accent)]">
          <code>{code}</code>
        </pre>
        {!title && (
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 text-[var(--text-muted)] hover:bg-[var(--accent)]/20 hover:text-[var(--accent)] transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label="Copiar código"
          >
            {copied ? <Check className="h-4 w-4 text-[var(--success)]" /> : <Copy className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  )
}
