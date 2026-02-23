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
      objectives: [
        'Identificar vulnerabilidades de autenticación',
        'Comprender fuerza bruta y credential stuffing',
        'Implementar MFA y políticas de contraseñas'
      ],
      keyPoints: [
        'Contraseñas débiles o filtradas en brechas',
        'Fuerza bruta y credential stuffing',
        'Mitigación: MFA, bcrypt/Argon2, bloqueo de intentos'
      ],
      theory: `
## Broken Authentication

Los fallos de autenticación permiten a los atacantes comprometer contraseñas, tokens o sesiones, o explotar fallos en la implementación para suplantar identidades.

## Ataques Comunes

### Fuerza Bruta
Probar sistemáticamente muchas contraseñas. Herramientas: Hydra, Burp Intruder. Efectivo contra contraseñas débiles.

### Credential Stuffing
Usar credenciales filtradas de otras brechas (ej: colecciones de "user:password" de LinkedIn, Adobe). Los usuarios reutilizan contraseñas.

### Enumeración de Usuarios
Respuestas diferentes ("Usuario no existe" vs "Contraseña incorrecta") revelan qué usuarios existen. Facilita ataques dirigidos.

### Contraseñas por Defecto
admin/admin, root/root, dispositivos IoT con credenciales hardcodeadas.

## Mitigación

### Almacenamiento de Contraseñas
- **bcrypt**, **Argon2** o **scrypt** con cost factor adecuado.
- **Nunca** MD5, SHA1 ni SHA256 sin salt para contraseñas.
- Salt único por usuario, generado aleatoriamente.

### Políticas
- Longitud mínima 12 caracteres.
- Complejidad: mayúsculas, minúsculas, números, símbolos (o passphrase larga).
- No permitir contraseñas de brechas conocidas (Have I Been Pwned API).

### MFA (Multi-Factor Authentication)
Segundo factor: TOTP (Google Authenticator), SMS (menos seguro), hardware keys (FIDO2).

### Bloqueo y Rate Limiting
- Bloquear tras 5-10 intentos fallidos (por usuario y por IP).
- CAPTCHA tras varios intentos.
- Respuestas genéricas: "Credenciales incorrectas" (no revelar si el usuario existe).
      `,
      activity: {
        title: 'Explotación y Mitigación de Broken Authentication',
        objective: 'Explorar autenticación débil en DVWA',
        labId: 'dvwa',
        steps: [
          'En DVWA Brute Force, usar Burp o Hydra para probar contraseñas',
          'Implementar bloqueo tras 5 intentos fallidos',
          'Añadir delay entre intentos (throttling)',
          'Documentar uso de password_hash() y password_verify() en PHP'
        ]
      }
    },
    {
      id: 'm3-sessions',
      title: 'Gestión Insegura de Sesiones',
      slug: 'gestion-sesiones',
      objectives: [
        'Comprender riesgos de sesiones',
        'Implementar cookies seguras (HttpOnly, Secure, SameSite)',
        'Prevenir Session Hijacking y Fixation'
      ],
      keyPoints: [
        'HttpOnly: evita acceso desde JavaScript (anti-XSS)',
        'Secure: solo por HTTPS',
        'SameSite: previene CSRF'
      ],
      theory: `
## Cookies de Sesión Seguras

### HttpOnly
\`Set-Cookie: session=xxx; HttpOnly\`

Impide que JavaScript acceda a la cookie. Si hay XSS, el atacante no puede robar la cookie de sesión con \`document.cookie\`.

### Secure
\`Set-Cookie: session=xxx; Secure\`

La cookie solo se envía por HTTPS. Evita que se transmita por canales no cifrados.

### SameSite
\`Set-Cookie: session=xxx; SameSite=Strict\`

- **Strict**: La cookie no se envía en peticiones cross-site. Máxima protección CSRF.
- **Lax**: Se envía en navegación top-level (links), no en POST cross-site.
- **None**: Se envía siempre (requiere Secure). Solo si necesitas cross-site (ej: widgets).

## Session Fixation

El atacante fija un ID de sesión conocido y hace que la víctima lo use. Tras el login, el atacante usa ese mismo ID.

**Mitigación**: Regenerar el ID de sesión al autenticarse (\`session_regenerate_id(true)\` en PHP).

## Session Hijacking

Robar el ID de sesión (XSS, sniffing, etc.) y usarlo para suplantar al usuario.

**Mitigación**: HttpOnly, HTTPS, regenerar ID tras login, expiración corta.

## Mejores Prácticas

- Expiración de sesión inactiva: 15-30 minutos.
- Cierre de sesión en todos los dispositivos al cambiar contraseña.
- Rotar ID de sesión periódicamente en aplicaciones sensibles.
      `,
      activity: {
        title: 'Explotación y Mitigación de Gestión Insegura de Sesiones',
        objective: 'Identificar riesgos y mitigar secuestro de sesiones',
        labId: 'dvwa',
        steps: [
          'Revisar cookies de sesión en DevTools: ¿tienen HttpOnly, Secure, SameSite?',
          'Si hay XSS, intentar document.cookie para robar sesión',
          'Configurar session.cookie_httponly, session.cookie_secure en PHP',
          'Implementar session_regenerate_id() tras login'
        ]
      }
    },
    {
      id: 'm3-jwt',
      title: 'Manipulación de JWT',
      slug: 'jwt',
      objectives: [
        'Comprender estructura JWT (Header.Payload.Signature)',
        'Identificar vulnerabilidades (alg:none, weak secret)',
        'Implementar JWT seguro'
      ],
      keyPoints: [
        'Header.Payload.Signature en Base64',
        'Evitar algoritmo "none" o "HS256" con secret débil',
        'Incluir exp (expiración) e iat (emitido en)'
      ],
      theory: `
## Estructura JWT

Un JWT tiene tres partes en Base64URL separadas por puntos:

\`\`\`
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMTIzIn0.signature
\`\`\`

### Header
\`\`\`json
{"alg":"HS256","typ":"JWT"}
\`\`\`

### Payload
\`\`\`json
{"sub":"user123","role":"admin","exp":1700000000}
\`\`\`

### Signature
HMAC-SHA256(base64(header) + "." + base64(payload), secret)

## Vulnerabilidades

### Algoritmo "none"
Cambiar \`alg\` a \`none\` y eliminar la firma. Algunas librerías aceptan tokens sin verificar.

### Confusión de algoritmos
Si el servidor espera RS256 (firma asimétrica) pero acepta HS256, el atacante puede firmar con la clave pública (que es conocida) como si fuera el secret de HS256.

### Secret débil
Fuerza bruta del secret en HS256 con diccionarios comunes.

### Sin expiración
Tokens que no expiran permiten uso indefinido si se filtran.

## Mitigación

- Usar **RS256** (clave privada en servidor, pública para verificar).
- Validar explícitamente el algoritmo (rechazar "none" y algoritmos no esperados).
- Incluir \`exp\`, \`iat\`, \`iss\` (issuer).
- No almacenar datos sensibles en el payload (es Base64, no cifrado).
      `,
      activity: {
        title: 'Manipulación de JWT y cómo protegerlo',
        objective: 'Explorar vulnerabilidades JWT',
        labId: 'dvwa',
        steps: [
          'Usar jwt.io para decodificar un JWT de una API',
          'Intentar cambiar alg a none y eliminar firma (si la API es vulnerable)',
          'Implementar validación estricta del algoritmo en el backend',
          'Añadir expiración corta (ej: 15 min) y refresh tokens'
        ]
      }
    },
    {
      id: 'm3-oauth',
      title: 'OAuth Inseguro',
      slug: 'oauth',
      objectives: [
        'Comprender OAuth 2.0 y OpenID Connect',
        'Identificar errores en implementación',
        'Implementar OAuth seguro'
      ],
      keyPoints: [
        'Authorization Code Flow es el más seguro',
        'Evitar Implicit Flow (tokens en URL)',
        'OpenID Connect añade capa de autenticación'
      ],
      theory: `
## OAuth 2.0 vs OpenID Connect

**OAuth 2.0** es un protocolo de **autorización** (acceso a recursos). **OpenID Connect (OIDC)** extiende OAuth con **autenticación** (identidad del usuario) mediante el \`id_token\` (JWT).

## Flujos OAuth

### Authorization Code (recomendado)
1. Usuario es redirigido al proveedor (Google, GitHub).
2. Tras autenticarse, vuelve con un \`code\` en la URL.
3. El backend intercambia el \`code\` por tokens (server-to-server).
4. El \`access_token\` nunca aparece en el navegador.

### Implicit (deprecado)
El \`access_token\` se devuelve directamente en el fragmento de la URL. Vulnerable a robo si hay XSS o el token queda en historial.

### Client Credentials
Para máquina a máquina. No hay usuario final.

## Vulnerabilidades Comunes

- **Redirect URI manipulation**: El atacante cambia el redirect_uri para recibir el code.
- **State parameter**: Falta de \`state\` permite CSRF en el flujo OAuth.
- **Token leakage**: Tokens en referrer, logs, etc.

## Mitigación

- Validar \`redirect_uri\` contra whitelist estricta.
- Usar parámetro \`state\` aleatorio para prevenir CSRF.
- Authorization Code + PKCE para aplicaciones SPA.
- Usar OpenID Connect cuando necesites autenticación (no solo autorización).
      `,
      activity: {
        title: 'Explotación y Mitigación de OAuth Inseguro',
        objective: 'Identificar errores OAuth',
        labId: 'dvwa',
        steps: [
          'Revisar flujo OAuth de una app (ej: "Login with Google")',
          'Comprobar que redirect_uri está validado',
          'Verificar presencia del parámetro state',
          'Documentar uso de PKCE en aplicaciones públicas'
        ]
      }
    }
  ]
}
