import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { NewWishForm } from "~/ui/my-wishes/new-wish-form";
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
    <section className="py-8">
      <h1 className="text-3xl font-bold">My Wishes</h1>

      <NewWishForm />

      <WishesGrid session={session} />
    </section>
  );
}
