'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, ArrowLeft, FlaskConical, Terminal, ExternalLink } from 'lucide-react'
import { allModules } from '@/content/modules/registry'

const labs = [
  { id: 'lab-sqli', name: 'SQL Injection', module: 'Módulo 2', desc: 'Explotar y mitigar SQLi con Apache+PHP+MySQL' },
  { id: 'lab-xss', name: 'Cross-Site Scripting', module: 'Módulo 2', desc: 'XSS reflejado y almacenado' },
  { id: 'lab-csrf', name: 'CSRF', module: 'Módulo 2', desc: 'Tokens CSRF y protección' },
  { id: 'lab-rce', name: 'Remote Code Execution', module: 'Módulo 2', desc: 'Explotar y mitigar RCE' },
  { id: 'lab-ssrf', name: 'SSRF', module: 'Módulo 2', desc: 'Acceso a recursos internos' },
  { id: 'lab-xxe', name: 'XXE', module: 'Módulo 2', desc: 'XML External Entities' },
  { id: 'lab-lfi', name: 'Local File Inclusion', module: 'Módulo 2', desc: 'Lectura de archivos del servidor' },
  { id: 'lab-rfi', name: 'Remote File Inclusion', module: 'Módulo 2', desc: 'Ejecución de código remoto' },
  { id: 'lab-deserialization', name: 'Unsafe Deserialization', module: 'Módulo 2', desc: 'Objetos serializados maliciosos' },
  { id: 'lab-broken-auth', name: 'Broken Authentication', module: 'Módulo 3', desc: 'Fuerza bruta y MFA' },
  { id: 'lab-sessions', name: 'Gestión de Sesiones', module: 'Módulo 3', desc: 'Cookies seguras y Session Hijacking' },
  { id: 'lab-jwt', name: 'JWT', module: 'Módulo 3', desc: 'Manipulación y protección de JWT' },
  { id: 'lab-oauth', name: 'OAuth', module: 'Módulo 3', desc: 'OAuth inseguro' },
  { id: 'lab-tls', name: 'TLS', module: 'Módulo 4', desc: 'Configuración segura de TLS' },
  { id: 'lab-aes', name: 'AES', module: 'Módulo 4', desc: 'Cifrado de datos sensibles' },
  { id: 'lab-rbac', name: 'RBAC', module: 'Módulo 4', desc: 'Control de acceso por roles' },
  { id: 'lab-abac', name: 'ABAC', module: 'Módulo 4', desc: 'Control por atributos' },
  { id: 'lab-csp', name: 'Content Security Policy', module: 'Módulo 5', desc: 'Implementar CSP' },
  { id: 'lab-hsts', name: 'HSTS', module: 'Módulo 5', desc: 'HTTP Strict Transport Security' },
  { id: 'lab-misconfiguration', name: 'Security Misconfiguration', module: 'Módulo 5', desc: 'Auditoría y corrección' },
  { id: 'lab-logging', name: 'Logging & Monitoring', module: 'Módulo 5', desc: 'Sistema de logging' },
  { id: 'lab-sast', name: 'SAST', module: 'Módulo 6', desc: 'Análisis estático con SonarQube' },
  { id: 'lab-dast', name: 'DAST', module: 'Módulo 6', desc: 'Análisis dinámico' },
  { id: 'lab-dependency-check', name: 'Dependency-Check', module: 'Módulo 6', desc: 'Análisis de dependencias' },
  { id: 'lab-zap', name: 'OWASP ZAP', module: 'Módulo 6', desc: 'Escaneo de seguridad' }
]

export default function LaboratorioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e17] via-[#0f172a] to-[#0a0e17]">
      <header className="border-b border-[#334155]/50 bg-[#0a0e17]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition">
            <ArrowLeft className="w-5 h-5" />
            Volver
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold">
            <Shield className="w-7 h-7 text-cyan-400" />
            PPS Plataforma
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400">
            <FlaskConical className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Laboratorio de Prácticas</h1>
            <p className="text-slate-400">{labs.length} ejercicios prácticos para aplicar lo aprendido</p>
          </div>
        </div>

        <div className="mb-8 p-6 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <h3 className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
            <Terminal className="w-5 h-5" />
            Cómo usar el laboratorio
          </h3>
          <p className="text-slate-300 mb-4">
            Los laboratorios se ejecutan en contenedores Docker. Inicia el entorno con:
          </p>
          <pre className="bg-[#0a0e17] p-4 rounded-lg text-cyan-400 text-sm overflow-x-auto">
            docker-compose -f docker-compose.labs.yml up -d
          </pre>
          <p className="text-slate-400 text-sm mt-2">
            Cada laboratorio incluye aplicaciones vulnerables y documentación paso a paso. Consulta la documentación en cada contenedor.
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-6 text-slate-300">Laboratorios disponibles</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.id}
              id={lab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.02, 0.3) }}
              className="p-5 rounded-xl bg-[#1a2234]/80 border border-[#334155]/50 hover:border-emerald-500/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs text-emerald-400/80 font-mono">{lab.module}</span>
                  <h3 className="font-semibold mt-1">{lab.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">{lab.desc}</p>
                </div>
                <FlaskConical className="w-5 h-5 text-emerald-400/50 flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-amber-500/10 border border-amber-500/20">
          <h3 className="font-semibold text-amber-400 mb-2">DVWA - Damn Vulnerable Web Application</h3>
          <p className="text-slate-300 mb-4">
            Incluimos DVWA como entorno de prácticas general. Cubre SQLi, XSS, CSRF, LFI, RCE y más.
          </p>
          <p className="text-slate-400 text-sm">
            URL: <code className="text-cyan-400">http://localhost:4280</code> (login: admin / password)
          </p>
        </div>
      </main>
    </div>
  )
}
