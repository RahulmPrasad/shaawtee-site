// ---- SHOPIFY STOREFRONT API CLIENT ----
// Called directly from the browser — the Storefront token is a public,
// client-safe token by design (unlike the Admin API token, which must
// never be exposed). Fine to ship in a static export.

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2025-01';

const COLOR_HEX = {
  black: '#0a0a0a', 'ink black': '#0a0a0a', 'pitch black': '#0a0a0a', 'jet black': '#0a0a0a',
  'vintage black': '#111111', 'washed black': '#1a1614',
  white: '#f5f0e8', 'off white': '#f2ede0', cream: '#ede8d8', beige: '#e8e0d0', sand: '#c8b394',
  grey: '#8a8a8a', gray: '#8a8a8a', charcoal: '#2d2d2d', 'ash grey': '#b5b5b5', 'ash gray': '#b5b5b5',
  navy: '#2b3247', 'navy blue': '#2b3247', blue: '#1a3cff', red: '#e8320a', yellow: '#f5c800',
  green: '#2f6b3a', brown: '#5a4632', purple: '#a58fc0', 'muted purple': '#a58fc0',
  pink: '#e8a2b0', maroon: '#5c1a1a', olive: '#5c5a35',
};

function resolveColorHex(name) {
  const key = (name || '').trim().toLowerCase();
  return COLOR_HEX[key] || '#6b6b6b';
}

async function shopifyFetch(query, variables) {
  if (!DOMAIN || !TOKEN) {
    throw new Error(
      'Shopify is not configured — set NEXT_PUBLIC_SHOPIFY_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local'
    );
  }
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors.map((e) => e.message).join('; '));
  }
  return json.data;
}

const PRODUCTS_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first, sortKey: CREATED_AT, reverse: true) {
      nodes {
        id
        handle
        title
        description
        productType
        tags
        images(first: 10) {
          nodes { url altText }
        }
        variants(first: 100) {
          nodes {
            id
            availableForSale
            price { amount }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `
  mutation CreateCart($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

const SIZE_ORDER = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

function transformProduct(node) {
  const variants = node.variants.nodes;

  const sizesSet = new Set();
  const colorsMap = new Map();
  variants.forEach((v) => {
    v.selectedOptions.forEach((opt) => {
      const optName = opt.name.toLowerCase();
      if (optName === 'size') sizesSet.add(opt.value);
      if (optName === 'color') colorsMap.set(opt.value, { name: opt.value, hex: resolveColorHex(opt.value) });
    });
  });
  const sizes = SIZE_ORDER.filter((s) => sizesSet.has(s));
  if (sizes.length === 0 && sizesSet.size) sizes.push(...sizesSet);
  const colors = Array.from(colorsMap.values());

  const tags = (node.tags || []).map((t) => t.toLowerCase());
  const nightOnly = tags.includes('midnight');
  const badgeType = tags.includes('hot') ? 'hot' : tags.includes('new') ? 'new' : nightOnly ? 'night' : null;
  const badge =
    badgeType === 'hot' ? 'HOT 🔥' : badgeType === 'new' ? 'NEW ✦' : badgeType === 'night' ? 'MIDNIGHT ONLY 🌙' : null;

  const lines = (node.description || '').split('\n').map((l) => l.trim()).filter(Boolean);
  const description = lines[0] || '';
  const details = lines.slice(1);

  const availablePrices = variants.filter((v) => v.availableForSale).map((v) => Number(v.price.amount));
  const price = availablePrices.length ? Math.min(...availablePrices) : Number(variants[0]?.price.amount || 0);

  const category = (node.productType || 'regular').toLowerCase();

  return {
    id: node.handle,
    name: node.title,
    price,
    meta: colors.length ? `${category.toUpperCase()} · ${colors[0].name.toUpperCase()}` : category.toUpperCase(),
    category,
    colors: colors.length ? colors : [{ name: 'Default', hex: '#6b6b6b' }],
    sizes: sizes.length ? sizes : ['ONE SIZE'],
    badge,
    badgeType,
    description,
    details,
    soldOut: !variants.some((v) => v.availableForSale),
    nightOnly,
    images: node.images.nodes.map((img) => img.url),
    variants: variants.map((v) => ({ id: v.id, availableForSale: v.availableForSale, selectedOptions: v.selectedOptions })),
  };
}

export async function fetchAllProducts() {
  const data = await shopifyFetch(PRODUCTS_QUERY, { first: 50 });
  return data.products.nodes.map(transformProduct);
}

export function findVariant(product, { size, color }) {
  if (!product?.variants) return null;
  return product.variants.find((v) =>
    v.selectedOptions.every((opt) => {
      const optName = opt.name.toLowerCase();
      if (optName === 'size') return opt.value === size;
      if (optName === 'color') return opt.value === color;
      return true;
    })
  );
}

export async function createCart(lines) {
  const data = await shopifyFetch(CREATE_CART_MUTATION, {
    lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.qty })),
  });
  const { cart, userErrors } = data.cartCreate;
  if (userErrors?.length) {
    throw new Error(userErrors.map((e) => e.message).join('; '));
  }
  return cart;
}
