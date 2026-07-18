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
      <header className="sticky top-0 w-full z-40 bg-cream/90 dark:bg-espresso/90 backdrop-blur-md border-b border-mist/10 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center shrink-0 focus:outline-none focus:ring-2 focus:ring-brew-500 rounded-lg"
            aria-label="Home"
          >
            <img
              src="/code-chai-with-sudarshan/images/logo-light.png"
              alt="Code & Chai with Sudarshan"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop right-side controls */}
          <div className="flex items-center gap-2 sm:gap-3">

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

            {/* Theme Toggle */}
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
