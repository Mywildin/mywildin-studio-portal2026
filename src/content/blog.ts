import { marked } from "marked";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  draft: boolean;
  body: string;
  html: string;
}

interface Frontmatter {
  title: string;
  description: string;
  date: string;
  draft: boolean;
}

const files = import.meta.glob("../../content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) throw new Error("Blog post is missing frontmatter");
  const data: Record<string, string | boolean> = {};
  for (const line of match[1].split("\n")) {
    const split = line.indexOf(":");
    if (split === -1) continue;
    const key = line.slice(0, split).trim();
    let value: string | boolean = line.slice(split + 1).trim().replace(/^["']|["']$/g, "");
    if (value === "true") value = true;
    if (value === "false") value = false;
    data[key] = value;
  }
  return {
    data: {
      title: String(data.title ?? "Untitled"),
      description: String(data.description ?? ""),
      date: String(data.date ?? ""),
      draft: data.draft === true,
    },
    body: match[2].trim(),
  };
}

function slugFromPath(path: string): string {
  const file = path.split("/").pop() ?? path;
  return file.replace(/\.md$/, "");
}

export const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      slug: slugFromPath(path),
      ...data,
      body,
      html: marked.parse(body, { async: false }) as string,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
