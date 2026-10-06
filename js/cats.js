/* ==========================================================
   cats.js — makes the cats come alive 🐈‍⬛🐈
   ----------------------------------------------------------
   1. Hop: anything with  data-hop  jumps a little when clicked.
   2. Petting: the sleeping cat on the laptop purrs while you
      move your mouse over it.
      On phones, a tap gives a few seconds of purring.
   3. Bino peeking over the black box: his eyes follow your
      mouse, and when you click him he hops and smiles ^ ^
   ========================================================== */


const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ==========================================================
   1. HOP
   ========================================================== */
function hop(element) {
  if (!element) return;
  element.classList.remove('hop');
  void element.getBoundingClientRect(); // tiny trick to restart the animation
  element.classList.add('hop');
}

document.querySelectorAll('[data-hop]').forEach((element) => {
  element.addEventListener('click', () => hop(element));
});


/* ==========================================================
   2. PETTING THE SLEEPING CAT
   ========================================================== */
document.querySelectorAll('[data-purr]').forEach((cat) => {
  let lastPet = 0;
  let checker = null;

  function startPetting() {
    lastPet = Date.now();
    if (checker) return; // already purring
    if (window.startPurr) window.startPurr();
    cat.classList.add('is-talking'); // the cat trembles softly (see cats.css)

    // Every 0.2 seconds: if you stopped petting for a moment, stop purring
    checker = setInterval(() => {
      if (Date.now() - lastPet > 900) stopPetting();
    }, 200);
  }

  function stopPetting() {
    clearInterval(checker);
    checker = null;
    if (window.stopPurr) window.stopPurr();
    cat.classList.remove('is-talking');
  }

  cat.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'mouse') startPetting();
  });
  cat.addEventListener('pointerleave', (event) => {
    if (event.pointerType === 'mouse') stopPetting();
  });

  // Phones and tablets: a tap gives 3 seconds of purring
  cat.addEventListener('click', (event) => {
    if (event.pointerType === 'mouse') return;
    startPetting();
    lastPet = Date.now() + 2100; // keeps it going ~3 seconds
  });
});


/* ==========================================================
   3. BINO PEEKING OVER THE BOX
   ========================================================== */
document.querySelectorAll('.peek-cat').forEach((bino) => {
  const pupils = bino.querySelector('.peek-pupil');

  // Eyes follow the mouse (only on computers with a mouse)
  if (pupils && !reducedMotion) {
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const box = bino.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height * 0.6);
      const distance = Math.max(Math.hypot(dx, dy), 1);
      const reach = Math.min(distance / 40, 1); // close to the cat = small movement
      const x = (dx / distance) * 6 * reach;  // up to 6 steps left/right
      const y = (dy / distance) * 5 * reach;  // up to 5 steps up/down
      pupils.style.transform = `translate(${x}px, ${y}px)`;
    }, { passive: true });
  }

  // Click: hop + happy eyes for a moment (the meow comes from data-meow in sound.js)
  bino.addEventListener('click', () => {
    hop(bino.querySelector('svg'));
    bino.classList.add('is-happy');
    clearTimeout(bino.happyTimer);
    bino.happyTimer = setTimeout(() => bino.classList.remove('is-happy'), 1200);
  });
});
