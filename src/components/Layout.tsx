'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield, BookOpen, FlaskConical, Home, ChevronRight, FileText, Play, Link2, BookMarked, Search } from 'lucide-react'
import { allModules } from '@/content/modules/registry'
import { MobileNav } from './MobileNav'
import { Footer } from './Footer'
import { SearchCommandBar } from './SearchCommandBar'
import { useProgress } from './ProgressProvider'

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

  return (
    <div className="flex min-h-screen relative z-10">
      <aside className="w-64 shrink-0 border-r border-white/5 bg-[var(--bg-surface)]/95 backdrop-blur-xl hidden lg:flex flex-col">
        <div className="p-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] via-[var(--accent-dim)] to-[var(--terminal)] text-[var(--bg-base)] shadow-[0_0_30px_-8px_var(--accent)] group-hover:shadow-[0_0_40px_-8px_var(--accent)] transition-all group-hover:scale-105">
              <Shield className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-base text-white block truncate">PPS Academy</span>
              <span className="block text-xs text-[var(--text-dim)]">Ciberseguridad aplicada</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4">
          <div className="space-y-1">
            {[
              { href: '/', label: 'Estudio', icon: Home },
              { href: '/start', label: 'Empieza aquí', icon: Play },
              { href: '/syllabus', label: 'Mapa curricular', icon: BookOpen },
              { href: '/modulos', label: 'Módulos', icon: BookOpen },
              { href: '/laboratorio', label: 'Laboratorio', icon: FlaskConical },
              { href: '/contenido', label: 'Contenido lineal', icon: FileText },
              { href: '/resources', label: 'Recursos', icon: Link2 },
              { href: '/glossary', label: 'Glosario', icon: BookMarked },
              { href: '/search', label: 'Búsqueda', icon: Search, isSearch: true },
            ].map((item) => {
              const Icon = item.icon
              const isActive = !('isSearch' in item) && (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)))
              if ('isSearch' in item && item.isSearch) {
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-[var(--text-muted)] hover:bg-white/5 hover:text-white w-full text-left"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    {item.label}
                    <kbd className="ml-auto hidden xl:inline px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[var(--text-dim)]">⌘K</kbd>
                  </button>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </div>

          {(isModulePage || isLessonPage) && (
            <div className="mt-10 pt-6 border-t border-white/5">
              <div className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest px-4 mb-6">
                Plan de estudios
              </div>
              <div className="space-y-1">
                {allModules.map((mod) => {
                  const isActive = pathname.includes(mod.id)
                  return (
                    <Link
                      key={mod.id}
                      href={`/modulos/${mod.id}`}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                          : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <ChevronRight className={`h-4 w-4 shrink-0 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                      <span className="truncate">M{mod.number}. {mod.title.split(' ').slice(0, 3).join(' ')}</span>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {(isModulePage || isLessonPage) && (
            <div className="mt-6 px-4">
              <div className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest mb-3">
                Tu progreso
              </div>
              <div className="space-y-3">
                {allModules.map((mod) => {
                  const slugs = mod.lessons.map((l) => l.slug)
                  const pct = slugs.length > 0 ? Math.round((slugs.filter((s) => visited.has(s)).length / slugs.length) * 100) : 0
                  return (
                    <div key={mod.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-[var(--text-muted)] truncate">M{mod.number}</span>
                        <span className="text-[var(--accent)] font-mono">{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--terminal)] transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {isLabsPage && (
            <div className="mt-10 pt-6 border-t border-white/5">
              <div className="text-[10px] font-bold text-[var(--text-dim)] uppercase tracking-widest px-4 mb-6">
                Laboratorios
              </div>
              <div className="space-y-1">
                <Link
                  href="/labs/lab-sqli"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname.includes('lab-sqli')
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <ChevronRight className={`h-4 w-4 shrink-0 ${pathname.includes('lab-sqli') ? 'rotate-90' : ''}`} />
                  Lab SQL Injection
                </Link>
                <Link
                  href="/labs/dvwa"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    pathname.includes('dvwa')
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <ChevronRight className={`h-4 w-4 shrink-0 ${pathname.includes('dvwa') ? 'rotate-90' : ''}`} />
                  DVWA
                </Link>
              </div>
            </div>
          )}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-50 border-b border-white/5 bg-[var(--bg-surface)]/95 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dim)] text-[var(--bg-base)]">
                <Shield className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg text-white">PPS Academy</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-lg hover:bg-white/5 text-[var(--text-muted)] transition-colors"
                aria-label="Buscar (⌘K)"
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
