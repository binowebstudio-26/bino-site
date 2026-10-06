# bino. web studio 🐾

The website for **bino.** (binostudio.com). Plain HTML, CSS and JavaScript, no build tools.

## How to preview it

1. Open this folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The site opens in your browser and refreshes every time you save.

## How to put changes online

The site is connected to GitHub and Netlify. After you change something:

```bash
cd ~/Desktop/bino-site
git add .
git commit -m "Describe what you changed"
git push
```

Netlify sees the push and updates binostudio.com in about a minute.

## Where everything lives

```
bino-site/
├── index.html        Home: laptop + sleeping cat, "Some of my work" slideshow,
│                     what you get, about, packages, steps, FAQ
├── work.html         All projects (Sukkar + Turkish café prototype)
├── sukkar.html       Sukkar case study (challenge → solution → outcome)
├── services.html     Packages (no prices shown), care plan, FAQ
├── about.html        About Somaya
├── start.html        "Get a free quote" form (Netlify form "project-inquiry")
├── contact.html      Contact details + short form (Netlify form "contact")
├── privacy.html      Privacy Policy
├── terms.html        Terms of Service
├── thanks.html       Shown after a form is sent
├── 404.html          "Page not found"
├── netlify.toml      Settings for Netlify (no need to touch)
│
├── css/
│   ├── base.css        Colors, font, text styles      ← change brand colors here
│   ├── layout.css      Header, footer, sections
│   ├── components.css  Buttons, cards, pricing, FAQ, black box, forms, legal pages
│   ├── pages.css       Laptop/phone mockups, slideshow, work list, case study, about
│   └── cats.css        Laptop + sleeping cat, Bino peeking
│
├── js/
│   ├── main.js         Phone menu, footer year, scroll animations
│   ├── showcase.js     The "Some of my work" slideshow
│   ├── sound.js        Meow + purr sounds, the "Cat sounds" button
│   ├── cats.js         Petting (purr), Bino's eyes, cat clicks
│   └── forms.js        Pre-ticks the package in the quote form (?package=)
│
├── fonts/              Jost (saved here so it loads fast)
├── images/
│   ├── about/          Photos of Bino
│   ├── cats/           Cat drawings (+ unused/ old ones)
│   ├── logo/           Logo, tab icon, phone icon
│   ├── work/           Project screenshots and photos
│   └── social-preview.png   The picture that shows when the link is shared
└── sounds/             meow.mp3 + purr.mp3
```

## Brand colors (css/base.css)

| Name | Color | Used for |
|---|---|---|
| `--ink` | #1c1a17 | Text, buttons, the black box, the cats |
| `--paper` | #f6f2ea | Page background (off-white) |
| `--card` | #fffdf8 | Cards and screens |
| `--soft` | #ede7db | Every other section |

The only orange on the site is Bino himself.

## Handy tricks

- **Fade in on scroll:** add `data-reveal` to any box.
- **Make anything meow when clicked:** add `data-meow`. **Hop:** add `data-hop`.
- **The header and footer** are copied on every page. If you change a menu link,
  change it in all the `.html` files (VS Code: Cmd+Shift+F to search all files).
- **The 404 page** uses links that start with `/`, so it only looks right online.

## Forms

Both forms are collected by Netlify. To get an email for each new message:
Netlify → your site → **Forms** → **Form notifications** → add hello@binostudio.com.

## Prices

Prices are not shown on the site (every client gets a quote). To add them later, add a
`<div class="price">` line to each package in `index.html` and `services.html`.

## When the Turkish café site is ready

See `images/work/README.md`.
