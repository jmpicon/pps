import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata = {
  title: 'Changelog',
  description: 'Historial de mejoras del curso PPS Academy',
}

const entries = [
  { date: '2025-02', changes: ['Web educativa completa con estructura docs', 'Rutas: /start, /syllabus, /labs, /resources, /glossary', 'Modo laboratorio con checklist y notas (localStorage)', 'Páginas About, Changelog, Ethics'] },
  { date: '2025-01', changes: ['6 módulos, 28 lecciones con teoría y práctica', '2 laboratorios: Lab SQLi y DVWA', 'Docker Compose para stack completo'] },
]

export default function ChangelogPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Changelog' }]} />

      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6">
        Changelog
      </h1>
      <p className="text-[var(--text-muted)] mb-10">
        Historial de mejoras del curso.
      </p>

      <div className="space-y-8">
        {entries.map((entry) => (
          <div key={entry.date} className="border-l-2 border-[var(--accent)]/30 pl-6">
            <h2 className="font-bold text-white text-lg">{entry.date}</h2>
            <ul className="mt-2 space-y-1 text-[var(--text-muted)]">
              {entry.changes.map((c, i) => (
                <li key={i}>• {c}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
