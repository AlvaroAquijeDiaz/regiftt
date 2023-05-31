import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../auth";
import { db } from "../db";

export const getWishBySlug = async (wishID: string) => {
  try {
    const viewer = await getServerSession(authOptions);

    const data = await db.gift.findUnique({
      where: { slug: wishID },
      include: {
        owner: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });

    if (!data) {
      return notFound();
    }

    if (data?.ownerId === viewer?.user?.id) {
      return {
        ...data,
        viewerIsOwner: true,
      };
    }

    return {
      ...data,
      viewerIsOwner: false,
    };
  } catch (error) {
    return notFound();
  }
};
