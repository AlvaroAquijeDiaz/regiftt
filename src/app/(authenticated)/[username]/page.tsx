import { Suspense } from "react";
import Loader from "~/app/_ui/my-wishes/[wishID]/loader";
import { GiftsByUsername } from "./gifts-by-username";
import { UserDetails } from "./user-details";

export default function PageByUsername({
  params: { username },
}: {
  params: {
    username: string;
  };
}) {
  return (
    <div>
      <h1 className="text-3xl font-black">@{username}</h1>

      <Suspense fallback={<Loader />}>
        <UserDetails username={username} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <GiftsByUsername username={username} />
      </Suspense>
    </div>
  );
}
