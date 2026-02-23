import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Todo el contenido',
  description: 'Curso completo Puesta y Producción Segura. Todos los módulos y lecciones en una sola página.',
}

export default function MisconfigurationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
