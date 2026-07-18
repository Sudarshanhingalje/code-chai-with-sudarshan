import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { getAllPosts } from '../utils/posts';

export const Home: React.FC = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((p) => p.frontmatter.featured).slice(0, 3);
  const latestPosts = allPosts.slice(0, 20);

  return (
    <div className="space-y-10 py-4 sm:py-6">

      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="flex justify-center items-center py-6 sm:py-8">
          <img
            src="/code-chai-with-sudarshan/images/logo-middle.png"
            alt="Code & Chai with Sudarshan"
            className="w-full max-w-[320px] sm:max-w-[480px] md:max-w-[600px] h-auto object-contain select-none"
          />
        </div>

        {/* Tagline */}
        <p className="text-center text-sm sm:text-base text-ink/65 dark:text-parchment/65 font-sans max-w-md mx-auto leading-relaxed px-2">
          Daily brew of{' '}
          <span className="font-semibold text-brew-600 dark:text-brew-400">Java · Spring Boot · React</span>{' '}
          notes and personal journal entries by{' '}
          <span className="font-semibold text-ink dark:text-parchment">Sudarshan Hingalje</span>.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
          <Link
            to="/blog"
            className="bg-brew-600 hover:bg-brew-700 text-cream font-mono text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 border border-brew-700 transition-all hover:shadow-lg hover:shadow-brew-500/10 focus:outline-none focus:ring-2 focus:ring-brew-500"
          >
            <BookOpen className="w-4 h-4" />
            Read All Posts
          </Link>
          <a
            href="https://github.com/Sudarshanhingaljethese"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cream dark:bg-espresso hover:bg-mist/10 border border-mist/20 text-ink dark:text-parchment font-mono text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-brew-500"
          >
            GitHub ↗
          </a>
        </div>
      </section>

      {/* ── Featured Posts ── */}
      {featuredPosts.length > 0 && (
        <section className="space-y-5 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-mist/10 pb-3">
            <h2 className="font-serif font-black text-lg sm:text-xl tracking-tight text-ink dark:text-parchment flex items-center gap-2">
              <span className="text-chai-500">★</span> Featured
            </h2>
            <Link
              to="/blog"
              className="text-xs font-mono font-bold text-brew-600 dark:text-brew-400 hover:text-brew-700 flex items-center gap-1 group"
            >
              All posts <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {featuredPosts.map((post) => (
              <div key={post.slug} className="h-full">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Latest Posts ── */}
      <section className="space-y-5 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-b border-mist/10 pb-3">
          <h2 className="font-serif font-black text-lg sm:text-xl tracking-tight text-ink dark:text-parchment">
            Latest Entries
          </h2>
          <span className="font-mono text-xs text-mist">{allPosts.length} post{allPosts.length !== 1 ? 's' : ''}</span>
        </div>

        {latestPosts.length === 0 ? (
          <div className="text-center py-14 sm:py-20 bg-cream dark:bg-espresso border border-dashed border-mist/20 rounded-2xl">
            <p className="text-mist font-mono text-sm">No blog posts yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {latestPosts.map((post) => (
              <div key={post.slug} className="h-full">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
