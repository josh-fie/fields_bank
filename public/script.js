'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////

//Button Scrolling

btnScrollTo ? btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  //.getBoundingClientRect() provides x and y coordinates for the target rectangle as well as height and width and is relative to the viewport, so when scrolling the x and y may change.

  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset); //these show how far offet the current viewport is from the default 0, 0 position

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth //these show height and width of the viewport.
  );

  //Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  //Modern version just needs .scrollIntoView

  section1.scrollIntoView({ behavior: 'smooth' });
}) : null;

//Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault(); //prevents the page from moving to the anchor id further down the page by default
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' }); // the id anchors from the links become the selected query for the smooth scrolling behaviour.
//   });
// });

//event delegation -

//1. add the eventlistener to a common parent element of all the elements we are interested in
//2. Determine what element originated the event

const navLinks = document.querySelector('.nav__links');

navLinks ? navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
}) : null;

//Tabbed component

// tabs.forEach(t => t.addEventListener('click', () => console.log('TAB'))) could do this to have a function for each tab but this would mean the callback function for every tab and would be better handled with event delegation.

tabsContainer ? tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return; //Guard Clause which immediately ends the function.

  //Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active')); //removes active class on all tabs
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate tab
  clicked.classList.add('operations__tab--active');

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`) //accesses data-tab number using dataset.tab(CamelCase but only one word)
    .classList.add('operations__content--active');
}) : null;

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

//Sticky Navigation

/*

//Advise not to use the scroll event as this will fire constantly as the user scrolls and affects performance.
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);

window.addEventListener('scroll', function () {
  //the scroll event is available on the window object and not the document.
  console.log(window.scrollY); //shows you the y scroll position from the top of the viewport.

  if (this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

//Better Way: Intersection Observer API

//When the target element intersects the root at the set threshold, eg. 10% the callback function will be called. A null root makes the root the viewport.

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry); //returns the intersecitonRatio and isIntersecting boolean true/false when scrolling up and down.
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1, //[0, 0.2] Can use an array to specify multiple thresholds when the callback function will be called. Remember that the value is reached when entering and leaving the target as it is a percentage.
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); //target element.

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, //margin outside of the element where function is applied. Can be hard coded as a px but better to be dynamic with bounding client rect.
});
if((document.querySelector('header')).classList.contains('header')){headerObserver.observe(header);}

//Reveal sections on Scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target); //unobserves after hidden class removed first time so won't happen again.
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  }); //an event listener is added here on the load event in case people are loading the images on slower networks and the blurry filter would be removed before the higher quality image has been loaded in.

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px', //used to make the images start loading before they are reached when scrolling
});

imgTargets.forEach(img => imgObserver.observe(img));

//Building a Slider Component Parts 1 and 2
const slider = function () {
  //contains all sliders JS and doesn't pollute global namespace.
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length; //can also use the length property on the NodeList slides.

  //Functions
  //Creating Dots

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector('dots_dot[data-slide="0"]') ? document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active') : null;
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Init Function (initialise function calls for above)
  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  //Event Listeners

  btnRight ? btnRight.addEventListener('click', nextSlide) : null;
  btnLeft ? btnLeft.addEventListener('click', prevSlide) : null;

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide(); //short circuting applied here
  });

  dotContainer ? dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset; //deconstruct object into slide variable.
      goToSlide(slide);
      activateDot(slide);
    }
  }) : null;
};
tabs ? slider() : null;

// Resize Nav Logo
// Get a reference to your image element
const imageLogo = document.querySelector('.nav__logo');
const operationsButtons = document.querySelectorAll('.btn.operations__tab');

// Function to update the image source based on window width
function updateElements375() {

  if (window.innerWidth <= 375) {
    imageLogo.src = './img/logo_small.png';

    operationsButtons.forEach(btn => {
      btn.children[1].classList.contains('hiddenTab') ? null : btn.children[1].classList.toggle('hiddenTab');
      });

  } else {
    imageLogo.src = './img/logo2.png';

    operationsButtons.forEach(btn => {
      btn.children[1].classList.contains('hiddenTab') ? btn.children[1].classList.toggle('hiddenTab') : null;
      });
  }
}

// Initial update when the page loads
updateElements375();

// Update the image source on window resize
window.addEventListener('resize', updateElements375);

//How the DOM Works Behind the Scenes

//The DOM is the interface between Javascript and the browser and can be manipulated by Javascript to create, modify, and delete HTML elements, and set styles, classes and attributes and respond to events.

//The DOM tree is generated from an HTML document which we can then interact with.

//DOM is a very complex API that contains lots of methods and properties to interact with the DOM tree.

//The DOM contains many Nodes - some are html elements and some are for example (text).

//Representation in the API

//Everything in the DOM tree is represented by a Node but there are different types.
//On a par with Node is the Window global object which has losts of properties and methods many unrelated to the DOM.

//Element
//each element has it's own set of methods based on it's type. eg. img vs header etc.
//Text
//Comment
//Document

//Inheritance of Methods and Properties by elements from their parent elements or node.

//EventTarget - this Node is a parent of the Node and Window  which has .addEventListener() and .removeEventListener() methods which allows all nodes below to handle events.

/*
//Selecting, Creating and Deleting Elements

//Selecting elements

console.log(document.documentElement); //see the whole document element and all the html
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); //select an element
const allSections = document.querySelectorAll('.section'); //select all elements of a type

console.log(allSections); //will return a NodeList as querySelectorAll returns a NodeList not an array. A NodeList does not live update so if this is produced before the element is deleted then the NodeList will remain the same even if the element is deleted. further on in the code.

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); //returns an HTML Collection, not a Node List. An HTML collection is a live collection so if a tag is deleted it will be removed from the Collection immediately.
console.log(allButtons);

document.getElementsByClassName('btn'); //also reutns a live HTML Collection

//Creating and Inserting Elements

// .insertAdjacentHTML - was used in the Bankist App to show the movements.

const message = document.createElement('div'); //creates a DOM element and stores into message variable. Just creating the element doesn't immediately put it into the DOM.
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message); //add the element as the first child of the header element. .append(message) would put the message at the end of the header.
header.append(message);

//DOM elements are unique and can only exist in one place at a time on the DOM and can be moved using the prepend and append methods.

// header.append(message.cloneNode(true)); //inputting the true parameter on CloneNode copies all child elements too.

// header.before(message); //inserts the message div before the header tag
// header.after(message); //inserts the message after the header tag

//Delete Elements

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove(); //.remove is a recent addition so before this you could only remove using the .removeChild method.
    // message.parentElement.removeChild(message);
  });

//Styles, Attributes and Classes

//Styles

//Using .style sets then inline within the HTML element.

message.style.backgroundColor = '#37383d'; //.style and then .property to change. This should be equal to a string.
message.style.width = '120%'; //within the string should be written the same as it would be written in the CSS.

console.log(message.style.height); //this will only return the style in the console for inline styles that we have set. Cannot return styles written in CSS hidden within classes and id's.

console.log(getComputedStyle(message).color); //this will return the hidden styles. If you just put getComputedStyle(message) it will return all styles attached to message even if not defined in CSS.

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered'); //changes the CSS Custom Property in :root which will effect everywhere this is used in the CSS. .setProperty needs to be used.

//Attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className); // nav__logo

logo.alt = 'Beautiful minimalist logo';

//non-standard
console.log(logo.designer); //returns undefined as is not a standard attribute in HTML for img tags even though we've created it.
console.log(logo.getAttribute('designer')); //Jonas
logo.setAttribute('company', 'Bankist');
console.log(logo.src); // returns complete src reference absolute not relative.
console.log(logo.getAttribute('src')); // returns relative img src as per relative folder location to index.html. img/logo.png

const link = document.querySelector('.twitter-link');
console.log(link.href); //returns full URL
console.log(link.getAttribute('href')); //returns full URL aswell in this case but could be different if link is to a page.
const link2 = document.querySelector('.nav__link--btn');
console.log(link2.href); //returns absolute URL
console.log(link2.getAttribute('href')); //#

//Data attributes
console.log(logo.dataset.versionNumber); //need to use special dataset object and then camalCase for versionNumber, returns 3.0.

//Classes
logo.classList.add(); //can add multiple when seperated with a comma.
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();

//Don't use as will override all existing classes and return only one class epr element.
// logo.className = 'jonas';

*/
//Implementing Smooth Scrolling - code at the top under Button Scrolling

//Types of Events and Event Handlers

// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');

//   // h1.removeEventListener('mouseenter', alertH1); //removes the event listener after actioned once and won't appear again. This removeEventListener could appear anywhere in the code and could be timed.
// };

// h1.addEventListener('mouseenter', alertH1); //mouseenter acts like :hover in Css

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// }; //old school way of listening for events. Now we use AddEventListener.

//AddEventListener lets you listen for multiple events and you can change the function, with the on..... way you can only have one action.

//The second benefit of addEventListener is that you can delete an event if you don't need it anymore.

//Third way of handling events - in HTML
//You should not use this one but it involves adding eg. <h1 onclick="alert('HTML alert')">

//Event Propagation: Bubbling and Capturing
//When a click event happens on a page it starts at the root (document at the top of the DOM tree and travels down the child elements until it reaches the target when the event is actioned. Then the event works its way back up the DOM tree in the bubbling phase. This means that multiple events can be triggered during the capturing phase (when the event is working down the tree))

//Also not all events follow this 'Event Propagation' pattern and are triggered only at the target phase.

//addEventListener captures events at the target and bubbling phase not at the initial capture phase unless specified in a third parameter. By default the third parameter is set to False, if set to true then the eventListener will handle events at the capture phase from the top of the DOM tree downwards.

//Event Propagation in Practice
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rbg(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop propagation
  e.stopPropagation(); //prevents this propagation of events up the DOM tree. In general this is not advised but can be used in complex situations where events are being handled by multiple elements.
});

document.querySelector('.nav__lins').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});
*/

//Event Delegation: Implementing Page Navigation

//Found under Button Scrolling

//DOM Traversing

/*

//Going downwards: child
console.log(h1.querySelectorAll('.highlight')); //selects all of the .highlight class elements that are children of the h1 element. This works no matter how deep the children are in the DOM tree.
console.log(h1.childNodes); //shows all nodes that are children of the h1 including text, comments etc.
console.log(h1.children); //HTML Collection - works for direct children

h1.firstElementChild.style.color = 'white'; //selects first child of the h1.
h1.lastElementChild.style.color = 'orangered'; //selects the last child of the h1.

//Going upwards: parents
console.log(h1.parentNode); //returns the parent Node
console.log(h1.parentElement); //returns the parent element. In this case the node is also an element so returns the same result.

h1.closest('.header').style.background = 'var(--gradient-secondary)'; //.closest takes in a query string the same as querySelector and finds the closest element with .header class to our h1 element.

h1.closest('h1').style.background = 'var(--gradient-primary)'; //colors itself as it is the closest.

// Going sideways: Siblings

//In Javascript you cannot directly find siblings beyond the direct ones.

console.log(h1.previousElementSibling); //null
console.log(h1.nextElementSibling); //h4

console.log(h1.previousSibling); //for sibling Nodes
console.log(h1.nextSibling); //for Sibling Nodes

console.log(h1.parentElement.children); //provides us with all of the siblings including itself.

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
}); //spreads the HTML Collection (iterable) into an array and applies the forEach method with a condition that if the element is something other than the h1 to scale the siblings down 50%.

*/

//Building a Tabbed Component - futher up under tabbed component.

//Passing Arguments to Event Handlers - implemented the fade out effect when hovering over a nav bar button.

//Implementing a Sticky Navigation: The Scroll Event- impleented above under Sticky Navigation

//Lifecycle DOM Events

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built');
});

//So long as you have the HTML script tags just before the end of the body tag in HTML you do not need to place the whole js code within an event listener as the script tag will be fired after the rest of the HTML has been parsed and DOM tree built.

//Load Event
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

//The load event fires once all of the html, js, css and images are loaded, so basically once the whole page has completed loading.

//Before Unload
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault(); //needed for some browsers to access
//   console.log(e);
//   e.returnValue = ''; //the default message cannot be changed anymore due to abuse.
// });

//The before unload event only fires just before the user leaves a page. eg. once x is clicked to close a tab.
//Should only use this event when user is leaving a form half filled and data could be lost etc.

//Efficient Script Loading: defer and async

//Regular (End of Body)
//scripts are fetched and executed after the HTML is completely parsed

//ASync in Head
//Scripts are fetched asynchronously and executed immediately
//Usually the DOMContentLoaded event waits for all scripts to execute, except for async scripts. So, DONContentLoaded does not wait for an asyn script
//Scripts are not guaranteed to execute in order
//Use for 3rd party scripts where order doesn't matter

//Defer in Head
//Scripts are fetched asynchronously and executed after the HTML is completely parsed.
//DOMContentLoaded event fires after defer script is executed
//Scripts are executed in order
//Overall this is the best solution and should be used for your own scripts and where order matters.
