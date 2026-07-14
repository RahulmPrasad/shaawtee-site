'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DesignerFormClient() {
  const [fields, setFields] = useState({ name: '', email: '', insta: '', link: '', desc: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (key) => (e) => {
    setFields((f) => ({ ...f, [key]: e.target.value }));
    setErrors((er) => ({ ...er, [key]: false }));
  };

  const handleSubmit = () => {
    const nextErrors = {};
    if (!fields.name.trim()) nextErrors.name = true;
    if (!fields.email.includes('@')) nextErrors.email = true;
    if (!fields.link.trim()) nextErrors.link = true;
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="dm-success" id="dm-success" style={{ display: 'block' }}>
        <div className="order-success-icon">🎨</div>
        <div className="order-success-title">DESIGN RECEIVED!</div>
        <div className="order-success-sub">
          we&apos;re looking at it. if it&apos;s the one, you&apos;ll hear from us before the next drop. fingers crossed, future proud designer.
        </div>
        <Link href="/shop" className="btn-secondary">shop the current drop →</Link>
      </div>
    );
  }

  return (
    <div className="dm-form sketch-box" id="dm-form">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Your Name *</label>
          <input
            type="text"
            className={`form-input${errors.name ? ' error' : ''}`}
            placeholder="what do we call you?"
            value={fields.name}
            onChange={handleChange('name')}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            className={`form-input${errors.email ? ' error' : ''}`}
            placeholder="you@example.com"
            value={fields.email}
            onChange={handleChange('email')}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Instagram Handle</label>
          <input
            type="text"
            className="form-input"
            placeholder="@yourhandle"
            value={fields.insta}
            onChange={handleChange('insta')}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Design Link (Drive / Behance / Dribbble) *</label>
          <input
            type="url"
            className={`form-input${errors.link ? ' error' : ''}`}
            placeholder="paste ur design link"
            value={fields.link}
            onChange={handleChange('link')}
          />
        </div>
      </div>
      <div className="form-row full">
        <div className="form-group">
          <label className="form-label">Tell us about the design</label>
          <textarea
            className="form-input dm-textarea"
            rows={4}
            placeholder="what's the story? why should it drop?"
            value={fields.desc}
            onChange={handleChange('desc')}
          />
        </div>
      </div>
      <button className="place-order-btn" id="dm-submit-btn" onClick={handleSubmit}>SUBMIT MY DESIGN →</button>
      <p className="payment-note">by submitting you agree that if selected, your design drops as a SHAAW-TEE product with full credit to you.</p>
    </div>
  );
}
