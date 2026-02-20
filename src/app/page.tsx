'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Bug, Key, Lock, Settings, Search, BookOpen, FlaskConical } from 'lucide-react'
import { allModules } from '@/content/modules/registry'

const icons: Record<string, React.ElementType> = {
  shield: Shield,
  bug: Bug,
  key: Key,
  lock: Lock,
  settings: Settings,
  search: Search
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#0f172a] to-[#0a0e17]">
      {/* Header */}
      <header className="border-b border-[#334155]/50 bg-[#0a0e17]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Shield className="w-7 h-7 text-cyan-400" />
            <span>PPS Plataforma</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/laboratorio" className="text-slate-400 hover:text-cyan-400 transition flex items-center gap-2">
              <FlaskConical className="w-4 h-4" />
              Laboratorio
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Puesta y Producción Segura
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Plataforma interactiva de estudio. Teoría, práctica y laboratorios para dominar la seguridad en aplicaciones web.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/modulos"
              className="px-8 py-4 bg-cyan-500/20 text-cyan-400 rounded-xl font-medium hover:bg-cyan-500/30 transition border border-cyan-500/30 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Comenzar a estudiar
            </Link>
            <Link
              href="/laboratorio"
              className="px-8 py-4 bg-emerald-500/20 text-emerald-400 rounded-xl font-medium hover:bg-emerald-500/30 transition border border-emerald-500/30 flex items-center gap-2"
            >
              <FlaskConical className="w-5 h-5" />
              Ir al Laboratorio
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Modules Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-semibold mb-8 text-slate-300">Módulos del curso</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allModules.map((mod, i) => {
            const Icon = icons[mod.icon] || Shield
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/modulos/${mod.id}`}>
                  <div className="group p-6 rounded-2xl bg-[#1a2234]/80 border border-[#334155]/50 hover:border-cyan-500/30 hover:bg-[#1a2234] transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 transition">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-sm text-cyan-400/80 font-mono">Módulo {mod.number}</span>
                        <h3 className="text-lg font-semibold mt-1 group-hover:text-cyan-400 transition">{mod.title}</h3>
                        <p className="text-sm text-slate-500 mt-2">{mod.description}</p>
                        <span className="inline-block mt-3 text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition">
                          Ver contenido →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#334155]/50 py-8 text-center text-slate-500 text-sm">
        <p>Plataforma de Estudio PPS · Curso de Puesta y Producción Segura</p>
      </footer>
    </div>
  )
}
