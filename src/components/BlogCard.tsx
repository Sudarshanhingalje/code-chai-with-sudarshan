import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import type { ParsedPost } from '../utils/frontmatter';

interface BlogCardProps {
  post: ParsedPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const { title, description, date, tags, category, coverImage, draft } = post.frontmatter;
  const { slug, readingTime } = post;

  // Build public image path. Note: Vite's public assets can be referenced directly.
  // We'll also handle external images or local drafts.
  const imageUrl = coverImage || '';

  return (
    <article className="group relative bg-cream dark:bg-espresso rounded-2xl border border-mist/15 hover:border-brew-500/50 hover:shadow-xl hover:shadow-brew-500/5 transition-all duration-300 overflow-hidden flex flex-col h-full focus-within:ring-2 focus-within:ring-brew-500">
      
      {/* Draft Indicator Ribbon */}
      {draft && (
        <span className="absolute top-3 left-3 z-10 bg-amber-500 text-espresso font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
          Local Draft
        </span>
      )}

      {/* Post Cover Image Container */}
      <Link to={`/blog/${slug}`} className="block relative aspect-video w-full overflow-hidden bg-mist/5 border-b border-mist/10 focus:outline-none">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Cover for ${title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // If image fails to load, replace with a nice CSS gradient background
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const placeholder = document.createElement('div');
                placeholder.className = 'w-full h-full bg-gradient-to-tr from-chai-900/10 via-brew-500/10 to-chai-500/10 flex items-center justify-center p-4';
                placeholder.innerHTML = `<span class="font-serif font-semibold text-chai-600 dark:text-chai-400 text-sm tracking-wide">Code & Chai</span>`;
                parent.appendChild(placeholder);
              }
            }}
          />
        ) : (
          /* Premium CSS Gradient Pattern Placeholder */
          <div className="w-full h-full bg-gradient-to-tr from-chai-900/15 via-brew-500/10 to-chai-500/20 flex flex-col items-center justify-center p-4 relative">
            <span className="font-serif font-bold text-brew-700 dark:text-brew-300 text-lg tracking-wide">
              {category.toUpperCase()}
            </span>
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#8B95A1_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>
        )}
      </Link>

      {/* Card Content details */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Meta Row: Category Pill & Reading Time */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-chai-600 dark:text-chai-400 bg-chai-500/10 px-2.5 py-0.5 rounded-full">
            {category}
          </span>
          <span className="flex items-center text-xs font-mono text-mist">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {readingTime}
          </span>
        </div>

        {/* Post Title */}
        <h3 className="font-serif font-bold text-xl leading-tight text-ink dark:text-parchment group-hover:text-brew-600 dark:group-hover:text-brew-400 mb-2.5 transition-colors duration-200">
          <Link to={`/blog/${slug}`} className="focus:outline-none focus:underline flex items-start gap-1">
            <span className="line-clamp-2">{title}</span>
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1 text-brew-500" />
          </Link>
        </h3>

        {/* Post Description */}
        <p className="text-sm text-ink/75 dark:text-parchment/75 font-sans line-clamp-3 mb-4 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Bottom Row: Date & Top 2 Tags */}
        <div className="flex items-center justify-between border-t border-mist/10 pt-4 mt-auto">
          <span className="flex items-center text-xs font-mono text-mist">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {date}
          </span>
          
          <div className="flex gap-1.5">
            {tags.slice(0, 2).map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="text-[10px] font-mono bg-mist/5 border border-mist/15 hover:border-brew-500 hover:text-brew-600 dark:hover:text-brew-400 text-ink dark:text-parchment px-2 py-0.5 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-brew-500"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
};
