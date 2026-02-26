import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ExternalLink, Shield, Bug, Zap, Wrench, BookOpen, FileCode2 } from 'lucide-react'

export const metadata = {
  title: 'Recursos',
  description: 'Herramientas, documentación y referencias de ciberseguridad — PPS Academy',
}

interface Resource {
  title: string
  url: string
  desc: string
  badge?: string
}

interface ResourceCategory {
  label: string
  icon: React.ElementType
  color: string
  bg: string
  border: string
  items: Resource[]
}

const categories: ResourceCategory[] = [
  {
    label: 'OWASP',
    icon: Shield,
    color: 'var(--accent)',
    bg: 'rgba(34,211,238,0.06)',
    border: 'rgba(34,211,238,0.15)',
    items: [
      { title: 'OWASP Top Ten',          url: 'https://owasp.org/www-project-top-ten/',                    desc: 'Las 10 vulnerabilidades más críticas en aplicaciones web' },
      { title: 'OWASP WSTG',             url: 'https://owasp.org/www-project-web-security-testing-guide/', desc: 'Guía completa de pruebas de seguridad web' },
      { title: 'OWASP ASVS',             url: 'https://owasp.org/www-project-application-security-verification-standard/', desc: 'Estándar de verificación de seguridad en aplicaciones' },
      { title: 'OWASP Cheat Sheets',     url: 'https://cheatsheetseries.owasp.org/',                       desc: 'Guías rápidas de mitigación por vulnerabilidad' },
      { title: 'OWASP Dependency-Check', url: 'https://owasp.org/www-project-dependency-check/',            desc: 'Detección de dependencias con CVEs conocidas' },
    ],
  },
  {
    label: 'Herramientas de análisis',
    icon: Wrench,
    color: 'var(--terminal)',
    bg: 'rgba(45,212,191,0.06)',
    border: 'rgba(45,212,191,0.15)',
    items: [
      { title: 'OWASP ZAP',    url: 'https://www.zaproxy.org/',          desc: 'Proxy DAST para análisis de seguridad web activo y pasivo', badge: 'DAST' },
      { title: 'Semgrep',      url: 'https://semgrep.dev/',              desc: 'Análisis estático de código (SAST) con reglas personalizables', badge: 'SAST' },
      { title: 'Burp Suite',   url: 'https://portswigger.net/burp',      desc: 'Plataforma de pentesting web, proxy interceptor líder', badge: 'Proxy' },
      { title: 'Nikto',        url: 'https://cirt.net/Nikto2',           desc: 'Escáner de servidores web open source' },
      { title: 'SQLMap',       url: 'https://sqlmap.org/',               desc: 'Detección y explotación automática de SQL Injection' },
      { title: 'Nuclei',       url: 'https://projectdiscovery.io/nuclei', desc: 'Scanner de vulnerabilidades basado en templates YAML' },
    ],
  },
  {
    label: 'Criptografía y PKI',
    icon: Shield,
    color: 'var(--violet)',
    bg: 'rgba(167,139,250,0.06)',
    border: 'rgba(167,139,250,0.15)',
    items: [
      { title: 'SSL Labs Test', url: 'https://www.ssllabs.com/ssltest/', desc: 'Análisis y puntuación de configuración TLS/SSL de servidores' },
      { title: 'jwt.io',        url: 'https://jwt.io/',                  desc: 'Debugger, documentación y librerías de JSON Web Tokens' },
      { title: 'CyberChef',     url: 'https://gchq.github.io/CyberChef/', desc: 'Navaja suiza para criptografía, codificación y análisis de datos' },
    ],
  },
  {
    label: 'Práctica y CTF',
    icon: Bug,
    color: 'var(--danger)',
    bg: 'rgba(248,113,113,0.06)',
    border: 'rgba(248,113,113,0.15)',
    items: [
      { title: 'HackTheBox',   url: 'https://www.hackthebox.com/', desc: 'Plataforma de pentesting con máquinas reales y laboratorios' },
      { title: 'TryHackMe',    url: 'https://tryhackme.com/',      desc: 'Aprendizaje guiado de ciberseguridad con labs interactivos' },
      { title: 'PicoCTF',      url: 'https://picoctf.org/',        desc: 'Competición CTF educativa para iniciación en seguridad' },
      { title: 'PortSwigger Web Academy', url: 'https://portswigger.net/web-security', desc: 'Labs gratuitos de vulnerabilidades web por los creadores de Burp' },
    ],
  },
  {
    label: 'Documentación técnica',
    icon: BookOpen,
    color: 'var(--warning)',
    bg: 'rgba(251,191,36,0.06)',
    border: 'rgba(251,191,36,0.15)',
    items: [
      { title: 'MDN Web Docs — Security', url: 'https://developer.mozilla.org/en-US/docs/Web/Security', desc: 'Documentación de seguridad web de Mozilla' },
      { title: 'securityheaders.com',    url: 'https://securityheaders.com/',   desc: 'Análisis de cabeceras HTTP de seguridad' },
      { title: 'NVD — NIST',             url: 'https://nvd.nist.gov/',          desc: 'Base de datos nacional de vulnerabilidades con CVEs' },
      { title: 'Exploit-DB',             url: 'https://www.exploit-db.com/',    desc: 'Base de datos de exploits públicos para referencia educativa' },
    ],
  },
  {
    label: 'Normativa y estándares',
    icon: FileCode2,
    color: 'var(--text-muted)',
    bg: 'rgba(148,163,184,0.05)',
    border: 'rgba(148,163,184,0.12)',
    items: [
      { title: 'ENS — CCN-CERT', url: 'https://www.ccn-cert.cni.es/es/ens.html', desc: 'Esquema Nacional de Seguridad en España' },
      { title: 'RGPD — EUR-Lex', url: 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32016R0679', desc: 'Texto completo del Reglamento General de Protección de Datos' },
      { title: 'ISO 27001',       url: 'https://www.iso.org/isoiec-27001-information-security.html', desc: 'Estándar internacional de gestión de seguridad de la información' },
    ],
  },
]

export default function ResourcesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Recursos' }]} />

      {/* Header */}
      <div className="mb-10">
        <div className="badge badge-cyan mb-4">
          <Zap className="h-3.5 w-3.5" />
          Referencias profesionales
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">Recursos</h1>
        <p className="text-[var(--text-muted)] text-lg max-w-2xl leading-relaxed">
          Herramientas, documentación oficial y plataformas de práctica usadas en el curso
          y en el mundo profesional de la ciberseguridad.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <section key={cat.label}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="feature-icon"
                  style={{ background: cat.bg, border: `1px solid ${cat.border}`, width: 40, height: 40, borderRadius: 10 }}
                >
                  <Icon className="h-5 w-5" style={{ color: cat.color }} />
                </div>
                <h2 className="text-lg font-bold text-white">{cat.label}</h2>
                <div className="h-px flex-1 bg-gradient-to-r from-white/8 to-transparent" />
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-5 rounded-xl border border-white/6 transition-all duration-200 group hover:-translate-y-0.5 hover:border-white/20"
                    style={{ background: cat.bg }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-white text-sm group-hover:text-[var(--accent)] transition-colors leading-tight">
                        {r.title}
                      </h3>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {r.badge && (
                          <span className="badge text-[9px] font-bold" style={{ color: cat.color, background: `${cat.color}15`, borderColor: `${cat.color}25` }}>
                            {r.badge}
                          </span>
                        )}
                        <ExternalLink className="h-3.5 w-3.5 text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors" />
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{r.desc}</p>
                  </a>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* Note */}
      <div className="mt-12 p-5 rounded-2xl bg-[var(--bg-card)]/60 border border-white/6 flex items-start gap-3">
        <Shield className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          Todos los recursos listados son públicos y de acceso gratuito (salvo versiones premium indicadas).
          Úsalos en combinación con el contenido del curso para maximizar tu aprendizaje.
        </p>
      </div>
    </div>
  )
}
