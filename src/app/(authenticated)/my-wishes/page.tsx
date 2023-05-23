import { Suspense } from "react";
import { NewListOrGift } from "~/ui/my-wishes/new-list";
import { WishesGrid } from "~/ui/my-wishes/wishes-grid";
import { Spinner } from "~/ui/shared/spinner";

export default function MyWishesPage() {
  return (
    <section className="flex h-full w-full flex-col gap-8 pt-2">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">My Wishes</h1>

        <NewListOrGift />
      </header>

      <Suspense fallback={<Spinner />}>
        {/* @ts-expect-error RSC */}
        <WishesGrid />
      </Suspense>
    </section>
  );
}
