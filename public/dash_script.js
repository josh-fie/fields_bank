'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

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

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2022-12-15T14:43:26.374Z',
    '2022-12-21T18:49:59.371Z',
    '2022-12-23T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

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

    const date = new Date(acc.movementsDates[i]); //uses the index that is retrieved while looping through the movements to access the connected movements Dates. Needs to be converted into a Javscript Date object to be able to work with it.
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

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

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
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    //Decrease 1 second
    time--; //this must come after the conditional otherwise you will be logged out on 1 second instead of after 0.
  };
  //Set time to 5 minutes
  let time = 120; //in seconds

  //Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;

  //resetting on activity happens within the transfer and loan request functions
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//FAKE always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//Experimenting with Internationalisation API
const now = new Date();
const options = {
  //config object for .DateTimeFormat and options is defined as an argument.
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long', //'long', 'numeric', '2-digit',
  year: 'numeric', //'2-digit'
  weekday: 'long',
};

const locale = navigator.language; //retrieve locale from PC.
console.log(locale);

labelDate.textContent = new Intl.DateTimeFormat('en-GB', options).format(now); //use the language locale and this will put the date in the correct format. ISO Language Code Table. //You can replace the locale with a variable which has retrieved the locale from PC.

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

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

    // const locale = navigator.language; //retrieve locale from PC.
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); //use the language locale and this will put the date in the correct format. ISO Language Code Table. //You can replace the locale with a variable which has retrieved the locale from PC.

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer); //checks for already existing timer, if so stops it so that multipe don't exist and overlap.
    timer = startLogOutTimer(); //calls the function which generates a setInterval function which counts down and prints onto the UI every second.

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
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

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
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

console.log(23 === 23.0);

//Numbers are always represented as floating point numbers (decimals even if they are just integers). Numbers are represented in a 64 base 2 format (binary) which causes problems when representing fractions that would be easy in base 10.

//Base 10 - 0 to 9, 1/10 = 0.1. 3/10 = 3.3333333
//Binary base 2 - 0,1

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); ///returns false but should be true. Javascript has problems with complex numbers due to infinite decimals.

//Conversion
console.log(Number('23'));
console.log(+'23'); //can use + instead of number() as javascript will automatically use type coercion to convert strings to numbers.

//Parsing -removes unecessary symbols/units that are not numbers. second parameter is radix (number type - binary or base 10)
console.log(Number.parseInt('30px', 10)); //30 (a number)
console.log(Number.parseInt('e23', 10)); // NaN

console.log(Number.parseInt('2.5rem')); // 2
console.log(Number.parseFloat('2.5rem')); // 2.5 (floating point number includes the decimal)

//parseFloat - the go to for parsing numbers.

console.log(Number.parseInt('  30px  ')); // 30, white space doesn't affect the function.

// console.log(parseFloat('  2.5rem ')); older way of doing this without the 'namespace' Number. SHould use the namespace.

//isNaN - check if value is NaN (literally as per the value type)
console.log(Number.isNaN(20)); //false
console.log(Number.isNaN('20')); //false as is a regular value but not NaN
console.log(Number.isNaN(+'20X')); //true
console.log(Number.isNaN(23 / 0)); // false, produces infinity(separate value in Javascript).

//isFinite - better for checking for numbers
console.log(Number.isFinite(20)); //true
console.log(Number.isFinite('20')); //false as isn't a number
console.log(Number.isFinite(+'20X')); //false as NaN
console.log(Number.isFinite(23 / 0)); //false as is Infinity

//isInteger
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

//Maths and Rounding

//.sqrt - Square Root
console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2)); //also square root as above
console.log(8 ** (1 / 3)); //cubic root

//Max and min
console.log(Math.max(5, 18, 23, 11, 2)); //23
console.log(Math.max(5, 18, '23', 11, 2)); //23
console.log(Math.max(5, 18, '23px', 11, 2)); // NaN - doesn't do parsing
console.log(Math.min(5, 18, 23, 11, 2)); //2

console.log(Math.PI); //3.1415....
console.log(Math.PI * Number.parseFloat('10px') ** 2); //to calculate the area of a circle with 10px radius

console.log(Math.trunc(Math.random() * 6) + 1); //similute a dice roll. .random gives a value between 0 and 1.

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

console.log(randomInt(10, 20));

// Rounding integers - type coercion works on these below
console.log(Math.trunc(23.3));

console.log(Math.round(23.3)); //23
console.log(Math.round(23.9)); //24

console.log(Math.ceil(23.3)); //24
console.log(Math.ceil(23.9)); //24

console.log(Math.floor(23.3)); //23
console.log(Math.floor('23.9')); //23

console.log(Math.trunc(-23.3)); //-23
console.log(Math.floor(-23.9)); //-24
//.trunc anf .floor work the same with positive numbers but differ with negative numbers as floor accounts for the negative.

//Rounding Decimals

console.log((2.7).toFixed(0)); //3 as a string and not a number
console.log((2.7).toFixed(3)); //2.700 string
console.log((2.345).toFixed(2)); //2.35 string
console.log(+(2.345).toFixed(2)); //2.35 number

//Remainder Operator - %

console.log(5 % 2); //1
console.log(5 / 2); //2.5

console.log(8 % 3); //2
console.log(8 / 3); //2.666666666665

console.log(6 % 2); //0
console.log(6 / 2); //3

console.log(7 % 2); //1
console.log(7 / 2); //3.5

const isEven = n => n % 2 === 0; //if true then even, otherwise if false is odd.

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  }); //creates a real array from the node list that was returned from the querySelectorAll using the spread operator.
});

//the above requires an event listener because otherwise the colouring would be overwritten as soon as an account was logged into and repalced with the movements.

//The remainder operator is useful for doing something every nth time.

//Numeric Separators

// 287,460,000,000
const diameter = 287_460_000_000; //use the underscore as a replacement for a comma in a number.
console.log(diameter); //ignores the underscores

const priceCents = 345_99;
console.log(priceCents); //34599

const transferFee1 = 15_00; //1500
const transferFee2 = 1_500; //1500

const PI = 3.14_15;
// const PI = 3._1415; //not allowed to place it here
// const PI = _3.1415; //not allowed to place it here
// const PI = 3.1415_; //not allowed to place it here
// const PI = 3.14__15; //not allowed 2 underscores

console.log(Number('230000')); //230000
console.log(Number('230_000')); //doesn't work with a string - therefore do not use with an API or retrieve them from an API with underscores as Javascript cannot parse this into a number.

console.log(Number.parseInt('230_000')); //will only parse the 230.

//Working with BigInt

//introduced in 2020 as a special primitive integer.

console.log(2 ** 53 - 1); //max safe integer - biggest number that Javascript can safely represent.
console.log(Number.MAX_SAFE_INTEGER);

//storing a value larger than this safely, eg. a number from an API 60 bit, was impossible before BigInt.

console.log(34543543543543543534533485345834853453);
console.log(34543543543543543534533485345834853453n); //adding the n converts the number into a BigInt.

console.log(BigInt(34543543543543543534533485345834853453)); //doesn't produce the same number as above with the n added as it still needs to go through Javascript engine before being converted to a BigInt. Only use with smaller integers

//Operations
console.log(10000n + 10000n); //20000n
console.log(4555345934859348594850934853034853954n * 1000000000n); //gives huge result with n added.

const huge = 457348573487583475834853n;
const num = 23;

// console.log(huge * num); //error as cannot mix BigInt and normal numbers, this is where you would need to use the BigInt() constructor to convert to allow the operation.

//Exceptions

//comparison operations
console.log(20n > 15); //true
console.log(20n === 20); //false as type coercion means they won't match as they are different types

//Math methods do not work with BigInt
// console.log(Math.sqrt(16n)); //doesn't work

console.log(20n == '20'); //true, would work due to type coercion.

//concatenation
console.log(huge + ' is REALLY big!!!');

//Divisions

console.log(10n / 3n); //3n - returns the closest BigInt
console.log(10 / 3); // 3.3333333333335

//Creating Dates

//4 ways to do so

const now1 = new Date();
console.log(now1);

//write a string
console.log(new Date('Aug 02 2020 18:05:41')); //returns a parsed date
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); //the month is zero based
console.log(new Date(2037, 10, 31)); // Tue Dec 01 2037

console.log(new Date(0)); //Jan 01 1970

//0 being the beginning of UNIX time January 1st 1970.

console.log(new Date(3 * 24 * 60 * 60 * 1000)); //converts to milliseconds. days * hours * minutes * seconds * 1000 to convert to milliseconds. Jan 04 1970.

//Working with Dates
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); //2037
console.log(future.getMonth()); // 10
console.log(future.getDate()); // 19
console.log(future.getDay()); // 4 - equivalent to Thursday
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString()); // 2037-11-19T15:23:00.000Z
console.log(future.getTime()); //produces milliseconds that have passed since Jan 01 1970. //2142256980000

console.log(Date.now()); //gives timestamp for now

future.setFullYear(2040);
console.log(future); // Mon Nov 19 2040 15:23:00
*/
//Adding Dates to Bankist App
//above

//Operations with Dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcdaysPassed = (date1, date2) => {
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
};

const days1 = calcdaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
console.log(days1); //returns in milliseconds without the division bit above which converts milliseconds into days.

//Moment.js for other strange date cases.

//If you include minutes and seconds then the result will be decimal and you may want to use Math.round to eliminate this.

//Internationalization of Dates

//there is an internationalisation API that can be used to help with this.

//Internationalisation of Numbers

const num2 = 3884764.23;

const options2 = {
  style: 'percent', //unit, percent, currency
  unit: 'celsius', //lots of units available
  currency: 'EUR', //if style = currency then you need to define the currency.
  useGrouping: false, //turns off commas in numbers
};

console.log('US: ', new Intl.NumberFormat('en-US', options2).format(num2));
console.log('Germany: ', new Intl.NumberFormat('de-DE', options2).format(num2));
console.log('Syria: ', new Intl.NumberFormat('ar-SY', options2).format(num2));
console.log(
  'Browser: ',
  new Intl.NumberFormat(navigator.language).format(num2)
);

//Timers: setTimeout and setInterval

//setTimeout
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  /*milliseconds until the callback function is called */ 3000,
  ...ingredients //after defining the time you can input arguments that will be used by the function. Spread operator takes ingredients out of array
);
//Delayed calling the callback function by 3 seconds after page reload. The code continues being read after the setTimeout function has been called and the callback function has been registered. Eg. if you put a console log after the setTimeout it will appear in the console before the delayed console log despite being called first.

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); //array method .includes used, if true then the timeout function that is specified is cancelled before it can be displayed.

//clearTimeout can be used up to when the callback function is called.

//setInterval
// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000); //will call the callback function every second.

//Challenge - create a clock that shows the hour, minute and second every second in the console.
// setInterval(function () {
//   const date = new Date();
//   console.log(
//     new Intl.DateTimeFormat('en-US', {
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//     }).format(date)
//   );
// }, 1000);

// return `${day}/${month}/${year}`;
// return new Intl.DateTimeFormat(locale).format(date);

// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());

//Implementing a Countdown Timer

//real banks will log you out after 5 minutes of inactivity
