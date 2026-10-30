import { ARCHETYPE_IDS, PILLARS, type ArchetypeId, type PillarId } from "./selfReport/types";

export interface ResultSnapshot {
  v: 1;
  name: string;
  archetypeId: ArchetypeId;
  pillars: Record<PillarId, number>;
  dominantTraits: string[];
  pillarTraits: Record<PillarId, string[]>;
  bazi: {
    dayMasterStem: string;
    dayMasterPolarity: "Yang" | "Yin";
    dayMasterElement: string;
    dominantElement: string;
    year: string;
    month: string;
    day: string;
    hour: string | null;
    timeKnown: boolean;
  };
  astro: {
    sun: string;
    sunDegree: number;
    moon: string;
    moonDegree: number;
    rising: string | null;
    risingDegree: number | null;
    timeKnown: boolean;
  };
}

export function encodeResult(snapshot: ResultSnapshot): string {
  const bytes = new TextEncoder().encode(JSON.stringify(snapshot));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

export function decodeResult(token: string): ResultSnapshot | null {
  try {
    const padded = token.replaceAll("-", "+").replaceAll("_", "/") + "===".slice((token.length + 3) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const parsed = JSON.parse(new TextDecoder().decode(bytes)) as ResultSnapshot;
    if (!isSnapshot(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function isSnapshot(value: ResultSnapshot): boolean {
  if (!value || value.v !== 1) return false;
  if (typeof value.name !== "string" || !ARCHETYPE_IDS.includes(value.archetypeId)) return false;
  if (!value.pillars || !value.bazi || !value.astro) return false;
  return PILLARS.every((pillar) => typeof value.pillars[pillar] === "number");
}
