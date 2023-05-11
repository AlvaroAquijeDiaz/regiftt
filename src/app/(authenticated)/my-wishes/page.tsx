import { NewWishModal } from "~/ui/my-wishes/new-wish/new-wish-modal";
import { WishesGrid } from "~/ui/my-wishes/wishes-grid";

export default function MyWishesPage() {
  return (
    <section className="flex w-full flex-col gap-4 py-8">
      <h1 className="text-3xl font-bold">My Wishes</h1>

      <NewWishModal />

      <WishesGrid />
    </section>
  );
}
