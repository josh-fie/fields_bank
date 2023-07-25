<?php

session_start();

$id = $_SESSION['customer_id'];

$mysqli = require "database.php";

if(is_string($mysqli)) {
    echo($mysqli);
  } else {

    // Check database for account
    $sql = "SELECT * FROM customers WHERE id='$id'";

    $result = $mysqli->query($sql);

    $user = $result->fetch_assoc(); //returns result as an associative array and assigns to $user.

    $json_user = json_encode($user);

    // Set the response headers
    header('Content-Type: application/json');

    // Echo the JSON-encoded data
    echo $json_user;
  }
?>
