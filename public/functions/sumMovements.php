<?php

function sumMovements($movs) {
    // Check that amount is available for transfer from user account
        // Add up all movements to get summary total
        $movementsString = $movs;
        // echo '<br>'.'<br>' . $movementsString;
        // Split string
        $movementsArray = explode(",", $movementsString);

        // echo '<br>';
        // var_dump($movementsArray);
        // Sum string values (works through coercion into numbers)
        return array_sum($movementsArray);
}