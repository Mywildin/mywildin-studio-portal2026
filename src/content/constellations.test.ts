import { describe, expect, it } from "vitest";
import { CONSTELLATIONS } from "./constellations";
import { ARCHETYPE_IDS } from "@/lib/selfReport/types";

describe("constellations", () => {
  it("draws every archetype with links that land on a star", () => {
    expect(Object.keys(CONSTELLATIONS).sort()).toEqual([...ARCHETYPE_IDS].sort());
    for (const [id, figure] of Object.entries(CONSTELLATIONS)) {
      expect(figure.points.length, id).toBeGreaterThan(3);
      for (const [from, to] of figure.links) {
        expect(figure.points[from], `${id} ${from}`).toBeDefined();
        expect(figure.points[to], `${id} ${to}`).toBeDefined();
      }
    }
  });
});
