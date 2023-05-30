import { db } from "~/server/db";
import { WishProductCard } from "./wish-product-card";

const getLatestGifts = async () => {
  return await db.gift.findMany({
    take: 10,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      visible: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      link: true,
      sharableURL: true,
      owner: {
        select: {
          username: true,
          image: true,
        },
      },
      ownerId: true,
      image: true,
      slug: true,
      updatedAt: true,
      selected: true,
    },
  });
};

export const LatestWishes = async () => {
  const gifts = await getLatestGifts();

  return (
    <section className="grid grid-cols-1 gap-8">
      {gifts.map((gift) => (
        <WishProductCard key={gift.id} wish={gift} />
      ))}
    </section>
  );
};
