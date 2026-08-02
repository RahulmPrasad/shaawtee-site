// ---- PRODUCTS DATA ----
export const PRODUCTS = [
  {
    id: 'dark-joke',
    name: 'DARK JOKE Tee',
    price: 1099,
    meta: 'PITCH BLACK · OVERSIZED · 240 GSM',
    category: 'oversized',
    nightOnly: true,
    colors: [
      { name: 'Pitch Black', hex: '#0a0a0a' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'MIDNIGHT ONLY 🌙',
    badgeType: 'night',
    description: "Sirf raat ke scrollers ke liye. Glow-in-the-dark print — din mein plain black tee, andhere mein joke reveal. Yeh product light mode walon ko kabhi nahi dikhega. Unka loss.",
    details: [
      '240 GSM 100% Cotton',
      'Glow-in-the-dark screen print',
      'Din mein invisible, raat mein legend',
      'Oversized fit — size down for regular fit',
      'Drop shoulder construction',
      'Midnight exclusive — sirf night mode mein milti hai',
    ],
    soldOut: false,
    visual: `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;text-align:center;padding:24px;">
      <div style="font-family:'Permanent Marker',cursive;font-size:22px;line-height:1.4;color:#f5f0e8;text-shadow:0 0 16px rgba(245,200,0,0.6);">JOKE ITNA<br>DARK HAI,<br>LIGHT MODE MEIN<br>DIKHTA HI NAHI.</div>
      <div style="font-family:'Space Mono',monospace;font-size:9px;letter-spacing:2px;color:rgba(245,200,0,0.8);">☾ GLOW IN THE DARK PRINT ☾</div>
    </div>`,
  },
  {
    id: 'amar',
    name: 'AMAR Tee',
    price: 999,
    meta: 'OFF WHITE · OVERSIZED · 240 GSM',
    category: 'oversized',
    colors: [
      { name: 'Off White', hex: '#f2ede0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW ✦',
    badgeType: 'new',
    description: "The fragrance stays, the person doesn't. Maharaja skeleton with a rose — chest print in front, full art on the back. Heavy oversized cotton for the ones who never really leave.",
    details: [
      '240 GSM 100% Cotton',
      'Oversized fit — size down for regular fit',
      'Drop shoulder construction',
      'Ribbed crew neck',
      'Front chest print + full back print',
      'Pre-washed for softness',
    ],
    soldOut: false,
    visual: `<img src="/products/oversized/amar-front.png" style="width:100%;height:100%;object-fit:cover;">`,
    images: [
      '/products/oversized/amar-front.png',
      '/products/oversized/amar-back.png',
    ],
  },
  {
    id: 'humble',
    name: 'HUMBLE Tee',
    price: 999,
    meta: 'WHITE · OVERSIZED · 240 GSM',
    category: 'oversized',
    colors: [
      { name: 'White', hex: '#ffffff' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW ✦',
    badgeType: 'new',
    description: 'Loud music. Quiet mind. Monk mode on the back, Humble on the chest — for the ones who stay calm in the chaos.',
    details: [
      '240 GSM 100% Cotton',
      'Oversized fit — size down for regular fit',
      'Drop shoulder construction',
      'Ribbed crew neck',
      'Front chest print + full back print',
      'Pre-washed for softness',
    ],
    soldOut: false,
    visual: `<img src="/products/oversized/humble-model-front.png" style="width:100%;height:100%;object-fit:cover;">`,
    images: [
      '/products/oversized/humble-model-front.png',
      '/products/oversized/humble-model-back.png',
      '/products/oversized/humble-front.png',
      '/products/oversized/humble-back.png',
    ],
  },
  {
    id: 'eventually',
    name: 'EVENTUALLY Tee',
    price: 999,
    meta: 'BEIGE · OVERSIZED · 240 GSM',
    category: 'oversized',
    colors: [
      { name: 'Beige', hex: '#e8e0d0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW ✦',
    badgeType: 'new',
    description: "The less I know the better. Tame Impala tribute — Eventually on the front, full psychedelic art with the lyrics on the back.",
    details: [
      '240 GSM 100% Cotton',
      'Oversized fit — size down for regular fit',
      'Drop shoulder construction',
      'Ribbed crew neck',
      'Front text print + full back print',
      'Unisex fit',
    ],
    soldOut: false,
    visual: `<img src="/products/oversized/eventually-model-front.png" style="width:100%;height:100%;object-fit:cover;">`,
    images: [
      '/products/oversized/eventually-model-front.png',
      '/products/oversized/eventually-model-back.png',
    ],
  },
  {
    id: 'mona-rebel',
    name: 'MONA REBEL Tee',
    price: 999,
    meta: 'VINTAGE BLACK · OVERSIZED · 240 GSM',
    category: 'oversized',
    colors: [
      { name: 'Vintage Black', hex: '#1a1a1a' },
      { name: 'Ash Grey', hex: '#b5b5b5' },
      { name: 'Navy Blue', hex: '#2b3247' },
      { name: 'Sand Beige', hex: '#c8b394' },
      { name: 'Off White', hex: '#f2ede0' },
      { name: 'Muted Purple', hex: '#a58fc0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'HOT 🔥',
    badgeType: 'hot',
    description: 'Art is freedom. No regrets. Mona with attitude since 1503 — be your own masterpiece. 6 colorways, one energy.',
    details: [
      '240 GSM 100% Cotton',
      'Oversized fit — size down for regular fit',
      'Drop shoulder construction',
      'Ribbed crew neck',
      'Full back print',
      '6 colorways',
    ],
    soldOut: false,
    visual: `<img src="/products/oversized/mona-rebel-model.png" style="width:100%;height:100%;object-fit:cover;">`,
    images: [
      '/products/oversized/mona-rebel-model.png',
      '/products/oversized/mona-rebel.png',
    ],
  },
  {
    id: 'rider',
    name: 'Rider Tee',
    price: 549,
    meta: 'WHITE · REGULAR FIT · 180 GSM',
    category: 'regular',
    colors: [
      { name: 'White', hex: '#f5f0e8' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW ✦',
    badgeType: 'new',
    description: 'Clean white, raw energy. The Rider tee for the ones who move without stopping.',
    details: [
      '180 GSM 100% Cotton',
      'Regular fit',
      'Crew neck',
      'Screen printed graphic',
    ],
    soldOut: false,
    visual: `<img src="/products/regular/rider.png" style="width:100%;height:100%;object-fit:cover;">`,
    images: [
      '/products/regular/rider.png',
      '/products/regular/rider-model.png',
    ],
  },
  {
    id: 'freedom-rider',
    name: 'Freedom Rider Tee',
    price: 549,
    meta: 'BLACK · REGULAR FIT · 180 GSM',
    category: 'regular',
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW ✦',
    badgeType: 'new',
    description: 'Black. Bold. Free. The Freedom Rider tee for those who ride on their own terms.',
    details: [
      '180 GSM 100% Cotton',
      'Regular fit',
      'Crew neck',
      'Screen printed graphic',
    ],
    soldOut: false,
    visual: `<img src="/products/regular/freedom-rider.png" style="width:100%;height:100%;object-fit:cover;">`,
    images: [
      '/products/regular/freedom-rider.png',
      '/products/regular/freedom-rider-model.png',
    ],
  },
  {
    id: 'dalee',
    name: 'डाल-LE Tee',
    price: 549,
    meta: 'OFF WHITE · REGULAR FIT · 180 GSM',
    category: 'regular',
    colors: [
      { name: 'Off White', hex: '#f2ede0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW ✦',
    badgeType: 'new',
    description: 'Chill pe chill. The डाल-LE tee — a bird on a branch, Kanpur ka vibe, 180 GSM soft cotton.',
    details: [
      '180 GSM 100% Cotton',
      'Regular fit',
      'Crew neck',
      'Screen printed graphic',
    ],
    soldOut: false,
    visual: `<img src="/products/regular/dalee.jpg" style="width:100%;height:100%;object-fit:cover;">`,
    images: [
      '/products/regular/dalee.jpg',
      '/products/regular/dalee-lookbook.png',
    ],
  },
  {
    id: 'cockroach-rising',
    name: 'Cockroach Rising Tee',
    price: 999,
    meta: 'BLACK · OVERSIZED · 240 GSM',
    category: 'oversized',
    colors: [
      { name: 'Ink Black', hex: '#0a0a0a' },
      { name: 'Off White', hex: '#f2ede0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'NEW ✦',
    badgeType: 'new',
    description: 'The OG drop. Built for the ones who survived everything and came back stronger. Heavy 240 GSM cotton, cut oversized, printed loud.',
    details: [
      '240 GSM 100% Cotton',
      'Oversized fit — size down for regular fit',
      'Drop shoulder construction',
      'Ribbed crew neck',
      'Screen printed graphic',
      'Pre-washed for softness',
    ],
    soldOut: false,
    visual: `<div style="font-family:'Bebas Neue',sans-serif;font-size:36px;letter-spacing:3px;color:#f5f0e8;">SHAAW-TEE</div>
      <svg width="140" height="70" viewBox="0 0 140 70">
        <line x1="15" y1="55" x2="15" y2="8" stroke="white" stroke-width="1.5" opacity="0.5"/>
        <line x1="15" y1="55" x2="130" y2="55" stroke="white" stroke-width="1.5" opacity="0.5"/>
        <polyline points="20,53 45,50 65,43 85,30 105,14 125,6" fill="none" stroke="#e8320a" stroke-width="2" stroke-linecap="round"/>
        <text x="118" y="10" font-size="9">🚀</text>
      </svg>
      <div style="font-family:'Space Mono',monospace;font-size:9px;color:rgba(245,240,232,0.4);letter-spacing:2px;">COCKROACH JANTA PARTY</div>`,
  },
  {
    id: 'main-character',
    name: 'Main Character Tee',
    price: 1099,
    meta: 'WASHED BLACK · OVERSIZED · 260 GSM',
    category: 'oversized',
    colors: [
      { name: 'Washed Black', hex: '#1a1614' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'SOLD OUT',
    badgeType: 'soldout',
    description: "You're the main character and everyone knows it. Premium 260 GSM washed black cotton. Feels like a second skin, hits like the first scene.",
    details: [
      '260 GSM 100% Cotton',
      'Washed finish',
      'Oversized fit',
      'Drop shoulder',
      'Ribbed crew neck',
      'Limited run — no restock planned',
    ],
    soldOut: true,
    visual: `<div style="font-family:'Bebas Neue',sans-serif;font-size:32px;letter-spacing:3px;color:#f5f0e8;text-align:center;">MAIN<br>CHARACTER</div>
      <svg width="100" height="60" viewBox="0 0 100 60">
        <circle cx="50" cy="30" r="25" fill="none" stroke="rgba(245,200,0,0.4)" stroke-width="1.5" stroke-dasharray="4 3"/>
        <circle cx="50" cy="30" r="15" fill="none" stroke="rgba(245,200,0,0.6)" stroke-width="1.5"/>
        <circle cx="50" cy="30" r="5" fill="#f5c800"/>
      </svg>`,
  },
  {
    id: 'no-cap-no-sleep',
    name: 'No Cap No Sleep',
    price: 949,
    meta: 'VINTAGE BLACK · BOXY FIT · 240 GSM',
    category: 'boxy',
    colors: [
      { name: 'Vintage Black', hex: '#111111' },
      { name: 'Charcoal', hex: '#2d2d2d' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    badge: 'HOT 🔥',
    badgeType: 'hot',
    description: 'No cap. No sleep. Just vibes and chaos. Boxy cut for maximum oversized energy. Perfect for the ones who never explain themselves.',
    details: [
      '240 GSM 100% Cotton',
      'Boxy fit',
      'Dropped shoulder',
      'Ribbed crew neck',
      'Screen printed text',
      'Vintage wash finish',
    ],
    soldOut: false,
    visual: `<div style="font-family:'Bebas Neue',sans-serif;font-size:28px;letter-spacing:3px;color:#f5f0e8;text-align:center;line-height:1.2;">NO<br>CAP<br>NO<br>SLEEP</div>`,
  },
];

export function visibleProducts() {
  return PRODUCTS.filter((p) => !p.nightOnly);
}

export function nightOnlyProducts() {
  return PRODUCTS.filter((p) => p.nightOnly);
}

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
