<?php
// Database credentials
$hostname = 'your_hostname';
$username = 'your_username';
$password = 'your_password';
$database = 'database_name';

// Create a database connection
$conn = new mysqli($hostname, $username, $password, $database);
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
?>
