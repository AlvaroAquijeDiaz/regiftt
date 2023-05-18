import { notFound } from "next/navigation";
import { db } from "~/server/db";

const getUserDetailsByUsername = async (username: string) => {
  return await db.user.findUnique({
    where: {
      username,
    },
  });
};

export const UserDetails = async ({ username }: { username: string }) => {
  const user = await getUserDetailsByUsername(username);

  if (!user) {
    return notFound();
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>{username}</p>

      <p>{user.name}</p>
      <p>{user.bio}</p>
      <p>{user.email}</p>
    </div>
  );
};
