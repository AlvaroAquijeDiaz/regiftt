import { db } from "~/server/db";
import { WishCard } from "~/ui/my-wishes/wish-card";

const getLatestGifts = async () => {
  return await db.gift.findMany({
    take: 10,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      visible: true,
    },
  });
};

export const LatestWishes = async () => {
  const gifts = await getLatestGifts();

  return (
    <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {gifts.map((gift) => (
        <WishCard key={gift.id} wish={gift} />
      ))}
    </section>
  );
};
