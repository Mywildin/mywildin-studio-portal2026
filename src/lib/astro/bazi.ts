import { SolarTime, YinYang, type Element, type HeavenStem } from "tyme4ts";
import type { LocalDateTime } from "./time";

export const ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"] as const;
export type ElementName = (typeof ELEMENTS)[number];

const ELEMENT_EN: Record<string, ElementName> = {
  木: "Wood",
  火: "Fire",
  土: "Earth",
  金: "Metal",
  水: "Water",
};

export interface BaziPillars {
  year: string;
  month: string;
  day: string;
  hour: string | null;
}

export interface BaziChart {
  pillars: BaziPillars;
  dayMasterStem: string;
  dayMasterPolarity: "Yang" | "Yin";
  dayMasterElement: ElementName;
  /** Stem element (weight 1) plus each branch's main element (weight 1). */
  elementCounts: Record<ElementName, number>;
  dominantElement: ElementName;
  timeKnown: boolean;
}

function elementName(element: Element): ElementName {
  const name = element.getName();
  const mapped = ELEMENT_EN[name];
  if (!mapped) throw new Error(`Unknown element from tyme4ts: ${name}`);
  return mapped;
}

function polarityOf(stem: HeavenStem): "Yang" | "Yin" {
  return stem.getYinYang() === YinYang.YANG ? "Yang" : "Yin";
}

function emptyCounts(): Record<ElementName, number> {
  return { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
}

/**
 * Dominant element is the highest count. A tie that includes the day master's
 * element resolves to the day master. Any other tie follows Wood, Fire, Earth,
 * Metal, Water. Hidden stems are not counted in 0.1.
 */
export function dominantElement(
  counts: Record<ElementName, number>,
  dayMaster: ElementName,
): ElementName {
  let best = 0;
  for (const element of ELEMENTS) best = Math.max(best, counts[element]);
  const tied = ELEMENTS.filter((element) => counts[element] === best);
  if (tied.includes(dayMaster)) return dayMaster;
  return tied[0];
}

export function castBazi(local: LocalDateTime, timeKnown: boolean): BaziChart {
  const eight = SolarTime.fromYmdHms(
    local.year,
    local.month,
    local.day,
    local.hour,
    local.minute,
    0,
  )
    .getLunarHour()
    .getEightChar();

  const year = eight.getYear();
  const month = eight.getMonth();
  const day = eight.getDay();
  const hour = timeKnown ? eight.getHour() : null;
  const cycles = hour ? [year, month, day, hour] : [year, month, day];

  const counts = emptyCounts();
  for (const cycle of cycles) {
    counts[elementName(cycle.getHeavenStem().getElement())] += 1;
    counts[elementName(cycle.getEarthBranch().getElement())] += 1;
  }

  const dayStem = day.getHeavenStem();
  const dayMasterElement = elementName(dayStem.getElement());

  return {
    pillars: {
      year: year.toString(),
      month: month.toString(),
      day: day.toString(),
      hour: hour ? hour.toString() : null,
    },
    dayMasterStem: dayStem.toString(),
    dayMasterPolarity: polarityOf(dayStem),
    dayMasterElement,
    elementCounts: counts,
    dominantElement: dominantElement(counts, dayMasterElement),
    timeKnown,
  };
}
