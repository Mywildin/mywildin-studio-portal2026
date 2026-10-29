import { Link, useParams } from "wouter";
import { Seo } from "@/components/Seo";
import { getPost } from "@/content/blog";

export function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getPost(params.slug ?? "");
  if (!post) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="text-4xl font-bold">That note isn’t here.</h1>
        <Link href="/blog" className="btn mt-4">
          Back to the blog
        </Link>
      </div>
    );
  }
  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-14">
      <Seo title={post.title} description={post.description} path={`/blog/${post.slug}`} />
      <Link href="/blog" className="mono">
        Blog
      </Link>
      {post.draft ? (
        <p className="mt-4 border border-ink bg-lime px-4 py-3 text-sm">
          Draft. This note is still being written.
        </p>
      ) : null}
      <h1 className="mt-4 text-5xl font-bold tracking-tight">{post.title}</h1>
      <time className="mono mt-2 block normal-case" dateTime={post.date}>
        {post.date}
      </time>
      <div
        className="prose prose-wild mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
