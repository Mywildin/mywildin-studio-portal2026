import { SCORING_QUESTION_MAP } from "./questions";
import {
  PILLARS,
  QUESTION_IDS,
  type AnswerMap,
  type PillarId,
  type PillarProfile,
  type ProcessedResponse,
  type QuestionId,
  type TraitVector,
  type UserProfile,
} from "./types";

export function getTopTraits(traits: TraitVector, n = 3): string[] {
  return Object.entries(traits)
    .filter(([, value]) => value > 0)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, n)
    .map(([trait]) => trait);
}

/** Highest activation wins when the same trait appears in more than one vector. */
export function mergeTraitVectors(vectors: TraitVector[]): TraitVector {
  const merged: TraitVector = {};
  for (const vector of vectors) {
    for (const [trait, value] of Object.entries(vector)) {
      merged[trait] = trait in merged ? Math.max(merged[trait], value) : value;
    }
  }
  return merged;
}

export function combineIntensityAndTraits(
  intensityScore: number,
  traitVector: TraitVector,
): PillarProfile {
  const normalizedIntensity = intensityScore / 5;
  const factor = 0.7 + 0.3 * normalizedIntensity;
  const traitProfile: TraitVector = {};
  for (const [trait, value] of Object.entries(traitVector)) {
    traitProfile[trait] = value * factor;
  }
  return {
    intensity_level: normalizedIntensity,
    trait_profile: traitProfile,
    dominant_traits: getTopTraits(traitProfile, 3),
  };
}

/**
 * The founder spec calls traits_to_pillar_score for Cognitive Blueprint
 * and does not define it. Choice: intensity_level is the mean of the three
 * strongest merged activations (already 0–1). Traits are then weighted with
 * the same 0.7 + 0.3 * intensity factor so every pillar shares one shape.
 */
export function traitsToPillarScore(traitVector: TraitVector): PillarProfile {
  const ranked = Object.values(traitVector)
    .filter((value) => value > 0)
    .sort((a, b) => b - a);
  const top = ranked.slice(0, 3);
  const intensity = top.length === 0 ? 0 : top.reduce((sum, value) => sum + value, 0) / top.length;
  const factor = 0.7 + 0.3 * intensity;
  const traitProfile: TraitVector = {};
  for (const [trait, value] of Object.entries(traitVector)) {
    traitProfile[trait] = value * factor;
  }
  return {
    intensity_level: intensity,
    trait_profile: traitProfile,
    dominant_traits: getTopTraits(traitProfile, 3),
  };
}

export function processResponse(questionId: QuestionId, optionId: string): ProcessedResponse {
  const question = SCORING_QUESTION_MAP[questionId];
  if (question.kind === "intensity") {
    const score = question.scores?.[optionId];
    if (score === undefined) {
      throw new Error(`Unknown option "${optionId}" for ${questionId}`);
    }
    return {
      questionId,
      optionId,
      kind: "intensity",
      score,
      trait_vector: null,
    };
  }
  const vector = question.vectors?.[optionId];
  if (!vector) {
    throw new Error(`Unknown option "${optionId}" for ${questionId}`);
  }
  return {
    questionId,
    optionId,
    kind: "type",
    score: null,
    trait_vector: vector,
  };
}

function requireVector(response: ProcessedResponse): TraitVector {
  if (!response.trait_vector) {
    throw new Error(`${response.questionId} did not produce a trait vector`);
  }
  return response.trait_vector;
}

function requireScore(response: ProcessedResponse): number {
  if (response.score === null) {
    throw new Error(`${response.questionId} did not produce an intensity score`);
  }
  return response.score;
}

export function calculateCorePillars(
  responses: Record<QuestionId, ProcessedResponse>,
): Record<PillarId, PillarProfile> {
  const emotionalIntensity = (requireScore(responses.Q1) + requireScore(responses.Q3)) / 2;
  const emotionalTraits = mergeTraitVectors([
    requireVector(responses.Q6),
    requireVector(responses.Q9),
  ]);
  const emotionalArchitecture = combineIntensityAndTraits(emotionalIntensity, emotionalTraits);

  const cognitiveTraits = mergeTraitVectors([
    requireVector(responses.Q4),
    requireVector(responses.Q7),
    requireVector(responses.Q15),
  ]);
  const cognitiveBlueprint = traitsToPillarScore(cognitiveTraits);

  const socialIntensity = (requireScore(responses.Q2) + requireScore(responses.Q10)) / 2;
  const socialTraits = mergeTraitVectors([
    requireVector(responses.Q8),
    requireVector(responses.Q12),
  ]);
  const socialFabric = combineIntensityAndTraits(socialIntensity, socialTraits);

  const behavioralIntensity = requireScore(responses.Q11);
  const behavioralTraits = mergeTraitVectors([
    requireVector(responses.Q5),
    requireVector(responses.Q13),
    requireVector(responses.Q14),
  ]);
  const behavioralGrammar = combineIntensityAndTraits(behavioralIntensity, behavioralTraits);

  return {
    emotional_architecture: emotionalArchitecture,
    cognitive_blueprint: cognitiveBlueprint,
    social_fabric: socialFabric,
    behavioral_grammar: behavioralGrammar,
  };
}

export function createUserProfile(
  pillars: Record<PillarId, PillarProfile>,
): UserProfile {
  const pillarIntensities = {} as Record<PillarId, number>;
  const traitProfiles = {} as Record<PillarId, TraitVector>;
  const dominant: string[] = [];
  const seen = new Set<string>();
  for (const pillar of PILLARS) {
    pillarIntensities[pillar] = pillars[pillar].intensity_level;
    traitProfiles[pillar] = pillars[pillar].trait_profile;
    for (const trait of pillars[pillar].dominant_traits) {
      if (!seen.has(trait)) {
        seen.add(trait);
        dominant.push(trait);
      }
    }
  }
  return {
    pillar_intensities: pillarIntensities,
    trait_profiles: traitProfiles,
    pillars,
    dominant_traits: dominant,
  };
}

export function scoreAnswers(answers: AnswerMap): {
  responses: ProcessedResponse[];
  profile: UserProfile;
} {
  const byId = {} as Record<QuestionId, ProcessedResponse>;
  const responses: ProcessedResponse[] = [];
  for (const questionId of QUESTION_IDS) {
    const optionId = answers[questionId];
    if (!optionId) throw new Error(`Missing answer for ${questionId}`);
    const processed = processResponse(questionId, optionId);
    byId[questionId] = processed;
    responses.push(processed);
  }
  const pillars = calculateCorePillars(byId);
  return { responses, profile: createUserProfile(pillars) };
}
