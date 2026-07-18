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
      <header className="sticky top-0 w-full z-40 bg-cream/95 dark:bg-espresso/95 backdrop-blur-md border-b border-mist/10 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">

          {/* ── Logo: cup icon + text ── */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 shrink-0 focus:outline-none group"
            aria-label="Code & Chai with Sudarshan — Home"
          >
            {/* Cup image */}
            <img
              src="/code-chai-with-sudarshan/images/cup-icon.png"
              alt="Chai cup"
              className="h-9 sm:h-11 w-auto object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
            />

            {/* Text block */}
            <div className="flex flex-col leading-none select-none">
              {/* < CODE & CHAI /> */}
              <span
                className="font-black tracking-tight"
                style={{
                  fontFamily: 'Poppins, Arial Black, sans-serif',
                  fontSize: 'clamp(13px, 2.5vw, 18px)',
                  color: 'currentColor',
                  lineHeight: 1.1,
                }}
              >
                <span style={{ color: '#5ab82e' }}>&lt;</span>
                {' '}CODE{' '}
                <span style={{ color: '#5ab82e' }}>&amp;</span>
                {' '}CHAI{' '}
                <span style={{ color: '#5ab82e' }}>/&gt;</span>
              </span>

              {/* with sudarshan */}
              <span
                className="font-mono tracking-widest uppercase text-mist dark:text-mist"
                style={{
                  fontSize: 'clamp(7px, 1.2vw, 10px)',
                  letterSpacing: '0.18em',
                  marginTop: '2px',
                }}
              >
                with sudarshan
              </span>
            </div>
          </Link>

          {/* ── Right controls ── */}
          <div className="flex items-center gap-2">

            {/* Blog tab — desktop */}
            <Link
              to="/blog"
              className={`hidden sm:flex font-mono text-sm font-semibold px-4 py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-brew-500 ${
                isBlogActive
                  ? 'bg-brew-600 border-brew-700 text-cream shadow-md'
                  : 'border-mist/20 hover:border-brew-500/50 hover:bg-mist/5 text-ink dark:text-parchment'
              }`}
            >
              Blog
            </Link>

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
              className="sm:hidden flex items-center justify-center w-8 h-8 rounded-xl border border-mist/20 hover:bg-mist/5 text-ink dark:text-parchment transition-all focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isMobileMenuOpen && (
          <nav className="sm:hidden border-t border-mist/10 bg-cream dark:bg-espresso px-4 py-3 space-y-1">
            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-xl font-mono text-sm tracking-wide transition-all ${
                isBlogActive
                  ? 'bg-brew-500/10 text-brew-600 dark:text-brew-400 font-bold border-l-4 border-brew-500 pl-2'
                  : 'text-ink/80 dark:text-parchment/80 hover:bg-mist/5'
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
