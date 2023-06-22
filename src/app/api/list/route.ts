import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { newListSchema } from "~/app/_ui/my-wishes/my-wishes.schemas";
import { env } from "~/env.mjs";
import { type SWRError } from "~/lib/fetcher";
import { db } from "~/server/db";
import { withRouteMiddleware } from "~/server/with-route-middleware";

const newList = withRouteMiddleware(
  async ({ token, out }) => {
    try {
      const generatedSlug = `${out?.name.replaceAll(" ", "-") || ""}-${Date.now()}`;
      const sharableURL = `${env.NEXTAUTH_URL}/${token.username}/lists/${generatedSlug}`;

      const data = await db.list.create({
        data: {
          name: out?.name,
          description: out?.description,
          owner: {
            connect: {
              id: token.id,
            },
          },
          sharableURL,
          slug: generatedSlug,
          visible: !out?.private,
          dueOn: out?.dueOn,
          gifts: {
            create: out?.wishIDs?.map((gift) => ({
              gift: {
                connect: {
                  id: gift,
                },
              },
            })),
          },
        },
      });

      revalidatePath(`/home`);

      return NextResponse.json({
        ...data,
        ok: true,
      });
    } catch (e) {
      const error = e as SWRError;

      return NextResponse.json({
        ok: false,
        error,
      });
    }
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

  return NextResponse.json(lists);
});

export { all as GET, newList as POST };

export type NewListReturnHandler = Awaited<ReturnType<typeof newList>>;
