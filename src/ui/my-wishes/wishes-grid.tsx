import { db } from "~/server/db";
import { WishCard } from "./wish-card";

const getAllWishes = async () => {
  return await db.gift.findMany();
};

export const WishesGrid = async () => {
  const all = await getAllWishes();

  return (
    <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
      {all.map((gift) => (
        <WishCard key={gift.id} wish={gift} />
      ))}
    </section>
  );
};
