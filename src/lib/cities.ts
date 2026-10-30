export interface City {
  id: string;
  name: string;
  ascii: string;
  country: string;
  countryName: string;
  region: string;
  lat: number;
  lon: number;
  tz: string;
  label: string;
  norm: string;
}

type CityRow = [string, string, string, string, string, number, number, string];

let cache: Promise<City[]> | null = null;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

export function loadCities(): Promise<City[]> {
  if (!cache) {
    cache = import("../data/cities.json").then((mod) => {
      const rows = mod.default as CityRow[];
      return rows.map((row, index) => {
        const [name, ascii, country, countryName, region, lat, lon, tz] = row;
        const label = [name, region, countryName].filter(Boolean).join(", ");
        return {
          id: String(index),
          name,
          ascii,
          country,
          countryName,
          region,
          lat,
          lon,
          tz,
          label,
          norm: normalize(`${name} ${ascii} ${region} ${countryName}`),
        };
      });
    });
  }
  return cache;
}

export function searchCities(cities: City[], query: string, limit = 8): City[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  const hits: { city: City; score: number; index: number }[] = [];
  for (let index = 0; index < cities.length; index += 1) {
    const city = cities[index];
    const name = normalize(city.name);
    const ascii = city.ascii ? normalize(city.ascii) : "";
    let score = 0;
    if (name === q || ascii === q) score = 100;
    else if (name.startsWith(q) || ascii.startsWith(q)) score = 80;
    else if (name.split(" ").some((word) => word.startsWith(q))) score = 60;
    else if (name.includes(q) || ascii.includes(q)) score = 40;
    else if (city.norm.includes(q)) score = 20;
    if (score > 0) hits.push({ city, score, index });
  }
  hits.sort((a, b) => b.score - a.score || a.index - b.index);
  return hits.slice(0, limit).map((hit) => hit.city);
}
