import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Calendar, Clock, Share2, ArrowLeft, Tag, BookOpen, AlertCircle } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../utils/posts';
import { BlogCard } from '../components/BlogCard';

// Highlight.js styles for code blocks
import 'highlight.js/styles/github-dark.css';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const post = slug ? getPostBySlug(slug) : undefined;

  // Scroll listener for reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight === 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // Scroll back to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto opacity-80" />
        <h1 className="font-serif font-black text-2xl text-ink dark:text-parchment">
          Post Not Found
        </h1>
        <p className="text-sm text-mist font-sans">
          The blog post you are looking for does not exist or has been deleted.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 bg-brew-600 hover:bg-brew-700 text-cream font-mono text-xs font-bold px-4 py-2 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  const { title, description, date, tags, category, coverImage, author } = post.frontmatter;
  const relatedPosts = getRelatedPosts(post);

  const handleShare = async () => {
    const shareData = {
      title: title,
      text: description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.warn('Share/Clipboard copy failed', err);
      // Fallback: clipboard copy
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        console.error('Clipboard fallback failed', e);
      }
    }
  };

  return (
    <div className="relative">
      
      {/* Reading Progress Bar */}
      <div className="fixed top-14 sm:top-16 left-0 right-0 h-1 bg-mist/10 z-40">
        <div
          className="h-full bg-brew-500 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8 animate-in fade-in duration-300">
        
        {/* Back navigation & Share row */}
        <div className="flex items-center justify-between border-b border-mist/10 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-mono text-mist hover:text-brew-600 dark:hover:text-brew-400 transition-colors focus:outline-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl border border-mist/20 hover:border-brew-500/50 hover:bg-mist/5 text-xs font-mono text-ink dark:text-parchment transition-all focus:outline-none focus:ring-1 focus:ring-brew-500"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Hero Meta Info */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-chai-600 dark:text-chai-400 bg-chai-500/10 px-2.5 py-0.5 rounded-full">
              {category}
            </span>
            <span className="text-xs text-mist font-mono flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {date}
            </span>
            <span className="text-xs text-mist font-mono flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {post.readingTime}
            </span>
          </div>

          <h1 className="font-serif font-black text-2xl sm:text-4xl md:text-5xl text-ink dark:text-parchment leading-tight tracking-tight">
            {title}
          </h1>

          <p className="text-base text-ink/75 dark:text-parchment/75 italic border-l-3 border-brew-500/50 pl-3 py-1 font-sans">
            {description}
          </p>

          <div className="flex items-center gap-2 pt-2 text-xs text-mist font-mono">
            <span>Written by:</span>
            <span className="font-semibold text-ink dark:text-parchment">{author}</span>
          </div>
        </div>

        {/* Cover image (if exists) */}
        {coverImage && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden border border-mist/15 bg-mist/5 shadow-md">
            <img
              src={coverImage}
              alt={`Cover for ${title}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.parentElement?.remove(); // Hide container if image doesn't load
              }}
            />
          </div>
        )}

        {/* Rendered Markdown Body */}
        <article className="markdown-body prose dark:prose-invert prose-stone max-w-none text-ink dark:text-parchment leading-relaxed text-sm sm:text-base md:text-lg space-y-4 sm:space-y-6 font-sans">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        {/* Tags cloud for current post */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-b border-mist/10 py-6">
            <span className="text-xs font-mono text-mist uppercase tracking-wide flex items-center mr-1 mt-1">
              <Tag className="w-3.5 h-3.5 mr-1" /> Tags:
            </span>
            {tags.map((tag) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="text-xs font-mono bg-mist/5 border border-mist/15 hover:border-brew-500 hover:text-brew-600 dark:hover:text-brew-400 text-ink dark:text-parchment px-3 py-1 rounded-full transition-all focus:outline-none focus:ring-1 focus:ring-brew-500"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="space-y-6 pt-6">
            <h2 className="font-serif font-black text-xl text-ink dark:text-parchment flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-chai-500" />
              Related Brews
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {relatedPosts.map((rPost) => (
                <div key={rPost.slug} className="h-full">
                  <BlogCard post={rPost} />
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
