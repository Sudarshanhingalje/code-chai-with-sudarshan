import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { PenTool, Download, Eye, Save, Trash2, Calendar, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import { saveLocalPost, getLocalPosts, deleteLocalPost } from '../utils/posts';

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
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  
  const [localPosts, setLocalPosts] = useState<any[]>([]);
  const [successMsg, setSuccessMsg] = useState('');

  // Load existing local posts
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please provide a Title and Content!');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    saveLocalPost({
      title,
      description: description || 'No description provided.',
      date,
      category,
      tags,
      coverImage: coverImage || '',
      author: 'Sudarshan',
      featured,
      draft,
      content,
    });

    setSuccessMsg('Post saved successfully to your browser storage!');
    setLocalPosts(getLocalPosts());
    clearForm();

    setTimeout(() => {
      setSuccessMsg('');
    }, 4000);
  };

  const handleDownload = () => {
    if (!title || !content) {
      alert('Please provide a Title and Content first to download!');
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    const tagsStr = `[${tags.join(', ')}]`;
    
    // Frontmatter template matching specs
    const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: ${date}
tags: ${tagsStr}
category: ${category}
coverImage: ${coverImage || ''}
author: Sudarshan
featured: ${featured}
draft: ${draft}
---

${content}`;

    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const fileName = `${getSlug()}.md`;
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = (slug: string) => {
    if (window.confirm('Are you sure you want to delete this locally added post?')) {
      deleteLocalPost(slug);
      setLocalPosts(getLocalPosts());
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-chai-500/20 bg-chai-50/5 text-chai-600 dark:text-chai-400 font-mono text-xs">
          <PenTool className="w-3.5 h-3.5" />
          <span>Post Dashboard</span>
        </div>
        <h1 className="font-serif font-black text-3xl sm:text-4xl text-ink dark:text-parchment">
          Draft &amp; Add New Blogs
        </h1>
        <p className="max-w-xl mx-auto text-sm text-mist/80 font-sans leading-relaxed">
          Write a post in Markdown, preview it in real-time, and save it directly in your browser.
          You can also download the `.md` file to commit to your GitHub repository!
        </p>
      </div>

      {/* Success Banner */}
      {successMsg && (
        <div className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-2xl font-mono text-sm">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Editor & Preview Tabs for Smaller Screens */}
      <div className="flex border-b border-mist/10 md:hidden mb-4">
        <button
          onClick={() => setActiveTab('edit')}
          className={`flex-1 py-2 text-sm font-mono flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'edit' ? 'border-brew-500 text-brew-600 dark:text-brew-400' : 'border-transparent text-mist'
          }`}
        >
          <FileText className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 py-2 text-sm font-mono flex items-center justify-center gap-2 border-b-2 transition-colors ${
            activeTab === 'preview' ? 'border-brew-500 text-brew-600 dark:text-brew-400' : 'border-transparent text-mist'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
      </div>

      {/* Main Grid: Form on left, live preview on right (for desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Editor */}
        <form
          onSubmit={handleSave}
          className={`space-y-5 md:col-span-7 bg-cream dark:bg-espresso p-6 rounded-2xl border border-mist/15 ${
            activeTab !== 'edit' ? 'hidden md:block' : ''
          }`}
        >
          <h2 className="font-serif font-bold text-xl text-ink dark:text-parchment border-b border-mist/10 pb-3 mb-4">
            Post Editor
          </h2>

          <div className="space-y-4 font-mono text-xs">
            
            {/* Title */}
            <div className="space-y-1">
              <label className="text-mist block">Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Spring Boot Performance Tuning"
                className="w-full bg-cream dark:bg-espresso text-ink dark:text-parchment border border-mist/20 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brew-500 outline-none"
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-mist block">Description (SEO Summary) *</label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g., Simple strategies to optimize Spring Boot heap usage and Startup speed."
                className="w-full bg-cream dark:bg-espresso text-ink dark:text-parchment border border-mist/20 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brew-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1">
                <label className="text-mist block">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-cream dark:bg-espresso text-ink dark:text-parchment border border-mist/20 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brew-500 outline-none"
                >
                  <option value="tech">Tech Notes</option>
                  <option value="journal">Journal / Life</option>
                  <option value="tutorial">Tutorial</option>
                  <option value="project">Projects</option>
                </select>
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-mist block">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-cream dark:bg-espresso text-ink dark:text-parchment border border-mist/20 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brew-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Tags */}
              <div className="space-y-1">
                <label className="text-mist block">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g., spring, java, microservices"
                  className="w-full bg-cream dark:bg-espresso text-ink dark:text-parchment border border-mist/20 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brew-500 outline-none"
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-1">
                <label className="text-mist block">Cover Image URL</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="e.g., https://picsum.photos/800/400"
                  className="w-full bg-cream dark:bg-espresso text-ink dark:text-parchment border border-mist/20 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-brew-500 outline-none"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex gap-6 items-center pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-brew-600 focus:ring-brew-500"
                />
                <span className="text-ink dark:text-parchment text-xs font-semibold">Featured Post</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft}
                  onChange={(e) => setDraft(e.target.checked)}
                  className="w-4 h-4 rounded text-brew-600 focus:ring-brew-500"
                />
                <span className="text-ink dark:text-parchment text-xs font-semibold">Mark as Draft</span>
              </label>
            </div>

            {/* Markdown content */}
            <div className="space-y-1 pt-2">
              <div className="flex justify-between items-center mb-1">
                <label className="text-mist block">Content (Markdown supported) *</label>
                <span className="text-[10px] text-brew-500">Auto-saves locally</span>
              </div>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your article body here... Use markdown headers (#), code blocks (```), or links."
                rows={12}
                className="w-full bg-cream dark:bg-espresso text-ink dark:text-parchment border border-mist/20 rounded-xl px-3 py-2 text-sm font-sans focus:ring-2 focus:ring-brew-500 outline-none resize-y"
              />
            </div>
            
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-mist/10">
            <button
              type="submit"
              className="flex-1 bg-brew-600 hover:bg-brew-700 text-cream font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-mono text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brew-500"
            >
              <Save className="w-4 h-4" />
              Save Post Locally
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="bg-chai-500 hover:bg-chai-600 text-cream font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-mono text-sm transition-all focus:outline-none focus:ring-2 focus:ring-chai-500"
            >
              <Download className="w-4 h-4" />
              Download .md File
            </button>
          </div>
        </form>

        {/* Right Column: Live Rendered Preview */}
        <div
          className={`space-y-4 md:col-span-5 ${
            activeTab !== 'preview' ? 'hidden md:block' : ''
          }`}
        >
          <div className="bg-cream dark:bg-espresso p-6 rounded-2xl border border-mist/15 h-[620px] flex flex-col">
            <h2 className="font-serif font-bold text-xl text-ink dark:text-parchment border-b border-mist/10 pb-3 mb-4 shrink-0 flex items-center gap-1.5">
              <Eye className="w-5 h-5 text-brew-500" />
              Live Preview
            </h2>

            {/* Scrollable Container for Preview */}
            <div className="overflow-y-auto flex-grow pr-1 space-y-4 font-sans text-sm">
              {!title && !content && (
                <div className="h-full flex flex-col items-center justify-center text-center text-mist/60 py-20 font-mono text-xs">
                  <FileText className="w-8 h-8 mb-2 stroke-1 opacity-50" />
                  <span>Your post preview will render here as you type.</span>
                </div>
              )}

              {/* Rendered details */}
              {(title || content) && (
                <div className="space-y-4">
                  {coverImage && (
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="w-full h-32 object-cover rounded-xl border border-mist/15"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono uppercase bg-chai-500/10 text-chai-600 dark:text-chai-400 px-2 py-0.5 rounded-full">
                        {category}
                      </span>
                      <span className="text-xs text-mist font-mono flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {date}
                      </span>
                    </div>

                    <h1 className="font-serif font-black text-2xl leading-tight text-ink dark:text-parchment">
                      {title || 'Untitled Post'}
                    </h1>
                    
                    {description && (
                      <p className="text-xs text-mist italic font-sans border-l-2 border-brew-500/40 pl-2">
                        {description}
                      </p>
                    )}
                  </div>

                  <hr className="border-mist/10" />

                  {/* Markdown Body preview */}
                  <div className="markdown-body prose dark:prose-invert prose-sm max-w-none text-ink dark:text-parchment text-sm">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {content || '*No content written yet.*'}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Local Posts Management section */}
      <section className="bg-cream/40 dark:bg-espresso/20 p-6 rounded-2xl border border-mist/10 mt-12">
        <h2 className="font-serif font-bold text-xl text-ink dark:text-parchment border-b border-mist/10 pb-3 mb-4">
          Manage Local Storage Blogs ({localPosts.length})
        </h2>

        {localPosts.length === 0 ? (
          <div className="text-center py-8 text-mist font-mono text-xs">
            No local posts created yet. Any posts you create and save locally will show up here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {localPosts.map((post) => (
              <div
                key={post.slug}
                className="flex items-start justify-between p-4 bg-cream dark:bg-espresso rounded-xl border border-mist/15 shadow-sm"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono uppercase bg-brew-500/10 text-brew-600 dark:text-brew-400 px-1.5 py-0.2 rounded">
                      {post.frontmatter.category}
                    </span>
                    <span className="text-[10px] text-mist font-mono">{post.frontmatter.date}</span>
                  </div>
                  <h3 className="font-serif font-bold text-sm text-ink dark:text-parchment line-clamp-1">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-[11px] text-mist line-clamp-1 font-mono">{post.slug}.md</p>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => {
                      // Navigate to post
                      navigate(`/blog/${post.slug}`);
                    }}
                    className="p-1.5 text-mist hover:text-brew-600 dark:hover:text-brew-400 hover:bg-mist/5 rounded-lg transition-all"
                    title="View post"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    className="p-1.5 text-mist hover:text-rose-600 rounded-lg hover:bg-rose-500/5 transition-all"
                    title="Delete local post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
