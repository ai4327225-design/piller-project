/* 
=============================
Color Switcher functionality
=============================
 */
document.addEventListener('DOMContentLoaded', function () {
  const colorSwitcher = document.getElementById('colorSwitcher');
  const colorSwitcherToggle = document.getElementById('colorSwitcherToggle');
  const colorOptions = document.querySelectorAll('.color-option');
  const customColorInput = document.getElementById('customColor');
  const applyCustomColorBtn = document.getElementById('applyCustomColor');

  let currentColor = '#F80000';

  // Toggle color switcher
  colorSwitcherToggle.addEventListener('click', function () {
    colorSwitcher.classList.toggle('active');
  });

  // Apply color options
  colorOptions.forEach(option => {
    option.addEventListener('click', function () {
      colorOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      currentColor = this.dataset.color;
      applyColor(currentColor);
    });
  });

  // Apply custom color
  applyCustomColorBtn.addEventListener('click', function () {
    currentColor = customColorInput.value;
    applyColor(currentColor);
  });

  function applyColor(color) {
    // Update basic elements
    document.querySelectorAll('.hero-content h1 span').forEach(span => {
      span.style.color = color;
    });


    document.querySelectorAll('.explore-property, .search-btn, .apply-color-btn').forEach(button => {
      button.style.backgroundColor = color;
      button.style.color = '#fff';
      button.style.border = 'none'
    });


    // All Section Header Heading
    const testimonial = document.querySelectorAll('.section-header h6');
    testimonial.forEach(heading => {
      heading.style.color = color
    });

    colorSwitcherToggle.querySelector('i').style.color = color;

    // Update top bar icons and hover effects
    document.querySelectorAll('.message-icon a i').forEach(icon => {
      icon.style.color = color;
    });

    document.querySelectorAll('.top-bar a').forEach(link => {
      link.addEventListener('mouseenter', function () {
        this.style.color = color;
      });

      link.addEventListener('mouseleave', function () {
        this.style.color = '#f8f9fa';
      });
    });


    // Update active elements
    updateActiveElements(color);

    // Update carousel indicators
    updateCarouselIndicators(color);
  }

  function updateActiveElements(color) {
    // Update active nav tabs
    document.querySelectorAll('.nav-tabs .nav-link.active').forEach(tab => {
      tab.style.backgroundColor = color;
      tab.style.color = '#fff';
    });

  }

  function updateCarouselIndicators(color) {
    // Remove color from ALL indicators first
    document.querySelectorAll('.carousel-indicators-custom button').forEach(indicator => {
      indicator.style.backgroundColor = '';
    });

    // Apply color only to active indicator
    const activeIndicator = document.querySelector('.carousel-indicators-custom .active');
    if (activeIndicator) {
      activeIndicator.style.backgroundColor = color;
    }
  }

  // Handle nav tabs click
  document.querySelectorAll('.nav-tabs .nav-link').forEach(tab => {
    tab.addEventListener('click', function () {
      // Remove active from all tabs
      document.querySelectorAll('.nav-tabs .nav-link').forEach(t => {
        t.classList.remove('active');
        t.style.backgroundColor = '';
        t.style.color = '';
      });

      // Add active to clicked tab
      this.classList.add('active');
      this.style.backgroundColor = currentColor;
      this.style.color = '#fff';
    });
  });


  // Listen for carousel slide events to update indicator colors
  const heroCarousel = document.getElementById('heroCarousel');
  if (heroCarousel) {
    heroCarousel.addEventListener('slide.bs.carousel', function () {
      updateCarouselIndicators(currentColor);
    });
  }

  // Initialize with default color
  applyColor(currentColor);
});





/* 
======================
STICKY NAVBAR TOP
======================
 */
const nav = document.querySelector('.navbar');
const hero = document.querySelector('.hero');

const checkSticky = () => {
    const sticky = window.scrollY > hero.offsetHeight * 0.5;
    nav.classList.toggle('navbar-sticky', sticky);
    document.body.classList.toggle('navbar-sticky-active', sticky);
};

window.addEventListener('scroll', checkSticky);
document.addEventListener('DOMContentLoaded', checkSticky);
/* 
=======================
HERO CAROUSEL SECTION
=======================
 */
const carousel = document.querySelector('#heroCarousel');
const indicators = document.querySelectorAll('.carousel-indicators-custom button');
const currentSlideSpan = document.querySelector('#currentSlide');
const prevBtn = document.querySelector('#prevSlide');
const nextBtn = document.querySelector('#nextSlide');

const heroCarousel = new bootstrap.Carousel(carousel, {
  interval: 4000,
  ride: 'carousel'
});

carousel.addEventListener('slide.bs.carousel', (e) => {
    const slideIndex = e.to;
    // update current slide text
    currentSlideSpan.textContent = slideIndex < 9 ? `0${slideIndex + 1}` : slideIndex + 1;
    
    // update indicators
    indicators.forEach((btn, i) => btn.classList.toggle('active', i === slideIndex));
});

// Prev button click
prevBtn.addEventListener('click', () => {
    heroCarousel.prev();
});

// Next button click
nextBtn.addEventListener('click', () => {
    heroCarousel.next();
});


/* 
========================
OFFCANVAS NAVBAR TOGGLE
========================
 */
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const offcanvasNav = document.getElementById("offcanvasNav");

menuBtn.addEventListener("click", () => offcanvasNav.classList.add("active"));
closeBtn.addEventListener("click", () => {
  offcanvasNav.classList.remove("active");
  closeAllAccordions();
});

// Accordion logic
document.querySelectorAll(".accordion-header").forEach(header => {
  const toggleBtn = header.querySelector(".plus-minus");

  header.addEventListener("click", (e) => {
    if (!e.target.classList.contains("plus-minus")) toggleAccordion(header);
  });

  toggleBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleAccordion(header);
  });
});

function toggleAccordion(header) {
  const isActive = header.classList.contains("active");

  document.querySelectorAll(".accordion-header, .accordion-content").forEach(el => {
    el.classList.remove("active", "show");
  });

  if (!isActive) {
    header.classList.add("active");
    header.nextElementSibling?.classList.add("show");
  }
}

function closeAllAccordions() {
  document.querySelectorAll(".accordion-header, .accordion-content").forEach(el => {
    el.classList.remove("active", "show");
  });
}

document.querySelectorAll(".accordion-subitem").forEach(item => {
  item.addEventListener("click", () => item.classList.toggle("active"));
});


/* 
==============================
Property Filter functionality
==============================
*/

function filterProperties(filter) {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = Array.from(document.querySelectorAll('.property-card'));

  const showCards = (toShow) => {
    cards.forEach(card => card.style.display = toShow.includes(card) ? 'block' : 'none');
  };

  const secondaryMap = {
    apartment: 'land',
    commercial: 'farm',
    land: 'apartment',
    farm: 'commercial'
  };

  // Toggle active class
  buttons.forEach(b => b.classList.remove('active'));
  const activeBtn = Array.from(buttons).find(b => b.dataset.filter === filter);
  if (activeBtn) activeBtn.classList.add('active');

  if (filter === 'all') {
    showCards(cards.slice(0, 8));
  } else {
    // Show 2 cards of selected type + 2 cards of secondary type
    const matched = cards.filter(c => c.dataset.type === filter).slice(0, 2);
    const secondary = cards.filter(c => c.dataset.type === secondaryMap[filter]).slice(0, 2);
    showCards([...matched, ...secondary]);
  }
}

// Initial call to show first 8 cards
filterProperties('all');

// Optional: attach function to buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    filterProperties(btn.dataset.filter);
  });
});



/* 
======================
PROPERTY CARD SECTION
======================
*/
document.querySelectorAll(".property-image").forEach(property => {
  const images = property.querySelectorAll(".image-carousel img");
  const leftArrow = property.querySelector(".left-arrow");
  const rightArrow = property.querySelector(".right-arrow");
  let current = 0;

  function showImage(index) {
    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");

    // Cursor update 
    if (current === 0) {
      leftArrow.style.cursor = "default";
    } else {
      leftArrow.style.cursor = "pointer";
    }

    if (current === images.length - 1) {
      rightArrow.style.cursor = "default";
    } else {
      rightArrow.style.cursor = "pointer";
    }
  }

  // Left arrow click 
  leftArrow.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showImage(current);
    }
  });

  // Right arrow 
  rightArrow.addEventListener("click", () => {
    if (current < images.length - 1) {
      current++;
      showImage(current);
    }
  });

  showImage(current);
});


// Initialize all tooltips on the page
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));

document.querySelectorAll(".property-image-repeat").forEach(property => {
  const images = property.querySelectorAll(".image-carousel img");
  const leftArrow = property.querySelector(".start-arrow");
  const rightArrow = property.querySelector(".end-arrow");
  let current = 0;

  function showImage(index) {
    images.forEach(img => img.classList.remove("active"));
    images[index].classList.add("active");

    // Cursor logic update
    if (current === 0) {
      leftArrow.style.cursor = "default";
    } else {
      leftArrow.style.cursor = "pointer";
    }

    if (current === images.length - 1) {
      rightArrow.style.cursor = "default";
    } else {
      rightArrow.style.cursor = "pointer";
    }
  }

  // Left arrow click
  leftArrow.addEventListener("click", () => {
    if (current > 0) {
      current--;
      showImage(current);
    }
  });

  // Right arrow click
  rightArrow.addEventListener("click", () => {
    if (current < images.length - 1) {
      current++;
      showImage(current);
    }
  });

  // Initial setup
  showImage(current);
});



/* 
=========================
Property Values Section
=========================
*/

// Function to animate counters
function animateCounter(elementId, targetValue, duration) {
  const element = document.getElementById(elementId);
  let currentValue = 0;
  const increment = targetValue / (duration / 16); // 60fps

  const updateCounter = () => {
    currentValue += increment;
    if (currentValue < targetValue) {
      if (elementId === 'customers-counter') {
        element.textContent = Math.floor(currentValue) + '%';
      } else if (elementId === 'reviews-counter') {
        element.textContent = Math.floor(currentValue) + 'k';
      } else {
        element.textContent = Math.floor(currentValue);
      }
      requestAnimationFrame(updateCounter);
    } else {
      if (elementId === 'customers-counter') {
        element.textContent = targetValue + '%';
      } else if (elementId === 'reviews-counter') {
        element.textContent = targetValue + 'k';
      } else {
        element.textContent = targetValue;
      }
    }
  };

  updateCounter();
}

// Initialize counters when page loads
window.addEventListener('load', function () {
  // Start counters after a short delay
  setTimeout(() => {
    animateCounter('years-counter', 28, 2000);
    animateCounter('properties-counter', 58, 2000);
    animateCounter('reviews-counter', 25, 2000);
    animateCounter('customers-counter', 98, 2000);
  }, 500);
});

/* 
=================================
GALLERY SWIPPER CAROUSEL IMAGES
=================================
*/
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Swiper
  const swiper = new Swiper('#gallerySlider1', {
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
      1300: {
        slidesPerView: 2.6,
      },
      1500: {
        slidesPerView: 4.6,
      }
    },
    on: {
      init: function () {
        updateCounter(this);
      },
      slideChange: function () {
        updateCounter(this);
      }
    }
  });

  // FIXED COUNTER FUNCTION
  function updateCounter(swiper) {
    const currentSlide = document.querySelector('.slider-pagination2 .current-slide');
    const totalSlides = document.querySelector('.slider-pagination2 .total-slides');

    if (currentSlide && totalSlides) {
      // Current slide number (1-12)
      const currentNumber = (swiper.realIndex % 12) + 1;
      currentSlide.textContent = currentNumber.toString().padStart(2, '0');

      // Always show 12 as total
      totalSlides.textContent = '12';
    } else {
      console.error('Counter elements not found!');
    }
  }

  // Pause autoplay on hover
  const swiperContainer = document.querySelector('#gallerySlider1');
  if (swiperContainer) {
    swiperContainer.addEventListener('mouseenter', function () {
      swiper.autoplay.stop();
    });

    swiperContainer.addEventListener('mouseleave', function () {
      swiper.autoplay.start();
    });
  }
});


/* 
=====================================
TESTIMONIALS SWIPPER CAROUSEL IMAGES
=====================================
*/
function initTestimonialSlider() {
  // Initialize Swiper
  const swiper = new Swiper('#testimonialSlider', {
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: true,
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 2,
      },
      1300: {
        slidesPerView: 2.6,
      },
      1500: {
        slidesPerView: 3.6,
      }
    }
  });
}

initTestimonialSlider();

/* 
=================================
BELOG SWIPPER CAROUSEL IMAGES
=================================
*/

function initBelogSlider() {
  // Initialize Swiper
  const swiper = new Swiper('.blog-slider', {
    loop: true,
    speed: 800,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 24
      },
    },
  });
}

initBelogSlider();

