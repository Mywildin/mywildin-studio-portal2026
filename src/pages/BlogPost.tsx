import { Link, useParams } from "wouter";
import { Seo } from "@/components/Seo";
import { getPost } from "@/content/blog";

export function BlogPostPage() {
  const params = useParams<{ slug: string }>();
  const post = getPost(params.slug ?? "");
  if (!post) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <h1 className="font-display text-4xl text-cream">That note isn’t here.</h1>
        <Link href="/blog" className="mt-4 inline-flex text-gold">
          Back to the blog
        </Link>
      </div>
    );
  }
  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-14">
      <Seo title={post.title} description={post.description} path={`/blog/${post.slug}`} />
      <Link href="/blog" className="text-sm text-gold">
        Blog
      </Link>
      {post.draft ? (
        <p className="mt-4 rounded-2xl border border-ember/50 bg-ember/10 px-4 py-3 text-sm text-gold-2">
          Draft. This note is still being written.
        </p>
      ) : null}
      <h1 className="mt-4 font-display text-5xl text-cream">{post.title}</h1>
      <time className="mt-2 block text-sm text-mist" dateTime={post.date}>
        {post.date}
      </time>
      <div
        className="prose prose-wild mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
