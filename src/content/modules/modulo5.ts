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
      objectives: [
        'Comprender CSP y su función',
        'Implementar políticas restrictivas',
        'Proteger contra XSS e inyecciones'
      ],
      keyPoints: [
        'Restringe qué contenido puede cargarse (scripts, estilos, imágenes)',
        'Protege contra XSS e inyección de recursos',
        'Evitar unsafe-inline y unsafe-eval'
      ],
      theory: `
## ¿Qué es CSP?

**Content Security Policy** es una cabecera HTTP que indica al navegador qué recursos puede cargar y ejecutar. Reduce el impacto de XSS al bloquear scripts inline no autorizados y recursos de dominios no confiables.

## Cabecera CSP Básica

\`\`\`
Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' 'unsafe-inline'
\`\`\`

- **default-src 'self'**: Por defecto, solo recursos del mismo origen.
- **script-src**: De dónde pueden cargarse scripts. \`'unsafe-inline'\` y \`'unsafe-eval'\` debilitan la protección.
- **style-src**: Hojas de estilo. \`'unsafe-inline'\` a veces necesario para estilos dinámicos.

## Modos

- **Enforcing**: El navegador bloquea lo no permitido.
- **Report-Only**: Solo reporta violaciones, no bloquea. Útil para probar antes de activar.

\`\`\`
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-report
\`\`\`

## Nonces y Hashes

Para permitir scripts inline específicos sin \`unsafe-inline\`:

\`\`\`html
<script nonce="abc123">...</script>
\`\`\`

\`\`\`
Content-Security-Policy: script-src 'nonce-abc123'
\`\`\`

O usar hash del contenido del script.
      `,
      activity: {
        title: 'Implementación de CSP',
        objective: 'Aplicar CSP restrictiva',
        labId: 'lab-sqli',
        steps: [
          'Añadir cabecera CSP en servidor (Nginx/Apache o middleware)',
          'Empezar con Report-Only y revisar reportes en consola',
          'Eliminar unsafe-inline progresivamente usando nonces',
          'Activar modo enforcing cuando no haya violaciones legítimas'
        ]
      }
    },
    {
      id: 'm5-hsts',
      title: 'HTTP Strict Transport Security (HSTS)',
      slug: 'hsts',
      objectives: [
        'Comprender HSTS',
        'Configurar cabecera correctamente',
        'Prevenir downgrade a HTTP'
      ],
      keyPoints: [
        'Fuerza uso de HTTPS en el navegador',
        'Previene MITM y downgrade attacks',
        'max-age, includeSubDomains, preload'
      ],
      theory: `
## ¿Qué es HSTS?

Cuando el servidor envía la cabecera HSTS, el navegador **recordará** que ese dominio debe usarse solo por HTTPS durante el tiempo indicado. Las peticiones HTTP se redirigirán internamente a HTTPS antes de enviarse.

## Cabecera

\`\`\`
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
\`\`\`

- **max-age=31536000**: 1 año en segundos.
- **includeSubDomains**: Aplica a todos los subdominios.
- **preload**: Permite incluir el dominio en la lista de preload de navegadores (chrome, Firefox). El navegador ya conoce HSTS antes de la primera visita.

## Preload List

Para estar en la lista de preload: https://hstspreload.org/. Requiere includeSubDomains y max-age mínimo 31536000.

## Importante

Asegúrate de que HTTPS funciona correctamente antes de activar HSTS. Si el certificado falla, el usuario no podrá acceder (navegador bloqueará).
      `,
      activity: {
        title: 'Implementación de HSTS',
        objective: 'Configurar HSTS',
        labId: 'lab-sqli',
        steps: [
          'Añadir cabecera Strict-Transport-Security en servidor',
          'Verificar en DevTools > Network > Headers de respuesta',
          'Documentar requisitos para hstspreload.org si se desea preload'
        ]
      }
    },
    {
      id: 'm5-misconfiguration',
      title: 'Security Misconfiguration',
      slug: 'security-misconfiguration',
      objectives: [
        'Identificar configuraciones inseguras',
        'Aplicar hardening de servidor',
        'Usar herramientas de auditoría'
      ],
      keyPoints: [
        'Consolas de administración sin autenticación',
        'Contraseñas por defecto, directorios listables',
        'Herramientas: OWASP ZAP, Nmap, Lynis'
      ],
      theory: `
## Ejemplos de Misconfiguration

- **/admin/** accesible sin autenticación.
- **Directorios listables**: Ver contenido de carpetas.
- **Credenciales por defecto** en bases de datos o paneles.
- **Mensajes de error detallados** que revelan rutas, versiones, stack traces.
- **Cabeceras innecesarias**: X-Powered-By, Server con versión.
- **Software desactualizado** con vulnerabilidades conocidas.

## Hardening

### Servidor Web
- Deshabilitar listado de directorios.
- Páginas de error genéricas en producción.
- Eliminar archivos de ejemplo y documentación.

### Base de Datos
- Cambiar contraseñas por defecto.
- Usuario con permisos mínimos (no root).
- Restringir acceso por red (solo localhost si aplica).

### Herramientas
- **Lynis**: Auditoría de hardening en Linux.
- **Nmap**: Escaneo de puertos y servicios.
- **OWASP ZAP**: Escaneo de aplicaciones web.
      `,
      activity: {
        title: 'Identificación y Corrección de Security Misconfiguration',
        objective: 'Auditar y corregir configuraciones',
        labId: 'lab-sqli',
        steps: [
          'Ejecutar Lynis en un servidor Linux y revisar recomendaciones',
          'Escaneo con OWASP ZAP contra la aplicación',
          'Revisar que no haya /phpinfo, /admin sin auth, etc.',
          'Documentar checklist de hardening'
        ]
      }
    },
    {
      id: 'm5-logging',
      title: 'Logging & Monitoring',
      slug: 'logging-monitoring',
      objectives: [
        'Implementar logging de seguridad',
        'Configurar monitoreo y alertas',
        'Detección de ataques e incidentes'
      ],
      keyPoints: [
        'Registrar intentos de login fallidos, acciones administrativas',
        'Formato estructurado (JSON) para análisis',
        'SIEM: Splunk, ELK, Graylog'
      ],
      theory: `
## Eventos a Registrar

- Intentos de login fallidos (usuario, IP, timestamp).
- Cambios de contraseña y permisos.
- Acciones administrativas (crear, eliminar usuarios, etc.).
- Errores 500 y excepciones.
- Acceso a recursos sensibles.

## Formato Estructurado

\`\`\`json
{
  "timestamp": "2024-03-06T12:00:00Z",
  "event": "failed_login",
  "username": "admin",
  "ip_address": "192.168.1.100",
  "user_agent": "Mozilla/5.0..."
}
\`\`\`

Facilita búsquedas y correlación en SIEM.

## Fail2Ban

Herramienta que monitorea logs y bloquea IPs con múltiples intentos fallidos (ej: 5 intentos de SSH o login web en 10 minutos).

## Alertas

Configurar alertas para:
- Múltiples logins fallidos desde misma IP.
- Acceso desde ubicaciones inusuales.
- Cambios en permisos o configuración.
      `,
      activity: {
        title: 'Implementación de Logging & Monitoring',
        objective: 'Implementar logging estructurado',
        labId: 'lab-sqli',
        steps: [
          'Añadir logging de intentos de login (éxito y fallo) en formato JSON',
          'Configurar rotación de logs (logrotate)',
          'Documentar uso de Fail2Ban o equivalente',
          'Definir qué eventos generarían alertas'
        ]
      }
    }
  ]
}
