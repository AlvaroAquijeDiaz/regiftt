import { ShareIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { Button } from "~/app/_ui/shared/button";
import { getWishBySlug } from "~/server/routes/getWishBySlug";

export default async function Details({ wishID }: { wishID: string }) {
  const wish = await getWishBySlug(wishID);

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
