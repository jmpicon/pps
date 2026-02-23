import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { Callout } from '@/components/Callout'
import { Terminal, Box } from 'lucide-react'

export const metadata = {
  title: 'Cómo usar los laboratorios',
  description: 'Guía de configuración y uso de los laboratorios del curso PPS',
}

export default function LabsSetupPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs
        items={[
          { label: 'Laboratorios', href: '/laboratorio' },
          { label: 'Setup' },
        ]}
      />

      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        Cómo usar los laboratorios
      </h1>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Box className="h-5 w-5 text-[var(--accent)]" />
            Requisitos
          </h2>
          <ul className="list-disc list-inside space-y-2 text-[var(--text)]">
            <li>Docker y Docker Compose instalados</li>
            <li>Puertos 8081 y 4280 libres (o configurar en docker-compose)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Terminal className="h-5 w-5 text-[var(--accent)]" />
            Iniciar todos los laboratorios
          </h2>
          <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-white/5 font-mono text-sm">
            <div className="text-[var(--text-dim)] mb-2"># En la raíz del proyecto:</div>
            <code className="text-[var(--accent)]">docker compose up -d</code>
          </div>
          <p className="mt-4 text-[var(--text-muted)]">
            Esto levanta la plataforma (3002), Lab SQLi (8081) y DVWA (4280).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Solo laboratorios</h2>
          <p className="text-[var(--text)] mb-4">
            Si ya tienes la plataforma corriendo en otro sitio:
          </p>
          <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-white/5 font-mono text-sm">
            <code className="text-[var(--accent)]">docker compose -f docker-compose.labs.yml up -d</code>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">Detener y limpiar</h2>
          <div className="space-y-2">
            <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-white/5 font-mono text-sm">
              <div className="text-[var(--text-dim)]"># Detener contenedores</div>
              <code className="text-[var(--accent)]">docker compose down</code>
            </div>
            <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-white/5 font-mono text-sm">
              <div className="text-[var(--text-dim)]"># Detener y eliminar volúmenes</div>
              <code className="text-[var(--accent)]">docker compose down -v</code>
            </div>
          </div>
        </section>

        <Callout type="warning" title="Uso responsable">
          <p>
            Los laboratorios contienen vulnerabilidades intencionales. Úsalos solo en entornos
            locales y con fines educativos. Nunca ejecutes estas aplicaciones expuestas a internet.
          </p>
        </Callout>

        <Link
          href="/laboratorio"
          className="inline-block text-[var(--accent)] font-semibold hover:text-[var(--accent-bright)]"
        >
          ← Volver a laboratorios
        </Link>
      </div>
    </div>
  )
}
