<?php

// session close and destroyed.
session_start();

// Close and Destroy Session
if (session_status() === PHP_SESSION_ACTIVE) {

    session_unset();
    session_destroy();
}

// redirect to index.php
header("Location: " .__DIR__ . '../');