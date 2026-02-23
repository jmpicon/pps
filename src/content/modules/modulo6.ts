import type { Module } from './index'

export const modulo6: Module = {
  id: 'modulo-6',
  number: 6,
  title: 'Seguridad en Librerías y Auditoría',
  description: 'SAST, DAST, Dependency-Check y OWASP ZAP',
  icon: 'search',
  lessons: [
    {
      id: 'm6-sast',
      title: 'SAST - Static Application Security Testing',
      slug: 'sast',
      objectives: [
        'Comprender análisis estático de código',
        'Usar SonarQube o Semgrep',
        'Integrar SAST en pipeline CI/CD'
      ],
      keyPoints: [
        'Análisis de código sin ejecutar',
        'Detecta SQLi, XSS en el código fuente',
        'Herramientas: SonarQube, Semgrep, Checkmarx'
      ],
      theory: `
## ¿Qué es SAST?

**Static Application Security Testing** analiza el **código fuente** (o bytecode) sin ejecutar la aplicación. Detecta patrones vulnerables: concatenación de SQL, uso de eval(), etc.

## Ejemplo: SQL Injection

\`\`\`php
$input = $_GET['user'];
$query = "SELECT * FROM users WHERE username = '$input'";
\`\`\`

SAST detecta: flujo de datos desde entrada de usuario hasta consulta SQL sin sanitización → **Alerta: SQL Injection**.

## Solución que SAST reconoce

\`\`\`php
$stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$input]);
\`\`\`

## Herramientas

- **SonarQube**: Análisis de múltiples lenguajes, reglas de seguridad, integración CI/CD.
- **Semgrep**: Reglas personalizables, rápido, gratuito para muchos lenguajes.
- **Checkmarx, Fortify**: Enterprise, más completos pero de pago.

## Limitaciones

- **Falsos positivos**: Requiere revisión humana.
- **Falsos negativos**: No detecta vulnerabilidades lógicas complejas.
- **No detecta** problemas de configuración o runtime.
      `,
      activity: {
        title: 'Análisis de Código Estático con SAST',
        objective: 'Usar SAST para detectar vulnerabilidades',
        labId: 'lab-sqli',
        steps: [
          'Instalar Semgrep: pip install semgrep',
          'Ejecutar semgrep contra el código del lab SQLi',
          'Revisar hallazgos y corregir vulnerabilidades',
          'Configurar reglas OWASP en Semgrep'
        ]
      }
    },
    {
      id: 'm6-dast',
      title: 'DAST - Dynamic Application Security Testing',
      slug: 'dast',
      objectives: [
        'Comprender análisis dinámico',
        'Usar OWASP ZAP para escaneo',
        'Diferenciar con SAST'
      ],
      keyPoints: [
        'Análisis con la aplicación en ejecución',
        'Simula ataques reales',
        'No requiere código fuente'
      ],
      theory: `
## ¿Qué es DAST?

**Dynamic Application Security Testing** analiza la aplicación **mientras se ejecuta**. Envía peticiones maliciosas, analiza respuestas y detecta vulnerabilidades (XSS, SQLi, etc.) desde fuera, como haría un atacante.

## SAST vs DAST

| Característica | SAST | DAST |
|----------------|------|------|
| Tipo | Estático | Dinámico |
| Código fuente | Sí | No |
| Detecta antes de ejecución | Sí | No |
| Fallos de configuración | No | Sí |
| Falsos positivos | Más | Menos |
| Momento | En desarrollo | Pre/Post despliegue |

## OWASP ZAP

Herramienta gratuita de escaneo. Modos:
- **Manual**: Proxy para interceptar y modificar peticiones.
- **Automático**: Escaneo pasivo (analiza tráfico) y activo (envía payloads).

## Uso típico

1. Configurar ZAP como proxy.
2. Navegar por la aplicación con el navegador.
3. ZAP analiza el tráfico (pasivo).
4. Ejecutar escaneo activo contra URLs.
5. Revisar informe de alertas.
      `,
      activity: {
        title: 'Análisis Dinámico con DAST',
        objective: 'Usar OWASP ZAP contra la aplicación',
        labId: 'lab-sqli',
        steps: [
          'Descargar y ejecutar OWASP ZAP',
          'Configurar navegador para usar ZAP como proxy (127.0.0.1:8080)',
          'Navegar por http://localhost:8081 (Lab SQLi)',
          'Ejecutar escaneo activo y revisar alertas de SQL Injection'
        ]
      }
    },
    {
      id: 'm6-dependency-check',
      title: 'Dependency-Check',
      slug: 'dependency-check',
      objectives: [
        'Analizar dependencias de proyecto',
        'Detectar CVEs conocidos',
        'Actualizar paquetes vulnerables'
      ],
      keyPoints: [
        'Compara dependencias con base de datos CVE',
        'Soporta Java, Python, Node, PHP, .NET',
        'Integración en CI/CD'
      ],
      theory: `
## OWASP Dependency-Check

Herramienta que identifica dependencias con vulnerabilidades conocidas (CVEs). Compara el inventario de librerías con bases de datos como NVD (National Vulnerability Database).

## Uso

\`\`\`bash
# Node.js
dependency-check --project "MiApp" --scan ./package-lock.json

# Python
dependency-check --project "MiApp" --scan ./requirements.txt

# Directorio genérico
dependency-check --project "MiApp" --scan ./node_modules
\`\`\`

## Ejemplo de resultado

\`\`\`
lodash 4.17.15
  CVE-2021-23337 (Alta): Prototype Pollution
  Solución: Actualizar a 4.17.21
\`\`\`

## Alternativas

- **npm audit**: Integrado en npm para Node.js.
- **Snyk**: Análisis de dependencias y vulnerabilidades.
- **Dependabot**: GitHub integrado, actualizaciones automáticas.
      `,
      activity: {
        title: 'Análisis de Dependencias',
        objective: 'Escanear dependencias del proyecto',
        labId: 'lab-sqli',
        steps: [
          'Ejecutar npm audit en el proyecto PPS',
          'Instalar OWASP Dependency-Check y escanear node_modules',
          'Documentar vulnerabilidades encontradas y planes de actualización',
          'Configurar Dependabot o Renovate para actualizaciones automáticas'
        ]
      }
    },
    {
      id: 'm6-zap',
      title: 'OWASP ZAP',
      slug: 'owasp-zap',
      objectives: [
        'Usar OWASP ZAP de forma efectiva',
        'Escaneo automático y pruebas manuales',
        'Generar informes de seguridad'
      ],
      keyPoints: [
        'Escaneo gratuito y open source',
        'Proxy para interceptar tráfico',
        'Fuzzing y pruebas manuales'
      ],
      theory: `
## OWASP ZAP en Detalle

**Zed Attack Proxy** es la herramienta de seguridad web más usada por la comunidad OWASP.

### Funcionalidades

1. **Proxy**: Intercepta peticiones y respuestas. Modificar parámetros antes de enviar.
2. **Escaneo pasivo**: Analiza tráfico sin modificar peticiones. Detecta cabeceras, cookies, etc.
3. **Escaneo activo**: Envía payloads de inyección (SQLi, XSS) para detectar vulnerabilidades.
4. **Fuzzing**: Envía múltiples valores a parámetros para encontrar errores.
5. **Informes**: HTML, PDF, Markdown con hallazgos.

### Flujo de trabajo

1. **Automático**: Introducir URL y dejar que ZAP explore y escanee.
2. **Manual**: Navegar por la app con ZAP como proxy, luego escanear manualmente.
3. **API**: Integrar en CI/CD con ZAP API o Docker.

### Niveles de alerta

- **Alto**: SQL Injection, XSS, RCE.
- **Medio**: CSRF, información sensible expuesta.
- **Bajo**: Cabeceras faltantes, cookies sin Secure.
- **Informativo**: Versiones de software, etc.
      `,
      activity: {
        title: 'Escaneo con OWASP ZAP',
        objective: 'Encontrar y documentar vulnerabilidades',
        labId: 'lab-sqli',
        steps: [
          'Abrir ZAP y configurar URL objetivo: http://localhost:8081',
          'Ejecutar escaneo automático (Attack > Automated Scan)',
          'Revisar pestaña Alerts y clasificar hallazgos',
          'Exportar informe en HTML y documentar vulnerabilidades',
          'Para cada vulnerabilidad: ¿es explotable? ¿cómo mitigar?'
        ]
      }
    }
  ]
}
