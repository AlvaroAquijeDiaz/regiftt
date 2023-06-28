import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { newWishSchema } from "~/app/_ui/my-wishes/my-wishes.schemas";
import { env } from "~/env.mjs";
import { truncate } from "~/lib/utils";
import { db } from "~/server/db";
import { withRouteMiddleware } from "~/server/with-route-middleware";

const newWish = withRouteMiddleware(
  async ({ token, out }) => {
    try {
      const nowInMS = Date.now();
      const generatedID = `${out?.name.toString().replaceAll(" ", "-") as string}-${nowInMS}`;
      const baseURL = env.NEXTAUTH_URL;

      if (!token.username) {
        return NextResponse.json(
          {
            error: "Authentication error, please re-login",
            ok: false,
          },
          { status: 404 }
        );
      }

      const sharableURL = `${baseURL}/${token.username}/wishes/${generatedID}`;

      const data = await db.gift.create({
        data: {
          name: out?.name as string,
          link: out?.url,
          description: out?.description,
          price: out?.price,
          slug: generatedID,
          visible: out?.private,
          sharableURL: sharableURL,
          linkMetaImage: out?.linkMeta?.image,
          linkMetaTitle: out?.linkMeta?.title,
          linkMetaShortDescription:
            out?.linkMeta?.description && truncate(out?.linkMeta?.description || "", 50),
          owner: {
            connect: {
              id: token.id,
            },
          },
        },
      });

      revalidatePath(`/home`);

      return NextResponse.json({
        ...data,
        ok: true,
      });
    } catch (e) {
      const err = e as Error;

      return NextResponse.json(
        {
          ...err,
          ok: false,
        },
        { status: 405 }
      );
    }
  },
  {
    validator: newWishSchema,
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

export { allWishes as GET, newWish as POST };
