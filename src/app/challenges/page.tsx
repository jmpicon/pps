import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Trophy } from 'lucide-react'

export const metadata = {
  title: 'Retos',
  description: 'Desafíos y retos del curso Puesta y Producción Segura',
}

export default function ChallengesPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Retos' }]} />

      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        Retos
      </h1>

      <div className="space-y-6">
        <p className="text-[var(--text-muted)]">
          Los retos y desafíos estilo CTF se integrarán aquí cuando el profesor los proporcione.
        </p>

        <div className="p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-white/5">
          <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-[var(--accent)]" />
            TODO
          </h2>
          <p className="text-[var(--text-muted)] mb-4">
            <strong>Pendiente de contenido:</strong> Crear estructura en{' '}
            <code className="text-[var(--accent)]">content/challenges/</code> con retos por módulo.
          </p>
          <p className="text-sm text-[var(--text-dim)]">
            Sugerencia: cada reto puede tener un archivo MD con descripción, objetivo, pistas
            (colapsables) y criterios de validación.
          </p>
        </div>
      </div>
    </div>
  )
}
