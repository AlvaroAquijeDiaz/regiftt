import { Suspense } from "react";
import { db } from "~/server/db";
import { SignOut } from "~/ui/auth/sign-out";
import { ThemeToggle } from "~/ui/theme/theme-toggle";

export default async function Home() {
  const users = await db.user.findMany();

  return (
    <div>
      <h1>Home</h1>

      <pre className="whitespace-pre-wrap">{JSON.stringify(users)}</pre>

      <Suspense fallback={<></>}>
        <ThemeToggle />
      </Suspense>

      <Suspense fallback={<></>}>
        <SignOut />
      </Suspense>
    </div>
  );
}
