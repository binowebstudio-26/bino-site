/* ==========================================================
   main.js — small things every page needs
   ----------------------------------------------------------
   1. Phone menu (open/close the navigation)
   2. Current year in the footer
   3. Header gets a line under it once you scroll
   4. Scroll animations: things fade up, doodles draw themselves
   ========================================================== */


/* ---------- 1. Phone menu ---------- */
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    // aria-expanded tells screen readers whether the menu is open
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.textContent = isOpen ? 'Close' : 'Menu';
  });
}


/* ---------- 2. Current year ---------- */
// Any element with class "year" shows this year, so the footer never goes out of date
document.querySelectorAll('.year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});


/* ---------- 3. Header line on scroll ---------- */
const header = document.querySelector('.site-header');

function updateHeader() {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });


/* ---------- 4. Scroll animations ----------
   [data-reveal] → fades up when it comes into view
   .draw         → a hand-drawn doodle that draws itself
   Each thing only animates once. */
const animated = document.querySelectorAll('[data-reveal], .draw');

if ('IntersectionObserver' in window) {
  const watcher = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      watcher.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  animated.forEach((el) => watcher.observe(el));
} else {
  // very old browsers: just show everything
  animated.forEach((el) => el.classList.add('is-visible'));
}
