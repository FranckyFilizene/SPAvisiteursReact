<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Gestion de la requête OPTIONS (CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Connexion à la base de données
include 'db.php';

// Lecture des données envoyées par Vue.js
$data = json_decode(file_get_contents("php://input"));

// Vérification des champs obligatoires
if (
    isset($data->nom) &&
    isset($data->numero) &&
    isset($data->jours) &&
    isset($data->tarifjournalier)
) {

    $nom = trim($data->nom);
    $numero = trim($data->numero);
    $jours = (float)$data->jours;
    $tarif = (float)$data->tarifjournalier;
    $total = $jours * $tarif;

    // Vérifier si le numéro ou le nom existe déjà
    $checkQuery = "SELECT * FROM livisiteurs WHERE Numero = ? OR Nom = ?";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bind_param("ss", $numero, $nom);
    $checkStmt->execute();

    // Compter les résultats trouvés
    $checkStmt->store_result();

    if ($checkStmt->num_rows > 0) {
        echo json_encode([
            "status" => "error",
            "message" => "Ce numéro ou ce nom existe déjà."
        ]);

        $checkStmt->close();
        $conn->close();
        exit();
    }

    $checkStmt->close();

    // Insertion du nouveau visiteur
    $insertQuery = "INSERT INTO livisiteurs (Nom, Numero, Jours, TarifJornalier, Total)
                    VALUES (?, ?, ?, ?, ?)";

    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("ssddd", $nom, $numero, $jours, $tarif, $total);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Visiteur ajouté avec succès."
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Erreur SQL : " . $stmt->error
        ]);
    }

    $stmt->close();

} else {
    echo json_encode([
        "status" => "error",
        "message" => "Données incomplètes."
    ]);
}

$conn->close();
?>