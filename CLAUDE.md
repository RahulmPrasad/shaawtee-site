# SHAAW-TEE Website — Project Context

## What This Is
Streetwear brand website for SHAAW-TEE — a Kanpur-based Gen Z drop-culture tee brand. **Next.js (App Router) site**, plain JavaScript (no TypeScript), one global vanilla CSS file, className-based styling (no CSS Modules/Tailwind/styled-components).

## Session Context (for a fresh Claude chat)
- **This folder (`shaawtee-site`) is the source of truth.**
- The user (brand owner) chats in **Hinglish** — reply the same way, casual tone is fine.
- This was originally a static HTML/CSS/vanilla-JS site (no build step, Live Server). It was converted to Next.js — same visual design and behavior, but React components + `npm run dev` instead of static HTML pages. The old `index.html`/`css/`/`js/`/`pages/` files have been removed; a full static-site backup remains at `C:\clients\Shaaw_tee\Website\0010 SHAWTEE\001 WEBSITE\shaawtee-website` if anything needs to be cross-checked.
- Design source files (tee artwork, mockups, model shots) live OUTSIDE this folder: `C:\clients\Shaaw_tee\Website\0010 SHAWTEE\002 PRODUCTS\` and the `0010 SHAWTEE` root. User drops new design images there, then asks to add them as products.
- **To add a product:** add an entry to the `PRODUCTS` array in `lib/products.js` (copy an existing entry — `visual` = card image HTML string, `images` = product page gallery array). Shop grid, filters, counts, and product page all render from it automatically. Put image files in `public/products/regular/` or `public/products/oversized/` and reference them as root-relative paths (`/products/regular/foo.png`).
- The site has a **night mode** (hanging bulb toggle, rendered on every page via the root layout) and a hidden **Midnight Shop** (`/midnight`) that shows only `nightOnly: true` products. Details in the sections below — read "Architecture" and "Gotchas" before making changes.

---

## How to Run
```
npm install
npm run dev
```
Opens at `http://localhost:3000`. `npm run build` for a production build, `npm start` to serve it.

---

## Folder Structure

```
shaawtee-site/
├── app/
│   ├── layout.js            ← Root layout: ThemeProvider + CartProvider + BulbToggle, imports globals.css
│   ├── globals.css          ← All styles (single file, ported from the old css/styles.css)
│   ├── page.js               ← Homepage
│   ├── shop/page.js          ← All tees + sidebar filters
│   ├── product/page.js       ← Single product (?id=... query param, size/colour selector, image slider)
│   ├── cart/page.js          ← Cart page
│   ├── checkout/page.js      ← Checkout form + order summary (Razorpay pending)
│   ├── about/page.js         ← Brand story
│   ├── info/page.js          ← Size guide, shipping, returns, FAQ
│   ├── designer/page.js      ← Designer of the Month (challenge + form + hall of fame)
│   └── midnight/page.js      ← Hidden Midnight Shop (own header/footer, neon panel, nightOnly tees)
├── components/               ← Nav, Footer, BulbToggle, ProductCard, Reveal, DropAlertForm,
│                                ShopPageClient, ProductDetailClient, CartClient, CheckoutClient,
│                                DesignerFormClient, MidnightShopClient, InfoNav, CartCountBadge
├── context/
│   ├── CartContext.jsx       ← useCart() — cart state, persisted to localStorage
│   └── ThemeContext.jsx      ← useTheme() — day/night state, persisted to localStorage
├── lib/
│   └── products.js           ← PRODUCTS array (single source of truth for all tees)
├── public/
│   ├── assets/images/        ← logo.png (black), logo-night.png (white), logo-white.png (source)
│   └── products/regular|oversized/ ← product photos
└── CLAUDE.md                 ← This file
```

---

## Brand Identity

### Colors (CSS variables in app/globals.css)
| Variable | Hex | Use |
|----------|-----|-----|
| `--ink` | `#1a1614` | Deep ink / dark bg |
| `--paper` | `#f2ede0` | Page background |
| `--red` | `#e8320a` | Riot Red — CTAs, accents |
| `--yellow` | `#f5c800` | Rave Yellow — highlights |
| `--blue` | `#1a3cff` | Blueprint Blue — secondary |
| `--black` | `#0a0a0a` | Pure black |
| `--white` | `#f5f0e8` | Paper white |

### Fonts
Permanent Marker (headings), Caveat (body/casual copy), Bebas Neue (brand name/stats), Space Mono (data/metadata). Loaded via `<link rel="stylesheet">` tags in `app/layout.js`'s `<head>` — **not** a CSS `@import` and **not** `next/font`. A remote `@import url(...)` inside `globals.css` gets silently stripped by Next.js's CSS bundler (Turbopack) and never actually fetches the font — this was a real bug found after the initial conversion (every heading was silently falling back to generic cursive/monospace). `<link>` tags in the layout head bypass CSS bundling entirely, so they work exactly like the original static site's `<link>` tags. Every `font-family: 'X'` reference in CSS/JS keeps working unchanged since these are the literal Google Fonts family names, not `next/font`-generated ones.

### Design Style
Sketch/zine aesthetic — `sketch-box` class gives hand-drawn double borders, everything slightly rotated, crosshair cursor, rough edges.

---

## Architecture

### Data: `lib/products.js`
All product data lives in the `PRODUCTS` array. Each product:
```js
{
  id: 'cockroach-rising',
  name: 'Cockroach Rising Tee',
  price: 999,
  meta: 'BLACK · OVERSIZED · 240 GSM',
  category: 'oversized',        // 'oversized' | 'boxy' | 'regular'
  colors: [{ name: 'Ink Black', hex: '#0a0a0a' }],
  sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  badge: 'NEW ✦',
  badgeType: 'new',             // 'new' | 'hot' | 'soldout' | 'night'
  description: '...',
  details: ['...'],
  soldOut: false,
  nightOnly: false,             // true = only shows in the Midnight Shop, never in the regular shop
  visual: `<img src="/products/oversized/x.png" style="...">`,  // or an inline SVG/HTML string placeholder
  images: ['/products/oversized/x-front.png', '/products/oversized/x-back.png'],  // optional gallery
}
```
`visual` is rendered via `dangerouslySetInnerHTML` (same trust model as the old site's `innerHTML` — it's static, author-controlled data, never user input). Helper exports: `visibleProducts()` (excludes `nightOnly`), `nightOnlyProducts()`, `getProductById(id)`.

### State: React Context (no external state library)
- **`context/CartContext.jsx`** → `useCart()`: `{ cart, addItem, removeItem, changeQty, clearCart, itemCount, subtotal }`. Persists to `localStorage` key `shaawtee_cart`.
- **`context/ThemeContext.jsx`** → `useTheme()`: `{ theme, setTheme }` (`'day' | 'night'`). Persists to `localStorage` key `shaawtee_theme`, respects `prefers-color-scheme` on first visit. Applies `night` class + `data-page` attribute to `document.body` directly (body lives once in the root layout, so this replaces what used to be per-page `<body class="night" data-page="midnight">` markup).
- Both providers wrap the whole app in `app/layout.js`, alongside `<BulbToggle/>` which is rendered once globally (matches the old site injecting the bulb on every page).

### Nav/Footer are NOT in the root layout
Every page renders its own `<Nav ctaHref="..." ctaLabel="..."/>` and `<Footer/>` (mirrors the old site repeating this markup per HTML page) — **except** `/midnight`, which has its own bespoke header/footer markup instead. This is what lets Midnight Shop look completely different without fighting a shared layout.

### Product page routing
`/product?id=cockroach-rising` — deliberately kept as a query param (not a `/product/[id]` dynamic route) to match the original site's URL shape. Reads `id` via `useSearchParams()` inside `ProductDetailClient` (wrapped in `<Suspense>` in `app/product/page.js`, required by Next.js whenever a client component uses `useSearchParams`).

### Bulb toggle / night mode / Midnight Shop flow
`components/BulbToggle.jsx` owns the **entire** shutter overlay lifecycle, not just the click — it's rendered once in the root layout, so it survives client-side navigation between `/` and `/midnight` (layouts don't remount on route change). This matters: the shutter is a single persisted `motion.div` (framer-motion, `AnimatePresence`) that animates closed, sits covering the screen through the `router.push(...)`, then animates open once the destination page has mounted underneath — one continuous animation, no flash/gap between "closing" and "entrance reveal" like there would be with two separate components each mounting their own shutter. `MidnightShopClient` itself has no shutter logic anymore.
- The transition is **symmetric** in both directions — `phase` (`'covering' → 'covered' → 'revealing'`) and `direction` (`'night' | 'day'`, purely for which Hinglish copy to show) drive one shared overlay:
  - Day → night: click → pulling → shutter drops (with a slight overshoot-then-settle, `DROP_KEYFRAMES`) → `setTheme('night')` + `router.push('/midnight')` → holds → rises to reveal Midnight Shop.
  - Night → day (clicking the bulb *from* `/midnight`): same drop → `setTheme('day')` + `router.push('/')` → holds → rises to reveal the homepage. This is a deliberate mirror of the night-entry sequence, added on request — don't let it regress back to an instant/no-shutter redirect.
- `awaiting` tracks which pathname the reveal is waiting for; a mount-only effect sets `awaiting('/midnight')` if you land there directly (a link, refresh, typed URL) without clicking the bulb, so the entrance reveal still plays — matching the original static site's midnight page always showing it on load.
- Switching to day while already on `/midnight`: **must** call `setTheme('day')` before/with `router.push('/')` — it's easy to forget the `setTheme` call and only navigate, which silently leaves the site in night mode (this exact bug was caught and fixed once already — don't reintroduce it).

### Scroll reveal / smooth scroll / card tilt
- `components/Reveal.jsx` — framer-motion `motion.div` with `whileInView` (replaces the old IntersectionObserver + CSS class approach), used anywhere the old site had `class="... reveal"`. Takes an optional `delay` prop (seconds) for staggering — **not** a `style={{ transitionDelay }}` prop, which framer-motion ignores since it doesn't animate via CSS transitions.
- Whole-site momentum smooth scroll via `lenis` (`<ReactLenis root .../>` in `app/layout.js`) — this is why scrolling feels "weighted"/eased instead of native. `anchors: true` makes same-page `#hash` nav links (drops/tees/vibe) scroll smoothly too. Required companion CSS lives in `app/globals.css` under "LENIS SMOOTH SCROLL" — don't delete it, Lenis's own classes (`.lenis`, `.lenis-stopped`, etc.) depend on it.
- Card mouse-tilt is inline `onMouseMove`/`onMouseLeave` handlers directly on `ProductCard.jsx` (no more global `querySelectorAll` loop).

---

## Pages Overview

### `/` (Homepage)
Hero, marquee, "Current Drop" product grid (3 products from `lib/products.js` via `ProductCard`, no longer hardcoded/stale HTML), vibe stats, Designer of the Month teaser, drop alert email form, footer.

### `/shop`
`ShopPageClient` — sidebar filter state (`useState`), counts via `useMemo`, grid of `ProductCard`.

### `/product?id=...`
`ProductDetailClient` — colour/size/qty as local state, image slider + auto-scroll (pauses on manual thumbnail click), add-to-bag validates size selection, blocks `nightOnly` products unless `theme === 'night'`.

### `/cart`
`CartClient` — reads from `useCart()`, qty +/− controls, remove, order summary (free shipping ≥ ₹999).

### `/checkout`
`CheckoutClient` — delivery form + validation, payment method selector (UI only), fake "place order" (clears cart, shows success screen). **Razorpay integration point**: inside `handleSubmit` in `components/CheckoutClient.jsx`, replace the `setTimeout` with the actual Razorpay SDK call.

### `/about`, `/info`, `/designer`
Mostly static content. `/info` has a scrollspy sidebar (`components/InfoNav.jsx`). `/designer` has a submission form (`components/DesignerFormClient.jsx`, front-end only).

### `/midnight`
`MidnightShopClient` — renders only `nightOnly` products, per-product size selection + add-to-bag, entrance shutter-opening animation on mount.

---

## What's Done
- [x] Full Next.js (App Router) conversion — same design/behavior as the original static site
- [x] Homepage, shop (filters), product page (size/colour/qty/gallery), cart, checkout, about, info, designer, midnight
- [x] Night mode + Midnight Shop easter egg
- [x] Cart persistence via CartContext + localStorage
- [x] Real product photos wired: amar, humble, eventually, mona-rebel, rider, freedom-rider, dalee
- [x] Designer of the Month
- [x] Framer-motion scroll reveals + a genuinely smooth, single-instance shutter transition on the bulb toggle
- [x] Lenis whole-site smooth scroll (momentum feel + smooth anchor-link jumps)
- [x] Fixed Google Fonts not actually loading (they were previously stripped by Next's CSS bundler)
- [x] Verified end-to-end with a Playwright smoke pass (shop filters, add-to-cart, checkout flow, designer form, night mode → Midnight Shop → back)

## What Still Needs Doing
- [ ] **DARK JOKE tee photo** — user will provide; replace the `.mn-img-placeholder` markup in `components/MidnightShopClient.jsx`
- [ ] **Razorpay integration** — in `handleSubmit` in `components/CheckoutClient.jsx`
- [ ] **Form backends** — drop alert form + designer submission form are front-end only (need Mailchimp/Google Forms/etc.)
- [ ] **Deploy** — Vercel is the natural fit for a Next.js app (`vercel.com` → New Project → import this folder)
- [ ] **Real social links** — Instagram, TikTok, Twitter hrefs in `components/Footer.jsx`
- [ ] **Contact page** or email address
- [ ] **Lookbook page** — currently `href="#"`

## Gotchas
- The bulb toggle wrapper (`.bulb-toggle`) has `pointer-events: none` in CSS — only `.bulb-bulb`/`.bulb-knot` are clickable (so the cord doesn't block nav buttons). Keep it that way.
- Product card price font (Permanent Marker) renders repeated "1"s badly — avoid prices like 1111.
- `useSearchParams()` in a client component requires a `<Suspense>` boundary around it (already set up in `app/product/page.js`) — don't remove it or the build will fail/warn.
- When editing `BulbToggle.jsx`'s "lights on from Midnight Shop" branch, remember it needs both `setTheme('day')` **and** `router.push('/')` — navigating without the theme flip leaves the site stuck in night mode.
- Don't add a CSS `@import url(...)` for external fonts in `globals.css` — Next.js's CSS bundler silently strips it and the font never loads. Fonts belong in `<link>` tags in `app/layout.js`'s `<head>`.
- `Reveal` is a framer-motion component — pass stagger delays via its `delay` prop (seconds), not a `transitionDelay` inline style; framer-motion doesn't animate through CSS transitions so that style is just inert.
- Don't call `window.scrollTo()` expecting Lenis to follow along smoothly — Lenis only intercepts real wheel/touch input by default. Programmatic scrolling should go through the `useLenis()` hook / `lenis.scrollTo()` if it's ever needed.

## Deploy to Vercel (when ready)
1. Push this repo to GitHub (or use the Vercel CLI directly from this folder)
2. Go to vercel.com → New Project → import the repo (or run `vercel` in this folder)
3. Done — free hosting, custom domain support, zero config needed for a plain Next.js app
