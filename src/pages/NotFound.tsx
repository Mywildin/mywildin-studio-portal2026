import { Link } from "wouter";
import { Seo } from "@/components/Seo";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <Seo title="Not found" description="That page isn’t part of MyWildin." path="/404" />
      <h1 className="font-display text-5xl text-cream">This path isn’t on the chart.</h1>
      <Link href="/" className="mt-6 inline-flex text-gold underline-offset-4 hover:underline">
        Return home
      </Link>
    </div>
  );
}
