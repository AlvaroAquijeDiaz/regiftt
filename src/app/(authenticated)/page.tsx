import { getServerSession } from "next-auth/next";
import { SignIn } from "~/ui/sign-in";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div>
      <h1>Home</h1>

      <pre>{JSON.stringify(session)}</pre>

      <SignIn />
    </div>
  );
}
