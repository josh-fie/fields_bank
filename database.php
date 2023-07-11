<?php

// Database variables
$host = "localhost";
$dbname = "fields_bank";
$username = "root";
$password = "";

$mysqli = new mysqli($host, $username, $password, $dbname);

//if no error connecting this value will equal 0.

if($mysqli->connect_errno) {
    echo "Connection error:" . $mysqli->connect_error;
}

return $mysqli;

// Establish Database Connection to Fields Bank DB
// $pdo = new PDO('mysql:host=localhost;port=3306;dbname=fields_bank', 'root', '');


//throw exception if no connection made
// $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// return $pdo;
//above allows importing files to see the $pdo variable. Or you can use dob block @var on each file and specify the type as instance of \PDO.