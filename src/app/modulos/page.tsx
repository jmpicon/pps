'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Bug, Key, Lock, Settings, Search, ArrowLeft } from 'lucide-react'
import { allModules } from '@/content/modules/registry'

const icons: Record<string, React.ElementType> = {
  shield: Shield,
  bug: Bug,
  key: Key,
  lock: Lock,
  settings: Settings,
  search: Search
}

export default function ModulosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#0f172a] to-[#0a0e17]">
      <header className="border-b border-[#334155]/50 bg-[#0a0e17]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition">
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Shield className="w-7 h-7 text-cyan-400" />
            PPS Plataforma
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Módulos del curso</h1>
        <p className="text-slate-400 mb-12">Selecciona un módulo para acceder al contenido teórico y práctico</p>

        <div className="space-y-6">
          {allModules.map((mod, i) => {
            const Icon = icons[mod.icon] || Shield
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/modulos/${mod.id}/`}>
                  <div className="group p-6 rounded-2xl bg-[#1a2234]/80 border border-[#334155]/50 hover:border-cyan-500/30 transition-all flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-sm text-cyan-400/80 font-mono">Módulo {mod.number}</span>
                        <h2 className="text-xl font-semibold group-hover:text-cyan-400 transition">{mod.title}</h2>
                        <p className="text-slate-500">{mod.description}</p>
                      </div>
                    </div>
                    <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition">→</span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
