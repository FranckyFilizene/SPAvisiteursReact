<?php
// AJOUTE CES LIGNES EN TOUT HAUT DU FICHIER
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';
// Sélectionner tous les visiteurs
$query = "SELECT * FROM livisiteurs ORDER BY id DESC";
$result = $conn->query($query);

$visiteurs = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $visiteurs[] = $row;
    }
}

// Envoyer le résultat en JSON
echo json_encode($visiteurs);
?>