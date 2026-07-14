'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProductById } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';

export default function ProductDetailClient() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const product = useMemo(() => getProductById(id), [id]);
  const { theme } = useTheme();
  const { addItem } = useCart();

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeHint, setSizeHint] = useState(false);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);
  const autoScrollRef = useRef(true);

  useEffect(() => {
    setSelectedColor(product?.colors?.[0]?.name ?? '');
    setSelectedSize(null);
    setQty(1);
    setActiveImage(0);
    autoScrollRef.current = true;
  }, [product]);

  useEffect(() => {
    if (product) document.title = `${product.name} — SHAAW-TEE`;
  }, [product]);

  useEffect(() => {
    if (!product?.images || product.images.length < 2) return undefined;
    const interval = setInterval(() => {
      if (!autoScrollRef.current) return;
      setActiveImage((i) => (i + 1) % product.images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [product]);

  if (!product) {
    return (
      <section className="product-section">
        <div className="cart-empty">
          <div className="cart-empty-icon">💀</div>
          <div className="cart-empty-msg">product not found</div>
          <Link href="/shop" className="btn-primary" style={{ marginTop: '24px' }}>← BACK TO SHOP</Link>
        </div>
      </section>
    );
  }

  if (product.nightOnly && theme !== 'night') {
    return (
      <section className="product-section">
        <div className="cart-empty">
          <div className="cart-empty-icon">🌙</div>
          <div className="cart-empty-msg">yeh tee sirf andhere mein dikhti hai...<br />upar bulb ki dori kheench 💡</div>
        </div>
      </section>
    );
  }

  const handleThumbClick = (index) => {
    autoScrollRef.current = false;
    setActiveImage(index);
  };

  const handleAddToCart = () => {
    if (product.soldOut) return;
    if (!selectedSize) {
      setSizeHint(true);
      setTimeout(() => setSizeHint(false), 2000);
      return;
    }
    addItem(product, { size: selectedSize, color: selectedColor, qty });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className="product-section">
      <div className="breadcrumb">
        <Link href="/">HOME</Link>
        <span>→</span>
        <Link href="/shop">SHOP</Link>
        <span>→</span>
        <span id="breadcrumb-product" style={{ color: 'var(--ink)' }}>{product.name}</span>
      </div>

      <div id="product-page">
        <div className="product-layout">
          <div className="product-img-section">
            <div
              className="product-img-area sketch-box"
              style={product.id === 'main-character' ? { background: '#1a1614' } : undefined}
            >
              {product.soldOut ? (
                <div className="sold-out">SOLD OUT</div>
              ) : (
                <div
                  className="new-drop"
                  style={product.badgeType === 'hot' ? { background: '#1a3cff', color: 'white' } : undefined}
                >
                  {product.badge}
                </div>
              )}
              {product.images ? (
                <div className="product-img-slider" id="main-product-img">
                  <div
                    className="product-img-strip"
                    id="img-strip"
                    style={{ transform: `translateX(-${activeImage * 100}%)` }}
                  >
                    {product.images.map((src, i) => (
                      <img key={i} src={src} alt="" />
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className="product-img-inner"
                    id="main-product-img"
                    dangerouslySetInnerHTML={{ __html: product.visual }}
                  />
                  <div className="product-img-note">photo dropping soon</div>
                </>
              )}
            </div>
            {product.images && (
              <div className="product-thumbnails">
                {product.images.map((src, i) => (
                  <button
                    key={i}
                    className={`product-thumb${i === activeImage ? ' active' : ''}`}
                    onClick={() => handleThumbClick(i)}
                  >
                    <img src={src} alt={`view ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-details">
            <div className="product-meta-tag">{product.meta}</div>
            <h1 className="product-name">{product.name}</h1>
            <div className={`product-price${product.soldOut ? ' product-price--soldout' : ''}`}>₹{product.price}</div>
            <p className="product-desc">{product.description}</p>

            <div className="product-option">
              <div className="option-label">
                COLOR: <span className="option-selected">{selectedColor}</span>
              </div>
              <div className="color-swatches">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    className={`color-swatch${c.name === selectedColor ? ' selected' : ''}`}
                    style={{ background: c.hex }}
                    title={c.name}
                    onClick={() => setSelectedColor(c.name)}
                  />
                ))}
              </div>
            </div>

            <div className="product-option">
              <div className="option-label">
                SIZE:{' '}
                <span className={`option-selected${!selectedSize ? ' option-hint' : ''}`}>
                  {sizeHint ? '← pick a size!' : selectedSize || '— pick one'}
                </span>
                <a href="#size-guide" className="size-guide-link">size guide ↓</a>
              </div>
              <div className={`size-grid${sizeHint ? ' size-shake' : ''}`} id="size-grid">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`size-btn${product.soldOut ? ' size-soldout' : ''}${s === selectedSize ? ' selected' : ''}`}
                    disabled={product.soldOut}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-option">
              <div className="option-label">QTY:</div>
              <div className="qty-controls">
                <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span className="qty-num">{qty}</span>
                <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>

            <button
              className={`atc-btn product-atc${product.soldOut ? ' atc-soldout' : ''}${added ? ' atc-added' : ''}`}
              onClick={handleAddToCart}
              disabled={product.soldOut}
            >
              {product.soldOut ? 'SOLD OUT 💀' : added ? 'ADDED TO BAG ✓' : 'ADD TO BAG +'}
            </button>

            <div className="product-detail-list">
              <div className="detail-list-title">THE DETAILS</div>
              <ul>{product.details.map((d, i) => <li key={i}>{d}</li>)}</ul>
            </div>
          </div>
        </div>

        <div className="size-guide" id="size-guide">
          <h2 className="size-guide-title">SIZE GUIDE</h2>
          <p className="size-guide-note">
            All measurements in inches. This is an oversized fit — size down for a more regular fit.
          </p>
          <div className="size-table-wrap">
            <table className="size-table">
              <thead><tr><th>SIZE</th><th>CHEST</th><th>LENGTH</th><th>SHOULDER</th></tr></thead>
              <tbody>
                <tr><td>XS</td><td>38&quot;</td><td>27&quot;</td><td>17&quot;</td></tr>
                <tr><td>S</td><td>40&quot;</td><td>28&quot;</td><td>18&quot;</td></tr>
                <tr><td>M</td><td>42&quot;</td><td>29&quot;</td><td>19&quot;</td></tr>
                <tr><td>L</td><td>44&quot;</td><td>30&quot;</td><td>20&quot;</td></tr>
                <tr><td>XL</td><td>46&quot;</td><td>31&quot;</td><td>21&quot;</td></tr>
                <tr><td>XXL</td><td>48&quot;</td><td>32&quot;</td><td>22&quot;</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
