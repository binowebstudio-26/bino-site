# Claude Project Guide

## Project overview

This repository is a simple static portfolio/agency website for bino. It uses plain HTML, CSS, and JavaScript with no build step, package manager, or test framework.

The site is designed as a multi-page marketing site with:

- Landing/home page
- Portfolio/work page
- Services page
- About page
- Contact/inquiry flow
- Thank-you and 404 pages

## How to run locally

There is no build command or server script.

Recommended workflow:

Deploys: GitHub → Netlify (auto-deploy on push to `main`), domain binostudio.com (Porkbun DNS → Netlify).

1. Open the project folder in VS Code.
2. Right-click `index.html` and choose "Open with Live Server".
3. If Live Server is not installed, install the VS Code extension and then launch it.

Alternative:

- Open the HTML files directly in a browser for simple static browsing.
- Note that the 404 page is best validated when hosted online or via a local static server.

## Important project structure

- `index.html` — home (laptop hero with sleeping cat, work slideshow, services, about, packages, steps, FAQ, CTA)
- `work.html` — project list; `sukkar.html` — case study
- `services.html` — packages + FAQ. Prices are intentionally NOT shown (owner's decision); everything is quoted after a free chat.
- `about.html` — short About page. The owner's public name on the site is "Somaya Malek" (use exactly this spelling). Never add her city or home location; the site only says "Virginia".
- `start.html` — quote form; `contact.html` — contact
- `privacy.html`, `terms.html` — legal pages
- `thanks.html`, `404.html`

CSS: `base.css` (tokens, Jost font), `layout.css`, `components.css`, `pages.css`, `cats.css`.
JS: `main.js`, `showcase.js` (work slideshow), `sound.js`, `cats.js`, `forms.js`.

## Editing conventions

- Styling is centralized in the CSS files rather than inline.
- Repeated header/footer markup is copied into every page, so updates to navigation should be mirrored across pages.
- Design direction (owner's decision, Oct 2026): professional, black & off-white, Jost font, no doodles/squiggles/highlighter marks. Only playful elements: the sleeping cat on the hero laptop (purrs when petted) and Bino (white & orange) peeking over the black CTA box.
- Tone: aimed at serious clients. Keep copy clear, short and benefit-focused.
- Use `translate` (not `transform`) for scroll reveals so tilted cards keep their tilt.
- The site includes special behavior for interactive cat images via `data-meow` and `data-hop` attributes.

## Verification checklist before shipping

- Open the homepage and ensure layout appears correct.
- Check navigation links across all pages.
- Verify contact/inquiry forms and thank-you flow work as expected.
- Contact details: hello@binostudio.com, (540) 254-0791. No social media links yet. Location is only "Virginia".
- Payments are NOT on the site: plan buttons go to the quote form; deposits and the care plan are billed through online invoices outside the site.
- Confirm images and sound assets exist and resolve correctly.

## Notes for future Claude sessions

This is a straightforward static site; prefer minimal, surgical edits.
When making content updates, keep the existing HTML/CSS structure intact and avoid introducing a framework or build system unless explicitly requested.
