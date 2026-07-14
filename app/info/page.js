import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import InfoNav from '@/components/InfoNav';

export const metadata = { title: 'Info — SHAAW-TEE' };

export default function InfoPage() {
  return (
    <>
      <Nav ctaHref="/shop" ctaLabel="shop the drop ↗" />

      <section className="info-section">
        <div className="info-header">
          <h1 className="info-title">THE LOWDOWN.</h1>
        </div>
        <div className="info-layout">
          <InfoNav />

          <div className="info-content">
            <div className="info-block" id="size-guide">
              <h2 className="info-block-title">SIZE GUIDE</h2>
              <div className="info-block-body">
                <p>All our tees are <strong>oversized fit</strong>. If you prefer a more fitted look, size down. Measurements below are in inches.</p>
              </div>
              <div className="size-table-wrap" style={{ marginTop: '24px' }}>
                <table className="size-table">
                  <thead>
                    <tr><th>SIZE</th><th>CHEST</th><th>LENGTH</th><th>SHOULDER</th></tr>
                  </thead>
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
              <div className="info-block-body" style={{ marginTop: '20px' }}>
                <p><strong>How to measure chest:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                <p><strong>Fit tip:</strong> Most of our drops are boxy/oversized by design. Wearing an M when you&apos;re usually an S is the move.</p>
              </div>
            </div>

            <div className="info-block" id="shipping">
              <h2 className="info-block-title">SHIPPING</h2>
              <div className="info-block-body">
                <p>We ship all across India. Orders are processed within <strong>24–48 hours</strong> of placement.</p>
              </div>
              <div className="shipping-cards">
                <div className="shipping-card sketch-box">
                  <div className="shipping-card-title">STANDARD</div>
                  <div className="shipping-card-detail">Orders below ₹999<br />5–7 business days</div>
                  <div className="shipping-card-price">₹99</div>
                </div>
                <div className="shipping-card sketch-box">
                  <div className="shipping-card-title">FREE SHIPPING</div>
                  <div className="shipping-card-detail">Orders above ₹999<br />5–7 business days</div>
                  <div className="shipping-card-price free">FREE 🔥</div>
                </div>
              </div>
              <div className="info-block-body" style={{ marginTop: '24px' }}>
                <p><strong>Tracking:</strong> You&apos;ll receive a tracking link via email once your order is dispatched.</p>
                <p><strong>International shipping:</strong> Not yet. We&apos;re working on it. Get on the email list to know when we go global.</p>
                <p><strong>Delays:</strong> Delivery timelines may extend during sale events, public holidays, or natural calamities. We&apos;ll keep you updated.</p>
              </div>
            </div>

            <div className="info-block" id="returns">
              <h2 className="info-block-title">RETURNS</h2>
              <div className="info-block-body">
                <p>We accept returns within <strong>7 days of delivery</strong> under the following conditions:</p>
                <p><strong>We accept returns for:</strong></p>
                <p>
                  — Manufacturing defects (stitching issues, print defects)<br />
                  — Wrong item received<br />
                  — Wrong size sent (different from what was ordered)
                </p>
                <p><strong>We do not accept returns for:</strong></p>
                <p>
                  — Change of mind<br />
                  — Sizing issues when the correct size was shipped (check our size guide before ordering)<br />
                  — Items that are worn, washed, or damaged by the customer
                </p>
                <p><strong>Exchange policy:</strong> Size exchanges are accepted for the same design in a different size, subject to availability. Since drops are limited, we cannot guarantee the requested size will be in stock.</p>
                <p><strong>Refunds:</strong> We offer store credit only. No cash refunds.</p>
                <p>
                  <strong>To raise a return:</strong> Email us at{' '}
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '15px', color: 'var(--blue)' }}>returns@shaawtee.com</span>{' '}
                  within 7 days of delivery with your order number and photos of the issue.
                </p>
              </div>
            </div>

            <div className="info-block" id="faq">
              <h2 className="info-block-title">FAQ</h2>

              <div className="faq-item">
                <div className="faq-q">Do you restock sold-out items?</div>
                <div className="faq-a">Never. Each drop is final. Once it&apos;s sold out, it&apos;s gone forever. That&apos;s the whole point. Get on the email list to know about new drops before they go live.</div>
              </div>

              <div className="faq-item">
                <div className="faq-q">What does the fit feel like?</div>
                <div className="faq-a">All our tees are oversized. If you prefer a regular/fitted look, size down by one. The fabric is 240–260 GSM so it holds its shape and feels substantial — not the thin stuff.</div>
              </div>

              <div className="faq-item">
                <div className="faq-q">How do I take care of my tee?</div>
                <div className="faq-a">Cold wash only. Turn inside out before washing. Don&apos;t tumble dry — hang dry instead. Iron on low heat and never directly on the print. Treat it right and it&apos;ll last forever.</div>
              </div>

              <div className="faq-item">
                <div className="faq-q">Can I cancel my order?</div>
                <div className="faq-a">Cancellations are accepted within 2 hours of placing the order. After that, your order is already in processing. Email us ASAP at orders@shaawtee.com.</div>
              </div>

              <div className="faq-item">
                <div className="faq-q">How long does delivery take?</div>
                <div className="faq-a">5–7 business days across India. We dispatch within 24–48 hours of order confirmation. You&apos;ll get a tracking link once it&apos;s shipped.</div>
              </div>

              <div className="faq-item">
                <div className="faq-q">Do you do custom or bulk orders?</div>
                <div className="faq-a">Not right now, but we&apos;re open to collabs. Reach out at collabs@shaawtee.com and we&apos;ll talk.</div>
              </div>

              <div className="faq-item">
                <div className="faq-q">When is the next drop?</div>
                <div className="faq-a">We don&apos;t announce dates until right before. Sign up for the email list — that&apos;s the only way to know first. We&apos;re not going to spoil the drop culture by scheduling it like a calendar event.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
