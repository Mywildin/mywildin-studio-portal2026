/**
 * Collectible animal illustration.
 * Files live at `public/animals/{slug}.webp` (lion, fox, owl, phoenix, …).
 * Replace that file to swap the art. The slug matches the archetype's animal id.
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
      src={`/animals/${slug}.webp`}
      alt=""
      className={className}
      draggable={false}
    />
  );
}
