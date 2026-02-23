import type { Module } from './index'

export const modulo4: Module = {
  id: 'modulo-4',
  number: 4,
  title: 'Protección de Datos y Control de Acceso',
  description: 'TLS, AES, RBAC y ABAC',
  icon: 'lock',
  lessons: [
    {
      id: 'm4-tls',
      title: 'Configuración Segura de TLS',
      slug: 'tls',
      objectives: [
        'Comprender TLS y HTTPS',
        'Configurar TLS 1.3 en servidor web',
        'Evitar ataques MITM y downgrade'
      ],
      keyPoints: [
        'TLS cifra la comunicación cliente-servidor',
        'TLS 1.0/1.1 obsoletos, usar 1.2/1.3',
        'HSTS fuerza HTTPS y previene downgrade'
      ],
      theory: `
## ¿Qué es TLS?

**Transport Layer Security** (sucesor de SSL) cifra la comunicación entre cliente y servidor. Garantiza confidencialidad e integridad de los datos en tránsito.

## TLS Handshake (resumido)

1. Cliente envía "Client Hello" con versiones y cifrados soportados.
2. Servidor responde con "Server Hello", certificado y clave pública.
3. Cliente verifica el certificado (cadena de confianza, no revocado).
4. Se establece clave de sesión (ECDHE, DHE para forward secrecy).
5. Comunicación cifrada con AES-GCM o similar.

## Versiones

- **TLS 1.0, 1.1**: Obsoletos, vulnerables. Deshabilitar.
- **TLS 1.2**: Seguro, ampliamente soportado.
- **TLS 1.3**: Más rápido, más seguro, sin negociación de algoritmos débiles.

## Configuración en Nginx

\`\`\`nginx
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
ssl_prefer_server_ciphers off;
\`\`\`

## HSTS (HTTP Strict Transport Security)

Cabecera que indica al navegador que solo use HTTPS para ese dominio durante un tiempo:

\`\`\`
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
\`\`\`

Previene ataques de downgrade a HTTP y MITM.
      `,
      activity: {
        title: 'Configuración Segura de TLS',
        objective: 'Configurar TLS en servidor y verificar con SSL Labs',
        labId: 'lab-sqli',
        steps: [
          'Configurar Nginx o Apache con certificado (Let\'s Encrypt o self-signed para pruebas)',
          'Deshabilitar TLS 1.0 y 1.1',
          'Añadir cabecera HSTS',
          'Verificar en https://www.ssllabs.com/ssltest/'
        ]
      }
    },
    {
      id: 'm4-aes',
      title: 'Cifrado de Datos con AES',
      slug: 'aes',
      objectives: [
        'Comprender cifrado simétrico',
        'Implementar AES-256 para datos en reposo',
        'Gestionar claves de forma segura'
      ],
      keyPoints: [
        'AES: estándar de cifrado simétrico',
        'AES-256 recomendado para datos sensibles',
        'AES-GCM preferible a CBC (autenticación integrada)'
      ],
      theory: `
## Cifrado Simétrico

La misma clave cifra y descifra. AES (Advanced Encryption Standard) es el estándar actual. Tamaños de clave: 128, 192, 256 bits.

## AES-GCM

**Galois/Counter Mode** proporciona cifrado y autenticación (evita manipulación). Preferible a CBC + HMAC.

## Ejemplo en Python (PyCryptodome)

\`\`\`python
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
import os

key = get_random_bytes(32)  # AES-256
cipher = AES.new(key, AES.MODE_GCM)
ciphertext, tag = cipher.encrypt_and_digest(b"Datos sensibles")

# Para descifrar: necesitas nonce (cipher.nonce), tag, ciphertext, key
\`\`\`

## Buenas Prácticas

- **Nunca** claves en código fuente ni en repositorios.
- Usar **key management** (AWS KMS, HashiCorp Vault) en producción.
- Mínimo 256 bits para datos sensibles.
- IV/Nonce único por operación, nunca reutilizar.
      `,
      codeExamples: [
        {
          title: 'Cifrado AES-GCM en Python',
          code: `from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes

key = get_random_bytes(32)
nonce = get_random_bytes(12)
cipher = AES.new(key, AES.MODE_GCM, nonce=nonce)
ciphertext, tag = cipher.encrypt_and_digest(b"Datos sensibles")

# Almacenar: nonce + tag + ciphertext`,
          language: 'python'
        }
      ],
      activity: {
        title: 'Cifrado de Datos Sensibles con AES',
        objective: 'Implementar cifrado para datos en reposo',
        labId: 'lab-sqli',
        steps: [
          'Crear script que cifre un archivo con AES-256-GCM',
          'Implementar derivación de clave desde contraseña (Argon2)',
          'Nunca commitear claves; usar variables de entorno'
        ]
      }
    },
    {
      id: 'm4-rbac',
      title: 'Role-Based Access Control (RBAC)',
      slug: 'rbac',
      objectives: [
        'Comprender RBAC',
        'Implementar roles y permisos en API',
        'Aplicar middleware de autorización'
      ],
      keyPoints: [
        'Permisos según rol: admin, usuario, invitado',
        'Fácil de implementar y auditar',
        'Menos flexible que ABAC para casos complejos'
      ],
      theory: `
## Modelo RBAC

Los usuarios tienen **roles** (admin, editor, viewer). Los roles tienen **permisos** asociados (crear, leer, actualizar, eliminar). La autorización se basa en "¿este usuario tiene el rol que permite esta acción?".

## Ejemplo en Base de Datos

\`\`\`sql
CREATE TABLE roles (id INT, name VARCHAR(50));
CREATE TABLE permissions (id INT, resource VARCHAR(50), action VARCHAR(50));
CREATE TABLE role_permissions (role_id INT, permission_id INT);
CREATE TABLE user_roles (user_id INT, role_id INT);
\`\`\`

## En API (middleware)

\`\`\`python
def require_role(role):
    def decorator(f):
        def wrapper(*args, **kwargs):
            if current_user.role != role:
                return {"error": "Forbidden"}, 403
            return f(*args, **kwargs)
        return wrapper
    return decorator

@require_role("admin")
def delete_user(user_id):
    ...
\`\`\`

## Limitaciones

RBAC no maneja bien reglas como "puede editar solo sus propios documentos" o "acceso en horario laboral". Para eso se usa ABAC.
      `,
      activity: {
        title: 'Implementación de RBAC',
        objective: 'Implementar RBAC en API',
        labId: 'lab-sqli',
        steps: [
          'Definir roles: admin, user, guest con permisos distintos',
          'Crear middleware/decorador que verifique rol antes de ejecutar endpoint',
          'Proteger rutas administrativas con require_role("admin")'
        ]
      }
    },
    {
      id: 'm4-abac',
      title: 'Attribute-Based Access Control (ABAC)',
      slug: 'abac',
      objectives: [
        'Comprender ABAC',
        'Implementar políticas por atributos',
        'Comparar con RBAC'
      ],
      keyPoints: [
        'Decisiones por atributos: usuario, recurso, contexto',
        'Más flexible que RBAC',
        'Complejo de administrar y auditar'
      ],
      theory: `
## Modelo ABAC

La autorización se basa en **atributos** del sujeto (usuario), recurso, acción y contexto. Ejemplo: "Permitir si usuario.role=manager Y recurso.department=usuario.department Y hora in work_hours".

## Política ABAC (ejemplo)

\`\`\`json
{
  "rule": "allow",
  "conditions": [
    {"user.role": "manager"},
    {"resource.owner": "user.id"},
    {"context.ip_range": "office_network"}
  ]
}
\`\`\`

## RBAC vs ABAC

| Aspecto | RBAC | ABAC |
|---------|------|------|
| Base | Roles estáticos | Atributos dinámicos |
| Flexibilidad | Baja | Alta |
| Complejidad | Baja | Alta |
| Casos de uso | Permisos simples | Reglas contextuales |

## Herramientas

XACML (estándar), políticas en JSON/YAML, motores como OPA (Open Policy Agent).
      `,
      activity: {
        title: 'Implementación de ABAC',
        objective: 'Implementar política ABAC básica',
        labId: 'lab-sqli',
        steps: [
          'Definir atributos: user.role, user.department, resource.owner',
          'Implementar función que evalúe condiciones antes de permitir acceso',
          'Probar: usuario solo puede editar recursos cuyo owner coincide'
        ]
      }
    }
  ]
}
