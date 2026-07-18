import React from 'react';
import { Link } from 'react-router-dom';
import { Archive as ArchiveIcon, ArrowUpRight } from 'lucide-react';
import { getAllPosts } from '../utils/posts';
import type { ParsedPost } from '../utils/frontmatter';

interface GroupedPosts {
  [year: string]: {
    [month: string]: ParsedPost[];
  };
}

export const Archive: React.FC = () => {
  const allPosts = getAllPosts();

  // Helper to get month name
  const getMonthName = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString('default', { month: 'long' });
  };

  // Helper to get year
  const getYear = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.getFullYear().toString();
  };

  // Group posts by Year, then by Month
  const grouped: GroupedPosts = allPosts.reduce((acc, post) => {
    const dateStr = post.frontmatter.date;
    const year = getYear(dateStr);
    const month = getMonthName(dateStr);

    if (!acc[year]) {
      acc[year] = {};
    }
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    acc[year][month].push(post);
    return acc;
  }, {} as GroupedPosts);

  // Sorted years (descending)
  const sortedYears = Object.keys(grouped).sort((a, b) => parseInt(b) - parseInt(a));

  // Months sorting order helper
  const monthOrder = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getSortedMonths = (year: string) => {
    return Object.keys(grouped[year]).sort((a, b) => monthOrder.indexOf(b) - monthOrder.indexOf(a));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brew-500/20 bg-brew-500/5 text-brew-600 dark:text-brew-400 font-mono text-xs">
          <ArchiveIcon className="w-3.5 h-3.5" />
          <span>Timeline Chronicle</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-ink dark:text-parchment tracking-tight">
          Blog Archive
        </h1>
        <p className="max-w-md mx-auto text-sm text-mist/80 font-sans leading-relaxed">
          A full chronological listing of every thought, project, and journal log published.
        </p>
      </div>

      {allPosts.length === 0 ? (
        <div className="text-center py-20 bg-cream/40 dark:bg-espresso/10 rounded-2xl border border-dashed border-mist/15 font-mono text-sm text-mist">
          No articles found to archive.
        </div>
      ) : (
        /* Timeline group */
        <div className="space-y-12 relative before:absolute before:left-3.5 sm:before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-mist/15">
          {sortedYears.map((year) => (
            <div key={year} className="space-y-8 relative">
              
              {/* Year marker */}
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-brew-600 border border-brew-700 text-cream flex items-center justify-center font-mono text-xs sm:text-sm font-bold shadow-md shadow-brew-500/10">
                  {year}
                </div>
                <h2 className="font-serif font-black text-2xl text-ink dark:text-parchment">
                  {year}
                </h2>
              </div>

              {/* Months inside year */}
              <div className="space-y-6 pl-10 sm:pl-16">
                {getSortedMonths(year).map((month) => (
                  <div key={month} className="space-y-3 relative">
                    
                    {/* Month Heading */}
                    <div className="relative before:absolute before:-left-7 sm:before:-left-11 before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-chai-500">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-chai-600 dark:text-chai-400">
                        {month}
                      </h3>
                    </div>

                    {/* Posts under month */}
                    <div className="space-y-2">
                      {grouped[year][month].map((post) => {
                        const day = new Date(post.frontmatter.date).getDate();
                        const padDay = day < 10 ? `0${day}` : day.toString();
                        return (
                          <div
                            key={post.slug}
                            className="group flex items-start gap-4 p-2.5 rounded-xl border border-transparent hover:border-mist/15 hover:bg-mist/5 transition-all duration-200"
                          >
                            {/* Day number */}
                            <span className="font-mono text-xs text-mist pt-0.5 shrink-0 select-none">
                              {padDay}
                            </span>
                            
                            {/* Title link & category */}
                            <div className="flex-grow space-y-1">
                              <Link
                                to={`/blog/${post.slug}`}
                                className="font-sans font-semibold text-sm sm:text-base text-ink dark:text-parchment group-hover:text-brew-600 dark:group-hover:text-brew-400 flex items-start gap-1 focus:outline-none"
                              >
                                <span className="line-clamp-1">{post.frontmatter.title}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                              </Link>
                              
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono uppercase bg-chai-500/10 text-chai-600 dark:text-chai-400 px-1.5 py-0.2 rounded">
                                  {post.frontmatter.category}
                                </span>
                                <span className="text-[10px] text-mist font-mono">{post.readingTime}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
