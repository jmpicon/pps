import Link from 'next/link'
import { Shield, ExternalLink, Github, BookOpen, FlaskConical, Trophy, BookMarked, Scroll } from 'lucide-react'

const courseLinks = [
  { href: '/start',       label: 'Empieza aquí' },
  { href: '/syllabus',    label: 'Mapa curricular' },
  { href: '/modulos',     label: 'Módulos' },
  { href: '/contenido',   label: 'Contenido lineal' },
  { href: '/challenges',  label: 'Retos CTF' },
]

const toolLinks = [
  { href: '/laboratorio', label: 'Laboratorio', icon: FlaskConical },
  { href: '/resources',   label: 'Recursos',    icon: ExternalLink },
  { href: '/glossary',    label: 'Glosario',    icon: BookMarked },
  { href: '/ethics',      label: 'Ética',       icon: Scroll },
  { href: '/about',       label: 'Sobre el curso', icon: BookOpen },
]

const externalLinks = [
  { href: 'https://owasp.org/www-project-top-ten/',                  label: 'OWASP Top Ten' },
  { href: 'https://owasp.org/www-project-web-security-testing-guide/', label: 'OWASP WSTG' },
  { href: 'https://www.zaproxy.org/',                                label: 'OWASP ZAP' },
  { href: 'https://jwt.io/',                                          label: 'JWT Debugger' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--bg-surface)]/95 backdrop-blur-xl mt-auto">
      {/* Top band */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-14 pb-10">
        <div className="grid md:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-3 mb-5 group w-fit">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-[var(--bg-base)] shadow-[0_0_20px_-6px_var(--accent)] group-hover:shadow-[0_0_30px_-4px_var(--accent)] transition-all group-hover:scale-105">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="font-black text-base text-white block tracking-tight">PPS Academy</span>
                <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest font-medium">Ciberseguridad aplicada</span>
              </div>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
              Plataforma de formación en ciberseguridad web. Contenido OWASP, laboratorios Docker y acceso sin barreras.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <span className="badge badge-cyan text-[10px]">v1.0</span>
              <span className="badge badge-success text-[10px]">6 módulos</span>
              <span className="badge badge-violet text-[10px]">2 labs</span>
            </div>
          </div>

          {/* Curso */}
          <div className="md:col-span-3">
            <h4 className="section-label mb-5">Curso</h4>
            <ul className="space-y-3">
              {courseLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--text-dim)] group-hover:bg-[var(--accent)] transition-colors shrink-0" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Herramientas */}
          <div className="md:col-span-2">
            <h4 className="section-label mb-5">Herramientas</h4>
            <ul className="space-y-3">
              {toolLinks.map((l) => {
                const Icon = l.icon
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium group"
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors" />
                      {l.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Recursos externos */}
          <div className="md:col-span-3">
            <h4 className="section-label mb-5">Referencias</h4>
            <ul className="space-y-3">
              {externalLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium"
                  >
                    {l.label}
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-7 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <p className="text-xs text-[var(--text-dim)]">
              © {new Date().getFullYear()} PPS Academy · Uso educativo
            </p>
            <span className="text-[var(--text-dim)] hidden sm:inline">·</span>
            <p className="text-xs text-[var(--text-dim)] hidden sm:block">
              Autor: <span className="text-[var(--text-muted)]">José Picón</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/ethics" className="text-xs text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors">Uso responsable</Link>
            <span className="text-[var(--text-dim)]">·</span>
            <Link href="/about"  className="text-xs text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors">Sobre el curso</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
