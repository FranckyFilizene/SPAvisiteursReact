<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit; // Gérer la requête de pré-vérification CORS
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || empty($data->identifier) || empty($data->otp)){
    echo json_encode([
        "status" => "error",
        "message" => "Données manquantes (Identifiant ou Code OTP)"
    ]);
    exit();
}

$identifier = trim($data->identifier);
$otp = trim($data->otp);

// Changement ici : "sss" au lieu de "ssi" pour éviter les erreurs de type
$stmt = $conn->prepare("SELECT * FROM login WHERE (name = ? OR email = ?) AND otp_code = ? AND otp_expiry > NOW()");
$stmt->bind_param("sss", $identifier, $identifier, $otp);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Optionnel : On peut marquer l'OTP comme utilisé ici en le supprimant de la DB
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "Code invalide ou expiré"]);
}

$stmt->close();
$conn->close();
?>