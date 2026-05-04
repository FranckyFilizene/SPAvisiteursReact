<?php
$conn = new mysqli("localhost", "root", "", "spavisiteur");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->query("SET time_zone = '+00:00'");
?>