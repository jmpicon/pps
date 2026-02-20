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
      objectives: ['Comprender análisis estático', 'Usar SonarQube/Semgrep', 'Integrar en CI/CD'],
      keyPoints: [
        'Análisis de código sin ejecutar',
        'Detecta SQLi, XSS en código',
        'Herramientas: SonarQube, Semgrep'
      ],
      theory: `
## SAST

Analiza el **código fuente** sin ejecutarlo. Detecta vulnerabilidades antes del despliegue.

### Código que SAST detecta
\`\`\`php
$input = $_GET['user'];
$query = "SELECT * FROM users WHERE username = '$input'";
\`\`\`
→ Alerta: SQL Injection

### Solución
\`\`\`php
$stmt = $db->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$input]);
\`\`\`
      `,
      activity: {
        title: 'Análisis de Código Estático con SAST',
        objective: 'Usar SAST para detectar vulnerabilidades',
        labId: 'lab-sast',
        steps: ['Instalar SonarQube o Semgrep', 'Analizar proyecto vulnerable', 'Corregir hallazgos']
      }
    },
    {
      id: 'm6-dast',
      title: 'DAST - Dynamic Application Security Testing',
      slug: 'dast',
      objectives: ['Comprender análisis dinámico', 'Usar OWASP ZAP', 'Escanear aplicaciones en ejecución'],
      keyPoints: [
        'Análisis durante ejecución',
        'Simula ataques reales',
        'No requiere código fuente'
      ],
      theory: `
## DAST vs SAST

| Característica | SAST | DAST |
|----------------|------|------|
| Tipo | Estático | Dinámico |
| Código fuente | Sí | No |
| Detecta antes de ejecución | Sí | No |
| Fallos de configuración | No | Sí |
      `,
      activity: {
        title: 'Análisis Dinámico con DAST',
        objective: 'Usar DAST para detectar vulnerabilidades en ejecución',
        labId: 'lab-dast',
        steps: ['Ejecutar OWASP ZAP', 'Configurar escaneo', 'Analizar resultados']
      }
    },
    {
      id: 'm6-dependency-check',
      title: 'Dependency-Check',
      slug: 'dependency-check',
      objectives: ['Analizar dependencias', 'Detectar CVEs', 'Actualizar paquetes vulnerables'],
      keyPoints: [
        'Compara con base CVE',
        'Soporta Java, Python, Node, PHP',
        'Integración en CI/CD'
      ],
      theory: `
## Uso de Dependency-Check

\`\`\`bash
dependency-check --project "MiApp" --scan ./node_modules
\`\`\`

### Ejemplo de resultado
- lodash 4.17.15 → CVE-2021-23337 (Alta)
- Solución: Actualizar a 4.17.21
      `,
      activity: {
        title: 'Análisis de Dependencias con Dependency-Check',
        objective: 'Analizar dependencias en proyecto',
        labId: 'lab-dependency-check',
        steps: ['Instalar Dependency-Check', 'Escanear proyecto', 'Actualizar vulnerabilidades']
      }
    },
    {
      id: 'm6-zap',
      title: 'OWASP ZAP',
      slug: 'owasp-zap',
      objectives: ['Usar OWASP ZAP', 'Escaneo automático y manual', 'Generar informes'],
      keyPoints: [
        'Escaneo gratuito de seguridad',
        'Proxy para interceptar tráfico',
        'Fuzzing y pruebas manuales'
      ],
      theory: `
## OWASP ZAP

- Escaneo automático de vulnerabilidades
- Proxy para interceptar y modificar peticiones
- Fuzzing para inyecciones
- Informes detallados
      `,
      activity: {
        title: 'Escaneo con OWASP ZAP',
        objective: 'Encontrar y corregir vulnerabilidades con ZAP',
        labId: 'lab-zap',
        steps: ['Configurar ZAP con URL objetivo', 'Ejecutar escaneo pasivo y activo', 'Analizar y corregir hallazgos']
      }
    }
  ]
}
