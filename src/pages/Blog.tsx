import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { getAllPosts } from '../utils/posts';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const allPosts = getAllPosts();

  // Categories list
  const categories = [
    { id: 'all', label: 'All Brews' },
    { id: 'tech', label: 'Tech Notes' },
    { id: 'journal', label: 'Journal' },
    { id: 'tutorial', label: 'Tutorials' },
    { id: 'project', label: 'Projects' },
  ];

  // Filter posts based on category selection
  const filteredPosts = allPosts.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.frontmatter.category.toLowerCase() === selectedCategory;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brew-500/20 bg-brew-500/5 text-brew-600 dark:text-brew-400 font-mono text-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Archive Hub</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl text-ink dark:text-parchment tracking-tight">
          All Blog Posts
        </h1>
        <p className="max-w-md mx-auto text-sm text-mist/80 font-sans leading-relaxed">
          Filter articles by tech tutorials, dev notes, and personal journal logs.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-y border-mist/10 py-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border outline-none focus:ring-2 focus:ring-brew-500 ${
              selectedCategory === cat.id
                ? 'bg-brew-600 border-brew-700 text-cream shadow-md shadow-brew-500/10'
                : 'bg-cream dark:bg-espresso border-mist/20 hover:border-brew-500/50 text-ink dark:text-parchment'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts Grid Feed */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20 bg-cream/40 dark:bg-espresso/10 rounded-2xl border border-dashed border-mist/15 font-mono text-sm text-mist">
          No articles found under this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div key={post.slug} className="h-full">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
