import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tag as TagIcon, Hash } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { getAllPosts } from '../utils/posts';

export const Tags: React.FC = () => {
  const { tag: currentTag } = useParams<{ tag: string }>();
  const allPosts = getAllPosts();

  // Extract all unique tags and count their occurrences
  const tagCounts = allPosts.reduce((acc, post) => {
    const postTags = post.frontmatter.tags || [];
    postTags.forEach((tag) => {
      const cleanTag = tag.trim().toLowerCase();
      if (cleanTag) {
        acc[cleanTag] = (acc[cleanTag] || 0) + 1;
      }
    });
    return acc;
  }, {} as Record<string, number>);

  const uniqueTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a]);

  // Filter posts based on selected tag
  const filteredPosts = currentTag
    ? allPosts.filter((post) =>
        (post.frontmatter.tags || []).some((t) => t.trim().toLowerCase() === currentTag.toLowerCase())
      )
    : allPosts;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brew-500/20 bg-brew-500/5 text-brew-600 dark:text-brew-400 font-mono text-xs">
          <TagIcon className="w-3.5 h-3.5" />
          <span>Categorized Tags</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-ink dark:text-parchment tracking-tight">
          {currentTag ? (
            <>
              Posts Tagged with <span className="text-chai-500 font-mono">#{currentTag}</span>
            </>
          ) : (
            'Filter by Tags'
          )}
        </h1>
        <p className="max-w-md mx-auto text-sm text-mist/80 font-sans leading-relaxed">
          Browse through the topics of Java, Spring Boot, React, and personal journal logs.
        </p>
      </div>

      {/* Tag Cloud Component */}
      <div className="bg-cream dark:bg-espresso p-6 rounded-2xl border border-mist/15 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-mist font-semibold">
          Tag Cloud
        </h2>
        <div className="flex flex-wrap gap-2">
          {uniqueTags.map((tag) => {
            const count = tagCounts[tag];
            const isSelected = currentTag?.toLowerCase() === tag;
            return (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all border outline-none focus:ring-2 focus:ring-brew-500 ${
                  isSelected
                    ? 'bg-brew-600 border-brew-700 text-cream font-bold shadow-md shadow-brew-500/10'
                    : 'bg-cream/50 dark:bg-espresso/50 border-mist/20 hover:border-brew-500/50 hover:bg-mist/5 text-ink dark:text-parchment'
                }`}
              >
                <Hash className="w-3.5 h-3.5 opacity-60 shrink-0" />
                <span>{tag}</span>
                <span className={`text-[10px] rounded px-1 font-semibold ${
                  isSelected ? 'bg-cream/20 text-cream' : 'bg-mist/15 text-mist'
                }`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Posts filtered feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-mist/10 pb-3">
          <h2 className="font-serif font-black text-xl text-ink dark:text-parchment">
            Matched Articles ({filteredPosts.length})
          </h2>
          {currentTag && (
            <Link
              to="/tags"
              className="text-xs font-mono text-brew-600 dark:text-brew-400 hover:text-brew-700"
            >
              Clear filter
            </Link>
          )}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-cream/40 dark:bg-espresso/10 rounded-2xl border border-dashed border-mist/15 font-mono text-sm text-mist">
            No articles found matching this tag.
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

    </div>
  );
};
