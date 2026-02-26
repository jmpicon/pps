import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Shield, User, BookOpen, Target, FlaskConical, Award, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { allModules } from '@/content/modules/registry'

export const metadata = {
  title: 'Sobre el curso',
  description: 'Información sobre PPS Academy y el curso Puesta y Producción Segura',
}

const highlights = [
  { icon: BookOpen, color: 'var(--accent)',   label: 'Módulos',   value: '6', desc: 'de contenido' },
  { icon: Zap,      color: 'var(--terminal)', label: 'Lecciones', value: '50+', desc: 'teórico-prácticas' },
  { icon: FlaskConical, color: 'var(--violet)', label: 'Labs',   value: '2', desc: 'entornos Docker' },
  { icon: Award,    color: 'var(--warning)',   label: 'Nivel',    value: '0→Pro', desc: 'sin requisitos previos' },
]

const topics = [
  { mod: 1, title: 'Introducción a la seguridad web', desc: 'Fundamentos, OWASP Top Ten, normativas y marcos de referencia.' },
  { mod: 2, title: 'Vulnerabilidades de entrada',      desc: 'SQLi, XSS, CSRF, RCE, SSRF, XXE, LFI/RFI — explotación y mitigación.' },
  { mod: 3, title: 'Autenticación y sesiones',         desc: 'Broken Authentication, JWT, OAuth 2.0 y gestión segura de sesiones.' },
  { mod: 4, title: 'Protección de datos',              desc: 'TLS/SSL, cifrado AES, RBAC, ABAC y principio de mínimo privilegio.' },
  { mod: 5, title: 'Configuración segura',             desc: 'Security Headers, CSP, HSTS, logging y gestión de secretos.' },
  { mod: 6, title: 'Seguridad en dependencias',        desc: 'SAST, DAST, SCA, Dependency-Check, OWASP ZAP y CI/CD seguro.' },
]

export default function AboutPage() {
  const totalLessons = allModules.reduce((a, m) => a + m.lessons.length, 0)

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Sobre el curso' }]} />

      {/* Header */}
      <div className="mb-10">
        <div className="badge badge-cyan mb-4">
          <Shield className="h-3.5 w-3.5" />
          PPS Academy
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">
          Sobre el curso
        </h1>
        <p className="text-[var(--text-muted)] text-lg leading-relaxed">
          <strong className="text-white">Puesta y Producción Segura</strong> es un curso de
          ciberseguridad aplicada diseñado para llevar a cualquier estudiante desde los fundamentos
          hasta un nivel profesional con experiencia práctica real.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {highlights.map((h) => {
          const Icon = h.icon
          return (
            <div key={h.label} className="stat-card group cursor-default">
              <div
                className="feature-icon mx-auto mb-3 transition-transform group-hover:scale-110"
                style={{ background: `${h.color}15`, border: `1px solid ${h.color}25`, width: 44, height: 44, borderRadius: 12 }}
              >
                <Icon className="h-5 w-5" style={{ color: h.color }} />
              </div>
              <div className="text-2xl font-black counter-glow" style={{ color: h.color }}>{h.value}</div>
              <div className="text-sm font-semibold text-white mt-0.5">{h.label}</div>
              <div className="text-xs text-[var(--text-dim)] mt-0.5">{h.desc}</div>
            </div>
          )
        })}
      </div>

      {/* Description */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-[var(--accent)]" />
          ¿Qué es este curso?
        </h2>
        <div className="space-y-3 text-[var(--text)] leading-relaxed">
          <p>
            PPS Academy es una plataforma educativa que combina teoría estructurada con práctica
            en entornos Docker reales. El contenido sigue el estándar OWASP y cubre las
            vulnerabilidades más críticas de las aplicaciones web modernas.
          </p>
          <p>
            Cada módulo incluye lecciones con explicaciones técnicas, ejemplos de código,
            actividades guiadas y laboratorios interactivos donde puedes explotar
            vulnerabilidades en entornos seguros y controlados.
          </p>
        </div>
      </section>

      {/* Topics */}
      <section className="mb-12">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[var(--accent)]" />
          Contenido del programa
        </h2>
        <div className="space-y-3">
          {topics.map((t) => (
            <Link
              key={t.mod}
              href={`/modulos/modulo${t.mod}`}
              className="block p-4 rounded-xl bg-[var(--bg-card)]/60 border border-white/5 hover:border-[var(--accent)]/25 hover:bg-[var(--bg-card)]/80 transition-all group"
            >
              <div className="flex items-start gap-4">
                <span className="module-badge shrink-0 mt-0.5">{t.mod}</span>
                <div>
                  <h3 className="font-semibold text-white text-sm group-hover:text-[var(--accent)] transition-colors mb-0.5">{t.title}</h3>
                  <p className="text-xs text-[var(--text-muted)]">{t.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-[var(--text-dim)] shrink-0 mt-0.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Author */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
          <User className="h-5 w-5 text-[var(--accent)]" />
          Autor
        </h2>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--accent)]/8 to-[var(--terminal)]/5 border border-[var(--accent)]/18">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--terminal)] text-[var(--bg-base)]">
              <User className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">José Picón</h3>
              <p className="text-sm text-[var(--accent)] font-medium">Profesor · Autor del material</p>
            </div>
          </div>
          <p className="text-[var(--text)] leading-relaxed text-sm">
            Autor y diseñador del programa formativo. El material ha sido creado para
            proporcionar una base sólida en ciberseguridad web, con especial énfasis en
            la comprensión profunda de las vulnerabilidades y las técnicas de defensa
            aplicadas a entornos de producción reales.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)]/60 border border-white/6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-white mb-1">¿Listo para empezar?</h3>
          <p className="text-sm text-[var(--text-muted)]">Sigue la ruta recomendada y comienza desde el principio.</p>
        </div>
        <Link href="/start" className="btn-primary shrink-0">
          Empieza aquí
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
