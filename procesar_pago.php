<?php
// Prevenir que errores de PHP desorganicen la respuesta JSON
error_reporting(0);
ini_set('display_errors', 0);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Configuración de la base de datos en XAMPP
$host = "localhost";
$user = "root";
$password = ""; 
$dbname = "tienda_db";

// Crear conexión
$conn = new mysqli($host, $user, $password, $dbname);

// Validar conexión
if ($conn->connect_error) {
    echo json_encode([
        "status" => "error", 
        "message" => "Error al conectar a MySQL: " . $conn->connect_error
    ]);
    exit();
}

$conn->set_charset("utf8");

// Leer datos JSON del cuerpo de la petición
$input = file_get_contents("php://input");
$data = json_decode($input, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No se recibieron datos JSON válidos."]);
    exit();
}

if (!empty($data['nombre']) && !empty($data['email']) && !empty($data['direccion'])) {
    
    $nombre = $conn->real_escape_string($data['nombre']);
    $email = $conn->real_escape_string($data['email']);
    $direccion = $conn->real_escape_string($data['direccion']);
    $metodo_pago = $conn->real_escape_string($data['metodo_pago']);
    $total = floatval($data['total']);

    // Inserción en la tabla pedidos
    $sql = "INSERT INTO pedidos (nombre, email, direccion, metodo_pago, total) 
            VALUES ('$nombre', '$email', '$direccion', '$metodo_pago', $total)";

    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            "status" => "success", 
            "message" => "Pedido registrado exitosamente"
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Error SQL: " . $conn->error
        ]);
    }

} else {
    echo json_encode([
        "status" => "error", 
        "message" => "Faltan campos obligatorios en el formulario."
    ]);
}

$conn->close();
?>