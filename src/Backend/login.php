<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->name) || !isset($data->password)) {
    echo json_encode([
        "status" => "error",
        "message" => "Données incomplètes"
    ]);
    exit();
}

$identifier = trim($data->name);
$password = trim($data->password);

//On cherche l'utilisateur par son nom
$stmt = $conn->prepare("SELECT name, password, email FROM login WHERE name = ? OR email = ?");
$stmt->bind_param("ss", $identifier,$identifier); //prend le variable $identifier (que l'user tape) et stocker le dans ? de la requete SQL
$stmt->execute(); //On lance enfin la recherche dans la table SQL.
$result = $stmt->get_result(); //On récupère la réponse de la base de données (un peu comme un tableau).

//Est-ce qu'il y a au moins une ligne qui correspond à ce nom dans la table login ?"
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc(); //Si oui : L'utilisateur existe, on peut continuer. //Si non : Le nom n'est pas dans la base, on s'arrête et on renvoie une erreur.
    
    // password_verify prend le mot de passe tapé et le compare au hash de la base
    if (password_verify($password, $user['password'])) {
        echo json_encode([
            "status" => "success",
            "message" => "Connexion réussie !",
            "email" => $user['email']
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Mot de passe incorrect"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Utilisateur non trouvé"
    ]);
}

$stmt->close();
$conn->close();
?>