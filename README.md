# PPS Academy - Puesta y Producción Segura

Plataforma educativa de referencia para la asignatura **Puesta y Producción Segura** (autor: José Picón). Curso completo con teoría, laboratorios guiados, retos y recursos para aprender ciberseguridad web desde cero hasta nivel profesional.

## Despliegue rápido (recomendado)

```bash
docker compose up -d
```

**Accesos:**
- **Plataforma web**: http://localhost:3002
- **Empieza aquí**: http://localhost:3002/start
- **Mapa curricular**: http://localhost:3002/syllabus
- **Laboratorios**: http://localhost:3002/laboratorio
- **Lab SQL Injection** (modo guiado): http://localhost:3002/labs/lab-sqli
- **DVWA** (modo guiado): http://localhost:3002/labs/dvwa
- **Lab SQL Injection** (app vulnerable): http://localhost:8081
- **DVWA** (app vulnerable): http://localhost:4280 (admin / password)

---

## Instalación y ejecución

### Requisitos

- **Docker** con Compose V2 (`docker compose`)
- Node.js 18+ (recomendado 20; ver `.nvmrc`)

### Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

### Build estático (SSG)

```bash
npm run build
npm run serve
```

### Despliegue (Vercel recomendado)

1. Conecta el repositorio a Vercel
2. Configura `NEXT_PUBLIC_BASE_URL` con la URL de producción
3. Build: `npm run build` (Next.js detecta automáticamente)
4. Los laboratorios Docker se ejecutan localmente; la web es estática

---

## Cómo añadir contenido

### Añadir una lección

1. Edita el módulo en `src/content/modules/moduloN.ts`
2. Añade un objeto en `lessons` con: `id`, `title`, `slug`, `objectives`, `keyPoints`, `theory`, `practice` (opcional), `codeExamples` (opcional), `activity` (opcional)
3. Si hay lab asociado: `activity: { labId: 'lab-sqli' | 'dvwa', ... }`

### Añadir un laboratorio

1. Crea el entorno en `labs/nombre-lab/` (Dockerfile, etc.)
2. Añade el servicio en `docker-compose.yml` o `docker-compose.labs.yml`
3. Registra el lab en `src/app/labs/[slug]/page.tsx` (objeto `labs`)
4. Añade entrada en el sidebar en `src/components/Layout.tsx` (submenú Laboratorios)

### Estructura de contenido

- **Módulos**: `src/content/modules/modulo1.ts` … `modulo6.ts`
- **Glosario**: `src/content/glossary.ts`
- **Frontmatter** (en lecciones): `title`, `description`, `objectives`, `keyPoints`, `theory`, `practice`, `codeExamples`, `activity`

---

## Estructura del proyecto

```
pps/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── start/           # Empieza aquí
│   │   ├── syllabus/        # Mapa curricular
│   │   ├── modulos/         # Módulos y lecciones
│   │   ├── lessons/         # Lecciones (ruta plana)
│   │   ├── laboratorio/     # Listado labs
│   │   ├── labs/            # Modo lab guiado (checklist, notas)
│   │   ├── resources/       # Recursos externos
│   │   ├── glossary/        # Glosario
│   │   ├── search/          # Búsqueda
│   │   └── ...
│   ├── components/          # UI (Layout, LabView, Callout, CopyableCode, etc.)
│   ├── content/             # Módulos, glosario, registry
│   └── lib/                 # Navegación, helpers
├── labs/                    # Laboratorios Docker
│   └── sqli/                # Lab SQL Injection
├── docs/                    # Inventario, plan, auditoría
├── docker-compose.yml       # Todo en uno
└── docker-compose.labs.yml  # Solo laboratorios
```

---

## Checklist de seguridad (despliegue)

- [ ] No hay credenciales hardcodeadas (usar variables de entorno)
- [ ] Contenido MDX/Markdown sanitizado (react-markdown sin `dangerouslySetInnerHTML` directo)
- [ ] CSP razonable (documentar en headers si Nginx/Vercel)
- [ ] Dependencias actualizadas (`npm audit`)
- [ ] `NEXT_PUBLIC_BASE_URL` configurado en producción para sitemap/robots

---

## Contenido del curso

- **Módulo 1**: Introducción, OWASP Top Ten, Normativas
- **Módulo 2**: SQLi, XSS, CSRF, RCE, SSRF, XXE, LFI, RFI, Deserialización
- **Módulo 3**: Broken Auth, Sesiones, JWT, OAuth
- **Módulo 4**: TLS, AES, RBAC, ABAC
- **Módulo 5**: CSP, HSTS, Misconfiguration, Logging
- **Módulo 6**: SAST, DAST, Dependency-Check, OWASP ZAP

## Licencia

Uso educativo. Autor: José Picón.
