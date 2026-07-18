import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const allPosts = getAllPosts();

  // State to trigger progress bar animation when mounted
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateProgress(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', label: 'All Brews' },
    { id: 'tech', label: 'Tech Notes' },
    { id: 'journal', label: 'Journal' },
    { id: 'tutorial', label: 'Tutorials' },
    { id: 'project', label: 'Projects' },
  ];

  const filteredPosts = allPosts.filter((post) => {
    if (selectedCategory === 'all') return true;
    return post.frontmatter.category.toLowerCase() === selectedCategory;
  });

  const skills = [
    { name: 'Java Virtual Threads', pct: 95 },
    { name: 'Spring Boot', pct: 90 },
    { name: 'Linux', pct: 70 },
    { name: 'Docker', pct: 55 },
    { name: 'AWS', pct: 40 },
  ];

  const projects = [
    {
      name: 'Elevora AI',
      desc: 'An AI SaaS marketplace for Indian businesses — dental clinics, gyms, agencies. Shopify, for AI agents.',
      links: [
        { label: 'Live', href: '#' },
        { label: 'GitHub', href: 'https://github.com/Sudarshanhingalje' },
      ],
      active: true,
    },
    {
      name: 'ScrapSavvy',
      desc: 'Scrapyard management app with order tracking, built on React and Spring Boot.',
      links: [
        { label: 'GitHub', href: 'https://github.com/Sudarshanhingalje' },
      ],
      active: true,
    },
    {
      name: 'LensDock',
      desc: 'Local camera rental booking platform for the Kolhapur district.',
      links: [
        { label: 'Live', href: '#' },
      ],
      active: true,
    },
  ];

  const roadmaps = [
    { name: 'Java', href: '/tags/java' },
    { name: 'DSA', href: '/blog' },
    { name: 'Spring Boot', href: '/tags/spring' },
    { name: 'Linux', href: '/tags/linux' },
    { name: 'AWS', href: '/blog' },
    { name: 'System Design', href: '/blog' },
  ];

  const notes = [
    { tag: '#linux', text: 'rsync flags I always forget: -avz --progress --delete' },
    { tag: '#docker', text: 'docker system prune -a reclaims way more than you\'d expect.' },
    { tag: '#java', text: 'ConcurrentModificationException? You\'re mutating while iterating.' },
    { tag: '#spring', text: '@Transactional doesn\'t work on private methods — proxy limitation.' },
  ];

  return (
    <div className="space-y-12">
      
      {/* ── HERO SECTION ── */}
      <header className="pt-10 sm:pt-16 pb-8 px-4 max-w-3xl mx-auto space-y-6 select-none">
        <div className="space-y-4">
          <div className="font-mono text-xs sm:text-sm text-brand-green tracking-widest uppercase flex items-center gap-2">
            <span className="w-4 h-[1px] bg-brand-green-dim block"></span>
            HI, I'M SUDARSHAN 👋
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight tracking-tight text-ink dark:text-brand-ink">
            Documenting what I learn building <em className="italic text-brand-green">Elevora AI</em>, one chai at a time — Java, Spring, Linux, and the odd 2am debugging session.
          </h1>

          <div className="flex flex-wrap gap-2 pt-2">
            {['Java', 'Spring Boot', 'Docker', 'Linux', 'AWS', 'React', 'System Design', 'AI'].map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-ink/80 dark:text-brand-dim bg-brand-raised/40 dark:bg-brand-raised/85 border border-brand-line px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 font-mono text-xs text-ink/40 dark:text-brand-faint flex items-center gap-2">
            <span className="animate-bounce">↓</span> latest writing
          </div>
        </div>
      </header>

      {/* ── WRITING / BLOG FEED SECTION ── */}
      <section id="writing" className="border-t border-brand-line pt-10 px-4 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-8">
          <div>
            <div className="font-mono text-xs text-brand-green tracking-wider">// latest-writing</div>
            <h2 className="font-serif text-2xl font-semibold text-ink dark:text-brand-ink mt-1">Recent thoughts</h2>
          </div>
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-green border-brand-green-dim text-black font-semibold shadow-sm'
                    : 'bg-brand-raised/20 dark:bg-brand-raised/60 border-brand-line hover:border-brand-green/50 text-ink/80 dark:text-brand-dim hover:text-ink dark:hover:text-brand-ink'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-brand-raised/20 border border-dashed border-brand-line rounded-xl">
            <p className="text-ink/45 dark:text-brand-faint font-mono text-sm">No writing pieces found in this category.</p>
          </div>
        ) : (
          <ul className="divide-y divide-brand-line border-y border-brand-line">
            {filteredPosts.map((post) => (
              <li key={post.slug} className="group">
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-6 py-5 px-1 sm:px-2 transition-all duration-200 group-hover:pl-4 group-hover:bg-gradient-to-r group-hover:from-brand-green/[0.04] group-hover:to-transparent"
                >
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="text-brand-green-dim group-hover:text-brand-green font-mono transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                    <span className="font-serif text-lg text-ink dark:text-brand-ink font-medium leading-snug group-hover:text-brand-green transition-colors truncate">
                      {post.frontmatter.title}
                    </span>
                  </div>
                  <div className="font-mono text-xs text-ink/40 dark:text-brand-faint shrink-0 whitespace-nowrap text-left sm:text-right mt-1 sm:mt-0">
                    <span className="text-ink/70 dark:text-brand-dim">{post.readingTime}</span> · {post.frontmatter.date}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ── LEARNING JOURNEY ── */}
      <section id="journey" className="border-t border-brand-line pt-10 px-4 max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="font-mono text-xs text-brand-green tracking-wider">// today-im-learning</div>
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-brand-ink mt-1">Learning journey</h2>
        </div>

        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="grid grid-cols-[130px_1fr_42px] sm:grid-cols-[160px_1fr_42px] items-center gap-4 py-1.5">
              <div className="font-mono text-xs sm:text-sm text-ink dark:text-brand-ink truncate">{skill.name}</div>
              <div className="h-1.5 bg-brand-line rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-green-dim to-brand-green rounded-full transition-all duration-1000 ease-out"
                  style={{ width: animateProgress ? `${skill.pct}%` : '0%' }}
                />
              </div>
              <div className="font-mono text-xs text-ink/40 dark:text-brand-faint text-right">{skill.pct}%</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="border-t border-brand-line pt-10 px-4 max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="font-mono text-xs text-brand-green tracking-wider">// building</div>
          <h2 className="font-serif text-2xl font-semibold text-brand-ink mt-1">Projects</h2>
        </div>

        <div className="divide-y divide-brand-line border-y border-brand-line">
          {projects.map((proj) => (
            <div key={proj.name} className="flex flex-col sm:flex-row justify-between items-start gap-4 py-6">
              <div className="space-y-2">
                <div className="font-serif text-xl text-ink dark:text-brand-ink flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-green shadow-[0_0_8px_#8ecb2e]"></span>
                  {proj.name}
                </div>
                <p className="text-sm text-ink/80 dark:text-brand-dim max-w-lg leading-relaxed">{proj.desc}</p>
              </div>
              <div className="flex gap-4 font-mono text-xs text-ink/75 dark:text-brand-dim pt-1.5 shrink-0">
                {proj.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-green border-b border-transparent hover:border-brand-green-dim transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ROADMAPS ── */}
      <section id="roadmaps" className="border-t border-brand-line pt-10 px-4 max-w-3xl mx-auto">
        <div className="mb-6">
          <div className="font-mono text-xs text-brand-green tracking-wider">// self-paced</div>
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-brand-ink mt-1">Roadmaps</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-[1px] bg-brand-line border border-brand-line overflow-hidden rounded-xl">
          {roadmaps.map((map) => (
            <Link
              key={map.name}
              to={map.href}
              className="bg-cream dark:bg-brand-bg hover:bg-brand-raised/20 dark:hover:bg-brand-raised/50 p-5 font-mono text-sm text-ink/80 dark:text-brand-dim flex items-center justify-between border border-brand-line transition-colors group"
            >
              <span>{map.name}</span>
              <span className="text-brand-green-dim group-hover:text-brand-green group-hover:translate-x-1 transition-all">
                →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── QUICK SNIPPETS ── */}
      <section id="notes" className="border-t border-brand-line pt-10 px-4 max-w-3xl mx-auto">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <div className="font-mono text-xs text-brand-green tracking-wider">// quick-snippets</div>
            <h2 className="font-serif text-2xl font-semibold text-ink dark:text-brand-ink mt-1">Notes</h2>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
          {notes.map((note, index) => (
            <div
              key={index}
              className="flex-none w-56 sm:w-64 bg-brand-raised/35 dark:bg-brand-raised/75 border border-brand-line rounded-2xl p-5 snap-start space-y-2 hover:border-brand-green-dim transition-all duration-300"
            >
              <div className="font-mono text-xs text-brand-tea">{note.tag}</div>
              <p className="text-sm text-ink/80 dark:text-brand-dim leading-relaxed">{note.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="border-t border-brand-line py-10 px-4 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="font-mono text-xs text-brand-green tracking-wider">// stay-updated</div>
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-ink dark:text-brand-ink">Get new posts by email</h2>
            <p className="text-sm text-ink/80 dark:text-brand-dim max-w-sm">No spam, no fluff — just what I'm learning, roughly once a week.</p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full md:w-auto border border-brand-line rounded-lg overflow-hidden shrink-0 shadow-lg"
          >
            <input
              type="email"
              placeholder="you@email.com"
              required
              className="bg-brand-raised/40 dark:bg-brand-raised/85 px-4 py-3 text-sm font-mono text-ink dark:text-brand-ink placeholder-ink/40 dark:placeholder-brand-faint focus:outline-none w-full sm:w-56"
            />
            <button
              type="submit"
              className="bg-brand-green hover:bg-[#a3e83f] text-black font-mono font-semibold text-sm px-5 py-3 transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
