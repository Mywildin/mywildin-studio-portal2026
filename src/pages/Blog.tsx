import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { posts } from "@/content/blog";

export function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14">
      <Seo
        title="Blog"
        description="Notes from MyWildin on how the quiz works and what it is for."
        path="/blog"
      />
      <p className="mono uppercase">Blog</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">Notes</h1>
      <p className="mt-3">Short notes on how MyWildin works and why it exists.</p>
      <ul className="mt-8 grid gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="block border border-ink p-5">
              <div className="mono flex items-center gap-3">
                {post.draft ? <span>Draft</span> : null}
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <h2 className="mt-2 text-3xl font-bold">{post.title}</h2>
              <p className="mt-2 text-sm">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
