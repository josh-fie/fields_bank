<?php

$errors = []; //these errors will be looped through and displayed above the form fields on this page.

// Check for $_GET error value - database connection error
if($_SERVER['REQUEST_METHOD'] === 'GET') {

  $dbError = isset($_GET["databaseerror"]);

  if($dbError) {
    $errors[] = $_GET["databaseerror"];
  };
};

// login logic to check $_POST values and validate
// session_start();
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($_POST['username']) && isset($_POST['password'])) {

    $username = $_POST['username'];
    $password = $_POST['password'];

    if(!$username) {
        $errors[] = 'Username not provided';
      }
    if(!$password) {
        $errors[] = 'Password not provided';
      }

    if(empty($errors)) {

      $mysqli = require "../database.php";

      if(is_string($mysqli)) {
        $errors[] = $mysqli;
      } else {

        // Check database for account
        $sql = sprintf("SELECT * FROM customers WHERE username='%s'", $mysqli->real_escape_string($_POST['username']));

        $result = $mysqli->query($sql);

        $user = $result->fetch_assoc(); //returns result as an associative array and assigns to $user.

        // if user exists check the password
        if($user) {

          var_dump($_POST);

          if($user['password'] === $_POST['password']) {
            echo 'Login successful';
            // If user exists:
            session_start();

            $_SESSION["customer_id"] = $user["id"];
            $_SESSION["name"] = $user["name"];

            // Redirect user to the dashboard once login completed.
            header('Location: dashboard.php');

          } else {
            // If user doesn't exist 
          $errors[] = 'Login Invalid';
          }
        } else {
          // If user doesn't exist 
        $errors[] = 'Login Invalid';
        }
      }
    };
}
}

?>
<?php
include_once "partials/header.php";
?>
  
  <script defer src="script.js"></script>

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
      </nav>
    </header>

      <!-- LOGIN FORM -->
    <div class="operation operation--login">
      <h2 class="login__header">
        Login in
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
        <label for="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          class="login__input login__input--user"
          id="username"
          name="username"
          value="<?= htmlspecialchars($_POST['username'] ?? "") ?>" 
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
        <button class="login__btn" type="submit">Login</button>
      </form>
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