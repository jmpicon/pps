import Link from 'next/link'
import { allModules } from '@/content/modules/registry'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BookOpen, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Mapa curricular',
  description: 'Estructura completa del curso Puesta y Producción Segura',
}

export default function SyllabusPage() {
  const totalLessons = allModules.reduce((a, m) => a + m.lessons.length, 0)

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Mapa curricular' }]} />

      <div className="mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          Mapa curricular
        </h1>
        <p className="text-[var(--text-muted)] text-lg">
          {allModules.length} módulos · {totalLessons} lecciones · 2 laboratorios
        </p>
      </div>

      <div className="space-y-6">
        {allModules.map((mod) => (
          <div
            key={mod.id}
            className="rounded-2xl border border-white/5 bg-[var(--bg-card)]/80 overflow-hidden"
          >
            <Link
              href={`/modulos/${mod.id}`}
              className="block p-6 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold text-[var(--accent)]">
                    Módulo {mod.number}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1">{mod.title}</h2>
                  <p className="text-[var(--text-muted)] mt-2">{mod.description}</p>
                  <span className="inline-block mt-3 text-sm text-[var(--text-dim)]">
                    {mod.lessons.length} lecciones
                  </span>
                </div>
                <ChevronRight className="h-6 w-6 text-[var(--text-dim)] shrink-0" />
              </div>
            </Link>
            <div className="border-t border-white/5 px-6 py-4">
              <ul className="grid sm:grid-cols-2 gap-2">
                {mod.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <Link
                      href={`/modulos/${mod.id}/lecciones/${lesson.slug}`}
                      className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                    >
                      <BookOpen className="h-3.5 w-3.5 shrink-0" />
                      {lesson.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-[var(--terminal)]/10 border border-[var(--terminal)]/20">
        <h2 className="text-lg font-bold text-white mb-2">Laboratorios</h2>
        <ul className="space-y-2 text-[var(--text)]">
          <li>
            <Link href="/laboratorio#lab-sqli" className="text-[var(--accent)] hover:underline">
              Lab SQL Injection
            </Link>
            {' '}
            <Link href="/labs/lab-sqli" className="text-[var(--text-muted)] hover:text-[var(--accent)] text-sm">
              (modo guiado)
            </Link>
            {' '}— Puerto 8081
          </li>
          <li>
            <Link href="/laboratorio#dvwa" className="text-[var(--accent)] hover:underline">
              DVWA
            </Link>
            {' '}
            <Link href="/labs/dvwa" className="text-[var(--text-muted)] hover:text-[var(--accent)] text-sm">
              (modo guiado)
            </Link>
            {' '}— Puerto 4280
          </li>
        </ul>
      </div>
    </div>
  )
}
