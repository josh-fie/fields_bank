<?php

// Session maintained: session name and id are persisted.
session_start();

$errors = []; //these errors will be looped through and displayed above the form fields on this page.

// login logic to check $_POST values and validate

if($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Loan Amount Requested
    $loan_amount = $_POST['loan_amount'];

    // Loan Conditions Checkbox
    $checkbox = isset($_POST['check_confirm']);

    // Current Account Password for Validation
    $user_password = $_POST['password'];

    if(!$loan_amount) {
        $errors[] = 'Loan Amount not provided';
      }
    if(!$user_password) {
        $errors[] = 'Password not provided';
      }
    if(!$checkbox) {
        $errors[] = 'Please agree Terms and Conditions';
    }

    // Validate Amount
    include_once "functions/validateAmount.php";
    [$loan_amount, $errors] = validateAmount($loan_amount, $errors);

    if(empty($errors)) {

      $mysqli = require "../database.php";

      if(is_string($mysqli)) {
        $errors[] = $mysqli;
      } else {

        // Check database for recipient account
        $loan_sql = sprintf("SELECT * FROM customers WHERE id='%s'", $mysqli->real_escape_string($_SESSION['customer_id']));

        $loan_result = $mysqli->query($loan_sql);

        $loan_user = $loan_result->fetch_assoc(); //returns result as an associative array and assigns to $loan_user.

        //Check user password
        if($user_password !== $loan_user['password']) {
          $errors[] = 'Password Incorrect';
        };
      }

      // VALIDATE USER
      if(empty($errors) && $loan_user) {

        // FINAL VALIDATION AND COMPLETION OF TRANSFER

          // Split Strings into Arrays of separate values
          $movementsArray = explode(', ', $loan_user["movements"]);
          $movementsDatesArray = explode(', ', $loan_user["movementsDates"]);

          //use needed to bring in $loan_amount variable into anonymous function scope.

          // Retrieve all deposits that are >= 10% of loan amount requested
          //use needed to bring in $loan_amount variable into anonymous function scope.
          $filteredArray = array_filter($movementsArray, function($mov) use ($loan_amount) {
            return $mov >= $loan_amount * 0.1;
          });

          // Retrieve all associated movementDates that match the indexes from array above

          $filteredMovDates = array_map(function($mov) use ($movementsDatesArray) {
            
            return $movementsDatesArray[$mov];
          }, array_keys($filteredArray));
        
          // Filter out any movementDates that are older than 12 months

            // Create Current Date
            $currentDateTime = new DateTime('now', new DateTimeZone('Europe/London'));

            $finalArray = array_filter($filteredMovDates, function($dateString) use ($currentDateTime) {
              $date = new DateTime($dateString);
              $interval = $date->diff($currentDateTime);
              return $interval->days <= 365; // Filter dates within 365 days (12 months)
            });

            // Check Array size
            $arrayLength = sizeof($finalArray);


          // If after this there are < 6 in the array then loan request unsuccessful and redirect to dashboard otherwise initiate the transaction.
            if($arrayLength < 6) {

              // Close Database Connection
              $mysqli->close();

              // Redirect to Dashboard - Unsuccessful
              header('Location: index.php?completion=Loan+Request+Unsuccessful&page=dashboard');
            } else if ($arrayLength >= 6) {

              // COMPLETION OF TRANSACTION

              include_once "partials/loan_transaction.php";

            };
        // }
      }
    }
};

?>
<!DOCTYPE html>
<html lang="en">
  <head>

  <?php include_once "partials/header.php"; ?>
  
  <script defer src="dash_script.js"></script>

  </head>
  <body>

    <header>
      <nav class="nav">
        <img
          src="img/logo2.png"
          alt="Field Bank logo"
          class="nav__logo"
          id="logo"
          designer="Josh Fieldhouse"
        />
        <!-- <ul class="nav__links">
        </ul> -->
        <a class="nav__link" href="index.php?page=logout">Logout</a>
      </nav>
    </header>

    <!-- Return Button -->
    <a href="index.php?page=dashboard" class="btn--back"><-- Back</a>

      <!-- LOAN FORM -->
    <div class="operation operation--loan">
      <h2 class="login__header">
        Request a Loan
      </h2>

      <!-- If errors display them before form -->
      <?php if (!empty($errors)) { ?>
        <div class="alert alert-danger">

          <?php foreach ($errors as $error) { ?>
            <div class="message_banner error"><?php echo $error ?></div>
          <?php } ?>
        </div>
      <?php } ?>

      <!-- Submission stays on this page and is validated here -->
      <form action="" method="post" class="login__form" enctype="multipart/form-data">
        <label for="loan_amount">Loan Amount:</label>
        <input
          type="text"
          title="(e.g. 1,000.00)"
          pattern="^\d{1,3}(,\d{3})*(\.\d{2})?$"
          placeholder="£"
          class="login__input login__input--user"
          id="loan_amount"
          name="loan_amount"
          value="<?= htmlspecialchars($_POST['loan_amount'] ?? "") ?>" 
        />
        <label for="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          maxlength="18"
          class="login__input login__input--pin"
          id="password"
          name="password"
        />
        <label for="check_confirm">Agree Terms and Conditions</label>
        <input type="checkbox" name="check_confirm" id="check_confirm"/>
        <a class="btn pdf" href="Field Bank Loan T&C's.pdf" target="_blank">Open T&C's as PDF</a>
        <button class="login__btn" type="submit">Confirm Loan Request</button>
      </form>

      <!-- MODAL TIMER -->
      <div class="modal hidden">
      <h2 class="modal__header">
        <span>Logout </span>
        <br />
        <span>in just 1 minute</span>
      </h2>
      <!-- LOGOUT TIMER -->
      <p class="logout-timer">
        You will be logged out in <span class="timer">05:00</span>
      </p>
      <button class="btn--close-modal">I'm Still Here</button>
      </div>
      <div class="overlay hidden"></div>

    </div>

    <section class="section section--contact" id="section--contact">
      <div class="section__title">
        <h3 class="section__header">
          Contact us anytime 24/7
        </h3>
      </div>
      <div class="section__contact--type">
        <ul>
          <li>Telephone: 0111 555 5678</li>
          <li>Text "QUERY" to 00000</li>
          <li>Access Webchat (Currently Unavailable)</li>
        </ul>
    </section>

<?php
  include_once "partials/footer.php";
?>

</body>
</html>