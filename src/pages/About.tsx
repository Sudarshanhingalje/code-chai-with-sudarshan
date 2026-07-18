import React from 'react';
import { Coffee, Code2, Server, Heart, Brain } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-chai-500/20 bg-chai-50/5 text-chai-600 dark:text-chai-400 font-mono text-xs">
          <Coffee className="w-3.5 h-3.5" />
          <span>The Story Behind The Brew</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-ink dark:text-parchment tracking-tight">
          About Sudarshan
        </h1>
      </div>

      <div className="bg-cream dark:bg-espresso p-6 sm:p-8 rounded-2xl border border-mist/15 space-y-6 font-sans">
        <div className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-ink dark:text-parchment flex items-center gap-2">
            <Brain className="w-5 h-5 text-brew-500" />
            Who I Am
          </h2>
          <p className="text-sm sm:text-base text-ink/80 dark:text-parchment/80 leading-relaxed">
            Hi, I&apos;m <span className="font-semibold text-ink dark:text-parchment">Sudarshan Hingalje</span> — a software engineer passionate about building backend systems and modern web interfaces. I write about what I learn daily, mixing technical deep-dives with honest journal entries about life as a developer.
          </p>
        </div>

        <hr className="border-mist/10" />

        <div className="space-y-4">
          <h2 className="font-serif font-bold text-xl text-ink dark:text-parchment flex items-center gap-2">
            <Code2 className="w-5 h-5 text-chai-500" />
            My Tech Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-mist/5 border border-mist/10 rounded-xl space-y-2">
              <h3 className="font-mono text-xs font-bold uppercase text-brew-600 dark:text-brew-400 flex items-center gap-1.5">
                <Server className="w-4 h-4 shrink-0" /> Backend
              </h3>
              <ul className="text-xs font-mono text-ink/75 dark:text-parchment/75 list-disc list-inside space-y-1">
                <li>Java · Spring Boot · Spring Cloud</li>
                <li>REST APIs · JWT · Microservices</li>
                <li>PostgreSQL · MongoDB · MySQL</li>
                <li>Docker · GitHub Actions · CI/CD</li>
              </ul>
            </div>
            <div className="p-4 bg-mist/5 border border-mist/10 rounded-xl space-y-2">
              <h3 className="font-mono text-xs font-bold uppercase text-chai-600 dark:text-chai-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 shrink-0" /> Frontend
              </h3>
              <ul className="text-xs font-mono text-ink/75 dark:text-parchment/75 list-disc list-inside space-y-1">
                <li>React 19 · TypeScript</li>
                <li>Tailwind CSS · Vite</li>
                <li>Next.js · Framer Motion</li>
                <li>Git · Linux · Shell Scripts</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-center text-xs text-mist font-mono">
          <span className="flex items-center gap-1">
            Keep brewing, keep coding <Heart className="w-3 h-3 text-chai-500 fill-current" />
          </span>
        </div>
      </div>
    </div>
  );
};
