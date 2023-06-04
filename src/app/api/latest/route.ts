import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { withRouteMiddleware } from "~/server/with-route-middleware";

const handler = withRouteMiddleware(async () => {
  const wishes = async () =>
    await db.gift.findMany({
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

  const lists = async () =>
    await db.list.findMany({
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

  const all = await Promise.all([wishes, lists]);

  return NextResponse.json({
    wishes: all[0],
    lists: all[1],
  });
});

export type GETReturnHandler = Awaited<typeof handler>;

export { handler as GET };
