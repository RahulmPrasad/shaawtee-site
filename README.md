# SHAAW-TEE Website

## Folder Structure

```
shaawtee-website/
├── index.html              ← Main homepage
├── css/
│   └── styles.css          ← All styles + brand colors
├── js/
│   └── main.js             ← Animations, interactions
├── assets/
│   ├── images/
│   │   ├── logo-black.png  ← Logo (black bg version)
│   │   └── logo-white.png  ← Logo (white version)
│   └── fonts/              ← Add custom fonts here if needed
├── pages/                  ← Add new pages here (shop.html, about.html etc.)
└── README.md               ← This file
```

## Brand Colors

| Name         | Hex       | Use                          |
|--------------|-----------|------------------------------|
| Ink Black    | `#0a0a0a` | Primary / backgrounds        |
| Paper Cream  | `#f2ede0` | Page background (sketchbook) |
| Riot Red     | `#e8320a` | Accent / urgency / CTAs      |
| Rave Yellow  | `#f5c800` | Highlights / drop badges     |
| Blueprint Blue | `#1a3cff` | Secondary accent            |

## Fonts (Google Fonts — already linked)

- **Permanent Marker** — Bold headings, raw feel
- **Caveat** — Body text, tags, casual copy
- **Bebas Neue** — Brand name, labels
- **Space Mono** — Data, metadata, monospace details

## How to Run in VS Code

1. Open the `shaawtee-website` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **"Open with Live Server"**
4. Done! Opens at `http://127.0.0.1:5500`

## Adding New Pages

1. Create a new `.html` file inside `/pages/` (e.g. `shop.html`)
2. Copy the `<head>` from `index.html` (includes fonts + css link)
3. Update the CSS link path: `href="../css/styles.css"`
4. Update the JS link path: `src="../js/main.js"`

## Next Steps / TODO

- [ ] Add real product photos to `/assets/images/`
- [ ] Build `/pages/shop.html` — full product grid
- [ ] Build `/pages/product.html` — single product page
- [ ] Build `/pages/about.html` — brand story
- [ ] Connect email form to Mailchimp / ConvertKit
- [ ] Add Razorpay / Cashfree payment integration
- [ ] Deploy on Vercel or Netlify (free hosting)
