export { determineAnimal, assessSelfReport, PHOENIX_TRAIT_MIN } from "./assign";
export { ARCHETYPE_TEMPLATES } from "./archetypeTemplates";
export { SCORING_QUESTIONS, SCORING_QUESTION_MAP, allTraitKeys } from "./questions";
export { generateWildSelfReport } from "./report";
export type { PillarNarrative, WildSelfReport } from "./report";
export {
  calculateCorePillars,
  combineIntensityAndTraits,
  createUserProfile,
  getTopTraits,
  mergeTraitVectors,
  processResponse,
  scoreAnswers,
  traitsToPillarScore,
} from "./scoring";
export {
  ARCHETYPE_IDS,
  FAMILY_IDS,
  PILLARS,
  QUESTION_IDS,
} from "./types";
export type {
  AnswerMap,
  ArchetypeId,
  ArchetypeTemplate,
  FamilyId,
  PillarId,
  PillarProfile,
  ProcessedResponse,
  QuestionId,
  SelfReportAssessment,
  TraitVector,
  UserProfile,
} from "./types";
