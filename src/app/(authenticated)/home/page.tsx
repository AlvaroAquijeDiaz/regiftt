import { Suspense } from "react";
import { LatestWishes } from "~/app/_ui/home/latest";
import { Spinner } from "~/app/_ui/shared/spinner";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-black">🚀 Trending</h1>

      <Suspense fallback={<Spinner />}>
        <LatestWishes />
      </Suspense>
    </div>
  );
}
