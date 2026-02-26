'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Menu, X, Home, BookOpen, FlaskConical, FileText,
  Play, Link2, BookMarked, Trophy, Scroll, Info, GraduationCap
} from 'lucide-react'
import { allModules } from '@/content/modules/registry'

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

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="lg:hidden p-2 rounded-lg hover:bg-white/6 text-[var(--text-muted)] transition-colors"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className="lg:hidden fixed top-14 left-0 right-0 z-50 bg-[var(--bg-surface)]/98 border-b border-white/6 max-h-[calc(100vh-3.5rem)] overflow-y-auto backdrop-blur-xl"
            aria-label="Navegación principal"
          >
            <div className="p-4 space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = item.href === '/'
                  ? pathname === '/'
                  : pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-[var(--accent)]/12 text-[var(--accent)]'
                        : 'text-[var(--text-muted)] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className={`h-4.5 w-4.5 shrink-0 ${isActive ? 'text-[var(--accent)]' : ''}`} />
                    {item.label}
                  </Link>
                )
              })}

              {/* Module links */}
              <div className="pt-4 mt-3 border-t border-white/5">
                <div className="px-4 pb-2 section-label">Plan de estudios</div>
                {allModules.map((mod) => (
                  <Link
                    key={mod.id}
                    href={`/modulos/${mod.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      pathname.includes(mod.id)
                        ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                        : 'text-[var(--text-muted)] hover:bg-white/4 hover:text-white'
                    }`}
                  >
                    <span className="module-badge text-[10px] shrink-0">{mod.number}</span>
                    <span className="truncate">{mod.title.split(' ').slice(0, 4).join(' ')}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  )
}
