import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Coffee } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="py-4 sm:py-6 flex flex-col justify-center items-center min-h-[60vh]">

      {/* ── Hero ── */}
      <section className="px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
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
            href="https://github.com/Sudarshanhingalje"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cream dark:bg-espresso hover:bg-mist/10 border border-mist/20 text-ink dark:text-parchment font-mono text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-brew-500"
          >
            <Coffee className="w-4 h-4 text-chai-500" />
            GitHub
          </a>
        </div>
      </section>

    </div>
  );
};
