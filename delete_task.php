<?php
// Include the database connection file
require_once 'db_connect.php';

// Get the index of the task to be deleted from the AJAX request
$index = $_POST['index'];

// Fetch the task ID based on the index
$stmt = $conn->prepare("SELECT id FROM tasks LIMIT ?, 1");
$stmt->bind_param("i", $index);
$stmt->execute();
$stmt->bind_result($taskId);
$stmt->fetch();
$stmt->close();

// Delete the task from the database using the fetched task ID
$stmt = $conn->prepare("DELETE FROM tasks WHERE id = ?");
$stmt->bind_param("i", $taskId);

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