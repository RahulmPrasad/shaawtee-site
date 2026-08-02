'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const REQUIRED_FIELDS = ['fullName', 'phone', 'email', 'address1', 'city', 'state', 'pincode'];

export default function CheckoutClient() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const [fields, setFields] = useState({
    fullName: '', phone: '', email: '', address1: '', address2: '', city: '', state: '', pincode: '',
  });
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState('upi');
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !success) {
      router.replace('/cart');
    }
  }, [cart.length, success, router]);

  const handleChange = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: false }));
  };

  const validate = () => {
    const nextErrors = {};
    REQUIRED_FIELDS.forEach((key) => {
      if (!fields[key].trim()) nextErrors[key] = true;
    });
    if (fields.phone && !/^\d{10}$/.test(fields.phone.trim())) nextErrors.phone = true;
    if (fields.pincode && !/^\d{6}$/.test(fields.pincode.trim())) nextErrors.pincode = true;
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const shipping = subtotal >= 999 ? 0 : 99;
  const grand = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    // Razorpay integration point
    setTimeout(() => {
      clearCart();
      setPlacing(false);
      setSuccess(true);
    }, 1200);
  };

  if (cart.length === 0 && !success) return null;

  if (success) {
    return (
      <section className="checkout-section">
        <div className="checkout-header"><h1 className="checkout-title">CHECKOUT.</h1></div>
        <div className="order-success" id="order-success" style={{ display: 'block' }}>
          <div className="order-success-icon">🔥</div>
          <div className="order-success-title">ORDER PLACED!</div>
          <p className="order-success-sub">
            we got your order bestie. check your email for confirmation.<br />
            expect your tee in 5–7 business days.
          </p>
          <Link href="/shop" className="btn-primary">← KEEP SHOPPING</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <div className="checkout-header"><h1 className="checkout-title">CHECKOUT.</h1></div>
      <div className="checkout-layout" id="checkout-layout">
        <form id="checkout-form" noValidate onSubmit={handleSubmit}>
          <div className="form-section-label">DELIVERY DETAILS</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="full-name">Full Name *</label>
              <input className={`form-input${errors.fullName ? ' error' : ''}`} type="text" id="full-name" placeholder="your actual name" value={fields.fullName} onChange={handleChange('fullName')} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number *</label>
              <input className={`form-input${errors.phone ? ' error' : ''}`} type="tel" id="phone" placeholder="10 digit mobile" maxLength={10} value={fields.phone} onChange={handleChange('phone')} required />
            </div>
          </div>

          <div className="form-row full">
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email *</label>
              <input className={`form-input${errors.email ? ' error' : ''}`} type="email" id="email" placeholder="for order updates" value={fields.email} onChange={handleChange('email')} required />
            </div>
          </div>

          <div className="form-row full">
            <div className="form-group">
              <label className="form-label" htmlFor="address1">Address Line 1 *</label>
              <input className={`form-input${errors.address1 ? ' error' : ''}`} type="text" id="address1" placeholder="house no, street, locality" value={fields.address1} onChange={handleChange('address1')} required />
            </div>
          </div>

          <div className="form-row full">
            <div className="form-group">
              <label className="form-label" htmlFor="address2">Address Line 2</label>
              <input className="form-input" type="text" id="address2" placeholder="landmark (optional)" value={fields.address2} onChange={handleChange('address2')} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="city">City *</label>
              <input className={`form-input${errors.city ? ' error' : ''}`} type="text" id="city" placeholder="your city" value={fields.city} onChange={handleChange('city')} required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="state">State *</label>
              <input className={`form-input${errors.state ? ' error' : ''}`} type="text" id="state" placeholder="UP, MH, DL..." value={fields.state} onChange={handleChange('state')} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="pincode">Pincode *</label>
              <input className={`form-input${errors.pincode ? ' error' : ''}`} type="text" id="pincode" placeholder="6 digits" maxLength={6} value={fields.pincode} onChange={handleChange('pincode')} required />
            </div>
          </div>

          <div className="form-section-label">PAYMENT METHOD</div>
          <div className="payment-options">
            <button type="button" className={`payment-option${payment === 'upi' ? ' selected' : ''}`} onClick={() => setPayment('upi')}>
              📱 UPI / PhonePe
            </button>
            <button type="button" className={`payment-option${payment === 'card' ? ' selected' : ''}`} onClick={() => setPayment('card')}>
              💳 Card / NetBanking
            </button>
            <button type="button" className={`payment-option${payment === 'cod' ? ' selected' : ''}`} onClick={() => setPayment('cod')}>
              💵 Cash on Delivery
            </button>
          </div>
          <p className="payment-note">* Online payment via Razorpay coming soon. COD available now across India.</p>

          <button type="submit" className="place-order-btn" id="place-order-btn" disabled={placing}>
            {placing ? 'PLACING ORDER...' : 'PLACE ORDER →'}
          </button>
        </form>

        <div className="checkout-summary sketch-box">
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
              <div className="checkout-total-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE 🔥' : `₹${shipping}`}</span></div>
              <div className="checkout-total-row checkout-grand"><span>TOTAL</span><span>₹{grand}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
