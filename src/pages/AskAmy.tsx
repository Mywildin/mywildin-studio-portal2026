import { Seo } from "@/components/Seo";
import { WaitlistForm } from "@/components/WaitlistForm";

export function AskAmyPage() {
  return (
    <article className="mx-auto w-full max-w-xl px-5 py-14">
      <Seo
        title="Ask Amy"
        description="Amy isn't live yet. Leave your email and she'll introduce you to your people."
        path="/ask-amy"
      />
      <p className="mono uppercase">Coming soon</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">Ask Amy</h1>
      <p className="mt-4 text-lg">
        You're stuck, or you're just unhappy. That's when you come back. Amy is the friend who introduces you to your people. She isn't on this site yet. No chat. No swiping.
      </p>
      <p className="mt-3">
        Dating is one kind of connection. It comes after you actually know yourself, and after you know your people. This isn't a dating app.
      </p>
      <div className="mt-8">
        <WaitlistForm id="ask-amy-form" />
      </div>
    </article>
  );
}
