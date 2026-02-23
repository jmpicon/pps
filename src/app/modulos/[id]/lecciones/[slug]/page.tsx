import Link from 'next/link'
import { Target, KeyRound, FlaskConical } from 'lucide-react'
import { getModule, getLesson, allModules } from '@/content/modules/registry'
import { MarkdownContent } from '@/components/MarkdownContent'
import { LessonVisitedTracker } from '@/components/LessonVisitedTracker'
import { CopyableCode } from '@/components/CopyableCode'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  const params: { id: string; slug: string }[] = []
  for (const mod of allModules) {
    for (const lesson of mod.lessons) {
      params.push({ id: mod.id, slug: lesson.slug })
    }
  }
  return params
}

export async function generateMetadata({
  params,
}: {
  params: { id: string; slug: string }
}): Promise<Metadata> {
  const mod = getModule(params.id)
  const lesson = mod ? getLesson(params.id, params.slug) : undefined
  if (!mod || !lesson) return { title: 'Lección no encontrada' }
  return {
    title: `${lesson.title} | ${mod.title} | PPS Academy`,
    description: lesson.objectives?.[0] ?? `Lección de ${mod.title}`,
  }
}

export default async function LessonPage({
  params,
}: {
  params: { id: string; slug: string }
}) {
  const mod = getModule(params.id)
  const lesson = mod ? getLesson(params.id, params.slug) : undefined

  if (!mod || !lesson) {
    return (
      <div className="p-10 text-center max-w-md mx-auto">
        <p className="text-[var(--text-muted)]">Lección no encontrada</p>
        <Link
          href={`/modulos/${params.id}`}
          className="mt-4 inline-block text-[var(--accent)] font-medium hover:text-[var(--accent-bright)]"
        >
          Volver al módulo
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <LessonVisitedTracker slug={params.slug} />
      <Breadcrumbs
        items={[
          { label: 'Módulos', href: '/modulos' },
          { label: mod.title, href: `/modulos/${mod.id}` },
          { label: lesson.title },
        ]}
      />

      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-8 tracking-tight">
        {lesson.title}
      </h1>

      {lesson.objectives.length > 0 && (
        <section
          className="mb-8 p-6 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20"
          aria-labelledby="objetivos-heading"
        >
          <h2
            id="objetivos-heading"
            className="flex items-center gap-2 font-semibold text-[var(--accent)] mb-4"
          >
            <Target className="h-5 w-5 shrink-0" />
            Objetivos de aprendizaje
          </h2>
          <ul className="space-y-2 text-[var(--text)] text-[15px]">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--accent)] mt-0.5">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {lesson.keyPoints.length > 0 && (
        <section
          className="mb-8 p-6 rounded-2xl bg-[var(--warning)]/10 border border-[var(--warning)]/20"
          aria-labelledby="puntos-heading"
        >
          <h2
            id="puntos-heading"
            className="flex items-center gap-2 font-semibold text-[var(--warning)] mb-4"
          >
            <KeyRound className="h-5 w-5 shrink-0" />
            Puntos clave
          </h2>
          <ul className="space-y-2 text-[var(--text)] text-[15px]">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--warning)] mt-0.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-10" aria-labelledby="teoria-heading">
        <h2 id="teoria-heading" className="text-base font-semibold text-white mb-4">
          Contenido teórico
        </h2>
        <div className="rounded-2xl bg-[var(--bg-card)] p-6 lg:p-8 border border-[var(--border)]">
          <MarkdownContent content={lesson.theory} />
        </div>
      </section>

      {lesson.practice && (
        <section className="mb-10" aria-labelledby="practica-heading">
          <h2 id="practica-heading" className="text-base font-semibold text-white mb-4">
            Práctica
          </h2>
          <div className="rounded-2xl bg-[var(--bg-card)] p-6 border border-[var(--border)]">
            <MarkdownContent content={lesson.practice} />
          </div>
        </section>
      )}

      {lesson.codeExamples && lesson.codeExamples.length > 0 && (
        <section className="mb-10" aria-labelledby="codigo-heading">
          <h2 id="codigo-heading" className="text-base font-semibold text-white mb-4">
            Ejemplos de código
          </h2>
          <div className="space-y-4">
            {lesson.codeExamples.map((ex, i) => (
              <CopyableCode key={i} code={ex.code} title={ex.title} />
            ))}
          </div>
        </section>
      )}

      {lesson.activity && (
        <section
          className="p-6 rounded-2xl bg-[var(--terminal)]/10 border border-[var(--terminal)]/20"
          aria-labelledby="actividad-heading"
        >
          <h2
            id="actividad-heading"
            className="flex items-center gap-2 font-semibold text-[var(--terminal)] mb-4"
          >
            <FlaskConical className="h-5 w-5 shrink-0" />
            Actividad: {lesson.activity.title}
          </h2>
          <p className="text-[var(--text)] mb-4 text-[15px]">{lesson.activity.objective}</p>
          <ol className="space-y-2 mb-6">
            {lesson.activity.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-[var(--text)]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--terminal)]/20 text-[var(--terminal)] text-xs font-mono">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          {lesson.activity.labId && (
            <Link
              href={`/laboratorio/#${lesson.activity.labId}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--terminal)]/20 text-[var(--terminal)] font-medium hover:bg-[var(--terminal)]/30 transition-colors"
            >
              <FlaskConical className="h-4 w-4" />
              Ir al laboratorio
            </Link>
          )}
        </section>
      )}
    </article>
  )
}
