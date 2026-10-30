import { useEffect, useId, useRef, useState } from "react";
import { loadCities, searchCities, type City } from "@/lib/cities";

export function CitySearch({
  selected,
  onSelect,
}: {
  selected: City | null;
  onSelect: (city: City | null) => void;
}) {
  const [query, setQuery] = useState(selected?.label ?? "");
  const [cities, setCities] = useState<City[] | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    loadCities().then((rows) => {
      if (!cancelled) setCities(rows);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onPointer(event: MouseEvent) {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const results = cities ? searchCities(cities, query) : [];

  function choose(city: City) {
    onSelect(city);
    setQuery(city.label);
    setOpen(false);
  }

  return (
    <div ref={boxRef} className="relative">
      <label className="mono grid gap-1 normal-case" htmlFor={`${listId}-input`}>
        City
        <input
          id={`${listId}-input`}
          className="field"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          placeholder={cities ? "Search a city" : "Loading cities…"}
          value={query}
          autoComplete="off"
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActive(0);
            if (selected && event.target.value !== selected.label) onSelect(null);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (!open || results.length === 0) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((value) => (value + 1) % results.length);
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((value) => (value - 1 + results.length) % results.length);
            } else if (event.key === "Enter" && results[active]) {
              event.preventDefault();
              choose(results[active]);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
        />
      </label>
      {open && query.trim().length >= 2 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-2 max-h-64 w-full overflow-auto border border-ink bg-paper py-1"
        >
          {results.length === 0 ? (
            <li className="px-3 py-2 text-sm">Not in the list. Try a bigger nearby city.</li>
          ) : (
            results.map((city, index) => (
              <li key={city.id} role="option" aria-selected={index === active}>
                <button
                  type="button"
                  className={`block w-full px-3 py-2 text-left text-sm ${index === active ? "bg-lime" : ""}`}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(city)}
                >
                  {city.label}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
      <p className="mono mt-2 normal-case">Offline list. Latitude, longitude, timezone. No lookup service.</p>
    </div>
  );
}
