import Link from 'next/link'
import { ArrowRight, BookOpen, FlaskConical, Map, Shield } from 'lucide-react'
import { allModules } from '@/content/modules/registry'

export const metadata = {
  title: 'Empieza aquí',
  description: 'Guía de inicio para alumnos del curso Puesta y Producción Segura',
}

export default function StartPage() {
  const totalLessons = allModules.reduce((a, m) => a + m.lessons.length, 0)

  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <div className="mb-14">
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tight">
          Empieza aquí
        </h1>
        <p className="text-lg text-[var(--text-muted)] leading-relaxed">
          Bienvenido al curso <strong className="text-white">Puesta y Producción Segura</strong>.
          Esta guía te ayudará a orientarte y sacar el máximo partido al material.
        </p>
      </div>

      <div className="space-y-6">
        <section className="p-6 lg:p-8 rounded-2xl bg-[var(--bg-card)]/60 border border-white/10 hover:border-[var(--accent)]/20 hover:bg-[var(--bg-card)]/80 transition-all">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Map className="h-5 w-5 text-[var(--accent)]" />
            Qué vas a aprender
          </h2>
          <p className="text-[var(--text)] mb-4">
            El curso cubre seguridad de aplicaciones web desde fundamentos hasta auditoría.
            Incluye <strong className="text-white">{allModules.length} módulos</strong> y{' '}
            <strong className="text-white">{totalLessons} lecciones</strong> con teoría,
            ejemplos y actividades prácticas.
          </p>
          <Link
            href="/syllabus"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:text-[var(--accent-bright)]"
          >
            Ver mapa curricular completo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="p-6 lg:p-8 rounded-2xl bg-[var(--bg-card)]/60 border border-white/10 hover:border-[var(--accent)]/20 hover:bg-[var(--bg-card)]/80 transition-all">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[var(--accent)]" />
            Ruta recomendada
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-[var(--text)]">
            <li>Lee la lección de <strong>Fundamentos</strong> (Módulo 1)</li>
            <li>Revisa el <strong>OWASP Top Ten</strong> (Módulo 1)</li>
            <li>Levanta los laboratorios con <code className="px-1.5 py-0.5 rounded bg-white/5 text-[var(--accent)] font-mono text-sm">docker compose up -d</code></li>
            <li>Sigue los módulos en orden, practicando en cada lab asociado</li>
          </ol>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mt-4 text-[var(--accent)] font-semibold hover:text-[var(--accent-bright)]"
          >
            Ir al curso
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="p-6 lg:p-8 rounded-2xl bg-[var(--bg-card)]/60 border border-white/10 hover:border-[var(--terminal)]/20 hover:bg-[var(--bg-card)]/80 transition-all">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-[var(--terminal)]" />
            Laboratorios
          </h2>
          <p className="text-[var(--text)] mb-4">
            Hay 2 entornos de práctica: <strong className="text-white">Lab SQL Injection</strong> y{' '}
            <strong className="text-white">DVWA</strong>. Necesitas Docker instalado.
          </p>
          <Link
            href="/labs/setup"
            className="inline-flex items-center gap-2 text-[var(--accent)] font-semibold hover:text-[var(--accent-bright)]"
          >
            Cómo usar los laboratorios
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>

        <section className="p-6 lg:p-8 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/25 hover:border-[var(--accent)]/35 transition-all">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-[var(--accent)]" />
            Uso responsable
          </h2>
          <p className="text-[var(--text)]">
            Este material es para <strong className="text-white">fines educativos</strong>.
            Los laboratorios contienen vulnerabilidades intencionales. Úsalos solo en entornos
            controlados y nunca contra sistemas sin autorización.
          </p>
          <Link
            href="/ethics"
            className="inline-flex items-center gap-2 mt-4 text-[var(--accent)] font-semibold hover:text-[var(--accent-bright)]"
          >
            Normas y ética
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}
