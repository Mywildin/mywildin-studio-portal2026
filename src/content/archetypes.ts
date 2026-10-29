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
    tagline: "You walk in and the room picks a side. Sorry about the volume.",
    symbolicMeaning: "courage that other people borrow",
    qualities: ["Bold", "Direct", "Protective"],
    description:
      "You decide, then everyone else gets to have feelings about it. Friendship with you is a mission, not a mood. Useful. Also a lot.",
    strengths: ["You say the unfair thing out loud", "People borrow your nerve", "You protect the group without a speech"],
    growthEdges: ["Let someone else drive", "A slow yes is still a yes", "Silence is not always a problem"],
    superpower: "You make bravery look contagious.",
  },
  butterfly_gentle_transformer: {
    id: "butterfly_gentle_transformer",
    name: "Butterfly",
    epithet: "Gentle Transformer",
    tagline: "You change slowly, then all at once. People feel it first.",
    symbolicMeaning: "change that doesn't announce itself",
    qualities: ["Gentle", "Changing", "Close"],
    description:
      "You don't force a becoming. You just stop fitting the old version. Your people notice before you post about it.",
    strengths: ["You clock someone's next chapter early", "Growth around you isn't a grade", "You can be soft and still move"],
    growthEdges: ["Stay for the awkward middle", "Not every bond needs a transformation", "Your pace counts too"],
    superpower: "You make change feel survivable.",
  },
  wolf_loyal_pack_leader: {
    id: "wolf_loyal_pack_leader",
    name: "Wolf",
    epithet: "Loyal Pack Leader",
    tagline: "Your circle is small and non-negotiable. Everyone else can wait.",
    symbolicMeaning: "loyalty with a spine",
    qualities: ["Loyal", "Steady", "Selective"],
    description:
      "You know your people. The list is short on purpose. You notice who's tired, who's bluffing, who needs the walk home.",
    strengths: ["People trust you with the unpretty truth", "You plan for the group", "Your loyalty has terms, and you keep them"],
    growthEdges: ["New people shouldn't need a decade", "Ask for care sometimes", "Strategy isn't the same as control"],
    superpower: "You turn a few people into a place.",
  },
  whale_deep_empath: {
    id: "whale_deep_empath",
    name: "Whale",
    epithet: "Deep Empath",
    tagline: "You feel the whole room. It's a lot. You do it anyway.",
    symbolicMeaning: "depth that doesn't perform",
    qualities: ["Deep", "Attuned", "Quiet"],
    description:
      "Small talk dies around you, which is either a gift or a social hazard. You remember the emotional history. Try not to keep everyone else's weather.",
    strengths: ["You hear the thing that wasn't said", "Depth feels safer near you", "You don't forget what a friendship survived"],
    growthEdges: ["Not every feeling is yours", "Ordinary fun is allowed", "Someone can be fine without a reading"],
    superpower: "You make honesty feel like a place.",
  },
  cheetah_focused_achiever: {
    id: "cheetah_focused_achiever",
    name: "Cheetah",
    epithet: "Focused Achiever",
    tagline: "You pick a point and stop explaining. Try to keep up.",
    symbolicMeaning: "focus as a form of care",
    qualities: ["Focused", "Direct", "Fast"],
    description:
      "You respect people who don't waste the hour. Friendship, for you, is honesty with momentum. The friend who wanted to wander with no finish line will need a subtitle.",
    strengths: ["Intention becomes motion", "Your honesty saves months", "You treat focus like respect"],
    growthEdges: ["Some good bonds have no score", "Rest is part of the pace", "A person can interrupt the plan"],
    superpower: "You make a direction feel obvious.",
  },
  koala_peaceful_anchor: {
    id: "koala_peaceful_anchor",
    name: "Koala",
    epithet: "Peaceful Anchor",
    tagline: "You're the calm one. Don't confuse that with having no opinion.",
    symbolicMeaning: "steadiness people lean on",
    qualities: ["Calm", "Reliable", "Soft"],
    description:
      "People call you when the day was too loud. You like a small circle and rituals that don't need a caption. Your peace is a choice. It can also be a hiding place.",
    strengths: ["You lower the temperature", "Showing up is your love language", "You like the ordinary arrangement of a day"],
    growthEdges: ["Say the uncomfortable thing earlier", "Your wants can inconvenience a plan", "Easy is not the same as honest"],
    superpower: "You make safety feel like affection.",
  },
  eagle_visionary_scout: {
    id: "eagle_visionary_scout",
    name: "Eagle",
    epithet: "Visionary Scout",
    tagline: "You see the next move from too far away. Landing is the hard part.",
    symbolicMeaning: "the long view, taken personally",
    qualities: ["Sharp", "Independent", "Direct"],
    description:
      "You scout and come back with a map, not a mood. People trust your eye. They also wish you'd stay for the boring afternoon.",
    strengths: ["You spot the pattern early", "You want other people free, too", "You can be direct without being cruel"],
    growthEdges: ["Come down and stay", "Not every bond needs a mission", "Let yourself be known"],
    superpower: "You lend people a horizon.",
  },
  bee_community_builder: {
    id: "bee_community_builder",
    name: "Bee",
    epithet: "Community Builder",
    tagline: "You build the plan, the group chat, and the snacks. Take a night off.",
    symbolicMeaning: "belonging as a thing you can build",
    qualities: ["Social", "Devoted", "Practical"],
    description:
      "You introduce people who should have met years ago. You notice who wasn't invited. The hive can survive one evening without you. Probably.",
    strengths: ["Strangers become a scene", "Shared work makes you sharp", "You track who got left out"],
    growthEdges: ["Be a guest", "Busy is not the same as belonging", "The group is not your job"],
    superpower: "You make belonging look buildable.",
  },
  fox_clever_adapter: {
    id: "fox_clever_adapter",
    name: "Fox",
    epithet: "Clever Adapter",
    tagline: "You read the room before you enter it. Annoyingly right, usually.",
    symbolicMeaning: "cleverness that is mostly kind",
    qualities: ["Clever", "Playful", "Quick"],
    description:
      "You find the third option and the joke that gets to the real thing. People trust you once they realize the cleverness isn't a trap. Stay past the exit.",
    strengths: ["You unstick a dead conversation", "Play is one of your honest languages", "You can enter almost any room"],
    growthEdges: ["Don't slip out when it gets plain", "Have a preference", "Let someone see the unedited cut"],
    superpower: "You make stuck places interesting.",
  },
  turtle_wise_observer: {
    id: "turtle_wise_observer",
    name: "Turtle",
    epithet: "Wise Observer",
    tagline: "You wait. Then you say the thing everyone needed an hour ago.",
    symbolicMeaning: "patience that actually pays",
    qualities: ["Patient", "Exact", "Still"],
    description:
      "You watch the long pattern and your advice lands because you didn't rush it. A friend in the middle of a mess may need you before the wisdom is finished.",
    strengths: ["You keep perspective", "People get honest around your patience", "You remember what already survived"],
    growthEdges: ["Some moments want a reply, not a vigil", "Share the observation", "You're allowed to want speed"],
    superpower: "You outlast the mood of the week.",
  },
  deer_gentle_explorer: {
    id: "deer_gentle_explorer",
    name: "Deer",
    epithet: "Gentle Explorer",
    tagline: "You'll try the new thing. If it feels safe. Loud is not automatically safe.",
    symbolicMeaning: "curiosity with a startle reflex",
    qualities: ["Gentle", "Curious", "Alert"],
    description:
      "You learn a friendship by taking it in, not by conquering it. Your sensitivity is a compass. Say the pace out loud so the right people can match it.",
    strengths: ["You make trying feel possible", "You notice a small weather change", "Kindness is part of how you grow"],
    growthEdges: ["Not every loud room is a threat", "Name what you need before you vanish", "Clumsy can still be curious"],
    superpower: "You lead people somewhere new without spooking them.",
  },
  octopus_multifaceted_genius: {
    id: "octopus_multifaceted_genius",
    name: "Octopus",
    epithet: "Multi-Faceted Genius",
    tagline: "You have eight opinions and they're all correct. Pick one for dinner.",
    symbolicMeaning: "too many true answers",
    qualities: ["Complex", "Inventive", "Fluid"],
    description:
      "You're several contexts and somehow still one person. Friends get a new version of you every month. Brilliance that never lands feels like weather.",
    strengths: ["You hold complexity without flattening it", "You come at a stuck problem sideways", "Your curiosity makes people feel interesting"],
    growthEdges: ["Pick a self for the length of dinner", "Show the simple version", "Not every insight has to ship"],
    superpower: "You make complexity feel like company.",
  },
  panda_balanced_harmonizer: {
    id: "panda_balanced_harmonizer",
    name: "Panda",
    epithet: "Balanced Harmonizer",
    tagline: "You keep the peace. That is not the same as having no side.",
    symbolicMeaning: "the middle that isn't mild",
    qualities: ["Balanced", "Warm", "Easy"],
    description:
      "A group gets less performative around you. You can sit with unlike people and find the human note. Harmony is a skill. It is also a way to hide a preference.",
    strengths: ["You translate between friends", "People drop the armor", "You can hold mixed feelings"],
    growthEdges: ["Peace is not honesty", "Have a preference and let it be annoying", "You don't have to be easy"],
    superpower: "You make difference feel survivable.",
  },
  owl_intuitive_sage: {
    id: "owl_intuitive_sage",
    name: "Owl",
    epithet: "Intuitive Sage",
    tagline: "You knew. You just wanted them to figure it out themselves.",
    symbolicMeaning: "the hunch that was right",
    qualities: ["Intuitive", "Quiet", "Exact"],
    description:
      "You call it a hunch. It's usually Tuesday. You don't need a crowd. You need one person willing to go past the surface. Let them see you be wrong once.",
    strengths: ["The inner signal is often right", "Your questions open rooms", "You take someone's inner life seriously"],
    growthEdges: ["Say it before it becomes distance", "Fun is not a lesser truth", "You can be known without being decoded"],
    superpower: "You point at the part they stopped looking at.",
  },
  phoenix_enigmatic_muse: {
    id: "phoenix_enigmatic_muse",
    name: "Phoenix",
    epithet: "Enigmatic Muse",
    tagline: "Rare, loud, and slightly too much. Use it on something that matters.",
    symbolicMeaning: "a restart that doesn't apologize",
    qualities: ["Rare", "Intense", "Restarting"],
    description:
      "This one almost never comes up. Every layer has to be awake at once. People leave conversations with you rearranged. Intensity is not a requirement for a friendship to count.",
    strengths: ["You can hold a huge inner life and still show up", "Starting over is native", "You aim the heat at what is unfair"],
    growthEdges: ["Gentle bonds still count", "Leave some things unfinished", "Rest is part of rising"],
    superpower: "You remind people a life can restart.",
  },
};

export const ARCHETYPE_LIST: ArchetypeCopy[] = Object.values(ARCHETYPE_COPY);
