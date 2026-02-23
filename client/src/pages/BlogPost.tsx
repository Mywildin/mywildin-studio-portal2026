/*
 * BlogPost Page — Obsidian Blueprint Theme
 * Renders individual blog articles
 */

import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { Link, useParams } from "wouter";

interface PostData {
  categoryKey: string;
  titleKey: string;
  subtitleKey: string;
  dateKey: string;
  readTimeKey: string;
  paragraphKeys: string[];
}

const postMap: Record<string, PostData> = {
  "why-we-build-multi-agent-systems": {
    categoryKey: "post.manifesto.category",
    titleKey: "post.manifesto.title",
    subtitleKey: "post.manifesto.subtitle",
    dateKey: "post.manifesto.date",
    readTimeKey: "post.manifesto.readTime",
    paragraphKeys: [
      "post.manifesto.p1",
      "post.manifesto.p2",
      "post.manifesto.p3",
      "post.manifesto.p4",
      "post.manifesto.p5",
      "post.manifesto.p6",
      "post.manifesto.p7",
      "post.manifesto.p8",
    ],
  },
  "us-market-trap": {
    categoryKey: "post.fatePhilosophy.category",
    titleKey: "post.fatePhilosophy.title",
    subtitleKey: "post.fatePhilosophy.subtitle",
    dateKey: "post.fatePhilosophy.date",
    readTimeKey: "post.fatePhilosophy.readTime",
    paragraphKeys: [
      "post.fatePhilosophy.p1",
      "post.fatePhilosophy.p2",
      "post.fatePhilosophy.p3",
      "post.fatePhilosophy.p4",
      "post.fatePhilosophy.p5",
      "post.fatePhilosophy.p6",
      "post.fatePhilosophy.p7",
      "post.fatePhilosophy.p8",
      "post.fatePhilosophy.p9",
      "post.fatePhilosophy.p10",
    ],
  },
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const post = slug ? postMap[slug] : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-3xl mx-auto px-6 pt-32 text-center">
          <h1
            className="text-3xl font-bold text-foreground mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("blog.notFound")}
          </h1>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-ice hover:text-ice-glow transition-colors"
          >
            <ArrowLeft size={14} />
            {t("blog.backToWritings")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ice transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            {t("blog.backToWritings")}
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="text-xs tracking-[0.2em] uppercase text-ice/60"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t(post.categoryKey)}
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">{t(post.dateKey)}</span>
            <span className="text-muted-foreground">·</span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={12} />
              {t(post.readTimeKey)}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t(post.titleKey)}
          </h1>

          <p className="mt-4 text-xl text-ice/70 italic">
            {t(post.subtitleKey)}
          </p>

          <div className="mt-10 h-px bg-border" />
        </motion.div>

        {/* Post Body */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 space-y-6"
        >
          {post.paragraphKeys.map((key, i) => (
            <p
              key={i}
              className={`text-lg leading-relaxed ${
                i === 0
                  ? "text-foreground font-medium text-xl"
                  : "text-muted-foreground"
              }`}
            >
              {t(key)}
            </p>
          ))}
        </motion.div>

        {/* Bottom divider */}
        <div className="mt-16 h-px bg-border" />

        {/* Back to blog */}
        <div className="mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ice transition-colors"
          >
            <ArrowLeft size={14} />
            {t("blog.backToWritings")}
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{t("footer.copyright")}</p>
          <Link href="/" className="text-xs text-muted-foreground hover:text-ice transition-colors">
            {t("footer.backToStudio")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
