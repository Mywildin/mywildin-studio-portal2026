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
    lead = "You want the room full. A tiny circle feels like a waiting room.";
  } else if (traits.has("close_knit_social")) {
    lead = "You keep it small. A crowded contact list is not a personality.";
  } else if (traits.has("mission_driven_social") && traits.has("independent_social")) {
    lead = "You want a lane of your own and people on the same road. Proximity is not the point.";
  } else if (traits.has("mission_driven_social")) {
    lead = "You bond over the work. Small talk can wait.";
  } else if (traits.has("independent_social")) {
    lead = "You like people. You also like a door you can close.";
  } else if (traits.has("observer_energy")) {
    lead = "You watch first. The friends who last don't call that distance.";
  } else {
    lead = "You look for the temperature where people can be honest without performing it.";
  }

  if (traits.has("deep_communication") || traits.has("spiritual_connection")) {
    return `${lead} You remember the conversation that went under the week.`;
  }
  if (traits.has("playful_communication")) {
    return `${lead} You get there through a joke that turns into the actual point.`;
  }
  if (traits.has("direct_communication")) {
    return `${lead} You'd rather be clear than charming. The right people take that as care.`;
  }
  return lead;
}

function dynamicLayers(dominantTraits: string[]): string {
  const insights = sentencesFor(dominantTraits, 2);
  const texture =
    insights.length > 0
      ? insights.join(" ")
      : "Your answers drew a pattern with more than one true center.";
  return `This is your Wildsign, not a costume. ${texture} You wrote the answers. The sky is just the weather you showed up in.`;
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
      ? "The Phoenix is the rarest reading. Every pillar has to be lit, and the trait pattern has to match."
      : null,
    superpower: copy.superpower,
    coreIdentity: copy.description,
    pillarBreakdown,
    dynamicLayers: dynamicLayers(profile.dominant_traits),
    relationshipStyle: relationshipStyle(profile.dominant_traits),
    personalizedInsights: insights,
  };
}
