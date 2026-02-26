'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, ChevronDown, ChevronUp, Eye, EyeOff, Flag, Target, Zap, Lock, Bug, Shield } from 'lucide-react'
import { Breadcrumbs } from '@/components/Breadcrumbs'

interface Challenge {
  id: string
  title: string
  module: string
  difficulty: 'Fácil' | 'Medio' | 'Difícil'
  category: string
  points: number
  description: string
  objective: string
  hints: string[]
  flag?: string
  solved?: boolean
}

const challenges: Challenge[] = [
  {
    id: 'sqli-01',
    title: 'Auth Bypass 101',
    module: 'Módulo 2 — Inyección SQL',
    difficulty: 'Fácil',
    category: 'SQLi',
    points: 100,
    description: 'Un formulario de login no valida correctamente las entradas. Usa inyección SQL para acceder sin contraseña.',
    objective: 'Obtener acceso como administrador sin conocer la contraseña.',
    hints: [
      "Observa el campo usuario: ¿qué pasa si añades una comilla simple?",
      "El clásico bypass usa el operador OR para hacer siempre verdadera la condición.",
      "Prueba: ' OR '1'='1' -- en el campo usuario"
    ],
  },
  {
    id: 'xss-01',
    title: 'Cookie Stealer',
    module: 'Módulo 2 — XSS',
    difficulty: 'Fácil',
    category: 'XSS Reflejado',
    points: 150,
    description: 'Una aplicación refleja el parámetro ?name= directamente en la página sin sanitizar. Inyecta JavaScript.',
    objective: 'Ejecutar alert(document.cookie) en el contexto del navegador de la víctima.',
    hints: [
      "Comprueba si el parámetro se refleja en el HTML sin escapar.",
      "Un payload simple: <script>alert(1)</script>",
      "Si el script está bloqueado, intenta con <img src=x onerror=alert(document.cookie)>"
    ],
  },
  {
    id: 'csrf-01',
    title: 'Transferencia fantasma',
    module: 'Módulo 2 — CSRF',
    difficulty: 'Medio',
    category: 'CSRF',
    points: 200,
    description: 'Un formulario de transferencia no incluye token CSRF. Crea una página maliciosa que ejecute la operación.',
    objective: 'Forzar al administrador autenticado a realizar una transferencia a tu cuenta.',
    hints: [
      "Analiza el formulario: ¿tiene campo token? ¿los headers son verificados?",
      "Crea un HTML con un formulario auto-submit que apunte al endpoint vulnerable.",
      "Usa SameSite cookies, Origin header, y tokens CSRF para defender."
    ],
  },
  {
    id: 'jwt-01',
    title: 'Algorithm Confusion',
    module: 'Módulo 3 — JWT',
    difficulty: 'Medio',
    category: 'Broken Auth',
    points: 250,
    description: 'El servidor acepta tokens JWT firmados con el algoritmo "none". Escala privilegios cambiando el rol.',
    objective: 'Obtener un token JWT de administrador sin conocer la clave secreta.',
    hints: [
      "Decodifica el token en jwt.io y analiza el header.",
      "Cambia el algoritmo a 'none' en el header y elimina la firma.",
      "Modifica el payload: {\"role\": \"admin\"} y envía el token modificado."
    ],
  },
  {
    id: 'lfi-01',
    title: 'Read /etc/passwd',
    module: 'Módulo 2 — LFI',
    difficulty: 'Medio',
    category: 'LFI',
    points: 200,
    description: 'Un parámetro ?file= incluye archivos locales sin validación. Navega por el sistema de archivos.',
    objective: 'Leer el contenido de /etc/passwd aprovechando path traversal.',
    hints: [
      "El parámetro ?file=pagina.php incluye archivos. ¿Y si pruebas rutas relativas?",
      "Usa ../../ para subir directorios: ?file=../../etc/passwd",
      "Algunos filtros bloquean '../'. Prueba codificación URL: %2e%2e%2f"
    ],
  },
  {
    id: 'ssti-01',
    title: 'Template Injection',
    module: 'Módulo 2 — SSTI',
    difficulty: 'Difícil',
    category: 'Injection',
    points: 400,
    description: 'El servidor renderiza plantillas Jinja2/Twig con input de usuario. Escapa el contexto del template.',
    objective: 'Ejecutar código en el servidor aprovechando SSTI para obtener RCE.',
    hints: [
      "Inyecta {{7*7}} — si la respuesta es 49, el template evalúa tu input.",
      "En Jinja2 puedes acceder a la clase base: {{''.__class__.__mro__[1].__subclasses__()}}",
      "Busca clases como subprocess.Popen para ejecutar comandos del sistema."
    ],
  },
  {
    id: 'idor-01',
    title: 'Horizontal Privilege Escalation',
    module: 'Módulo 3 — Broken Access',
    difficulty: 'Fácil',
    category: 'IDOR',
    points: 100,
    description: 'La API de perfil expone datos por ID numérico sin validar que pertenezcan al usuario autenticado.',
    objective: 'Acceder a los datos de otro usuario modificando el parámetro id en la petición.',
    hints: [
      "Observa las peticiones a /api/user?id=X mientras navegas tu perfil.",
      "¿Qué pasa si cambias el ID por un número diferente?",
      "IDOR = Insecure Direct Object Reference: el servidor no valida la propiedad."
    ],
  },
  {
    id: 'harden-01',
    title: 'Hardening Challenge',
    module: 'Módulo 5 — Configuración',
    difficulty: 'Difícil',
    category: 'Defensa',
    points: 350,
    description: 'Dada una configuración de servidor nginx con múltiples fallos, identifica y corrige todos los problemas de seguridad.',
    objective: 'Aplicar CSP, HSTS, eliminar cabeceras peligrosas y configurar TLS correctamente.',
    hints: [
      "Usa securityheaders.com para analizar las cabeceras actuales.",
      "Recuerda: X-Frame-Options, X-Content-Type-Options, Referrer-Policy.",
      "Una CSP estricta elimina la mayoría de vectores XSS."
    ],
  },
]

const difficultyConfig = {
  'Fácil':   { color: 'var(--success)',  bg: 'rgba(52,211,153,0.1)',   border: 'rgba(52,211,153,0.25)',   dots: 1 },
  'Medio':   { color: 'var(--warning)', bg: 'rgba(251,191,36,0.1)',   border: 'rgba(251,191,36,0.25)',   dots: 2 },
  'Difícil': { color: 'var(--danger)',   bg: 'rgba(248,113,113,0.1)',  border: 'rgba(248,113,113,0.25)',  dots: 3 },
}

const categoryIcons: Record<string, React.ElementType> = {
  'SQLi': Bug, 'XSS Reflejado': Zap, 'CSRF': Target, 'Broken Auth': Lock,
  'LFI': Shield, 'Injection': Flag, 'IDOR': Eye, 'Defensa': Shield,
}

function ChallengeCard({ ch }: { ch: Challenge }) {
  const [open, setOpen] = useState(false)
  const [showHints, setShowHints] = useState<number[]>([])
  const diff = difficultyConfig[ch.difficulty]
  const Icon = categoryIcons[ch.category] || Flag

  const toggleHint = (i: number) =>
    setShowHints((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])

  return (
    <div
      className="rounded-2xl border transition-all duration-300"
      style={{
        background: diff.bg,
        borderColor: open ? diff.border : 'rgba(255,255,255,0.06)',
        boxShadow: open ? `0 8px 40px -12px ${diff.color}30` : undefined,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-5 text-left group"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="feature-icon shrink-0 mt-0.5"
              style={{ background: `${diff.color}18`, border: `1px solid ${diff.color}30` }}
            >
              <Icon className="h-5 w-5" style={{ color: diff.color }} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-bold text-white group-hover:text-[var(--accent)] transition-colors">
                  {ch.title}
                </span>
                <span
                  className="badge text-[10px] font-bold"
                  style={{ background: diff.bg, borderColor: diff.border, color: diff.color }}
                >
                  {ch.difficulty}
                </span>
                <span className="badge badge-cyan text-[10px]">{ch.category}</span>
              </div>
              <p className="text-xs text-[var(--text-dim)] mb-1">{ch.module}</p>
              <p className="text-sm text-[var(--text-muted)]">{ch.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="text-lg font-black" style={{ color: diff.color }}>
              {ch.points}
              <span className="text-xs font-medium text-[var(--text-dim)] ml-1">pts</span>
            </span>
            {open
              ? <ChevronUp className="h-5 w-5 text-[var(--text-muted)]" />
              : <ChevronDown className="h-5 w-5 text-[var(--text-muted)] group-hover:text-white" />
            }
          </div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/5 space-y-5 pt-4">
              {/* Objective */}
              <div className="p-4 rounded-xl bg-[var(--bg-base)]/60 border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-[var(--accent)]" />
                  <h4 className="text-sm font-bold text-white">Objetivo</h4>
                </div>
                <p className="text-sm text-[var(--text)]">{ch.objective}</p>
              </div>

              {/* Hints */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-4 w-4 text-[var(--warning)]" />
                  <h4 className="text-sm font-bold text-white">Pistas</h4>
                  <span className="text-xs text-[var(--text-dim)]">— revelar una a la vez</span>
                </div>
                <div className="space-y-2">
                  {ch.hints.map((hint, i) => {
                    const revealed = showHints.includes(i)
                    return (
                      <div
                        key={i}
                        className="rounded-xl border overflow-hidden"
                        style={{
                          background: revealed ? 'rgba(251,191,36,0.06)' : 'rgba(255,255,255,0.02)',
                          borderColor: revealed ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => toggleHint(i)}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                        >
                          <span className="text-xs font-bold" style={{ color: 'var(--warning)' }}>
                            Pista #{i + 1}
                          </span>
                          {revealed
                            ? <EyeOff className="h-3.5 w-3.5 text-[var(--text-dim)]" />
                            : <Eye className="h-3.5 w-3.5 text-[var(--text-dim)]" />
                          }
                        </button>
                        {revealed && (
                          <p className="px-4 pb-3 text-sm text-[var(--text)]">{hint}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const filters = ['Todos', 'Fácil', 'Medio', 'Difícil'] as const
type Filter = typeof filters[number]

export default function ChallengesPage() {
  const [active, setActive] = useState<Filter>('Todos')

  const filtered = active === 'Todos'
    ? challenges
    : challenges.filter((c) => c.difficulty === active)

  const totalPoints = challenges.reduce((a, c) => a + c.points, 0)

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
      <Breadcrumbs items={[{ label: 'Retos' }]} />

      {/* Header */}
      <div className="mb-10">
        <div className="badge badge-cyan mb-4">
          <Trophy className="h-3.5 w-3.5" />
          CTF-style challenges
        </div>
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tight">
          Retos y desafíos
        </h1>
        <p className="text-[var(--text-muted)] text-lg leading-relaxed max-w-2xl">
          Pon a prueba tus conocimientos con retos prácticos. Cada desafío incluye pistas progresivas
          para que aprendas sin bloquearte.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Retos', value: challenges.length, color: 'var(--accent)' },
          { label: 'Puntos totales', value: totalPoints, color: 'var(--terminal)' },
          { label: 'Categorías', value: new Set(challenges.map((c) => c.category)).size, color: 'var(--violet)' },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="text-2xl font-black counter-glow" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-[var(--text-muted)] mt-1 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {filters.map((f) => {
          const isActive = active === f
          const conf = f !== 'Todos' ? difficultyConfig[f as keyof typeof difficultyConfig] : null
          return (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              className="px-4 py-2 rounded-xl text-sm font-semibold border transition-all"
              style={isActive && conf
                ? { background: conf.bg, borderColor: conf.border, color: conf.color }
                : isActive
                ? { background: 'rgba(34,211,238,0.1)', borderColor: 'rgba(34,211,238,0.25)', color: 'var(--accent)' }
                : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: 'var(--text-muted)' }
              }
            >
              {f}
              {f !== 'Todos' && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({challenges.filter((c) => c.difficulty === f).length})
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Challenges */}
      <div className="space-y-4">
        {filtered.map((ch) => (
          <ChallengeCard key={ch.id} ch={ch} />
        ))}
      </div>

      {/* Note */}
      <div className="mt-10 p-5 rounded-2xl bg-[var(--accent)]/6 border border-[var(--accent)]/15">
        <div className="flex items-start gap-3">
          <Trophy className="h-5 w-5 text-[var(--accent)] shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-white mb-1">Cómo usar los retos</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Los retos están diseñados para practicarse en los laboratorios locales.
              Inicia los contenedores con <code className="px-1.5 py-0.5 rounded bg-white/6 text-[var(--accent)] font-mono text-xs">docker compose up -d</code>{' '}
              y usa las pistas de forma progresiva. El objetivo no es llegar al final rápido,
              sino entender cada vulnerabilidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
