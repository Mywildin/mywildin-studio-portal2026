import type { PillarId } from "@/lib/selfReport/types";

export const PILLAR_COPY: Record<
  PillarId,
  { title: string; short: string; blurb: string }
> = {
  emotional_architecture: {
    title: "Emotional Architecture",
    short: "Heart",
    blurb: "How deep feeling goes, and the voice you trust when you tell the truth.",
  },
  cognitive_blueprint: {
    title: "Cognitive Blueprint",
    short: "Mind",
    blurb: "The way you think, learn, and make something that wasn't there before.",
  },
  social_fabric: {
    title: "Social Fabric",
    short: "Circle",
    blurb: "The temperature of a room when you walk in, and the size of circle that feeds you.",
  },
  behavioral_grammar: {
    title: "Behavioral Grammar",
    short: "Motion",
    blurb: "What you protect, how you meet change, and what you do when the path forks.",
  },
};

/** Sentence fragments. The report says "you {phrase}." */
export const TRAIT_PHRASES: Record<string, string> = {
  spiritual_connection: "look for the meaning hiding under an ordinary hour",
  flexible_beliefs: "would rather revise a belief than defend a costume",
  rigid_beliefs: "keep a few truths planted, even when the wind picks up",
  optimistic_outlook: "reach for the lit window before the locked door",
  direct_communication: "say the thing plain, and trust the friendship to hold it",
  playful_communication: "tell the truth sideways, usually with a grin",
  deep_communication: "would trade ten light chats for one conversation that changes the air",
  supportive_communication: "become the person who makes everyone else braver",
  casual_communication: "keep the temperature easy, and let silence do some of the work",
  structured_thinking: "build a plan before you build the thing",
  intuitive_thinking: "trust the hit in your body before the spreadsheet agrees",
  analytical_thinking: "take the thing apart until the hidden joint shows",
  visionary_thinking: "think in horizons, then walk toward one",
  passive_learning: "absorb a room, a book, a friend, and let it settle",
  visual_learning: "need to see the shape of a thing before it becomes real",
  active_learning: "learn by doing, usually while already in motion",
  reflective_learning: "need a quiet lap around the idea before you keep it",
  narrative_creativity: "understand life by telling it as a story",
  dynamic_creativity: "make things that move, spark, and refuse to sit still",
  subtle_creativity: "leave a mark that most people only notice later",
  innovative_creativity: "push the edge of the form just to see what answers",
  extroverted_energy: "come alive when the room is full and the night is young",
  ambiverted_energy: "can host the party and then disappear to the porch",
  introverted_energy: "refill in the quiet, and spend that quiet generously",
  situational_energy: "read the room and become what the moment actually needs",
  observer_energy: "watch first, and somehow still miss very little",
  independent_social: "keep a wide sky around you, and invite people into it on purpose",
  close_knit_social: "do your real living inside a small, well-loved circle",
  large_group_social: "feel most like yourself when the circle gets big",
  mission_driven_social: "bond fastest with people who are walking the same long road",
  duty_oriented: "treat loyalty like a craft, not a mood",
  purpose_driven: "want the days to add up to something you could name",
  growth_focused: "treat becoming as the actual point",
  freedom_seeking: "need room to choose, or the friendship starts to feel like a cage",
  justice_oriented: "cannot quite relax while something unfair is sitting in the room",
  thrill_seeking: "say yes before the sensible part has finished its speech",
  exploration_oriented: "are pulled toward the next unopened door",
  comfort_seeking: "protect the rituals that make a life feel safe",
  balanced_approach: "can hold two good options without rushing the choice",
  planning_oriented: "want the map before the departure",
  spontaneous_action: "are already packing while everyone else is still discussing",
  stability_seeking: "trust what has already proven it will stay",
  adaptability_focused: "bend without breaking, and call that a skill",
  ambition_driven: "aim at a high mark and then get quietly relentless",
  transformation_oriented: "would rather burn a chapter clean than annotate it forever",
};

export const FAMILY_COPY: Record<
  string,
  { title: string; blurb: string }
> = {
  spark_blazers: {
    title: "Spark Blazers",
    blurb: "You start the fire, then make sure the people beside you can feel it.",
  },
  depth_weavers: {
    title: "Depth Weavers",
    blurb: "You work in the deep end of feeling, meaning, and slow becoming.",
  },
  loyal_binders: {
    title: "Loyal Binders",
    blurb: "You hold a circle steady. People exhale when you are in the room.",
  },
  path_shapers: {
    title: "Path Shapers",
    blurb: "You cut a way through. Curiosity, focus, and nerve, in different proportions.",
  },
  transcendent: {
    title: "Transcendent",
    blurb: "Rare. Every layer awake at once, and none of them willing to stay small.",
  },
};
