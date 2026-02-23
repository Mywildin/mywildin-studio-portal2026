import { ArrowRight, Brain, Cpu, ExternalLink, Mail, Network, Target, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

const HERO_BG = "https://cdn.manus.space/webdev-static-assets/obsidian-hero-bg.png";
const ENGINE_BG = "https://cdn.manus.space/webdev-static-assets/engine-module-bg.png";
const GTM_BG = "https://cdn.manus.space/webdev-static-assets/gtm-strategy-bg.png";
const ABOUT_BG = "https://cdn.manus.space/webdev-static-assets/about-section-bg.png";

export default function Home() {
  const { t } = useLanguage();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: custom,
        ease: [0.25, 0.1, 0.25, 1.0] as any,
      },
    }),
  };

  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-xs tracking-[0.3em] uppercase text-ice/60 mb-6"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              MyWildin Studio
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground tracking-tight leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#engine"
                className="px-8 py-4 bg-ice text-obsidian font-semibold text-sm rounded hover:shadow-[0_0_30px_oklch(0.65_0.15_250/30%)] transition-all"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("hero.cta.explore")} <ArrowRight size={16} className="inline ml-2" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-ice/30 text-ice font-semibold text-sm rounded hover:bg-ice/5 transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("hero.cta.contact")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          [01] THE ENGINE — Multi-Agent Interaction Engine
          ═══════════════════════════════════════════════════════ */}
      <section id="engine" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ENGINE_BG} alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 mb-4">
              <span className="section-number">[01]</span>
              <div className="h-px flex-1 max-w-[60px] bg-ice/30" />
              <span className="text-xs tracking-[0.3em] uppercase text-ice/60">{t("engine.label")}</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("engine.title")}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed"
            >
              {t("engine.intro")}
            </motion.p>
          </motion.div>

          {/* Core Capabilities */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-16"
          >
            <motion.div variants={fadeUp} custom={0}>
              <h3
                className="text-sm tracking-[0.2em] uppercase text-ice/60 mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("engine.cap.label")}
              </h3>
              <p className="text-base text-muted-foreground mb-8">{t("engine.cap.intro")}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Brain, key: "engine.cap1" },
                { icon: Network, key: "engine.cap2" },
                { icon: Cpu, key: "engine.cap3" },
              ].map((cap, i) => (
                <motion.div
                  key={cap.key}
                  variants={fadeUp}
                  custom={0.1 + i * 0.1}
                  className="blueprint-card rounded-lg p-6 flex items-start gap-4"
                >
                  <cap.icon size={24} className="text-ice mt-1 shrink-0" strokeWidth={1.5} />
                  <p className="text-sm text-slate-200 leading-relaxed">{t(cap.key)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enterprise Application Matrix */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-20"
          >
            <motion.div variants={fadeUp} custom={0}>
              <h3
                className="text-sm tracking-[0.2em] uppercase text-ice/60 mb-4"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("engine.useCases.label")}
              </h3>
              <p className="text-base text-muted-foreground mb-10">{t("engine.useCases.intro")}</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { icon: Users, titleKey: "engine.useCase1.title", painKey: "engine.useCase1.pain", solutionKey: "engine.useCase1.solution" },
                { icon: Target, titleKey: "engine.useCase2.title", painKey: "engine.useCase2.pain", solutionKey: "engine.useCase2.solution" },
                { icon: Zap, titleKey: "engine.useCase3.title", painKey: "engine.useCase3.pain", solutionKey: "engine.useCase3.solution" },
              ].map((uc, i) => (
                <motion.div
                  key={uc.titleKey}
                  variants={fadeUp}
                  custom={0.1 + i * 0.1}
                  className="blueprint-card rounded-lg p-8"
                >
                  <uc.icon size={28} className="text-ice mb-5" strokeWidth={1.5} />
                  <h4
                    className="text-lg font-semibold text-foreground mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {t(uc.titleKey)}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{t(uc.painKey)}</p>
                  <p className="text-sm text-slate-200 leading-relaxed">{t(uc.solutionKey)}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Wildin App Link */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12"
          >
            <motion.a
              variants={fadeUp}
              custom={0.2}
              href="https://wildin.replit.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-ice hover:text-ice-glow transition-colors group"
            >
              <ExternalLink size={14} />
              <span>{t("engine.liveDemo")}</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          [02] GTM STRATEGY — Cross-Border AI Localization
          ═══════════════════════════════════════════════════════ */}
      <section id="gtm" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={GTM_BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 mb-4">
              <span className="section-number">[02]</span>
              <div className="h-px flex-1 max-w-[60px] bg-ice/30" />
              <span className="text-xs tracking-[0.3em] uppercase text-ice/60">{t("gtm.label")}</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("gtm.title")}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed"
            >
              {t("gtm.description")}
            </motion.p>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            {[
              { titleKey: "gtm.svc1.title", descKey: "gtm.svc1.desc" },
              { titleKey: "gtm.svc2.title", descKey: "gtm.svc2.desc" },
              { titleKey: "gtm.svc3.title", descKey: "gtm.svc3.desc" },
            ].map((svc, i) => (
              <motion.div
                key={svc.titleKey}
                variants={fadeUp}
                custom={0.1 + i * 0.1}
                className="blueprint-card rounded-lg p-8"
              >
                <h3
                  className="text-lg font-semibold text-foreground mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t(svc.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(svc.descKey)}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Success Cases */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mt-20"
          >
            <motion.div variants={fadeUp} custom={0}>
              <h3
                className="text-sm tracking-[0.2em] uppercase text-ice/60 mb-10"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t("gtm.cases.label")}
              </h3>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  clientKey: "gtm.case1.client",
                  industryKey: "gtm.case1.industry",
                  challengeKey: "gtm.case1.challenge",
                  solutionKey: "gtm.case1.solution",
                  resultKey: "gtm.case1.result",
                  quoteKey: "gtm.case1.quote",
                  authorKey: "gtm.case1.author",
                },
                {
                  clientKey: "gtm.case2.client",
                  industryKey: "gtm.case2.industry",
                  challengeKey: "gtm.case2.challenge",
                  solutionKey: "gtm.case2.solution",
                  resultKey: "gtm.case2.result",
                  quoteKey: "gtm.case2.quote",
                  authorKey: "gtm.case2.author",
                },
                {
                  clientKey: "gtm.case3.client",
                  industryKey: "gtm.case3.industry",
                  challengeKey: "gtm.case3.challenge",
                  solutionKey: "gtm.case3.solution",
                  resultKey: "gtm.case3.result",
                  quoteKey: "gtm.case3.quote",
                  authorKey: "gtm.case3.author",
                },
              ].map((caseItem, i) => (
                <motion.div
                  key={caseItem.clientKey}
                  variants={fadeUp}
                  custom={0.1 + i * 0.1}
                  className="blueprint-card rounded-lg p-8"
                >
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
                      {t(caseItem.clientKey)}
                    </h4>
                    <p className="text-xs text-ice/60 mt-1">{t(caseItem.industryKey)}</p>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-xs text-ice/60 uppercase tracking-wider mb-1">Challenge</p>
                      <p className="text-muted-foreground leading-relaxed">{t(caseItem.challengeKey)}</p>
                    </div>

                    <div>
                      <p className="text-xs text-ice/60 uppercase tracking-wider mb-1">Solution</p>
                      <p className="text-muted-foreground leading-relaxed">{t(caseItem.solutionKey)}</p>
                    </div>

                    <div>
                      <p className="text-xs text-ice/60 uppercase tracking-wider mb-1">Result</p>
                      <p className="text-slate-200 font-medium leading-relaxed">{t(caseItem.resultKey)}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <p className="text-sm text-slate-300 italic leading-relaxed mb-2">
                      "{t(caseItem.quoteKey)}"
                    </p>
                    <p className="text-xs text-ice/70 font-medium">{t(caseItem.authorKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          [03] ABOUT US
          ═══════════════════════════════════════════════════════ */}
      <section id="about" className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ABOUT_BG} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 mb-4">
              <span className="section-number">[03]</span>
              <div className="h-px flex-1 max-w-[60px] bg-ice/30" />
              <span className="text-xs tracking-[0.3em] uppercase text-ice/60">{t("about.label")}</span>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("about.title")}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-8 text-lg text-muted-foreground leading-relaxed"
            >
              {t("about.p1")}
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={0.3}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              {t("about.p2")}
            </motion.p>

            <motion.div variants={fadeUp} custom={0.4} className="mt-10">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-ice hover:text-ice-glow transition-colors group"
              >
                <span>{t("about.readBlog")}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          [04] CONTACT
          ═══════════════════════════════════════════════════════ */}
      <section id="contact" className="relative py-28 overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center gap-4 mb-4">
              <span className="section-number">[04]</span>
              <div className="h-px flex-1 max-w-[60px] bg-ice/30" />
              <span className="text-xs tracking-[0.3em] uppercase text-ice/60">{t("contact.label")}</span>
              <div className="h-px flex-1 max-w-[60px] bg-ice/30" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t("contact.title")}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-6 text-lg text-muted-foreground"
            >
              {t("contact.description")}
            </motion.p>

            <motion.div variants={fadeUp} custom={0.3} className="mt-10">
              <a
                href="mailto:info@mywildin.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-ice text-obsidian font-semibold text-sm rounded hover:shadow-[0_0_30px_oklch(0.65_0.15_250/30%)] transition-all"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <Mail size={18} />
                info@mywildin.com
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════ */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wider">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-xs text-muted-foreground hover:text-ice transition-colors">
              {t("nav.blog")}
            </Link>
            <a href="mailto:info@mywildin.com" className="text-xs text-muted-foreground hover:text-ice transition-colors">
              {t("nav.contact")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
