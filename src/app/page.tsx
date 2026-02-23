'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Terminal, BookOpen, FlaskConical, ArrowRight, Sparkles, Copy, Check } from 'lucide-react'
import { allModules } from '@/content/modules/registry'
import { ModuleCard } from '@/components/ModuleCard'
import { LabCard } from '@/components/LabCard'
import { ScrollReveal } from '@/components/ScrollReveal'

const labs = [
  {
    id: 'lab-sqli',
    name: 'SQL Injection',
    module: 'Módulo 2',
    desc: 'Explotar y mitigar inyección SQL con Apache, PHP y MySQL',
    port: 8081,
    credentials: 'admin / admin123',
    steps: [
      'Iniciar contenedores: docker compose up -d',
      'Abrir http://localhost:8081',
      'Probar bypass: usuario \' OR \'1\'=\'1\' #',
      'Cambiar a modo seguro con ?secure=1'
    ],
    vulns: ['Bypass autenticación', 'Extracción de credenciales']
  },
  {
    id: 'dvwa',
    name: 'DVWA',
    module: 'General',
    desc: 'Damn Vulnerable Web App - SQLi, XSS, CSRF, LFI, RCE',
    port: 4280,
    credentials: 'admin / password',
    steps: [
      'Abrir http://localhost:4280',
      'Login con admin / password',
      'Configurar seguridad en "DVWA Security"',
      'Explorar cada vulnerabilidad por sección'
    ],
    vulns: ['SQL Injection', 'XSS', 'CSRF', 'LFI', 'RCE', 'File Upload']
  }
]

export default function HomePage() {
  const totalLessons = allModules.reduce((a, m) => a + m.lessons.length, 0)
  const [copied, setCopied] = useState(false)

  const copyCommand = () => {
    navigator.clipboard.writeText('docker compose up -d')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 via-transparent to-[var(--terminal)]/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--terminal)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Curso profesional · José Picón
              </div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight mb-4">
                Puesta y Producción{' '}
                <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--terminal)] bg-clip-text text-transparent">
                  Segura
                </span>
              </h1>
              <p className="text-lg text-[var(--text-muted)] max-w-xl mb-8 leading-relaxed">
                Aprende ciberseguridad web desde cero: OWASP Top Ten, laboratorios prácticos y técnicas de hardening.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg-base)] font-bold text-sm hover:bg-[var(--accent-bright)] transition-all shadow-[0_0_30px_-8px_var(--accent)] hover:shadow-[0_0_40px_-8px_var(--accent)]"
                >
                  Empieza aquí
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={copyCommand}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-[var(--text-muted)] hover:bg-white/10 hover:border-[var(--accent)]/30 transition-all group"
                  title="Copiar comando"
                >
                  <Terminal className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <span>docker compose up -d</span>
                  <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                    {copied ? <Check className="h-4 w-4 text-[var(--success)]" /> : <Copy className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </span>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 lg:gap-6">
              {[
                { value: allModules.length, label: 'Módulos', color: 'var(--accent)' },
                { value: totalLessons, label: 'Lecciones', color: 'var(--terminal)' },
                { value: 2, label: 'Labs', color: 'var(--success)' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 cursor-default transition-colors"
                >
                  <span className="text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-[var(--accent)]" />
            Módulos del curso
          </h2>
          <p className="text-[var(--text-muted)] mb-10">
            Haz clic en cada módulo para expandir y ver las lecciones.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allModules.map((mod, i) => (
              <ScrollReveal key={mod.id} delay={i * 0.05}>
                <ModuleCard module={mod} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-[var(--terminal)]" />
            Laboratorios prácticos
          </h2>
          <p className="text-[var(--text-muted)] mb-10">
            Entornos vulnerables para practicar. Ejecuta{' '}
            <code className="px-2 py-1 rounded-lg bg-white/5 text-[var(--accent)] font-mono text-sm border border-white/5">
              docker compose up -d
            </code>{' '}
            para iniciar.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {labs.map((lab, i) => (
              <ScrollReveal key={lab.id} delay={0.2 + i * 0.05}>
                <LabCard lab={lab} />
              </ScrollReveal>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
