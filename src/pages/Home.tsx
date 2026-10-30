import { Link } from "wouter";
import { AnimalArt } from "@/components/AnimalArt";
import { Seo } from "@/components/Seo";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ARCHETYPE_LIST } from "@/content/archetypes";
import { WILD_TYPES } from "@/content/wildTypes";
import { ARCHETYPE_TEMPLATES } from "@/lib/selfReport/archetypeTemplates";

const STEPS = [
  {
    index: "01",
    title: "Know yourself",
    body: "Fifteen questions, plus the sky you showed up with. Sun, moon, day master. BaZi is factory settings. Don't be weird about it.",
  },
  {
    index: "02",
    title: "Your Wildsign",
    body: "One animal. A card you can send. That's the readout. Not a verdict. Not a personality cult.",
  },
  {
    index: "03",
    title: "Ask Amy",
    body: "When you're stuck or just annoyed at your life, come back. Amy introduces you to your people. She isn't live yet.",
  },
];

export function HomePage() {
  return (
    <>
      <Seo
        title="MyWildin — Get your Wildsign"
        description="Fifteen questions, your sky, one animal. Come back and Ask Amy when you're stuck."
        path="/"
      />
      <section className="mx-auto w-full max-w-5xl px-5 pt-14 pb-10">
        <p className="mono uppercase">MyWildin</p>
        <h1 className="mt-4 max-w-xl text-5xl leading-[0.95] font-bold tracking-tight sm:text-7xl">
          Get your Wildsign.
        </h1>
        <p className="mt-6 max-w-md text-lg">
          Know yourself first. Then, when you're stuck, Ask Amy. She'll introduce you to your people later. This is not a dating app.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/quiz" className="btn">
            Get your Wildsign
          </Link>
          <Link href="/ask-amy" className="btn btn-line">
            Ask Amy
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-5xl gap-8 border-t border-ink px-5 py-10 md:grid-cols-3">
        {STEPS.map((step) => (
          <article key={step.index}>
            <p className="mono uppercase">{step.index}</p>
            <h2 className="mt-2 text-2xl font-bold">{step.title}</h2>
            <p className="mt-3 text-sm leading-relaxed">{step.body}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto w-full max-w-5xl border-t border-ink px-5 py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold">Fifteen animals.</h2>
          <p className="mono hidden sm:block">
            One rare <span className="text-pink">●</span>
          </p>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ARCHETYPE_LIST.map((archetype) => {
            const type = WILD_TYPES[archetype.id];
            const slug = ARCHETYPE_TEMPLATES[archetype.id].animal;
            return (
              <article
                key={archetype.id}
                className={`border border-ink p-3 ${type.holo ? "panel-holo" : ""}`}
                style={type.holo ? undefined : { background: type.panel }}
              >
                <p className="mono uppercase">{type.holo ? "Rare" : type.type}</p>
                <AnimalArt slug={slug} className="mx-auto mt-2 h-28 w-full object-contain" />
                <h3 className="mt-2 text-xl font-bold">The {archetype.name}</h3>
              </article>
            );
          })}
        </div>
      </section>

      <section id="ask-amy" className="mx-auto w-full max-w-5xl border-t border-ink px-5 py-12">
        <p className="mono uppercase">Coming soon</p>
        <h2 className="mt-2 text-4xl font-bold">Ask Amy</h2>
        <p className="mt-3 max-w-xl">
          Stuck? Unhappy? That's the point of coming back. Amy isn't on the site yet. Leave an email. When she's ready, she introduces you to your people. Friendship first.
        </p>
        <div className="mt-6">
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}
