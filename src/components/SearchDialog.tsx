import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, X, BookOpen, Calendar, Tag } from 'lucide-react';
import { getAllPosts } from '../utils/posts';
import type { ParsedPost } from '../utils/frontmatter';

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ParsedPost[]>([]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Get all posts for searching
  const posts = getAllPosts();

  // Initialize Fuse.js
  const fuse = new Fuse(posts, {
    keys: [
      { name: 'frontmatter.title', weight: 1.0 },
      { name: 'frontmatter.description', weight: 0.7 },
      { name: 'frontmatter.category', weight: 0.5 },
      { name: 'frontmatter.tags', weight: 0.5 },
    ],
    threshold: 0.4, // Fuzzy matching threshold
  });

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      inputRef.current?.focus();
      // Disable background scrolling when open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle search logic
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const searchResults = fuse.search(query).map((r) => r.item);
    setResults(searchResults);
  }, [query]);

  // Click outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleSelectResult = (slug: string) => {
    navigate(`/blog/${slug}`);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-espresso/60 dark:bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[10vh] px-4"
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-2xl bg-cream dark:bg-espresso border border-mist/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-mist/15 px-4 py-3 bg-mist/5">
          <Search className="w-5 h-5 text-mist mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts, tags, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-ink dark:text-parchment font-sans placeholder-mist/60 border-none outline-none text-base py-1"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-mist hover:text-ink dark:hover:text-parchment p-1 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-mono border border-mist/25 text-mist rounded px-1.5 py-0.5 bg-cream dark:bg-espresso"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[50vh] overflow-y-auto p-4">
          {!query && (
            <div className="text-center py-8 text-mist">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-chai-500" />
              <p className="text-sm font-sans">Type anything to search the blog posts...</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {Array.from(new Set(posts.flatMap((p) => p.frontmatter.tags || [])))
                  .slice(0, 5)
                  .map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="text-xs font-mono bg-mist/5 border border-mist/15 hover:border-brew-500 hover:text-brew-600 dark:hover:text-brew-400 rounded-full px-2.5 py-1 text-ink dark:text-parchment transition-all"
                    >
                      #{tag}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {query && results.length === 0 && (
            <div className="text-center py-12 text-mist">
              <p className="text-sm font-sans">No results found for &ldquo;<span className="font-semibold">{query}</span>&rdquo;</p>
              <p className="text-xs font-mono mt-1 text-chai-500">Try searching for keywords like Java, React, or Life</p>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="space-y-3">
              <div className="text-[10px] font-mono uppercase tracking-wider text-mist px-1">
                Found {results.length} Match(es)
              </div>
              {results.map((post) => (
                <div
                  key={post.slug}
                  onClick={() => handleSelectResult(post.slug)}
                  className="group flex flex-col p-3 rounded-xl border border-mist/10 hover:border-brew-500 hover:bg-brew-50/5 dark:hover:bg-brew-900/10 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-chai-600 dark:text-chai-400 bg-chai-50 dark:bg-chai-900/20 px-2 py-0.5 rounded-full">
                      {post.frontmatter.category}
                    </span>
                    <span className="flex items-center text-xs font-mono text-mist">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {post.frontmatter.date}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-ink dark:text-parchment group-hover:text-brew-600 dark:group-hover:text-brew-400 mt-2 transition-colors">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-sm text-mist/80 font-sans line-clamp-1 mt-1">
                    {post.frontmatter.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {post.frontmatter.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="flex items-center text-[10px] font-mono text-mist">
                        <Tag className="w-2.5 h-2.5 mr-0.5 opacity-60" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
