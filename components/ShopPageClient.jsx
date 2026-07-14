'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { visibleProducts } from '@/lib/products';

const FILTER_GROUPS = [
  {
    section: 'CATEGORIES',
    items: [
      { key: 'all', label: 'All Tees' },
      { key: 'regular', label: 'Regular Fit' },
      { key: 'oversized', label: 'Oversized' },
      { key: 'boxy', label: 'Boxy Fit' },
    ],
  },
  {
    section: 'STATUS',
    items: [
      { key: 'available', label: 'Available' },
      { key: 'soldout', label: 'Sold Out' },
    ],
  },
  {
    section: 'PRICE',
    items: [
      { key: 'under950', label: 'Under ₹950' },
      { key: 'under1000', label: 'Under ₹1000' },
    ],
  },
];

function matchesFilter(p, filter) {
  switch (filter) {
    case 'oversized': return p.category === 'oversized';
    case 'boxy': return p.category === 'boxy';
    case 'regular': return p.category === 'regular';
    case 'available': return !p.soldOut;
    case 'soldout': return p.soldOut;
    case 'under950': return p.price < 950;
    case 'under1000': return p.price < 1000;
    default: return true;
  }
}

export default function ShopPageClient() {
  const [filter, setFilter] = useState('all');
  const pool = useMemo(() => visibleProducts(), []);

  const counts = useMemo(
    () => ({
      all: pool.length,
      regular: pool.filter((p) => p.category === 'regular').length,
      oversized: pool.filter((p) => p.category === 'oversized').length,
      boxy: pool.filter((p) => p.category === 'boxy').length,
      available: pool.filter((p) => !p.soldOut).length,
      soldout: pool.filter((p) => p.soldOut).length,
      under950: pool.filter((p) => p.price < 950).length,
      under1000: pool.filter((p) => p.price < 1000).length,
    }),
    [pool]
  );

  const filtered = useMemo(() => pool.filter((p) => matchesFilter(p, filter)), [pool, filter]);

  return (
    <section className="shop-section">
      <div className="shop-header">
        <h1 className="shop-title">ALL TEES.</h1>
        <span className="shop-subtitle"><span id="shop-count">{filtered.length}</span> drops</span>
      </div>

      <div className="shop-layout">
        <aside className="shop-sidebar">
          {FILTER_GROUPS.map((group) => (
            <div className="sidebar-section" key={group.section}>
              <div className="sidebar-title">{group.section}</div>
              <ul className="filter-list">
                {group.items.map((item) => (
                  <li
                    key={item.key}
                    className={`filter-item${filter === item.key ? ' active' : ''}`}
                    data-filter={item.key}
                    onClick={() => setFilter(item.key)}
                  >
                    {item.label} <span className="filter-count">{counts[item.key]}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>

        <div className="shop-grid" id="shop-grid">
          {filtered.length === 0 ? (
            <div className="shop-empty">
              <div className="cart-empty-msg">nothing here 💀</div>
              <button onClick={() => setFilter('all')} className="btn-secondary" style={{ marginTop: '16px' }}>
                show all
              </button>
            </div>
          ) : (
            filtered.map((p) => <ProductCard key={p.id} product={p} />)
          )}
        </div>
      </div>
    </section>
  );
}
