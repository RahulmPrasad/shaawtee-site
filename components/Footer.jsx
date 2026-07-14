import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/assets/images/logo-night.png" alt="SHAAW-TEE" className="footer-logo-img" />
          <p>oversized tees. limited drops. unlimited chaos. made in india, worn everywhere.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link href="/shop">All Tees</Link></li>
            <li><a href="#">Archive</a></li>
            <li><a href="#">Collabs</a></li>
            <li><a href="#">Restocks</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Info</h4>
          <ul>
            <li><Link href="/info#size-guide">Size Guide</Link></li>
            <li><Link href="/info#shipping">Shipping</Link></li>
            <li><Link href="/info#returns">Returns</Link></li>
            <li><Link href="/info#faq">FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Brand</h4>
          <ul>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/about#manifesto">The Vibe</Link></li>
            <li><Link href="/designer">Designer of the Month</Link></li>
            <li><a href="#">Lookbook</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 SHAAW-TEE — All drops reserved. No cap.</p>
        <div className="footer-socials">
          <a href="#">INSTA</a>
          <a href="#">TIKTOK</a>
          <a href="#">TWITTER</a>
        </div>
      </div>
    </footer>
  );
}
