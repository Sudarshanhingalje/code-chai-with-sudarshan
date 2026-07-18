export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  tags: string[];
  category: string;
  coverImage?: string;
  author: string;
  featured?: boolean;
  draft?: boolean;
  [key: string]: any;
}

export interface ParsedPost {
  frontmatter: PostFrontmatter;
  content: string;
  slug: string;
  readingTime: string;
}

export function parseFrontmatter(markdownContent: string, slug: string = ''): ParsedPost {
  const lines = markdownContent.split('\n');
  let isFrontmatter = false;
  const frontmatterLines: string[] = [];
  const bodyLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '---') {
      if (!isFrontmatter && frontmatterLines.length === 0) {
        isFrontmatter = true;
        continue;
      } else if (isFrontmatter) {
        isFrontmatter = false;
        continue;
      }
    }

    if (isFrontmatter) {
      frontmatterLines.push(line);
    } else {
      bodyLines.push(line);
    }
  }

  const frontmatter: Partial<PostFrontmatter> = {};
  
  for (const line of frontmatterLines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let valStr = line.slice(colonIdx + 1).trim();

    if (!key) continue;

    // Parse value
    let value: any = valStr;

    // Remove quotes around the entire string if present
    if ((valStr.startsWith('"') && valStr.endsWith('"')) || (valStr.startsWith("'") && valStr.endsWith("'"))) {
      valStr = valStr.slice(1, -1);
      value = valStr;
    }

    // Check for boolean
    if (valStr.toLowerCase() === 'true') {
      value = true;
    } else if (valStr.toLowerCase() === 'false') {
      value = false;
    }
    // Check for array like [spring, java, backend]
    else if (valStr.startsWith('[') && valStr.endsWith(']')) {
      const arrayContent = valStr.slice(1, -1).trim();
      if (arrayContent) {
        value = arrayContent.split(',').map(item => {
          let cleaned = item.trim();
          if ((cleaned.startsWith('"') && cleaned.endsWith('"')) || (cleaned.startsWith("'") && cleaned.endsWith("'"))) {
            cleaned = cleaned.slice(1, -1);
          }
          return cleaned;
        });
      } else {
        value = [];
      }
    }
    // Check for number (avoid parsing dates like 2026-07-18 as numbers)
    else if (/^\d+$/.test(valStr)) {
      value = parseInt(valStr, 10);
    } else if (/^\d+\.\d+$/.test(valStr)) {
      value = parseFloat(valStr);
    }

    frontmatter[key] = value;
  }

  const content = bodyLines.join('\n').trim();
  
  // Compute reading time automatically from word count (~200 wpm)
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(wordCount / 200));
  const readingTime = `${minutes} min read`;

  // Default frontmatter fields if missing
  const parsedFrontmatter: PostFrontmatter = {
    title: frontmatter.title || 'Untitled Post',
    description: frontmatter.description || '',
    date: frontmatter.date || new Date().toISOString().split('T')[0],
    tags: frontmatter.tags || [],
    category: frontmatter.category || 'tech',
    coverImage: frontmatter.coverImage || '',
    author: frontmatter.author || 'Sudarshan',
    featured: frontmatter.featured ?? false,
    draft: frontmatter.draft ?? false,
    ...frontmatter
  };

  return {
    frontmatter: parsedFrontmatter,
    content,
    slug,
    readingTime
  };
}
