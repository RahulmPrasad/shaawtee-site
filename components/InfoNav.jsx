'use client';

import { useEffect, useState } from 'react';

const SECTIONS = ['size-guide', 'shipping', 'returns', 'faq'];
const LABELS = { 'size-guide': 'Size Guide', shipping: 'Shipping', returns: 'Returns', faq: 'FAQ' };

export default function InfoNav() {
  const [active, setActive] = useState('size-guide');

  useEffect(() => {
    const onScroll = () => {
      let current = 'size-guide';
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) current = id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ul className="info-nav" id="info-nav">
      {SECTIONS.map((id) => (
        <li key={id}>
          <a href={`#${id}`} className={active === id ? 'active' : ''}>{LABELS[id]}</a>
        </li>
      ))}
    </ul>
  );
}
