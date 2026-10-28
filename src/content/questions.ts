import type { PillarId, QuestionId } from "@/lib/selfReport/types";

export interface QuestionOption {
  id: string;
  label: string;
  gloss: string;
}

export interface QuestionContent {
  id: QuestionId;
  pillar: PillarId;
  prompt: string;
  options: QuestionOption[];
}

export const QUESTION_CONTENT: Record<QuestionId, QuestionContent> = {
  Q1: {
    id: "Q1",
    pillar: "emotional_architecture",
    prompt: "When you feel something, how far down does it go?",
    options: [
      { id: "chill", label: "Chill", gloss: "It visits. It doesn't move in." },
      { id: "balanced", label: "Balanced", gloss: "Real, but I can set it down." },
      { id: "real_talk", label: "Real talk", gloss: "If it's in me, it wants air." },
      { id: "all_in", label: "All in", gloss: "I feel it through the floorboards." },
    ],
  },
  Q2: {
    id: "Q2",
    pillar: "social_fabric",
    prompt: "How do you show up when you care about someone?",
    options: [
      { id: "low_key", label: "Low-key", gloss: "A quiet presence is the whole point." },
      { id: "warm", label: "Warm", gloss: "Steady heat. Nothing performed." },
      { id: "hyped", label: "Hyped", gloss: "I get bright when my people are near." },
      { id: "charmer", label: "Charmer", gloss: "Open, vivid, hard to miss." },
    ],
  },
  Q3: {
    id: "Q3",
    pillar: "emotional_architecture",
    prompt: "When the messy parts of you come up, you tend to…",
    options: [
      { id: "vague", label: "Vague", gloss: "I keep the outline and skip the details." },
      { id: "hints", label: "Hints", gloss: "I leave a door cracked." },
      { id: "open", label: "Open", gloss: "I'll say it if you can hold it." },
      { id: "own_it", label: "Own it", gloss: "The flaw gets a name." },
      { id: "embrace", label: "Embrace", gloss: "The mess is part of the introduction." },
    ],
  },
  Q4: {
    id: "Q4",
    pillar: "cognitive_blueprint",
    prompt: "A big question lands in your lap. You…",
    options: [
      { id: "plan_it_out", label: "Plan it out", gloss: "Structure first. Then motion." },
      { id: "trust_gut", label: "Trust gut", gloss: "The body answers before the list does." },
      { id: "analyze_deep", label: "Analyze deep", gloss: "Take it apart until the joint shows." },
      { id: "think_big", label: "Think big", gloss: "Skip to the horizon and work backward." },
    ],
  },
  Q5: {
    id: "Q5",
    pillar: "behavioral_grammar",
    prompt: "What do you protect, even when it's inconvenient?",
    options: [
      { id: "community", label: "Community", gloss: "The people count more than the preference." },
      { id: "purpose", label: "Purpose", gloss: "The days have to add up to something." },
      { id: "growth", label: "Growth", gloss: "Becoming is the actual point." },
      { id: "freedom", label: "Freedom", gloss: "Room to choose, or it isn't a life." },
      { id: "justice", label: "Justice", gloss: "I can't relax while something's unfair." },
    ],
  },
  Q6: {
    id: "Q6",
    pillar: "emotional_architecture",
    prompt: "When life pushes on something you believe, you…",
    options: [
      { id: "stand_firm", label: "Stand firm", gloss: "A few truths stay planted." },
      { id: "stay_open", label: "Stay open", gloss: "I'd rather revise than perform certainty." },
      { id: "keep_positive", label: "Keep positive", gloss: "Look for the lit window first." },
      { id: "go_deeper", label: "Go deeper", gloss: "The useful part is underneath." },
    ],
  },
  Q7: {
    id: "Q7",
    pillar: "cognitive_blueprint",
    prompt: "How do you actually learn something new?",
    options: [
      { id: "absorb_info", label: "Absorb info", gloss: "Let it soak. Sort it later." },
      { id: "see_it", label: "See it", gloss: "Show me the shape." },
      { id: "do_it", label: "Do it", gloss: "Hands first. Theory can catch up." },
      { id: "think_it_through", label: "Think it through", gloss: "I need a quiet lap around it." },
    ],
  },
  Q8: {
    id: "Q8",
    pillar: "social_fabric",
    prompt: "In a room full of people, your energy usually…",
    options: [
      { id: "full_hype", label: "Full hype", gloss: "I come alive when the room does." },
      { id: "mix_it_up", label: "Mix it up", gloss: "Host for a while, then find the porch." },
      { id: "solo_mode", label: "Solo mode", gloss: "I refill in the quiet." },
      { id: "read_the_room", label: "Read the room", gloss: "I become what the moment needs." },
      { id: "watch_and_vibe", label: "Watch & vibe", gloss: "I see plenty from the edge." },
    ],
  },
  Q9: {
    id: "Q9",
    pillar: "emotional_architecture",
    prompt: "With people you trust, the way you talk sounds like…",
    options: [
      { id: "straight_up", label: "Straight up", gloss: "Clear, even when it's tender." },
      { id: "memes_only", label: "Memes only", gloss: "Play first. The truth sneaks in." },
      { id: "go_deep", label: "Go deep", gloss: "One real conversation over ten light ones." },
      { id: "hype_everyone", label: "Hype everyone", gloss: "I become the person who steadies the others." },
      { id: "keep_chill", label: "Keep chill", gloss: "Easy temperature. Silence can work." },
    ],
  },
  Q10: {
    id: "Q10",
    pillar: "social_fabric",
    prompt: "Once someone is in your circle, loyalty looks like…",
    options: [
      { id: "stay_flexible", label: "Stay flexible", gloss: "Care, without a contract." },
      { id: "choose_wisely", label: "Choose wisely", gloss: "Devotion is selective on purpose." },
      { id: "ride_or_die", label: "Ride or die", gloss: "If you're mine, I'm there." },
      { id: "no_limits", label: "No limits", gloss: "The bond doesn't have a fine print." },
    ],
  },
  Q11: {
    id: "Q11",
    pillar: "behavioral_grammar",
    prompt: "When tension shows up between you and someone you care about, you…",
    options: [
      { id: "avoid_drama", label: "Avoid drama", gloss: "I'd rather let the wave pass." },
      { id: "smooth_over", label: "Smooth over", gloss: "Keep the bond intact, then talk." },
      { id: "stand_ground", label: "Stand ground", gloss: "I can hold my side without a war." },
      { id: "face_it", label: "Face it head-on", gloss: "We look at it while it's still hot." },
    ],
  },
  Q12: {
    id: "Q12",
    pillar: "social_fabric",
    prompt: "The company that actually fills you is…",
    options: [
      { id: "just_me", label: "Just me", gloss: "Solitude is not a consolation prize." },
      { id: "close_circle", label: "Close circle", gloss: "A few people, known well." },
      { id: "big_group", label: "Big group", gloss: "The more the room hums, the more I do." },
      { id: "same_mission", label: "Same mission", gloss: "Shared purpose beats small talk." },
    ],
  },
  Q13: {
    id: "Q13",
    pillar: "behavioral_grammar",
    prompt: "Someone you trust says, “Let's try something new this weekend.” You…",
    options: [
      { id: "lets_go", label: "Let's go!", gloss: "Yes, and where are the keys." },
      { id: "sounds_fun", label: "Sounds fun", gloss: "Curious, not reckless." },
      { id: "im_good", label: "I'm good", gloss: "The known ritual is the luxury." },
      { id: "either_way", label: "Either way", gloss: "I can be happy in more than one plot." },
      { id: "need_details", label: "Need details", gloss: "Show me the plan and I'll tell you." },
      { id: "already_packing", label: "Already packing", gloss: "I was halfway out the door." },
    ],
  },
  Q14: {
    id: "Q14",
    pillar: "behavioral_grammar",
    prompt: "When your life asks you to change, you…",
    options: [
      { id: "keep_steady", label: "Keep steady", gloss: "I trust what has already stayed." },
      { id: "roll_with_it", label: "Roll with it", gloss: "Bend, and call that a skill." },
      { id: "level_up_hard", label: "Level up hard", gloss: "Aim higher and get relentless." },
      { id: "full_reset", label: "Full reset", gloss: "Burn the chapter clean." },
    ],
  },
  Q15: {
    id: "Q15",
    pillar: "cognitive_blueprint",
    prompt: "Your creativity usually comes out as…",
    options: [
      { id: "tell_stories", label: "Tell stories", gloss: "I understand a thing by narrating it." },
      { id: "high_energy", label: "High energy", gloss: "Make it move. Make it loud." },
      { id: "keep_subtle", label: "Keep subtle", gloss: "A mark people notice later." },
      { id: "push_boundaries", label: "Push boundaries", gloss: "Nudge the form and see what answers." },
    ],
  },
};

export const QUESTION_ORDER = Object.values(QUESTION_CONTENT);
