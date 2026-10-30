import { Link } from "wouter";
import { Seo } from "@/components/Seo";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24">
      <Seo title="Not found" description="That page isn't on MyWildin." path="/404" />
      <h1 className="text-5xl font-bold">Wrong turn.</h1>
      <Link href="/" className="btn mt-6">
        Home
      </Link>
    </div>
  );
}
