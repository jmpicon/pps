'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Shield, Bug, Key, Lock, Settings, Search, BookOpen } from 'lucide-react'
import { MarkdownContent } from './MarkdownContent'
import type { Module, Lesson } from '@/content/modules/index'

const icons: Record<string, React.ElementType> = {
  shield: Shield,
  bug: Bug,
  key: Key,
  lock: Lock,
  settings: Settings,
  search: Search
}

interface ModuleCardProps {
  module: Module
}

function LessonItem({ lesson }: { lesson: Lesson }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-white/5 rounded-xl overflow-hidden bg-[var(--bg-card)]/50">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <BookOpen className="h-4 w-4 text-[var(--accent)] shrink-0" />
          <span className="font-medium text-white truncate">{lesson.title}</span>
        </div>
        {open ? (
          <ChevronUp className="h-5 w-5 text-[var(--text-muted)] shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-[var(--text-muted)] shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0 border-t border-white/5 space-y-5">
          {lesson.objectives.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--accent)] mb-2">Objetivos</h4>
              <ul className="space-y-1 text-sm text-[var(--text)]">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--accent)]">•</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {lesson.keyPoints.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-[var(--warning)] mb-2">Puntos clave</h4>
              <ul className="space-y-1 text-sm text-[var(--text)]">
                {lesson.keyPoints.map((point, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--warning)]">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Contenido teórico</h4>
            <div className="text-sm">
              <MarkdownContent content={lesson.theory} />
            </div>
          </div>
          {lesson.practice && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Práctica</h4>
              <div className="text-sm">
                <MarkdownContent content={lesson.practice} />
              </div>
            </div>
          )}
          {lesson.codeExamples && lesson.codeExamples.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Ejemplos de código</h4>
              <div className="space-y-3">
                {lesson.codeExamples.map((ex, i) => (
                  <div key={i} className="rounded-lg bg-[var(--bg-base)] p-4 border border-white/5 overflow-x-auto">
                    <div className="text-xs text-[var(--text-muted)] font-mono mb-2">{ex.title}</div>
                    <pre className="text-xs font-mono text-[var(--accent)]"><code>{ex.code}</code></pre>
                  </div>
                ))}
              </div>
            </div>
          )}
          {lesson.activity && (
            <div className="p-4 rounded-xl bg-[var(--terminal)]/10 border border-[var(--terminal)]/20">
              <h4 className="text-sm font-semibold text-[var(--terminal)] mb-2">
                Actividad: {lesson.activity.title}
              </h4>
              <p className="text-sm text-[var(--text)] mb-3">{lesson.activity.objective}</p>
              <ol className="space-y-1 mb-3">
                {lesson.activity.steps.map((step, i) => (
                  <li key={i} className="flex gap-2 text-sm">
                    <span className="font-mono text-[var(--terminal)]">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
              {lesson.activity.labId && (
                <a
                  href={`#lab-${lesson.activity.labId}`}
                  className="text-sm font-medium text-[var(--terminal)] hover:underline"
                >
                  → Ir al laboratorio
                </a>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ModuleCard({ module }: ModuleCardProps) {
  const [expanded, setExpanded] = useState(false)
  const Icon = icons[module.icon] || Shield

  return (
    <div className="rounded-2xl border border-white/10 bg-[var(--bg-card)]/60 backdrop-blur overflow-hidden hover:border-[var(--accent)]/40 hover:bg-[var(--bg-card)]/80 transition-all duration-300 shadow-lg hover:shadow-[0_8px_40px_-12px_rgba(34,211,238,0.15)]">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 text-left group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 text-[var(--accent)] group-hover:from-[var(--accent)]/30 group-hover:to-[var(--accent)]/10 transition-all">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <span className="text-xs font-bold text-[var(--accent)] uppercase tracking-wider">Módulo {module.number}</span>
              <h3 className="text-lg font-bold text-white mt-1 group-hover:text-[var(--accent)] transition-colors">
                {module.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-1">{module.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-medium text-[var(--text-dim)] bg-white/5 px-2 py-1 rounded-lg">
              {module.lessons.length} lecciones
            </span>
            {expanded ? (
              <ChevronUp className="h-6 w-6 text-[var(--accent)]" />
            ) : (
              <ChevronDown className="h-6 w-6 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
            )}
          </div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-white/5">
              <div className="space-y-3 mt-4">
                {module.lessons.map((lesson) => (
                  <LessonItem key={lesson.id} lesson={lesson} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
