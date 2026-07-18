import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SearchDialog } from './SearchDialog';

export const Nav: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isBlogActive =
    location.pathname.startsWith('/blog') || location.pathname.startsWith('/tags');

  return (
    <>
      <header className="sticky top-0 w-full z-40 bg-cream/95 dark:bg-brand-bg/95 backdrop-blur-md border-b border-mist/10 dark:border-brand-line transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3"
          style={{ height: '64px' }}>

          {/* ── Left: Logo ── */}
          <div className="flex-1 flex items-center justify-start shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 sm:gap-2.5 focus:outline-none group h-full py-1"
              aria-label="Code & Chai with Sudarshan — Home"
            >
              <img
                src="/code-chai-with-sudarshan/images/cup-icon.png"
                alt="Code & Chai — chai cup logo"
                style={{
                  height: '54px',
                  width: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  flexShrink: 0,
                }}
                className="transition-transform duration-200 group-hover:scale-105 drop-shadow-sm"
              />

              <div className="flex flex-col justify-center leading-none select-none">
                <span
                  style={{
                    fontFamily: 'Poppins, Arial Black, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(12px, 2.2vw, 17px)',
                    lineHeight: 1.15,
                    color: 'inherit',
                  }}
                >
                  <span style={{ color: '#5cb82a', fontWeight: 900 }}>&lt;</span>
                  {' '}CODE{' '}
                  <span style={{ color: '#5cb82a', fontWeight: 900 }}>&amp;</span>
                  {' '}CHAI{' '}
                  <span style={{ color: '#5cb82a', fontWeight: 900 }}>/&gt;</span>
                </span>

                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 'clamp(7px, 1vw, 9.5px)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#8B95A1',
                    marginTop: '3px',
                  }}
                >
                  with sudarshan
                </span>
              </div>
            </Link>
          </div>

          {/* ── Middle: Blog tab (Centered on desktop, hidden on mobile) ── */}
          <div className="hidden sm:flex items-center justify-center flex-1">
            <Link
              to="/blog"
              className={`font-mono text-sm font-semibold px-5 py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-brew-500 ${
                isBlogActive
                  ? 'bg-brand-green border-brand-green-dim text-black shadow-md font-bold'
                  : 'border-mist/20 hover:border-brand-green/50 hover:bg-mist/5 text-ink dark:text-brand-ink'
              }`}
            >
              Blog
            </Link>
          </div>

          {/* ── Right: controls (Search, Theme, Hamburger) ── */}
          <div className="flex-1 flex items-center justify-end gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-mist/20 hover:border-brew-500/50 hover:bg-mist/5 transition-all focus:outline-none focus:ring-2 focus:ring-brew-500"
              aria-label="Search posts"
            >
              <Search className="w-4 h-4 text-mist" />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden flex items-center justify-center w-8 h-8 rounded-xl border border-mist/20 hover:bg-mist/5 text-ink dark:text-brand-ink transition-all focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown */}
        {isMobileMenuOpen && (
          <nav className="sm:hidden border-t border-mist/10 dark:border-brand-line bg-cream dark:bg-brand-bg px-4 py-3 space-y-1">
            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl font-mono text-sm tracking-wide transition-all ${
                isBlogActive
                  ? 'bg-brand-green/10 text-brand-green dark:text-brand-green font-bold border-l-4 border-brand-green pl-2'
                  : 'text-ink/80 dark:text-brand-ink/80 hover:bg-mist/5'
              }`}
            >
              Blog
            </Link>
          </nav>
        )}
      </header>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
