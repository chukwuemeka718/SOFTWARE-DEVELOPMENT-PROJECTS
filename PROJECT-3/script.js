/* =============================================
   script.js — NexaBuild JavaScript
   Linked from: index.html (bottom of body)

   TABLE OF CONTENTS
   1. Sticky Header Shadow
   2. Hamburger Mobile Menu
   3. Scroll Reveal Animation
   4. Contact Form Handler
   5. Active Nav Link on Scroll
============================================= */


/* ── 1. STICKY HEADER SHADOW ────────────────
   Adds a shadow to the header when user scrolls.
   The .scrolled class is styled in style.css
──────────────────────────────────────────── */

// Get the header element by its ID
const header = document.getElementById('site-header');

// Listen for scroll events
window.addEventListener('scroll', function () {

  if (window.scrollY > 20) {
    header.classList.add('scrolled');    // Show shadow
  } else {
    header.classList.remove('scrolled'); // Hide shadow
  }

});


/* ── 2. HAMBURGER MOBILE MENU ───────────────
   Opens/closes mobile menu by toggling .open class.
──────────────────────────────────────────── */

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

// Click hamburger to toggle menu
hamburger.addEventListener('click', function () {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close menu when a mobile link is clicked
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

// Attach close function to every mobile link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(function (link) {
  link.addEventListener('click', closeMobileMenu);
});


/* ── 3. SCROLL REVEAL ANIMATION ─────────────
   .reveal elements are invisible (opacity: 0) by default.
   When they enter the viewport, .visible is added
   and CSS animates them into view.
──────────────────────────────────────────── */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(function (entries) {

  entries.forEach(function (entry, index) {

    if (entry.isIntersecting) {
      // Stagger each element by 80ms
      setTimeout(function () {
        entry.target.classList.add('visible');
      }, index * 80);

      // Stop watching once revealed
      revealObserver.unobserve(entry.target);
    }

  });

}, { threshold: 0.12 });

// Start watching all .reveal elements
revealElements.forEach(function (el) {
  revealObserver.observe(el);
});


/* ── 4. CONTACT FORM HANDLER ────────────────
   Validates fields and shows success message.
──────────────────────────────────────────── */

const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', function () {

  // Collect field values
  const firstName = document.getElementById('first-name').value.trim();
  const lastName  = document.getElementById('last-name').value.trim();
  const email     = document.getElementById('email').value.trim();
  const service   = document.getElementById('service').value;
  const message   = document.getElementById('message').value.trim();

  // Check all fields are filled
  if (!firstName || !lastName || !email || !service || !message) {
    alert('Please fill in all required fields before submitting.');
    return;
  }

  // Basic email validation using regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Show success on button
  submitBtn.textContent = '✓ Message Sent!';
  submitBtn.style.background = '#4caf50';
  submitBtn.disabled = true;

  // Reset after 3 seconds
  setTimeout(function () {
    submitBtn.textContent = 'Send Message →';
    submitBtn.style.background = '';
    submitBtn.disabled = false;

    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value  = '';
    document.getElementById('email').value      = '';
    document.getElementById('service').value    = '';
    document.getElementById('message').value    = '';

  }, 3000);

});


/* ── 5. ACTIVE NAV LINK ON SCROLL ───────────
   Highlights the nav link for the section in view.
──────────────────────────────────────────── */

const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', function () {

  let currentSection = '';

  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(function (link) {
    if (link.getAttribute('href') === '#' + currentSection) {
      link.style.color = 'var(--mocha)';
    } else {
      link.style.color = '';
    }
  });

});
