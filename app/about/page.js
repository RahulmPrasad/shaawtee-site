import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DropAlertForm from '@/components/DropAlertForm';

export const metadata = { title: 'About — SHAAW-TEE' };

export default function AboutPage() {
  return (
    <>
      <Nav ctaHref="/shop" ctaLabel="shop the drop ↗" />

      <section className="about-hero">
        <span className="about-eyebrow">→ est. kanpur, 2024</span>
        <h1 className="about-headline">
          BORN LOUD.<br />
          <span className="hl">KANPUR</span>-MADE.<br />
          WORN EVERYWHERE.
        </h1>
        <p className="about-sub">
          we don&apos;t make clothes. we print timestamps. every drop is a cultural moment — wear it before it peaks.
        </p>
      </section>

      <section className="about-story">
        <div>
          <div className="story-label">→ THE STORY</div>
          <h2 className="story-heading">
            We got tired of wearing the same boring fits as everyone else. So we made our own.
          </h2>
          <div className="story-body">
            <p>
              SHAAW-TEE started in a tiny room in Kanpur because the tees we wanted didn&apos;t exist. We wanted heavy
              cotton, loud graphics, and designs that actually said something — not the same recycled streetwear
              every brand was pushing.
            </p>
            <p>
              So we built it ourselves. Every graphic comes from the culture we live in — memes, movements, and moods
              that feel alive right now. We print them on 240+ GSM cotton before they peak, drop them in limited
              quantities, and never restock.
            </p>
            <p>This isn&apos;t a catalogue brand. It&apos;s a drop culture brand. Each release is a moment. Once it&apos;s gone, it&apos;s history.</p>
          </div>
        </div>
        <div className="story-stats">
          <div className="story-stat sketch-box">
            <div className="stat-n">2024</div>
            <div className="stat-l">Year We Started</div>
          </div>
          <div className="story-stat sketch-box">
            <div className="stat-n">240+</div>
            <div className="stat-l">GSM Standard</div>
          </div>
          <div className="story-stat sketch-box">
            <div className="stat-n">48H</div>
            <div className="stat-l">Avg Sell-Out Time</div>
          </div>
          <div className="story-stat sketch-box">
            <div className="stat-n">∞</div>
            <div className="stat-l">Ideas in the Queue</div>
          </div>
        </div>
      </section>

      <section className="about-manifesto" id="manifesto">
        <div className="manifesto-inner">
          <div className="manifesto-tag">→ THE DROP CULTURE</div>
          <h2 className="manifesto-heading">We run on drops.<br />Not catalogues.</h2>
          <div className="manifesto-text">
            <p>Every release is a cultural snapshot. We drop when the idea is ready — not when a retailer needs inventory.</p>
            <p>
              Once a drop sells out, it&apos;s gone forever. No restocks. No reprints. That&apos;s not a scarcity tactic —
              that&apos;s the whole point. Wear something that only a few hundred people in the world own.
            </p>
            <p>We&apos;re not building a brand for everyone. We&apos;re building it for the ones who get it.</p>
          </div>
          <Link href="/shop" className="btn-primary">SHOP THE CURRENT DROP →</Link>
        </div>
      </section>

      <section className="drop-section">
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
