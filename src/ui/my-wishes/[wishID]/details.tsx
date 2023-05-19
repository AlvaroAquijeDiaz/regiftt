import { ShareIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { db } from "~/server/db";
import { Button } from "~/ui/shared/button";

const getWishByID = async (wishID: string) => {
  return await db.gift.findUnique({
    where: { id: wishID },
  });
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

      <p>{wish.createdAt.toDateString()}</p>

      <Button className="max-w-fit">
        <ShareIcon size={17} />
        Share
      </Button>
    </section>
  );
}
