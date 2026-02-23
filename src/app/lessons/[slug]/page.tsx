import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLessonBySlug } from '@/content/modules/registry'
import { getPrevNextBySlug } from '@/lib/navigation'
import { MarkdownContent } from '@/components/MarkdownContent'
import { CopyableCode } from '@/components/CopyableCode'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { LessonVisitedTracker } from '@/components/LessonVisitedTracker'
import { Target, KeyRound, FlaskConical, ChevronLeft, ChevronRight } from 'lucide-react'

export async function generateStaticParams() {
  const { getAllLessonsFlat } = await import('@/content/modules/registry')
  const all = getAllLessonsFlat()
  return all.map(({ lesson }) => ({ slug: lesson.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const data = getLessonBySlug(params.slug)
  if (!data) return { title: 'Lección no encontrada' }
  return {
    title: `${data.lesson.title} | ${data.module.title}`,
    description: data.lesson.objectives?.[0] ?? `Lección de ${data.module.title}`,
  }
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const data = getLessonBySlug(params.slug)
  if (!data) notFound()

  const { module: mod, lesson } = data
  const { prev, next } = getPrevNextBySlug(params.slug)

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

      <div className="mb-2 text-sm font-semibold text-[var(--accent)]">
        Módulo {mod.number} · {mod.title}
      </div>
      <h1 className="text-2xl lg:text-3xl font-bold text-white mb-8">
        {lesson.title}
      </h1>

      {lesson.objectives.length > 0 && (
        <section className="mb-8 p-6 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
          <h2 className="flex items-center gap-2 font-semibold text-[var(--accent)] mb-4">
            <Target className="h-5 w-5 shrink-0" />
            Objetivos de aprendizaje
          </h2>
          <ul className="space-y-2 text-[var(--text)]">
            {lesson.objectives.map((obj, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--accent)]">•</span>
                {obj}
              </li>
            ))}
          </ul>
        </section>
      )}

      {lesson.keyPoints.length > 0 && (
        <section className="mb-8 p-6 rounded-2xl bg-[var(--warning)]/10 border border-[var(--warning)]/20">
          <h2 className="flex items-center gap-2 font-semibold text-[var(--warning)] mb-4">
            <KeyRound className="h-5 w-5 shrink-0" />
            Puntos clave
          </h2>
          <ul className="space-y-2 text-[var(--text)]">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[var(--warning)]">•</span>
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-10">
        <h2 className="text-lg font-semibold text-white mb-4">Contenido teórico</h2>
        <div className="rounded-2xl bg-[var(--bg-card)]/80 p-6 border border-white/5">
          <MarkdownContent content={lesson.theory} />
        </div>
      </section>

      {lesson.practice && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">Práctica</h2>
          <div className="rounded-2xl bg-[var(--bg-card)]/80 p-6 border border-white/5">
            <MarkdownContent content={lesson.practice} />
          </div>
        </section>
      )}

      {lesson.codeExamples && lesson.codeExamples.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-white mb-4">Ejemplos de código</h2>
          <div className="space-y-4">
            {lesson.codeExamples.map((ex, i) => (
              <CopyableCode key={i} code={ex.code} title={ex.title} />
            ))}
          </div>
        </section>
      )}

      {lesson.activity && (
        <section className="mb-10 p-6 rounded-2xl bg-[var(--terminal)]/10 border border-[var(--terminal)]/20">
          <h2 className="flex items-center gap-2 font-semibold text-[var(--terminal)] mb-4">
            <FlaskConical className="h-5 w-5 shrink-0" />
            Actividad: {lesson.activity.title}
          </h2>
          <p className="text-[var(--text)] mb-4">{lesson.activity.objective}</p>
          <ol className="space-y-2 mb-6">
            {lesson.activity.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-[var(--text)]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[var(--terminal)]/20 text-[var(--terminal)] text-xs font-bold font-mono">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          {lesson.activity.labId && (
            <Link
              href={`/labs/${lesson.activity.labId}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--terminal)]/20 text-[var(--terminal)] font-medium hover:bg-[var(--terminal)]/30"
            >
              <FlaskConical className="h-4 w-4" />
              Ir al laboratorio
            </Link>
          )}
        </section>
      )}

      {/* Prev / Next */}
      <nav className="flex flex-col sm:flex-row gap-4 sm:justify-between pt-8 border-t border-white/5">
        {prev ? (
          <Link
            href={`/lessons/${prev.lesson.slug}`}
            className="flex items-center gap-2 text-[var(--accent)] font-medium hover:text-[var(--accent-bright)]"
          >
            <ChevronLeft className="h-4 w-4" />
            {prev.lesson.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/lessons/${next.lesson.slug}`}
            className="flex items-center gap-2 text-[var(--accent)] font-medium hover:text-[var(--accent-bright)] sm:ml-auto"
          >
            {next.lesson.title}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  )
}
