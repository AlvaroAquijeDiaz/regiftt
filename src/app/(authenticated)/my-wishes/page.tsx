import { NewWishModal } from "~/ui/my-wishes/new-wish/new-wish-modal";
import { WishesGrid } from "~/ui/my-wishes/wishes-grid";

export default function MyWishesPage() {
  return (
    <section className="flex h-full w-full flex-col gap-8 pt-2">
      <header className="flex justify-between">
        <h1 className="text-3xl font-bold">My Wishes</h1>

        <NewWishModal />
      </header>

      <WishesGrid />
    </section>
  );
}
