import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { NewWishModal } from "~/ui/my-wishes/new-wish/new-wish-modal";
import { WishesGrid } from "~/ui/my-wishes/wishes-grid";

export default async function MyWishesPage() {
  const session = await getServerSession(authOptions);

  /**
   * const all = await fetcher<Gift[]>(`${env.NEXTAUTH_URL}/api/wish`, undefined, {
   *  next: {
   *   tags: ["my-wishes"],
   *  },
   * });
   */

  return (
    <section className="flex w-full flex-col gap-4 py-8">
      <h1 className="text-3xl font-bold">My Wishes</h1>

      <NewWishModal />

      <WishesGrid session={session} />
    </section>
  );
}
