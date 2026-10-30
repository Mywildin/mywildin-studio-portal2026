import { useMemo, useState } from "react";
import { Link, useSearchParams } from "wouter";
import { AnimalArt } from "@/components/AnimalArt";
import { Seo } from "@/components/Seo";
import { ARCHETYPE_TEMPLATES } from "@/lib/selfReport/archetypeTemplates";
import { WILD_TYPES } from "@/content/wildTypes";
import { PILLAR_COPY } from "@/content/traits";
import { decodeResult } from "@/lib/resultCodec";
import { downloadShareCard } from "@/lib/shareCard";
import { generateWildSelfReport } from "@/lib/selfReport";
import { PILLARS, type PillarProfile, type UserProfile } from "@/lib/selfReport/types";

function humanTrait(trait: string): string {
  return trait.replaceAll("_", " ");
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
      <div className="mx-auto max-w-xl px-5 py-20">
        <Seo title="No Wildsign here" description="This link doesn't hold a Wildsign." path="/result" />
        <h1 className="text-4xl font-bold">This link doesn't hold a Wildsign.</h1>
        <Link href="/quiz" className="btn mt-8">
          Get your Wildsign
        </Link>
      </div>
    );
  }

  const type = WILD_TYPES[snapshot.archetypeId];
  const slug = ARCHETYPE_TEMPLATES[snapshot.archetypeId].animal;
  const dayMaster = `${snapshot.bazi.dayMasterPolarity} ${snapshot.bazi.dayMasterElement}`;
  const shareUrl = typeof window === "undefined" ? "" : window.location.href;
  const rows: [string, string][] = [
    ["Sun", `${snapshot.astro.sun} ${snapshot.astro.sunDegree}°`],
    ["Moon", `${snapshot.astro.moon} ${snapshot.astro.moonDegree}°`],
    ["Day master", `${dayMaster} · ${snapshot.bazi.dayMasterStem}`],
  ];
  if (snapshot.astro.rising) {
    rows.push(["Rising", `${snapshot.astro.rising} ${snapshot.astro.risingDegree}°`]);
  }

  return (
    <div className="mx-auto w-full max-w-lg px-5 py-8">
      <Seo
        title={`The ${report.name} · Wildsign`}
        description={`${report.tagline} A MyWildin Wildsign.`}
        path="/result"
      />
      <article
        className={`border border-ink px-5 py-7 ${type.holo ? "panel-holo" : ""}`}
        style={type.holo ? undefined : { background: type.panel }}
      >
        <p className="mono text-center uppercase">MyWildin · Your Wildsign</p>
        <AnimalArt slug={slug} className="mx-auto mt-4 h-56 w-full object-contain" />
        <h1 className="mt-4 text-center text-5xl font-bold tracking-tight">The {report.name}</h1>
        <hr className="rule my-4" />
        <p className="text-center text-lg leading-snug">{report.tagline}</p>
        <hr className="rule my-4" />
        <dl className="grid gap-2">
          {rows.map(([label, value]) => (
            <div key={label} className="mono flex justify-between gap-4">
              <dt className="uppercase">{label}</dt>
              <dd className="text-right">{value}</dd>
            </div>
          ))}
        </dl>
        <hr className="rule my-4" />
        <Link href="/ask-amy" className="btn btn-line w-full">
          Ask Amy
        </Link>
      </article>

      {report.rarityNote ? <p className="mono mt-4 normal-case">{report.rarityNote}</p> : null}

      <p className="mt-6 text-sm leading-relaxed">{report.description}</p>
      <p className="mt-3 font-bold">{report.superpower}</p>

      <section className="mt-8 grid gap-6 border-t border-ink pt-6 sm:grid-cols-2">
        <div>
          <h2 className="font-bold">Good at</h2>
          <ul className="mt-2 grid gap-2 text-sm">
            {report.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-bold">Watch this</h2>
          <ul className="mt-2 grid gap-2 text-sm">
            {report.growthEdges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8 border-t border-ink pt-6">
        <h2 className="text-2xl font-bold">Four layers</h2>
        <p className="mt-2 text-sm">
          The number is how hard that layer got pulled. The words are the style. Mind questions each name a full style, so that bar often sits high.
        </p>
        <div className="mt-5 grid gap-5">
          {report.pillarBreakdown.map((pillar) => (
            <div key={pillar.pillar}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-bold">{pillar.title}</h3>
                <span className="mono">{Math.round(pillar.score * 100)}</span>
              </div>
              <div className="mt-2 h-1 bg-ink/15" aria-hidden="true">
                <div className="h-full bg-ink" style={{ width: `${Math.round(pillar.score * 100)}%` }} />
              </div>
              <p className="mono mt-2 normal-case">
                {pillar.traits.map((trait) => humanTrait(trait)).join(" · ") || PILLAR_COPY[pillar.pillar].short}
              </p>
              <p className="mt-1 text-sm">{pillar.narrative}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 border-t border-ink pt-6">
        <h2 className="text-2xl font-bold">With people</h2>
        <p className="mt-3 text-sm leading-relaxed">{report.relationshipStyle}</p>
        <p className="mt-3 text-sm leading-relaxed">{report.dynamicLayers}</p>
      </section>

      <section className="mt-8 border-t border-ink pt-6">
        <h2 className="text-2xl font-bold">The sky part</h2>
        <p className="mt-2 text-sm">
          Dominant element: {snapshot.bazi.dominantElement}. Pillars{" "}
          {snapshot.bazi.year} · {snapshot.bazi.month} · {snapshot.bazi.day}
          {snapshot.bazi.hour ? ` · ${snapshot.bazi.hour}` : " · hour uncast"}.
          {!snapshot.bazi.timeKnown
            ? " No birth time, so noon stood in for the day and the rising sign stayed blank."
            : ""}
        </p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setShareError(null);
            downloadShareCard({
              name: snapshot.name,
              animal: report.name,
              slug,
              tagline: report.tagline,
              archetypeId: report.archetypeId,
              sun: snapshot.astro.sun,
              moon: snapshot.astro.moon,
              dayMaster,
            }).catch(() => setShareError("This browser wouldn't save the card."));
          }}
        >
          Save card
        </button>
        <button
          type="button"
          className="btn btn-line"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shareUrl);
              setCopied(true);
            } catch {
              setShareError("Copy the address bar. Clipboard said no.");
            }
          }}
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
      {shareError ? <p className="mt-3 text-sm">{shareError}</p> : null}
      <p className="mono mt-4 normal-case">
        The link keeps the Wildsign, not your birthday. Cast for {snapshot.name}.
      </p>
    </div>
  );
}
