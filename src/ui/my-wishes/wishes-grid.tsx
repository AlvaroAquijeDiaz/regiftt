"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import { type Gift } from "~/server/db.types";
import { WishCard } from "./wish-card";

export const WishesGrid = () => {
  const all = useSWR<Gift[]>("/api/wish", (key: string) =>
    fetcher(key, {
      isClient: true,
    })
  );

  if (all.error) {
    notFound();
  }

  if (!all.data) {
    return <p>Loading... TODO: Skeleton</p>;
  }

  return (
    <section className="grid w-full grid-cols-1 gap-4 sm:gap-8 md:grid-cols-2">
      {all.data.map((gift) => {
        return <WishCard key={gift.id} wish={gift} />;
      })}
    </section>
  );
};
