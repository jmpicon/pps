import type { Module } from './index'

export const modulo5: Module = {
  id: 'modulo-5',
  number: 5,
  title: 'Configuración Segura y Registro',
  description: 'CSP, HSTS, Security Misconfiguration y Logging',
  icon: 'settings',
  lessons: [
    {
      id: 'm5-csp',
      title: 'Content Security Policy (CSP)',
      slug: 'csp',
      objectives: ['Comprender CSP', 'Implementar políticas restrictivas', 'Proteger contra XSS'],
      keyPoints: [
        'Restringe qué contenido puede cargarse',
        'Protege contra XSS e inyecciones',
        'Evitar unsafe-inline y unsafe-eval'
      ],
      theory: `
## Cabecera CSP Básica

\`\`\`
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com
\`\`\`

### Modos
- **Report-Only**: Prueba sin bloquear
- **Strict**: Bloquea lo no permitido

### Buenas Prácticas
- No usar unsafe-inline ni unsafe-eval
- Principio de menor privilegio
      `,
      activity: {
        title: 'Implementación de CSP',
        objective: 'Aplicar CSP restrictiva y evaluar impacto',
        labId: 'lab-csp',
        steps: ['Configurar CSP en servidor', 'Probar con Report-Only', 'Activar modo estricto']
      }
    },
    {
      id: 'm5-hsts',
      title: 'HTTP Strict Transport Security (HSTS)',
      slug: 'hsts',
      objectives: ['Comprender HSTS', 'Configurar cabecera', 'Prevenir downgrade a HTTP'],
      keyPoints: [
        'Fuerza uso de HTTPS',
        'Previene MITM y downgrade',
        'max-age, includeSubDomains, preload'
      ],
      theory: `
## Configuración HSTS

\`\`\`
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
\`\`\`

- **max-age**: 1 año
- **includeSubDomains**: Todos los subdominios
- **preload**: Lista de navegadores
      `,
      activity: {
        title: 'Implementación de HSTS',
        objective: 'Configurar HSTS para forzar HTTPS',
        labId: 'lab-hsts',
        steps: ['Configurar cabecera HSTS', 'Verificar en navegador', 'Registrar en HSTS preload']
      }
    },
    {
      id: 'm5-misconfiguration',
      title: 'Security Misconfiguration',
      slug: 'security-misconfiguration',
      objectives: ['Identificar configuraciones inseguras', 'Aplicar hardening', 'Usar herramientas de auditoría'],
      keyPoints: [
        'Consolas sin autenticación',
        'Contraseñas por defecto',
        'Herramientas: OWASP ZAP, Nmap, Lynis'
      ],
      theory: `
## Ejemplos de Misconfiguration

- /admin/ accesible sin auth
- Directorios listables
- Credenciales por defecto en BD

### Mitigación
- Firewalls y autenticación
- Eliminar archivos innecesarios
- Escaneos periódicos
      `,
      activity: {
        title: 'Identificación y Corrección de Security Misconfiguration',
        objective: 'Detectar y corregir configuraciones inseguras',
        labId: 'lab-misconfiguration',
        steps: ['Auditar servidor con Lynis', 'Identificar vulnerabilidades', 'Aplicar correcciones']
      }
    },
    {
      id: 'm5-logging',
      title: 'Logging & Monitoring',
      slug: 'logging-monitoring',
      objectives: ['Implementar logging de seguridad', 'Configurar monitoreo', 'Detección de ataques'],
      keyPoints: [
        'Registrar intentos fallidos',
        'Acciones administrativas',
        'SIEM: Splunk, ELK, Graylog'
      ],
      theory: `
## Eventos a Registrar

\`\`\`json
{
  "timestamp": "2024-03-06T12:00:00Z",
  "event": "Failed login attempt",
  "username": "admin",
  "ip_address": "192.168.1.100"
}
\`\`\`

### Fail2Ban
Bloquear IPs con múltiples intentos fallidos.
      `,
      activity: {
        title: 'Implementación de Logging & Monitoring',
        objective: 'Implementar logging y detección de eventos sospechosos',
        labId: 'lab-logging',
        steps: ['Configurar logging estructurado', 'Implementar Fail2Ban', 'Configurar alertas']
      }
    }
  ]
}
