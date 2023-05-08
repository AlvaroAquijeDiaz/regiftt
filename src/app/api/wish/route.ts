import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { withRouteMiddleware } from "~/server/with-route-middleware";
import { NewWishSchema } from "~/ui/my-wishes/my-wishes.schemas";

const newWish = withRouteMiddleware(
  async (token, _req, _res, out) => {
    const data = await db.gift.create({
      data: {
        name: out?.input.name as unknown as string,
        description: out?.input.description as unknown as string,
        link: out?.input.url as unknown as string,
        price: out?.input.price as unknown as number,
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
