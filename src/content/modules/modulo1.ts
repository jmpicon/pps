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

La **Ciberseguridad** es una disciplina dentro de la seguridad de la información que se centra exclusivamente en la **protección de activos digitales**: información en formato electrónico, hardware (servidores, dispositivos) y redes. A diferencia de la seguridad de la información en sentido amplio, que incluye también activos físicos como documentos en papel, la ciberseguridad opera en el dominio digital.

### Factores que impulsan la ciberseguridad

1. **Digitalización empresarial**: Las organizaciones dependen cada vez más de sistemas informáticos para operar.
2. **Regulación**: GDPR, LOPDGDD, PCI-DSS exigen medidas de protección de datos.
3. **Amenazas evolutivas**: Ransomware, phishing y ataques dirigidos aumentan en sofisticación.
4. **Superficie de ataque**: IoT, cloud y aplicaciones web amplían los vectores de ataque.

## Marco NIST: 5 Funciones Clave

El marco de ciberseguridad del NIST (National Institute of Standards and Technology) define cinco funciones esenciales:

### 1. Identificar
Conocer los activos de la organización, los riesgos asociados y el contexto de negocio. Incluye inventario de hardware y software, evaluación de riesgos y políticas de gestión.

### 2. Proteger
Implementar controles para limitar el impacto de incidentes. Incluye gestión de acceso, formación de usuarios, mantenimiento de sistemas y protección de datos.

### 3. Detectar
Monitorear eventos de seguridad para identificar incidentes de forma temprana. Incluye SIEM, detección de anomalías y pruebas de penetración.

### 4. Responder
Actuar ante incidentes detectados. Incluye planes de respuesta, comunicación, análisis y mitigación.

### 5. Recuperar
Restaurar capacidades y servicios afectados. Incluye planes de recuperación, mejoras y comunicación con partes interesadas.

## La Tríada CIA

Los tres pilares de la seguridad de la información son:

### Confidencialidad
Garantizar que la información solo sea accesible por personas o sistemas autorizados. Técnicas: cifrado, control de acceso, ofuscación.

### Integridad
Proteger la exactitud y completitud de la información. Evitar modificaciones no autorizadas. Técnicas: hashes, firmas digitales, controles de versión.

### Disponibilidad
Asegurar que la información y los sistemas estén accesibles cuando se necesiten. Técnicas: redundancia, backups, planes de contingencia.

## Dimensiones Adicionales: Autenticación, Autorización y Auditoría

### Autenticación
Verificar la identidad de un usuario o sistema. Algo que sabes (contraseña), algo que tienes (token) o algo que eres (biometría). MFA combina varios factores.

### Autorización
Determinar qué acciones puede realizar una entidad autenticada. Basada en roles (RBAC) o atributos (ABAC).

### Auditoría
Registro y revisión de acciones para detectar anomalías, cumplir normativas y facilitar la investigación forense.

## Modelo de Amenazas en Entornos Web

### Seguridad en el Cliente (Browser)
- **XSS (Cross-Site Scripting)**: Inyección de scripts maliciosos que se ejecutan en el navegador de la víctima.
- **CSRF (Cross-Site Request Forgery)**: Ejecución de acciones no deseadas aprovechando la sesión activa del usuario.
- **Clickjacking**: Superposición de elementos invisibles para engañar al usuario y hacer clic en algo distinto.

### Seguridad en el Servidor
- **SQL Injection**: Manipulación de consultas a la base de datos mediante entradas mal validadas.
- **Buffer Overflow**: Escritura de datos más allá de los límites de memoria asignados.
- **DoS/DDoS**: Denegación de servicio mediante saturación de recursos.

### Vectores de Ataque Comunes
1. **Ingeniería Social**: Manipulación de personas para obtener información o acceso.
2. **Malware y Ransomware**: Software malicioso que cifra o roba datos.
3. **Phishing**: Suplantación de identidad para capturar credenciales.
4. **Vulnerabilidades de software**: Explotación de fallos en aplicaciones o sistemas operativos.
      `,
      practice: `
## Ejercicio: Análisis del Modelo de Amenazas

### Objetivo
Identificar amenazas en un escenario web típico y clasificarlas según la Tríada CIA.

### Escenario
Una aplicación web de comercio electrónico que permite:
- Registro e inicio de sesión
- Búsqueda de productos
- Carrito y pago con tarjeta
- Panel de administración

### Tareas
1. **Lista 5 amenazas** que podrían afectar a esta aplicación.
2. **Clasifica cada amenaza** según si afecta principalmente a Confidencialidad, Integridad o Disponibilidad.
3. **Propón una mitigación** para cada amenaza identificada.
4. **Relaciona** cada amenaza con una de las vulnerabilidades OWASP Top Ten que estudiarás en la siguiente lección.
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
## ¿Qué es OWASP?

**OWASP** (Open Web Application Security Project) es una fundación sin ánimo de lucro que trabaja para mejorar la seguridad del software. Proporciona herramientas, documentación y estándares de referencia. El **OWASP Top Ten** es su proyecto más conocido: una lista de las diez vulnerabilidades más críticas en aplicaciones web, basada en datos reales de análisis de seguridad.

## OWASP Top Ten 2021

### A01:2021 – Broken Access Control
Las restricciones de acceso no se aplican correctamente. Los usuarios pueden acceder a recursos o funciones fuera de sus permisos.

**Ejemplos**: Acceso a archivos de otros usuarios cambiando el ID en la URL, elevación de privilegios, bypass de controles.

**Mitigación**: Implementar controles de acceso en el servidor (nunca confiar en el cliente), principio de menor privilegio, invalidar tokens al cerrar sesión.

### A02:2021 – Cryptographic Failures
Datos sensibles expuestos por cifrado inadecuado o ausente. Anteriormente "Sensitive Data Exposure".

**Ejemplos**: Contraseñas en texto plano, transmisión sin TLS, algoritmos débiles (MD5, SHA1 para contraseñas).

**Mitigación**: TLS 1.2/1.3 para datos en tránsito, AES-256 para datos en reposo, Argon2 o bcrypt para contraseñas.

### A03:2021 – Injection
Inyección de código malicioso en interpretadores (SQL, NoSQL, OS, LDAP). Incluye SQL Injection, XSS, Command Injection.

**Ejemplos**: \`' OR '1'='1'\` en login, \`<script>alert(1)</script>\` en comentarios.

**Mitigación**: Consultas parametrizadas o ORM, sanitización de entradas, Content Security Policy (CSP).

### A04:2021 – Insecure Design
Falta de modelos de amenazas y prácticas de diseño seguro. Vulnerabilidades introducidas en la fase de diseño.

**Ejemplos**: Flujos de negocio que permiten abusos, falta de rate limiting, recuperación de contraseña insegura.

**Mitigación**: Modelado de amenazas, revisión de arquitectura, principios de diseño seguro.

### A05:2021 – Security Misconfiguration
Configuraciones inseguras por defecto, mensajes de error detallados, cabeceras innecesarias, software desactualizado.

**Ejemplos**: Directorios listables, mensajes de error con stack traces, cuentas por defecto activas.

**Mitigación**: Configuración segura por defecto, procesos de hardening, auditorías periódicas.

### A06:2021 – Vulnerable and Outdated Components
Uso de librerías y frameworks con vulnerabilidades conocidas (CVEs).

**Ejemplos**: jQuery 1.x con XSS, Log4j 2.14, dependencias con CVEs críticos.

**Mitigación**: Inventario de componentes, actualizaciones regulares, OWASP Dependency-Check.

### A07:2021 – Identification and Authentication Failures
Problemas en autenticación: credenciales débiles, sesiones inseguras, falta de MFA.

**Ejemplos**: Contraseñas por defecto, sesiones que no expiran, enumeración de usuarios.

**Mitigación**: MFA, bcrypt/Argon2, bloqueo tras intentos fallidos, respuestas genéricas.

### A08:2021 – Software and Data Integrity Failures
Falta de verificación de integridad en actualizaciones, CI/CD o deserialización.

**Ejemplos**: Cadenas de suministro comprometidas, deserialización de objetos no confiables.

**Mitigación**: Firmas digitales, verificación de integridad, evitar deserialización insegura.

### A09:2021 – Security Logging and Monitoring Failures
Falta de registro de eventos de seguridad, imposibilitando la detección e investigación de incidentes.

**Mitigación**: Registrar intentos de login fallidos, acciones administrativas, usar SIEM.

### A10:2021 – Server-Side Request Forgery (SSRF)
El servidor realiza peticiones a URLs controladas por el atacante, pudiendo acceder a recursos internos.

**Ejemplos**: \`?url=http://localhost/admin\`, acceso a metadatos de cloud (169.254.169.254).

**Mitigación**: Validar y restringir URLs, usar whitelist de dominios, segmentar redes.
      `,
      activity: {
        title: 'Análisis del OWASP Top Ten',
        objective: 'Explorar y comprender las vulnerabilidades más críticas según OWASP',
        labId: 'lab-sqli',
        steps: [
          'Visitar https://owasp.org/www-project-top-ten/ y leer la documentación oficial',
          'Para cada vulnerabilidad del Top Ten: ¿En qué consiste? ¿Qué impacto tiene? ¿Cómo mitigar?',
          'Documentar un ejemplo real de ataque conocido (CVE o caso público) para al menos 3 vulnerabilidades',
          'Relacionar cada vulnerabilidad con las lecciones prácticas del curso'
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
## Marco Normativo de Seguridad

Las aplicaciones web deben cumplir con diversas normativas según el sector, el tipo de datos y la jurisdicción. Conocer estas normativas es esencial para diseñar sistemas seguros y evitar sanciones.

## RGPD (Reglamento General de Protección de Datos)

**Reglamento (UE) 2016/679**. Aplicable a cualquier organización que trate datos personales de ciudadanos de la UE.

### Principios clave
- **Licitación, limitación y minimización**: Solo datos necesarios para el propósito declarado.
- **Exactitud**: Datos correctos y actualizados.
- **Limitación del plazo de conservación**: Eliminar cuando ya no sean necesarios.
- **Integridad y confidencialidad**: Medidas técnicas y organizativas adecuadas.
- **Responsabilidad proactiva**: Demostrar cumplimiento (documentación, DPIAs).

### Derechos del interesado
Acceso, rectificación, supresión ("derecho al olvido"), portabilidad, oposición, limitación del tratamiento.

### Sanciones
Hasta 20 millones € o 4% del volumen de negocio mundial anual.

## LOPDGDD (Ley Orgánica de Protección de Datos)

**Ley Orgánica 3/2018**. Adaptación española al RGPD. Incluye:
- Edad mínima para consentimiento (14 años en España).
- Delegado de Protección de Datos (DPO) obligatorio en ciertos casos.
- Régimen sancionador específico.
- Normas sobre videovigilancia, empleados, etc.

## ISO 27001 e ISO 27002

**ISO/IEC 27001** define los requisitos para un Sistema de Gestión de la Seguridad de la Información (SGSI). **ISO 27002** proporciona controles y guías de implementación.

### Proceso de certificación
1. Análisis de brechas (gap analysis).
2. Evaluación de riesgos.
3. Declaración de aplicabilidad (SoA).
4. Implementación de controles.
5. Auditoría de certificación.

### Controles relevantes para aplicaciones web
- A.14: Seguridad en adquisición, desarrollo y mantenimiento.
- A.9: Control de acceso.
- A.12: Seguridad de las operaciones.

## PCI-DSS (Payment Card Industry Data Security Standard)

Obligatorio para organizaciones que procesan, almacenan o transmiten datos de tarjetas de pago.

### Requisitos principales
- Construir y mantener una red segura.
- Proteger datos del titular de la tarjeta (cifrado en tránsito y en reposo).
- Programa de gestión de vulnerabilidades.
- Control de acceso fuerte.
- Monitoreo y pruebas de redes.
- Política de seguridad de la información.

### Niveles de cumplimiento
Dependen del volumen de transacciones. Auditorías anuales para niveles altos.

## ENS (Esquema Nacional de Seguridad)

**Real Decreto 311/2022**. Aplicable a la Administración electrónica española. Define medidas de seguridad para los sistemas de información del sector público.

### Categorías de sistemas
- **Básico**: Medidas mínimas.
- **Medio**: Requisitos adicionales.
- **Alto**: Máximo nivel de exigencia.

### Política de seguridad
Documento que define el marco de seguridad de la organización, roles y responsabilidades.
      `,
      activity: {
        title: 'Comprendiendo las Normativas',
        objective: 'Identificar normativas importantes y su impacto en aplicaciones web',
        labId: 'lab-sqli',
        steps: [
          'Investigar ISO 27001, OWASP, GDPR, PCI-DSS y ENS',
          'Para cada normativa: ámbito de aplicación, requisitos clave, sanciones',
          'Analizar qué requisitos afectan directamente al desarrollo de una aplicación web',
          'Documentar una tabla comparativa: normativa, datos que protege, medidas técnicas requeridas'
        ]
      }
    }
  ]
}
