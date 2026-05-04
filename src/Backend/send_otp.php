<?php
require __DIR__ . '/../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->identifier)) {
    echo json_encode([
        "status" => "error",
        "message" => "Aucun identifiant reçu"
    ]);
    exit();
}

$identifier = trim($data->identifier);

$otp = rand(100000, 999999);
$expiry = gmdate("Y-m-d H:i:s", strtotime("+10 minutes"));

// Chercher email
$stmt = $conn->prepare("SELECT email FROM login WHERE name = ? OR email = ?");
$stmt->bind_param("ss", $identifier, $identifier);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "error",
        "message" => "Utilisateur non trouvé"
    ]);
    exit();
}

$user = $result->fetch_assoc();
$recipientEmail = $user['email'];

// Mettre à jour OTP
$stmt = $conn->prepare("UPDATE login SET otp_code = ?, otp_expiry = ? WHERE name = ? OR email = ?");
$stmt->bind_param("ssss", $otp, $expiry, $identifier, $identifier);

if ($stmt->execute()) {

    $mail = new PHPMailer(true);

    try {
        // SMTP CONFIG
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'ranaivomananafrancky@gmail.com';
        $mail->Password = 'urtv ihbo sqdu kinr';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // ENCODAGE
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        // EMAIL
        $mail->setFrom('ranaivomananafrancky@gmail.com', 'SPAvisiteur');
        $mail->addAddress($recipientEmail);

        $mail->isHTML(true);
        $mail->Subject = "🔐 Code de vérification - SPAvisiteur";

        $mail->Body = "
  <div style='font-family: Arial, sans-serif; background-color:#f4f6f8; padding:20px;'>
    <div style='max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);'>
        
        <!-- Header -->
        <div style='background:#f97316; color:white; padding:20px; text-align:center;'>
            <h2 style='margin:0;'>SPAvisiteur</h2>
            <p style='margin:5px 0 0 0;'>Vérification de votre compte</p>
        </div>

        <!-- Content -->
        <div style='padding:30px; color:#333;'>
            <p>Bonjour,</p>

            <p>Nous avons reçu une demande de vérification pour votre compte.</p>

            <div style='text-align:center; margin:30px 0;'>
                <span style='font-size:32px; font-weight:bold; letter-spacing:8px; color:#f97316; border: 2px dashed #f97316; padding: 10px 20px; border-radius: 8px;'>
                    $otp
                </span>
            </div>

            <p style='text-align:center;'>Ce code est valable pendant <strong>10 minutes</strong>.</p>

            <!-- Bouton -->
            <div style='text-align:center; margin:30px 0;'>
                <a href='http://localhost/Delegg-Hub/sapvisiteur/src/Backend/verify_otp.php?email=$recipientEmail&code=$otp' 
                   style='background:#f97316; color:white; padding:15px 30px; text-decoration:none; border-radius:8px; font-weight:bold; display:inline-block;'>
                    Vérifier mon compte
                </a>
            </div>

            <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet email.</p>

            <p style='margin-top:30px;'>Cordialement,<br><strong style='color:#f97316;'>L'équipe SPAvisiteur</strong></p>
        </div>

        <!-- Footer -->
        <div style='background:#f0f0f0; padding:15px; text-align:center; font-size:12px; color:#777;'>
            © " . date("Y") . " SPAvisiteur - Tous droits réservés
        </div>
    </div>
</div>
    ";

        $mail->send();
        echo json_encode([
            "status" => "success",
            "message" => "Code envoyé par email"
        ]);
    } catch (Exception $e) {
        echo json_encode([
            "status" => "error",
            "message" => "Erreur mail: " . $mail->ErrorInfo
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Erreur mise à jour OTP"
    ]);
}

$stmt->close();
$conn->close();
