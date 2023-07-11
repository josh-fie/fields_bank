<?php

// session close and destroyed.
session_start();

session_unset();

session_destroy();

// redirect to index.php
header("Location: index.php");