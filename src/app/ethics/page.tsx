import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AlertTriangle, Shield, Scale, BookOpen, CheckCircle, XCircle, Globe, Lock } from 'lucide-react'

export const metadata = {
  title: 'Normas y ética',
  description: 'Uso responsable del material y laboratorios de ciberseguridad — PPS Academy',
}

const rules = [
  {
    icon: Shield,
    color: 'var(--accent)',
    bg: 'rgba(34,211,238,0.08)',
    border: 'rgba(34,211,238,0.18)',
    title: 'Solo entornos autorizados',
    body: 'Los laboratorios son entornos controlados y deliberadamente vulnerables. Úsalos exclusivamente en tu máquina local. Nunca los expongas a internet ni los conectes a redes externas.',
  },
  {
    icon: Scale,
    color: 'var(--violet)',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.18)',
    title: 'Marco legal',
    body: 'En España, el acceso no autorizado a sistemas informáticos está penado por el Código Penal (art. 197 bis). Las técnicas aprendidas aquí solo pueden aplicarse con permiso explícito y por escrito del propietario del sistema.',
  },
  {
    icon: BookOpen,
    color: 'var(--terminal)',
    bg: 'rgba(45,212,191,0.08)',
    border: 'rgba(45,212,191,0.18)',
    title: 'Propósito educativo',
    body: 'Todo el material está diseñado para comprender vulnerabilidades y defenderlas, no para atacar sistemas reales. El conocimiento de ofensiva es esencial para construir mejores defensas.',
  },
  {
    icon: Globe,
    color: 'var(--warning)',
    bg: 'rgba(251,191,36,0.08)',
    border: 'rgba(251,191,36,0.18)',
    title: 'Responsible disclosure',
    body: 'Si durante tu aprendizaje encuentras vulnerabilidades reales en aplicaciones de terceros, sigue el proceso de divulgación responsable: contacta al equipo de seguridad, no lo hagas público hasta que esté parcheado.',
  },
]

const doList = [
  'Practicar en los laboratorios locales del curso (Lab SQLi, DVWA)',
  'Participar en plataformas de CTF legales (HackTheBox, TryHackMe, PicoCTF)',
  'Reportar vulnerabilidades responsablemente (bug bounty programs)',
  'Obtener certificaciones reconocidas: CEH, OSCP, eJPT, PNPT',
  'Contribuir a proyectos open source de seguridad (OWASP)',
  'Compartir conocimiento con la comunidad de forma ética',
]

const dontList = [
  'Atacar sistemas sin autorización explícita por escrito',
  'Exponer los contenedores Docker a redes públicas',
  'Usar las técnicas aprendidas con fines maliciosos o lucrativos ilegales',
  'Acceder a datos de terceros sin permiso (RGPD, LOPD)',
  'Compartir exploits activos de vulnerabilidades no parcheadas (0-day)',
  'Eludir medidas de seguridad de plataformas online reales',
]

const hackerEthics = [
  { title: 'Acceso universal', body: 'El acceso a la información y a los ordenadores debe ser universal y total.' },
  { title: 'Descentralización', body: 'Desconfía de las autoridades. Promueve la descentralización.' },
  { title: 'Compartir', body: 'Los hackers deben ser juzgados por su habilidad, no por criterios como raza, edad, sexo o posición social.' },
  { title: 'Arte y belleza', body: 'Puedes crear arte y belleza en un ordenador. Los ordenadores pueden cambiar tu vida para mejor.' },
]

export default function EthicsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Normas y ética' }]} />

      {/* Header */}
      <div className="mb-10">
        <div className="badge badge-cyan mb-4">
          <Shield className="h-3.5 w-3.5" />
          Uso responsable
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">
          Normas y ética
        </h1>
        <p className="text-[var(--text-muted)] text-lg leading-relaxed">
          El conocimiento de ciberseguridad es una herramienta poderosa. Con esa
          potencia viene la responsabilidad de usarlo de forma ética y legal.
        </p>
      </div>

      {/* Warning banner */}
      <div className="p-5 rounded-2xl bg-[var(--warning)]/8 border border-[var(--warning)]/20 mb-10 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--warning)]/15 border border-[var(--warning)]/25">
          <AlertTriangle className="h-5 w-5 text-[var(--warning)]" />
        </div>
        <div>
          <h2 className="font-bold text-white mb-1">Aviso importante</h2>
          <p className="text-sm text-[var(--text)] leading-relaxed">
            Los laboratorios contienen <strong className="text-white">vulnerabilidades intencionadas</strong>.
            Úsalos exclusivamente en tu entorno local y nunca los expongas a internet.
            Aplicar estas técnicas en sistemas sin permiso es un <strong className="text-white">delito</strong>.
          </p>
        </div>
      </div>

      {/* Rules grid */}
      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        {rules.map((r) => {
          const Icon = r.icon
          return (
            <div
              key={r.title}
              className="p-5 rounded-2xl border transition-all hover:-translate-y-0.5"
              style={{ background: r.bg, borderColor: r.border }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="feature-icon"
                  style={{ background: `${r.color}18`, border: `1px solid ${r.color}30`, width: 40, height: 40, borderRadius: 10 }}
                >
                  <Icon className="h-4.5 w-4.5" style={{ color: r.color }} />
                </div>
                <h3 className="font-bold text-white">{r.title}</h3>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{r.body}</p>
            </div>
          )
        })}
      </div>

      {/* Do / Don't */}
      <div className="grid sm:grid-cols-2 gap-5 mb-12">
        {/* Do */}
        <div className="p-6 rounded-2xl bg-[var(--success)]/6 border border-[var(--success)]/18">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle className="h-5 w-5 text-[var(--success)]" />
            <h2 className="font-bold text-white">Puedes y debes</h2>
          </div>
          <ul className="space-y-3">
            {doList.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)] mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Don't */}
        <div className="p-6 rounded-2xl bg-[var(--danger)]/6 border border-[var(--danger)]/18">
          <div className="flex items-center gap-2 mb-5">
            <XCircle className="h-5 w-5 text-[var(--danger)]" />
            <h2 className="font-bold text-white">Nunca debes</h2>
          </div>
          <ul className="space-y-3">
            {dontList.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--danger)] mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hacker Ethics */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-5 w-5 text-[var(--violet)]" />
          <h2 className="text-xl font-bold text-white">La ética hacker</h2>
        </div>
        <p className="text-[var(--text-muted)] mb-5 text-sm leading-relaxed">
          Formulada originalmente por Steven Levy en <em>Hackers: Heroes of the Computer Revolution</em> (1984),
          la ética hacker promueve el conocimiento libre y el uso creativo de la tecnología:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {hackerEthics.map((e, i) => (
            <div key={e.title} className="p-4 rounded-xl bg-[var(--violet)]/6 border border-[var(--violet)]/15">
              <span className="text-[10px] font-bold text-[var(--violet)] uppercase tracking-widest block mb-1">
                Principio {i + 1}
              </span>
              <h4 className="font-bold text-white text-sm mb-1">{e.title}</h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">{e.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final note */}
      <div className="p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-white/6 text-center">
        <Shield className="h-8 w-8 text-[var(--accent)] mx-auto mb-3" />
        <h3 className="font-bold text-white mb-2">Usar el conocimiento para proteger</h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-md mx-auto">
          Comprender cómo atacan los adversarios es el primer paso para construir
          sistemas más seguros. Ese es el verdadero objetivo de este curso.
        </p>
      </div>
    </div>
  )
}
