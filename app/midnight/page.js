import Link from 'next/link';
import MidnightShopClient from '@/components/MidnightShopClient';
import CartCountBadge from '@/components/CartCountBadge';

export const metadata = { title: '🌙 Midnight Shop — SHAAW-TEE' };

export default function MidnightPage() {
  return (
    <>
      <header className="mn-top">
        <Link href="/" className="mn-logo-link">
          <img src="/assets/images/logo-night.png" alt="SHAAW-TEE" className="mn-logo" />
        </Link>
        <div className="mn-top-right">
          <Link href="/" className="mn-back">← wapas roshni mein</Link>
          <Link href="/cart" className="mn-bag">
            <CartCountBadge />
            BAG
          </Link>
        </div>
      </header>

      <main className="mn-main">
        <div className="mn-neon-wrap">
          <div className="mn-open-tag"><span className="mn-open-dot" /> OPEN ALL NIGHT</div>
          <h1 className="mn-neon">MIDNIGHT SHOP</h1>
          <p className="mn-tagline">sirf raat walon ke liye. subah walon ko mat batana 🤫</p>
        </div>

        <MidnightShopClient />

        <div className="mn-rules">
          <div className="mn-rules-title">— DUKAAN KE RULES —</div>
          <ul>
            <li>01 · jo yahan dikha, woh sirf yahan milega</li>
            <li>02 · subah iska zikr nahi hoga</li>
            <li>03 · screenshot mat le (waise le hi lega)</li>
            <li>04 · lights on ki toh dukaan band 💡</li>
          </ul>
        </div>
      </main>

      <footer className="mn-foot">
        <p>© SHAAW-TEE — raat ki shift · jo yahan tak aaya, woh apna hai 🌙</p>
      </footer>
    </>
  );
}
