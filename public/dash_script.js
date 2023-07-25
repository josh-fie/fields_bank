'use strict';

/////////////////////////////////////////////////
// FIELD BANK APP

/////////////////////////////////////////////////
// Elements
const nav = document.querySelector('.nav');

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
// const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  //days passed function
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  //else { not needed as this portion of code only executed if conditions above not met
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(
    locale,
    /*options object*/ {
      style: 'currency',
      currency: currency,
    }
  ).format(value); //make sure to pass in the thing to be formatted.
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  console.log(acc);

  // Create a map from the movements and movementDates arrays in the object (currentAccount - acc).

  let transMap = new Map();
      
  // const keys = Object.keys(originalObject);
  const movArray = acc.movements;
  const movDatesArray = acc.movementDates;
  
  for (let i = 0; i < movDatesArray.length; i++) {
    transMap.set(movDatesArray[i], movArray[i]);
  }

  console.log(transMap);

  // Where sorted is true, sort the map
  // let sortedMap = new Map([...transMap.entries()].sort((a, b) => a[1] - b[1]));

  if(sort === true) {
    transMap = new Map([...transMap.entries()].sort((a, b) => a[1] - b[1]));
  };

  console.log(transMap);
  console.log(transMap.entries());

  // Loop through the entries in the map to produce the HTML code to be inserted.
  // transMap.forEach((mov, movDate, map) => {
  //   const index = Array.from(map.keys()).indexOf(movDate);
  //   console.log(`Index: ${index}, Key: ${movDate}, Value: ${mov}`);
  // });

  transMap.forEach((mov, movDate, map) => {

    const index = Array.from(map.keys()).indexOf(movDate);

    const type = mov > 0 ? 'deposit' : 'withdrawal';

    console.log(mov);

    const date = new Date(movDate); // Needs to be converted into a Javscript Date object to be able to work with it.

    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      index + 1
      } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
      </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

};

  // movs.forEach(function (mov, i) {
  //   const type = mov > 0 ? 'deposit' : 'withdrawal';

  //   console.log(mov);

  //   const date = new Date(acc.movementDates[i]); //uses the index that is retrieved while looping through the movements to access the connected movements Dates. Needs to be converted into a Javscript Date object to be able to work with it.
  //   const displayDate = formatMovementDate(date, acc.locale);

  //   const formattedMov = formatCur(mov, acc.locale, acc.currency);

  //   const html = `<div class="movements__row">
  //       <div class="movements__type movements__type--${type}">${
  //     i + 1
  //   } ${type}</div>
  //       <div class="movements__date">${displayDate}</div>
  //       <div class="movements__value">${formattedMov}</div>
  //     </div>`;

  //   containerMovements.insertAdjacentHTML('afterbegin', html);
  // });
// };

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};


const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0); /* remainder */

    //In each call, print the remaining time to the UI and the modal (even if not visible)
    labelTimer.textContent = `${min}:${sec}`;

    //When 60 seconds is reached, display a modal warning of impending logout, which must be continued to close Modal.
    if (time === 60) {
      openModal();
    }

    //When 0 seconds is reached, stop the timer and log out user
    if (time === 0) {
      clearInterval(timer);
      
      // call logout.php 
      window.location.href = 'index.php?page=logout';
    }

    //Decrease 1 second
    time--; //this must come after the conditional otherwise you will be logged out on 1 second instead of after 0.
  };

  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;

  //resetting on activity happens within the transfer and loan request functions
};

const convertNumber = function(arr, type) {

  let num = arr[0];
  const adjArray = num.split(', ').map(str => {
    if(type === 'movs') {return +str};
    if(type === 'dates') {return str};
  });

  return adjArray;
}

const constructAccount = function(fetchobj) {

  // Set Locale
  const locale = navigator.language; //retrieve locale from PC.
  let movements = [fetchobj.movements];
  let movementDates = [fetchobj.movementsDates];

  movements = convertNumber(movements, 'movs');
  movementDates = convertNumber(movementDates, 'dates');

  let accountObj = {
    owner: fetchobj.name,
    interestRate: +fetchobj.interestRate,
    movements: movements,
    movementDates: movementDates,
    currency: fetchobj.currency,
    locale: locale
  };

  return accountObj;
}

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//Set time to 5 minutes
let time = 300; //in seconds

// Login - this won't be an event listener but called immediately.

// Data Template
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2022-12-21T23:36:17.929Z',
    '2022-12-23T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

//fetch to database.php (secondary which echoes back)
fetch('../retrieve_dash.php', {
    method: 'GET', // or 'GET' depending on your requirements
    headers: {
      'Content-Type': 'application/json', // Modify the content type as needed
      // Additional headers can be included here
    },
  })
  .then(response =>
    response.json()
  )
  .then(data => {
    // Handle the response data from the PHP file
    console.log(data);
    // Construct CurrentAccount object.
    currentAccount = constructAccount(data);
    console.log(currentAccount);

    //Create current date and time
    //Experimenting with Internationalisation API
    const now = new Date();
    const options = {
      //config object for .DateTimeFormat and options is defined as an argument.
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', //'long', 'numeric', '2-digit',
      year: 'numeric', //'2-digit'
      // weekday: 'long',
    };

    // Timer
    if (timer) clearInterval(timer); //checks for already existing timer, if so stops it so that multipe don't exist and overlap.
    timer = startLogOutTimer(); //calls the function which generates a setInterval function which counts down and prints onto the UI every second.

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); //use the language locale and this will put the date in the correct format. ISO Language Code Table. //You can replace the locale with a variable which has retrieved the locale from PC.

    // Update UI
    updateUI(currentAccount);
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    // console.error('Error:', error);

    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      // Redirect to logout.php if the response is not valid JSON
      alert('Something went wrong. You will now be logged out');
      window.location.href = 'index.php?page=logout';
    } else if (error instanceof TypeError && error.message.includes('Cannot set properties of null')) {
      return
      // console.error('Not Dashboard Error:', error);
    } else {
      console.error('Error:', error);
    };
  });

// Modal window

const openModal = function (e) {
  // e.preventDefault(); //prevents page from jumping up to the top when a link is clicked.
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');

  time = 300;
};

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Sort Button Handling
let sorted = false;
btnSort ? btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
}) : null;

// Resize Nav Logo
// Get a reference to your image element
const imageLogo = document.querySelector('.nav__logo');

// Function to update the image source based on window width
function updateImageSource() {
  if (window.innerWidth <= 375) {
    imageLogo.src = './img/logo_small.png';
  } else {
    imageLogo.src = './img/logo2.png';
  }
}

// Initial update when the page loads
updateImageSource();

// Update the image source on window resize
window.addEventListener('resize', updateImageSource);

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

//Passing "argument" into handler. Event functions cannot have arguments other than the e (event) so you can use the this keyword to introduce new "arguments". The below using the bind method to initially bind the opacity as this
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1)); //mouseout is the opposite of mouseover

// Link to Contact Section Click
const contactLink = document.querySelector('a[href="#section--contact"]');

contactLink.addEventListener('click', function (e) {
  e.preventDefault();

  const element = document.querySelector('.section--contact');

  //Matching strategy
    
    let headerOffset;

    // Get the root font size in pixels (based on the computed style)
    const computedStyles = window.getComputedStyle(nav);
    const height = computedStyles.getPropertyValue('height');
    const parsedHeight = parseInt(height, 10);
    console.log(height, parsedHeight);

    const NavValueInPixels = parsedHeight;

    // If section hidden then add offset to scroll
    if(element.classList.contains('section--hidden')) {
        headerOffset = NavValueInPixels + 60; //should account for scroll up of section.
        console.log('Section hidden. Offset increased');
    } else {
        headerOffset = NavValueInPixels; //should be 9rem value
    }

    const elementPosition = element.getBoundingClientRect().top;

    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    const elementPos = elementPosition + window.scrollY;

    // Scroll to the desired position
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth', // Optional: Add smooth scrolling effect
    });
});