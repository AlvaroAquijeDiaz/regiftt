import { db } from "~/server/db";
import { ListProductCard, type ListWithExtraParams } from "./list-product-card";
import { WishProductCard, type GiftWithExtraParams } from "./wish-product-card";

const getLatestGifts = async () => {
  const res = await db.gift.findMany({
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

  return res.map((gift) => ({
    ...gift,
    type: "gift",
  }));
};

const getLatestLists = async () => {
  const res = await db.list.findMany({
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

  return res.map((list) => ({
    ...list,
    type: "list",
  }));
};

export const LatestWishes = async () => {
  const gifts = await getLatestGifts();
  const lists = await getLatestLists();

  const all = [...gifts, ...lists].sort((a, b) => {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <section className="grid grid-cols-1 gap-8 sm:gap-12">
      {all.map((item) => {
        if (item.type === "gift") {
          return <WishProductCard key={item.id} wish={item as GiftWithExtraParams} />;
        }

        return <ListProductCard key={item.id} list={item as ListWithExtraParams} />;
      })}
    </section>
  );
};
