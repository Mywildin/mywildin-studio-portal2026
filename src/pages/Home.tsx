import { Link } from "wouter";
import { ArchetypeMark } from "@/components/ArchetypeMark";
import { Seo } from "@/components/Seo";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ARCHETYPE_LIST } from "@/content/archetypes";
import { FAMILY_COPY } from "@/content/traits";
import { ARCHETYPE_TEMPLATES } from "@/lib/selfReport/archetypeTemplates";

const LAYERS = [
  {
    index: "01",
    title: "Innate",
    kicker: "Factory settings",
    body: "BaZi and western astrology, read as the weather you arrived with. Day master, dominant element, Sun, Moon, and Rising when the clock is known. A study of settings, not a verdict.",
  },
  {
    index: "02",
    title: "Self-report",
    kicker: "This version",
    body: "Fifteen questions across four pillars: Emotional Architecture, Cognitive Blueprint, Social Fabric, Behavioral Grammar. One screen each. You leave with one of fifteen animal archetypes.",
  },
  {
    index: "03",
    title: "Behavior",
    kicker: "Later",
    body: "How you actually show up, once there is something to notice. Not yet. The reading stays honest about what it has and has not seen.",
  },
];

export function HomePage() {
  return (
    <>
      <Seo
        title="MyWildin — Discover your wild self"
        description="A gamified know-yourself reading about your relationship with yourself and with your people. Friendship, not dating."
        path="/"
      />
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pt-16 pb-28 md:grid-cols-[1.15fr_0.85fr] md:pt-24 md:pb-36">
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">A know-yourself ritual</p>
          <h1 className="mt-4 font-display text-5xl leading-[0.95] text-cream sm:text-7xl">
            Discover the wild self you already are.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mist">
            MyWildin is a quiet, gamified reading of how you move through friendship — with yourself,
            and with the people who matter. Astrology and BaZi are treated as factory settings: the
            sky you were born into, not a sentence.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/quiz"
              className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-ink hover:bg-gold-2"
            >
              Discover your wild self
            </Link>
            <Link href="/about" className="text-sm text-gold underline-offset-4 hover:underline">
              How the three layers work
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-sm">
          <article className="tarot tarot-rare px-6 pt-8 pb-7 text-center text-gold">
            <p className="text-[11px] tracking-[0.22em] text-ember uppercase">Rare · Phoenix</p>
            <ArchetypeMark id="phoenix_enigmatic_muse" className="mx-auto mt-2 h-48 w-40" />
            <h2 className="font-display text-4xl text-cream">Phoenix</h2>
            <p className="font-display text-xl text-gold-2 italic">Enigmatic Muse</p>
          </article>
          <article className="tarot absolute -bottom-8 -left-6 hidden w-40 px-3 pt-4 pb-4 text-center text-gold sm:block">
            <ArchetypeMark id="lion_bold_leader" className="mx-auto h-28 w-24" />
            <p className="font-display text-2xl text-cream">Lion</p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-8">
        <h2 className="font-display text-4xl text-cream">Three layers. One of them waits.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {LAYERS.map((layer) => (
            <article key={layer.index} className="tarot p-6">
              <p className="text-xs tracking-[0.22em] text-gold uppercase">
                {layer.index} · {layer.kicker}
              </p>
              <h3 className="mt-3 font-display text-3xl text-cream">{layer.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{layer.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] text-gold uppercase">Fifteen animals</p>
            <h2 className="mt-2 font-display text-4xl text-cream">A bestiary, not a dating grid.</h2>
          </div>
          <p className="max-w-md text-sm text-mist">
            Four families, plus one rare bird. The Phoenix is highlighted because the pattern that
            calls it is uncommon — every pillar lit, and the traits to match.
          </p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2 text-xs tracking-wide text-mist uppercase">
          {Object.values(FAMILY_COPY).map((family) => (
            <li key={family.title} className="rounded-full border border-gold/25 px-3 py-1">
              {family.title}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ARCHETYPE_LIST.map((archetype) => {
            const rare = archetype.id === "phoenix_enigmatic_muse";
            const family = FAMILY_COPY[ARCHETYPE_TEMPLATES[archetype.id].family].title;
            return (
              <article
                key={archetype.id}
                className={`tarot px-3 pt-4 pb-5 text-center text-gold ${rare ? "tarot-rare" : ""}`}
              >
                {rare ? (
                  <p className="text-[10px] tracking-[0.2em] text-ember uppercase">Rare</p>
                ) : (
                  <p className="text-[10px] tracking-[0.16em] text-mist uppercase">{family}</p>
                )}
                <ArchetypeMark id={archetype.id} className="mx-auto h-28 w-24" />
                <h3 className="font-display text-2xl text-cream">{archetype.name}</h3>
                <p className="text-sm text-mist italic">{archetype.epithet}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pb-20">
        <div className="tarot p-6 md:p-10">
          <p className="text-xs tracking-[0.22em] text-gold uppercase">Coming soon</p>
          <h2 className="mt-2 font-display text-4xl text-cream">Get matched with your people</h2>
          <p className="mt-3 max-w-2xl text-mist">
            The circle isn’t open yet. Leave an email and we’ll write when friendship matching
            begins. No swiping. No dating. No chat on this site.
          </p>
          <div className="mt-6">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </>
  );
}
