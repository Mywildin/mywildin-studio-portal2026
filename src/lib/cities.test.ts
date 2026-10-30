import { describe, expect, it } from "vitest";
import { searchCities, type City } from "./cities";

function city(partial: Partial<City> & Pick<City, "name">): City {
  return {
    id: partial.name,
    ascii: "",
    country: "US",
    countryName: "United States",
    region: "Texas",
    lat: 0,
    lon: 0,
    tz: "America/Chicago",
    label: partial.name,
    norm: partial.name.toLowerCase(),
    ...partial,
  };
}

describe("city search", () => {
  const cities = [
    city({ name: "Austin", region: "Texas", norm: "austin texas united states" }),
    city({ name: "Austin", region: "Minnesota", norm: "austin minnesota united states" }),
    city({ name: "Houston", region: "Texas", norm: "houston texas united states" }),
  ];

  it("prefers a name prefix and keeps the more populous city first", () => {
    const hits = searchCities(cities, "aus");
    expect(hits.map((item) => item.region)).toEqual(["Texas", "Minnesota"]);
  });

  it("ignores a one-letter query", () => {
    expect(searchCities(cities, "a")).toEqual([]);
  });
});
