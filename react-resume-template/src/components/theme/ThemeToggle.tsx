import {Monitor, Moon, Sun} from 'lucide-react';
import {useTheme} from 'next-themes';
import {FC, useCallback, useEffect, useState} from 'react';

import {Button} from '@/components/ui/button';

type NextTheme = 'light' | 'dark' | 'system';

const order: readonly NextTheme[] = ['light', 'dark', 'system'] as const;

const ThemeToggle: FC = () => {
  const {theme, setTheme, resolvedTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = useCallback(() => {
    const current = (theme ?? 'system') as NextTheme;
    const idx = order.indexOf(current);
    const next = order[(idx + 1) % order.length];
    setTheme(next);
  }, [theme, setTheme]);

  if (!mounted) {
    return (
      <Button
        aria-label="Toggle color theme"
        className="size-9 opacity-0"
        disabled
        size="icon"
        type="button"
        variant="ghost"
      />
    );
  }

  const active = (theme ?? 'system') as NextTheme;
  const label =
    active === 'system'
      ? `Toggle color theme (currently: system, resolved to ${resolvedTheme ?? 'light'})`
      : `Toggle color theme (currently: ${active})`;

  return (
    <Button
      aria-label={label}
      aria-pressed={active === 'dark'}
      className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={handleClick}
      size="icon"
      title={label}
      type="button"
      variant="ghost">
      {active === 'light' && <Sun className="size-4" />}
      {active === 'dark' && <Moon className="size-4" />}
      {active === 'system' && <Monitor className="size-4" />}
      <span className="sr-only">{label}</span>
    </Button>
  );
};

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;
