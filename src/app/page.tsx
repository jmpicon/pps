'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Terminal, BookOpen, FlaskConical, ArrowRight, Sparkles,
  Copy, Check, Shield, Zap, Target, Users, ChevronRight,
  Lock, Bug, Key, Settings, Search as SearchIcon, Award,
  Play, ExternalLink
} from 'lucide-react'
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
      "Probar bypass: usuario ' OR '1'='1' #",
      'Cambiar a modo seguro con ?secure=1'
    ],
    vulns: ['Bypass autenticación', 'Extracción de credenciales']
  },
  {
    id: 'dvwa',
    name: 'DVWA',
    module: 'General',
    desc: 'Damn Vulnerable Web App — SQLi, XSS, CSRF, LFI, RCE',
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

const features = [
  {
    icon: BookOpen,
    color: 'var(--accent)',
    bg: 'rgba(34,211,238,0.1)',
    border: 'rgba(34,211,238,0.2)',
    title: 'Contenido estructurado',
    desc: 'Módulos progresivos desde fundamentos hasta auditoría avanzada. Teoría, ejemplos y código real.'
  },
  {
    icon: FlaskConical,
    color: 'var(--terminal)',
    bg: 'rgba(45,212,191,0.1)',
    border: 'rgba(45,212,191,0.2)',
    title: 'Labs interactivos',
    desc: 'Entornos Docker preconfigurados con vulnerabilidades reales para practicar en local.'
  },
  {
    icon: Target,
    color: 'var(--violet)',
    bg: 'rgba(167,139,250,0.1)',
    border: 'rgba(167,139,250,0.2)',
    title: 'OWASP Top Ten',
    desc: 'Cada lección cubre vulnerabilidades del estándar más reconocido en seguridad web.'
  },
  {
    icon: Zap,
    color: 'var(--warning)',
    bg: 'rgba(251,191,36,0.1)',
    border: 'rgba(251,191,36,0.2)',
    title: 'Seguimiento de progreso',
    desc: 'Tu avance se guarda automáticamente. Continúa donde lo dejaste en cada módulo.'
  },
]

const moduleIcons: Record<string, React.ElementType> = {
  shield: Shield, bug: Bug, key: Key,
  lock: Lock, settings: Settings, search: SearchIcon
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
}
const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } }
}

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

      {/* ── Hero ──────────────────────────────────────────────── */}
      <header className="relative overflow-hidden border-b border-white/5">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-circuit opacity-60" />

        {/* Orbs */}
        <div className="orb orb-cyan w-[600px] h-[600px] -top-64 -right-64 opacity-60" />
        <div className="orb orb-violet w-[400px] h-[400px] -bottom-32 -left-32 opacity-50" />
        <div className="orb orb-teal w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-base)]/20 via-transparent to-[var(--bg-base)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-14 pb-16 lg:pt-20 lg:pb-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12"
          >
            {/* Left: text */}
            <div className="flex-1 max-w-2xl">
              <motion.div variants={itemVariants}>
                <div className="badge badge-cyan mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  Curso profesional · José Picón
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]"
              >
                Puesta y{' '}
                <span className="gradient-text">Producción</span>
                <br />
                <span className="gradient-text-cyan">Segura</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-[var(--text-muted)] max-w-xl mb-8 leading-relaxed"
              >
                Domina la ciberseguridad web desde cero: OWASP Top Ten,
                laboratorios Docker y técnicas de hardening aplicadas al mundo real.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                <Link href="/start" className="btn-primary">
                  Empieza aquí
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <button
                  type="button"
                  onClick={copyCommand}
                  className="btn-secondary font-mono text-sm"
                  title="Copiar comando Docker"
                >
                  <Terminal className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <span>docker compose up -d</span>
                  <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                    {copied
                      ? <Check className="h-4 w-4 text-[var(--success)]" />
                      : <Copy className="h-4 w-4 opacity-60" />
                    }
                  </span>
                </button>
              </motion.div>

              {/* Quick links */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 mt-8 flex-wrap">
                {[
                  { href: '/syllabus', label: 'Mapa curricular' },
                  { href: '/laboratorio', label: 'Laboratorios' },
                  { href: '/resources', label: 'Recursos' },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="flex items-center gap-1.5 text-sm text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                    {l.label}
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* Right: stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-3 lg:gap-4 shrink-0"
            >
              {[
                { value: allModules.length, label: 'Módulos', sub: 'de contenido', color: 'var(--accent)', icon: BookOpen },
                { value: totalLessons, label: 'Lecciones', sub: 'teórico-prácticas', color: 'var(--terminal)', icon: Play },
                { value: 2, label: 'Labs', sub: 'Docker listos', color: 'var(--violet)', icon: FlaskConical },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="stat-card group cursor-default"
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl mx-auto mb-3 transition-all group-hover:scale-110"
                      style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: stat.color }} />
                    </div>
                    <div className="text-3xl font-black counter-glow" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-white mt-0.5">{stat.label}</div>
                    <div className="text-xs text-[var(--text-dim)] mt-0.5">{stat.sub}</div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="border-b border-white/5 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="badge badge-violet mb-4">
                <Zap className="h-3.5 w-3.5" />
                ¿Por qué PPS Academy?
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-white mb-3">
                Formación práctica y sin barreras
              </h2>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
                Todo lo que necesitas para aprender ciberseguridad aplicada, desde teoría OWASP hasta explotar vulnerabilidades reales.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <ScrollReveal key={f.title} delay={i * 0.08}>
                  <div
                    className="group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-default"
                    style={{ background: f.bg, borderColor: f.border }}
                  >
                    <div
                      className="feature-icon mb-4 transition-transform group-hover:scale-110"
                      style={{ background: `${f.color}18`, border: `1px solid ${f.color}30` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: f.color }} />
                    </div>
                    <h3 className="font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Modules ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-14 lg:py-20">
        <section className="mb-20">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <div className="badge badge-cyan mb-3">
                  <BookOpen className="h-3.5 w-3.5" />
                  Plan de estudios
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">
                  Módulos del curso
                </h2>
                <p className="text-[var(--text-muted)]">
                  Haz clic en cada módulo para expandir y ver las lecciones.
                </p>
              </div>
              <Link
                href="/syllabus"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-bright)] transition-colors shrink-0"
              >
                Ver mapa completo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allModules.map((mod, i) => (
              <ScrollReveal key={mod.id} delay={i * 0.05}>
                <ModuleCard module={mod} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── Labs ────────────────────────────────────────────── */}
        <section className="mb-20">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <div className="badge badge-success mb-3">
                  <FlaskConical className="h-3.5 w-3.5" />
                  Práctica real
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">
                  Laboratorios prácticos
                </h2>
                <p className="text-[var(--text-muted)]">
                  Entornos vulnerables en Docker. Ejecuta{' '}
                  <code className="px-1.5 py-0.5 rounded-md bg-white/5 text-[var(--accent)] font-mono text-sm border border-white/5">
                    docker compose up -d
                  </code>{' '}
                  para iniciar.
                </p>
              </div>
              <Link
                href="/laboratorio"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--terminal)] hover:text-[var(--accent-bright)] transition-colors shrink-0"
              >
                Ver todos los labs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {labs.map((lab, i) => (
              <ScrollReveal key={lab.id} delay={i * 0.1}>
                <LabCard lab={lab} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────── */}
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--accent)]/20 bg-gradient-to-br from-[var(--accent)]/8 via-[var(--bg-elevated)] to-[var(--violet)]/8 p-10 lg:p-14 text-center">
            {/* Orbs inside CTA */}
            <div className="orb orb-cyan w-72 h-72 -top-20 -right-20 opacity-40" />
            <div className="orb orb-violet w-56 h-56 -bottom-16 -left-16 opacity-35" />

            <div className="relative">
              <div className="badge badge-cyan mx-auto mb-5">
                <Award className="h-3.5 w-3.5" />
                ¿Listo para empezar?
              </div>
              <h2 className="text-2xl lg:text-4xl font-black text-white mb-4">
                Convierte el conocimiento en habilidad
              </h2>
              <p className="text-[var(--text-muted)] max-w-xl mx-auto mb-8 leading-relaxed">
                Sigue la ruta de aprendizaje, practica en los labs y domina
                las vulnerabilidades que atacan el 90% de las aplicaciones web.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link href="/start" className="btn-primary">
                  <Play className="h-4 w-4" />
                  Comenzar el curso
                </Link>
                <Link href="/syllabus" className="btn-secondary">
                  <BookOpen className="h-4 w-4" />
                  Ver mapa curricular
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </div>
  )
}
