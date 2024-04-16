<?php
// Include the database connection file
require_once 'db_connect.php';

// Get the task from the AJAX request
$task = $_POST['task'];

// Prepare the SQL statement
$stmt = $conn->prepare("INSERT INTO tasks (task) VALUES (?)");
$stmt->bind_param("s", $task);

// Execute the statement
if ($stmt->execute()) {
    echo 'success';
} else {
    echo 'error';
}

// Close the statement and database connection
$stmt->close();
$conn->close();
?>