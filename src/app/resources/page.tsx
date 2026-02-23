import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ExternalLink } from 'lucide-react'

export const metadata = {
  title: 'Recursos',
  description: 'Enlaces y herramientas para el curso Puesta y Producción Segura',
}

const resources = [
  {
    title: 'OWASP Top Ten',
    url: 'https://owasp.org/www-project-top-ten/',
    desc: 'Lista de las 10 vulnerabilidades más críticas en aplicaciones web',
  },
  {
    title: 'OWASP WSTG',
    url: 'https://owasp.org/www-project-web-security-testing-guide/',
    desc: 'Guía de pruebas de seguridad web',
  },
  {
    title: 'OWASP ZAP',
    url: 'https://www.zaproxy.org/',
    desc: 'Herramienta de análisis de seguridad de aplicaciones web',
  },
  {
    title: 'SSL Labs',
    url: 'https://www.ssllabs.com/ssltest/',
    desc: 'Test de configuración TLS/SSL',
  },
  {
    title: 'Semgrep',
    url: 'https://semgrep.dev/',
    desc: 'Herramienta SAST para análisis estático de código',
  },
  {
    title: 'OWASP Dependency-Check',
    url: 'https://owasp.org/www-project-dependency-check/',
    desc: 'Detección de dependencias vulnerables',
  },
  {
    title: 'jwt.io',
    url: 'https://jwt.io/',
    desc: 'Debugger y documentación de JWT',
  },
]

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Recursos' }]} />

      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        Recursos
      </h1>
      <p className="text-[var(--text-muted)] mb-10">
        Enlaces a documentación, herramientas y referencias útiles para el curso.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {resources.map((r) => (
          <a
            key={r.url}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-5 rounded-2xl bg-[var(--bg-card)]/80 border border-white/5 hover:border-[var(--accent)]/30 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="font-bold text-white group-hover:text-[var(--accent)]">
                  {r.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">{r.desc}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-[var(--text-dim)] shrink-0" />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
