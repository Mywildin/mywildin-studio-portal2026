import { useMemo, useState } from "react";
import { Link, useSearchParams } from "wouter";
import { ArchetypeMark } from "@/components/ArchetypeMark";
import { Seo } from "@/components/Seo";
import { WaitlistForm } from "@/components/WaitlistForm";
import { PILLAR_COPY } from "@/content/traits";
import { decodeResult } from "@/lib/resultCodec";
import { downloadShareCard } from "@/lib/shareCard";
import { generateWildSelfReport } from "@/lib/selfReport";
import { PILLARS, type PillarProfile, type UserProfile } from "@/lib/selfReport/types";

const ELEMENT_NOTE: Record<string, string> = {
  Wood: "Wood grows toward the light. It is the element of reaching.",
  Fire: "Fire illuminates and spends itself. It is the element of presence.",
  Earth: "Earth holds. It is the element of staying.",
  Metal: "Metal decides. It is the element of a clean cut.",
  Water: "Water finds the low place and keeps moving. It is the element of depth.",
};

function humanTrait(trait: string): string {
  return trait
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function ResultPage() {
  const [params] = useSearchParams();
  const [shareError, setShareError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const token = params.get("r") ?? "";
  const snapshot = useMemo(() => (token ? decodeResult(token) : null), [token]);

  const report = useMemo(() => {
    if (!snapshot) return null;
    const pillars = {} as Record<(typeof PILLARS)[number], PillarProfile>;
    for (const pillar of PILLARS) {
      pillars[pillar] = {
        intensity_level: snapshot.pillars[pillar],
        trait_profile: {},
        dominant_traits: snapshot.pillarTraits[pillar] ?? [],
      };
    }
    const profile: Pick<UserProfile, "pillar_intensities" | "pillars" | "dominant_traits"> = {
      pillar_intensities: snapshot.pillars,
      pillars,
      dominant_traits: snapshot.dominantTraits,
    };
    return generateWildSelfReport(snapshot.archetypeId, profile);
  }, [snapshot]);

  if (!snapshot || !report) {
    return (
      <div className="mx-auto max-w-xl px-5 py-20 text-center">
        <Seo title="Reading not found" description="This MyWildin link doesn’t hold a reading." path="/result" />
        <h1 className="font-display text-4xl text-cream">This link doesn’t hold a reading.</h1>
        <p className="mt-4 text-mist">The card lives in the address itself. Start again and a new one will be written.</p>
        <Link href="/quiz" className="mt-8 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-medium text-ink">
          Discover your wild self
        </Link>
      </div>
    );
  }

  const shareUrl = typeof window === "undefined" ? "" : window.location.href;

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-10">
      <Seo
        title={`${report.name} · ${snapshot.name}`}
        description={`${report.name}, ${report.epithet}. ${report.tagline} A MyWildin reading.`}
        path="/result"
      />
      <article className={`tarot px-5 py-8 text-center text-gold sm:px-10 ${report.rare ? "tarot-rare" : ""}`}>
        <p className="text-xs tracking-[0.24em] text-gold uppercase">
          {report.familyLabel}
          {report.rare ? " · Rare" : ""}
        </p>
        <ArchetypeMark id={report.archetypeId} className="mx-auto mt-2 h-56 w-44" />
        <h1 className="font-display text-6xl text-cream">{report.name}</h1>
        <p className="font-display text-2xl text-gold-2 italic">{report.epithet}</p>
        <p className="mt-3 text-mist">{report.tagline}</p>
        <p className="mt-4 text-xs tracking-[0.16em] text-mist uppercase">
          {report.qualities.join(" · ")}
        </p>
        <p className="mt-6 text-sm text-cream/80">Cast for {snapshot.name}</p>
      </article>

      {report.rarityNote ? (
        <p className="mt-4 rounded-2xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm text-gold-2">
          {report.rarityNote}
        </p>
      ) : null}

      <section className="mt-10">
        <h2 className="font-display text-3xl text-cream">The animal</h2>
        <p className="mt-4 leading-relaxed text-mist">{report.description}</p>
        <p className="mt-4 font-display text-2xl text-gold-2 italic">“{report.superpower}”</p>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="tarot p-5">
          <h3 className="font-display text-2xl text-cream">Strengths</h3>
          <ul className="mt-3 grid gap-2 text-sm text-mist">
            {report.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="tarot p-5">
          <h3 className="font-display text-2xl text-cream">Growth edges</h3>
          <ul className="mt-3 grid gap-2 text-sm text-mist">
            {report.growthEdges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-3xl text-cream">Four pillars</h2>
        <p className="mt-2 text-sm text-mist">
          The bar is how strongly that layer was activated. The words are the style inside it.
          Cognitive questions each name a full style, so that bar often sits high.
        </p>
        <div className="mt-6 grid gap-5">
          {report.pillarBreakdown.map((pillar) => (
            <div key={pillar.pillar}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl text-cream">{pillar.title}</h3>
                <span className="text-sm text-gold">{Math.round(pillar.score * 100)}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
                <div className="h-full bg-gold" style={{ width: `${Math.round(pillar.score * 100)}%` }} />
              </div>
              <p className="mt-2 text-xs tracking-wide text-gold/90 uppercase">
                {pillar.traits.map((trait) => humanTrait(trait)).join(" · ") || PILLAR_COPY[pillar.pillar].short}
              </p>
              <p className="mt-1 text-sm text-mist">{pillar.narrative}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-3xl text-cream">How you move with people</h2>
        <p className="mt-3 leading-relaxed text-mist">{report.relationshipStyle}</p>
        <p className="mt-3 leading-relaxed text-mist">{report.dynamicLayers}</p>
        {report.personalizedInsights.length > 0 ? (
          <ul className="mt-4 grid gap-2 text-sm text-cream/90">
            {report.personalizedInsights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <article className="tarot p-5">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">BaZi · factory settings</p>
          <h2 className="mt-2 font-display text-3xl text-cream">
            {snapshot.bazi.dayMasterPolarity} {snapshot.bazi.dayMasterElement}
          </h2>
          <p className="text-gold-2">{snapshot.bazi.dayMasterStem} · day master</p>
          <p className="mt-3 text-sm text-mist">
            Dominant element: <span className="text-cream">{snapshot.bazi.dominantElement}</span>.{" "}
            {ELEMENT_NOTE[snapshot.bazi.dominantElement] ?? ""}
          </p>
          <dl className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
            {(
              [
                ["Year", snapshot.bazi.year],
                ["Month", snapshot.bazi.month],
                ["Day", snapshot.bazi.day],
                ["Hour", snapshot.bazi.hour ?? "—"],
              ] as const
            ).map(([label, value]) => (
              <div key={label}>
                <dt className="text-[10px] tracking-widest text-mist uppercase">{label}</dt>
                <dd className="mt-1 font-display text-xl text-cream">{value}</dd>
              </div>
            ))}
          </dl>
          {!snapshot.bazi.timeKnown ? (
            <p className="mt-3 text-xs text-mist">
              Time unknown. The hour pillar is uncast. Year, month, and day were taken at local noon
              so the day would not slip across the late-night boundary. True solar time is not applied.
            </p>
          ) : null}
        </article>
        <article className="tarot p-5">
          <p className="text-xs tracking-[0.18em] text-gold uppercase">Western sky · tropical</p>
          <h2 className="mt-2 font-display text-3xl text-cream">
            {snapshot.astro.sun} sun
          </h2>
          <ul className="mt-4 grid gap-2 text-sm text-mist">
            <li>Sun · {snapshot.astro.sun} {snapshot.astro.sunDegree}°</li>
            <li>Moon · {snapshot.astro.moon} {snapshot.astro.moonDegree}°</li>
            <li>
              Rising ·{" "}
              {snapshot.astro.rising
                ? `${snapshot.astro.rising} ${snapshot.astro.risingDegree}°`
                : "uncast — birth time unknown"}
            </li>
          </ul>
          <p className="mt-3 text-sm text-mist">
            Sun is the season of you. Moon is the private weather. Rising is the door you walk
            through, and only when the clock is known.
          </p>
        </article>
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-full bg-gold px-5 py-3 text-sm font-medium text-ink"
          onClick={() => {
            setShareError(null);
            downloadShareCard({
              name: snapshot.name,
              animal: report.name,
              epithet: report.epithet,
              tagline: report.tagline,
              archetypeId: report.archetypeId,
              rare: report.rare,
              element: snapshot.bazi.dominantElement,
              sun: snapshot.astro.sun,
              moon: snapshot.astro.moon,
              rising: snapshot.astro.rising,
            }).catch(() => setShareError("The card couldn’t be saved in this browser."));
          }}
        >
          Save share card
        </button>
        <button
          type="button"
          className="rounded-full border border-gold/40 px-5 py-3 text-sm text-cream"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shareUrl);
              setCopied(true);
            } catch {
              setCopied(false);
              setShareError("Copy the address bar — this browser blocked clipboard access.");
            }
          }}
        >
          {copied ? "Link copied" : "Copy reading link"}
        </button>
        {shareError ? <p className="w-full text-sm text-ember">{shareError}</p> : null}
        <p className="w-full text-xs text-mist">
          The card is a portrait PNG. Where the browser allows it, the same button offers the system
          share sheet. The link encodes the reading, not your birth date, time, or city.
        </p>
      </section>

      <section className="mt-12 tarot p-6">
        <h2 className="font-display text-3xl text-cream">Get matched with your people</h2>
        <p className="mt-2 text-sm text-mist">Coming soon. Friendship, not dating. Your chart is not attached.</p>
        <div className="mt-4">
          <WaitlistForm id="result-waitlist" />
        </div>
      </section>

    </div>
  );
}
