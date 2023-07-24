<?php
// Create Movement Date
    $isoString = $currentDateTime->format('c');

// USER CONCATENATION
    // Concatenate movementDate onto movementsDates string
    $newMovementDates = $loan_user["movementsDates"].', '.$isoString;

    // Concatenate -movement onto movements string
    $newMovements = $loan_user["movements"].', '.$loan_amount;

try {

    // INSERT new movementDates and movements into user account
    $transfer_sql1 = "UPDATE customers SET movementsDates = ?, movements = ? WHERE id=?";
    $transfer_stmt1 = $mysqli->prepare($transfer_sql1);

    // Check for statement preparation errors
    if (!$transfer_stmt1) {
        throw new Exception("Prepare failed: " . $mysqli->error);
    }

    // Bind the parameters to the first statement
    $transfer_stmt1->bind_param("sss", $newMovementDates, $newMovements, $loan_user["id"]); //third param may not be int and may be string

    // Execute the first statement
    $transfer_stmt1->execute();

    // Check for execution errors
    if ($transfer_stmt1->errno) {
        throw new Exception("Execute failed: " . $transfer_stmt1->error);
    }

    // Close the statements and database connection
    $transfer_stmt1->close();
    $mysqli->close();

    // Redirect user to the dashboard once transfer completed. Completion message included in redirection to display.
    header('Location: index.php?completion=Loan+Request+Successful&page=dashboard');
} catch (Exception $e) {

    $errors[] = "Transaction Failed:" . $e->getMessage();
    // echo "Transaction Failed:" . $e->getMessage();

    // Close the statements and database connection
    $transfer_stmt1->close();
    $mysqli->close();
}