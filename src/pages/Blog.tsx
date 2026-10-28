import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { posts } from "@/content/blog";

export function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-5 py-14">
      <Seo
        title="Blog"
        description="Notes from MyWildin. Early posts are drafts waiting for the founder."
        path="/blog"
      />
      <p className="text-xs tracking-[0.22em] text-gold uppercase">Blog</p>
      <h1 className="mt-3 font-display text-5xl text-cream">Notes from the circle</h1>
      <p className="mt-3 text-mist">
        Two drafts are sitting here so the shelf isn’t empty. They are marked as drafts. Replace them.
      </p>
      <ul className="mt-8 grid gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="tarot block p-5 hover:border-gold">
              <div className="flex items-center gap-3 text-xs tracking-[0.16em] text-gold uppercase">
                {post.draft ? <span className="text-ember">Draft</span> : null}
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <h2 className="mt-2 font-display text-3xl text-cream">{post.title}</h2>
              <p className="mt-2 text-sm text-mist">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
