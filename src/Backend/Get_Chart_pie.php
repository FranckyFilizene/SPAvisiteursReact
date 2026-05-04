<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include 'db.php';


$query = "SELECT nom as name, (Jours * TarifJornalier) as value FROM livisiteurs";
$result = $conn->query($query);

$data = [];
while ($row = $result->fetch_assoc()) {
    if ($row['value'] > 0) {
        $data[] = [
            "name" => $row['name'],
            "value" => (float)$row['value']
        ];
    }
}

echo json_encode($data);
?>