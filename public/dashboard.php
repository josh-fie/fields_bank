<?php

// Session maintained
session_start();
// session name and id are persisted.

include_once "partials/header.php";
?>

  <script defer src="dash_script.js"></script>

  </head>
  <body>

  <?php 
  
  var_dump($_SESSION);
  
  $completion = null;

  if($_GET) {
    var_dump($_GET);
    $completion = $_GET["completion"];
    echo '<br>'.$completion;
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
          <a class="nav__link" href="transfer.php">Transfer Money</a>
        </li>
        <li class="nav__item">
          <a class="nav__link" href="loan.php">Request a Loan</a>
        </li>
      </ul>
      <a class="nav__link" href="index.php">Logout</a>
      <div class="nav__manage_acc">
        <button type="button">Manage Account</button>
        <div class="dropdown hidden">
          <li>
            <!-- Redirect to transfer.php -->
            <a href="transfer.php">Transfer Money</a>
          </li>
          <li>
            <!-- Redirect to loan.php -->
            <a href="loan.php">Request a Loan</a>
          </li>
          <li>
            <!-- Return to Index, destroy session -->
            <a href="logout.php">Logout</a>
          </li>
        </div>
      </div>
    </nav>
    </header>

    <main class="app">
      <?php if($completion && $completion !== "Loan Request Unsuccessful") { ?> 
      <div class="message_banner success"><h2><?php echo $completion ?></h2></div>
      <?php } else if ($completion && $completion === "Loan Request Unsuccessful") { ?>
      <div class="message_banner error"><h2><?php echo $completion ?></h2></div>
      <?php } ?>
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
        <p class="summary__label">In</p>
        <p class="summary__value summary__value--in">0000€</p>
        <p class="summary__label">Out</p>
        <p class="summary__value summary__value--out">0000€</p>
        <p class="summary__label">Interest</p>
        <p class="summary__value summary__value--interest">0000€</p>
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

      <!-- OPERATION: TRANSFERS -->
      <!-- <div class="operation operation--transfer">
        <h2>Transfer money</h2>
        <form class="form form--transfer">
          <input type="text" class="form__input form__input--to" />
          <input type="number" class="form__input form__input--amount" />
          <button class="form__btn form__btn--transfer">&rarr;</button>
          <label class="form__label">Transfer to</label>
          <label class="form__label">Amount</label>
        </form>
      </div> -->

      <!-- OPERATION: LOAN -->
      <!-- <div class="operation operation--loan">
        <h2>Request loan</h2>
        <form class="form form--loan">
          <input type="number" class="form__input form__input--loan-amount" />
          <button class="form__btn form__btn--loan">&rarr;</button>
          <label class="form__label form__label--loan">Amount</label>
        </form>
      </div> -->

      <!-- OPERATION: CLOSE -->
      <!-- <div class="operation operation--close">
        <h2>Close account</h2>
        <form class="form form--close">
          <input type="text" class="form__input form__input--user" />
          <input
            type="password"
            maxlength="6"
            class="form__input form__input--pin"
          />
          <button class="form__btn form__btn--close">&rarr;</button>
          <label class="form__label">Confirm user</label>
          <label class="form__label">Confirm PIN</label>
        </form>
      </div> -->

      <!-- LOGOUT TIMER -->
      <p class="logout-timer">
        You will be logged out in <span class="timer">05:00</span>
      </p>
    </main>

<?php
include_once "partials/footer.php";
?>

  </body>
</html>
