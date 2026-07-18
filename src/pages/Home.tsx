import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

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
        <p className="text-center text-sm sm:text-base text-ink/65 dark:text-parchment/65 font-sans max-w-lg mx-auto leading-relaxed px-2">
          Daily brews of{' '}
          <span className="font-semibold text-brew-600 dark:text-brew-400">Java, Spring Boot, DevOps, AWS, AI, and System Design</span>{' '}
          — alongside personal journal entries by{' '}
          <span className="font-semibold text-ink dark:text-parchment">Sudarshan Hingalje</span>.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
          <Link
            to="/blog"
            className="border border-brew-600 dark:border-brew-400 text-brew-600 dark:text-brew-400 hover:bg-brew-600/10 dark:hover:bg-brew-400/10 bg-transparent font-mono text-sm font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-brew-500"
          >
            <BookOpen className="w-4 h-4" />
            Read All Posts
          </Link>
        </div>
      </section>

    </div>
  );
};
