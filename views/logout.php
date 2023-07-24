<?php

// session close and destroyed.
session_start();


if (session_status() === PHP_SESSION_ACTIVE) {

    session_unset();
    session_destroy();
}

// redirect to index.php
header("Location: " .__DIR__ . '../');