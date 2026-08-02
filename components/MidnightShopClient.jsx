'use client';

import { useState } from 'react';
import { nightOnlyProducts } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function MidnightShopClient() {
  const products = nightOnlyProducts();
  const { addItem } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [feedback, setFeedback] = useState({});

  const selectSize = (productId, size) => {
    setSelectedSizes((s) => ({ ...s, [productId]: size }));
  };

  const addToBag = (product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      setFeedback((f) => ({ ...f, [product.id]: 'PEHLE SIZE CHUN ☝' }));
      setTimeout(() => setFeedback((f) => ({ ...f, [product.id]: null })), 1400);
      return;
    }
    addItem(product, { size, color: product.colors[0].name, qty: 1 });
    setFeedback((f) => ({ ...f, [product.id]: 'ADDED ✓ RAAT KA MAAL' }));
    setTimeout(() => setFeedback((f) => ({ ...f, [product.id]: null })), 1600);
  };

  return (
    <section className="mn-product" id="mn-product">
      {products.map((p) => (
        <div className="mn-card" key={p.id}>
          <div className="mn-img">
            <div className="mn-img-placeholder">
              <span className="mn-moon">🌙</span>
              <span className="mn-ph-text">TEE PHOTO<br />AANE WALI HAI...</span>
              <span className="mn-soon">— DROP SOON —</span>
            </div>
          </div>
          <div className="mn-info">
            <div className="mn-badge">{p.badge}</div>
            <h2 className="mn-name">{p.name}</h2>
            <div className="mn-meta">{p.meta}</div>
            <div className="mn-price">₹{p.price}</div>
            <p className="mn-desc">{p.description}</p>
            <ul className="mn-details">{p.details.map((d, i) => <li key={i}>{d}</li>)}</ul>
            <div className="mn-size-label">SIZE CHUN:</div>
            <div className="mn-sizes">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  className={`mn-size${selectedSizes[p.id] === s ? ' sel' : ''}`}
                  onClick={() => selectSize(p.id, s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <button className="mn-atc" onClick={() => addToBag(p)}>
              {feedback[p.id] || 'ADD TO BAG +'}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
