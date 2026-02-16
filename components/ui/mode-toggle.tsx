'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const ModeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative flex size-8 items-center justify-center rounded-md transition-colors hover:bg-(--color-border)"
    >
      <SunIcon
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
        }`}
      />

      <MoonIcon
        size={16}
        className={`absolute transition-all duration-300 ${
          isDark ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
        }`}
      />
    </button>
  );
};
