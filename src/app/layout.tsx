import type { Metadata } from 'next'
import './globals.css'
import Layout from '@/components/Layout'
import { ProgressProvider } from '@/components/ProgressProvider'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'),
  title: {
    default: 'PPS Academy | Puesta y Producción Segura',
    template: '%s | PPS Academy',
  },
  description:
    'Academia profesional de ciberseguridad. Curso completo de Puesta y Producción Segura con OWASP Top Ten, teoría, práctica y laboratorios Docker.',
  keywords: ['ciberseguridad', 'OWASP', 'PPS', 'seguridad web', 'SQL injection', 'XSS', 'laboratorio'],
  authors: [{ name: 'PPS Academy' }],
  openGraph: {
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[var(--accent)] focus:text-white focus:outline-none"
        >
          Saltar al contenido principal
        </a>
        <ProgressProvider>
          <Layout>{children}</Layout>
        </ProgressProvider>
      </body>
    </html>
  )
}
