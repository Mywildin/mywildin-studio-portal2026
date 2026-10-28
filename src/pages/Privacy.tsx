import { Seo } from "@/components/Seo";

export function PrivacyPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-5 py-14">
      <Seo
        title="Privacy"
        description="Birth details stay in your browser. The waitlist collects only what you type into the form."
        path="/privacy"
      />
      <p className="text-xs tracking-[0.22em] text-gold uppercase">Privacy</p>
      <h1 className="mt-3 font-display text-5xl text-cream">Birth data stays in the browser.</h1>
      <div className="mt-6 grid gap-4 leading-relaxed text-mist">
        <p>
          MyWildin has no account and no server of its own. The quiz runs on your device.
          While you are answering, a draft may sit in this browser’s session storage so a refresh
          does not erase the page. That draft includes the name, date, time, and city you entered.
          It is cleared when the reading is cast.
        </p>
        <p>
          The result address encodes the reading: nickname, animal, pillar scores, a few trait
          names, day master, element, and Sun, Moon, and Rising. It does not include birth date,
          birth time, or birth place. Anyone with the link can open the reading. Treat it like a
          card you chose to hand someone.
        </p>
        <p>
          The waitlist form (“Get matched with your people”) posts your name and email to Netlify
          Forms so we can write when friendship matching opens. It does not include quiz answers or
          birth details. Don’t put those in the name field.
        </p>
        <p>
          This version does not run a chat, does not sell data, and does not add a third-party
          analytics script. City search uses a list shipped with the site. It does not call a paid
          geocoding API.
        </p>
      </div>
    </article>
  );
}
