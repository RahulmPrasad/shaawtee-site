'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import CartCountBadge from '@/components/CartCountBadge';

export default function Nav({ ctaHref, ctaLabel, activeCart = false }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeNav = () => setNavOpen(false);

  return (
    <nav
      className={navOpen ? 'nav-open' : ''}
      style={{ borderBottomColor: scrolled ? '#e8320a' : 'var(--ink)' }}
    >
      <Link href="/" className="nav-logo">
        <img src="/assets/images/logo.png" alt="SHAAW-TEE" className="nav-logo-img" />
      </Link>
      <ul className="nav-links">
        <li><Link href="/#drops" onClick={closeNav}>drops</Link></li>
        <li><Link href={isHome ? '#tees' : '/shop'} onClick={closeNav}>tees</Link></li>
        <li><Link href="/#vibe" onClick={closeNav}>vibe</Link></li>
        <li><Link href="/designer" onClick={closeNav}>designer &#10022;</Link></li>
        <li><Link href="/about" onClick={closeNav}>about</Link></li>
      </ul>
      <div className="nav-right">
        {ctaHref ? (
          <Link href={ctaHref} className="nav-cta" style={{ textDecoration: 'none', display: 'inline-block' }}>
            {ctaLabel}
          </Link>
        ) : (
          <button className="nav-cta">{ctaLabel}</button>
        )}
        <Link href="/cart" className={`cart-btn${activeCart ? ' active-cart' : ''}`}>
          <CartCountBadge />
          BAG
        </Link>
        <button
          className="nav-hamburger"
          aria-label="menu"
          onClick={() => setNavOpen((v) => !v)}
        >
          {navOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
