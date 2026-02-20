import type { Module } from './index'

export const modulo1: Module = {
  id: 'modulo-1',
  number: 1,
  title: 'Introducción a la Seguridad Web',
  description: 'Fundamentos de seguridad, OWASP Top Ten y normativas',
  icon: 'shield',
  lessons: [
    {
      id: 'm1-fundamentos',
      title: 'Fundamentos de Seguridad en Aplicaciones Web',
      slug: 'fundamentos',
      objectives: [
        'Conocer los factores de negocio y tecnologías que afectan la seguridad',
        'Comprender la diferencia entre Seguridad de la Información y Ciberseguridad',
        'Entender la Tríada CIA y el Cubo McCumber'
      ],
      keyPoints: [
        'Ciberseguridad: protección de activos digitales (información, hardware, redes)',
        '5 funciones clave: Identificar, Proteger, Detectar, Responder, Recuperar',
        'Confidencialidad, Integridad, Disponibilidad (CIA)',
        'Autenticación, Autorización, Auditoría'
      ],
      theory: `
## ¿Qué es la Ciberseguridad?

La **Ciberseguridad** es parte de la seguridad de la información. Se refiere a la **protección de activos digitales** (información, hardware y redes), mientras que la seguridad de la información incluye tanto activos digitales como físicos (papel).

### 5 Funciones Clave (NIST)
1. **Identificar** - Conocer activos y riesgos
2. **Proteger** - Implementar controles
3. **Detectar** - Monitorear eventos
4. **Responder** - Actuar ante incidentes
5. **Recuperar** - Restaurar capacidades

### Tríada CIA
- **Confidencialidad**: Solo accesible por autorizados
- **Integridad**: Proteger exactitud y completitud
- **Disponibilidad**: Accesible cuando sea necesario

### Dimensiones Adicionales
- **Autenticación**: Verificar identidad
- **Autorización**: Controlar permisos
- **Auditoría**: Registro y monitoreo
      `,
      practice: `
## Modelo de Amenazas en Entornos Web

### Seguridad en Cliente
- **XSS**: Inyección de scripts maliciosos
- **CSRF**: Ejecución de acciones no deseadas
- **Clickjacking**: Manipulación de interfaz

### Seguridad en Servidor
- **SQL Injection**: Manipulación de bases de datos
- **Buffer Overflow**: Manipulación de memoria
- **DoS/DDoS**: Denegación de servicio

### Vectores de Ataque
1. Ingeniería Social
2. Malware y Ransomware
3. Phishing
4. Vulnerabilidades de software
      `
    },
    {
      id: 'm1-owasp',
      title: 'OWASP Top Ten',
      slug: 'owasp-top-ten',
      objectives: [
        'Identificar las 10 vulnerabilidades más críticas según OWASP',
        'Comprender impacto y mitigación de cada una',
        'Conocer ejemplos reales de explotación'
      ],
      keyPoints: [
        'OWASP = Open Web Application Security Project',
        'Top Ten actualizado periódicamente (2021, 2025)',
        'Guía esencial para desarrollo seguro'
      ],
      theory: `
## OWASP Top Ten 2021

### A01 - Broken Access Control
Restricciones de acceso mal implementadas. **Mitigación**: Controles en servidor, principio de menor privilegio.

### A02 - Cryptographic Failures
Datos sensibles sin cifrado adecuado. **Mitigación**: TLS 1.2/1.3, AES-256, Argon2 para contraseñas.

### A03 - Injection
SQL, XSS, Command Injection. **Mitigación**: Consultas parametrizadas, sanitización, CSP.

### A04 - Insecure Design
Sistemas sin seguridad desde el diseño. **Mitigación**: Modelado de amenazas, seguridad por diseño.

### A05 - Security Misconfiguration
Errores de configuración. **Mitigación**: Configuraciones seguras por defecto, auditorías.

### A06 - Vulnerable Components
Librerías con vulnerabilidades. **Mitigación**: Actualizaciones, Dependency-Check.

### A07 - Authentication Failures
Problemas en autenticación. **Mitigación**: 2FA, bcrypt/Argon2, bloqueo de intentos.

### A08 - Software/Data Integrity Failures
Software manipulado. **Mitigación**: Firmas digitales, controles de integridad.

### A09 - Logging Failures
Falta de registros. **Mitigación**: SIEM, monitoreo en tiempo real.

### A10 - SSRF
Servidor hace peticiones a recursos internos. **Mitigación**: Validar URLs, restringir acceso.
      `,
      activity: {
        title: 'Análisis del OWASP Top Ten',
        objective: 'Explorar y comprender las vulnerabilidades más críticas según OWASP',
        steps: [
          'Visitar https://owasp.org/www-project-top-ten/',
          'Identificar y describir cada vulnerabilidad: ¿En qué consiste? ¿Qué impacto tiene? ¿Cómo mitigar?',
          'Documentar ejemplos reales de ataques en aplicaciones conocidas'
        ]
      }
    },
    {
      id: 'm1-normativas',
      title: 'Normativas de Seguridad Web',
      slug: 'normativas',
      objectives: [
        'Conocer normativas españolas y europeas',
        'Entender ISO 27001, GDPR, PCI-DSS',
        'Comprender el Esquema Nacional de Seguridad'
      ],
      keyPoints: [
        'RGPD/GDPR: Protección de datos personales en UE',
        'LOPDGDD: Adaptación española al RGPD',
        'ISO 27001: Sistema de Gestión de Seguridad',
        'ENS: Esquema Nacional de Seguridad'
      ],
      theory: `
## Normativas Clave

### RGPD (GDPR)
- Reglamento UE 2016/679
- Protección de datos personales
- Multas hasta 20 millones €

### LOPDGDD
- Ley Orgánica 3/2018
- Adaptación española al RGPD
- Delegado de Protección de Datos

### ISO 27001/27002
- Sistema de Gestión de Seguridad (SGSI)
- Evaluación de riesgos
- Controles de seguridad

### PCI-DSS
- Datos de tarjetas de pago
- Cifrado en almacenamiento y transmisión

### ENS (Esquema Nacional de Seguridad)
- Administración electrónica española
- Política de seguridad en medios electrónicos
      `,
      activity: {
        title: 'Comprendiendo las Normativas',
        objective: 'Identificar normativas importantes y su impacto en aplicaciones web',
        steps: [
          'Investigar ISO 27001, OWASP, GDPR, PCI-DSS',
          'Analizar requisitos de cada normativa',
          'Documentar impacto en aplicaciones web'
        ]
      }
    }
  ]
}
