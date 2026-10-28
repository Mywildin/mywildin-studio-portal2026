/**
 * Builds src/data/cities.json from the GeoNames cities15000 dump.
 * Source: https://download.geonames.org/export/dump/cities15000.zip (CC BY 4.0)
 * Admin names: https://download.geonames.org/export/dump/admin1CodesASCII.txt
 *
 * Expects /tmp/cities15000.zip and /tmp/admin1CodesASCII.txt, or pass paths:
 *   node scripts/prepare-cities.mjs [cities15000.txt] [admin1CodesASCII.txt]
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const MIN_POPULATION = 50000;
const root = path.resolve(import.meta.dirname, "..");
const outPath = path.join(root, "src/data/cities.json");

function loadCitiesText() {
  if (process.argv[2]) return fs.readFileSync(process.argv[2], "utf8");
  return execFileSync("unzip", ["-p", "/tmp/cities15000.zip", "cities15000.txt"], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

function loadAdminText() {
  if (process.argv[3]) return fs.readFileSync(process.argv[3], "utf8");
  return fs.readFileSync("/tmp/admin1CodesASCII.txt", "utf8");
}

const display = new Intl.DisplayNames(["en"], { type: "region" });

const adminNames = new Map();
for (const line of loadAdminText().split("\n")) {
  if (!line.trim()) continue;
  const [code, name] = line.split("\t");
  if (code && name) adminNames.set(code, name);
}

const cities = [];
for (const line of loadCitiesText().split("\n")) {
  if (!line.trim()) continue;
  const cols = line.split("\t");
  const name = cols[1];
  const ascii = cols[2];
  const lat = Number(cols[4]);
  const lon = Number(cols[5]);
  const country = cols[8];
  const admin1 = cols[10];
  const population = Number(cols[14]) || 0;
  const tz = cols[17];
  if (!name || !country || !tz || Number.isNaN(lat) || Number.isNaN(lon)) continue;
  // 50,000 keeps the quiz payload reasonable while covering cities people search.
  if (population < MIN_POPULATION) continue;
  const region = adminNames.get(`${country}.${admin1}`) ?? "";
  let countryName = country;
  try {
    countryName = display.of(country) ?? country;
  } catch {
    countryName = country;
  }
  cities.push({
    population,
    row: [
      name,
      ascii && ascii.toLowerCase() !== name.toLowerCase() ? ascii : "",
      country,
      countryName,
      region,
      Math.round(lat * 10000) / 10000,
      Math.round(lon * 10000) / 10000,
      tz,
    ],
  });
}

cities.sort((a, b) => b.population - a.population);
const rows = cities.map((city) => city.row);
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(rows));
console.log(`Wrote ${rows.length} cities to ${outPath} (${fs.statSync(outPath).size} bytes)`);
