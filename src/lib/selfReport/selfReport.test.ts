import { describe, expect, it } from "vitest";
import { ARCHETYPE_COPY } from "@/content/archetypes";
import { QUESTION_CONTENT } from "@/content/questions";
import { ARCHETYPE_TEMPLATES } from "./archetypeTemplates";
import { assessSelfReport, determineAnimal } from "./assign";
import { allTraitKeys, SCORING_QUESTIONS } from "./questions";
import { generateWildSelfReport } from "./report";
import {
  combineIntensityAndTraits,
  getTopTraits,
  mergeTraitVectors,
  traitsToPillarScore,
} from "./scoring";
import { ARCHETYPE_IDS, PILLARS, QUESTION_IDS, type AnswerMap, type ArchetypeId } from "./types";

const sample: AnswerMap = {
  Q1: "all_in",
  Q2: "charmer",
  Q3: "own_it",
  Q4: "think_big",
  Q5: "justice",
  Q6: "go_deeper",
  Q7: "do_it",
  Q8: "full_hype",
  Q9: "go_deep",
  Q10: "no_limits",
  Q11: "face_it",
  Q12: "same_mission",
  Q13: "lets_go",
  Q14: "full_reset",
  Q15: "push_boundaries",
};

function answers(overrides: Partial<AnswerMap>): AnswerMap {
  return { ...sample, ...overrides };
}

describe("intensity and trait conversion", () => {
  it("maps the spec's intensity labels, including the missing 3s", () => {
    const q1 = SCORING_QUESTIONS.find((question) => question.id === "Q1")!;
    expect(q1.scores).toEqual({ chill: 1, balanced: 2, real_talk: 4, all_in: 5 });
    const q3 = SCORING_QUESTIONS.find((question) => question.id === "Q3")!;
    expect(q3.scores).toEqual({ vague: 1, hints: 2, open: 3, own_it: 4, embrace: 5 });
    for (const question of SCORING_QUESTIONS.filter((item) => item.kind === "intensity")) {
      const scores = Object.values(question.scores ?? {});
      expect(scores.every((score) => score >= 1 && score <= 5)).toBe(true);
      if (question.id !== "Q3") expect(scores).not.toContain(3);
    }
  });

  it("keeps the Q4 and Q15 vectors from the spec", () => {
    const q4 = SCORING_QUESTIONS.find((question) => question.id === "Q4")!;
    expect(q4.vectors?.think_big).toEqual({
      structured_thinking: 0,
      intuitive_thinking: 0.4,
      analytical_thinking: 0.2,
      visionary_thinking: 1,
    });
    const q15 = SCORING_QUESTIONS.find((question) => question.id === "Q15")!;
    expect(q15.vectors?.push_boundaries.innovative_creativity).toBe(1);
    expect(q15.vectors?.keep_subtle.subtle_creativity).toBe(1);
  });

  it("merges trait vectors by max activation", () => {
    expect(
      mergeTraitVectors([
        { visionary_thinking: 0.2, intuitive_thinking: 1 },
        { visionary_thinking: 1, intuitive_thinking: 0.4 },
      ]),
    ).toEqual({ visionary_thinking: 1, intuitive_thinking: 1 });
  });

  it("weights traits by normalized intensity", () => {
    const pillar = combineIntensityAndTraits(4.5, { spiritual_connection: 1, direct_communication: 0.2 });
    expect(pillar.intensity_level).toBeCloseTo(0.9);
    expect(pillar.trait_profile.spiritual_connection).toBeCloseTo(0.97);
    expect(pillar.trait_profile.direct_communication).toBeCloseTo(0.194);
    expect(pillar.dominant_traits[0]).toBe("spiritual_connection");
  });

  it("breaks top-trait ties by name", () => {
    expect(getTopTraits({ beta: 1, alpha: 1, gamma: 0.2 }, 2)).toEqual(["alpha", "beta"]);
  });

  it("scores cognitive blueprint from the strongest traits", () => {
    const pillar = traitsToPillarScore({
      visionary_thinking: 1,
      active_learning: 1,
      innovative_creativity: 1,
      intuitive_thinking: 0.4,
    });
    expect(pillar.intensity_level).toBeCloseTo(1);
    expect(pillar.dominant_traits).toHaveLength(3);
  });
});

describe("archetype templates", () => {
  it("covers 15 animals and keeps matcher-ready weights", () => {
    expect(Object.keys(ARCHETYPE_TEMPLATES)).toEqual([...ARCHETYPE_IDS]);
    for (const template of Object.values(ARCHETYPE_TEMPLATES)) {
      const weight = PILLARS.reduce(
        (sum, pillar) => sum + template.intensity_requirements[pillar].weight,
        0,
      );
      expect(weight).toBeCloseTo(1);
      expect(template.animal.length).toBeGreaterThan(0);
    }
    expect(ARCHETYPE_TEMPLATES.phoenix_enigmatic_muse.special_trigger).toBe(
      "requires_exceptional_scores_across_all_pillars",
    );
  });

  it("only references known traits, plus the deer alias", () => {
    const known = allTraitKeys();
    for (const template of Object.values(ARCHETYPE_TEMPLATES)) {
      for (const pillar of PILLARS) {
        const pattern = template.trait_patterns[pillar];
        for (const trait of [
          ...pattern.required_traits,
          ...pattern.preferred_traits,
          ...pattern.avoid_traits,
        ]) {
          expect(known.has(trait) || trait === "absorptive_learning").toBe(true);
        }
      }
    }
  });
});

describe("assignment", () => {
  it("turns the section 7 sample into an Owl, not the deferred Lion match", () => {
    const result = assessSelfReport(sample);
    expect(result.assignment_type).toBe("decision_tree");
    expect(result.profile.pillar_intensities.emotional_architecture).toBeCloseTo(0.9);
    expect(result.profile.pillar_intensities.social_fabric).toBeCloseTo(1);
    expect(result.profile.pillar_intensities.behavioral_grammar).toBeCloseTo(1);
    expect(result.profile.pillar_intensities.cognitive_blueprint).toBeCloseTo(1);
    expect(result.primary_archetype).toBe("owl_intuitive_sage");
    expect(result.profile.dominant_traits).toContain("spiritual_connection");
    expect(result.profile.dominant_traits).not.toContain("observer_energy");
  });

  const fixtures: Record<ArchetypeId, Partial<AnswerMap>> = {
    phoenix_enigmatic_muse: {
      Q1: "all_in",
      Q2: "charmer",
      Q3: "embrace",
      Q4: "think_big",
      Q5: "justice",
      Q6: "go_deeper",
      Q7: "think_it_through",
      Q8: "read_the_room",
      Q9: "go_deep",
      Q10: "no_limits",
      Q11: "face_it",
      Q12: "same_mission",
      Q14: "full_reset",
      Q15: "push_boundaries",
    },
    whale_deep_empath: {
      Q1: "all_in",
      Q2: "low_key",
      Q3: "embrace",
      Q4: "plan_it_out",
      Q5: "community",
      Q6: "go_deeper",
      Q8: "watch_and_vibe",
      Q9: "go_deep",
      Q10: "stay_flexible",
      Q11: "avoid_drama",
      Q15: "keep_subtle",
    },
    butterfly_gentle_transformer: {
      Q1: "all_in",
      Q2: "low_key",
      Q3: "own_it",
      Q4: "trust_gut",
      Q5: "growth",
      Q6: "go_deeper",
      Q8: "mix_it_up",
      Q9: "go_deep",
      Q10: "stay_flexible",
      Q11: "smooth_over",
    },
    owl_intuitive_sage: {},
    eagle_visionary_scout: {
      Q1: "chill",
      Q3: "vague",
      Q4: "think_big",
      Q5: "freedom",
      Q6: "stay_open",
      Q10: "choose_wisely",
      Q11: "smooth_over",
    },
    lion_bold_leader: {
      Q1: "chill",
      Q2: "charmer",
      Q3: "vague",
      Q4: "plan_it_out",
      Q5: "community",
      Q8: "full_hype",
      Q10: "no_limits",
      Q12: "same_mission",
    },
    octopus_multifaceted_genius: {
      Q1: "chill",
      Q3: "vague",
      Q4: "analyze_deep",
      Q6: "stand_firm",
      Q15: "push_boundaries",
    },
    turtle_wise_observer: {
      Q1: "chill",
      Q3: "vague",
      Q4: "analyze_deep",
      Q6: "stand_firm",
      Q15: "tell_stories",
    },
    bee_community_builder: {
      Q1: "chill",
      Q2: "hyped",
      Q3: "vague",
      Q4: "plan_it_out",
      Q8: "full_hype",
      Q10: "ride_or_die",
      Q12: "big_group",
    },
    wolf_loyal_pack_leader: {
      Q1: "chill",
      Q2: "hyped",
      Q3: "vague",
      Q4: "plan_it_out",
      Q8: "solo_mode",
      Q10: "ride_or_die",
      Q12: "close_circle",
    },
    cheetah_focused_achiever: {
      Q1: "chill",
      Q2: "low_key",
      Q3: "vague",
      Q4: "trust_gut",
      Q5: "community",
      Q10: "stay_flexible",
      Q11: "stand_ground",
      Q13: "im_good",
      Q14: "level_up_hard",
    },
    fox_clever_adapter: {
      Q1: "chill",
      Q2: "low_key",
      Q3: "vague",
      Q4: "trust_gut",
      Q9: "memes_only",
      Q10: "stay_flexible",
      Q11: "avoid_drama",
      Q14: "roll_with_it",
    },
    koala_peaceful_anchor: {
      Q1: "chill",
      Q2: "warm",
      Q3: "vague",
      Q4: "plan_it_out",
      Q6: "stay_open",
      Q9: "hype_everyone",
      Q10: "choose_wisely",
      Q11: "avoid_drama",
      Q14: "keep_steady",
    },
    deer_gentle_explorer: {
      Q1: "chill",
      Q2: "warm",
      Q3: "vague",
      Q4: "trust_gut",
      Q5: "growth",
      Q6: "stay_open",
      Q7: "absorb_info",
      Q9: "straight_up",
      Q10: "choose_wisely",
      Q11: "avoid_drama",
      Q14: "roll_with_it",
      Q15: "keep_subtle",
    },
    panda_balanced_harmonizer: {
      Q1: "chill",
      Q2: "warm",
      Q3: "vague",
      Q4: "plan_it_out",
      Q5: "community",
      Q6: "stay_open",
      Q7: "see_it",
      Q8: "mix_it_up",
      Q9: "straight_up",
      Q10: "choose_wisely",
      Q11: "avoid_drama",
      Q12: "just_me",
      Q13: "im_good",
      Q14: "roll_with_it",
      Q15: "keep_subtle",
    },
  };

  it.each(ARCHETYPE_IDS)("can reach %s from answers", (id) => {
    expect(determineAnimal(assessSelfReport(answers(fixtures[id])).profile)).toBe(id);
  });

  it("rejects an unknown option", () => {
    expect(() => assessSelfReport(answers({ Q1: "maybe" }))).toThrow(/Unknown option/);
  });
});

describe("dynamic report", () => {
  it("highlights Phoenix and fills the four pillars", () => {
    const assessment = assessSelfReport(answers(sample));
    const phoenix = assessSelfReport(
      answers({
        Q1: "all_in",
        Q2: "charmer",
        Q3: "embrace",
        Q4: "think_big",
        Q5: "justice",
        Q6: "go_deeper",
        Q7: "think_it_through",
        Q8: "read_the_room",
        Q9: "go_deep",
        Q10: "no_limits",
        Q11: "face_it",
        Q12: "same_mission",
        Q14: "full_reset",
        Q15: "push_boundaries",
      }),
    );
    const report = generateWildSelfReport(phoenix.archetypeId, phoenix.profile);
    expect(report.rare).toBe(true);
    expect(report.rarityNote).toBe(
      "The Phoenix is the rarest reading. Every pillar has to be lit, and the trait pattern has to match.",
    );
    expect(report.rarityNote).not.toMatch(/founder|%|\d/);
    expect(report.pillarBreakdown).toHaveLength(4);
    expect(report.relationshipStyle.toLowerCase()).not.toMatch(/dating|romance|boyfriend|girlfriend/);
    expect(report.strengths.length).toBeGreaterThan(0);

    const owl = generateWildSelfReport(assessment.archetypeId, assessment.profile);
    expect(owl.name).toBe("Owl");
    expect(owl.rare).toBe(false);
  });
});

describe("public copy", () => {
  it("does not use fate, fortune, or psychic language", async () => {
    const [{ ARCHETYPE_COPY }, { QUESTION_CONTENT }, { TRAIT_PHRASES, FAMILY_COPY, PILLAR_COPY }, { posts }] =
      await Promise.all([
        import("@/content/archetypes"),
        import("@/content/questions"),
        import("@/content/traits"),
        import("@/content/blog"),
      ]);
    const blob = JSON.stringify({
      ARCHETYPE_COPY,
      QUESTION_CONTENT,
      TRAIT_PHRASES,
      FAMILY_COPY,
      PILLAR_COPY,
      posts: posts.map((post) => `${post.title}\n${post.description}\n${post.body}`),
    }).toLowerCase();
    expect(blob).not.toMatch(/\bfate\b|\bfortune\b|psychic|fate os/);
  });
});

describe("editable copy stays aligned with scoring ids", () => {
  it("gives every option a label and every archetype a card", () => {
    expect(QUESTION_IDS.every((id) => QUESTION_CONTENT[id])).toBe(true);
    for (const question of SCORING_QUESTIONS) {
      const content = QUESTION_CONTENT[question.id];
      expect(content.options.map((option) => option.id)).toEqual([...question.options]);
    }
    for (const id of ARCHETYPE_IDS) {
      expect(ARCHETYPE_COPY[id].name.length).toBeGreaterThan(0);
      expect(ARCHETYPE_COPY[id].strengths.length).toBeGreaterThan(0);
      expect(ARCHETYPE_COPY[id].growthEdges.length).toBeGreaterThan(0);
    }
  });
});
