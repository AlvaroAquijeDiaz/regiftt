import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { NewWishForm } from "~/ui/my-wishes/new-wish-form";

export default async function MyWishesPage() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <h1 className="text-3xl font-bold">My Wishes</h1>

      <NewWishForm />
    </>
  );
}
