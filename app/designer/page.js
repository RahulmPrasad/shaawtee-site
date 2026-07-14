import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import DesignerFormClient from '@/components/DesignerFormClient';

export const metadata = { title: 'Designer of the Month — SHAAW-TEE' };

export default function DesignerPage() {
  return (
    <>
      <Nav ctaHref="/shop" ctaLabel="shop the drop ↗" />

      <section className="about-hero">
        <span className="about-eyebrow">→ designer of the month · community drop</span>
        <h1 className="about-headline">
          YOUR DESIGN.<br />
          OUR <span className="hl">NEXT</span> DROP.
        </h1>
        <p className="about-sub">
          every month we run a design challenge. you send your art. we pick one. it becomes an official SHAAW-TEE
          product — with your name on it.
        </p>
      </section>

      <section className="dm-steps-section">
        <div className="story-label">→ HOW IT WORKS</div>
        <div className="dm-steps">
          <div className="dm-step sketch-box">
            <div className="dm-step-n">01</div>
            <div className="dm-step-t">SUBMIT</div>
            <p>send us your tee design before the month ends. any style — sketch, vector, meme, madness.</p>
          </div>
          <div className="dm-step sketch-box">
            <div className="dm-step-n">02</div>
            <div className="dm-step-t">WE PICK ONE</div>
            <p>one design gets selected every month. loudest idea wins, not the cleanest render.</p>
          </div>
          <div className="dm-step sketch-box">
            <div className="dm-step-n">03</div>
            <div className="dm-step-t">IT DROPS</div>
            <p>your design becomes an official SHAAW-TEE product in the next drop. for real.</p>
          </div>
          <div className="dm-step sketch-box">
            <div className="dm-step-n">04</div>
            <div className="dm-step-t">YOU GET FAMOUS</div>
            <p>a limited edition tee of your own design, free — plus a permanent spot in the hall of fame as our proud designer.</p>
          </div>
        </div>
      </section>

      <section className="dm-challenge">
        <div className="dm-challenge-inner">
          <div className="manifesto-tag">→ THIS MONTH&apos;S CHALLENGE</div>
          <div className="dm-challenge-no">CHALLENGE 001 · JULY 2026</div>
          <h2 className="dm-challenge-theme">&quot;KANPUR STREETS&quot;</h2>
          <p className="dm-challenge-desc">
            design a tee that smells like home — chai tapri, galli cricket, traffic chaos, whatever kanpur means to you. make it loud.
          </p>
          <div className="dm-challenge-meta">
            <div className="dm-meta-item"><span>DEADLINE</span>31 JULY 2026</div>
            <div className="dm-meta-item"><span>WINNER GETS</span>LIMITED EDITION TEE + HALL OF FAME</div>
            <div className="dm-meta-item"><span>ROYALTY</span>YOUR NAME ON EVERY DROP</div>
          </div>
          <Link href="#dm-submit" className="btn-primary">SUBMIT YOUR DESIGN ↓</Link>
        </div>
      </section>

      <section className="dm-submit-section" id="dm-submit">
        <div className="story-label">→ SEND IT</div>
        <h2 className="dm-submit-heading">Drop your design here.</h2>
        <DesignerFormClient />
      </section>

      <section className="dm-fame">
        <div className="dm-fame-inner">
          <div className="manifesto-tag">→ HALL OF FAME</div>
          <h2 className="dm-fame-heading">Proud Designers.</h2>
          <p className="dm-fame-sub">the legends whose designs made it to a drop. once you&apos;re here, you&apos;re here forever.</p>
          <div className="fame-grid">
            <div className="fame-card fame-open sketch-box">
              <div className="fame-badge">✦ 001</div>
              <div className="fame-q">?</div>
              <div className="fame-name">THIS COULD BE YOU</div>
              <div className="fame-month">JULY 2026 · CHALLENGE OPEN</div>
              <Link href="#dm-submit" className="fame-cta">claim this spot →</Link>
            </div>
            <div className="fame-card fame-locked sketch-box">
              <div className="fame-badge">✦ 002</div>
              <div className="fame-q">🔒</div>
              <div className="fame-name">AUGUST 2026</div>
              <div className="fame-month">CHALLENGE NOT STARTED</div>
            </div>
            <div className="fame-card fame-locked sketch-box">
              <div className="fame-badge">✦ 003</div>
              <div className="fame-q">🔒</div>
              <div className="fame-name">SEPTEMBER 2026</div>
              <div className="fame-month">CHALLENGE NOT STARTED</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
