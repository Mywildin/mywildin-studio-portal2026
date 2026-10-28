import type { ArchetypeId } from "@/lib/selfReport/types";

export interface ArchetypeCopy {
  id: ArchetypeId;
  name: string;
  epithet: string;
  tagline: string;
  description: string;
  strengths: string[];
  growthEdges: string[];
  qualities: string[];
  symbolicMeaning: string;
  superpower: string;
}

export const ARCHETYPE_COPY: Record<ArchetypeId, ArchetypeCopy> = {
  lion_bold_leader: {
    id: "lion_bold_leader",
    name: "Lion",
    epithet: "Bold Leader",
    tagline: "Courage, said out loud.",
    symbolicMeaning: "courage and transformative leadership",
    qualities: ["Bold", "Charismatic", "Protective", "Courageous"],
    description:
      "You walk in and the air decides something. The Lion is a Spark Blazer: friendship, for you, is a kind of mission. You protect the people you claim, and you would rather say the hard thing cleanly than let it rot between you. Your courage is contagious. People stand up straighter after a real conversation with you. The heat is the gift and the caution — the same fire that leads can rush a quieter friend who needed another minute.",
    strengths: [
      "You name what is unfair and then move",
      "Your certainty gives other people a place to stand",
      "You protect a circle without making it a cage",
    ],
    growthEdges: [
      "Leave room for a slower yes",
      "Let someone else hold the torch for a while",
      "Not every silence is a problem to solve",
    ],
    superpower: "You make bravery feel like a group activity.",
  },
  butterfly_gentle_transformer: {
    id: "butterfly_gentle_transformer",
    name: "Butterfly",
    epithet: "Gentle Transformer",
    tagline: "Change, worn lightly.",
    symbolicMeaning: "gentle transformation and spiritual growth",
    qualities: ["Graceful", "Transformative", "Gentle", "Evolving"],
    description:
      "You do not force a becoming. You undergo it, and the people close to you feel the weather change. The Butterfly belongs with the Depth Weavers: intuitive, growth-minded, more at home in a small circle than a crowd. Friendship with you is a long conversation about who someone is turning into. You offer metamorphosis without the lecture. Watch the pull to remake a bond before it has finished telling you what it already is.",
    strengths: [
      "You sense the next version of a person before they do",
      "Growth, around you, feels kind instead of graded",
      "You can hold tenderness and change in the same hand",
    ],
    growthEdges: [
      "Stay through the awkward middle, not only the reveal",
      "Let some friendships be simple",
      "Your own pace counts as much as anyone else's becoming",
    ],
    superpower: "You make change feel like a kindness.",
  },
  wolf_loyal_pack_leader: {
    id: "wolf_loyal_pack_leader",
    name: "Wolf",
    epithet: "Loyal Pack Leader",
    tagline: "The circle, kept.",
    symbolicMeaning: "loyalty and pack leadership",
    qualities: ["Loyal", "Protective", "Strategic", "Steady"],
    description:
      "You know who your people are, and you do not pretend the list is infinite. The Wolf is a Loyal Binder: analytical when it matters, supportive without fuss, steady when the night gets long. You lead a small pack by paying attention — who is tired, who is bluffing, who needs the walk home. Friendship is a responsibility you actually enjoy. The edge is the gate: a circle this loyal can forget to open.",
    strengths: [
      "People trust you with the unpretty truth",
      "You plan for the group, not only for yourself",
      "Your loyalty has a spine",
    ],
    growthEdges: [
      "Let new people earn a place without a decade of probation",
      "Ask for care, not only give it",
      "Strategy is not the same thing as control",
    ],
    superpower: "You turn a handful of people into a place that holds.",
  },
  whale_deep_empath: {
    id: "whale_deep_empath",
    name: "Whale",
    epithet: "Deep Empath",
    tagline: "The long song under the noise.",
    symbolicMeaning: "emotional depth and ancient wisdom",
    qualities: ["Wise", "Empathic", "Profound", "Attuned"],
    description:
      "You feel the room in layers other people only visit. The Whale is a Depth Weaver: spiritual without needing a costume, reflective, more moved by one true exchange than by a full table. Friendship with you happens underwater — slow, vast, and oddly precise. You carry other people's weather, sometimes longer than they do. That is a gift when you choose it, and a leak when you don't.",
    strengths: [
      "You hear what was not quite said",
      "Your presence makes depth feel safe",
      "You remember the emotional history of a friendship",
    ],
    growthEdges: [
      "Not every feeling that visits is yours to keep",
      "Come up for ordinary, lightweight joy",
      "Let a friend be fine without a full reading",
    ],
    superpower: "You give people a place deep enough to tell the truth.",
  },
  cheetah_focused_achiever: {
    id: "cheetah_focused_achiever",
    name: "Cheetah",
    epithet: "Focused Achiever",
    tagline: "One line, taken clean.",
    symbolicMeaning: "precision and the art of arriving",
    qualities: ["Focused", "Precise", "Determined", "Swift"],
    description:
      "You pick a point on the horizon and the rest of the landscape gets quiet. The Cheetah is a Path Shaper: structured, ambitious, direct, happiest with a mission and enough solitude to run it. Friendship, for you, is respect with a pulse — people who do not waste the hour, and who tell you the truth on the way. You are astonishing when the aim is clear. You can miss the friend who wanted to wander with no finish line.",
    strengths: [
      "You turn intention into motion",
      "Your honesty saves people months",
      "You respect other people's focus as a form of care",
    ],
    growthEdges: [
      "Some of the best friendships have no scoreboard",
      "Rest is part of the pace, not a failure of it",
      "Let a plan be interrupted by a person",
    ],
    superpower: "You make a direction feel possible.",
  },
  koala_peaceful_anchor: {
    id: "koala_peaceful_anchor",
    name: "Koala",
    epithet: "Peaceful Anchor",
    tagline: "A calm you can lean on.",
    symbolicMeaning: "stability and peaceful presence",
    qualities: ["Calm", "Steady", "Comforting", "Reliable"],
    description:
      "You are the friend people call when the day has been too loud. The Koala is a Loyal Binder: supportive, visual, dutiful in a soft way, steady without making a speech about it. You like a small circle, familiar rooms, and rituals that do not need explaining. Your peace is not emptiness. It is a choice to be a harbor. The risk is disappearing into other people's comfort and forgetting you also get to want something.",
    strengths: [
      "You lower the temperature without dimming anyone",
      "Your reliability is a love language",
      "You notice beauty in the ordinary arrangement of a day",
    ],
    growthEdges: [
      "Say the uncomfortable thing before it becomes a distance",
      "Your own wants are allowed to inconvenience a plan",
      "Stability can become a hiding place",
    ],
    superpower: "You make safety feel like affection.",
  },
  eagle_visionary_scout: {
    id: "eagle_visionary_scout",
    name: "Eagle",
    epithet: "Visionary Scout",
    tagline: "The long view, taken personally.",
    symbolicMeaning: "vision and independent exploration",
    qualities: ["Visionary", "Independent", "Sharp", "Majestic"],
    description:
      "You see the ridge before the trail does. The Eagle is a Path Shaper: visionary, freedom-loving, direct, and a little apart even inside a friendship. You scout. You come back with a map, not a mood. People trust your eye, and they sometimes wish you would land. You are at your best when a friend is allowed to fly with you instead of being a landmark you check on.",
    strengths: [
      "You spot the pattern three moves out",
      "Freedom, for you, includes other people's freedom",
      "You tell the truth from altitude, without cruelty",
    ],
    growthEdges: [
      "Come down and stay for the ordinary afternoon",
      "Not every bond needs a mission statement",
      "Independence is warmer when you let yourself be known",
    ],
    superpower: "You lend people a horizon.",
  },
  bee_community_builder: {
    id: "bee_community_builder",
    name: "Bee",
    epithet: "Community Builder",
    tagline: "The hive, made golden.",
    symbolicMeaning: "community and collective making",
    qualities: ["Collaborative", "Devoted", "Social", "Industrious"],
    description:
      "You believe a good life is something a group builds on purpose. The Bee is a Spark Blazer of the communal kind: extroverted, dutiful, supportive, energized by a big table and a shared task. You introduce people who should have met years ago. You remember the snack, the ride, the friend who went quiet. Friendship is infrastructure, and you are happy to be the one who maintains it. Just don't become the only one holding the comb together.",
    strengths: [
      "You turn strangers into a scene that feels like home",
      "Shared work makes you glow",
      "You notice who has not been invited",
    ],
    growthEdges: [
      "The hive can survive an evening without you",
      "Let yourself be a guest, not only a host",
      "Busyness is not the same as belonging",
    ],
    superpower: "You make belonging feel like something you can build.",
  },
  fox_clever_adapter: {
    id: "fox_clever_adapter",
    name: "Fox",
    epithet: "Clever Adapter",
    tagline: "A mind with more than one door.",
    symbolicMeaning: "adaptability and clever grace",
    qualities: ["Clever", "Adaptable", "Playful", "Resourceful"],
    description:
      "You read the thicket and find the funny, precise path through it. The Fox is a Path Shaper: intuitive, playful, situational, hard to pin and easy to trust once someone realizes the cleverness is kind. You code-switch without losing the plot. Friendship with you is witty and surprisingly tender — you joke your way to the real thing. The shadow is slipperiness. People need to feel that the fox who showed up will still be there tomorrow.",
    strengths: [
      "You find a third option when everyone else is stuck",
      "Play is one of your honest languages",
      "You can enter almost any room and leave it lighter",
    ],
    growthEdges: [
      "Stay past the clever exit",
      "Let someone see the unedited version",
      "Adaptability is not the same as having no preference",
    ],
    superpower: "You make stuck places suddenly interesting.",
  },
  turtle_wise_observer: {
    id: "turtle_wise_observer",
    name: "Turtle",
    epithet: "Wise Observer",
    tagline: "Time, on your side.",
    symbolicMeaning: "patience and accumulated wisdom",
    qualities: ["Patient", "Observant", "Steady", "Enduring"],
    description:
      "You do not rush a truth that took years to grow a shell. The Turtle is a Depth Weaver: analytical, reflective, stable, and deep when you finally speak. You watch the long pattern — in a friendship, in a family, in yourself — and your advice lands because you waited for it. People feel unhurried around you, which is rare and holy. The edge is latency. A friend in the middle of a storm may need you before the wisdom is finished curing.",
    strengths: [
      "You keep perspective when the group is spinning",
      "Your patience makes other people honest",
      "You remember what a friendship has already survived",
    ],
    growthEdges: [
      "Some moments want a response, not a vigil",
      "Share the observation before it becomes a private museum",
      "You are allowed to want speed",
    ],
    superpower: "You give a friendship a longer life than the mood of the week.",
  },
  deer_gentle_explorer: {
    id: "deer_gentle_explorer",
    name: "Deer",
    epithet: "Gentle Explorer",
    tagline: "Soft steps, new ground.",
    symbolicMeaning: "gentle exploration and natural grace",
    qualities: ["Gentle", "Curious", "Sensitive", "Alert"],
    description:
      "You enter new territory the way light enters a clearing — interested, alert, unwilling to trample it. The Deer is a Depth Weaver: growth-focused, supportive, absorptive, most yourself in a close circle that can go somewhere new together. You learn by taking a friendship in, not by conquering it. Your sensitivity is a compass. It is also a startle reflex. The right people will match your pace if you tell them the pace out loud.",
    strengths: [
      "You make exploration feel safe enough to try",
      "You notice the small shift in a friend's weather",
      "Growth, for you, includes kindness",
    ],
    growthEdges: [
      "Not every loud room is a threat",
      "Name what you need before you vanish",
      "Curiosity can survive a little clumsiness",
    ],
    superpower: "You lead people somewhere new without frightening them.",
  },
  octopus_multifaceted_genius: {
    id: "octopus_multifaceted_genius",
    name: "Octopus",
    epithet: "Multi-Faceted Genius",
    tagline: "Eight ways through the same sea.",
    symbolicMeaning: "multidimensional intelligence",
    qualities: ["Complex", "Inventive", "Fluid", "Brilliant"],
    description:
      "You are not one mind. You are a committee that somehow collaborates. The Octopus is a Path Shaper: analytical and inventive at once, transformative, able to be several contexts without losing the thread. Friendship with you is a surprise every month — a new skill, a new question, a new way of seeing the same person. You connect dots other people file under different subjects. The work is integration. Brilliance that never lands can feel, to a friend, like weather.",
    strengths: [
      "You hold complexity without flattening it",
      "You reinvent a stuck problem from another angle",
      "Your curiosity makes people feel interesting",
    ],
    growthEdges: [
      "Pick a self to be for the length of a dinner",
      "Let a friend meet the simple version too",
      "Not every insight has to be expressed at once",
    ],
    superpower: "You make complexity feel like company.",
  },
  panda_balanced_harmonizer: {
    id: "panda_balanced_harmonizer",
    name: "Panda",
    epithet: "Balanced Harmonizer",
    tagline: "The middle that isn't mild.",
    symbolicMeaning: "balance and a peace people trust",
    qualities: ["Balanced", "Peaceful", "Warm", "Harmonizing"],
    description:
      "You are what a group becomes when it stops performing. The Panda is a Loyal Binder and the reading's open door: optimistic, ambiverted, adaptable, hard to dislike because you are not trying to win the room. You can sit with different kinds of people and find the human note. Friendship, for you, is equilibrium — not the absence of opinion, but the refusal to make every difference a verdict. Your growth edge is letting your own strong preference take up space.",
    strengths: [
      "You translate between unlike friends",
      "People relax their armor around you",
      "You can hold mixed feelings without picking a team",
    ],
    growthEdges: [
      "Harmony is not the same as honesty",
      "Have a preference and let it be inconvenient",
      "You do not have to be easy to be loved",
    ],
    superpower: "You make difference feel survivable.",
  },
  owl_intuitive_sage: {
    id: "owl_intuitive_sage",
    name: "Owl",
    epithet: "Intuitive Sage",
    tagline: "Sight, after dark.",
    symbolicMeaning: "intuitive wisdom and spiritual insight",
    qualities: ["Intuitive", "Observant", "Mysterious", "Knowing"],
    description:
      "You see in a register other people call a hunch and you call Tuesday. The Owl is a Depth Weaver: spiritual, reflective, growth-minded, an observer who still cares fiercely about the few. Friendship with you has a lantern quality — you ask the question that reorganizes the month. You do not need a crowd. You need one person willing to go past the surface. The mystery is charming until it becomes a wall. Let someone watch you be unsure.",
    strengths: [
      "You trust an inner signal and it is often right",
      "Your questions open rooms, not interrogations",
      "You take the inner life of a friend seriously",
    ],
    growthEdges: [
      "Share the insight before it turns into distance",
      "Ordinary fun is not a lesser form of truth",
      "You can be known without being decoded",
    ],
    superpower: "You light the part of a person they had stopped looking at.",
  },
  phoenix_enigmatic_muse: {
    id: "phoenix_enigmatic_muse",
    name: "Phoenix",
    epithet: "Enigmatic Muse",
    tagline: "A rare fire that remakes the room.",
    symbolicMeaning: "transcendence and revolutionary renewal",
    qualities: ["Rare", "Transformative", "Visionary", "Uncontainable"],
    description:
      "This reading almost never lands here. The Phoenix asks for every pillar lit at once — heart, mind, circle, and motion — and for a particular pattern under them: spiritual and deep, visionary and inventive, situational and mission-bound, transformative and justice-minded. You are a catalyst in friendships. People leave conversations with you slightly rearranged, in the best sense and sometimes in the dizzy one. Rarity is not a trophy. It is a responsibility to use the fire without making everyone else into kindling.",
    strengths: [
      "You can hold a huge inner life and still show up for people",
      "Renewal is your native climate",
      "You aim power at what is unfair, not only at what is interesting",
    ],
    growthEdges: [
      "Intensity is not required for a friendship to count",
      "Let some bonds be gentle and unfinished",
      "Rest is part of rising, not the opposite of it",
    ],
    superpower: "You remind people that a life can start over without ending.",
  },
};

export const ARCHETYPE_LIST: ArchetypeCopy[] = Object.values(ARCHETYPE_COPY);
