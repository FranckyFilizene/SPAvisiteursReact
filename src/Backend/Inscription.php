<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || empty($data->name) || empty($data->password) || empty($data->email)) {
    echo json_encode(["status" => "error", "message" => "Tous les champs sont requis"]);
    exit();
}

$username = trim($data->name);
$password = trim($data->password);
$email = trim($data->email);
//Hacher le mot de passe (Sécurité maximale)
$password_hashe = password_hash($password, PASSWORD_BCRYPT);

//Vérifier si l'utilisateur existe déjà
$check = $conn->prepare("SELECT name FROM login WHERE name = ?");
$check->bind_param("s", $username);
$check->execute();
if ($check->get_result()->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Ce nom d'utilisateur existe déjà"]);
    exit();
}

//3. Insérer dans la base (colonne 'name' et 'password')
$stmt = $conn->prepare("INSERT INTO login (name, password, email) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $password_hashe, $email);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Compte créé avec succès"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erreur lors de l'inscription"]);
}

$stmt->close();
$conn->close();
?>