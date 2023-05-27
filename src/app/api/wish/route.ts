import { NextResponse } from "next/server";
import { env } from "~/env.mjs";
import { db } from "~/server/db";
import { withRouteMiddleware } from "~/server/with-route-middleware";
import { NewWishSchema } from "~/ui/my-wishes/my-wishes.schemas";

const newWish = withRouteMiddleware(
  async ({ token, out }) => {
    try {
      const nowInMS = Date.now();
      const generatedID = `${out?.name.toString().replaceAll(" ", "-") as string}-${nowInMS}`;
      const baseURL = env.NEXTAUTH_URL;

      /**
       * TODO: FIX: Find why the fuck is the getToken() function not returning the username
       */
      const owner = await db.user.findUniqueOrThrow({
        where: {
          id: token.id,
        },
        select: {
          username: true,
        },
      });

      if (!owner.username) {
        return NextResponse.json(
          {
            error: "Something went wrong",
            ok: false,
          },
          { status: 413 }
        );
      }

      const sharableURL = `${baseURL}/${owner.username}/${generatedID}`;

      const data = await db.gift.create({
        data: {
          name: out?.name as string,
          link: out?.url,
          description: out?.description,
          price: out?.price,
          slug: generatedID,
          visible: out?.private,
          sharableURL: sharableURL,
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
    } catch (e) {
      const err = e as Error;

      return NextResponse.json(
        {
          error: err.message,
          ok: false,
        },
        { status: 413 }
      );
    }
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
