<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include 'db.php';

$query = "SELECT Nom as name ,Tarifjornalier as trafic, Jours as nbrdujour FROM livisiteurs ORDER BY id DESC LIMIT 7 ";
$result = $conn->query($query);

$data =[];
while ($row = $result->fetch_assoc()) {
    $data[] = [
        "name"      => $row['name'],
        "trafic"    => floatval($row['trafic']),
        "nbrdujour" => intval($row['nbrdujour'])
    ];
}

echo json_encode(array_reverse($data));
?>