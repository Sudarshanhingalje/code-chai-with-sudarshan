import { parseFrontmatter } from './frontmatter';
import type { ParsedPost } from './frontmatter';

// Load all posts at build time using Vite's eager glob import
const rawPosts = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

// Function to extract slug from path
function getSlugFromPath(path: string): string {
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  return filename.replace(/\.md$/, '');
}

// Parse build-time posts
const buildTimePosts: ParsedPost[] = Object.entries(rawPosts).map(([path, content]) => {
  const slug = getSlugFromPath(path);
  return parseFrontmatter(content, slug);
});

// Key for local storage posts
const LOCAL_POSTS_KEY = 'code-chai-local-posts';

export interface LocalPost {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  featured: boolean;
  draft: boolean;
  content: string;
}

// Get posts from local storage
export function getLocalPosts(): ParsedPost[] {
  try {
    const data = localStorage.getItem(LOCAL_POSTS_KEY);
    if (!data) return [];
    const rawList = JSON.parse(data) as LocalPost[];
    return rawList.map((post) => {
      // Create markdown string to reuse frontmatter parser
      const tagsStr = `[${post.tags.join(', ')}]`;
      const markdown = `---
title: "${post.title.replace(/"/g, '\\"')}"
description: "${post.description.replace(/"/g, '\\"')}"
date: ${post.date}
tags: ${tagsStr}
category: ${post.category}
coverImage: ${post.coverImage}
author: ${post.author}
featured: ${post.featured}
draft: ${post.draft}
---
${post.content}`;
      
      const slug = `${post.date}-${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      return parseFrontmatter(markdown, slug);
    });
  } catch (e) {
    console.error('Error parsing local posts', e);
    return [];
  }
}

// Save a new post to local storage
export function saveLocalPost(post: LocalPost): void {
  try {
    const data = localStorage.getItem(LOCAL_POSTS_KEY);
    const list = data ? (JSON.parse(data) as LocalPost[]) : [];
    list.push(post);
    localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving local post', e);
  }
}

// Delete a local post (useful for managing added posts)
export function deleteLocalPost(slug: string): void {
  try {
    const data = localStorage.getItem(LOCAL_POSTS_KEY);
    if (!data) return;
    const list = JSON.parse(data) as LocalPost[];
    const filtered = list.filter((post) => {
      const postSlug = `${post.date}-${post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      return postSlug !== slug;
    });
    localStorage.setItem(LOCAL_POSTS_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error deleting local post', e);
  }
}

// Retrieve all posts (build-time + local storage), sorted by date descending
export function getAllPosts(): ParsedPost[] {
  const isDev = import.meta.env.DEV;
  
  // Combine build-time posts and local storage posts
  const localPosts = getLocalPosts();
  let all = [...buildTimePosts, ...localPosts];

  // Filter out drafts if in production
  if (!isDev) {
    all = all.filter((post) => !post.frontmatter.draft);
  }

  // Sort by date descending
  return all.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

// Retrieve a single post by slug
export function getPostBySlug(slug: string): ParsedPost | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug);
}

// Get related posts (by shared tag)
export function getRelatedPosts(currentPost: ParsedPost, limit = 3): ParsedPost[] {
  const allPosts = getAllPosts();
  const currentTags = currentPost.frontmatter.tags || [];
  
  if (currentTags.length === 0) {
    // Return latest posts excluding current
    return allPosts.filter((p) => p.slug !== currentPost.slug).slice(0, limit);
  }

  return allPosts
    .filter((p) => p.slug !== currentPost.slug)
    .map((post) => {
      const tags = post.frontmatter.tags || [];
      const matchCount = tags.filter((t) => currentTags.includes(t)).length;
      return { post, matchCount };
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .map((item) => item.post)
    .slice(0, limit);
}
