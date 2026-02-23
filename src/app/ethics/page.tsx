import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Normas y ética',
  description: 'Uso responsable del material y laboratorios de ciberseguridad',
}

export default function EthicsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Normas y ética' }]} />

      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        Normas y ética
      </h1>

      <div className="space-y-6">
        <div className="p-6 rounded-2xl bg-[var(--warning)]/10 border border-[var(--warning)]/20">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-[var(--warning)]" />
            Uso responsable
          </h2>
          <p className="text-[var(--text)]">
            Este material es para <strong className="text-white">fines educativos</strong>.
            Los laboratorios contienen vulnerabilidades intencionales. Úsalos solo en entornos
            locales y controlados. Nunca ejecutes estas aplicaciones expuestas a internet.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Requisitos</h2>
          <ul className="list-disc list-inside space-y-2 text-[var(--text)]">
            <li>Usar los laboratorios solo en tu entorno local</li>
            <li>No atacar sistemas sin autorización explícita</li>
            <li>Cumplir la legislación vigente en materia de ciberseguridad</li>
          </ul>
        </section>

        <section className="p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-3">TODO</h2>
          <p className="text-[var(--text-muted)]">
            Pendiente de contenido: el profesor José Picón puede añadir una sección de normas
            académicas, ética hacker y código de conducta. Sugerencia: crear archivo{' '}
            <code className="text-[var(--accent)]">content/ethics.md</code> con el texto completo.
          </p>
        </section>
      </div>
    </div>
  )
}
