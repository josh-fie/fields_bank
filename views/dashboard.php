<?php

// Session maintained: session name and id are persisted.
session_start();

?>

<!DOCTYPE html>
<html lang="en">
  <head>

  <?php include_once "partials/header.php"; ?>
  <script defer src="dash_script.js"></script>

  </head>
  <body>

  <?php 
  
  $completion = null;

  if($_GET) {
    
    // Completion Message sent to be displayed following Loan or Transfer
    if(isset($_GET["completion"])) $completion = $_GET["completion"];
    
  }

  ?>
    <header>
    <!-- TOP NAVIGATION -->
    <nav class="nav">
      <img
          src="img/logo2.png"
          alt="Field Bank logo"
          class="nav__logo"
          id="logo"
          designer="Josh Fieldhouse"
        />
      <ul class="nav__links">
        <li class="nav__item">
          <a class="nav__link" href="index.php?page=transfer">Transfer Money</a>
        </li>
        <li class="nav__item">
          <a class="nav__link" href="index.php?page=loan">Request a Loan</a>
        </li>
      </ul>
      <a class="nav__link" href="index.php?page=logout">Logout</a>
    </nav>
    </header>

    <main class="app">
      <?php if($completion && $completion !== "Loan Request Unsuccessful") { ?> 
      <div class="message_banner success"><h2><?php echo $completion ?></h2></div>
      <?php } else if ($completion && $completion === "Loan Request Unsuccessful") { ?>
      <div class="message_banner error"><h2><?php echo $completion ?></h2></div>
      <?php } ?>

      <!-- MODAL TIMER -->
      <div class="modal hidden">
      <h2 class="modal__header">Logout</h2>
      <span>in just 1 minute</span>
      <!-- LOGOUT TIMER -->
      <p class="logout-timer">
        You will be logged out in <span class="timer">05:00</span>
      </p>
      <button class="btn--close-modal">I'm Still Here</button>
      </div>
      <div class="overlay hidden"></div>
      
      <!-- BALANCE -->
      <div class="balance">
        <div>
          <p class="balance__label">Current balance</p>
          <p class="balance__date">
            As of <span class="date">01/01/0000</span>
          </p>
        </div>
        <p class="balance__value">£00.00</p>
      </div>

      <!-- SUMMARY -->
      <div class="summary">
        <div>
          <p class="summary__label">In</p>
          <p class="summary__value summary__value--in">0000€</p>
        </div>
        <div>
          <p class="summary__label">Out</p>
          <p class="summary__value summary__value--out">0000€</p>
        </div>
        <div>
          <p class="summary__label">Interest</p>
          <p class="summary__value summary__value--interest">0000€</p>
        </div>
        <button class="btn--sort">&downarrow; SORT</button>
      </div>

      <!-- MOVEMENTS -->
      <div class="movements">
        <div class="movements__row">
          <div class="movements__type movements__type--deposit"></div>
          <div class="movements__date"></div>
          <div class="movements__value"></div>
        </div>
        <div class="movements__row">
          <div class="movements__type movements__type--withdrawal">
            1 withdrawal
          </div>
          <div class="movements__date"></div>
          <div class="movements__value"></div>
        </div>
      </div>

    </main>

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
