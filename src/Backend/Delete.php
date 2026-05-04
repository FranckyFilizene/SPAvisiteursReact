<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

//on recupere d'abord l'id
$id = isset($_GET['id']) ? $_GET['id'] : null;
if(!$id){
    echo json_encode(["status" => "erreur", "message" => "Id manquant"]);
    exit;
}

// mon requete
$query = "DELETE From livisiteurs WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id); // i car id est en int(integer)

if($stmt->execute()){
   echo json_encode([
        "status" => "success",
        "message"=>"Operation effectuer"
   ]);
}else{
    echo json_encode([
        "status"=>"erreur",
         "message"=> $conn->error
    ]);
}
?>