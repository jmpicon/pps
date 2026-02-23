import Link from 'next/link'
import { Shield, ExternalLink } from 'lucide-react'

const links = {
  curso: [
    { href: '/contenido', label: 'Todo el contenido' },
    { href: '/modulos', label: 'Plan de estudios' },
    { href: '/laboratorio', label: 'Laboratorio' },
  ],
  recursos: [
    { href: 'https://owasp.org/www-project-top-ten/', label: 'OWASP Top Ten', external: true },
    { href: 'https://owasp.org/www-project-web-security-testing-guide/', label: 'OWASP WSTG', external: true },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--bg-surface)]/90 backdrop-blur-xl mt-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-[var(--bg-base)]">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-white">PPS Academy</span>
            </Link>
            <p className="text-[var(--text-muted)] max-w-sm leading-relaxed">
              Plataforma de formación en ciberseguridad aplicada. Contenido OWASP, laboratorios prácticos y acceso sin barreras.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--text-dim)] uppercase tracking-widest mb-4">Curso</h4>
            <ul className="space-y-3">
              {links.curso.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[var(--text-dim)] uppercase tracking-widest mb-4">Recursos</h4>
            <ul className="space-y-3">
              {links.recursos.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium"
                  >
                    {l.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--text-dim)]">© {new Date().getFullYear()} PPS Academy · Uso educativo</p>
          <p className="text-sm text-[var(--text-dim)]">Puesta y Producción Segura</p>
        </div>
      </div>
    </footer>
  )
}
