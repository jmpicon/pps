import Link from 'next/link'
import { FileQuestion, ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--warning)]/15 text-[var(--warning)]">
            <FileQuestion className="h-10 w-10" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">404</h1>
        <p className="text-[var(--text-muted)] mb-8 text-lg">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-dim)] transition-colors"
          >
            <Home className="h-4 w-4" />
            Ir al inicio
          </Link>
          <Link
            href="/modulos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[var(--border)] text-[var(--text)] font-medium hover:bg-[var(--bg-hover)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Ver módulos
          </Link>
        </div>
      </div>
    </div>
  )
}
