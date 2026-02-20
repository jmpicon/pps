<?php
$host = getenv('MYSQL_HOST') ?: 'lab-sqli-db';
$user = getenv('MYSQL_USER') ?: 'root';
$pass = getenv('MYSQL_PASSWORD') ?: 'root';
$db   = getenv('MYSQL_DATABASE') ?: 'seguridad_db';

$conn = @new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Error de conexión a la base de datos. Asegúrate de que el contenedor de MySQL esté iniciado.");
}

$vulnerable = isset($_GET['secure']) ? false : true;
$message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"] ?? '';
    $password = $_POST["password"] ?? '';

    if ($vulnerable) {
        // CÓDIGO VULNERABLE A SQL INJECTION
        $query = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            $message = "<div class='success'>✓ Inicio de sesión exitoso</div>";
            while ($row = $result->fetch_assoc()) {
                $message .= "<div class='info'>ID: {$row['id']} - Usuario: {$row['username']} - Contraseña: {$row['password']}</div>";
            }
        } else {
            $message = "<div class='error'>Usuario o contraseña incorrectos</div>";
            if ($result === false) {
                $message .= "<div class='debug'>Error SQL: " . htmlspecialchars($conn->error) . "</div>";
            }
        }
    } else {
        // CÓDIGO SEGURO - Prepared Statements
        $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ? AND password = ?");
        $stmt->bind_param("ss", $username, $password);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $message = "<div class='success'>✓ Inicio de sesión exitoso</div>";
            while ($row = $result->fetch_assoc()) {
                $message .= "<div class='info'>ID: {$row['id']} - Usuario: {$row['username']} - Contraseña: {$row['password']}</div>";
            }
        } else {
            $message = "<div class='error'>Usuario o contraseña incorrectos</div>";
        }
        $stmt->close();
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab SQL Injection - <?= $vulnerable ? 'Vulnerable' : 'Seguro' ?></title>
    <style>
        * { box-sizing: border-box; }
        body { font-family: system-ui; max-width: 600px; margin: 2rem auto; padding: 1rem; background: #0f172a; color: #e2e8f0; }
        h1 { color: #22d3ee; }
        .badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.875rem; margin-bottom: 1rem; }
        .badge.vuln { background: #dc2626; color: white; }
        .badge.secure { background: #16a34a; color: white; }
        form { display: flex; flex-direction: column; gap: 1rem; }
        input { padding: 0.5rem; border: 1px solid #334155; border-radius: 6px; background: #1e293b; color: white; }
        button { padding: 0.75rem; background: #22d3ee; color: #0f172a; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; }
        button:hover { background: #67e8f9; }
        .message { margin-top: 1rem; padding: 1rem; border-radius: 6px; }
        .success { background: #166534; color: #86efac; padding: 0.5rem; margin: 0.25rem 0; border-radius: 4px; }
        .error { background: #991b1b; color: #fca5a5; padding: 0.5rem; margin: 0.25rem 0; border-radius: 4px; }
        .info { background: #1e3a5f; padding: 0.5rem; margin: 0.25rem 0; border-radius: 4px; }
        .debug { font-size: 0.75rem; color: #94a3b8; margin-top: 0.5rem; }
        a { color: #22d3ee; }
        .hint { background: #1e293b; padding: 1rem; border-radius: 6px; margin-top: 1rem; font-size: 0.875rem; color: #94a3b8; }
    </style>
</head>
<body>
    <h1>Lab SQL Injection</h1>
    <span class="badge <?= $vulnerable ? 'vuln' : 'secure' ?>">
        Modo: <?= $vulnerable ? 'VULNERABLE' : 'SEGURO (Prepared Statements)' ?>
    </span>

    <form method="post">
        <input type="text" name="username" placeholder="Usuario" required>
        <input type="password" name="password" placeholder="Contraseña" required>
        <button type="submit">Iniciar Sesión</button>
    </form>

    <?php if ($message): ?>
    <div class="message"><?= $message ?></div>
    <?php endif; ?>

    <div class="hint">
        <strong>Pruebas de explotación (modo vulnerable):</strong><br>
        Usuario: <code>' OR '1'='1' #</code> - Bypass de autenticación<br>
        Usuario: <code>' UNION SELECT NULL, username, password FROM users #</code> - Extraer credenciales<br><br>
        <a href="?<?= $vulnerable ? 'secure=1' : '' ?>">Cambiar a modo <?= $vulnerable ? 'seguro' : 'vulnerable' ?></a>
    </div>
</body>
</html>
