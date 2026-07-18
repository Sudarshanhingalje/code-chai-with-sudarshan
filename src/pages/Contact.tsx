import React from 'react';
import { ArrowUpRight, MessageSquareCode } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4 11.5 11.5 0 0 1 3 .4c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

const MailIconSvg = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export const Contact: React.FC = () => {
  const contactLinks = [
    {
      name: 'Email',
      value: 'sudarshanhingalje1@gmail.com',
      href: 'mailto:sudarshanhingalje1@gmail.com',
      icon: <MailIconSvg />,
      iconColor: 'text-chai-500',
      description: 'Best way to reach me for collaborations, freelance work, or project discussions.',
    },
    {
      name: 'GitHub',
      value: 'github.com/Sudarshanhingaljethese',
      href: 'https://github.com/Sudarshanhingaljethese',
      icon: <GithubIcon />,
      iconColor: 'text-ink dark:text-parchment',
      description: 'Check out my open-source projects, Spring Boot repos, and React experiments.',
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/sudarshanhingalje',
      href: 'https://www.linkedin.com/in/sudarshanhingalje/',
      icon: <LinkedinIcon />,
      iconColor: 'text-brew-500',
      description: 'Connect professionally — networking, career updates, and job opportunities.',
    },
    {
      name: 'Instagram',
      value: '@threadcode08',
      href: 'https://www.instagram.com/threadcode08/',
      icon: <InstagramIcon />,
      iconColor: 'text-chai-500',
      description: 'Follow for behind-the-scenes of my coding life, chai sessions, and dev reels.',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brew-500/20 bg-brew-500/5 text-brew-600 dark:text-brew-400 font-mono text-xs">
          <MessageSquareCode className="w-3.5 h-3.5" />
          <span>Say Hello</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-ink dark:text-parchment tracking-tight">
          Get in Touch
        </h1>
        <p className="max-w-md mx-auto text-sm text-mist/80 font-sans leading-relaxed">
          Have feedback on an article, want to collaborate, or just say hi? Here's where to find me.
        </p>
      </div>

      <div className="space-y-4">
        {contactLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-cream dark:bg-espresso border border-mist/15 hover:border-brew-500/50 hover:bg-mist/5 rounded-2xl transition-all duration-200 gap-4 focus:outline-none focus:ring-2 focus:ring-brew-500"
          >
            <div className="flex gap-4 items-start">
              <div className={`p-3 bg-cream dark:bg-espresso border border-mist/15 rounded-xl group-hover:border-brew-500/50 transition-colors shrink-0 ${link.iconColor}`}>
                {link.icon}
              </div>
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-base text-ink dark:text-parchment group-hover:text-brew-600 dark:group-hover:text-brew-400 transition-colors">
                  {link.name}
                </h2>
                <p className="font-mono text-xs text-mist">{link.value}</p>
                <p className="text-xs text-ink/70 dark:text-parchment/70 font-sans max-w-md leading-relaxed">
                  {link.description}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-mono text-mist group-hover:text-brew-600 dark:group-hover:text-brew-400 self-end sm:self-center shrink-0">
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>
        ))}
      </div>

      {/* Terminal ping decoration */}
      <div className="bg-espresso text-parchment p-4 rounded-2xl border border-mist/20 font-mono text-xs space-y-2 select-none">
        <div className="flex items-center gap-1 text-brew-400">
          <span>&gt;</span>
          <span className="text-parchment">ping sudarshanhingalje1@gmail.com</span>
        </div>
        <div className="text-mist pl-3 leading-relaxed">
          PING sudarshanhingalje1@gmail.com: 56 data bytes<br />
          64 bytes: icmp_seq=0 ttl=64 time=0.03 ms<br />
          64 bytes: icmp_seq=1 ttl=64 time=0.04 ms
        </div>
        <div className="text-chai-500 pl-3">
          --- 2 packets transmitted, 2 received, 0% packet loss ---
        </div>
      </div>
    </div>
  );
};
