<?php

session_start();

// var_dump($_SESSION['customer_id']);

$id = $_SESSION['customer_id'];

// require_once "database.php";

$mysqli = require "database.php";

if(is_string($mysqli)) {
    echo($mysqli);
  } else {

    // Check database for account
    $sql = "SELECT * FROM customers WHERE id='$id'";

    $result = $mysqli->query($sql);

    $user = $result->fetch_assoc(); //returns result as an associative array and assigns to $user.

    $json_user = json_encode($user);

    // var_dump($json_user);

    // Set the response headers
    header('Content-Type: application/json');

    // Echo the JSON-encoded data
    echo $json_user;
  }
?>
