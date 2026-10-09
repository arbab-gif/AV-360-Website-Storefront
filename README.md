# 360 AV Design — Event Rental Storefront

Browse event rentals by category or occasion, build a wishlist, and send a quote request to the team.

Built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Quote requests

"Request a Quote" needs somewhere to send requests. Copy `.env.example` to `.env` and set one of:

- `VITE_QUOTE_ENDPOINT` — a URL that accepts a JSON POST (for example a Formspree form, or your own API)
- `VITE_QUOTE_EMAIL` — the team's inbox; the visitor's email app opens with the request filled in

Without either, the form tells the visitor the request wasn't sent.

## Project layout

- `src/data/catalog.js` — categories, event types, items and image IDs
- `src/components/` — navigation, hero, sections, cards, wishlist panel, quote form
- `src/context/WishlistContext.jsx` — wishlist state, saved in the browser
- `src/lib/quote.js` — builds and sends quote requests
- `src/styles/` — design tokens and styles
