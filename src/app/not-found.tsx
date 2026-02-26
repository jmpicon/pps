import Link from 'next/link'
import { Home, BookOpen, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="orb orb-cyan w-80 h-80 opacity-20 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="bg-dots absolute inset-0 opacity-30" />

      <div className="relative max-w-md w-full text-center">
        {/* 404 number */}
        <div className="relative mb-6">
          <div
            className="text-[9rem] lg:text-[11rem] font-black leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, rgba(34,211,238,0.15) 0%, rgba(34,211,238,0.05) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[8rem] lg:text-[10rem] font-black leading-none"
              style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--terminal) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'blur(0px)',
                opacity: 0.15,
              }}
            >
              404
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-black text-white mb-3">Página no encontrada</h1>
        <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
          La ruta que buscas no existe o ha sido movida.
          Puede que la URL esté mal escrita o el contenido haya cambiado de ubicación.
        </p>

        {/* Terminal message */}
        <div className="mb-8 px-5 py-4 rounded-xl bg-[var(--bg-card)]/60 border border-white/6 text-left font-mono text-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 rounded-full bg-[var(--danger)]/60" />
            <span className="w-3 h-3 rounded-full bg-[var(--warning)]/60" />
            <span className="w-3 h-3 rounded-full bg-[var(--success)]/60" />
          </div>
          <p className="text-[var(--text-dim)]"><span className="text-[var(--accent)]">$</span> curl -I {'{url}'}</p>
          <p className="text-[var(--danger)] mt-1">HTTP/1.1 404 Not Found</p>
          <p className="text-[var(--text-dim)] mt-1 terminal-cursor">X-Error: Page not found</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <Home className="h-4 w-4" />
            Ir al inicio
          </Link>
          <Link href="/modulos" className="btn-secondary">
            <BookOpen className="h-4 w-4" />
            Ver módulos
          </Link>
        </div>
      </div>
    </div>
  )
}
