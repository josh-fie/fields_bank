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
          When
          <!-- Green highlight effect -->
          <span class="highlight">banking</span>
          meets<br />
          <span class="highlight">minimalist</span>
        </h1>
        <h4>A simpler banking experience for a simpler life.</h4>
        <button class="btn--text btn--scroll-to">Learn more &DownArrow;</button>
        <img
          src="img/hero.png"
          class="showcase__img"
          alt="Minimalist bank items"
        />
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
          <h5 class="features__header">100% digital bank</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias
            sint quos? Accusantium a fugiat porro reiciendis saepe quibusdam
            debitis ducimus.
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
            Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
            inventore ab? Nulla incidunt eius numquam sequi iste pariatur
            quibusdam!
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
            Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim
            eveniet consequatur odit quam quos possimus assumenda dicta fuga
            inventore ab.
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
            <span>01</span>Instant Transfers
          </button>
          <button class="btn operations__tab operations__tab--2" data-tab="2">
            <span>02</span>Instant Loans
          </button>
          <button class="btn operations__tab operations__tab--3" data-tab="3">
            <span>03</span>Instant Closing
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
            Tranfser money to anyone, instantly! No fees, no BS.
          </h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div class="operations__content operations__content--2">
          <div class="operations__icon operations__icon--2">
            <svg>
              <use xlink:href="img/icons.svg#icon-home"></use>
            </svg>
          </div>
          <h5 class="operations__header">
            Buy a home or make your dreams come true, with instant loans.
          </h5>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
        <div class="operations__content operations__content--3">
          <div class="operations__icon operations__icon--3">
            <svg>
              <use xlink:href="img/icons.svg#icon-user-x"></use>
            </svg>
          </div>
          <h5 class="operations__header">
            No longer need your account? No problem! Close it instantly.
          </h5>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      </div>
    </section>

    <section class="section" id="section--3">
      <div class="section__title section__title--testimonials">
        <h2 class="section__description">Not sure yet?</h2>
        <h3 class="section__header">
          Millions of Bankists are already making their lifes simpler.
        </h3>
      </div>

      <div class="slider">
        <div class="slide">
          <div class="testimonial">
            <h5 class="testimonial__header">Best financial decision ever!</h5>
            <blockquote class="testimonial__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium quas quisquam non? Quas voluptate nulla minima
              deleniti optio ullam nesciunt, numquam corporis et asperiores
              laboriosam sunt, praesentium suscipit blanditiis. Necessitatibus
              id alias reiciendis, perferendis facere pariatur dolore veniam
              autem esse non voluptatem saepe provident nihil molestiae.
            </blockquote>
            <address class="testimonial__author">
              <img src="img/user-1.jpg" alt="" class="testimonial__photo" />
              <h6 class="testimonial__name">Aarav Lynn</h6>
              <p class="testimonial__location">San Francisco, USA</p>
            </address>
          </div>
        </div>

        <div class="slide">
          <div class="testimonial">
            <h5 class="testimonial__header">
              The last step to becoming a complete minimalist
            </h5>
            <blockquote class="testimonial__text">
              Quisquam itaque deserunt ullam, quia ea repellendus provident,
              ducimus neque ipsam modi voluptatibus doloremque, corrupti
              laborum. Incidunt numquam perferendis veritatis neque repellendus.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
              deserunt exercitationem deleniti.
            </blockquote>
            <address class="testimonial__author">
              <img src="img/user-2.jpg" alt="" class="testimonial__photo" />
              <h6 class="testimonial__name">Miyah Miles</h6>
              <p class="testimonial__location">London, UK</p>
            </address>
          </div>
        </div>

        <div class="slide">
          <div class="testimonial">
            <h5 class="testimonial__header">
              Finally free from old-school banks
            </h5>
            <blockquote class="testimonial__text">
              Debitis, nihil sit minus suscipit magni aperiam vel tenetur
              incidunt commodi architecto numquam omnis nulla autem,
              necessitatibus blanditiis modi similique quidem. Odio aliquam
              culpa dicta beatae quod maiores ipsa minus consequatur error sunt,
              deleniti saepe aliquid quos inventore sequi. Necessitatibus id
              alias reiciendis, perferendis facere.
            </blockquote>
            <address class="testimonial__author">
              <img src="img/user-3.jpg" alt="" class="testimonial__photo" />
              <h6 class="testimonial__name">Francisco Gomes</h6>
              <p class="testimonial__location">Lisbon, Portugal</p>
            </address>
          </div>
        </div>

        <button class="slider__btn slider__btn--left">&larr;</button>
        <button class="slider__btn slider__btn--right">&rarr;</button>
        <div class="dots"></div>
      </div>
    </section>

    <section class="section section--sign-up">
      <div class="section__title">
        <h3 class="section__header">
          The best day to join Bankist was one year ago. The second best is
          today!
        </h3>
      </div>
      <button class="btn btn--show-modal">Open your free account today!</button>
    </section>

<?php
include_once "partials/footer.php";
?>
  </body>
</html>
