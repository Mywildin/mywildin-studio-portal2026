import type { QuestionId, QuestionKind, TraitVector } from "./types";

export interface ScoringQuestion {
  id: QuestionId;
  kind: QuestionKind;
  /** Stable option ids. Display labels live in src/content/questions.ts. */
  options: readonly string[];
  scores?: Record<string, number>;
  vectors?: Record<string, TraitVector>;
}

const intensity = (
  id: QuestionId,
  scores: Record<string, number>,
): ScoringQuestion => ({
  id,
  kind: "intensity",
  options: Object.keys(scores),
  scores,
});

const typeQuestion = (
  id: QuestionId,
  vectors: Record<string, TraitVector>,
): ScoringQuestion => ({
  id,
  kind: "type",
  options: Object.keys(vectors),
  vectors,
});

/**
 * Option ids are the stable keys. Canonical labels from the founder spec:
 * Q1 Chill / Balanced / Real talk / All in
 * Q2 Low-key / Warm / Hyped / Charmer
 * Q3 Vague / Hints / Open / Own it / Embrace
 * Q4 Plan it out / Trust gut / Analyze deep / Think big
 * Q5 Community / Purpose / Growth / Freedom / Justice
 * Q6 Stand firm / Stay open / Keep positive / Go deeper
 * Q7 Absorb info / See it / Do it / Think it through
 * Q8 Full hype / Mix it up / Solo mode / Read the room / Watch & vibe
 * Q9 Straight up / Memes only / Go deep / Hype everyone / Keep chill
 * Q10 Stay flexible / Choose wisely / Ride or die / No limits
 * Q11 Avoid drama / Smooth over / Stand ground / Face it head-on
 * Q12 Just me / Close circle / Big group / Same mission
 * Q13 Let's go! / Sounds fun / I'm good / Either way / Need details / Already packing
 * Q14 Keep steady / Roll with it / Level up hard / Full reset
 * Q15 Tell stories / High energy / Keep subtle / Push boundaries
 *
 * Vectors keep every weight from the spec, including explicit zeros.
 */
export const SCORING_QUESTIONS: readonly ScoringQuestion[] = [
  intensity("Q1", { chill: 1, balanced: 2, real_talk: 4, all_in: 5 }),
  intensity("Q2", { low_key: 1, warm: 2, hyped: 4, charmer: 5 }),
  intensity("Q3", { vague: 1, hints: 2, open: 3, own_it: 4, embrace: 5 }),
  typeQuestion("Q4", {
    plan_it_out: {
      structured_thinking: 1,
      intuitive_thinking: 0,
      analytical_thinking: 0.2,
      visionary_thinking: 0,
    },
    trust_gut: {
      structured_thinking: 0,
      intuitive_thinking: 1,
      analytical_thinking: 0,
      visionary_thinking: 0.3,
    },
    analyze_deep: {
      structured_thinking: 0.3,
      intuitive_thinking: 0,
      analytical_thinking: 1,
      visionary_thinking: 0.2,
    },
    think_big: {
      structured_thinking: 0,
      intuitive_thinking: 0.4,
      analytical_thinking: 0.2,
      visionary_thinking: 1,
    },
  }),
  typeQuestion("Q5", {
    community: {
      duty_oriented: 1,
      purpose_driven: 0.3,
      growth_focused: 0.2,
      freedom_seeking: 0,
      justice_oriented: 0.2,
    },
    purpose: {
      duty_oriented: 0.2,
      purpose_driven: 1,
      growth_focused: 0.4,
      freedom_seeking: 0.3,
      justice_oriented: 0.1,
    },
    growth: {
      duty_oriented: 0.1,
      purpose_driven: 0.4,
      growth_focused: 1,
      freedom_seeking: 0.2,
      justice_oriented: 0,
    },
    freedom: {
      duty_oriented: 0,
      purpose_driven: 0.2,
      growth_focused: 0.3,
      freedom_seeking: 1,
      justice_oriented: 0.1,
    },
    justice: {
      duty_oriented: 0.3,
      purpose_driven: 0.1,
      growth_focused: 0,
      freedom_seeking: 0.2,
      justice_oriented: 1,
    },
  }),
  typeQuestion("Q6", {
    stand_firm: {
      rigid_beliefs: 1,
      flexible_beliefs: 0,
      optimistic_outlook: 0.1,
      spiritual_connection: 0,
    },
    stay_open: {
      rigid_beliefs: 0,
      flexible_beliefs: 1,
      optimistic_outlook: 0.3,
      spiritual_connection: 0.2,
    },
    keep_positive: {
      rigid_beliefs: 0.1,
      flexible_beliefs: 0.4,
      optimistic_outlook: 1,
      spiritual_connection: 0.1,
    },
    go_deeper: {
      rigid_beliefs: 0,
      flexible_beliefs: 0.3,
      optimistic_outlook: 0.2,
      spiritual_connection: 1,
    },
  }),
  typeQuestion("Q7", {
    absorb_info: {
      passive_learning: 1,
      visual_learning: 0.2,
      active_learning: 0,
      reflective_learning: 0.4,
    },
    see_it: {
      passive_learning: 0.3,
      visual_learning: 1,
      active_learning: 0.1,
      reflective_learning: 0.2,
    },
    do_it: {
      passive_learning: 0,
      visual_learning: 0.2,
      active_learning: 1,
      reflective_learning: 0.1,
    },
    think_it_through: {
      passive_learning: 0.2,
      visual_learning: 0.1,
      active_learning: 0,
      reflective_learning: 1,
    },
  }),
  typeQuestion("Q8", {
    full_hype: {
      extroverted_energy: 1,
      ambiverted_energy: 0,
      introverted_energy: 0,
      situational_energy: 0.2,
      observer_energy: 0,
    },
    mix_it_up: {
      extroverted_energy: 0.3,
      ambiverted_energy: 1,
      introverted_energy: 0.3,
      situational_energy: 0.4,
      observer_energy: 0.1,
    },
    solo_mode: {
      extroverted_energy: 0,
      ambiverted_energy: 0,
      introverted_energy: 1,
      situational_energy: 0.1,
      observer_energy: 0.3,
    },
    read_the_room: {
      extroverted_energy: 0.2,
      ambiverted_energy: 0.4,
      introverted_energy: 0.2,
      situational_energy: 1,
      observer_energy: 0.4,
    },
    watch_and_vibe: {
      extroverted_energy: 0,
      ambiverted_energy: 0.1,
      introverted_energy: 0.4,
      situational_energy: 0.2,
      observer_energy: 1,
    },
  }),
  typeQuestion("Q9", {
    straight_up: {
      direct_communication: 1,
      playful_communication: 0,
      deep_communication: 0.1,
      supportive_communication: 0.2,
      casual_communication: 0,
    },
    memes_only: {
      direct_communication: 0.1,
      playful_communication: 1,
      deep_communication: 0,
      supportive_communication: 0.3,
      casual_communication: 0.4,
    },
    go_deep: {
      direct_communication: 0.2,
      playful_communication: 0,
      deep_communication: 1,
      supportive_communication: 0.1,
      casual_communication: 0,
    },
    hype_everyone: {
      direct_communication: 0,
      playful_communication: 0.3,
      deep_communication: 0.1,
      supportive_communication: 1,
      casual_communication: 0.2,
    },
    keep_chill: {
      direct_communication: 0,
      playful_communication: 0.2,
      deep_communication: 0,
      supportive_communication: 0.2,
      casual_communication: 1,
    },
  }),
  intensity("Q10", {
    stay_flexible: 1,
    choose_wisely: 2,
    ride_or_die: 4,
    no_limits: 5,
  }),
  intensity("Q11", {
    avoid_drama: 1,
    smooth_over: 2,
    stand_ground: 4,
    face_it: 5,
  }),
  typeQuestion("Q12", {
    just_me: {
      independent_social: 1,
      close_knit_social: 0,
      large_group_social: 0,
      mission_driven_social: 0.2,
    },
    close_circle: {
      independent_social: 0.2,
      close_knit_social: 1,
      large_group_social: 0,
      mission_driven_social: 0.1,
    },
    big_group: {
      independent_social: 0,
      close_knit_social: 0.1,
      large_group_social: 1,
      mission_driven_social: 0.2,
    },
    same_mission: {
      independent_social: 0.3,
      close_knit_social: 0.2,
      large_group_social: 0.3,
      mission_driven_social: 1,
    },
  }),
  typeQuestion("Q13", {
    lets_go: {
      thrill_seeking: 1,
      exploration_oriented: 0.4,
      comfort_seeking: 0,
      balanced_approach: 0,
      planning_oriented: 0,
      spontaneous_action: 0.8,
    },
    sounds_fun: {
      thrill_seeking: 0.3,
      exploration_oriented: 1,
      comfort_seeking: 0.1,
      balanced_approach: 0.2,
      planning_oriented: 0.2,
      spontaneous_action: 0.3,
    },
    im_good: {
      thrill_seeking: 0,
      exploration_oriented: 0,
      comfort_seeking: 1,
      balanced_approach: 0.1,
      planning_oriented: 0.1,
      spontaneous_action: 0,
    },
    either_way: {
      thrill_seeking: 0.2,
      exploration_oriented: 0.2,
      comfort_seeking: 0.3,
      balanced_approach: 1,
      planning_oriented: 0.2,
      spontaneous_action: 0.2,
    },
    need_details: {
      thrill_seeking: 0.1,
      exploration_oriented: 0.3,
      comfort_seeking: 0.2,
      balanced_approach: 0.2,
      planning_oriented: 1,
      spontaneous_action: 0,
    },
    already_packing: {
      thrill_seeking: 0.6,
      exploration_oriented: 0.8,
      comfort_seeking: 0,
      balanced_approach: 0,
      planning_oriented: 0,
      spontaneous_action: 1,
    },
  }),
  typeQuestion("Q14", {
    keep_steady: {
      stability_seeking: 1,
      adaptability_focused: 0,
      ambition_driven: 0,
      transformation_oriented: 0,
    },
    roll_with_it: {
      stability_seeking: 0.1,
      adaptability_focused: 1,
      ambition_driven: 0.2,
      transformation_oriented: 0.3,
    },
    level_up_hard: {
      stability_seeking: 0,
      adaptability_focused: 0.2,
      ambition_driven: 1,
      transformation_oriented: 0.4,
    },
    full_reset: {
      stability_seeking: 0,
      adaptability_focused: 0.3,
      ambition_driven: 0.6,
      transformation_oriented: 1,
    },
  }),
  typeQuestion("Q15", {
    tell_stories: {
      narrative_creativity: 1,
      dynamic_creativity: 0.2,
      subtle_creativity: 0.3,
      innovative_creativity: 0.1,
    },
    high_energy: {
      narrative_creativity: 0.1,
      dynamic_creativity: 1,
      subtle_creativity: 0,
      innovative_creativity: 0.3,
    },
    keep_subtle: {
      narrative_creativity: 0.4,
      dynamic_creativity: 0,
      subtle_creativity: 1,
      innovative_creativity: 0.2,
    },
    push_boundaries: {
      narrative_creativity: 0.2,
      dynamic_creativity: 0.4,
      subtle_creativity: 0,
      innovative_creativity: 1,
    },
  }),
];

export const SCORING_QUESTION_MAP: Record<QuestionId, ScoringQuestion> =
  Object.fromEntries(SCORING_QUESTIONS.map((question) => [question.id, question])) as Record<
    QuestionId,
    ScoringQuestion
  >;

export function allTraitKeys(): Set<string> {
  const keys = new Set<string>();
  for (const question of SCORING_QUESTIONS) {
    if (!question.vectors) continue;
    for (const vector of Object.values(question.vectors)) {
      for (const key of Object.keys(vector)) keys.add(key);
    }
  }
  return keys;
}
