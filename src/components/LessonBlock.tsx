import Link from 'next/link'
import { Target, KeyRound, FlaskConical } from 'lucide-react'
import { MarkdownContent } from './MarkdownContent'
import { CopyableCode } from './CopyableCode'
import type { Lesson, Module } from '@/content/modules/index'

interface LessonBlockProps {
  mod: Module
  lesson: Lesson
  showModuleTitle?: boolean
}

export function LessonBlock({ mod, lesson, showModuleTitle = true }: LessonBlockProps) {
  const sectionId = `${mod.id}-${lesson.slug}`

  return (
    <article id={sectionId} className="scroll-mt-24 mb-16 pb-16 border-b border-white/5 last:border-0 last:mb-0 last:pb-0">
      {showModuleTitle && (
        <div className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider mb-3">
          Módulo {mod.number} · {mod.title}
        </div>
      )}
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
        {lesson.title}
      </h2>

      {lesson.objectives.length > 0 && (
        <section className="mb-6 p-6 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
          <h3 className="flex items-center gap-2 font-bold text-[var(--accent)] mb-4">
            <Target className="h-5 w-5 shrink-0" />
            Objetivos
          </h3>
          <ul className="space-y-2 text-[var(--text)]">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--accent)]">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {lesson.keyPoints.length > 0 && (
        <section className="mb-6 p-6 rounded-2xl bg-[var(--warning)]/10 border border-[var(--warning)]/20">
          <h3 className="flex items-center gap-2 font-bold text-[var(--warning)] mb-4">
            <KeyRound className="h-5 w-5 shrink-0" />
            Puntos clave
          </h3>
          <ul className="space-y-2 text-[var(--text)]">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--warning)]">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-6">
        <h3 className="text-lg font-bold text-white mb-4">Contenido teórico</h3>
        <div className="rounded-2xl bg-[var(--bg-card)]/80 backdrop-blur p-6 border border-white/5">
          <MarkdownContent content={lesson.theory} />
        </div>
      </section>

      {lesson.practice && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Práctica</h3>
          <div className="rounded-2xl bg-[var(--bg-card)]/80 backdrop-blur p-6 border border-white/5">
            <MarkdownContent content={lesson.practice} />
          </div>
        </section>
      )}

      {lesson.codeExamples && lesson.codeExamples.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-white mb-4">Ejemplos de código</h3>
          <div className="space-y-4">
            {lesson.codeExamples.map((ex, i) => (
              <CopyableCode key={i} code={ex.code} title={ex.title} />
            ))}
          </div>
        </section>
      )}

      {lesson.activity && (
        <section className="p-6 rounded-2xl bg-[var(--terminal)]/10 border border-[var(--terminal)]/20">
          <h3 className="flex items-center gap-2 font-bold text-[var(--terminal)] mb-4">
            <FlaskConical className="h-5 w-5 shrink-0" />
            Actividad: {lesson.activity.title}
          </h3>
          <p className="text-[var(--text)] mb-4">{lesson.activity.objective}</p>
          <ol className="space-y-2 mb-6">
            {lesson.activity.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-[var(--text)]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--terminal)]/20 text-[var(--terminal)] text-xs font-bold font-mono">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {lesson.activity.labId && (
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/labs/${lesson.activity.labId}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--terminal)]/20 text-[var(--terminal)] font-semibold hover:bg-[var(--terminal)]/30 transition-colors"
              >
                <FlaskConical className="h-4 w-4" />
                Modo lab guiado
              </Link>
              <Link
                href={`/laboratorio/#${lesson.activity.labId}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-[var(--text-muted)] font-medium hover:bg-white/10 transition-colors"
              >
                Ver en listado
              </Link>
            </div>
          )}
        </section>
      )}
    </article>
  )
}
