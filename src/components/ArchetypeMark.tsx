import { CONSTELLATIONS } from "@/content/constellations";
import type { ArchetypeId } from "@/lib/selfReport/types";

export function ArchetypeMark({
  id,
  className = "",
}: {
  id: ArchetypeId;
  className?: string;
}) {
  const figure = CONSTELLATIONS[id];
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true">
      <circle cx="100" cy="118" r="78" fill="none" stroke="currentColor" strokeOpacity="0.18" />
      {figure.links.map(([from, to], index) => (
        <line
          key={`${from}-${to}-${index}`}
          x1={figure.points[from][0]}
          y1={figure.points[from][1]}
          x2={figure.points[to][0]}
          y2={figure.points[to][1]}
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      ))}
      {figure.points.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={index === 0 ? 2.5 : 1.65} fill="currentColor" />
      ))}
    </svg>
  );
}
