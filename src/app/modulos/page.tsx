'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Bug, Key, Lock, Settings, Search, ArrowRight } from 'lucide-react'
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
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <div className="mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Plan de estudios</h1>
        <p className="text-[var(--text-muted)] text-lg">
          {allModules.length} módulos · {allModules.reduce((a, m) => a + m.lessons.length, 0)} lecciones
        </p>
      </div>

      <div className="space-y-4">
        {allModules.map((mod, i) => {
          const Icon = icons[mod.icon] || Shield
          return (
            <motion.div
              key={mod.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link href={`/modulos/${mod.id}`}>
                <div className="group flex items-center gap-6 p-6 rounded-2xl bg-[var(--bg-card)]/80 backdrop-blur border border-white/5 hover:border-[var(--accent)]/30 transition-all duration-300">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent)]/15 text-[var(--accent)] group-hover:bg-[var(--accent)]/25 group-hover:scale-105 transition-all">
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-[var(--accent)]">Módulo {mod.number}</span>
                    <h2 className="text-xl font-bold text-white mt-1 group-hover:text-[var(--accent)] transition-colors">
                      {mod.title}
                    </h2>
                    <p className="text-[var(--text-muted)] mt-1">{mod.description}</p>
                  </div>
                  <ArrowRight className="h-6 w-6 text-[var(--text-dim)] group-hover:text-[var(--accent)] group-hover:translate-x-2 transition-all shrink-0" />
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
