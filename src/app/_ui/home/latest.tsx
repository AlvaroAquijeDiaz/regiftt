import { db } from "~/server/db";
import { ListProductCard } from "./list-product-card";
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
    include: {
      owner: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  });
};

const getLatestLists = async () => {
  return await db.list.findMany({
    take: 10,
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      visible: true,
    },
    include: {
      owner: {
        select: {
          username: true,
          image: true,
        },
      },
      _count: true,
      gifts: {
        select: {
          gift: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
};

export const LatestWishes = async () => {
  const gifts = await getLatestGifts();
  const lists = await getLatestLists();

  return (
    <section className="grid grid-cols-1 gap-8 sm:gap-12">
      {lists.map((list) => (
        <ListProductCard key={list.id} list={list} />
      ))}

      {gifts.map((gift) => (
        <WishProductCard key={gift.id} wish={gift} />
      ))}
    </section>
  );
};
