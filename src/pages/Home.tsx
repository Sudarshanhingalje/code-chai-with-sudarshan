import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Coffee, ArrowRight } from 'lucide-react';
import { BlogCard } from '../components/BlogCard';
import { getAllPosts } from '../utils/posts';


export const Home: React.FC = () => {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter((p) => p.frontmatter.featured).slice(0, 3);
  const latestPosts = allPosts.slice(0, 20);

  return (
    <div className="space-y-12 py-6">

      {/* Hero — cup + text logo layout */}
      <section className="py-10 px-4 max-w-4xl mx-auto">
        {/* Black background hero panel */}
        <div className="bg-black rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 select-none shadow-2xl">

          {/* Cup Image */}
          <img
            src="/code-chai-with-sudarshan/images/chai-cup.png"
            alt="Chai cup"
            className="w-40 sm:w-52 h-auto object-contain drop-shadow-lg shrink-0"
          />

          {/* Text Block */}
          <div className="text-center sm:text-left space-y-3">
            <h1
              style={{
                color: '#ffffff',
                fontFamily: 'Poppins, Arial Black, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 6vw, 68px)',
                lineHeight: 1.1,
                textShadow: '0 0 15px rgba(255,255,255,0.25)',
                margin: 0,
              }}
            >
              <span style={{ color: '#7CFF32', textShadow: '0 0 18px #7CFF32' }}>&lt;</span>
              {' '}CODE{' '}
              <span style={{ color: '#7CFF32', textShadow: '0 0 18px #7CFF32' }}>&amp;</span>
              {' '}CHAI{' '}
              <span style={{ color: '#7CFF32', textShadow: '0 0 18px #7CFF32' }}>/&gt;</span>
            </h1>

            <p
              style={{
                color: '#d8d8d8',
                fontFamily: 'Poppins, Arial, sans-serif',
                fontSize: 'clamp(13px, 2vw, 22px)',
                letterSpacing: '8px',
                margin: 0,
                paddingTop: '8px',
              }}
            >
              ── WITH SUDARSHAN ──
            </p>
          </div>
        </div>
      </section>

      {/* Sub-description */}
      <div className="text-center px-4 -mt-6">
        <p className="text-sm sm:text-base text-ink/70 dark:text-parchment/70 font-sans max-w-lg mx-auto leading-relaxed">
          Daily brew of <span className="font-semibold text-brew-600 dark:text-brew-400">Java · Spring Boot · React</span> notes
          and personal journal entries by <span className="font-semibold text-ink dark:text-parchment">Sudarshan Hingalje</span>.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/blog"
            className="bg-brew-600 hover:bg-brew-700 text-cream font-mono text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 border border-brew-700 transition-all hover:shadow-lg hover:shadow-brew-500/10 focus:outline-none focus:ring-2 focus:ring-brew-500"
          >
            <BookOpen className="w-4 h-4" />
            Read All Posts
          </Link>
          <a
            href="https://github.com/Sudarshanhingalje"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cream hover:bg-mist/5 border border-mist/20 text-ink dark:text-parchment font-mono text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-brew-500"
          >
            <Coffee className="w-4 h-4 text-chai-500" />
            GitHub
          </a>
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="space-y-5 px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-mist/10 pb-3">
            <h2 className="font-serif font-black text-xl tracking-tight text-ink dark:text-parchment flex items-center gap-2">
              <span className="text-chai-500">★</span> Featured
            </h2>
            <Link
              to="/blog"
              className="text-xs font-mono font-bold text-brew-600 dark:text-brew-400 hover:text-brew-700 flex items-center gap-1 group"
            >
              All posts <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featuredPosts.map((post) => (
              <div key={post.slug} className="h-full">
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* All / Latest Posts */}
      <section className="space-y-5 px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-b border-mist/10 pb-3">
          <h2 className="font-serif font-black text-xl tracking-tight text-ink dark:text-parchment">
            Latest Entries
          </h2>
          <span className="font-mono text-xs text-mist">{allPosts.length} post{allPosts.length !== 1 ? 's' : ''}</span>
        </div>

        {latestPosts.length === 0 ? (
          <div className="text-center py-16 bg-cream dark:bg-espresso border border-dashed border-mist/20 rounded-2xl">
            <p className="text-mist font-mono text-sm">No blog posts yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
