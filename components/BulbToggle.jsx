'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

const CLOSE_DURATION = 0.7; // seconds — shutter falling shut (with a small settle at the end)
const OPEN_DURATION = 0.85; // seconds — shutter rising open
const OPEN_HOLD = 280; // ms pause while fully covered, so the new page has mounted underneath
const SETTLE_EASE = [0.22, 1, 0.36, 1]; // smooth "expo-out" glide used for the rise
const DROP_KEYFRAMES = ['-101%', '2%', '0%']; // slight overshoot-then-settle, like a real shutter dropping
const DROP_TIMES = [0, 0.82, 1];

const COPY = {
  night: {
    covering: 'shutter gir raha hai... raat ki dukaan khul rahi hai',
    revealing: 'shutter uth raha hai... andar aa ja',
  },
  day: {
    covering: 'shutter gir raha hai... dukaan band ho rahi hai',
    revealing: 'roshni wapas aa rahi hai... wapas duniya mein',
  },
};

export default function BulbToggle() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const [pulling, setPulling] = useState(false);
  const [sparking, setSparking] = useState(false);
  // phase: null (hidden) | 'covering' (animating down) | 'covered' (holding, fully down) | 'revealing' (animating up)
  const [phase, setPhase] = useState(() => (pathname === '/midnight' ? 'covered' : null));
  const [direction, setDirection] = useState('night'); // which transition the shutter is currently playing
  const [awaiting, setAwaiting] = useState(null); // pathname we're waiting to land on before revealing

  // bulb ka random glitch/spark — sirf day mode mein, attention ke liye
  useEffect(() => {
    let timeoutId;
    const scheduleSpark = () => {
      timeoutId = setTimeout(() => {
        if (theme !== 'night' && !pulling) {
          setSparking(true);
          setTimeout(() => setSparking(false), 700);
        }
        scheduleSpark();
      }, 3000 + Math.random() * 4000);
    };
    scheduleSpark();
    return () => clearTimeout(timeoutId);
  }, [theme, pulling]);

  // direct load / refresh of /midnight always gets the entrance reveal,
  // same as a bulb-triggered arrival there
  useEffect(() => {
    if (pathname === '/midnight') setAwaiting('/midnight');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // once we've actually landed on the page we were waiting for, hold a beat
  // (so it has time to paint underneath) then rise/reveal
  useEffect(() => {
    if (!awaiting || pathname !== awaiting) return undefined;
    setPhase((p) => p || 'covered');
    const t1 = setTimeout(() => setPhase('revealing'), OPEN_HOLD);
    const t2 = setTimeout(() => {
      setPhase(null);
      setAwaiting(null);
    }, OPEN_HOLD + OPEN_DURATION * 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname, awaiting]);

  const handleClick = () => {
    if (pulling) return;
    setPulling(true);
    const goingNight = theme !== 'night';
    setTimeout(() => {
      setPulling(false);
      if (goingNight) {
        setDirection('night');
        setAwaiting('/midnight');
        setPhase('covering');
        setTimeout(() => {
          setPhase('covered');
          setTheme('night');
          router.push('/midnight');
        }, CLOSE_DURATION * 1000);
      } else if (pathname === '/midnight') {
        // midnight dukaan mein lights on = dukaan band, wapas ghar — same
        // shutter treatment, mirrored, on the way back to daylight
        setDirection('day');
        setAwaiting('/');
        setPhase('covering');
        setTimeout(() => {
          setPhase('covered');
          setTheme('day');
          router.push('/');
        }, CLOSE_DURATION * 1000);
      } else {
        document.documentElement.classList.add('theme-switching');
        setTheme('day');
        setTimeout(() => document.documentElement.classList.remove('theme-switching'), 350);
      }
    }, 180);
  };

  const copy = COPY[direction];

  return (
    <>
      <div
        className={`bulb-toggle${pulling ? ' pulling' : ''}${sparking ? ' sparking' : ''}`}
        onClick={handleClick}
      >
        <div className="bulb-cord" />
        <div className="bulb-knot" />
        <button className="bulb-bulb" aria-label="toggle night mode">💡</button>
        <span className="spark-fx">⚡</span>
        <span className="bulb-tip">{theme === 'night' ? 'lights on?' : 'lights off?'}</span>
      </div>
      <AnimatePresence>
        {phase && (
          <motion.div
            className={`night-shutter${phase === 'revealing' ? ' opening' : ''}`}
            initial={{ y: phase === 'covering' ? DROP_KEYFRAMES[0] : '0%' }}
            animate={
              phase === 'revealing'
                ? { y: '-101%' }
                : { y: phase === 'covering' ? DROP_KEYFRAMES : '0%' }
            }
            transition={
              phase === 'revealing'
                ? { duration: OPEN_DURATION, ease: SETTLE_EASE }
                : { duration: CLOSE_DURATION, times: DROP_TIMES, ease: [0.7, 0, 0.9, 0.4] }
            }
          >
            <div className="shutter-text">🌙 MIDNIGHT SHOP</div>
            <div className="shutter-sub">{phase === 'revealing' ? copy.revealing : copy.covering}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
