import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { NewWishForm } from "~/ui/my-wishes/new-wish-form";

export default async function MyWishesPage() {
  const session = await getServerSession(authOptions);

  const all = await db.gift.findMany({
    where: {
      ownerId: session?.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  /**
   * const all = await fetcher<Gift[]>(`${env.NEXTAUTH_URL}/api/wish`, undefined, {
   *  next: {
   *   tags: ["my-wishes"],
   *  },
   * });
   */

  return (
    <>
      <h1 className="text-3xl font-bold">My Wishes</h1>

      <NewWishForm />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {all.map((gift) => {
          return (
            <article key={gift.id} className="grid grid-rows-3 rounded-lg border p-5">
              <h2>
                Name: <span className="font-bold tracking-wide">{gift.name}</span>
              </h2>

              <p>
                Description:{" "}
                {gift.description || (
                  <span className="italic text-neutral-400">No description</span>
                )}
              </p>

              <p>Price: ${gift.price}</p>

              <p className="mt-2 text-xs text-neutral-400">
                Last Updated - {new Date(gift.createdAt).toDateString()}
              </p>
            </article>
          );
        })}
      </section>
    </>
  );
}

export const revalidate = 1;
