import { useState, type ReactNode } from "react";
import { Link } from "wouter";

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-30 border-b border-ink bg-paper">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <Link href="/" className="text-lg font-bold tracking-tight">
            MyWildin
          </Link>
          <button
            type="button"
            className="btn-line px-3 py-1 text-sm font-bold md:hidden"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
          <nav
            className={`${open ? "flex" : "hidden"} absolute top-full right-0 left-0 flex-col gap-3 border-b border-ink bg-paper px-5 py-4 md:static md:flex md:flex-row md:items-center md:gap-6 md:border-0 md:p-0`}
          >
            <Link href="/about" className="text-sm" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link href="/blog" className="text-sm" onClick={() => setOpen(false)}>
              Blog
            </Link>
            <Link href="/ask-amy" className="text-sm" onClick={() => setOpen(false)}>
              Ask Amy
            </Link>
            <Link href="/quiz" className="btn px-4 py-2 text-sm" onClick={() => setOpen(false)}>
              Get your Wildsign
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-ink">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-8 text-sm md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-bold">MyWildin</p>
            <p className="mt-2 max-w-md">
              Know yourself. Get a Wildsign. Ask Amy when you're stuck. Birth details stay on your device.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:items-end">
            <div className="flex flex-wrap gap-4">
              <Link href="/about">About</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/ask-amy">Ask Amy</Link>
            </div>
            <p className="mono normal-case md:text-right">
              Cities: GeoNames, CC BY 4.0. © {new Date().getFullYear()} MyWildin.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
