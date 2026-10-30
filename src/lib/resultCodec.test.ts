import { describe, expect, it } from "vitest";
import { decodeResult, encodeResult, type ResultSnapshot } from "./resultCodec";

const snapshot: ResultSnapshot = {
  v: 1,
  name: "Nova",
  archetypeId: "owl_intuitive_sage",
  pillars: {
    emotional_architecture: 0.9,
    cognitive_blueprint: 1,
    social_fabric: 1,
    behavioral_grammar: 1,
  },
  dominantTraits: ["spiritual_connection", "deep_communication"],
  pillarTraits: {
    emotional_architecture: ["spiritual_connection"],
    cognitive_blueprint: ["visionary_thinking"],
    social_fabric: ["extroverted_energy"],
    behavioral_grammar: ["justice_oriented"],
  },
  bazi: {
    dayMasterStem: "癸",
    dayMasterPolarity: "Yin",
    dayMasterElement: "Water",
    dominantElement: "Wood",
    year: "丙寅",
    month: "癸巳",
    day: "癸酉",
    hour: null,
    timeKnown: false,
  },
  astro: {
    sun: "Leo",
    sunDegree: 12,
    moon: "Gemini",
    moonDegree: 3,
    rising: null,
    risingDegree: null,
    timeKnown: false,
  },
};

describe("result codec", () => {
  it("round-trips a snapshot without the birth data", () => {
    const token = encodeResult(snapshot);
    expect(token).not.toMatch(/1961|honolulu/i);
    expect(decodeResult(token)).toEqual(snapshot);
  });

  it("rejects a tampered token", () => {
    expect(decodeResult("not-a-result")).toBeNull();
  });
});
