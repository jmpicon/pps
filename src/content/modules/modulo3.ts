import type { Module } from './index'

export const modulo3: Module = {
  id: 'modulo-3',
  number: 3,
  title: 'Autenticación y Gestión de Sesiones',
  description: 'Broken Auth, sesiones, JWT y OAuth',
  icon: 'key',
  lessons: [
    {
      id: 'm3-broken-auth',
      title: 'Broken Authentication',
      slug: 'broken-authentication',
      objectives: ['Identificar vulnerabilidades de autenticación', 'Comprender fuerza bruta y credential stuffing', 'Implementar MFA y políticas de contraseñas'],
      keyPoints: [
        'Contraseñas débiles o filtradas',
        'Fuerza bruta y credential stuffing',
        'Mitigación: MFA, bcrypt, bloqueo de intentos'
      ],
      theory: `
## Broken Authentication

Sistema de autenticación vulnerable que permite acceso sin credenciales válidas.

### Ataques Comunes
- **Fuerza Bruta**: Probar múltiples contraseñas (Hydra, Burp)
- **Credential Stuffing**: Usar credenciales filtradas de otros sitios
- **Enumeración de usuarios**: Detectar usuarios existentes por respuestas diferentes

### Mitigación
- Políticas de contraseñas fuertes
- MFA/2FA
- Respuestas genéricas ("Credenciales incorrectas")
- Bloqueo tras intentos fallidos
      `,
      activity: {
        title: 'Explotación y Mitigación de Broken Authentication',
        objective: 'Explorar autenticación débil y aplicar soluciones',
        labId: 'lab-broken-auth',
        steps: ['Crear login vulnerable', 'Probar fuerza bruta', 'Implementar MFA y bloqueo']
      }
    },
    {
      id: 'm3-sessions',
      title: 'Gestión Insegura de Sesiones',
      slug: 'gestion-sesiones',
      objectives: ['Comprender riesgos de sesiones', 'Implementar cookies seguras', 'Prevenir Session Hijacking y Fixation'],
      keyPoints: [
        'HttpOnly, Secure, SameSite en cookies',
        'Regenerar ID tras login (anti Session Fixation)',
        'Expiración y cierre de sesión'
      ],
      theory: `
## Cookies Seguras

- **HttpOnly**: Evita acceso desde JavaScript (anti-XSS)
- **Secure**: Solo por HTTPS
- **SameSite**: Previene CSRF

## Mejores Prácticas
- Regenerar ID de sesión tras autenticación
- Expiración corta en sesiones inactivas
- Cierre de sesión en múltiples dispositivos
      `,
      activity: {
        title: 'Explotación y Mitigación de Gestión Insegura de Sesiones',
        objective: 'Identificar riesgos y mitigar secuestro de sesiones',
        labId: 'lab-sessions',
        steps: ['Crear sesiones sin HttpOnly', 'Explotar robo de cookies via XSS', 'Implementar cookies seguras']
      }
    },
    {
      id: 'm3-jwt',
      title: 'Manipulación de JWT',
      slug: 'jwt',
      objectives: ['Comprender estructura JWT', 'Identificar vulnerabilidades', 'Implementar JWT seguro'],
      keyPoints: [
        'Header.Payload.Signature',
        'Evitar algoritmo "none"',
        'Incluir exp (expiración)'
      ],
      theory: `
## Estructura JWT

\`\`\`json
Header: {"alg":"HS256","typ":"JWT"}
Payload: {"sub":"user123","role":"admin"}
Signature: HMACSHA256(base64(header).base64(payload), secret)
\`\`\`

### Riesgos
- Algoritmo "none" o HS256 débil
- Sin expiración
- Información sensible en payload

### Mitigación
- RS256 en lugar de HS256
- Incluir exp, iat
- No almacenar datos sensibles
      `,
      activity: {
        title: 'Manipulación de JWT y cómo protegerlo',
        objective: 'Explorar manipulación de JWT y aplicar protección',
        labId: 'lab-jwt',
        steps: ['Crear API con JWT', 'Probar algoritmo none', 'Implementar validación estricta']
      }
    },
    {
      id: 'm3-oauth',
      title: 'OAuth Inseguro',
      slug: 'oauth',
      objectives: ['Comprender OAuth 2.0', 'Identificar errores en implementación', 'Implementar OAuth seguro'],
      keyPoints: [
        'Authorization Code Flow es más seguro',
        'Evitar Implicit Flow',
        'OpenID Connect para autenticación'
      ],
      theory: `
## OAuth 2.0 vs OpenID Connect

- **OAuth**: Autorización (acceso a recursos)
- **OIDC**: Extiende OAuth con autenticación (id_token)

### Flujos
- **Authorization Code**: Más seguro, redirecciones
- **Implicit**: Menos seguro, tokens en URL
      `,
      activity: {
        title: 'Explotación y Mitigación de OAuth Inseguro',
        objective: 'Identificar errores OAuth y mitigarlos',
        labId: 'lab-oauth',
        steps: ['Implementar OAuth básico', 'Identificar vulnerabilidades', 'Aplicar best practices']
      }
    }
  ]
}
