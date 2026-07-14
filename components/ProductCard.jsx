'use client';

import Link from 'next/link';
import { useRef } from 'react';

export default function ProductCard({ product, ctaLabel = 'SELECT SIZE →' }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `rotate(${x * 0.3}deg) translateY(-8px) perspective(400px) rotateX(${y}deg) rotateY(${x}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  const badgeStyle =
    product.badgeType === 'hot'
      ? { background: '#1a3cff', color: 'white' }
      : product.badgeType === 'night'
      ? { background: '#0a0a0a', color: '#f5c800', borderColor: '#f5c800', boxShadow: '0 0 10px rgba(245,200,0,0.4)' }
      : undefined;

  return (
    <div
      className="product-card"
      data-id={product.id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product?id=${product.id}`} style={{ textDecoration: 'none', display: 'block', color: 'inherit' }}>
        <div className="card-img sketch-box" style={product.id === 'main-character' ? { background: '#1a1614' } : undefined}>
          {product.soldOut ? (
            <div className="sold-out">SOLD OUT</div>
          ) : (
            <div className="new-drop" style={badgeStyle}>{product.badge}</div>
          )}
          <div className="card-img-inner" dangerouslySetInnerHTML={{ __html: product.visual }} />
        </div>
      </Link>
      <div className="card-info">
        <div>
          <div className="card-name">
            <Link href={`/product?id=${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
              {product.name}
            </Link>
          </div>
          <div className="card-meta">{product.meta}</div>
        </div>
        <div className="card-price" style={product.soldOut ? { color: '#888', textDecoration: 'line-through' } : undefined}>
          ₹{product.price}
        </div>
      </div>
      {product.soldOut ? (
        <button className="atc-btn atc-soldout" disabled>SOLD OUT 💀</button>
      ) : (
        <Link
          href={`/product?id=${product.id}`}
          className="atc-btn"
          style={{ textAlign: 'center', textDecoration: 'none', display: 'block' }}
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
