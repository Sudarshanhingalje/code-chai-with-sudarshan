import React, { useEffect, useState, useRef } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

export type Theme = 'light' | 'dark' | 'system';

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      let activeTheme = theme;
      if (theme === 'system') {
        activeTheme = mediaQuery.matches ? 'dark' : 'light';
      }

      if (activeTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    localStorage.setItem('theme', theme);

    // Listen for system changes if system theme is selected
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = (t: Theme) => {
    switch (t) {
      case 'light':
        return <Sun className="w-4 h-4 text-chai-500" />;
      case 'dark':
        return <Moon className="w-4 h-4 text-brew-400" />;
      case 'system':
        return <Laptop className="w-4 h-4 text-mist" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-9 h-9 rounded-xl border border-mist/20 hover:border-brew-500/50 hover:bg-mist/5 transition-all focus:outline-none focus:ring-2 focus:ring-brew-500"
        aria-label="Toggle theme"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {getThemeIcon(theme)}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-xl border border-mist/15 bg-cream dark:bg-espresso shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-100">
          {(['light', 'dark', 'system'] as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTheme(t);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 text-xs font-mono capitalize transition-colors hover:bg-mist/10 ${
                theme === t ? 'text-brew-600 dark:text-brew-400 font-semibold' : 'text-ink dark:text-parchment'
              }`}
            >
              <span className="mr-2">{getThemeIcon(t)}</span>
              {t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
