<?php

// Database variables
$host = "localhost";
$dbname = "fields_bank";
$username = "root";
$password = "";

try {

    $mysqli = new mysqli($host, $username, $password, $dbname);

    if($mysqli->connect_errno) {
        $error = "Connection error:" . $mysqli->connect_error;
        // header("Location: login.php?databaseerror=$error");
        header("Location: index.php?databaseerror=$error&page=login");
    } else{
        return $mysqli; 
    }

} catch (mysqli_sql_exception $e) {
    $mysqli = "Something went wrong. Please try again later.";

    return $mysqli;
};