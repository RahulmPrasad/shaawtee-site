'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { isMidnightPath } from '@/lib/paths';

const ThemeContext = createContext(null);
const THEME_KEY = 'shaawtee_theme';

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState('day');
  const pathname = usePathname();

  // initial load — respects saved preference, else system preference
  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setThemeState(saved || (prefersDark ? 'night' : 'day'));
  }, []);

  // midnight shop is always night, regardless of saved preference
  useEffect(() => {
    if (isMidnightPath(pathname)) {
      localStorage.setItem(THEME_KEY, 'night');
      setThemeState('night');
    }
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle('night', theme === 'night');
    document.body.dataset.page = isMidnightPath(pathname) ? 'midnight' : '';
  }, [theme, pathname]);

  const setTheme = useCallback((next) => {
    localStorage.setItem(THEME_KEY, next);
    setThemeState(next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
