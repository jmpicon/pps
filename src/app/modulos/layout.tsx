import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Plan de estudios',
  description: 'Módulos y lecciones del curso Puesta y Producción Segura. OWASP Top Ten, vulnerabilidades web y laboratorios prácticos.',
}

export default function ModulosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
