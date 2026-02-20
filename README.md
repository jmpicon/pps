# PPS - Plataforma de Estudio

Plataforma interactiva de estudio para el curso **Puesta y Producción Segura**. Incluye todo el temario teórico y práctico de los 6 módulos, con laboratorios Docker para practicar vulnerabilidades web.

## Contenido

- **Módulo 1**: Introducción a la Seguridad Web, OWASP Top Ten, Normativas
- **Módulo 2**: SQLi, XSS, CSRF, RCE, SSRF, XXE, LFI, RFI, Unsafe Deserialization
- **Módulo 3**: Broken Authentication, Gestión de Sesiones, JWT, OAuth
- **Módulo 4**: TLS, AES, RBAC, ABAC
- **Módulo 5**: CSP, HSTS, Security Misconfiguration, Logging & Monitoring
- **Módulo 6**: SAST, DAST, Dependency-Check, OWASP ZAP

## Requisitos

- Node.js 18+
- Docker y Docker Compose (para laboratorios)

## Instalación

```bash
npm install
```

## Uso

### Desarrollo web

```bash
npm run dev
```

Abre http://localhost:3000

### Producción (Docker)

```bash
docker-compose up -d
```

La plataforma estará en http://localhost:3000

### Solo laboratorios

```bash
docker-compose -f docker-compose.labs.yml up -d
```

- **DVWA**: http://localhost:4280 (admin / password)
- **Lab SQL Injection**: http://localhost:8081

### App ejecutable (Electron)

```bash
# Build estático
npm run build:static

# Linux
npm run electron:build:linux

# Windows
npm run electron:build:win

# macOS
npm run electron:build:mac
```

Los ejecutables se generan en `dist/`.

## Estructura del proyecto

```
pps/
├── src/
│   ├── app/              # Páginas Next.js
│   └── content/          # Contenido de los módulos
├── labs/                 # Laboratorios Docker
│   └── sqli/             # Lab SQL Injection
├── electron/             # Configuración Electron
├── docker-compose.yml    # Plataforma + laboratorios
└── docker-compose.labs.yml  # Solo laboratorios
```

## Laboratorios

Cada laboratorio incluye aplicaciones vulnerables intencionalmente para practicar explotación y mitigación:

1. **Lab SQL Injection**: Apache + PHP + MySQL. Modo vulnerable y seguro con prepared statements.
2. **DVWA**: Entorno completo con múltiples vulnerabilidades (SQLi, XSS, CSRF, LFI, RCE, etc.)

## Licencia

Uso educativo.
