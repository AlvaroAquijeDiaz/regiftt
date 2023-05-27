import { Suspense } from "react";
import { WishesGrid } from "~/ui/my-wishes/wishes-grid";
import { Spinner } from "~/ui/shared/spinner";

export default function MyWishesPage() {
  return (
    <section className="mt-3 flex h-full w-full flex-col gap-8">
      <h2 className="text-3xl font-black">🎁 My Gifts</h2>

      <Suspense fallback={<Spinner />}>
        <WishesGrid />
      </Suspense>
    </section>
  );
}
