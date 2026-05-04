<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=UTF-8');

include 'db.php';

// requetes
$query = "SELECT 
        COUNT(*) AS total_v, 
        SUM(Total) AS total_g,
        MIN(Total) AS min_g,
        MAX(Total) AS max_g
        FROM livisiteurs";

$result = $conn->query($query);

if ($result) {
    $data = $result->fetch_assoc();
    echo json_encode([
        'total_visiteurs' => (int)($data['total_v'] ?? 0),
        'total_gain' => (float)($data['total_g'] ?? 0),
        'total_min' => (float)($data['min_g'] ?? 0),
        'total_max' => (float)($data['max_g'] ?? 0)
    ]);
} else {
    echo json_encode(['error' => $conn->error]);
}
?>