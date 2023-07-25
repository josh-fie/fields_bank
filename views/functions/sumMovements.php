<?php

function sumMovements($movs) {
    // Add up all movements to get summary total
    $movementsString = $movs;
    
    // Split string
    $movementsArray = explode(",", $movementsString);

    // Sum string values
    return array_sum($movementsArray);
}