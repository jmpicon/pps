import { allModules } from '@/content/modules/registry'
import { LessonBlock } from '@/components/LessonBlock'
import { FileText } from 'lucide-react'

export default function MisconfigurationPage() {
  const totalLessons = allModules.reduce((a, m) => a + m.lessons.length, 0)

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/5 bg-[var(--bg-surface)]/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-semibold mb-6">
            <FileText className="h-4 w-4" />
            Contenido completo
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
            Curso Puesta y Producción Segura
          </h1>
          <p className="text-[var(--text-muted)] text-lg">
            {allModules.length} módulos · {totalLessons} lecciones. Usa el índice para navegar.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          <nav
            className="lg:hidden mb-12 p-6 rounded-2xl bg-[var(--bg-card)]/80 backdrop-blur border border-white/5"
            aria-label="Índice del curso"
          >
            <h2 className="text-xs font-bold text-[var(--text-dim)] uppercase tracking-widest mb-6">
              Índice
            </h2>
            <div className="space-y-4 max-h-72 overflow-y-auto">
              {allModules.map((mod) => (
                <div key={mod.id}>
                  <div className="font-bold text-[var(--accent)]">M{mod.number}. {mod.title.split(' ').slice(0, 3).join(' ')}</div>
                  <ul className="space-y-1.5 pl-3 mt-2 border-l border-white/10">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson.id}>
                        <a
                          href={`#${mod.id}-${lesson.slug}`}
                          className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors block py-0.5"
                        >
                          {lesson.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <nav
            className="hidden lg:block lg:sticky lg:top-24 lg:self-start mb-12 lg:mb-0"
            aria-label="Índice del curso"
          >
            <div className="p-6 rounded-2xl bg-[var(--bg-card)]/80 backdrop-blur border border-white/5">
              <h2 className="text-xs font-bold text-[var(--text-dim)] uppercase tracking-widest mb-6">
                Índice
              </h2>
              <div className="space-y-5 max-h-[70vh] overflow-y-auto">
                {allModules.map((mod) => (
                  <div key={mod.id}>
                    <div className="font-bold text-[var(--accent)]">M{mod.number}. {mod.title.split(' ').slice(0, 3).join(' ')}</div>
                    <ul className="space-y-1.5 pl-3 mt-2 border-l border-white/10">
                      {mod.lessons.map((lesson) => (
                        <li key={lesson.id}>
                          <a
                            href={`#${mod.id}-${lesson.slug}`}
                            className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors block py-0.5"
                          >
                            {lesson.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </nav>

          <div className="space-y-0">
            {allModules.map((mod) =>
              mod.lessons.map((lesson) => (
                <LessonBlock
                  key={lesson.id}
                  mod={mod}
                  lesson={lesson}
                  showModuleTitle={true}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
