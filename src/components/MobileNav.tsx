'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, BookOpen, FlaskConical, Shield, FileText } from 'lucide-react'
import { allModules } from '@/content/modules/registry'

const navItems = [
  { href: '/', label: 'Estudio', icon: Home },
  { href: '/start', label: 'Empieza aquí', icon: Home },
  { href: '/syllabus', label: 'Mapa curricular', icon: BookOpen },
  { href: '/modulos', label: 'Módulos', icon: BookOpen },
  { href: '/laboratorio', label: 'Laboratorio', icon: FlaskConical },
  { href: '/contenido', label: 'Contenido lineal', icon: FileText },
  { href: '/resources', label: 'Recursos', icon: FileText },
  { href: '/glossary', label: 'Glosario', icon: FileText },
  { href: '/search', label: 'Búsqueda', icon: FileText },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="lg:hidden p-2.5 rounded-lg hover:bg-[var(--bg-hover)] text-[var(--text-muted)] transition-colors"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-[var(--bg-surface)] border-b border-[var(--border)] max-h-[calc(100vh-4rem)] overflow-y-auto"
            aria-label="Navegación principal"
          >
            <div className="p-4 space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all ${
                      isActive
                        ? 'bg-[var(--accent)]/15 text-[var(--accent)]'
                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]'
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-4 mt-4 border-t border-[var(--border)]">
                <div className="px-4 py-2 text-[10px] font-semibold text-[var(--text-dim)] uppercase tracking-widest">
                  Plan de estudios
                </div>
                {allModules.map((mod) => (
                  <Link
                    key={mod.id}
                    href={`/modulos/${mod.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm ${
                      pathname.includes(mod.id)
                        ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                        : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text)]'
                    }`}
                  >
                    <Shield className="h-4 w-4 shrink-0 opacity-60" />
                    M{mod.number}. {mod.title.split(' ').slice(0, 3).join(' ')}
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
