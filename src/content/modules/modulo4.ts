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
      objectives: ['Comprender TLS y HTTPS', 'Configurar TLS 1.3', 'Evitar MITM'],
      keyPoints: [
        'TLS cifra comunicación cliente-servidor',
        'TLS 1.0/1.1 obsoletos',
        'TLS 1.2/1.3 recomendados'
      ],
      theory: `
## TLS Handshake

1. Intercambio de versiones y algoritmos
2. Generación de clave de sesión (RSA, ECDH)
3. Canal cifrado con AES-GCM

### Buenas Prácticas
- Deshabilitar TLS 1.0 y 1.1
- Certificados de Let's Encrypt
- HSTS para forzar HTTPS
      `,
      activity: {
        title: 'Configuración Segura de TLS',
        objective: 'Configurar TLS 1.3 en servidor web',
        labId: 'lab-tls',
        steps: ['Configurar Apache/Nginx con TLS', 'Verificar con SSL Labs', 'Implementar HSTS']
      }
    },
    {
      id: 'm4-aes',
      title: 'Cifrado de Datos con AES',
      slug: 'aes',
      objectives: ['Comprender cifrado simétrico', 'Implementar AES-256', 'Proteger datos en reposo'],
      keyPoints: [
        'AES: estándar de cifrado simétrico',
        'AES-256 recomendado',
        'Preferir AES-GCM sobre CBC'
      ],
      theory: `
## Cifrado AES en Python

\`\`\`python
from Crypto.Cipher import AES
import os
key = os.urandom(32)  # AES-256
cipher = AES.new(key, AES.MODE_GCM)
ciphertext, tag = cipher.encrypt_and_digest(b"Mensaje secreto")
\`\`\`

### Buenas Prácticas
- Nunca claves en código fuente
- Mínimo 256 bits
- AES-GCM > AES-CBC
      `,
      codeExamples: [
        {
          title: 'Cifrado AES-GCM',
          code: `from Crypto.Cipher import AES
import os
key = os.urandom(32)
cipher = AES.new(key, AES.MODE_GCM)
ciphertext, tag = cipher.encrypt_and_digest(b"Datos sensibles")`,
          language: 'python'
        }
      ],
      activity: {
        title: 'Cifrado de Datos Sensibles con AES',
        objective: 'Usar AES para cifrar y descifrar datos',
        labId: 'lab-aes',
        steps: ['Implementar cifrado AES-256', 'Cifrar datos sensibles', 'Gestionar claves de forma segura']
      }
    },
    {
      id: 'm4-rbac',
      title: 'Role-Based Access Control (RBAC)',
      slug: 'rbac',
      objectives: ['Comprender RBAC', 'Implementar roles y permisos', 'Aplicar en API'],
      keyPoints: [
        'Permisos según rol del usuario',
        'Admin, Usuario, Invitado',
        'Fácil de implementar'
      ],
      theory: `
## Ejemplo RBAC en SQL

\`\`\`sql
CREATE ROLE admin;
GRANT SELECT, INSERT, DELETE ON users TO admin;
\`\`\`

### En API
- Middleware que verifica rol
- Decoradores @require_role('admin')
      `,
      activity: {
        title: 'Implementación de RBAC',
        objective: 'Implementar RBAC en API Flask',
        labId: 'lab-rbac',
        steps: ['Definir roles y permisos', 'Crear middleware de autorización', 'Proteger endpoints']
      }
    },
    {
      id: 'm4-abac',
      title: 'Attribute-Based Access Control (ABAC)',
      slug: 'abac',
      objectives: ['Comprender ABAC', 'Implementar políticas por atributos', 'Comparar con RBAC'],
      keyPoints: [
        'Decisiones por atributos (edad, ubicación, etc.)',
        'Más flexible que RBAC',
        'Complejo de administrar'
      ],
      theory: `
## Política ABAC

\`\`\`json
{
  "user": "JohnDoe",
  "resource": "confidential_report.pdf",
  "conditions": {
    "role": "manager",
    "time": "work_hours",
    "location": "office_network"
  }
}
\`\`\`

### RBAC vs ABAC
- RBAC: roles estáticos
- ABAC: reglas dinámicas
      `,
      activity: {
        title: 'Implementación de ABAC',
        objective: 'Implementar ABAC en Flask',
        labId: 'lab-abac',
        steps: ['Definir atributos y condiciones', 'Implementar motor de políticas', 'Evaluar acceso']
      }
    }
  ]
}
