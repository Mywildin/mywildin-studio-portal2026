import { Link } from "wouter";
import { Seo } from "@/components/Seo";

export function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-14">
      <Seo
        title="About"
        description="MyWildin is a friendship-first know-yourself reading. Factory settings, a self-report, and a bestiary of fifteen animals."
        path="/about"
      />
      <p className="text-xs tracking-[0.22em] text-gold uppercase">About</p>
      <h1 className="mt-3 font-display text-5xl text-cream">Know yourself, then know your people.</h1>
      <div className="mt-6 grid gap-4 text-base leading-relaxed text-mist">
        <p>
          MyWildin is a gamified “know yourself” experience for the AI era. It is about your
          relationship with yourself and with other people. The frame is friendship. It is not a
          dating product, and there is no chat on this site.
        </p>
        <p>
          We talk about astrology and BaZi as factory settings — the weather you were shipped with.
          Western Sun, Moon, and Rising describe one dialect of that weather. The Chinese four
          pillars describe another: a day master, and the element that shows up most. Neither one is
          asked to be fate.
        </p>
        <p>
          The self-report is fifteen questions. Five of them measure intensity. Ten of them place you
          on a style. Together they light four pillars: Emotional Architecture, Cognitive Blueprint,
          Social Fabric, and Behavioral Grammar. The pattern lands on one of fifteen animals. The
          Phoenix is rare on purpose.
        </p>
        <p>
          A later layer will look at behavior — what you actually do, not only what you say and what
          the sky suggests. Version 0.1 stops before that. The reading says so.
        </p>
        <p>
          Birth date, time, and place are used in your browser to cast the chart, then dropped.
          The shareable link carries the result: the animal, the pillars, the signs, the day master.
          It does not carry the birthday. The waitlist sends only the name and email you type into
          it, through Netlify Forms.
        </p>
      </div>
      <Link href="/quiz" className="mt-8 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-medium text-ink">
        Discover your wild self
      </Link>
    </article>
  );
}
