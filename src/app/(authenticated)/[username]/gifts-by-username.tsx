import { db } from "~/server/db";

const getGiftsByUsername = async (username: string) => {
  return await db.gift.findMany({
    where: {
      owner: {
        username,
      },
      visible: true,
    },
  });
};

export const GiftsByUsername = async ({ username }: { username: string }) => {
  const allGifts = await getGiftsByUsername(username);

  return (
    <section>
      <h1>Gifts By Username</h1>

      <p>{username}</p>

      <div className="grid grid-cols-2 gap-4">
        {allGifts.map((gift) => (
          <div key={gift.id} className="rounded-lg border p-4">
            <p>Image: {gift.image}</p>
            <p>Name: {gift.name}</p>
            <p>Description: {gift.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
