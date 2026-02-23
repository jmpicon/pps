import { notFound } from 'next/navigation'
import Link from 'next/link'
import { LabView } from '@/components/LabView'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const labs: Record<string, { name: string; port: number; credentials: string; steps: string[]; vulns: string[] }> = {
  'lab-sqli': {
    name: 'SQL Injection',
    port: 8081,
    credentials: 'admin / admin123',
    steps: [
      'Iniciar contenedores: docker compose up -d',
      'Abrir http://localhost:8081',
      'Probar bypass: usuario \' OR \'1\'=\'1\' #',
      'Cambiar a modo seguro con ?secure=1',
    ],
    vulns: ['Bypass autenticación', 'Extracción de credenciales'],
  },
  dvwa: {
    name: 'DVWA',
    port: 4280,
    credentials: 'admin / password',
    steps: [
      'Abrir http://localhost:4280',
      'Login con admin / password',
      'Configurar seguridad en "DVWA Security"',
      'Explorar cada vulnerabilidad por sección',
    ],
    vulns: ['SQL Injection', 'XSS', 'CSRF', 'LFI', 'RCE', 'File Upload'],
  },
}

export async function generateStaticParams() {
  return Object.keys(labs).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const lab = labs[params.slug]
  if (!lab) return { title: 'Lab no encontrado' }
  return {
    title: lab.name,
    description: `Laboratorio ${lab.name} - Puesta y Producción Segura`,
  }
}

export default function LabPage({ params }: { params: { slug: string } }) {
  const lab = labs[params.slug]
  if (!lab) notFound()

  return (
    <div className="min-h-screen">
      <div className="border-b border-white/5 bg-[var(--bg-surface)]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
          <Breadcrumbs
            items={[
              { label: 'Laboratorios', href: '/laboratorio' },
              { label: lab.name },
            ]}
          />
        </div>
      </div>
      <LabView
        slug={params.slug}
        name={lab.name}
        port={lab.port}
        credentials={lab.credentials}
        steps={lab.steps}
        vulns={lab.vulns}
      />
    </div>
  )
}
