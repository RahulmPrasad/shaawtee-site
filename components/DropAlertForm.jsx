'use client';

import { useRef, useState } from 'react';

export default function DropAlertForm() {
  const inputRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | success | error

  const handleSubmit = () => {
    const input = inputRef.current;
    if (input.value && input.value.includes('@')) {
      setStatus('success');
      input.value = '';
      setTimeout(() => setStatus('idle'), 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  };

  return (
    <div className="drop-form">
      <input
        ref={inputRef}
        type="email"
        placeholder={
          status === 'success' ? 'locked in bestie 🔒' : status === 'error' ? 'real email pls 💀' : 'ur email here bestie'
        }
        className="drop-input"
        style={status === 'error' ? { borderColor: '#e8320a' } : undefined}
      />
      <button
        className="drop-submit"
        style={status === 'success' ? { background: '#1a3cff', borderColor: '#1a3cff' } : undefined}
        onClick={handleSubmit}
      >
        {status === 'success' ? "YOU'RE IN ✓" : 'ALERT ME ⚡'}
      </button>
    </div>
  );
}
