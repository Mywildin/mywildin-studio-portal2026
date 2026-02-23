/*
 * Navigation — Obsidian Blueprint Theme
 * Minimal top bar with engineering precision, ice-blue accents
 */

import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const { lang, setLang, t, availableLanguages, config } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { labelKey: "nav.engine", href: "/#engine" },
    { labelKey: "nav.gtm", href: "/#gtm" },
    { labelKey: "nav.about", href: "/#about" },
    { labelKey: "nav.blog", href: "/blog" },
    { labelKey: "nav.contact", href: "/#contact" },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location !== "/") {
        window.location.href = href;
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const toggleLang = () => {
    const idx = availableLanguages.indexOf(lang);
    const next = availableLanguages[(idx + 1) % availableLanguages.length];
    setLang(next);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-obsidian/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span
            className="text-lg font-semibold text-foreground tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MyWildin
          </span>
          <span className="hidden sm:inline text-[10px] tracking-[0.3em] uppercase text-muted-foreground font-medium">
            Studio
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isBlog = item.href === "/blog";
            return isBlog ? (
              <Link
                key={item.href}
                href="/blog"
                className="text-sm text-slate-400 hover:text-ice transition-colors duration-300 tracking-wide"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t(item.labelKey)}
              </Link>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-sm text-slate-400 hover:text-ice transition-colors duration-300 tracking-wide"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {t(item.labelKey)}
              </a>
            );
          })}

          {/* Language Toggle */}
          {availableLanguages.length > 1 && (
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-ice transition-colors duration-300 border border-border rounded px-2.5 py-1"
            >
              <Globe size={14} />
              <span className="text-xs font-medium">{config[lang].label}</span>
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          {availableLanguages.length > 1 && (
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 text-sm text-slate-400 border border-border rounded px-2 py-1"
            >
              <Globe size={13} />
              <span className="text-xs">{config[lang].label}</span>
            </button>
          )}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-obsidian/95 backdrop-blur-md border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => {
                const isBlog = item.href === "/blog";
                return isBlog ? (
                  <Link
                    key={item.href}
                    href="/blog"
                    onClick={() => setMobileOpen(false)}
                    className="block text-base text-slate-200 hover:text-ice transition-colors"
                  >
                    {t(item.labelKey)}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="block text-base text-slate-200 hover:text-ice transition-colors"
                  >
                    {t(item.labelKey)}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
