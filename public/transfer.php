<?php

// Session maintained
session_start();
// session name and id are persisted.

// imports form.php

// will need a field to be submitted which will validate again the database checking for the other user.

// validate.php? add elements to error array or completion array where message can be displayed. or put completion variable in the url query when redirecting back, then GET.

$errors = []; //these errors will be looped through and displayed above the form fields on this page.

$dest_amount = "";

// login logic to check $_POST values and validate
// session_start();
if($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Destination Account Details
    $dest_id = $_POST['dest_id'];
    $dest_name = $_POST['dest_name'];
    $dest_amount = $_POST['dest_amount'];

    // Current Account Password for Validation
    $user_password = $_POST['password'];

    if(!$dest_id) {
        $errors[] = 'Recipient Account ID not provided';
      }
    if(!$dest_name) {
        $errors[] = 'Recipient Name not provided';
      }
    if(!$dest_amount) {
        $errors[] = 'Transfer Amount not provided';
      }
    if(!$user_password) {
        $errors[] = 'Password not provided';
      }

    // CurrentAccount ID
    if($dest_id === $_SESSION['customer_id']) {
      $errors[] = 'Must provide an external Recipient Account ID';
    }

    // Validate Amount
    include_once "./partials/validateAmount.php";
    [$dest_amount, $errors] = validateAmount($dest_amount, $errors);

    // RETRIEVE DESTINATION/RECIPIENT USER FROM DATABASE
    if(empty($errors)) {

      $mysqli = require "../database.php";

      if(is_string($mysqli)) {
        $errors[] = $mysqli;
      } else {

        // Check database for recipient account - need multiple items in the query: id, name, movements
        $dest_sql = sprintf("SELECT * FROM customers WHERE id='%s'", $mysqli->real_escape_string($_POST['dest_id']));

        $dest_result = $mysqli->query($dest_sql);

        $dest_user = $dest_result->fetch_assoc(); //returns result as an associative array and assigns to $dest_user.

        // echo '<pre>';
        // var_dump( $dest_user);
        // echo '</pre>';
      
        // VALIDATE RECIPIENT
        if($dest_user) {

          //  Validate that name is connected to id provided above
          if($dest_user["name"] === $dest_name) {
            echo 'Username on destination account matches name provided!';
          } else {
            $errors[] = 'Account Name and ID do not match';
          }

          // Validate that amount provided is a positive number 
          if(!($dest_amount > 0)) {
            $errors[] = 'Transfer Amount must be positive';
          }

        } else {
          $errors[] = 'An error occurred. Please try again later.';
        }
      }

    // RETRIEVE USER FROM DATABASE
      if(empty($errors)) {
        // Check database for user account - need password for confirmation
        $user_sql = sprintf("SELECT * FROM customers WHERE id='%s'", $mysqli->real_escape_string($_SESSION['customer_id']));

        $user_result = $mysqli->query($user_sql);

        $user = $user_result->fetch_assoc(); //returns result as an associative array and assigns to $user.

        // echo '<br>' .'<pre>';
        // var_dump($user);
        // echo '</pre>';
      
      // VALIDATE USER
      if($user) {
        //Check user password
        if($user_password === $user["password"]) {
          

          // FINAL VALIDATION AND COMPLETION OF TRANSFER
          echo $user["password"].'<br>'.'All credentials validated. Time to process Transfer'.'<br>';
          
          // Sum Movements
          include_once "./functions/sumMovements.php";

          $acc_balance = sumMovements($user["movements"]);

          var_dump($acc_balance).'<br>';

          // Check if Insufficient Funds

          $transactionPoss = $dest_amount <= $acc_balance ? true : $errors[] = 'Insufficient Funds';

          if($transactionPoss) {

            include_once "./partials/transfer_transaction.php";

          }

        } else {
            // If password incorrect
          $errors[] = 'Password Incorrect';
        }
      } else {
        $errors[] = 'An error occurred. Please try again later.';
      }
    }
    };
}

?>
<?php
include_once "partials/header.php";
?>
  
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
        <a class="nav__link" href="index.php">Logout</a>
      </nav>
    </header>

    <!-- Return Button -->
    <a href="dashboard.php" class="btn--back"><-- Back</a>

      <!-- LOGIN FORM -->
    <div class="operation operation--transfer">
      <h2 class="login__header">
        Transfer Money
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
        <label for="dest_id">Recipient Account ID:</label>
        <input
          type="text"
          placeholder="Recipient ID"
          class="login__input login__input--user"
          id="dest_id"
          name="dest_id"
        />
        <label for="dest_name">Recipient Name:</label>
        <input
          type="text"
          placeholder="Name"
          class="login__input login__input--user"
          id="dest_name"
          name="dest_name"
        />
        <label for="dest_amount">Transfer Amount:</label>
        <input
          type="text"
          title="(e.g. 1,000.00)"
          pattern="^\d{1,3}(,\d{3})*(\.\d{2})?$"
          placeholder="£"
          class="login__input login__input--user"
          id="dest_amount"
          name="dest_amount"
          value="<?= htmlspecialchars($dest_amount) ?? "" ?>" 
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
        <button class="login__btn" type="submit">Confirm Transfer</button>
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
        You will be logged out in <span class="timer">05:00</span> due to inactivity.
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