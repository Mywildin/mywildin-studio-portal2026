import type { ArchetypeId } from "@/lib/selfReport/types";

/** Soft type-color panels. Phoenix uses a foil gradient instead of `panel`. */
export interface WildType {
  type: string;
  panel: string;
  holo: boolean;
}

export const WILD_TYPES: Record<ArchetypeId, WildType> = {
  lion_bold_leader: { type: "Fire", panel: "#FFD7C2", holo: false },
  fox_clever_adapter: { type: "Fire", panel: "#FFD0B5", holo: false },
  cheetah_focused_achiever: { type: "Fire", panel: "#FFE3C4", holo: false },
  bee_community_builder: { type: "Electric", panel: "#E7F59A", holo: false },
  whale_deep_empath: { type: "Water", panel: "#C9E7F8", holo: false },
  octopus_multifaceted_genius: { type: "Water", panel: "#C5D9F6", holo: false },
  deer_gentle_explorer: { type: "Grass", panel: "#D3F0C6", holo: false },
  turtle_wise_observer: { type: "Grass", panel: "#C6EBD4", holo: false },
  koala_peaceful_anchor: { type: "Grass", panel: "#D7EFD0", holo: false },
  butterfly_gentle_transformer: { type: "Psychic", panel: "#F6D4EE", holo: false },
  owl_intuitive_sage: { type: "Psychic", panel: "#E4D4F6", holo: false },
  panda_balanced_harmonizer: { type: "Normal", panel: "#F3EFE4", holo: false },
  eagle_visionary_scout: { type: "Flying", panel: "#D5E6F4", holo: false },
  wolf_loyal_pack_leader: { type: "Steel", panel: "#DDD8EA", holo: false },
  phoenix_enigmatic_muse: { type: "Rare", panel: "#FFE1F4", holo: true },
};
