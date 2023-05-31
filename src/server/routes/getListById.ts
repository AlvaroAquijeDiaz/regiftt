import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "../auth";
import { db } from "../db";

export const getListById = async (id: string) => {
  try {
    const viewer = await getServerSession(authOptions);

    const list = await db.list.findUnique({
      where: {
        id,
      },
    });

    if (!list) {
      return notFound();
    }

    if (list?.ownerId === viewer?.user?.id) {
      return {
        ...list,
        viewerIsOwner: true,
      };
    }

    return {
      ...list,
      viewerIsOwner: false,
    };
  } catch (error) {
    return notFound();
  }
};
