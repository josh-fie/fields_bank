<?php

// Session maintained
session_start();
// session name and id are persisted.

// imports form.php

// will need a field to be submitted which will validate again the database checking for the other user.

// validate.php? add elements to error array or completion array where message can be displayed. or put completion variable in the url query when redirecting back, then GET.

$errors = []; //these errors will be looped through and displayed above the form fields on this page.

// login logic to check $_POST values and validate
// session_start();
if($_SERVER['REQUEST_METHOD'] === 'POST') {

  var_dump($_POST);

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

    // Validate that amount provided is a positive number 
    if(!($loan_amount > 0)) {
      $errors[] = 'Transfer Amount must be positive';
    };

    if(empty($errors)) {

      $mysqli = require "../database.php";

      if(is_string($mysqli)) {
        $errors[] = $mysqli;
      } else {

        // Check database for recipient account - need multiple items in the query: id, name, movements
        $loan_sql = sprintf("SELECT * FROM customers WHERE id='%s'", $mysqli->real_escape_string($_SESSION['customer_id']));

        $loan_result = $mysqli->query($loan_sql);

        $loan_user = $loan_result->fetch_assoc(); //returns result as an associative array and assigns to $loan_user.

        echo '<br>';

        var_dump($loan_user);

        //Check user password
        if($user_password !== $loan_user['password']) {
          $errors[] = 'Password Incorrect';
        };
      }

      // VALIDATE USER
      if(empty($errors) && $loan_user) {

        // FINAL VALIDATION AND COMPLETION OF TRANSFER
        // if(empty($errors)) {
          // INSERT the positive transfer amount into the recipient account movements
          echo 'So far so good';
          echo '<br>'.'<br>'.$loan_user["movements"] .'<br>';

          $movementsArray = explode(', ', $loan_user["movements"]);
          $movementsDatesArray = explode(', ', $loan_user["movementsDates"]);

          var_dump($movementsArray, $loan_amount);

          // atleast 6 seperate deposits of amounts that are 10% of requested loan amount in the last 12 months.

          //use needed to bring in $loan_amount variable into anonymous function scope.

          // Retrieve all deposits that are >= 10% of loan amount requested
          $filteredArray = array_filter($movementsArray, function($mov) use ($loan_amount) {
            return $mov >= $loan_amount * 0.1;
          });
          
          echo '<br>';
          var_dump($filteredArray);

          // Retrieve all associated movementDates that match the indexes from array above

          $filteredMovDates = array_map(function($mov) use ($movementsDatesArray) {
            
            return $movementsDatesArray[$mov];
          }, array_keys($filteredArray));

          echo '<br>';
          var_dump($filteredMovDates);
        
          // Filter out any movementDates that are older than 12 months

            // Create Current Date
            $currentDateTime = new DateTime('now', new DateTimeZone('Europe/London'));

            $finalArray = array_filter($filteredMovDates, function($dateString) use ($currentDateTime) {
              $date = new DateTime($dateString);
              $interval = $date->diff($currentDateTime);
              return $interval->days <= 365; // Filter dates within 365 days (12 months)
            });

            echo '<br>';
            var_dump($finalArray);
            echo '<br>';

            // Check Array size
            $arrayLength = sizeof($finalArray);


          // If after this there are < 6 in the array then loan request unsuccessful and redirect to dashboard otherwise initiate the transaction.
            if($arrayLength < 6) {

              // Close Database Connection
              $mysqli->close();

              // Redirect to Dashboard - Unsuccessful
              header('Location: dashboard.php?completion=Loan+Request+Unsuccessful');
            } else if ($arrayLength >= 6) {

              include_once "./partials/loan_transaction.php";

            };
        // }
      }
    }
};

?>
<?php
include_once "partials/header.php";
?>
  
  <script defer src="dash_script.js"></script>

  </head>
  <body>

  <?php var_dump($_SESSION); ?>
    <header class="header">
      <nav class="nav">
        <img
          src="img/logo2.png"
          alt="Field Bank logo"
          class="nav__logo"
          id="logo"
          designer="Josh Fieldhouse"
        />
        <ul class="nav__links">
        <!-- Empty -->
        </ul>
        <a class="nav__link" href="index.php">Logout</a>
      </nav>
    </header>

    <!-- Return Button -->
    <a href="dashboard.php" class="btn"><-- Back</a>

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
        <button class="login__btn" type="submit">Confirm Loan Request</button>
      </form>
    </div>

<?php
  include_once "partials/footer.php";
?>

</body>
</html>