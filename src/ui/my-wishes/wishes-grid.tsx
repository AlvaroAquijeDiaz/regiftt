"use client";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import { type Gift } from "~/server/db.types";
import { EditWishDropdown } from "./edit-wish-dropdown";

export const WishesGrid = () => {
  const all = useSWR<Gift[]>("/api/wish", (key: string) =>
    fetcher(key, {
      isClient: true,
    })
  );

  if (!all.data) {
    return <p>Loading... TODO: Skeleton</p>;
  }

  return (
    <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {all.data.map((gift) => {
        return (
          <article key={gift.id} className="grid grid-rows-3 rounded-lg border p-5">
            <EditWishDropdown id={gift.id} />

            <h2>
              Name: <span className="font-bold tracking-wide">{gift.name}</span>
            </h2>

            <p>
              Description:{" "}
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
