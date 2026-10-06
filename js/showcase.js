/* ==========================================================
   showcase.js — the "Some of my work" slideshow (Home page)
   ----------------------------------------------------------
   - Every few seconds it moves to the next project screen.
   - The laptop screenshot, the phone screenshot and the text
     on the right all change together.
   - Arrows and the little bars let visitors pick a slide.
   - It pauses while the mouse is over it, and doesn't move on
     its own for visitors who turn animations off.

   How to add a project: copy one slide in each of the 3 places in
   index.html (laptop, phone, text) and give them the next number
   in data-slide (0, 1, 2, ...). Then add one more dot button.
   ========================================================== */

const showcase = document.querySelector('[data-showcase]');

if (showcase) {
  const laptopSlides = showcase.querySelectorAll('.mock-screen .slide');
  const phoneSlides = showcase.querySelectorAll('.mock-phone .slide');
  const infoSlides = showcase.querySelectorAll('.info');
  const dots = showcase.querySelectorAll('.dot');
  const phone = showcase.querySelector('.mock-phone');
  const total = infoSlides.length;
  const stillMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SECONDS = 6; // how long each slide stays

  let current = 0;
  let timer = null;

  function show(index) {
    current = (index + total) % total; // wraps around at the ends
    [laptopSlides, phoneSlides, infoSlides].forEach((group) => {
      group.forEach((el, i) => el.classList.toggle('is-active', i === current));
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', i === current));

    // the phone gives a little lift each time
    if (phone) {
      phone.classList.remove('is-moving');
      void phone.offsetWidth;
      phone.classList.add('is-moving');
    }
  }

  function start() {
    if (stillMotion) return;
    stop();
    timer = setInterval(() => show(current + 1), SECONDS * 1000);
  }

  function stop() {
    clearInterval(timer);
  }

  showcase.querySelector('[data-prev]').addEventListener('click', () => { show(current - 1); start(); });
  showcase.querySelector('[data-next]').addEventListener('click', () => { show(current + 1); start(); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => { show(i); start(); }));

  showcase.addEventListener('mouseenter', stop);
  showcase.addEventListener('mouseleave', start);

  show(0);
  start();
}
