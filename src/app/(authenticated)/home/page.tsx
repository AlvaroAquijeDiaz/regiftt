import { Suspense } from "react";
import { LatestWishes } from "~/ui/home/latest";
import { Spinner } from "~/ui/shared/spinner";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-black">🚀 Trending</h1>

      <Suspense fallback={<Spinner />}>
        {/* @ts-expect-error RSC */}
        <LatestWishes />
      </Suspense>
    </div>
  );
}
