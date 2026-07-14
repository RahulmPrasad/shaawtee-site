'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartClient() {
  const { cart, itemCount, subtotal, changeQty, removeItem } = useCart();
  const shipping = subtotal >= 999 ? 0 : 99;
  const grand = subtotal + shipping;

  return (
    <section className="cart-section">
      <div className="cart-page-header">
        <h1 className="cart-title">YOUR BAG.</h1>
        <span className="cart-subtitle">(<span id="cart-item-count">{itemCount}</span> items)</span>
      </div>
      <div className="cart-layout" id="cart-layout">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">💀</div>
            <div className="cart-empty-msg">bag is empty bestie</div>
            <p className="cart-empty-sub">nothing in here yet. go cop something.</p>
            <Link href="/" className="btn-primary" style={{ marginTop: '24px' }}>← KEEP SHOPPING</Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.cartId}>
                  <div className="cart-item-img sketch-box">
                    <span className="cart-item-initial">{item.name.charAt(0)}</span>
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-meta">
                      {item.size ? `SIZE: ${item.size} · ` : ''}
                      {item.color ? `${item.color.toUpperCase()} · ` : ''}
                      {item.meta || ''}
                    </div>
                    <div className="cart-item-price">₹{item.price}</div>
                  </div>
                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => changeQty(item.cartId, -1)}>−</button>
                      <span className="qty-num">{item.qty}</span>
                      <button className="qty-btn" onClick={() => changeQty(item.cartId, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.cartId)}>REMOVE ✕</button>
                  </div>
                  <div className="cart-item-total">₹{item.price * item.qty}</div>
                </div>
              ))}
            </div>
            <div className="cart-summary sketch-box">
              <div className="summary-title">ORDER SUMMARY</div>
              <div className="summary-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'summary-free' : ''}>{shipping === 0 ? 'FREE 🔥' : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && <div className="summary-note">add ₹{999 - subtotal} more for free shipping</div>}
              <div className="summary-divider" />
              <div className="summary-row summary-total"><span>TOTAL</span><span>₹{grand}</span></div>
              <Link href="/checkout" className="checkout-btn">CHECKOUT →</Link>
              <Link href="/" className="continue-shopping">← continue shopping</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
