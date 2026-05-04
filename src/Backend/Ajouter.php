<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// CORRECTION : Orthographe de OPTIONS
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS'){
    http_response_code(200);
    exit();
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->numero) && !empty($data->nom)){
    $nom = $data->nom;
    $numero = $data->numero;
    $jours = $data->jours;
    $tarif = $data->tarifjournalier;
    $total = $jours * $tarif;

    // CORRECTION : Vérifie bien l'orthographe de TarifJornalier (selon ta table)
    $query = "INSERT INTO livisiteurs (Nom, Numero, Jours, TarifJornalier, Total) VALUES (?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($query);
    
    // On utilise "ssddd" pour : string, string, double, double, double
    $stmt->bind_param("ssddd", $nom, $numero, $jours, $tarif, $total);

    if($stmt->execute()){
        echo json_encode(['status' => 'success', 'message' => 'Visiteur ajouté avec succès']);
    } else {
        // En cas d'erreur, on renvoie l'erreur SQL pour savoir ce qui cloche
        echo json_encode(['status'=>'error', 'message'=> $stmt->error]);
    }
} else {
    echo json_encode(['status'=>'error', 'message'=>'Données incomplètes']);
}
?>