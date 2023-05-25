import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { withRouteMiddleware } from "~/server/with-route-middleware";
import { NewWishSchema } from "~/ui/my-wishes/my-wishes.schemas";

const newWish = withRouteMiddleware(
  async ({ token, out }) => {
    const generatedID = Date.now();

    const data = await db.gift.create({
      data: {
        name: out?.name as string,
        link: out?.url,
        description: out?.description,
        price: out?.price,
        slug: `${out?.name.toString().replaceAll(" ", "-") as string}-${generatedID}`,
        visible: out?.private,
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
    validator: NewWishSchema,
  }
);

export type NewWishReturnHandler = Awaited<typeof newWish>;

const allWishes = withRouteMiddleware(async ({ token }) => {
  const wishes = await db.gift.findMany({
    where: {
      ownerId: token.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(wishes);
});

export { newWish as POST };
export { allWishes as GET };
