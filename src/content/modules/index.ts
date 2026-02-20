export interface Lesson {
  id: string
  title: string
  slug: string
  theory: string
  practice?: string
  objectives: string[]
  keyPoints: string[]
  codeExamples?: { title: string; code: string; language: string }[]
  activity?: {
    title: string
    objective: string
    steps: string[]
    labId?: string
  }
}

export interface Module {
  id: string
  number: number
  title: string
  description: string
  icon: string
  lessons: Lesson[]
}

export const modules: Module[] = [
  {
    id: 'modulo-1',
    number: 1,
    title: 'Introducción a la Seguridad Web',
    description: 'Fundamentos de seguridad, OWASP Top Ten y normativas',
    icon: 'shield',
    lessons: []
  },
  {
    id: 'modulo-2',
    number: 2,
    title: 'Vulnerabilidades de Datos de Entrada',
    description: 'SQLi, XSS, CSRF, RCE, SSRF, XXE, LFI, RFI y más',
    icon: 'bug',
    lessons: []
  },
  {
    id: 'modulo-3',
    number: 3,
    title: 'Autenticación y Gestión de Sesiones',
    description: 'Broken Auth, sesiones, JWT y OAuth',
    icon: 'key',
    lessons: []
  },
  {
    id: 'modulo-4',
    number: 4,
    title: 'Protección de Datos y Control de Acceso',
    description: 'TLS, AES, RBAC y ABAC',
    icon: 'lock',
    lessons: []
  },
  {
    id: 'modulo-5',
    number: 5,
    title: 'Configuración Segura y Registro',
    description: 'CSP, HSTS, Security Misconfiguration y Logging',
    icon: 'settings',
    lessons: []
  },
  {
    id: 'modulo-6',
    number: 6,
    title: 'Seguridad en Librerías y Auditoría',
    description: 'SAST, DAST, Dependency-Check y OWASP ZAP',
    icon: 'search',
    lessons: []
  }
]
