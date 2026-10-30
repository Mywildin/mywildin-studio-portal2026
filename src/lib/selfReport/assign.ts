import { ARCHETYPE_TEMPLATES } from "./archetypeTemplates";
import { scoreAnswers } from "./scoring";
import {
  PILLARS,
  type AnswerMap,
  type ArchetypeId,
  type SelfReportAssessment,
  type UserProfile,
} from "./types";

/**
 * A required Phoenix trait counts only when its weighted activation is clearly
 * on, not merely present as a side weight. 0.55 sits above the 0.7 floor that
 * a fully chosen trait keeps even at low intensity (1 * 0.7), and below the
 * noise of secondary weights like 0.2.
 */
export const PHOENIX_TRAIT_MIN = 0.55;

function hasTrait(profile: UserProfile, trait: string): boolean {
  if (profile.dominant_traits.includes(trait)) return true;
  if (trait === "absorptive_learning" && profile.dominant_traits.includes("passive_learning")) {
    return true;
  }
  return false;
}

function hasPhoenixTraits(profile: UserProfile): boolean {
  const template = ARCHETYPE_TEMPLATES.phoenix_enigmatic_muse;
  for (const pillar of PILLARS) {
    const traits = profile.trait_profiles[pillar];
    for (const required of template.trait_patterns[pillar].required_traits) {
      if ((traits[required] ?? 0) < PHOENIX_TRAIT_MIN) return false;
    }
  }
  return true;
}

/**
 * Section 6 decision tree. Order and fall-through match the founder sketch.
 * Section 5's compatibility score is intentionally not used.
 *
 * Owl is the remainder of the high-emotional, spiritual branch, and only when
 * extroverted energy is absent. An extroverted profile does not match Owl and
 * continues into the later checks.
 */
export function determineAnimal(profile: UserProfile): ArchetypeId {
  const scores = profile.pillar_intensities;
  const has = (trait: string) => hasTrait(profile, trait);

  if (PILLARS.every((pillar) => scores[pillar] >= 0.8) && hasPhoenixTraits(profile)) {
    return "phoenix_enigmatic_muse";
  }

  if (scores.emotional_architecture >= 0.8 && has("spiritual_connection")) {
    if (has("observer_energy")) return "whale_deep_empath";
    if (has("growth_focused")) return "butterfly_gentle_transformer";
    if (!has("extroverted_energy")) return "owl_intuitive_sage";
  }

  if (scores.cognitive_blueprint >= 0.7) {
    if (has("visionary_thinking")) {
      if (has("freedom_seeking")) return "eagle_visionary_scout";
      if (has("justice_oriented")) return "lion_bold_leader";
    } else if (has("analytical_thinking")) {
      if (has("innovative_creativity")) return "octopus_multifaceted_genius";
      return "turtle_wise_observer";
    }
  }

  if (scores.social_fabric >= 0.7) {
    if (has("extroverted_energy")) {
      if (has("large_group_social")) return "bee_community_builder";
      if (has("mission_driven_social")) return "lion_bold_leader";
    } else if (has("close_knit_social")) {
      return "wolf_loyal_pack_leader";
    }
  }

  if (scores.behavioral_grammar >= 0.7) {
    if (has("ambition_driven")) return "cheetah_focused_achiever";
    if (has("transformation_oriented")) return "butterfly_gentle_transformer";
  }

  if (has("adaptability_focused") && has("playful_communication")) return "fox_clever_adapter";
  if (has("stability_seeking") && has("supportive_communication")) return "koala_peaceful_anchor";
  if (has("growth_focused") && has("absorptive_learning")) return "deer_gentle_explorer";
  return "panda_balanced_harmonizer";
}

export function assessSelfReport(answers: AnswerMap): SelfReportAssessment {
  const { responses, profile } = scoreAnswers(answers);
  const archetypeId = determineAnimal(profile);
  return {
    responses,
    profile,
    archetypeId,
    primary_archetype: archetypeId,
    assignment_type: "decision_tree",
  };
}
