import { Suspense } from "react";
import { WishesGrid } from "~/app/_ui/my-wishes/wishes-grid";
import { Spinner } from "~/app/_ui/shared/spinner";

export default function MyWishesPage() {
  return (
    <section className="flex h-full w-full flex-col gap-8">
      <h2 className="text-3xl font-black">🎁 My Gifts</h2>

      <Suspense fallback={<Spinner />}>
        <WishesGrid />
      </Suspense>
    </section>
  );
}
