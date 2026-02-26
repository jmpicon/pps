'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Shield, BookOpen, FlaskConical, Home, ChevronRight,
  FileText, Play, Link2, BookMarked, Search,
  GraduationCap, Trophy, Info, Scroll
} from 'lucide-react'
import { allModules } from '@/content/modules/registry'
import { MobileNav } from './MobileNav'
import { Footer } from './Footer'
import { SearchCommandBar } from './SearchCommandBar'
import { useProgress } from './ProgressProvider'

const navItems = [
  { href: '/',            label: 'Inicio',          icon: Home },
  { href: '/start',       label: 'Empieza aquí',    icon: Play },
  { href: '/syllabus',    label: 'Mapa curricular', icon: GraduationCap },
  { href: '/modulos',     label: 'Módulos',          icon: BookOpen },
  { href: '/laboratorio', label: 'Laboratorio',      icon: FlaskConical },
  { href: '/contenido',   label: 'Contenido lineal', icon: FileText },
  { href: '/challenges',  label: 'Retos',            icon: Trophy },
  { href: '/resources',   label: 'Recursos',         icon: Link2 },
  { href: '/glossary',    label: 'Glosario',         icon: BookMarked },
  { href: '/ethics',      label: 'Ética',            icon: Scroll },
  { href: '/about',       label: 'Sobre el curso',   icon: Info },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const { visited } = useProgress()

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((s) => !s)
      }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const isModulePage = pathname.startsWith('/modulos/') && pathname !== '/modulos'
  const isLessonPage = pathname.includes('/lecciones/')
  const isLabsPage = pathname.startsWith('/laboratorio') || pathname.startsWith('/labs/')

  const totalLessons = allModules.reduce((a, m) => a + m.lessons.length, 0)
  const visitedCount = allModules
    .flatMap((m) => m.lessons.map((l) => l.slug))
    .filter((s) => visited.has(s)).length
  const globalPct = totalLessons > 0 ? Math.round((visitedCount / totalLessons) * 100) : 0

  return (
    <div className="flex min-h-screen relative z-10">

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="w-64 shrink-0 border-r border-white/5 bg-[var(--bg-surface)]/97 backdrop-blur-xl hidden lg:flex flex-col">

        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] via-[var(--accent-dim)] to-[var(--terminal)] text-[var(--bg-base)] shadow-[0_0_24px_-6px_var(--accent)] group-hover:shadow-[0_0_36px_-4px_var(--accent)] transition-all group-hover:scale-105">
              <Shield className="h-5 w-5" />
              {/* Live dot */}
              <span className="absolute -top-0.5 -right-0.5">
                <span className="pulse-dot w-2 h-2 block" />
              </span>
            </div>
            <div className="min-w-0">
              <span className="font-black text-sm text-white block tracking-tight">PPS Academy</span>
              <span className="block text-[10px] text-[var(--text-dim)] font-medium tracking-wide uppercase">Ciberseguridad aplicada</span>
            </div>
          </Link>
        </div>

        {/* Global progress */}
        {globalPct > 0 && (
          <div className="px-4 pt-4 pb-2 border-b border-white/5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest">Progreso global</span>
              <span className="text-xs font-bold text-[var(--accent)] font-mono">{globalPct}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${globalPct}%` }} />
            </div>
            <p className="text-[10px] text-[var(--text-dim)] mt-1.5">{visitedCount} de {totalLessons} lecciones</p>
          </div>
        )}

        {/* Search button */}
        <div className="px-3 pt-4">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/4 border border-white/6 text-[var(--text-dim)] hover:bg-white/7 hover:border-[var(--accent)]/20 hover:text-[var(--text-muted)] transition-all text-sm group"
          >
            <Search className="h-4 w-4 shrink-0 group-hover:text-[var(--accent)] transition-colors" />
            <span className="flex-1 text-left">Buscar lección...</span>
            <kbd className="text-[10px] hidden xl:inline">⌘K</kbd>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="section-label px-2 mb-3">Navegación</div>
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--accent)]/12 text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:bg-white/4 hover:text-white'
                  }`}
                >
                  {isActive && <span className="nav-active-indicator" />}
                  <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[var(--accent)]' : ''}`} />
                  <span className="truncate">{item.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Module tree — only on module/lesson pages */}
          {(isModulePage || isLessonPage) && (
            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="section-label px-2 mb-3">Plan de estudios</div>
              <div className="space-y-0.5">
                {allModules.map((mod) => {
                  const isActive = pathname.includes(mod.id)
                  const slugs = mod.lessons.map((l) => l.slug)
                  const pct = slugs.length > 0
                    ? Math.round((slugs.filter((s) => visited.has(s)).length / slugs.length) * 100)
                    : 0
                  return (
                    <Link
                      key={mod.id}
                      href={`/modulos/${mod.id}`}
                      className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                          : 'text-[var(--text-muted)] hover:bg-white/4 hover:text-white'
                      }`}
                    >
                      {isActive && <span className="nav-active-indicator" />}
                      <span
                        className="module-badge text-[10px] shrink-0"
                        style={isActive ? { background: 'rgba(34,211,238,0.18)', color: 'var(--accent)', borderColor: 'rgba(34,211,238,0.3)' } : {}}
                      >
                        {mod.number}
                      </span>
                      <span className="truncate flex-1">
                        {mod.title.split(':')[0] || mod.title.split(' ').slice(0,3).join(' ')}
                      </span>
                      {pct > 0 && (
                        <span className="text-[10px] font-mono text-[var(--accent)] opacity-80 shrink-0">{pct}%</span>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Per-module progress bars */}
          {(isModulePage || isLessonPage) && (
            <div className="mt-5 px-2">
              <div className="section-label mb-3">Tu progreso</div>
              <div className="space-y-3">
                {allModules.map((mod) => {
                  const slugs = mod.lessons.map((l) => l.slug)
                  const pct = slugs.length > 0
                    ? Math.round((slugs.filter((s) => visited.has(s)).length / slugs.length) * 100)
                    : 0
                  return (
                    <div key={mod.id} className="space-y-1">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-[var(--text-dim)] truncate">M{mod.number}</span>
                        <span className="font-mono" style={{ color: pct === 100 ? 'var(--success)' : 'var(--accent)' }}>
                          {pct}%
                        </span>
                      </div>
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${pct}%`,
                            background: pct === 100
                              ? 'linear-gradient(90deg, var(--success), var(--terminal))'
                              : undefined
                          }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Labs sub-nav */}
          {isLabsPage && (
            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="section-label px-2 mb-3">Laboratorios</div>
              <div className="space-y-0.5">
                {[
                  { href: '/labs/lab-sqli', id: 'lab-sqli', label: 'SQL Injection' },
                  { href: '/labs/dvwa',     id: 'dvwa',     label: 'DVWA' },
                ].map((lab) => (
                  <Link
                    key={lab.href}
                    href={lab.href}
                    className={`relative flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      pathname.includes(lab.id)
                        ? 'bg-[var(--terminal)]/10 text-[var(--terminal)]'
                        : 'text-[var(--text-muted)] hover:bg-white/4 hover:text-white'
                    }`}
                  >
                    {pathname.includes(lab.id) && (
                      <span className="nav-active-indicator" style={{ background: 'var(--terminal)', boxShadow: '0 0 10px var(--terminal)' }} />
                    )}
                    <FlaskConical className="h-4 w-4 shrink-0" />
                    {lab.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </aside>

      {/* ── Main content ────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-50 border-b border-white/5 bg-[var(--bg-surface)]/97 backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-[var(--bg-base)]">
                <Shield className="h-4 w-4" />
              </div>
              <span className="font-black text-base text-white tracking-tight">PPS Academy</span>
            </Link>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-white/6 text-[var(--text-muted)] transition-colors"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>
              <MobileNav />
            </div>
          </div>
        </header>

        <main id="main-content" className="flex-1 flex flex-col" role="main">
          {children}
        </main>
        <Footer />
      </div>

      <SearchCommandBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
