<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Gestion du mode OPTIONS (Preflight request d'Axios)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

include 'db.php'; // Ton fichier de connexion à la base de données

// 1. Récupérer les données JSON envoyées par React
$json = file_get_contents('php://input');
$data = json_decode($json);

if ($data && isset($data->id)) {
    $id = $data->id;
    $nom = $data->Nom;
    $numero = $data->Numero;
    $jours = intval($data->Jours);
    $tarif = floatval($data->TarifJornalier);
    
    // 2. Calculer le nouveau total côté serveur (plus sécurisé)
    $total = $jours * $tarif;

    // 3. Préparer la requête de mise à jour
    // Adapte les noms des colonnes (Nom, Numero, Jours, TarifJornalier, Total) à ta table
    $query = "UPDATE livisiteurs 
              SET Nom = ?, Numero = ?, Jours = ?, TarifJornalier = ?, Total = ? 
              WHERE id = ?";
    
    $stmt = $conn->prepare($query);
    
    // "ssiddi" -> string, string, int, double (float), double, int
    $stmt->bind_param("ssiddi", $nom, $numero, $jours, $tarif, $total, $id);

    if ($stmt->execute()) {
        echo json_encode([
            "status" => "success",
            "message" => "Visiteur mis à jour avec succès"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Erreur lors de la mise à jour : " . $conn->error
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Données incomplètes"
    ]);
}

$conn->close();
?>