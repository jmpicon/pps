import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Shield, User } from 'lucide-react'

export const metadata = {
  title: 'Sobre el curso',
  description: 'Información sobre el curso Puesta y Producción Segura y el profesor José Picón',
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Sobre el curso' }]} />

      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-8">
        Sobre el curso
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-[var(--accent)]" />
            Puesta y Producción Segura
          </h2>
          <p className="text-[var(--text)] leading-relaxed">
            Curso de ciberseguridad aplicada centrado en aplicaciones web. Cubre OWASP Top Ten,
            vulnerabilidades reales, mitigaciones y laboratorios prácticos. El material está
            diseñado para que los alumnos aprendan desde cero hasta un nivel profesional.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-[var(--accent)]" />
            Autor
          </h2>
          <p className="text-[var(--text)] leading-relaxed">
            <strong className="text-white">José Picón</strong> — Profesor y autor del material.
            Este curso es material docente para alumnos y práctica educativa.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-3">Uso</h2>
          <p className="text-[var(--text-muted)]">
            Material para fines educativos. Los laboratorios contienen vulnerabilidades
            intencionales. Úsalos solo en entornos controlados.
          </p>
        </section>
      </div>
    </div>
  )
}
