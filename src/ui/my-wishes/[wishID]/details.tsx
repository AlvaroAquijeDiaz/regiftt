import Link from "next/link";
import { Suspense } from "react";
import { db } from "~/server/db";
import Loader from "~/ui/my-wishes/[wishID]/loader";
import { Button } from "~/ui/shared/button";

const getWishByID = async (wishID: string) => {
  return await db.gift.findUnique({
    where: { id: wishID },
  });
};

export default async function Details({ wishID }: { wishID: string }) {
  const wish = await getWishByID(wishID);

  if (!wish) {
    return (
      <div>
        Wish not found
        <Link href="/my-wishes">
          <Button>Go Back</Button>
        </Link>
      </div>
    );
  }

  return (
    <section>
      <Suspense fallback={<Loader />}>
        <span>Description</span>

        <p>{wish.description}</p>

        <p>{wish.createdAt.toDateString()}</p>
      </Suspense>
    </section>
  );
}
