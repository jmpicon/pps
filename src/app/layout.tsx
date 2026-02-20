import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PPS - Plataforma de Estudio | Puesta y Producción Segura',
  description: 'Plataforma interactiva de estudio para el curso de Puesta y Producción Segura - Seguridad Web, OWASP, Vulnerabilidades y más'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
