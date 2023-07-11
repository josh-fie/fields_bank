<?php

// Session maintained
session_start();
// session name and id are persisted.

var_dump($_SESSION);

// imports form.php

// will need a field to be submitted which will validate again the database checking for the other user.

// validate.php? add elements to error array or completion array where message can be displayed. or put completion variable in the url query when redirecting back, then GET.

$errors = []; //these errors will be looped through and displayed above the form fields on this page.

// login logic to check $_POST values and validate
// session_start();
if($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Destination Account Details
    $dest_id = $_POST['dest_id'];
    $dest_name = $_POST['dest_name'];
    $dest_amount = $_POST['dest_amount'];

    // Current Account Password for Validation
    $password = $_POST['password'];

    if(!$dest_id) {
        $errors[] = 'Recipient Account ID not provided';
      }
    if(!$dest_name) {
        $errors[] = 'Recipient Name not provided';
      }
    if(!$dest_amount) {
        $errors[] = 'Transfer Amount not provided';
      }
    if(!$password) {
        $errors[] = 'Password not provided';
      }

    if(empty($errors)) {

      $mysqli = require "../database.php";

      // Check database for recipient account - need multiple items in the query: id, name, movements
      $dest_sql = sprintf("SELECT * FROM customers WHERE id='%s'", $mysqli->real_escape_string($_POST['dest_id']));

      $dest_result = $mysqli->query($dest_sql);

      $dest_user = $dest_result->fetch_assoc(); //returns result as an associative array and assigns to $dest_user.
    
    // VALIDATE RECIPIENT
    // Validate id provided

    //  that name is connected to id provided above


      // Check database for user account - need password for confirmation
      $user_sql = sprintf("SELECT * FROM customers WHERE id='$_SESSION[id]'");

      $user_result = $mysqli->query($user_sql);

      $user = $user_result->fetch_assoc(); //returns result as an associative array and assigns to $user.

    // VALIDATE USER
    // Validate that amount provided is a positive number 

        if($dest_amount > 1) {
            // Check that amount is available for transfer from user account
                // Add up all movements to get summary total
        } else {
            $errors[] = 'Transfer Amount must be positive';
        };

      //Check user password
      if($password === $user['password']) {

          // Redirect user to the dashboard once transfer completed.
          header('Location: dashboard.php?completion=transfer+successful');

        } else {
          // If password incorrect
        $errors[] = 'Password Incorrect';
        }

        // FINAL VALIDATION AND COMPLETION OF TRANSFER
        if(empty($errors)) {
            // INSERT the positive transfer amount into the recipient account movements


            // INSERT negative movement into the user account movements.
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
    <header class="header">
      <nav class="nav">
        <img
          src="img/logo.png"
          alt="Bankist logo"
          class="nav__logo"
          id="logo"
          designer="Jonas"
          data-version-number="3.0"
        />
        <ul class="nav__links">
        <!-- Empty -->
        </ul>
      </nav>
    </header>

      <!-- LOGIN FORM -->
    <div class="login">
      <h2 class="login__header">
        Transfer Money
      </h2>

      <!-- If errors display them before form -->
      <?php if (!empty($errors)) { ?>
        <div class="alert alert-danger">

          <?php foreach ($errors as $error) { ?>
            <div><?php echo $error ?></div>
          <?php } ?>
        </div>
      <?php } ?>

      <!-- Submission stays on this page and is validated here -->
      <form action="" method="post" class="login__form" enctype="multipart/form-data">
        <label for="dest_id">Recipient Account ID:</label>
        <input
          type="text"
          placeholder="ID"
          class="login__input login__input--user"
          id="dest_id"
          name="dest_id"
          value="<?= htmlspecialchars($_POST['$dest_id'] ?? "") ?>" 
        />
        <label for="dest_name">Recipient Name:</label>
        <input
          type="text"
          placeholder="name"
          class="login__input login__input--user"
          id="dest_name"
          name="dest_name"
          value="<?= htmlspecialchars($_POST['$dest_name'] ?? "") ?>" 
        />
        <label for="dest_amount">Transfer Amount:</label>
        <input
          type="text"
          placeholder="Username"
          class="login__input login__input--user"
          id="dest_amount"
          name="dest_amount"
          value="<?= htmlspecialchars($_POST['$dest_amount'] ?? "") ?>" 
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
    </div>
    <div class="overlay"></div>

<?php
  include_once "partials/footer.php";
?>

</body>
</html>