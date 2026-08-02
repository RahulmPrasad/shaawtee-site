'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createCart } from '@/lib/shopify';

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, subtotal } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cart.length === 0) router.replace('/cart');
  }, [cart.length, router]);

  const handleCheckout = async () => {
    setError(null);
    if (cart.some((item) => !item.variantId)) {
      setError('Kuch items Shopify se match nahi ho paaye — cart se remove karke dobara add karo.');
      return;
    }
    setPlacing(true);
    try {
      const shopifyCart = await createCart(cart.map((item) => ({ variantId: item.variantId, qty: item.qty })));
      window.location.href = shopifyCart.checkoutUrl;
    } catch (err) {
      setError(err.message || 'Kuch gadbad ho gayi. Dobara try karo.');
      setPlacing(false);
    }
  };

  if (cart.length === 0) return null;

  return (
    <section className="checkout-section">
      <div className="checkout-header"><h1 className="checkout-title">CHECKOUT.</h1></div>
      <div className="checkout-layout" id="checkout-layout" style={{ gridTemplateColumns: '1fr', justifyItems: 'center' }}>
        <div className="checkout-summary sketch-box" style={{ maxWidth: '480px', width: '100%' }}>
          <div className="summary-title">YOUR ORDER</div>
          <div id="checkout-items">
            {cart.map((item) => (
              <div className="checkout-item" key={item.cartId}>
                <div>
                  <div className="checkout-item-name">{item.name}</div>
                  <div className="checkout-item-sub">
                    {item.size ? `SIZE: ${item.size}` : ''}{item.color ? ` · ${item.color.toUpperCase()}` : ''} · ×{item.qty}
                  </div>
                </div>
                <div className="checkout-item-price">₹{item.price * item.qty}</div>
              </div>
            ))}
            <div className="checkout-totals">
              <div className="checkout-total-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
            </div>
          </div>

          {error && <p className="payment-note" style={{ color: 'var(--red)' }}>{error}</p>}

          <button
            className="place-order-btn"
            onClick={handleCheckout}
            disabled={placing}
            style={{ marginTop: '20px' }}
          >
            {placing ? 'REDIRECTING TO CHECKOUT...' : 'PROCEED TO SECURE CHECKOUT →'}
          </button>
          <p className="payment-note">shipping &amp; tax calculated at checkout · payment handled securely by Shopify.</p>
        </div>
      </div>
    </section>
  );
}
