import { describe, expect, it } from "vitest";
import { castBazi, dominantElement } from "./bazi";
import { resolveBirthMoment, zonedLocalToUtc } from "./time";
import { castWesternChart, signFromLongitude } from "./western";

describe("time zones", () => {
  it("converts Honolulu, London, and New York offsets", () => {
    const honolulu = zonedLocalToUtc(
      { year: 1961, month: 8, day: 4, hour: 19, minute: 24 },
      "Pacific/Honolulu",
    );
    expect(honolulu.toISOString()).toBe("1961-08-05T05:24:00.000Z");

    const london = zonedLocalToUtc(
      { year: 1961, month: 7, day: 1, hour: 19, minute: 45 },
      "Europe/London",
    );
    expect(london.toISOString()).toBe("1961-07-01T18:45:00.000Z");

    const summer = zonedLocalToUtc(
      { year: 2024, month: 7, day: 1, hour: 12, minute: 0 },
      "America/New_York",
    );
    expect(summer.toISOString()).toBe("2024-07-01T16:00:00.000Z");

    const winter = zonedLocalToUtc(
      { year: 2024, month: 1, day: 15, hour: 12, minute: 0 },
      "America/New_York",
    );
    expect(winter.toISOString()).toBe("2024-01-15T17:00:00.000Z");
  });
});

describe("western charts", () => {
  function sky(date: string, time: string | null, timeZone: string, latitude: number, longitude: number) {
    const birth = resolveBirthMoment({ date, time, timeZone });
    return castWesternChart({
      instant: birth.instant,
      latitude,
      longitude,
      timeKnown: birth.timeKnown,
    });
  }

  it("casts Barack Obama: Leo sun, Gemini moon, Aquarius rising", () => {
    const chart = sky("1961-08-04", "19:24", "Pacific/Honolulu", 21.3069, -157.8583);
    expect(chart.sun.sign).toBe("Leo");
    expect(chart.moon.sign).toBe("Gemini");
    expect(chart.rising?.sign).toBe("Aquarius");
    expect(chart.sun.degree).toBeGreaterThan(11.5);
    expect(chart.sun.degree).toBeLessThan(13.5);
    expect(chart.moon.degree).toBeGreaterThan(2.2);
    expect(chart.moon.degree).toBeLessThan(4.5);
    expect(chart.rising?.degree).toBeGreaterThan(16);
    expect(chart.rising?.degree).toBeLessThan(20);
  });

  it("casts Diana: Cancer sun, Aquarius moon, Sagittarius rising", () => {
    const chart = sky("1961-07-01", "19:45", "Europe/London", 52.827, 0.514);
    expect(chart.sun.sign).toBe("Cancer");
    expect(chart.moon.sign).toBe("Aquarius");
    expect(chart.rising?.sign).toBe("Sagittarius");
  });

  it("casts Steve Jobs: Pisces sun, Aries moon, Virgo rising", () => {
    const chart = sky("1955-02-24", "19:15", "America/Los_Angeles", 37.7749, -122.4194);
    expect(chart.sun.sign).toBe("Pisces");
    expect(chart.moon.sign).toBe("Aries");
    expect(chart.rising?.sign).toBe("Virgo");
  });

  it("omits the rising sign when the birth time is unknown", () => {
    const chart = sky("1961-08-04", null, "Pacific/Honolulu", 21.3069, -157.8583);
    expect(chart.timeKnown).toBe(false);
    expect(chart.rising).toBeNull();
    expect(chart.sun.sign).toBe("Leo");
  });

  it("places the signs on 30-degree tropical bounds", () => {
    expect(signFromLongitude(0).sign).toBe("Aries");
    expect(signFromLongitude(359.9).sign).toBe("Pisces");
    expect(signFromLongitude(120).sign).toBe("Leo");
  });
});

describe("bazi", () => {
  it("casts 29 May 1986, 04:00 as 丙寅 癸巳 癸酉 甲寅, Yin Water, Wood dominant", () => {
    const chart = castBazi({ year: 1986, month: 5, day: 29, hour: 4, minute: 0 }, true);
    expect(chart.pillars).toEqual({
      year: "丙寅",
      month: "癸巳",
      day: "癸酉",
      hour: "甲寅",
    });
    expect(chart.dayMasterStem).toBe("癸");
    expect(chart.dayMasterPolarity).toBe("Yin");
    expect(chart.dayMasterElement).toBe("Water");
    expect(chart.dominantElement).toBe("Wood");
    expect(chart.elementCounts.Wood).toBe(3);
  });

  it("casts 1 Jan 2000, 12:00 as 己卯 丙子 戊午 戊午 and breaks the Earth/Fire tie toward the day master", () => {
    const chart = castBazi({ year: 2000, month: 1, day: 1, hour: 12, minute: 0 }, true);
    expect(chart.pillars).toEqual({
      year: "己卯",
      month: "丙子",
      day: "戊午",
      hour: "戊午",
    });
    expect(chart.dayMasterStem).toBe("戊");
    expect(chart.dayMasterPolarity).toBe("Yang");
    expect(chart.dayMasterElement).toBe("Earth");
    expect(chart.elementCounts.Earth).toBe(3);
    expect(chart.elementCounts.Fire).toBe(3);
    expect(chart.dominantElement).toBe("Earth");
  });

  it("drops the hour pillar when the time is unknown", () => {
    const chart = castBazi({ year: 2000, month: 1, day: 1, hour: 12, minute: 0 }, false);
    expect(chart.pillars.hour).toBeNull();
    expect(chart.pillars.day).toBe("戊午");
    expect(chart.timeKnown).toBe(false);
  });

  it("uses the day master only when it is actually tied", () => {
    expect(
      dominantElement({ Wood: 1, Fire: 3, Earth: 3, Metal: 0, Water: 0 }, "Earth"),
    ).toBe("Earth");
    expect(
      dominantElement({ Wood: 4, Fire: 1, Earth: 1, Metal: 0, Water: 0 }, "Water"),
    ).toBe("Wood");
  });
});
