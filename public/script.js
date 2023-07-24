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

  console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset); //these show how far offet the current viewport is from the default 0, 0 position

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth //these show height and width of the viewport.
  );

  section1.scrollIntoView({ behavior: 'smooth' });
}) : null;

//Page Navigation

const navLinks = document.querySelector('.nav__links');

navLinks ? navLinks.addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);

    // If section hidden then add offset to scroll
    // // Get the root font size in pixels (based on the computed style)
    // const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

    // // Convert the desired value in rem units to pixels
    // const scrollToValueInRem = 2; // Change this value to the desired rem value
    // const scrollToValueInPixels = scrollToValueInRem * rootFontSize;

    // // Scroll to the desired position
    // window.scrollTo({
    //   top: scrollToValueInPixels,
    //   behavior: 'smooth', // Optional: Add smooth scrolling effect
    // });


    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
}) : null;

//Tabbed component

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


nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1)); //mouseout is the opposite of mouseover

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

//DOMContentLoaded
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built');
});

//Load Event
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});
