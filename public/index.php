<?php
include_once "partials/header.php";
?>
  
  <script defer src="script.js"></script>

  </head>
  <body>
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
          <li class="nav__item">
            <a class="nav__link" href="#section--1">Features</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="#section--2">Operations</a>
          </li>
          <li class="nav__item">
            <a class="nav__link" href="#section--3">Testimonials</a>
          </li>
        </ul>
        <a class="nav__link" href="login.php">Login</a>
      </nav>
      <div class="showcase">
        <h1>
          Experience
          <!-- Green highlight effect -->
          <span class="highlight">Rural</span>
          banking<br />
          <!-- <span class="highlight">minimalist</span> -->
        </h1>
        <h4>Community banking with a personal touch.</h4>
        <button class="btn--text btn--scroll-to">Learn more &DownArrow;</button>
        <div class="showcase__login">
          <h2>Internet Banking</h2>
          <a class="btn" href="login.php">Login</a>
        </div>
      </div>
    </header>

    <section class="section" id="section--1">
      <div class="section__title">
        <h2 class="section__description">Features</h2>
        <h3 class="section__header">
          Everything you need in a modern bank and more.
        </h3>
      </div>

      <div class="features">
        <img
          src="img/digital-lazy.jpg"
          data-src="img/digital.jpg"
          alt="Computer"
          class="features__img lazy-img"
        />
        <div class="features__feature">
          <div class="features__icon">
            <svg>
              <use xlink:href="img/icons.svg#icon-monitor"></use>
            </svg>
          </div>
          <h5 class="features__header">100% online banking</h5>
          <p>
            Find all of our banking features available to any account holder through our 100% online platform accessible through any device. Simply login and have immediate access to your funds without any need to step out of your door.
          </p>
        </div>

        <div class="features__feature">
          <div class="features__icon">
            <svg>
              <use xlink:href="img/icons.svg#icon-trending-up"></use>
            </svg>
          </div>
          <h5 class="features__header">Watch your money grow</h5>
          <p>
            All regular current accounts provide a detailed overview of your account balance including outgoings, incomings and interest income as well as an easily navigable bank statement for viewing deposits and withdrawals quickly.
          </p>
        </div>
        <img
          src="img/grow-lazy.jpg"
          data-src="img/grow.jpg"
          alt="Plant"
          class="features__img lazy-img"
        />

        <img
          src="img/card-lazy.jpg"
          data-src="img/card.jpg"
          alt="Credit card"
          class="features__img lazy-img"
        />
        <div class="features__feature">
          <div class="features__icon">
            <svg>
              <use xlink:href="img/icons.svg#icon-credit-card"></use>
            </svg>
          </div>
          <h5 class="features__header">Free debit card included</h5>
          <p>
            A free debit card will be posted out to you within 5 working days of opening an account with us. Competitive interest rates are offered on all accounts and reward options are available based on card usage.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="section--2">
      <div class="section__title">
        <h2 class="section__description">Operations</h2>
        <h3 class="section__header">
          Everything as simple as possible, but no simpler.
        </h3>
      </div>

      <div class="operations">
        <div class="operations__tab-container">
          <button
            class="btn operations__tab operations__tab--1 operations__tab--active"
            data-tab="1"
          >
            <span>01</span>
            <span>Instant Transfers</span>
          </button>
          <button class="btn operations__tab operations__tab--2" data-tab="2">
            <span>02</span>
            <span>Instant Loans</span>
          </button>
          <button class="btn operations__tab operations__tab--3" data-tab="3">
            <span>03</span>
            <span>Instant Customer Service</span>
          </button>
        </div>
        <div
          class="operations__content operations__content--1 operations__content--active"
        >
          <div class="operations__icon operations__icon--1">
            <svg>
              <use xlink:href="img/icons.svg#icon-upload"></use>
            </svg>
          </div>
          <h5 class="operations__header">
            Transfer money instantly to anyone!
          </h5>
          <p>
            All bank transfers are validated and completed within seconds providing you ultimate flexibility and fluidity with your money. No fees are charged on any outgoing or incoming transfers.
          </p>
        </div>

        <div class="operations__content operations__content--2">
          <div class="operations__icon operations__icon--2">
            <svg>
              <use xlink:href="img/icons.svg#icon-home"></use>
            </svg>
          </div>
          <h5 class="operations__header">
            Immediate loans provided to get projects kickstarted!
          </h5>
          <p>
            Easy to understand terms and conditions are provided prior to any loan request. All loan requests do not affect your credit rating and there is no limit on the number of requests. No loan request maximum given that you have the funds to repay over a payment period.
          </p>
        </div>
        <div class="operations__content operations__content--3">
          <div class="operations__icon operations__icon--3">
            <svg>
              <use xlink:href="img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <h5 class="operations__header">
            Any questions about your account? Contact us now!
          </h5>
          <p>
            Field Bank operates 24 hour customer service over telephone, text or web chat. This way you can reach us any time of the day to discuss your account and not have to delay important decisions.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="section--3">
      <div class="section__title section__title--testimonials">
        <h2 class="section__description">Not sure yet?</h2>
        <h3 class="section__header">
          Millions are already onboard
        </h3>
      </div>

      <div class="slider">
        <div class="slide">
          <div class="testimonial">
            <h5 class="testimonial__header">Fantastic Customer Service!</h5>
            <blockquote class="testimonial__text">
              I needed help with requesting a loan and so contacted Field Bank customer service by text and received a response within 30 seconds. They advised me where to find the terms and conditions for the request and walked me through the process. It made the job seamless and saved me lots of time which otherwise would have been wasted at other banks waiting on hold to speak to someone.
            </blockquote>
            <address class="testimonial__author">
              <img src="img/user-1.jpg" alt="" class="testimonial__photo" />
              <h6 class="testimonial__name">John Brown</h6>
              <p class="testimonial__location">London, UK</p>
            </address>
          </div>
        </div>

        <div class="slide">
          <div class="testimonial">
            <h5 class="testimonial__header">
              A bank for the community
            </h5>
            <blockquote class="testimonial__text">
              I was reluctant at first to consider Field Bank given that they were new to the banking scene. However, they have risen well above my expectations. In the time that I have been banking with Field Bank I have not faced any issues and communication has been prompt and catered to my needs. I really feel a part of the Field Bank community.
            </blockquote>
            <address class="testimonial__author">
              <img src="img/user-2.jpg" alt="" class="testimonial__photo" />
              <h6 class="testimonial__name">Julia Wood</h6>
              <p class="testimonial__location">Peterborough, UK</p>
            </address>
          </div>
        </div>

        <div class="slide">
          <div class="testimonial">
            <h5 class="testimonial__header">
              Easy to understand and operate
            </h5>
            <blockquote class="testimonial__text">
              The website is very simple to navigate and has the core functionality that I need for my personal banking. My account is updated instantly after any action I take on my account so that subsequent actions can be taken without waiting for lengthy approvals. I would recommend them to anyone who wanted to simplify their banking!
            </blockquote>
            <address class="testimonial__author">
              <img src="img/user-3.jpg" alt="" class="testimonial__photo" />
              <h6 class="testimonial__name">Mohammed Iqbal</h6>
              <p class="testimonial__location">Liverpool, UK</p>
            </address>
          </div>
        </div>

        <button class="slider__btn slider__btn--left">&larr;</button>
        <button class="slider__btn slider__btn--right">&rarr;</button>
        <div class="dots"></div>
      </div>
    </section>

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
