<?php
// Validate that amount provided is a positive number

function validateAmount ($amount, $errors) {
if(!($amount > 0)) {
    $errors[] = 'Transfer Amount must be positive';
  };

  // Extra Amount validation - no special characters other than . and , No more than 2 digits after decimal.
  // Validate the loan amount
  if (!preg_match('/^\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?$/', $amount)) {
      $errors[] = "Incorrect Number Format";
  }

  // Check for special characters other than a dot (.)
  if (preg_match('/[^\d.,]/', $amount)) {
    // $errors[] = "Incorrect Number Format";
    !in_array("Incorrect Number Format", $errors) ? $errors[] = "Incorrect Number Format" : null;
  }

  // Remove any commas from the loan amount input
  $amount = str_replace(',', '', $amount);

  var_dump($errors);
  echo '<br>' . $amount;

  return [$amount, $errors];

}