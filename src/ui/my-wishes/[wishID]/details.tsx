import { ShareIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { Button } from "~/ui/shared/button";

const getWishByID = async (wishID: string) => {
  const viewer = await getServerSession(authOptions);

  const data = await db.gift.findUnique({
    where: { slug: wishID },
  });

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
};

export default async function Details({ wishID }: { wishID: string }) {
  const wish = await getWishByID(wishID);

  if (!wish) {
    return notFound();
  }

  return (
    <section className="flex flex-col gap-2">
      <p>Image: {wish.image}</p>

      <p>Description: {wish.description}</p>

      <p>{wish.link}</p>

      <p>${wish.price}</p>

      <p>
        {wish.selected
          ? `Selected by ${wish.selectedByUserId || ""}`
          : "Not Selected by anyone yet"}
      </p>

      <p>{wish.createdAt?.toDateString()}</p>

      <p>Share: {wish.sharableURL}</p>

      {wish.viewerIsOwner && <p>You&apos;re the author</p>}

      <Button className="max-w-fit">
        <ShareIcon size={17} />
        Share
      </Button>
    </section>
  );
}
