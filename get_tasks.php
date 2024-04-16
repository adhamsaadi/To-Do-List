<?php
// Include the database connection file
require_once 'db_connect.php';

// Execute SELECT query to fetch tasks
$sql = "SELECT * FROM tasks";
$result = mysqli_query($conn, $sql);

// Prepare an array to store the retrieved tasks
$tasks = array();

// Fetch tasks from the result set
while ($row = mysqli_fetch_assoc($result)) {
    $tasks[] = $row;
}

// Convert the tasks array to JSON format
$tasks_json = json_encode($tasks);

// Send the JSON response
header('Content-Type: application/json');
echo $tasks_json;
?>