'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function ThemeInitializer() {
  const { setTheme } = useTheme();
  
  useEffect(() => {
    setTheme('light');
  }, [setTheme]);
  
  return null;
} 