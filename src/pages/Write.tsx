import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import {
  Download, Eye, Save, Trash2, FileText, ChevronRight,
  CheckCircle2, EyeOff, GitBranch, Key, Loader2, AlertCircle, X,
} from 'lucide-react';
import { saveLocalPost, getLocalPosts, deleteLocalPost } from '../utils/posts';
import 'highlight.js/styles/github-dark.css';

// ── GitHub config ──────────────────────────────────────────────
const GH_OWNER = 'Sudarshanhingalje';
const GH_REPO  = 'code-chai-with-sudarshan';
const GH_BRANCH = 'main';
const POSTS_PATH = 'src/content/posts'; // path inside the repo

const PAT_KEY = 'gh_pat_code_chai'; // localStorage key for PAT

// ── GitHub API: commit a file ──────────────────────────────────
async function commitFileToGitHub(
  pat: string,
  filePath: string,   // e.g. src/content/posts/2026-07-18-my-post.md
  fileContent: string // raw markdown string
): Promise<void> {
  const apiBase = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${filePath}`;
  const encoded = btoa(unescape(encodeURIComponent(fileContent)));

  // Check if file already exists (to get its SHA for update)
  let sha: string | undefined;
  try {
    const check = await fetch(`${apiBase}?ref=${GH_BRANCH}`, {
      headers: { Authorization: `token ${pat}`, Accept: 'application/vnd.github+json' },
    });
    if (check.ok) {
      const data = await check.json();
      sha = data.sha;
    }
  } catch {/* new file, no SHA needed */}

  const body: Record<string, unknown> = {
    message: `publish: ${filePath.split('/').pop()}`,
    content: encoded,
    branch: GH_BRANCH,
  };
  if (sha) body.sha = sha;

  const res = await fetch(apiBase, {
    method: 'PUT',
    headers: {
      Authorization: `token ${pat}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || 'GitHub API error');
  }
}

export const Write: React.FC = () => {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle]           = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory]     = useState('tech');
  const [tagsInput, setTagsInput]   = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [date, setDate]             = useState(() => new Date().toISOString().split('T')[0]);
  const [content, setContent]       = useState('');
  const [featured, setFeatured]     = useState(false);
  const [draft, setDraft]           = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // GitHub PAT
  const [pat, setPat]               = useState(() => localStorage.getItem(PAT_KEY) || '');
  const [showPatPanel, setShowPatPanel] = useState(false);
  const [patInput, setPatInput]     = useState('');

  // UI state
  const [localPosts, setLocalPosts] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg]     = useState('');
  const [publishing, setPublishing] = useState(false);

  useEffect(() => { setLocalPosts(getLocalPosts()); }, []);

  // ── Helpers ────────────────────────────────────────────────
  const clearForm = () => {
    setTitle(''); setDescription(''); setCategory('tech');
    setTagsInput(''); setCoverImage('');
    setDate(new Date().toISOString().split('T')[0]);
    setContent(''); setFeatured(false); setDraft(false);
  };

  const parsedTags = () =>
    tagsInput.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0);

  const getSlug = () => {
    const clean = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `${date}-${clean || 'untitled'}`;
  };

  const buildMarkdown = () => {
    const tags = parsedTags();
    const tagsStr = `[${tags.join(', ')}]`;
    return `---\ntitle: "${title.replace(/"/g, '\\"')}"\ndescription: "${description.replace(/"/g, '\\"')}"\ndate: ${date}\ntags: ${tagsStr}\ncategory: ${category}\ncoverImage: ${coverImage || ''}\nauthor: Sudarshan\nfeatured: ${featured}\ndraft: ${draft}\n---\n\n${content}`;
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg); setErrorMsg('');
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const showError = (msg: string) => {
    setErrorMsg(msg); setSuccessMsg('');
    setTimeout(() => setErrorMsg(''), 7000);
  };

  // ── Save PAT ───────────────────────────────────────────────
  const savePat = () => {
    const trimmed = patInput.trim();
    if (!trimmed) return;
    localStorage.setItem(PAT_KEY, trimmed);
    setPat(trimmed);
    setPatInput('');
    setShowPatPanel(false);
    showSuccess('GitHub token saved! You can now publish directly to GitHub.');
  };

  const removePat = () => {
    localStorage.removeItem(PAT_KEY);
    setPat('');
    setShowPatPanel(false);
  };

  // ── Publish to GitHub ──────────────────────────────────────
  const handlePublishToGitHub = async () => {
    if (!title || !content) { showError('Please fill in Title and Content first.'); return; }
    if (!pat) { setShowPatPanel(true); return; }

    setPublishing(true);
    try {
      const slug     = getSlug();
      const filePath = `${POSTS_PATH}/${slug}.md`;
      const markdown = buildMarkdown();
      await commitFileToGitHub(pat, filePath, markdown);
      showSuccess('🎉 Published to GitHub! Your post is live in ~2 minutes.');
      clearForm();
    } catch (err: any) {
      showError(`GitHub error: ${err.message}`);
    } finally {
      setPublishing(false);
    }
  };

  // ── Save locally (browser only) ────────────────────────────
  const handleSaveLocally = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) { alert('Please provide a Title and Content!'); return; }
    saveLocalPost({
      title, description: description || 'No description provided.', date,
      category, tags: parsedTags(), coverImage: coverImage || '',
      author: 'Sudarshan', featured, draft, content,
    });
    showSuccess('Post saved to browser storage and visible on blog (this device only).');
    setLocalPosts(getLocalPosts());
    clearForm();
  };

  // ── Download .md ───────────────────────────────────────────
  const handleDownload = () => {
    if (!title || !content) { alert('Please provide a Title and Content first!'); return; }
    const blob = new Blob([buildMarkdown()], { type: 'text/markdown;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href  = url;
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

  // ── Styles ─────────────────────────────────────────────────
  const inputClass =
    'w-full bg-transparent text-ink dark:text-brand-ink border border-brand-line rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-brand-green placeholder:text-ink/30 dark:placeholder:text-brand-faint transition-colors';
  const labelClass = 'block font-mono text-xs text-ink/50 dark:text-brand-dim mb-1';

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 animate-in fade-in duration-300">

      {/* Header */}
      <div className="mb-8">
        <div className="font-mono text-xs text-brand-green tracking-wider mb-1">// write</div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-ink dark:text-brand-ink">
              New Post
            </h1>
            <p className="mt-1.5 text-sm text-ink/60 dark:text-brand-dim leading-relaxed max-w-lg">
              Write in Markdown and publish directly to GitHub — GitHub Actions will
              build and deploy your post automatically within ~2 minutes.
            </p>
          </div>

          {/* GitHub PAT status badge */}
          <button
            type="button"
            onClick={() => setShowPatPanel((v) => !v)}
            title={pat ? 'GitHub token connected' : 'Connect GitHub token'}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs transition-all ${
              pat
                ? 'border-brand-green text-brand-green bg-brand-green/5'
                : 'border-brand-line text-ink/40 dark:text-brand-faint hover:border-brand-green hover:text-brand-green'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            {pat ? 'Connected' : 'Connect GitHub'}
          </button>
        </div>
      </div>

      {/* GitHub PAT Panel */}
      {showPatPanel && (
        <div className="mb-6 p-5 border border-brand-line rounded-xl bg-brand-raised/20 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-sm text-ink dark:text-brand-ink">
              <Key className="w-4 h-4 text-brand-green" />
              GitHub Personal Access Token
            </div>
            <button onClick={() => setShowPatPanel(false)} className="text-ink/30 hover:text-ink dark:hover:text-brand-ink">
              <X className="w-4 h-4" />
            </button>
          </div>

          <ol className="font-mono text-xs text-ink/50 dark:text-brand-dim space-y-1 list-decimal list-inside">
            <li>Go to <a href="https://github.com/settings/tokens/new" target="_blank" rel="noopener noreferrer" className="text-brand-green underline">github.com/settings/tokens/new</a></li>
            <li>Set expiration → select <strong className="text-ink dark:text-brand-ink">Contents</strong> → read &amp; write</li>
            <li>Click <strong className="text-ink dark:text-brand-ink">Generate token</strong> → paste below</li>
          </ol>

          <div className="flex gap-2">
            <input
              type="password"
              value={patInput}
              onChange={(e) => setPatInput(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              className={`${inputClass} flex-1`}
              onKeyDown={(e) => { if (e.key === 'Enter') savePat(); }}
            />
            <button
              onClick={savePat}
              className="px-4 py-2 rounded-lg border border-brand-green text-brand-green font-mono text-xs hover:bg-brand-green/10 transition-all"
            >
              Save
            </button>
          </div>

          {pat && (
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-brand-green flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Token saved
              </span>
              <button onClick={removePat} className="text-red-400 hover:text-red-500">
                Remove token
              </button>
            </div>
          )}

          <p className="text-[11px] font-mono text-ink/30 dark:text-brand-faint">
            Your token is stored only in your browser (localStorage). It is never sent to any server other than GitHub's API.
          </p>
        </div>
      )}

      {/* Success / Error banners */}
      {successMsg && (
        <div className="flex items-center gap-2 p-4 mb-5 bg-brand-green/10 border border-brand-green/30 text-brand-green rounded-xl font-mono text-xs">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}
      {errorMsg && (
        <div className="flex items-center gap-2 p-4 mb-5 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl font-mono text-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSaveLocally} className="space-y-5">

        <div>
          <label className={labelClass}>Title *</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Java Developer Zero to Hero Roadmap" className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Description (SEO Summary)</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="A short summary of the post…" className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
              <option value="tech">Tech Notes</option>
              <option value="journal">Journal / Life</option>
              <option value="tutorial">Tutorial</option>
              <option value="roadmap">Roadmaps</option>
              <option value="project">Projects</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Tags (comma separated)</label>
            <input type="text" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
              placeholder="java, spring, devops" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Cover Image URL</label>
            <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)}
              placeholder="/images/blog/cover.jpg" className={inputClass} />
          </div>
        </div>

        <div className="flex gap-6 items-center pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded accent-brand-green" />
            <span className="font-mono text-xs text-ink/70 dark:text-brand-dim">Featured Post</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" checked={draft} onChange={(e) => setDraft(e.target.checked)}
              className="w-4 h-4 rounded accent-brand-green" />
            <span className="font-mono text-xs text-ink/70 dark:text-brand-dim">Mark as Draft</span>
          </label>
        </div>

        {/* Content / Preview */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className={labelClass}>Content (Markdown) *</label>
            <button type="button" onClick={() => setShowPreview((v) => !v)}
              className="flex items-center gap-1 font-mono text-[11px] text-brand-green hover:text-brand-green/80 transition-colors">
              {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showPreview ? 'Back to editor' : 'Preview'}
            </button>
          </div>

          {showPreview ? (
            <div className="min-h-[300px] border border-brand-line rounded-xl p-5 bg-brand-raised/30 overflow-y-auto">
              {coverImage && (
                <img src={coverImage} alt="Cover"
                  className="w-full h-40 object-cover rounded-lg mb-5 border border-brand-line"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              )}
              <div className="font-mono text-[10px] text-brand-green tracking-wider mb-1">{category} · {date}</div>
              <h2 className="font-serif text-2xl text-ink dark:text-brand-ink font-semibold mb-3 leading-snug">
                {title || 'Untitled Post'}
              </h2>
              {description && (
                <p className="text-sm text-ink/60 dark:text-brand-dim italic border-l-2 border-brand-green/40 pl-3 mb-4">{description}</p>
              )}
              <hr className="border-brand-line mb-4" />
              <div className="markdown-body prose dark:prose-invert prose-sm max-w-none text-ink dark:text-brand-ink text-sm">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {content || '*No content yet.*'}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <textarea required value={content} onChange={(e) => setContent(e.target.value)}
              placeholder={`# Your Post Title\n\nStart writing in Markdown...\n\n## Section\n\nYour content here.`}
              rows={16} className={`${inputClass} resize-y font-mono leading-relaxed`} />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-brand-line">

          {/* PRIMARY — Publish to GitHub */}
          <button
            type="button"
            onClick={handlePublishToGitHub}
            disabled={publishing}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-brand-green text-brand-bg font-mono text-sm font-bold hover:opacity-90 disabled:opacity-50 transition-all focus:outline-none focus:ring-1 focus:ring-brand-green"
          >
            {publishing ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Publishing…</>
            ) : (
              <><GitBranch className="w-4 h-4" /> Publish to GitHub</>
            )}
          </button>

          {/* Save locally */}
          <button type="submit"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-brand-line text-ink/60 dark:text-brand-dim font-mono text-sm hover:border-brand-green hover:text-brand-green transition-all focus:outline-none">
            <Save className="w-4 h-4" />
            Save Locally
          </button>

          {/* Download */}
          <button type="button" onClick={handleDownload}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-brand-line text-ink/60 dark:text-brand-dim font-mono text-sm hover:border-brand-green hover:text-brand-green transition-all focus:outline-none">
            <Download className="w-4 h-4" />
            .md
          </button>
        </div>

        {/* GitHub publish hint */}
        <p className="font-mono text-[11px] text-ink/30 dark:text-brand-faint text-center -mt-1">
          <span className="text-brand-green">Publish to GitHub</span> commits the post directly to your repo → GitHub Actions builds &amp; deploys automatically (~2 min).
          {!pat && <span className="ml-1 text-amber-400/70">Connect your GitHub token first ↗</span>}
        </p>

      </form>

      {/* Locally saved posts */}
      <section className="mt-14 border-t border-brand-line pt-8">
        <div className="mb-5">
          <div className="font-mono text-xs text-brand-green tracking-wider">// local-drafts</div>
          <h2 className="font-serif text-2xl font-semibold text-ink dark:text-brand-ink mt-1">
            Browser Drafts ({localPosts.length})
          </h2>
          <p className="font-mono text-xs text-ink/40 dark:text-brand-faint mt-1">
            Visible only on this device. Use "Publish to GitHub" to make them permanent.
          </p>
        </div>

        {localPosts.length === 0 ? (
          <div className="text-center py-10 border border-dashed border-brand-line rounded-xl">
            <FileText className="w-7 h-7 mx-auto mb-2 text-ink/20 dark:text-brand-faint stroke-1" />
            <p className="font-mono text-xs text-ink/40 dark:text-brand-faint">No local drafts yet.</p>
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
                      {post.frontmatter.draft && <span className="ml-2 text-amber-500/80">draft</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => navigate(`/blog/${post.slug}`)}
                    className="p-1.5 text-ink/30 dark:text-brand-faint hover:text-brand-green transition-colors rounded" title="View">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(post.slug)}
                    className="p-1.5 text-ink/30 dark:text-brand-faint hover:text-red-500 transition-colors rounded" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

    </div>
  );
};
