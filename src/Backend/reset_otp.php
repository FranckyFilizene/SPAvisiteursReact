<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || empty($data->identifier) || empty($data->password)) {
    echo json_encode(["status" => "error", "message" => "Données manquantes"]);
    exit();
}

$identifier = trim($data->identifier);
$newPassword = password_hash(trim($data->password), PASSWORD_DEFAULT);

$stmt = $conn->prepare("UPDATE login SET password = ?, otp_code = NULL, otp_expiry = NULL WHERE name = ? OR email = ?");
$stmt->bind_param("sss", $newPassword, $identifier, $identifier);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Mot de passe mis à jour !"]);
} else {
    echo json_encode(["status" => "error", "message" => "Erreur lors de la mise à jour"]);
}

$stmt->close();
$conn->close();
?>