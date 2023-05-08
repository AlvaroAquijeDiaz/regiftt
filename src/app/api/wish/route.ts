import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { withRouteMiddleware } from "~/server/with-route-middleware";
import { NewWishSchema } from "~/ui/my-wishes/my-wishes.schemas";

const newWish = withRouteMiddleware(
  async (token, _req, _res, out) => {
    const data = await db.gift.create({
      data: {
        name: out?.input.name as string,
        description: out?.input.description,
        link: out?.input.url,
        price: out?.input.price,
        owner: {
          connect: {
            id: token.id as string,
          },
        },
      },
    });

    return NextResponse.json(data);
  },
  {
    validator: NewWishSchema,
  }
);

export type NewWishReturnHandler = ReturnType<typeof newWish>;

export { newWish as POST };
