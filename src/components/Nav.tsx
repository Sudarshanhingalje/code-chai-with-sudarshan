import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { ChaiMark } from './ChaiMark';
import { ThemeToggle } from './ThemeToggle';
import { SearchDialog } from './SearchDialog';

export const Nav: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="sticky top-0 w-full z-40 bg-cream/80 dark:bg-espresso/80 backdrop-blur-md border-b border-mist/10 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

          {/* Logo Mark & Blog Name */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <ChaiMark size={36} className="transition-transform group-hover:scale-105 duration-200" />
            <div className="flex flex-col leading-none">
              <span className="font-serif font-bold text-lg tracking-tight text-ink dark:text-parchment group-hover:text-brew-600 dark:group-hover:text-brew-400 transition-colors duration-200">
                Code &amp; Chai
              </span>
              <span className="font-mono text-[10px] text-mist/70 tracking-wide">with Sudarshan</span>
            </div>
          </Link>

          {/* Right Side: Blog tab + Search + Theme */}
          <div className="flex items-center gap-3">

            {/* Blog Nav Link — the ONLY tab */}
            <Link
              to="/blog"
              className={`font-mono text-sm font-semibold px-4 py-2 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-brew-500 ${
                location.pathname.startsWith('/blog') || location.pathname.startsWith('/tags')
                  ? 'bg-brew-600 border-brew-700 text-cream shadow-md shadow-brew-500/10'
                  : 'border-mist/20 hover:border-brew-500/50 hover:bg-mist/5 text-ink dark:text-parchment'
              }`}
            >
              Blog
            </Link>

            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-center w-9 h-9 rounded-xl border border-mist/20 hover:border-brew-500/50 hover:bg-mist/5 transition-all focus:outline-none focus:ring-2 focus:ring-brew-500"
              aria-label="Search posts"
            >
              <Search className="w-4 h-4 text-mist" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-xl border border-mist/20 hover:bg-mist/5 text-ink dark:text-parchment transition-all focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-mist/10 bg-cream dark:bg-espresso px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-3 py-2.5 rounded-xl font-mono text-sm tracking-wide ${
                location.pathname.startsWith('/blog')
                  ? 'bg-brew-500/10 text-brew-600 dark:text-brew-400 font-bold border-l-4 border-brew-500'
                  : 'text-ink/80 dark:text-parchment/80 hover:bg-mist/5'
              }`}
            >
              Blog
            </Link>
          </div>
        )}
      </header>

      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
