import { Seo } from "@/components/Seo";

export function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-xl px-5 py-14">
      <Seo
        title="Privacy"
        description="Birth details stay in your browser. The waitlist collects only what you type into the form."
        path="/privacy"
      />
      <p className="mono uppercase">Privacy</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">Birth data stays on your device.</h1>
      <div className="mt-6 grid gap-4 leading-relaxed">
        <p>
          No account. No chat. The quiz runs in your browser. A draft may sit in session storage so a refresh doesn't wipe the page. That draft has the name, date, time, and city you typed. It clears when the Wildsign is cast.
        </p>
        <p>
          The result link stores the reading: nickname, animal, pillar scores, a few trait names, day master, element, sun, moon, and rising. Not the birthday, the clock, or the city. Anyone with the link can open the card.
        </p>
        <p>
          Ask Amy posts the name and email you type to Netlify Forms. It does not include quiz answers or birth details. Don't put those in the name field.
        </p>
        <p>No third-party analytics. City search uses a list shipped with the site.</p>
      </div>
    </article>
  );
}
