import { db } from "~/server/db";
import { Button } from "~/ui/shared/button";
import { ThemeToggle } from "~/ui/theme/theme-toggle";

export default async function Home() {
  const users = await db.user.findMany();

  return (
    <div>
      <h1>Home</h1>

      <pre>{JSON.stringify(users)}</pre>

      <ThemeToggle />

      <Button>Test</Button>
    </div>
  );
}
