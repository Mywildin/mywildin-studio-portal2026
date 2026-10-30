export interface LocalDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export interface BirthMoment {
  /** Clock time in the birthplace. Noon when the hour is unknown. */
  local: LocalDateTime;
  /** UTC instant matching that clock time. */
  instant: Date;
  timeKnown: boolean;
}

/**
 * Converts a wall-clock time in an IANA zone to a UTC instant.
 * Two passes cover DST gaps and overlaps.
 */
export function zonedLocalToUtc(local: LocalDateTime, timeZone: string): Date {
  const utcGuess = Date.UTC(local.year, local.month - 1, local.day, local.hour, local.minute, 0);
  const first = timeZoneOffsetMs(utcGuess, timeZone);
  let utc = utcGuess - first;
  const second = timeZoneOffsetMs(utc, timeZone);
  if (second !== first) utc = utcGuess - second;
  return new Date(utc);
}

function timeZoneOffsetMs(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") map[part.type] = part.value;
  }
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second),
  );
  return asUtc - utcMs;
}

export function resolveBirthMoment(input: {
  date: string;
  time: string | null;
  timeZone: string;
}): BirthMoment {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input.date);
  if (!match) throw new Error("Birth date must be YYYY-MM-DD");
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const timeKnown = Boolean(input.time);
  let hour = 12;
  let minute = 0;
  if (input.time) {
    const timeMatch = /^(\d{2}):(\d{2})$/.exec(input.time);
    if (!timeMatch) throw new Error("Birth time must be HH:mm");
    hour = Number(timeMatch[1]);
    minute = Number(timeMatch[2]);
  }
  const local = { year, month, day, hour, minute };
  return {
    local,
    instant: zonedLocalToUtc(local, input.timeZone),
    timeKnown,
  };
}
