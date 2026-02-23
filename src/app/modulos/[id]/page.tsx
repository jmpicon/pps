import Link from 'next/link'
import { Shield, Bug, Key, Lock, Settings, Search, BookOpen, ArrowRight } from 'lucide-react'
import { getModule } from '@/content/modules/registry'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const mod = getModule(params.id)
  if (!mod) return { title: 'Módulo no encontrado' }
  return {
    title: mod.title,
    description: mod.description,
  }
}

const icons: Record<string, React.ElementType> = {
  shield: Shield,
  bug: Bug,
  key: Key,
  lock: Lock,
  settings: Settings,
  search: Search
}

export async function generateStaticParams() {
  return [
    { id: 'modulo-1' },
    { id: 'modulo-2' },
    { id: 'modulo-3' },
    { id: 'modulo-4' },
    { id: 'modulo-5' },
    { id: 'modulo-6' }
  ]
}

export default async function ModuleDetailPage({ params }: { params: { id: string } }) {
  const mod = getModule(params.id)

  if (!mod) {
    return (
      <div className="p-12 text-center max-w-md mx-auto">
        <p className="text-[var(--text-muted)]">Módulo no encontrado</p>
        <Link href="/modulos" className="mt-4 inline-block text-[var(--accent)] font-semibold hover:text-[var(--accent-bright)]">
          Volver a módulos
        </Link>
      </div>
    )
  }

  const Icon = icons[mod.icon] || Shield

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs
        items={[
          { label: 'Módulos', href: '/modulos' },
          { label: mod.title },
        ]}
      />

      <div className="flex items-start gap-8 mb-14">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <span className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider">Módulo {mod.number}</span>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mt-2">{mod.title}</h1>
          <p className="text-[var(--text-muted)] mt-3 text-lg leading-relaxed">{mod.description}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xs font-bold text-[var(--text-dim)] uppercase tracking-widest mb-6">
          Lecciones ({mod.lessons.length})
        </h2>
        <div className="space-y-3">
          {mod.lessons.map((lesson) => (
            <Link key={lesson.id} href={`/modulos/${mod.id}/lecciones/${lesson.slug}`}>
              <div className="group flex items-center gap-5 p-5 rounded-2xl bg-[var(--bg-card)]/80 backdrop-blur border border-white/5 hover:border-[var(--accent)]/25 hover:bg-[var(--bg-card)] transition-all duration-300">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[var(--text-muted)] group-hover:bg-[var(--accent)]/15 group-hover:text-[var(--accent)] transition-all">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white group-hover:text-[var(--accent)] transition-colors text-lg">{lesson.title}</h3>
                  {lesson.activity && (
                    <span className="text-sm text-[var(--terminal)] mt-1 inline-block font-medium">Incluye práctica</span>
                  )}
                </div>
                <ArrowRight className="h-5 w-5 text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
