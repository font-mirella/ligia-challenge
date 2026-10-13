# Converge Challenge — Site

Event website for **Converge Challenge**, the AI Agents hackathon organized by
Ligia (CIn-UFPE), TAIL (UFPB) and Canastra Ventures. Built with Vite + React,
same stack as the HackaWoman site.

## Run

```sh
cd site
npm install
npm run dev       # local dev server
npm run build     # production build in site/dist
npm run preview   # serve the build locally
```

## Editing content

- **Event facts** (dates, hours, venue, number of builders), the **Luma links**
  and the **contact email** all live in [`src/config.js`](src/config.js).
  Every section reads from there.
- **Schedule:** `DAYS` in `src/components/Schedule.jsx`.
- **FAQ:** `QUESTIONS` in `src/components/Faq.jsx`.
- **Sponsorship tiers** (benefits only, no prices): `TIERS` in
  `src/components/Sponsor.jsx`.
- **Organizers and supporters** (logos and blurbs): `src/components/Logos.jsx`.
  The SVGs in `src/assets/logos/` were extracted from the deck's logo sprite
  (`../index.html`).

## Structure

```
src/
  config.js            event facts, Luma URLs, contact, nav links
  App.jsx              section order
  styles/global.css    design tokens (navy / orange), type, buttons, reveal-on-scroll
  components/          one component + CSS file per section
  hooks/               in-view, reduced-motion, page-wide reveal/spotlight effects
  lib/ascii.js         static ASCII art backgrounds (#*+= motif from the deck)
```

Fonts are self-hosted through Fontsource: **Geist** (body), **Geist Mono**
(headlines, labels) and **Instrument Serif** italic (accent words).

Animations (ASCII torus, binary rain, text scramble, typing terminal,
count-ups, marquee) pause off screen and turn off for visitors with
`prefers-reduced-motion`.

## Deploy

Pushing to `main` runs [`.github/workflows/pages.yml`](../.github/workflows/pages.yml),
which builds this app and publishes GitHub Pages with the deck at the root and
the site under `/site/`:

- Site: https://automlsummerschool.cin.ufpe.br/ligia-challenge/site/
- Deck: https://automlsummerschool.cin.ufpe.br/ligia-challenge/

`vite.config.js` uses `base: './'`, so the same `dist/` also works on any
other host (Vercel, Netlify, a sub-path) without changes.
