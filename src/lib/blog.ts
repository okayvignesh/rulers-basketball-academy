import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  coverImage: string;
  coverAlt: string;
  tags: string[];
  category: string;
  readingTime: number;
  wordCount: number;
  content: string;
  html: string;
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

marked.setOptions({ gfm: true, breaks: false });

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function loadPost(slug: string): BlogPost {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const html = marked.parse(content, { async: false }) as string;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Rulers Basketball Academy Coaching Team"),
    coverImage: String(data.coverImage ?? ""),
    coverAlt: String(data.coverAlt ?? data.title ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    category: String(data.category ?? "Basketball"),
    readingTime,
    wordCount,
    content,
    html,
  };
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map(loadPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): BlogPost | null {
  try {
    return loadPost(slug);
  } catch {
    return null;
  }
}

export function getRelatedPosts(
  current: BlogPost,
  limit = 3
): BlogPost[] {
  const all = getAllPosts().filter((p) => p.slug !== current.slug);
  const currentTags = new Set(current.tags);
  const scored = all.map((p) => ({
    post: p,
    score: p.tags.filter((t) => currentTags.has(t)).length,
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
