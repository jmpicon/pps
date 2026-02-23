'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FlaskConical, Terminal, Play, CheckCircle2, AlertCircle, ListChecks } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'

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

export default function LaboratorioPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <div className="mb-8">
        <Breadcrumbs items={[{ label: 'Estudio', href: '/' }, { label: 'Laboratorio' }]} />
      </div>
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--terminal)]/15 border border-[var(--terminal)]/30 text-[var(--terminal)] text-sm font-semibold mb-6">
          <FlaskConical className="h-4 w-4" />
          Laboratorio de prácticas
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Entornos de explotación</h1>
        <p className="text-[var(--text-muted)] text-lg">
          Aplicaciones vulnerables intencionalmente para practicar técnicas de seguridad
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 rounded-2xl border-2 border-[var(--accent)]/30 bg-[var(--bg-card)]/80 backdrop-blur overflow-hidden"
      >
        <div className="flex items-center gap-2 px-5 py-4 bg-[var(--bg-elevated)] border-b border-white/5">
          <Terminal className="h-5 w-5 text-[var(--accent)]" />
          <span className="text-sm font-mono font-semibold text-[var(--text-muted)]">Iniciar todos los laboratorios</span>
        </div>
        <div className="p-6 font-mono text-sm">
          <div className="text-[var(--text-dim)] mb-2"># Ejecutar en tu terminal:</div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--accent)]">$</span>
            <code className="text-[var(--accent-bright)] font-semibold">docker compose up -d</code>
          </div>
          <div className="text-[var(--text-dim)] mt-4 text-xs">
            Levanta: Plataforma (3002), Lab SQLi (8081), DVWA (4280)
          </div>
        </div>
      </motion.div>

      <div className="space-y-6">
        {labs.map((lab, i) => {
          const labUrl = typeof window !== 'undefined'
            ? `${window.location.protocol}//${window.location.hostname}:${lab.port}/`
            : `http://localhost:${lab.port}/`
          return (
            <motion.div
              key={lab.id}
              id={lab.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-[var(--bg-card)]/80 backdrop-blur overflow-hidden scroll-mt-8 hover:border-[var(--accent)]/25 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="text-sm font-semibold text-[var(--accent)]">{lab.module}</span>
                      <h2 className="text-2xl font-bold text-white mt-1">{lab.name}</h2>
                      <p className="text-[var(--text-muted)] mt-2 text-lg">{lab.desc}</p>
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-xs text-[var(--text-dim)] font-mono">Login:</span>
                        <code className="text-sm bg-[var(--bg-base)] px-3 py-1.5 rounded-lg text-[var(--accent)] border border-white/5 font-mono">
                          {lab.credentials}
                        </code>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/labs/${lab.id}`}
                        className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-[var(--accent)]/15 hover:border-[var(--accent)]/30 transition-all"
                      >
                        <ListChecks className="h-5 w-5" />
                        Modo lab guiado
                      </Link>
                      <a
                        href={labUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--accent)] text-[var(--bg-base)] font-bold hover:bg-[var(--accent-bright)] transition-all shadow-[0_0_30px_-8px_var(--accent)] hover:scale-105 active:scale-95"
                      >
                        <Play className="h-5 w-5" />
                        Abrir lab
                      </a>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {lab.vulns.map((v) => (
                      <span key={v} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--danger)]/15 text-[var(--danger)] text-sm font-semibold border border-[var(--danger)]/20">
                        <AlertCircle className="h-3.5 w-3.5" />
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:w-80 border-t lg:border-t-0 lg:border-l border-white/5 p-6 bg-[var(--bg-elevated)]/50">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                    Pasos
                  </h3>
                  <ol className="space-y-3">
                    {lab.steps.map((step, j) => (
                      <li key={j} className="flex gap-3 text-sm text-[var(--text-muted)]">
                        <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-bold font-mono">
                          {j + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-16">
        <h2 className="text-xl font-bold text-white mb-4">Temario de laboratorios</h2>
        <p className="text-[var(--text-muted)] mb-6">
          Ejercicios prácticos con guías detalladas en cada lección del curso
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'SQL Injection', 'XSS', 'CSRF', 'RCE', 'SSRF', 'XXE',
            'LFI', 'RFI', 'Deserialization', 'Broken Auth', 'Sesiones',
            'JWT', 'OAuth', 'TLS', 'AES', 'RBAC', 'ABAC',
            'CSP', 'HSTS', 'Misconfiguration', 'Logging', 'SAST', 'DAST', 'ZAP'
          ].map((name, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[var(--bg-card)]/60 backdrop-blur border border-white/5 text-[var(--text)] font-medium hover:border-[var(--accent)]/20 hover:bg-[var(--bg-card)]/80 transition-all duration-300"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
