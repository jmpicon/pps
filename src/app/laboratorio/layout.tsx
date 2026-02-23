import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Laboratorio',
  description: 'Entornos de prácticas para explotar vulnerabilidades web. Lab SQL Injection, DVWA y más. Docker listo para usar.',
}

export default function LaboratorioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
