import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Reveal from '@/components/Reveal';
import DropAlertForm from '@/components/DropAlertForm';
import { getProductById } from '@/lib/products';

const currentDrop = ['cockroach-rising', 'main-character', 'no-cap-no-sleep'].map(getProductById);

export default function HomePage() {
  return (
    <>
      <Nav ctaLabel="shop the drop ↗" />

      <section className="hero">
        <div className="hero-left">
          <span className="hero-tag">NEW DROP 001 — limited units</span>
          <h1 className="hero-headline">
            WEAR<br />THE <span className="scribble-under">CHAOS</span><br />
            <span className="strike">FIT</span> THE<br />MOOD.
          </h1>
          <p className="hero-sub">
            100% cotton oversized tees for the ones who don&apos;t explain themselves. printed in kanpur, shipped to chaos.
          </p>
          <div className="hero-btns">
            <Link href="#tees" className="btn-primary">Shop Now</Link>
            <Link href="#drops" className="btn-secondary">See All Drops</Link>
          </div>
        </div>
        <div className="hero-right">
          <div className="tee-mockup sketch-box">
            <div className="price-tag"><span>₹999</span><span>only</span></div>
            <div className="drop-badge">🔥 hot drop</div>
            <div className="tee-inner">
              <div className="tee-brand">SHAAW-TEE</div>
              <svg width="200" height="120" viewBox="0 0 200 120">
                <line x1="28" y1="8" x2="28" y2="96" stroke="white" strokeWidth="1.5" opacity="0.4" />
                <line x1="28" y1="96" x2="192" y2="96" stroke="white" strokeWidth="1.5" opacity="0.4" />
                <line x1="24" y1="30" x2="28" y2="30" stroke="white" strokeWidth="1" opacity="0.3" />
                <line x1="24" y1="55" x2="28" y2="55" stroke="white" strokeWidth="1" opacity="0.3" />
                <line x1="24" y1="80" x2="28" y2="80" stroke="white" strokeWidth="1" opacity="0.3" />
                <line x1="70" y1="96" x2="70" y2="100" stroke="white" strokeWidth="1" opacity="0.3" />
                <line x1="120" y1="96" x2="120" y2="100" stroke="white" strokeWidth="1" opacity="0.3" />
                <line x1="170" y1="96" x2="170" y2="100" stroke="white" strokeWidth="1" opacity="0.3" />
                <polyline points="32,92 55,90 78,88 98,85 112,78 122,66 132,48 142,28 152,12 162,5 175,2" fill="none" stroke="#e8320a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="32,92 55,90 78,88 98,85 112,78 122,66 132,48 142,28 152,12 162,5 175,2" fill="none" stroke="#e8320a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.15" />
                <text x="170" y="8" fontSize="14" textAnchor="middle">🚀</text>
                <text x="6" y="52" fontSize="7" fill="rgba(245,240,232,0.35)" fontFamily="monospace" transform="rotate(-90,6,52)" textAnchor="middle" letterSpacing="1">FOLLOWERS</text>
                <text x="110" y="112" fontSize="7" fill="rgba(245,240,232,0.35)" fontFamily="monospace" textAnchor="middle" letterSpacing="1">TIME</text>
              </svg>
              <div className="tee-label">when you accidentally go viral 💀</div>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} style={{ display: 'contents' }}>
              <span className="marquee-item"><span className="dot" />OVERSIZED FIT</span>
              <span className="marquee-item"><span className="dot red" />240 GSM COTTON</span>
              <span className="marquee-item"><span className="dot blue" />DROP CULTURE</span>
              <span className="marquee-item"><span className="dot" />KANPUR × WORLD</span>
              <span className="marquee-item"><span className="dot red" />WEAR THE MEME</span>
              <span className="marquee-item"><span className="dot blue" />LIMITED DROPS</span>
              <span className="marquee-item"><span className="dot" />GEN Z CERTIFIED</span>
              <span className="marquee-item"><span className="dot red" />NO BORING FITS</span>
            </span>
          ))}
        </div>
      </div>

      <section className="section" id="tees">
        <div className="section-header">
          <span className="section-num">001</span>
          <h2 className="section-title">Current Drop</h2>
          <div className="section-line" />
        </div>
        <div className="products-grid">
          {currentDrop.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.15}>
              <ProductCard product={product} ctaLabel="ADD TO BAG +" />
            </Reveal>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/shop" className="btn-secondary">View all tees →</Link>
        </div>
      </section>

      <section className="vibe-section" id="vibe">
        <div className="vibe-grid">
          <Reveal className="vibe-left">
            <div className="big-quote">tees that hit different.<br /><span className="highlight">no basic.</span><br />no cap.</div>
            <p className="vibe-sub-text">every drop is a cultural moment. we print memes, movements, and moods on heavy cotton — before they peak.</p>
            <Link href="#" className="btn-primary" style={{ marginTop: '32px' }}>get on the list</Link>
          </Reveal>
          <Reveal className="vibe-right">
            <div className="vibe-stat sketch-box">
              <div className="stat-num">240+</div>
              <div className="stat-label">GSM Premium Cotton</div>
              <div className="stat-note">HEAVYWEIGHT. OVERSIZED. CERTIFIED.</div>
            </div>
            <div className="vibe-stat sketch-box">
              <div className="stat-num">48H</div>
              <div className="stat-label">Avg Sell-out Time</div>
              <div className="stat-note">PER DROP. DON&apos;T SLEEP.</div>
            </div>
            <div className="vibe-stat sketch-box">
              <div className="stat-num">∞</div>
              <div className="stat-label">Meme Potential</div>
              <div className="stat-note">CULTURE FIRST. ALWAYS.</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="dm-teaser" id="designer">
        <Reveal>
          <Link href="/designer" className="dm-teaser-link">
            <span className="dm-teaser-tag">NEW SEGMENT ✦</span>
            <div className="dm-teaser-label">→ MONTHLY CHALLENGE · OPEN NOW</div>
            <h2 className="dm-teaser-heading">DESIGNER OF THE <span className="dm-hl">MONTH</span></h2>
            <p className="dm-teaser-sub">send your design → we drop it as an official tee → you get a limited edition + a hall of fame spot as our proud designer.</p>
            <span className="dm-teaser-cta">JOIN THE CHALLENGE →</span>
          </Link>
        </Reveal>
      </section>

      <section className="drop-section" id="drops">
        <div className="drop-inner">
          <div className="drop-text">
            <h2>Next Drop.<br />Don&apos;t Blink.</h2>
            <p>get the alert before it&apos;s gone forever (we mean it)</p>
          </div>
          <DropAlertForm />
        </div>
      </section>

      <Footer />
    </>
  );
}
