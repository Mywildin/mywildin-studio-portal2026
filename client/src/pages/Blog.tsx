/*
 * Blog Page — Obsidian Blueprint Theme
 * Lists all blog posts with the studio's engineering aesthetic
 */

import Navigation from "@/components/Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  }),
};

const posts = [
  {
    slug: "why-we-build-multi-agent-systems",
    categoryKey: "post.manifesto.category",
    titleKey: "post.manifesto.title",
    excerptKey: "post.manifesto.excerpt",
    dateKey: "post.manifesto.date",
    readTimeKey: "post.manifesto.readTime",
  },
  {
    slug: "us-market-trap",
    categoryKey: "post.fatePhilosophy.category",
    titleKey: "post.fatePhilosophy.title",
    excerptKey: "post.fatePhilosophy.excerpt",
    dateKey: "post.fatePhilosophy.date",
    readTimeKey: "post.fatePhilosophy.readTime",
  },
];

export default function Blog() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div initial="hidden" animate="visible">
          <motion.div variants={fadeUp} custom={0}>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-ice transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              {t("blog.backToStudio")}
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} custom={0.1} className="flex items-center gap-4 mb-4">
            <span className="text-xs tracking-[0.3em] uppercase text-ice/60" style={{ fontFamily: "var(--font-mono)" }}>
              {t("blog.tagline")}
            </span>
            <div className="h-px flex-1 max-w-[60px] bg-ice/30" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={0.15}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t("blog.title")}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={0.25}
            className="mt-4 text-lg text-muted-foreground max-w-2xl"
          >
            {t("blog.description")}
          </motion.p>
        </motion.div>

        {/* Post List */}
        <motion.div
          initial="hidden"
          animate="visible"
          className="mt-16 space-y-6"
        >
          {posts.map((post, i) => (
            <motion.div key={post.slug} variants={fadeUp} custom={0.3 + i * 0.1}>
              <Link href={`/blog/${post.slug}`}>
                <div className="blueprint-card rounded-lg p-8 group cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
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

                  <h2
                    className="text-xl sm:text-2xl font-semibold text-foreground group-hover:text-ice transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t(post.titleKey)}
                  </h2>

                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {t(post.excerptKey)}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-sm text-ice/70 group-hover:text-ice transition-colors">
                    <span>{t("blog.readMore")}</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{t("footer.copyright")}</p>
          <Link href="/" className="text-xs text-muted-foreground hover:text-ice transition-colors">
            {t("footer.backToStudio")}
          </Link>
        </div>
      </footer>
    </div>
  );
}
