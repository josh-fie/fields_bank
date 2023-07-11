'use strict';

/////////////////////////////////////////////////
// FIELD BANK APP

/////////////////////////////////////////////////
// Elements
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

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    console.log(mov);

    const date = new Date(acc.movementDates[i]); //uses the index that is retrieved while looping through the movements to access the connected movements Dates. Needs to be converted into a Javscript Date object to be able to work with it.
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>;`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

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

    //In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds is reached, stop the timer and log out user
    if (time === 0) {
      clearInterval(timer);
      
      // call logout.php 
        // end and destroy session
        // redirect to index.php
    }

    //Decrease 1 second
    time--; //this must come after the conditional otherwise you will be logged out on 1 second instead of after 0.
  };
  //Set time to 5 minutes
  let time = 300; //in seconds

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

// Login - this won't be an event listener but called immediately.

// Data
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
// })
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

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); //use the language locale and this will put the date in the correct format. ISO Language Code Table. //You can replace the locale with a variable which has retrieved the locale from PC.

    // Timer
    if (timer) clearInterval(timer); //checks for already existing timer, if so stops it so that multipe don't exist and overlap.
    timer = startLogOutTimer(); //calls the function which generates a setInterval function which counts down and prints onto the UI every second.

    // Update UI
    updateUI(currentAccount);
  })
  .catch(error => {
    // Handle any errors that occur during the fetch request
    console.error('Error:', error);
  });


    // Display UI and message
    // labelWelcome.textContent = php title instead from SESSION. 

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = 
  
  accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //Reset timer
    clearInterval(timer); //is cleared because timer is global
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      //time delay on loan as if it is being approved by the bank.

      // Add movement
      currentAccount.movements.push(amount);

      //Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      //Reset timer
      clearInterval(timer); //is cleared because timer is global
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  }); //creates a real array from the node list that was returned from the querySelectorAll using the spread operator.
});

//the above requires an event listener because otherwise the colouring would be overwritten as soon as an account was logged into and repalced with the movements.

//The remainder operator is useful for doing something every nth time.

//Numeric Separators



// const calcdaysPassed = (date1, date2) => {
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// };

// const days1 = calcdaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
// console.log(days1); //returns in milliseconds without the division bit above which converts milliseconds into days.

//Moment.js for other strange date cases.

//If you include minutes and seconds then the result will be decimal and you may want to use Math.round to eliminate this.

//Internationalization of Dates

//there is an internationalisation API that can be used to help with this.

//Internationalisation of Numbers

// const options2 = {
//   style: 'percent', //unit, percent, currency
//   unit: 'celsius', //lots of units available
//   currency: 'EUR', //if style = currency then you need to define the currency.
//   useGrouping: false, //turns off commas in numbers
// };

// console.log('US: ', new Intl.NumberFormat('en-US', options2).format(num2));
// console.log('Germany: ', new Intl.NumberFormat('de-DE', options2).format(num2));
// console.log('Syria: ', new Intl.NumberFormat('ar-SY', options2).format(num2));
// console.log(
//   'Browser: ',
//   new Intl.NumberFormat(navigator.language).format(num2)
// );
