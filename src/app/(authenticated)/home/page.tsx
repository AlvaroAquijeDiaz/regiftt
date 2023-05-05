import { db } from "~/server/db";

export default async function Home() {
  const users = await db.user.findMany();

  return (
    <div>
      <h1>Home</h1>

      <pre>{JSON.stringify(users)}</pre>
    </div>
  );
}
