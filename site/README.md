# Converge Challenge — Site

Event website for **Converge Challenge**, the AI Agents hackathon powered by Tako
and organized by Ligia (CIn-UFPE) and Canastra Ventures. Built with Vite + React,
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
- **SEO:** the `<head>` gets a schema.org `Event` (JSON-LD) built from `config.js`
  by a small plugin in `vite.config.js`. The public URL (`SITE_URL`) is repeated in
  `index.html` (canonical, `og:url`), `public/robots.txt` and `public/sitemap.xml`.
- **Schedule:** `DAYS` in `src/components/Schedule.jsx`.
- **FAQ:** `QUESTIONS` in `src/components/Faq.jsx`.
- **Sponsorship tiers** (benefits only, no prices): `TIERS` in
  `src/components/Sponsor.jsx`.
- **Partner logos** (blurbs too): `src/components/Logos.jsx`, in the tiers of the
  event's partner chart. The event logo with "powered by Tako" (Tako bought naming rights)
  must always show; organizers (Ligia, Canastra) whenever possible; partners
  (Porto Digital, CESAR, TAIL) and supporters (AWS, Featherless) when there is room.
  `converge-logo.svg` is the official logo; the partner PNGs were cropped from the
  partner chart, the other SVGs come from the deck's logo sprite (`../index.html`).

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
