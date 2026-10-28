import type {
  ArchetypeId,
  ArchetypeTemplate,
  IntensityRequirement,
  PillarId,
  TraitPattern,
} from "./types";

const band = (min: number, max: number, weight: number): IntensityRequirement => ({
  min,
  max,
  weight,
});

const pattern = (
  required: string[],
  preferred: string[],
  avoid: string[],
): TraitPattern => ({
  required_traits: required,
  preferred_traits: preferred,
  avoid_traits: avoid,
});

function template(
  id: ArchetypeId,
  animal: string,
  family: ArchetypeTemplate["family"],
  intensity: Record<PillarId, IntensityRequirement>,
  traits: Record<PillarId, TraitPattern>,
  specialTrigger?: string,
): ArchetypeTemplate {
  return {
    id,
    animal,
    family,
    intensity_requirements: intensity,
    trait_patterns: traits,
    ...(specialTrigger ? { special_trigger: specialTrigger } : {}),
  };
}

/**
 * Archetype templates copied from the founder spec so a later compatibility
 * matcher (section 5) can read them without a schema change.
 *
 * Two spec strings are preserved verbatim even though they don't line up
 * with the question vectors:
 * - Deer asks for absorptive_learning. The question bank calls that trait
 *   passive_learning. Assignment treats them as aliases.
 * - Panda lists balanced_approach on the cognitive pillar. That trait is
 *   produced by Q13, which feeds Behavioral Grammar.
 */
export const ARCHETYPE_TEMPLATES: Record<ArchetypeId, ArchetypeTemplate> = {
  lion_bold_leader: template(
    "lion_bold_leader",
    "lion",
    "spark_blazers",
    {
      emotional_architecture: band(0.6, 1, 0.3),
      cognitive_blueprint: band(0.5, 1, 0.2),
      social_fabric: band(0.6, 1, 0.2),
      behavioral_grammar: band(0.7, 1, 0.3),
    },
    {
      emotional_architecture: pattern(
        ["flexible_beliefs", "direct_communication"],
        ["spiritual_connection"],
        ["rigid_beliefs", "casual_communication"],
      ),
      cognitive_blueprint: pattern(
        ["visionary_thinking"],
        ["active_learning", "innovative_creativity"],
        ["passive_learning", "subtle_creativity"],
      ),
      social_fabric: pattern(
        ["extroverted_energy", "mission_driven_social"],
        ["situational_energy"],
        ["introverted_energy", "independent_social"],
      ),
      behavioral_grammar: pattern(
        ["justice_oriented", "transformation_oriented"],
        ["ambition_driven", "thrill_seeking"],
        ["stability_seeking", "comfort_seeking"],
      ),
    },
  ),
  butterfly_gentle_transformer: template(
    "butterfly_gentle_transformer",
    "butterfly",
    "depth_weavers",
    {
      emotional_architecture: band(0.7, 1, 0.4),
      cognitive_blueprint: band(0.5, 0.8, 0.2),
      social_fabric: band(0.4, 0.7, 0.2),
      behavioral_grammar: band(0.6, 0.9, 0.2),
    },
    {
      emotional_architecture: pattern(
        ["spiritual_connection", "flexible_beliefs"],
        ["deep_communication"],
        ["rigid_beliefs", "casual_communication"],
      ),
      cognitive_blueprint: pattern(
        ["intuitive_thinking"],
        ["reflective_learning", "narrative_creativity"],
        ["structured_thinking", "dynamic_creativity"],
      ),
      social_fabric: pattern(
        ["close_knit_social"],
        ["ambiverted_energy", "observer_energy"],
        ["large_group_social", "extroverted_energy"],
      ),
      behavioral_grammar: pattern(
        ["growth_focused", "transformation_oriented"],
        ["adaptability_focused"],
        ["stability_seeking", "thrill_seeking"],
      ),
    },
  ),
  wolf_loyal_pack_leader: template(
    "wolf_loyal_pack_leader",
    "wolf",
    "loyal_binders",
    {
      emotional_architecture: band(0.5, 0.8, 0.2),
      cognitive_blueprint: band(0.6, 0.9, 0.3),
      social_fabric: band(0.6, 0.9, 0.3),
      behavioral_grammar: band(0.5, 0.8, 0.2),
    },
    {
      emotional_architecture: pattern(
        ["supportive_communication"],
        ["flexible_beliefs", "direct_communication"],
        ["casual_communication", "rigid_beliefs"],
      ),
      cognitive_blueprint: pattern(
        ["analytical_thinking"],
        ["active_learning", "structured_thinking"],
        ["passive_learning", "innovative_creativity"],
      ),
      social_fabric: pattern(
        ["close_knit_social"],
        ["ambiverted_energy", "situational_energy"],
        ["independent_social", "large_group_social"],
      ),
      behavioral_grammar: pattern(
        ["duty_oriented"],
        ["stability_seeking", "exploration_oriented"],
        ["transformation_oriented", "comfort_seeking"],
      ),
    },
  ),
  whale_deep_empath: template(
    "whale_deep_empath",
    "whale",
    "depth_weavers",
    {
      emotional_architecture: band(0.8, 1, 0.4),
      cognitive_blueprint: band(0.7, 1, 0.3),
      social_fabric: band(0.2, 0.6, 0.2),
      behavioral_grammar: band(0.3, 0.7, 0.1),
    },
    {
      emotional_architecture: pattern(
        ["spiritual_connection", "deep_communication"],
        ["flexible_beliefs"],
        ["casual_communication", "playful_communication"],
      ),
      cognitive_blueprint: pattern(
        ["analytical_thinking", "reflective_learning"],
        ["narrative_creativity", "intuitive_thinking"],
        ["active_learning", "dynamic_creativity"],
      ),
      social_fabric: pattern(
        ["observer_energy", "introverted_energy"],
        ["close_knit_social"],
        ["extroverted_energy", "large_group_social"],
      ),
      behavioral_grammar: pattern(
        ["growth_focused"],
        ["adaptability_focused", "purpose_driven"],
        ["thrill_seeking", "spontaneous_action"],
      ),
    },
  ),
  cheetah_focused_achiever: template(
    "cheetah_focused_achiever",
    "cheetah",
    "path_shapers",
    {
      emotional_architecture: band(0.4, 0.7, 0.2),
      cognitive_blueprint: band(0.6, 0.9, 0.3),
      social_fabric: band(0.3, 0.7, 0.2),
      behavioral_grammar: band(0.7, 1, 0.3),
    },
    {
      emotional_architecture: pattern(
        ["direct_communication"],
        ["flexible_beliefs"],
        ["deep_communication", "playful_communication"],
      ),
      cognitive_blueprint: pattern(
        ["structured_thinking"],
        ["active_learning", "analytical_thinking"],
        ["passive_learning", "narrative_creativity"],
      ),
      social_fabric: pattern(
        ["independent_social"],
        ["mission_driven_social", "situational_energy"],
        ["large_group_social", "extroverted_energy"],
      ),
      behavioral_grammar: pattern(
        ["ambition_driven"],
        ["transformation_oriented", "thrill_seeking"],
        ["stability_seeking", "comfort_seeking"],
      ),
    },
  ),
  koala_peaceful_anchor: template(
    "koala_peaceful_anchor",
    "koala",
    "loyal_binders",
    {
      emotional_architecture: band(0.3, 0.6, 0.3),
      cognitive_blueprint: band(0.4, 0.7, 0.2),
      social_fabric: band(0.4, 0.7, 0.3),
      behavioral_grammar: band(0.2, 0.5, 0.2),
    },
    {
      emotional_architecture: pattern(
        ["supportive_communication"],
        ["optimistic_outlook", "flexible_beliefs"],
        ["direct_communication", "deep_communication"],
      ),
      cognitive_blueprint: pattern(
        ["visual_learning"],
        ["reflective_learning", "subtle_creativity"],
        ["active_learning", "innovative_creativity"],
      ),
      social_fabric: pattern(
        ["close_knit_social"],
        ["ambiverted_energy", "introverted_energy"],
        ["large_group_social", "mission_driven_social"],
      ),
      behavioral_grammar: pattern(
        ["stability_seeking"],
        ["comfort_seeking", "duty_oriented"],
        ["transformation_oriented", "thrill_seeking"],
      ),
    },
  ),
  eagle_visionary_scout: template(
    "eagle_visionary_scout",
    "eagle",
    "path_shapers",
    {
      emotional_architecture: band(0.5, 0.8, 0.2),
      cognitive_blueprint: band(0.7, 1, 0.4),
      social_fabric: band(0.2, 0.6, 0.2),
      behavioral_grammar: band(0.7, 1, 0.2),
    },
    {
      emotional_architecture: pattern(
        ["direct_communication"],
        ["flexible_beliefs"],
        ["playful_communication", "supportive_communication"],
      ),
      cognitive_blueprint: pattern(
        ["visionary_thinking"],
        ["reflective_learning", "innovative_creativity"],
        ["structured_thinking", "visual_learning"],
      ),
      social_fabric: pattern(
        ["independent_social"],
        ["situational_energy", "observer_energy"],
        ["large_group_social", "extroverted_energy"],
      ),
      behavioral_grammar: pattern(
        ["freedom_seeking"],
        ["transformation_oriented", "exploration_oriented"],
        ["duty_oriented", "stability_seeking"],
      ),
    },
  ),
  bee_community_builder: template(
    "bee_community_builder",
    "bee",
    "spark_blazers",
    {
      emotional_architecture: band(0.5, 0.8, 0.2),
      cognitive_blueprint: band(0.4, 0.7, 0.2),
      social_fabric: band(0.7, 1, 0.4),
      behavioral_grammar: band(0.4, 0.7, 0.2),
    },
    {
      emotional_architecture: pattern(
        ["supportive_communication"],
        ["optimistic_outlook", "flexible_beliefs"],
        ["direct_communication", "deep_communication"],
      ),
      cognitive_blueprint: pattern(
        ["active_learning"],
        ["narrative_creativity", "visual_learning"],
        ["reflective_learning", "innovative_creativity"],
      ),
      social_fabric: pattern(
        ["extroverted_energy", "large_group_social"],
        ["situational_energy", "mission_driven_social"],
        ["introverted_energy", "independent_social"],
      ),
      behavioral_grammar: pattern(
        ["duty_oriented"],
        ["adaptability_focused", "balanced_approach"],
        ["transformation_oriented", "thrill_seeking"],
      ),
    },
  ),
  fox_clever_adapter: template(
    "fox_clever_adapter",
    "fox",
    "path_shapers",
    {
      emotional_architecture: band(0.4, 0.7, 0.2),
      cognitive_blueprint: band(0.5, 0.8, 0.3),
      social_fabric: band(0.5, 0.8, 0.2),
      behavioral_grammar: band(0.6, 0.9, 0.3),
    },
    {
      emotional_architecture: pattern(
        ["playful_communication"],
        ["flexible_beliefs", "optimistic_outlook"],
        ["deep_communication", "rigid_beliefs"],
      ),
      cognitive_blueprint: pattern(
        ["intuitive_thinking"],
        ["visual_learning", "innovative_creativity"],
        ["structured_thinking", "passive_learning"],
      ),
      social_fabric: pattern(
        ["situational_energy"],
        ["ambiverted_energy", "close_knit_social"],
        ["introverted_energy", "large_group_social"],
      ),
      behavioral_grammar: pattern(
        ["adaptability_focused"],
        ["exploration_oriented", "balanced_approach"],
        ["stability_seeking", "transformation_oriented"],
      ),
    },
  ),
  turtle_wise_observer: template(
    "turtle_wise_observer",
    "turtle",
    "depth_weavers",
    {
      emotional_architecture: band(0.6, 0.9, 0.3),
      cognitive_blueprint: band(0.7, 1, 0.4),
      social_fabric: band(0.2, 0.5, 0.2),
      behavioral_grammar: band(0.2, 0.5, 0.1),
    },
    {
      emotional_architecture: pattern(
        ["deep_communication"],
        ["spiritual_connection", "flexible_beliefs"],
        ["playful_communication", "casual_communication"],
      ),
      cognitive_blueprint: pattern(
        ["analytical_thinking", "reflective_learning"],
        ["structured_thinking", "narrative_creativity"],
        ["active_learning", "dynamic_creativity"],
      ),
      social_fabric: pattern(
        ["observer_energy"],
        ["introverted_energy", "close_knit_social"],
        ["extroverted_energy", "large_group_social"],
      ),
      behavioral_grammar: pattern(
        ["stability_seeking"],
        ["growth_focused", "planning_oriented"],
        ["thrill_seeking", "spontaneous_action"],
      ),
    },
  ),
  deer_gentle_explorer: template(
    "deer_gentle_explorer",
    "deer",
    "depth_weavers",
    {
      emotional_architecture: band(0.5, 0.8, 0.3),
      cognitive_blueprint: band(0.4, 0.7, 0.2),
      social_fabric: band(0.4, 0.7, 0.3),
      behavioral_grammar: band(0.5, 0.8, 0.2),
    },
    {
      emotional_architecture: pattern(
        ["supportive_communication"],
        ["flexible_beliefs", "optimistic_outlook"],
        ["direct_communication", "rigid_beliefs"],
      ),
      cognitive_blueprint: pattern(
        ["absorptive_learning"],
        ["visual_learning", "subtle_creativity"],
        ["active_learning", "innovative_creativity"],
      ),
      social_fabric: pattern(
        ["close_knit_social"],
        ["ambiverted_energy", "situational_energy"],
        ["independent_social", "large_group_social"],
      ),
      behavioral_grammar: pattern(
        ["growth_focused"],
        ["adaptability_focused", "exploration_oriented"],
        ["stability_seeking", "thrill_seeking"],
      ),
    },
  ),
  octopus_multifaceted_genius: template(
    "octopus_multifaceted_genius",
    "octopus",
    "path_shapers",
    {
      emotional_architecture: band(0.6, 0.9, 0.2),
      cognitive_blueprint: band(0.8, 1, 0.4),
      social_fabric: band(0.5, 0.8, 0.2),
      behavioral_grammar: band(0.7, 1, 0.2),
    },
    {
      emotional_architecture: pattern(
        ["flexible_beliefs"],
        ["deep_communication", "spiritual_connection"],
        ["rigid_beliefs", "casual_communication"],
      ),
      cognitive_blueprint: pattern(
        ["analytical_thinking", "innovative_creativity"],
        ["visionary_thinking", "reflective_learning"],
        ["passive_learning", "subtle_creativity"],
      ),
      social_fabric: pattern(
        ["situational_energy"],
        ["ambiverted_energy", "mission_driven_social"],
        ["introverted_energy", "independent_social"],
      ),
      behavioral_grammar: pattern(
        ["transformation_oriented"],
        ["ambition_driven", "adaptability_focused"],
        ["stability_seeking", "comfort_seeking"],
      ),
    },
  ),
  panda_balanced_harmonizer: template(
    "panda_balanced_harmonizer",
    "panda",
    "loyal_binders",
    {
      emotional_architecture: band(0.4, 0.7, 0.25),
      cognitive_blueprint: band(0.4, 0.7, 0.25),
      social_fabric: band(0.4, 0.7, 0.25),
      behavioral_grammar: band(0.4, 0.7, 0.25),
    },
    {
      emotional_architecture: pattern(
        ["optimistic_outlook"],
        ["flexible_beliefs", "supportive_communication"],
        ["rigid_beliefs", "direct_communication"],
      ),
      cognitive_blueprint: pattern(
        ["balanced_approach"],
        ["visual_learning", "narrative_creativity"],
        ["innovative_creativity", "analytical_thinking"],
      ),
      social_fabric: pattern(
        ["ambiverted_energy"],
        ["situational_energy", "close_knit_social"],
        ["extroverted_energy", "independent_social"],
      ),
      behavioral_grammar: pattern(
        ["balanced_approach"],
        ["adaptability_focused", "growth_focused"],
        ["transformation_oriented", "thrill_seeking"],
      ),
    },
  ),
  owl_intuitive_sage: template(
    "owl_intuitive_sage",
    "owl",
    "depth_weavers",
    {
      emotional_architecture: band(0.7, 1, 0.3),
      cognitive_blueprint: band(0.6, 0.9, 0.3),
      social_fabric: band(0.2, 0.6, 0.2),
      behavioral_grammar: band(0.5, 0.8, 0.2),
    },
    {
      emotional_architecture: pattern(
        ["spiritual_connection"],
        ["deep_communication", "flexible_beliefs"],
        ["playful_communication", "casual_communication"],
      ),
      cognitive_blueprint: pattern(
        ["reflective_learning"],
        ["intuitive_thinking", "narrative_creativity"],
        ["active_learning", "dynamic_creativity"],
      ),
      social_fabric: pattern(
        ["observer_energy"],
        ["introverted_energy", "close_knit_social"],
        ["extroverted_energy", "large_group_social"],
      ),
      behavioral_grammar: pattern(
        ["growth_focused"],
        ["adaptability_focused", "purpose_driven"],
        ["thrill_seeking", "transformation_oriented"],
      ),
    },
  ),
  phoenix_enigmatic_muse: template(
    "phoenix_enigmatic_muse",
    "phoenix",
    "transcendent",
    {
      emotional_architecture: band(0.8, 1, 0.25),
      cognitive_blueprint: band(0.8, 1, 0.25),
      social_fabric: band(0.7, 1, 0.25),
      behavioral_grammar: band(0.8, 1, 0.25),
    },
    {
      emotional_architecture: pattern(
        ["spiritual_connection", "deep_communication"],
        ["flexible_beliefs"],
        ["rigid_beliefs", "casual_communication"],
      ),
      cognitive_blueprint: pattern(
        ["visionary_thinking", "innovative_creativity"],
        ["analytical_thinking", "reflective_learning"],
        ["passive_learning", "subtle_creativity"],
      ),
      social_fabric: pattern(
        ["situational_energy", "mission_driven_social"],
        ["extroverted_energy", "ambiverted_energy"],
        ["independent_social", "observer_energy"],
      ),
      behavioral_grammar: pattern(
        ["transformation_oriented", "justice_oriented"],
        ["ambition_driven", "freedom_seeking"],
        ["stability_seeking", "comfort_seeking"],
      ),
    },
    "requires_exceptional_scores_across_all_pillars",
  ),
};
