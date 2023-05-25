import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { withRouteMiddleware } from "~/server/with-route-middleware";
import { newListSchema } from "~/ui/my-wishes/my-wishes.schemas";

const newList = withRouteMiddleware(
  async ({ token, out }) => {
    const data = await db.list.create({
      data: {
        name: out?.name,
        description: out?.description,
        owner: {
          connect: {
            id: token.id,
          },
        },
      },
    });

    return NextResponse.json({
      ...data,
      ok: true,
    });
  },
  {
    validator: newListSchema,
  }
);

const all = withRouteMiddleware(async ({ token }) => {
  const lists = await db.list.findMany({
    where: {
      ownerId: token.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      visible: true,
      gifts: {
        select: {
          gift: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(lists);
});

export { newList as POST, all as GET };

export type NewListReturnHandler = Awaited<ReturnType<typeof newList>>;
