<?php
// Create Movement Date
    $dateTime = new DateTime('now', new DateTimeZone('Europe/London'));
    $isoString = $dateTime->format('c'); // 'c' = ISO 8601 format. This will produce the time offset in the +00:00 format instead of 000z as in Javscript. However, js will read this for our purposes either way.

// USER CONCATENATION
    // Concatenate movementDate onto movementsDates string
    $newMovementDates = $user["movementsDates"].', '.$isoString;

    // Concatenate -movement onto movements string
    $newMovements = $user["movements"].', '.-$dest_amount;

// DEST_USER/RECIPIENT CONCATENATION
    // Concatenate movementDate onto movementsDates string
    $newDestMovementDates = $dest_user["movementsDates"].', '.$isoString;

    // Concatenate +movement onto movements string
    $newDestMovements = $dest_user["movements"].', '.$dest_amount;

// Start a transaction
$mysqli->begin_transaction();

try {
    // Prepare the first UPDATE statement

    // INSERT new movementDates and movements into user account
    $transfer_sql1 = "UPDATE customers SET movementsDates = ?, movements = ? WHERE id=?";
    $transfer_stmt1 = $mysqli->prepare($transfer_sql1);

    // Check for statement preparation errors
    if (!$transfer_stmt1) {
        throw new Exception("Prepare failed: " . $mysqli->error);
    }

    // Bind the parameters to the first statement
    $transfer_stmt1->bind_param("sss", $newMovementDates, $newMovements, $user["id"]); //All three bound as strings.

    // Execute the first statement
    $transfer_stmt1->execute();

    // Check for execution errors
    if ($transfer_stmt1->errno) {
        throw new Exception("Execute failed: " . $transfer_stmt1->error);
    }

    // Prepare the second UPDATE statement

    // INSERT new movementDates and movements into dest/recipient account
    $transfer_sql2 = "UPDATE customers SET movementsDates = ?, movements = ? WHERE id = ?";
    $transfer_stmt2 = $mysqli->prepare($transfer_sql2);

    // Check for statement preparation errors
    if (!$transfer_stmt2) {
        throw new Exception("Prepare failed: " . $mysqli->error);
    }

    // Bind the parameters to the second statement
    $transfer_stmt2->bind_param("sss", $newDestMovementDates, $newDestMovements, $dest_user["id"]); //All three bound as strings

    // Execute the second statement
    $transfer_stmt2->execute();

    // Check for execution errors
    if ($transfer_stmt2->errno) {
        throw new Exception("Execute failed: " . $transfer_stmt2->error);
    }

    // Commit the transaction if all queries succeed
    $mysqli->commit();

    // Close the statements and database connection
    $transfer_stmt1->close();
    $transfer_stmt2->close();
    $mysqli->close();

    // Redirect user to the dashboard once transfer completed. Completion message included in redirection to display.
    header('Location: index.php?completion=Transfer+Successful&page=dashboard');

} catch (Exception $e) {

    $errors[] = "Transaction Failed:" . $e->getMessage();

    // Rollback the transaction if any query fails
    $mysqli->rollback();

    // Close the statements and database connection
    $transfer_stmt1->close();
    $transfer_stmt2->close();
    $mysqli->close();
}

