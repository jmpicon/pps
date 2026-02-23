# PPS Academy – Inventario, TOC y Plan de Implementación

**Asignatura:** Puesta y Producción Segura  
**Autor/Profesor:** José Picón  
**Fecha:** Febrero 2025

---

## 1. INVENTARIO DE CONTENIDO (resumen)

### 1.1 Contenido teórico existente

| Tipo | Cantidad | Ubicación |
|------|----------|-----------|
| Módulos | 6 | `src/content/modules/modulo1.ts` … `modulo6.ts` |
| Lecciones | 28 | Dentro de cada módulo |
| Teoría (Markdown) | 28 lecciones | Campo `theory` |
| Práctica | 1 lección (M1) | Campo `practice` |
| Actividades | 27 lecciones | Campo `activity` con `labId` |
| Ejemplos de código | 3 lecciones | Campo `codeExamples` |

### 1.2 Laboratorios existentes

| Lab | Puerto | Credenciales | Vulnerabilidades |
|-----|--------|--------------|------------------|
| Lab SQLi | 8081 | admin / admin123 | SQL Injection |
| DVWA | 4280 | admin / password | SQLi, XSS, CSRF, LFI, RCE, File Upload |

### 1.3 Contenido faltante (TODO)

| Elemento | Estado | Acción |
|----------|--------|--------|
| Glosario | No existe | Crear `/content/glossary` con términos extraídos de lecciones |
| Retos/CTF | No existe | Crear estructura `/content/challenges` con TODOs |
| Evaluaciones | No existe | Crear quizzes por módulo (TODO) |
| Recursos | Limitado | Crear `/content/resources` con enlaces OWASP, herramientas |
| Normas y ética | No existe | Crear página con TODO |
| Soluciones actividades | No existe | Crear estructura con TODO |
| Changelog | No existe | Crear `/changelog` |
| About/Profesor | No existe | Crear `/about` con José Picón |

---

## 2. TABLA DE CONTENIDOS (TOC) PROPUESTA

### 2.1 Mapa curricular

```
PPS Academy – Puesta y Producción Segura
│
├── EMPIEZA AQUÍ
│   ├── /start          → Guía de inicio para alumnos
│   └── /labs/setup     → Cómo usar los laboratorios
│
├── MAPA CURRICULAR
│   └── /syllabus       → Vista general del curso
│
├── MÓDULOS (6)
│   ├── M1. Introducción a la Seguridad Web (3 lecciones)
│   │   ├── Fundamentos de Seguridad en Aplicaciones Web
│   │   ├── OWASP Top Ten
│   │   └── Normativas de Seguridad Web
│   │
│   ├── M2. Vulnerabilidades de Datos de Entrada (9 lecciones)
│   │   ├── SQL Injection
│   │   ├── Cross-Site Scripting (XSS)
│   │   ├── Cross-Site Request Forgery (CSRF)
│   │   ├── Remote Code Execution (RCE)
│   │   ├── Server-Side Request Forgery (SSRF)
│   │   ├── XML External Entities (XXE)
│   │   ├── Local File Inclusion (LFI)
│   │   ├── Remote File Inclusion (RFI)
│   │   └── Unsafe Deserialization
│   │
│   ├── M3. Autenticación y Gestión de Sesiones (4 lecciones)
│   │   ├── Broken Authentication
│   │   ├── Gestión Insegura de Sesiones
│   │   ├── Manipulación de JWT
│   │   └── OAuth Inseguro
│   │
│   ├── M4. Protección de Datos y Control de Acceso (4 lecciones)
│   │   ├── Configuración Segura de TLS
│   │   ├── Cifrado de Datos con AES
│   │   ├── Role-Based Access Control (RBAC)
│   │   └── Attribute-Based Access Control (ABAC)
│   │
│   ├── M5. Configuración Segura y Registro (4 lecciones)
│   │   ├── Content Security Policy (CSP)
│   │   ├── HTTP Strict Transport Security (HSTS)
│   │   ├── Security Misconfiguration
│   │   └── Logging & Monitoring
│   │
│   └── M6. Seguridad en Librerías y Auditoría (4 lecciones)
│       ├── SAST
│       ├── DAST
│       ├── Dependency-Check
│       └── OWASP ZAP
│
├── LABORATORIOS (2)
│   ├── Lab SQL Injection (lab-sqli) → /labs/lab-sqli
│   └── DVWA (dvwa)                 → /labs/dvwa
│
├── RETOS (TODO)
│   └── /challenges    → Estructura vacía con TODO
│
├── RECURSOS
│   └── /resources     → Enlaces OWASP, herramientas, lecturas
│
├── GLOSARIO
│   └── /glossary      → Términos extraídos del contenido
│
├── INFORMACIÓN
│   ├── /about         → Sobre el curso y José Picón
│   ├── /changelog     → Historial de mejoras
│   └── /ethics        → Normas y ética (TODO)
│
└── BÚSQUEDA
    └── /search        → Búsqueda local (FlexSearch)
```

### 2.2 Rutas finales

| Ruta | Contenido |
|------|-----------|
| `/` | Home: presentación + CTA |
| `/start` | Empieza aquí |
| `/syllabus` | Mapa curricular |
| `/modules` | Listado de módulos |
| `/modules/[slug]` | Detalle de módulo |
| `/lessons/[slug]` | Lección individual |
| `/labs` | Listado de labs |
| `/labs/setup` | Cómo usar los labs |
| `/labs/[slug]` | Lab modo laboratorio (instrucciones + checklist) |
| `/challenges` | Retos (TODO) |
| `/resources` | Recursos |
| `/glossary` | Glosario |
| `/about` | Sobre el curso |
| `/changelog` | Changelog |
| `/ethics` | Normas y ética (TODO) |
| `/search` | Búsqueda |

---

## 3. PLAN DE IMPLEMENTACIÓN

### Fase 1: Estructura base (P0)

1. Reorganizar carpetas según spec: `/app`, `/content`, `/lib`, `/components`
2. Crear rutas core: `/`, `/start`, `/syllabus`, `/modules`, `/modules/[slug]`, `/lessons/[slug]`
3. Migrar contenido de `modulo*.ts` a estructura MDX o mantener TS con frontmatter equivalente
4. Sistema de navegación lateral (sidebar) con módulos y progreso
5. Breadcrumbs y Prev/Next en lecciones

### Fase 2: Laboratorios (P0)

1. Crear `/labs`, `/labs/setup`, `/labs/[slug]`
2. Modo lab: instrucciones izquierda, checklist/notas derecha
3. Checklist interactivo (localStorage)
4. Campo notas del alumno (localStorage)
5. Botón "Marcar paso completado"
6. Setup automático documentado (docker-compose)

### Fase 3: UX y componentes (P1)

1. Callouts (info, warning, danger, tip)
2. Bloques de código con botón copy
3. Tabs teoría/práctica
4. Acordeones para soluciones/hints
5. Badges (nivel, duración, tags)
6. Learning Path visual
7. Dark mode (ya existe, verificar)

### Fase 4: Búsqueda y contenido adicional (P1)

1. FlexSearch o similar: indexado en build
2. Página `/search` con UI
3. Glosario (términos extraídos)
4. Recursos (enlaces OWASP, herramientas)
5. Página About (José Picón)
6. Changelog

### Fase 5: Calidad y seguridad (P1)

1. SEO: metadatos, OG, sitemap, robots
2. Accesibilidad: ARIA, contraste, teclado
3. CSP en headers
4. Sanitización MDX
5. ESLint + Prettier
6. README actualizado

### Fase 6: TODOs y huecos (P2)

1. Estructura `/challenges` con TODO
2. Página `/ethics` con TODO
3. Quizzes (estructura con TODO)
4. Soluciones (estructura con TODO)

---

## 4. DECISIONES TÉCNICAS

- **Contenido:** Mantener `modulo*.ts` por ahora (ya funciona). Migrar a MDX en fase posterior si se prioriza.
- **Búsqueda:** FlexSearch (ligero, funciona en cliente)
- **Generación:** SSG (output: 'export') para velocidad y SEO
- **Navegación:** Sidebar tipo docs con estado de progreso en localStorage
- **Labs:** Vista split responsive (instrucciones | checklist)

---

## 5. CRÉDITOS

- **Autor:** José Picón
- **Material:** Para alumnos y práctica educativa
- **Licencia:** Uso educativo
