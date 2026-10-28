import { ARCHETYPE_COPY } from "@/content/archetypes";
import { FAMILY_COPY, PILLAR_COPY, TRAIT_PHRASES } from "@/content/traits";
import { ARCHETYPE_TEMPLATES } from "./archetypeTemplates";
import { PILLARS, type ArchetypeId, type PillarId, type UserProfile } from "./types";


export interface PillarNarrative {
  pillar: PillarId;
  title: string;
  score: number;
  traits: string[];
  narrative: string;
}

export interface WildSelfReport {
  archetypeId: ArchetypeId;
  name: string;
  epithet: string;
  tagline: string;
  description: string;
  strengths: string[];
  growthEdges: string[];
  qualities: string[];
  symbolicMeaning: string;
  family: string;
  familyLabel: string;
  familyBlurb: string;
  rare: boolean;
  rarityNote: string | null;
  superpower: string;
  coreIdentity: string;
  pillarBreakdown: PillarNarrative[];
  dynamicLayers: string;
  relationshipStyle: string;
  personalizedInsights: string[];
}

function phraseFor(trait: string): string | undefined {
  return TRAIT_PHRASES[trait];
}

function sentencesFor(traits: string[], limit: number): string[] {
  const lines: string[] = [];
  for (const trait of traits) {
    const phrase = phraseFor(trait);
    if (!phrase) continue;
    const sentence = sentenceCase(phrase);
    if (!lines.includes(sentence)) lines.push(sentence);
    if (lines.length >= limit) break;
  }
  return lines;
}

function sentenceCase(phrase: string): string {
  return `You ${phrase}.`;
}

function relationshipStyle(dominantTraits: string[]): string {
  const traits = new Set(dominantTraits);
  let lead: string;
  if (traits.has("large_group_social")) {
    lead =
      "With other people, you widen the circle. A full room is not noise to you — it is where friendship gets its spark, as long as the spark is real.";
  } else if (traits.has("close_knit_social")) {
    lead =
      "With other people, you go small and true. A few well-kept friendships will always matter more to you than a crowded contact list.";
  } else if (traits.has("mission_driven_social") && traits.has("independent_social")) {
    lead =
      "With other people, you want both a sky of your own and companions on the same long road. You bond through shared purpose more than through proximity.";
  } else if (traits.has("mission_driven_social")) {
    lead =
      "With other people, shared purpose is the doorway. You relax once you can tell you are walking the same direction.";
  } else if (traits.has("independent_social")) {
    lead =
      "With other people, you love from a little altitude. Closeness works when it still leaves you a room of your own.";
  } else if (traits.has("observer_energy")) {
    lead =
      "With other people, you watch before you enter. The friends who last are the ones who don't mistake your quiet for distance.";
  } else {
    lead =
      "With other people, you look for the temperature that lets everyone stay honest. Friendship, for you, is a place both of you can exhale.";
  }

  if (traits.has("deep_communication") || traits.has("spiritual_connection")) {
    return `${lead} The conversations you remember are the ones that went below the week and touched the reason.`;
  }
  if (traits.has("playful_communication")) {
    return `${lead} You often get there through play — a joke that turns, halfway through, into the actual truth.`;
  }
  if (traits.has("direct_communication")) {
    return `${lead} You would rather be clear than charming. The right people experience that as care.`;
  }
  return lead;
}

function dynamicLayers(dominantTraits: string[], archetypeId: ArchetypeId): string {
  const copy = ARCHETYPE_COPY[archetypeId];
  const insights = sentencesFor(dominantTraits, 2);
  const texture =
    insights.length > 0
      ? insights.join(" ")
      : "Your answers drew a pattern with more than one true center.";
  return `${copy.name} energy, in practice, is not a costume. ${texture} The self-report is the story you tell. The sky chart beside it is only the weather you were born into.`;
}

export function generateWildSelfReport(
  archetypeId: ArchetypeId,
  profile: Pick<UserProfile, "pillar_intensities" | "pillars" | "dominant_traits">,
): WildSelfReport {
  const copy = ARCHETYPE_COPY[archetypeId];
  const template = ARCHETYPE_TEMPLATES[archetypeId];
  const family = FAMILY_COPY[template.family];
  const rare = archetypeId === "phoenix_enigmatic_muse";
  const insights = sentencesFor(profile.dominant_traits, 4);
  const pillarBreakdown: PillarNarrative[] = PILLARS.map((pillar) => {
    const traits = profile.pillars[pillar].dominant_traits;
    const line = sentencesFor(traits, 1)[0];
    return {
      pillar,
      title: PILLAR_COPY[pillar].title,
      score: profile.pillar_intensities[pillar],
      traits,
      narrative: line ?? PILLAR_COPY[pillar].blurb,
    };
  });

  return {
    archetypeId,
    name: copy.name,
    epithet: copy.epithet,
    tagline: copy.tagline,
    description: copy.description,
    strengths: copy.strengths,
    growthEdges: copy.growthEdges,
    qualities: copy.qualities,
    symbolicMeaning: copy.symbolicMeaning,
    family: template.family,
    familyLabel: family.title,
    familyBlurb: family.blurb,
    rare,
    rarityNote: rare
      ? "The Phoenix is the rare reading — the founder’s note puts it under 1 in 100. Every pillar had to be lit, and the trait pattern had to match."
      : null,
    superpower: copy.superpower,
    coreIdentity: copy.description,
    pillarBreakdown,
    dynamicLayers: dynamicLayers(profile.dominant_traits, archetypeId),
    relationshipStyle: relationshipStyle(profile.dominant_traits),
    personalizedInsights: insights,
  };
}
