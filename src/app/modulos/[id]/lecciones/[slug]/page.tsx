import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Shield, Target, KeyRound, FlaskConical } from 'lucide-react'
import { getModule, getLesson } from '@/content/modules/registry'
import { allModules } from '@/content/modules/registry'

export async function generateStaticParams() {
  const params: { id: string; slug: string }[] = []
  for (const mod of allModules) {
    for (const lesson of mod.lessons) {
      params.push({ id: mod.id, slug: lesson.slug })
    }
  }
  return params
}

export default async function LessonPage({ params }: { params: { id: string; slug: string } }) {
  const mod = getModule(params.id)
  const lesson = mod ? getLesson(params.id, params.slug) : undefined

  if (!mod || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Lección no encontrada</p>
        <Link href={`/modulos/${params.id}`} className="ml-4 text-cyan-400">Volver</Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#0f172a] to-[#0a0e17]">
      <header className="border-b border-[#334155]/50 bg-[#0a0e17]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href={`/modulos/${params.id}/`}
            className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            {mod.title}
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-cyan-400" />
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>

        {lesson.objectives.length > 0 && (
          <div className="mb-8 p-5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
            <h3 className="flex items-center gap-2 font-semibold text-cyan-400 mb-3">
              <Target className="w-5 h-5" />
              Objetivos
            </h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {lesson.objectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}

        {lesson.keyPoints.length > 0 && (
          <div className="mb-8 p-5 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <h3 className="flex items-center gap-2 font-semibold text-amber-400 mb-3">
              <KeyRound className="w-5 h-5" />
              Puntos clave
            </h3>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {lesson.keyPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose prose-invert prose-cyan max-w-none mb-12">
          <h2 className="text-xl font-semibold text-slate-300 mb-4">Teoría</h2>
          <div className="rounded-xl bg-[#1a2234] p-6 border border-[#334155]/50">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                pre: ({ children }) => (
                  <pre className="overflow-x-auto rounded-lg bg-[#0a0e17] p-4 my-4 border border-[#334155]/50">
                    {children}
                  </pre>
                ),
                code: ({ className, children }) => {
                  const isBlock = className?.includes('language-')
                  if (isBlock) {
                    return (
                      <code className={className}>
                        {children}
                      </code>
                    )
                  }
                  return (
                    <code className="px-1.5 py-0.5 rounded bg-[#0a0e17] text-cyan-400 text-sm">
                      {children}
                    </code>
                  )
                }
              }}
            >
              {lesson.theory}
            </ReactMarkdown>
          </div>
        </div>

        {lesson.practice && (
          <div className="prose prose-invert prose-emerald max-w-none mb-12">
            <h2 className="text-xl font-semibold text-slate-300 mb-4">Práctica</h2>
            <div className="rounded-xl bg-[#1a2234] p-6 border border-[#334155]/50">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.practice}</ReactMarkdown>
            </div>
          </div>
        )}

        {lesson.codeExamples && lesson.codeExamples.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-slate-300 mb-4">Ejemplos de código</h2>
            <div className="space-y-6">
              {lesson.codeExamples.map((ex, i) => (
                <div key={i} className="rounded-xl bg-[#1a2234] border border-[#334155]/50 overflow-hidden">
                  <div className="px-4 py-2 bg-[#0a0e17] text-sm text-slate-400 border-b border-[#334155]/50">
                    {ex.title}
                  </div>
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="text-cyan-400/90">{ex.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {lesson.activity && (
          <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <h3 className="flex items-center gap-2 font-semibold text-emerald-400 mb-3">
              <FlaskConical className="w-5 h-5" />
              Actividad: {lesson.activity.title}
            </h3>
            <p className="text-slate-300 mb-4">{lesson.activity.objective}</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-300">
              {lesson.activity.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            {lesson.activity.labId && (
              <Link
                href={`/laboratorio/#${lesson.activity.labId}`}
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition"
              >
                <FlaskConical className="w-4 h-4" />
                Ir al laboratorio
              </Link>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
