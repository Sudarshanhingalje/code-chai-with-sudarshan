import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Download, Eye, Save, Trash2, FileText, ChevronRight, CheckCircle2, EyeOff } from 'lucide-react';
import { saveLocalPost, getLocalPosts, deleteLocalPost } from '../utils/posts';
import 'highlight.js/styles/github-dark.css';

export const Write: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('tech');
  const [tagsInput, setTagsInput] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState('');
  const [featured, setFeatured] = useState(false);
  const [draft, setDraft] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [localPosts, setLocalPosts] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setLocalPosts(getLocalPosts());
  }, []);

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setCategory('tech');
    setTagsInput('');
    setCoverImage('');
    setDate(new Date().toISOString().split('T')[0]);
    setContent('');
    setFeatured(false);
    setDraft(false);
  };

  const getSlug = () => {
    const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `${date}-${cleanTitle || 'untitled'}`;
  };

  const parsedTags = () =>
    tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please provide a Title and Content!');
      return;
    }
    saveLocalPost({
      title,
      description: description || 'No description provided.',
      date,
      category,
      tags: parsedTags(),
      coverImage: coverImage || '',
      author: 'Sudarshan',
      featured,
      draft,
      content,
    });
    setSuccessMsg('Post saved to browser storage and visible on blog!');
    setLocalPosts(getLocalPosts());
    clearForm();
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleDownload = () => {
    if (!title || !content) {
      alert('Please provide a Title and Content first!');
      return;
    }
    const tags = parsedTags();
    const tagsStr = `[${tags.join(', ')}]`;
    const markdown = `---\ntitle: "${title.replace(/"/g, '\\"')}"\ndescription: "${description.replace(/"/g, '\\"')}"\ndate: ${date}\ntags: ${tagsStr}\ncategory: ${category}\ncoverImage: ${coverImage || ''}\nauthor: Sudarshan\nfeatured: ${featured}\ndraft: ${draft}\n---\n\n${content}`;
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${getSlug()}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (slug: string) => {
    if (window.confirm('Delete this locally saved post?')) {
      deleteLocalPost(slug);
      setLocalPosts(getLocalPosts());
    }
  };

  const inputClass =
    'w-full bg-transparent text-ink dark:text-brand-ink border border-brand-line rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-brand-green placeholder:text-ink/30 dark:placeholder:text-brand-faint transition-colors';

  const labelClass = 'block font-mono text-xs text-ink/50 dark:text-brand-dim mb-1';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-in fade-in duration-300">

      {/* Page Header — newsreader style */}
      <div className="mb-10">
        <div className="font-mono text-xs text-brand-green tracking-wider mb-1">// write</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink dark:text-brand-ink">
          New Post
        </h1>
        <p className="mt-2 text-sm text-ink/60 dark:text-brand-dim leading-relaxed">
          Write in Markdown. Save locally to preview instantly on the blog, or download the&nbsp;
          <code className="font-mono text-brand-green text-xs">.md</code> file to commit to GitHub.
        </p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="flex items-center gap-2 p-4 mb-6 bg-brand-green/10 border border-brand-green/30 text-brand-green rounded-xl font-mono text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSave} className="space-y-5">

        {/* Title */}
        <div>
          <label className={labelClass}>Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Java Developer Zero to Hero Roadmap"
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Description (SEO Summary)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A short summary of the post…"
            className={inputClass}
          />
        </div>

        {/* Category + Date */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="tech">Tech Notes</option>
              <option value="journal">Journal / Life</option>
              <option value="tutorial">Tutorial</option>
              <option value="roadmap">Roadmaps</option>
              <option value="project">Projects</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Tags + Cover Image */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="java, spring, devops"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Cover Image URL</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="/images/blog/cover.jpg"
              className={inputClass}
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex gap-6 items-center pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded accent-brand-green"
            />
            <span className="font-mono text-xs text-ink/70 dark:text-brand-dim">Featured Post</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={draft}
              onChange={(e) => setDraft(e.target.checked)}
              className="w-4 h-4 rounded accent-brand-green"
            />
            <span className="font-mono text-xs text-ink/70 dark:text-brand-dim">Mark as Draft</span>
          </label>
        </div>

        {/* Content / Preview toggle */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelClass}>Content (Markdown) *</label>
            <button
              type="button"
              onClick={() => setShowPreview((v) => !v)}
              className="flex items-center gap-1 font-mono text-[11px] text-brand-green hover:text-brand-green/80 transition-colors"
            >
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? 'Back to editor' : 'Preview'}
            </button>
          </div>

          {showPreview ? (
            <div className="min-h-[300px] border border-brand-line rounded-xl p-5 bg-brand-raised/30 overflow-y-auto">
              {coverImage && (
                <img
                  src={coverImage}
                  alt="Cover"
                  className="w-full h-40 object-cover rounded-lg mb-5 border border-brand-line"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              )}
              <div className="font-mono text-[10px] text-brand-green tracking-wider mb-1">
                {category} · {date}
              </div>
              <h2 className="font-serif text-2xl text-ink dark:text-brand-ink font-semibold mb-3 leading-snug">
                {title || 'Untitled Post'}
              </h2>
              {description && (
                <p className="text-sm text-ink/60 dark:text-brand-dim italic border-l-2 border-brand-green/40 pl-3 mb-4">
                  {description}
                </p>
              )}
              <hr className="border-brand-line mb-4" />
              <div className="markdown-body prose dark:prose-invert prose-sm max-w-none text-ink dark:text-brand-ink text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {content || '*No content yet.*'}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={`# Your Post Title\n\nStart writing in Markdown...\n\n## Section Heading\n\nYour content here.`}
              rows={16}
              className={`${inputClass} resize-y font-mono leading-relaxed`}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-brand-line">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border border-brand-green text-brand-green font-mono text-sm hover:bg-brand-green/10 transition-all focus:outline-none focus:ring-1 focus:ring-brand-green"
          >
            <Save className="w-4 h-4" />
            Save &amp; Publish Locally
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl border border-brand-line text-ink/60 dark:text-brand-dim font-mono text-sm hover:border-brand-green hover:text-brand-green transition-all focus:outline-none"
          >
            <Download className="w-4 h-4" />
            Download .md
          </button>
        </div>
      </form>

      {/* Locally saved posts — row list */}
      <section className="mt-14 border-t border-brand-line pt-8">
        <div className="mb-5">
          <div className="font-mono text-xs text-brand-green tracking-wider">// local-posts</div>
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-brand-ink mt-1">
            Your Saved Drafts ({localPosts.length})
          </h2>
        </div>

        {localPosts.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-brand-line rounded-xl">
            <FileText className="w-7 h-7 mx-auto mb-2 text-ink/20 dark:text-brand-faint stroke-1" />
            <p className="font-mono text-xs text-ink/40 dark:text-brand-faint">
              No locally saved posts yet. Save one above and it'll appear here and on the blog instantly.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-brand-line border-y border-brand-line">
            {localPosts.map((post) => (
              <li key={post.slug} className="group flex items-center justify-between gap-4 py-4 px-1">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="text-brand-green-dim font-mono text-sm shrink-0">→</span>
                  <div className="min-w-0">
                    <div className="font-serif text-base text-ink dark:text-brand-ink font-medium truncate group-hover:text-brand-green transition-colors">
                      {post.frontmatter.title}
                    </div>
                    <div className="font-mono text-[10px] text-ink/40 dark:text-brand-faint mt-0.5">
                      {post.frontmatter.category} · {post.frontmatter.date}
                      {post.frontmatter.draft && (
                        <span className="ml-2 text-amber-500/80">draft</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => navigate(`/blog/${post.slug}`)}
                    className="p-1.5 text-ink/30 dark:text-brand-faint hover:text-brand-green transition-colors rounded"
                    title="View post"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    className="p-1.5 text-ink/30 dark:text-brand-faint hover:text-red-500 transition-colors rounded"
                    title="Delete post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {localPosts.length > 0 && (
          <p className="mt-4 font-mono text-[11px] text-ink/35 dark:text-brand-faint text-center">
            These posts live in your browser. Download the <code className="text-brand-green">.md</code> file and commit it to GitHub to make them permanent.
          </p>
        )}
      </section>

    </div>
  );
};
