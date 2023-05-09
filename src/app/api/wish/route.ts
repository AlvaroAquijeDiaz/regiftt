import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { withRouteMiddleware } from "~/server/with-route-middleware";
import { NewWishSchema } from "~/ui/my-wishes/my-wishes.schemas";

const newWish = withRouteMiddleware(
  async (token, _req, _res, out) => {
    const data = await db.gift.create({
      data: {
        name: out?.input.name as string,
        link: out?.input.url,
        description: out?.input.description,
        price: out?.input.price,
        owner: {
          connect: {
            id: token.id as string,
          },
        },
      },
    });

    const tag = _req.nextUrl.searchParams.get("my-wishes");
    const path = _req.nextUrl.searchParams.get("/my-wishes");

    tag && revalidateTag(tag);
    path && revalidatePath(path);

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

const allWishes = withRouteMiddleware(async (token, _req, _res) => {
  const wishes = await db.gift.findMany({
    where: {
      ownerId: token.id as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(wishes);
});

export { newWish as POST };
export { allWishes as GET };
