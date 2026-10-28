import * as Astronomy from "astronomy-engine";

export const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export interface SkyPlacement {
  sign: ZodiacSign;
  /** Degrees inside the sign, 0–30. */
  degree: number;
  longitude: number;
}

export interface WesternChart {
  sun: SkyPlacement;
  moon: SkyPlacement;
  rising: SkyPlacement | null;
  timeKnown: boolean;
}

function norm(longitude: number): number {
  return ((longitude % 360) + 360) % 360;
}

export function signFromLongitude(longitude: number): { sign: ZodiacSign; degree: number } {
  const wrapped = norm(longitude);
  const index = Math.floor(wrapped / 30) % 12;
  return { sign: ZODIAC_SIGNS[index], degree: wrapped - index * 30 };
}

function placement(longitude: number): SkyPlacement {
  const wrapped = norm(longitude);
  return { ...signFromLongitude(wrapped), longitude: wrapped };
}

/**
 * Tropical ascendant from local apparent sidereal time, obliquity, and latitude.
 * East longitude is positive. Latitudes inside the polar circles are skipped;
 * the tangent in the formula stops being a useful rising sign there.
 */
export function ascendantLongitude(instant: Date, latitude: number, longitude: number): number {
  const gastHours = Astronomy.SiderealTime(instant);
  const lstHours = norm((gastHours + longitude / 15) * 15) / 15;
  const ramcDeg = ((lstHours % 24) + 24) % 24 * 15;
  const obliquity = Astronomy.e_tilt(Astronomy.MakeTime(instant)).tobl;
  const ramc = (ramcDeg * Math.PI) / 180;
  const lat = (latitude * Math.PI) / 180;
  const eps = (obliquity * Math.PI) / 180;
  const y = Math.cos(ramc);
  const x = -(Math.sin(ramc) * Math.cos(eps) + Math.tan(lat) * Math.sin(eps));
  return norm((Math.atan2(y, x) * 180) / Math.PI);
}

export function castWesternChart(input: {
  instant: Date;
  latitude: number;
  longitude: number;
  timeKnown: boolean;
}): WesternChart {
  const sun = placement(Astronomy.SunPosition(input.instant).elon);
  const moon = placement(Astronomy.EclipticGeoMoon(input.instant).lon);
  const polar = Math.abs(input.latitude) >= 66;
  const rising =
    input.timeKnown && !polar
      ? placement(ascendantLongitude(input.instant, input.latitude, input.longitude))
      : null;
  return { sun, moon, rising, timeKnown: input.timeKnown };
}
