import { useState, type ReactNode } from "react";
import { Link } from "wouter";

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative z-0 flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 border-b border-gold/15 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/" className="font-display text-2xl tracking-wide text-cream">
            MyWildin
          </Link>
          <button
            type="button"
            className="rounded-full border border-gold/30 px-3 py-1 text-sm text-mist md:hidden"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
          <nav
            className={`${open ? "flex" : "hidden"} absolute top-full right-0 left-0 flex-col gap-3 border-b border-gold/15 bg-ink/95 px-5 py-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:bg-transparent md:p-0`}
          >
            <Link href="/about" className="text-sm text-mist hover:text-cream" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/blog" className="text-sm text-mist hover:text-cream" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link href="/privacy" className="text-sm text-mist hover:text-cream" onClick={() => setOpen(false)}>
              Privacy
            </Link>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink hover:bg-gold-2"
              onClick={() => setOpen(false)}
            >
              Discover your wild self
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-gold/15">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 text-sm text-mist md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-2xl text-cream">MyWildin</p>
            <p className="mt-2 max-w-md">
              A know-yourself reading about friendship — with yourself, and with your people. Birth
              details stay in your browser in this version.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-cream">About</Link>
              <Link href="/blog" className="hover:text-cream">Blog</Link>
              <Link href="/privacy" className="hover:text-cream">Privacy</Link>
              <Link href="/quiz" className="hover:text-cream">Quiz</Link>
            </div>
            <p className="max-w-sm md:text-right">
              City search uses GeoNames (CC BY 4.0). © {new Date().getFullYear()} MyWildin.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
