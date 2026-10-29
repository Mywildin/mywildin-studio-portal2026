/**
 * Flat collectible animal.
 * Swap the file at `public/animals/{slug}.svg` (lion, fox, owl, …).
 * The component always loads that public path.
 */
export function AnimalArt({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  return (
    <img
      src={`/animals/${slug}.svg`}
      alt=""
      className={className}
      draggable={false}
    />
  );
}
