/* ==========================================================
   forms.js — small helper for the "Start a project" form
   ----------------------------------------------------------
   1. From the Services page: "Ask about Standard" links to
      start.html?package=standard  → ticks the Standard package.
   2. From the Home page toy: "Start with these" links to
      start.html?features=menu,booking  → ticks those features.
   ========================================================== */

const linkInfo = new URLSearchParams(window.location.search);


/* ---------- 1. Package ---------- */
const packageNames = {
  starter: 'Starter',
  standard: 'Standard',
  custom: 'Custom',
  care: 'Care plan',
};

const packageFromLink = linkInfo.get('package');

if (packageFromLink && packageNames[packageFromLink]) {
  const choice = document.querySelector(`input[name="package"][value="${packageNames[packageFromLink]}"]`);
  if (choice) choice.checked = true;
}


/* ---------- 2. Features ---------- */
const featureNames = {
  menu: 'Menu or price list',
  gallery: 'Photo gallery',
  booking: 'Booking',
  contact: 'Contact form',
  store: 'Online store',
  animations: 'Animations',
};

(linkInfo.get('features') || '').split(',').forEach((key) => {
  if (!featureNames[key]) return;
  const box = document.querySelector(`input[name="features"][value="${featureNames[key]}"]`);
  if (box) box.checked = true;
});
