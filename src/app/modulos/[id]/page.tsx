import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Bug, Key, Lock, Settings, Search, ArrowLeft, BookOpen } from 'lucide-react'
import { getModule } from '@/content/modules/registry'

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Módulo no encontrado</p>
        <Link href="/modulos" className="ml-4 text-cyan-400">Volver</Link>
      </div>
    )
  }

  const Icon = icons[mod.icon] || Shield

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#0f172a] to-[#0a0e17]">
      <header className="border-b border-[#334155]/50 bg-[#0a0e17]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/modulos" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition">
            <ArrowLeft className="w-5 h-5" />
            Volver a módulos
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Shield className="w-7 h-7 text-cyan-400" />
            PPS Plataforma
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Icon className="w-12 h-12" />
          </div>
          <div>
            <span className="text-sm text-cyan-400/80 font-mono">Módulo {mod.number}</span>
            <h1 className="text-3xl font-bold">{mod.title}</h1>
            <p className="text-slate-400">{mod.description}</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-slate-300">Lecciones</h2>
        <div className="grid gap-4">
          {mod.lessons.map((lesson, i) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/modulos/${mod.id}/lecciones/${lesson.slug}/`}>
                <div className="group p-5 rounded-xl bg-[#1a2234]/80 border border-[#334155]/50 hover:border-cyan-500/30 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-slate-700/50 text-slate-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium group-hover:text-cyan-400 transition">{lesson.title}</h3>
                      {lesson.activity && (
                        <span className="text-xs text-emerald-400/80 mt-1 inline-block">Incluye actividad práctica</span>
                      )}
                    </div>
                  </div>
                  <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
