import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "~/server/auth";
import { SignIn } from "~/ui/auth/sign-in";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {!session ? <SignIn /> : <Link href="/home">Go Inside</Link>}

      <h1>Landing Page</h1>
    </div>
  );
}
