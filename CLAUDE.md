# SHAAW-TEE Website — Project Context

## What This Is
Streetwear brand website for SHAAW-TEE — a Kanpur-based Gen Z drop-culture tee brand. **Next.js (App Router) site**, plain JavaScript (no TypeScript), one global vanilla CSS file, className-based styling (no CSS Modules/Tailwind/styled-components), statically exported and deployed to Netlify, with **Shopify as the headless backend** (products, inventory, checkout/payment).

## Session Context (for a fresh Claude chat)
- **This folder (`shaawtee-site`) is the source of truth.**
- The user (brand owner) chats in **Hinglish** — reply the same way, casual tone is fine.
- This was originally a static HTML/CSS/vanilla-JS site (no build step, Live Server), then converted to Next.js, then wired to Shopify as a headless backend. A full pre-Next.js static-site backup remains at `C:\clients\Shaaw_tee\Website\0010 SHAWTEE\001 WEBSITE\shaawtee-website` if anything needs cross-checking.
- **Products are managed entirely in Shopify admin now** — there is no product data in this codebase at all (`lib/products.js` was deleted). See "Shopify integration" below for the exact admin-side conventions (tags/product type) the catalog must follow for the site's filters/badges/Midnight Shop to work.
- The site has a **night mode** (hanging bulb toggle, rendered on every page via the root layout) and a hidden **Midnight Shop** (`/midnight`) that shows only products tagged `midnight` in Shopify. Read "Architecture" and "Gotchas" before making changes.
- Deployed as a **static export** (`output: 'export'` in `next.config.mjs`) to Netlify — see "Deploy" at the bottom.

---

## How to Run
```
npm install
cp .env.local.example .env.local   # fill in your Shopify domain + Storefront token
npm run dev
```
Opens at `http://localhost:3000`. `npm run build` produces a static `out/` folder (this is what gets deployed — see "Deploy").

---

## Shopify integration

### Why / how
Product catalog and checkout/payment live in Shopify; this Next.js app is a pure frontend. Product data is fetched **client-side** from Shopify's **Storefront API** (a public GraphQL API meant to be called directly from the browser with a public token) — this means adding/editing/pricing products in Shopify shows up on the live site immediately, with **no rebuild or redeploy needed**. The tradeoff: a brief loading state on first paint of the shop/product/midnight pages instead of instant static content.

Checkout hands off to **Shopify's own hosted checkout** (`cartCreate` mutation → `checkoutUrl`, `window.location.href` redirect) — this is the standard headless-Shopify pattern; nobody builds custom payment UI, Shopify's checkout handles PCI compliance, tax, and shipping.

### Required env vars (`.env.local`, gitignored — see `.env.local.example`)
- `NEXT_PUBLIC_SHOPIFY_DOMAIN` — the store's `*.myshopify.com` domain (not a custom domain)
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` — from Shopify Admin → Settings → Apps and sales channels → Develop apps → create an app → Storefront API → enable scopes → Install → copy the **Storefront** token (never the Admin API token)
- `NEXT_PUBLIC_SHOPIFY_API_VERSION` — optional, defaults to `2025-01`

`NEXT_PUBLIC_` is required (not just convention) because this is a static export with no server at runtime — that's fine, Storefront tokens are meant to be public/client-safe.

### Shopify admin conventions (how a product's Shopify fields map onto the site)
| Shopify field | Drives |
|---|---|
| Handle | the product's `id` used everywhere, incl. `/product?id=<handle>` |
| Title | product name |
| Product type | `oversized` \| `boxy` \| `regular` — the `/shop` sidebar category filter |
| Tags | `midnight` → Midnight-Shop-only (hidden from `/shop`, never publicly listed elsewhere); `new` / `hot` → card badge (omit for no badge) |
| Options | `Size` (XS/S/M/L/XL/XXL) and optionally `Color` — each combination is a variant with its own price/inventory |
| Images | first image = card visual, all images = product page gallery |
| Description | first line = short product description shown under the price; remaining lines = the "THE DETAILS" bullet list |
| Inventory ("continue selling when out of stock") | `soldOut` is derived automatically from Shopify's own `availableForSale` — no manual flag |

Color swatches are rendered from a small local name→hex lookup (`COLOR_HEX` in `lib/shopify.js`) matched against the `Color` option value, with a neutral-gray fallback for unrecognized names — there's no Shopify-side hex config.

### Code
- **`lib/shopify.js`** — the Storefront API client: `shopifyFetch()` (raw GraphQL POST), `fetchAllProducts()` (queries + transforms Shopify's product shape into the shape every component expects: `id, name, price, meta, category, colors, sizes, badge, badgeType, description, details, soldOut, nightOnly, images, variants`), `findVariant(product, {size, color})` (resolves a cart selection to a real Shopify variant), `createCart(lines)` (the `cartCreate` mutation, returns `{ id, checkoutUrl }`).
- **`context/ProductsContext.jsx`** — fetches the catalog once per session on mount, exposes `useProducts()`: `{ products, loading, error, visibleProducts, nightOnlyProducts, getProductById }`. Same helper names/shapes the old `lib/products.js` exposed, so this was a drop-in swap for most call sites. Added to the provider stack in `app/layout.js`.
- **`context/CartContext.jsx`**'s `addItem` now also resolves and stores the Shopify `variantId` (via `findVariant`) on each cart line — this is what `/checkout` sends to Shopify.
- **`components/CheckoutClient.jsx`** is an order-review list + a single "PROCEED TO SECURE CHECKOUT →" button — no delivery-details form, no payment-method selector (Shopify's hosted checkout collects all of that). Calls `createCart()` and redirects to `checkoutUrl`.
- Known simplification: the site's own displayed price is the **lowest available variant price** (no per-size price display); if prices differ meaningfully by size, revisit this.

---

## Folder Structure

```
shaawtee-site/
├── app/
│   ├── layout.js            ← Root layout: Theme/Products/Cart providers + BulbToggle, imports globals.css
│   ├── globals.css          ← All styles (single file)
│   ├── page.js               ← Homepage
│   ├── shop/page.js          ← All tees + sidebar filters
│   ├── product/page.js       ← Single product (?id=... query param, size/colour selector, image slider)
│   ├── cart/page.js          ← Cart page
│   ├── checkout/page.js      ← Order review → Shopify checkout handoff
│   ├── about/page.js         ← Brand story
│   ├── info/page.js          ← Size guide, shipping, returns, FAQ
│   ├── designer/page.js      ← Designer of the Month (challenge + form + hall of fame)
│   └── midnight/page.js      ← Hidden Midnight Shop (own header/footer, neon panel, midnight-tagged tees)
├── components/               ← Nav, Footer, BulbToggle, ProductCard, CurrentDropGrid, Reveal, DropAlertForm,
│                                ShopPageClient, ProductDetailClient, CartClient, CheckoutClient,
│                                DesignerFormClient, MidnightShopClient, InfoNav, CartCountBadge
├── context/
│   ├── CartContext.jsx       ← useCart() — cart state (incl. Shopify variantId), persisted to localStorage
│   ├── ThemeContext.jsx      ← useTheme() — day/night state, persisted to localStorage
│   └── ProductsContext.jsx   ← useProducts() — live Shopify catalog, fetched once per session
├── lib/
│   ├── shopify.js            ← Storefront API client + Shopify->site data transform
│   └── paths.js               ← normalizePathname()/isMidnightPath() — see Gotchas
├── public/
│   └── assets/images/        ← logo.png (black), logo-night.png (white), logo-white.png (source)
├── .env.local.example         ← copy to .env.local and fill in
└── CLAUDE.md                 ← This file
```
Product photos now come from Shopify's CDN (image URLs returned by the Storefront API) — `public/products/` no longer exists.

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
Permanent Marker (headings), Caveat (body/casual copy), Bebas Neue (brand name/stats), Space Mono (data/metadata). Loaded via `<link rel="stylesheet">` tags in `app/layout.js`'s `<head>` — **not** a CSS `@import` and **not** `next/font`. A remote `@import url(...)` inside `globals.css` gets silently stripped by Next.js's CSS bundler (Turbopack) and never actually fetches the font — this was a real bug found after the initial conversion (every heading was silently falling back to generic cursive/monospace).

### Design Style
Sketch/zine aesthetic — `sketch-box` class gives hand-drawn double borders, everything slightly rotated, crosshair cursor, rough edges.

---

## Architecture

### State: React Context (no external state library)
- **`context/ProductsContext.jsx`** → `useProducts()` — see "Shopify integration" above.
- **`context/CartContext.jsx`** → `useCart()`: `{ cart, addItem, removeItem, changeQty, clearCart, itemCount, subtotal }`. Persists to `localStorage` key `shaawtee_cart`.
- **`context/ThemeContext.jsx`** → `useTheme()`: `{ theme, setTheme }` (`'day' | 'night'`). Persists to `localStorage` key `shaawtee_theme`, respects `prefers-color-scheme` on first visit. Applies `night` class + `data-page` attribute to `document.body` directly (body lives once in the root layout).
- All three providers wrap the whole app in `app/layout.js`, alongside `<BulbToggle/>` rendered once globally.

### Nav/Footer are NOT in the root layout
Every page renders its own `<Nav ctaHref="..." ctaLabel="..."/>` and `<Footer/>` — **except** `/midnight`, which has its own bespoke header/footer markup instead, letting Midnight Shop look completely different without fighting a shared layout.

### Product page routing
`/product?id=<shopify-handle>` — a query param (not a `/product/[id]` dynamic route), read via `useSearchParams()` inside `ProductDetailClient` (wrapped in `<Suspense>` in `app/product/page.js`, required whenever a client component uses `useSearchParams`).

### Bulb toggle / night mode / Midnight Shop flow
`components/BulbToggle.jsx` owns the **entire** shutter overlay lifecycle — it's rendered once in the root layout, so it survives client-side navigation between `/` and `/midnight` (layouts don't remount on route change). The shutter is a single persisted `motion.div` (framer-motion, `AnimatePresence`) that animates closed, sits covering the screen through the `router.push(...)`, then animates open once the destination page has mounted underneath — one continuous animation, no flash/gap.
- The transition is **symmetric** — `phase` (`'covering' → 'covered' → 'revealing'`) and `direction` (`'night' | 'day'`, for which Hinglish copy to show):
  - Day → night: click → pulling → shutter drops (slight overshoot-then-settle, `DROP_KEYFRAMES`) → `setTheme('night')` + `router.push('/midnight')` → holds → rises to reveal Midnight Shop.
  - Night → day (bulb click *from* `/midnight`): same drop → `setTheme('day')` + `router.push('/')` → holds → rises to reveal the homepage.
- `awaiting` tracks which pathname the reveal is waiting for; a mount-only effect sets `awaiting('/midnight')` if you land there directly (link/refresh/typed URL), so the entrance reveal still plays.
- Switching to day while on `/midnight`: **must** call `setTheme('day')` before/with `router.push('/')` — forgetting the `setTheme` call silently leaves the site stuck in night mode (caught and fixed once already).

### Scroll reveal / smooth scroll / card tilt
- `components/Reveal.jsx` — framer-motion `motion.div` with `whileInView`. Takes an optional `delay` prop (seconds) for staggering — **not** a `style={{ transitionDelay }}` prop, which framer-motion ignores.
- Whole-site momentum smooth scroll via `lenis` (`<ReactLenis root .../>` in `app/layout.js`); `anchors: true` makes same-page `#hash` nav links scroll smoothly too. Required CSS lives in `app/globals.css` under "LENIS SMOOTH SCROLL" — don't delete it.
- Card mouse-tilt is inline `onMouseMove`/`onMouseLeave` handlers directly on `ProductCard.jsx`.

### Static export
`next.config.mjs` sets `output: 'export'` and `trailingSlash: true`. Every route builds to `out/<route>/index.html` (unambiguous — earlier without `trailingSlash`, Next also emitted a same-named `<route>/` folder alongside `<route>.html` for RSC prefetch payloads, which confused some static file servers into serving the wrong page). See "Gotchas" for the pathname-comparison consequence of `trailingSlash: true`.

---

## Pages Overview

### `/` (Homepage)
Hero, marquee, "Current Drop" product grid (`CurrentDropGrid` — first 3 non-`midnight`-tagged products from the live Shopify feed, newest-first), vibe stats, Designer of the Month teaser, drop alert email form, footer.

### `/shop`
`ShopPageClient` — sidebar filter state (`useState`), counts via `useMemo`, grid of `ProductCard`, sourced from `useProducts()`.

### `/product?id=...`
`ProductDetailClient` — colour/size/qty as local state, image slider + auto-scroll (pauses on manual thumbnail click), add-to-bag validates size selection, blocks `nightOnly` products unless `theme === 'night'`.

### `/cart`
`CartClient` — reads from `useCart()`, qty +/− controls, remove, order summary (free shipping ≥ ₹999 — this is the merchant's stated policy, shown for shopping-decision purposes; actual shipping/tax is computed by Shopify at checkout).

### `/checkout`
`CheckoutClient` — order review + "PROCEED TO SECURE CHECKOUT →" → creates a Shopify cart from the local cart's `variantId`s and redirects to Shopify's `checkoutUrl`.

### `/about`, `/info`, `/designer`
Mostly static content. `/info` has a scrollspy sidebar (`components/InfoNav.jsx`). `/designer` has a submission form (`components/DesignerFormClient.jsx`, front-end only).

### `/midnight`
`MidnightShopClient` — renders only `midnight`-tagged products, per-product size selection + add-to-bag, entrance shutter-opening animation (owned by `BulbToggle`, see above).

---

## What's Done
- [x] Full Next.js (App Router) conversion — same design/behavior as the original static site
- [x] Shopify headless integration — live product catalog + real checkout handoff (see "Shopify integration")
- [x] Static export (`output: 'export'`) deployed to Netlify
- [x] Night mode + Midnight Shop easter egg
- [x] Framer-motion scroll reveals + a genuinely smooth, single-instance shutter transition on the bulb toggle
- [x] Lenis whole-site smooth scroll
- [x] Designer of the Month

## What Still Needs Doing
- [ ] **Fill in `.env.local`** with real Shopify domain/token, and set up the catalog per the admin conventions above — until then the shop/product/midnight pages will show "loading the drop..." forever or a Storefront API error
- [ ] **Form backends** — drop alert form + designer submission form are front-end only (need Mailchimp/Google Forms/etc.)
- [ ] **Real social links** — Instagram, TikTok, Twitter hrefs in `components/Footer.jsx`
- [ ] **Contact page** or email address
- [ ] **Lookbook page** — currently `href="#"`

## Gotchas
- The bulb toggle wrapper (`.bulb-toggle`) has `pointer-events: none` in CSS — only `.bulb-bulb`/`.bulb-knot` are clickable. Keep it that way.
- Product card price font (Permanent Marker) renders repeated "1"s badly — a Shopify price like ₹1,111 will look off.
- `useSearchParams()` in a client component requires a `<Suspense>` boundary (already set up in `app/product/page.js`) — don't remove it.
- When editing `BulbToggle.jsx`'s "lights on from Midnight Shop" branch, remember it needs both `setTheme('day')` **and** `router.push('/')`.
- Don't add a CSS `@import url(...)` for external fonts — Next.js's CSS bundler silently strips it.
- `Reveal` is a framer-motion component — pass stagger delays via its `delay` prop, not a `transitionDelay` inline style.
- Don't call `window.scrollTo()` expecting Lenis to follow along — it only intercepts real wheel/touch input by default.
- **`trailingSlash: true` changes `usePathname()`'s return value** from `/midnight` to `/midnight/`. Any exact-match pathname comparison must go through `normalizePathname()`/`isMidnightPath()` in `lib/paths.js` instead of comparing raw strings — this exact bug once broke the whole night-mode shutter (it silently never matched, so the shutter got stuck).
- The Storefront API token is meant to be public/client-side — never put the **Admin API** token in any `NEXT_PUBLIC_` var or client code.
- Site prices only reflect what's in Shopify at the moment `ProductsContext` fetched the catalog (once per page session) — a merchant price change won't retroactively update an already-open tab, but a fresh visit/reload always gets the latest.

## Deploy (Netlify, static export)
1. `npm run build` → produces `out/`
2. Netlify: connect the GitHub repo, or drag-and-drop the `out/` folder in Netlify's manual-deploy UI
3. Set the same env vars (`NEXT_PUBLIC_SHOPIFY_*`) in Netlify's site settings if using Git-based builds (so `npm run build` has them at build time — though since fetching is client-side, they mainly need to be present wherever `npm run build` runs, since Next.js inlines `NEXT_PUBLIC_*` vars into the client bundle at build time)
4. Every future `git push` (if Git-connected) or manual `out/` re-upload redeploys
