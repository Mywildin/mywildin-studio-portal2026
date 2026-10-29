import { Link } from "wouter";
import { Seo } from "@/components/Seo";

export function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-xl px-5 py-14">
      <Seo
        title="About"
        description="MyWildin is a know-yourself quiz. Your Wildsign, then Ask Amy when you're stuck."
        path="/about"
      />
      <p className="mono uppercase">About</p>
      <h1 className="mt-3 text-5xl font-bold tracking-tight">Know yourself. Then your people.</h1>
      <div className="mt-6 grid gap-4 leading-relaxed">
        <p>
          MyWildin is a short quiz about how you relate to yourself and to other people. Friendship first. Dating is one kind of connection that can come later. This is not a dating app, and there is no chat here.
        </p>
        <p>
          The sky part is self-aware on purpose. Western sun, moon, and rising are the weather you showed up in. BaZi — day master, dominant element — is the factory settings. Neither one gets to be a verdict.
        </p>
        <p>
          Fifteen questions light four layers: how you feel, how you think, how you keep people, how you move when things change. You get one animal. That's your Wildsign. The Phoenix is the rare one, and it has to earn it.
        </p>
        <p>
          When you're stuck or unhappy, Ask Amy. She isn't live yet. Later she introduces you to your people. Behavior — what you actually do on a Tuesday — comes after that. This version doesn't pretend it watched you.
        </p>
        <p>
          Birth date, time, and city stay in the browser. The share link carries the Wildsign, not the birthday.
        </p>
      </div>
      <Link href="/quiz" className="btn mt-8">
        Get your Wildsign
      </Link>
    </article>
  );
}
