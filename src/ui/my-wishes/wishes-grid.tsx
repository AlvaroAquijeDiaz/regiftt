"use client";
import { type Session } from "next-auth";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import { type Gift } from "~/server/db.types";

export const WishesGrid = ({ session }: { session: Session | null }) => {
  const all = useSWR<Gift[]>("/api/wish", fetcher, {
    isVisible: () => !!session,
  });

  if (!all.data) {
    return <p>Loading...</p>;
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {all.data.map((gift) => {
        return (
          <article key={gift.id} className="grid grid-rows-3 rounded-lg border p-5">
            <h2>
              Name: <span className="font-bold tracking-wide">{gift.name}</span>
            </h2>

            <p>
              Description:
              {gift.description || <span className="italic text-neutral-400">No description</span>}
            </p>

            <p>Price: ${gift.price}</p>

            <p className="mt-2 text-xs text-neutral-400">
              Last Updated - {new Date(gift.createdAt as unknown as string).toDateString()}
            </p>
          </article>
        );
      })}
    </section>
  );
};
