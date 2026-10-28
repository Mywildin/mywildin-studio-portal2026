export const PILLARS = [
  "emotional_architecture",
  "cognitive_blueprint",
  "social_fabric",
  "behavioral_grammar",
] as const;

export type PillarId = (typeof PILLARS)[number];

export const QUESTION_IDS = [
  "Q1",
  "Q2",
  "Q3",
  "Q4",
  "Q5",
  "Q6",
  "Q7",
  "Q8",
  "Q9",
  "Q10",
  "Q11",
  "Q12",
  "Q13",
  "Q14",
  "Q15",
] as const;

export type QuestionId = (typeof QUESTION_IDS)[number];

export type QuestionKind = "intensity" | "type";

export type TraitVector = Record<string, number>;

export type AnswerMap = Record<QuestionId, string>;

export const ARCHETYPE_IDS = [
  "lion_bold_leader",
  "butterfly_gentle_transformer",
  "wolf_loyal_pack_leader",
  "whale_deep_empath",
  "cheetah_focused_achiever",
  "koala_peaceful_anchor",
  "eagle_visionary_scout",
  "bee_community_builder",
  "fox_clever_adapter",
  "turtle_wise_observer",
  "deer_gentle_explorer",
  "octopus_multifaceted_genius",
  "panda_balanced_harmonizer",
  "owl_intuitive_sage",
  "phoenix_enigmatic_muse",
] as const;

export type ArchetypeId = (typeof ARCHETYPE_IDS)[number];

export const FAMILY_IDS = [
  "spark_blazers",
  "depth_weavers",
  "loyal_binders",
  "path_shapers",
  "transcendent",
] as const;

export type FamilyId = (typeof FAMILY_IDS)[number];

export interface PillarProfile {
  intensity_level: number;
  trait_profile: TraitVector;
  dominant_traits: string[];
}

/** Shape section 5's compatibility matcher can consume later. */
export interface UserProfile {
  pillar_intensities: Record<PillarId, number>;
  trait_profiles: Record<PillarId, TraitVector>;
  pillars: Record<PillarId, PillarProfile>;
  dominant_traits: string[];
}

export interface IntensityRequirement {
  min: number;
  max: number;
  weight: number;
}

export interface TraitPattern {
  required_traits: string[];
  preferred_traits: string[];
  avoid_traits: string[];
}

export interface ArchetypeTemplate {
  id: ArchetypeId;
  animal: string;
  family: FamilyId;
  intensity_requirements: Record<PillarId, IntensityRequirement>;
  trait_patterns: Record<PillarId, TraitPattern>;
  special_trigger?: string;
}

export interface ProcessedResponse {
  questionId: QuestionId;
  optionId: string;
  kind: QuestionKind;
  score: number | null;
  trait_vector: TraitVector | null;
}

export interface SelfReportAssessment {
  responses: ProcessedResponse[];
  profile: UserProfile;
  archetypeId: ArchetypeId;
  primary_archetype: ArchetypeId;
  assignment_type: "decision_tree";
}
