<?php

$uri;

if (!isset($_GET['page'])) {
    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];
} else {
    // var_dump($_GET);
    $uri = $_GET['page'];
}

// Find what comes after the final /
$uri = "/" . basename($uri);
// echo '<br>';
// var_dump($uri);

// exit;

if ($uri === "/public") {
    $uri = '/'; 
}

if ($uri === "/logout") {
    // session close and destroyed.
    session_start();

    if (session_status() === PHP_SESSION_ACTIVE) {

        session_unset();
        session_destroy();
    }

    $uri = '/';
    // echo '<br>';
    // var_dump($uri);
}

// echo '<br>';
// var_dump($uri);


$routes = [
    '/' => __DIR__ . '/views/index.php',
    '/home' => __DIR__ . '/views/index.php',
    '/login' => __DIR__ . '/views/login.php',
    '/dashboard' => __DIR__ . '/views/dashboard.php',
    '/transfer' => __DIR__ . '/views/transfer.php',
    '/loan' => __DIR__ . '/views/loan.php',
];

function routeToPage($uri, $routes) {
    if (array_key_exists($uri, $routes)) {
        require $routes[$uri];
        // include query in new link for completion from loan and transfer requests.
    } else {
        abort();
    }
}

function abort($code = 404) {
    http_response_code($code);

    require "views/404.php";

    die();
};

routeToPage($uri, $routes);