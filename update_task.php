<?php
// Include the database connection file
require_once 'db_connect.php';

// Get the id and updated task from the AJAX request
$id = $_GET['id'];
$task = $_POST['task'];

// Prepare the SQL statement
$stmt = $conn->prepare("UPDATE tasks SET task = ? WHERE id = ?");
$stmt->bind_param("si", $task, $id);

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