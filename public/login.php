<?php

require_once "../database.php";

// login logic to check $_POST values and validate
// session_start();
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['username']) && isset($_POST['password'])) {

    $username = $_POST['username'];
    $password = $_POST['password'];

    if(!$username) {
        $errors[] = 'Username not provided';
      }
    if(!$password) {
        $errors[] = 'Password not provided';
      }
    
    echo '<pre>';
    var_dump($_POST);
    echo '</pre>';

    // if(empty($errors)) {

    //     // Check database for account
    //     $statement = $pdo->prepare("INSERT INTO products (title, image, description, price, create_date)
      
    //             -- VALUES ('$title', '', '$description', $price, '$date')
    //             VALUES (:title, :image, :description, :price, :date)
      
    //     ");
      
    //     // If user exists:
    //     session_start();

    //     // Redirect user to the dashboard once login completed.
    //     header('Location: dashboard.php');

    //     // If user doesn't exist 
    //     $errors[] = 'Username or Password incorrect';
    //     }
    if(!empty($errors)) {
    setcookie('persistModal', 'true');
    };
}

}
