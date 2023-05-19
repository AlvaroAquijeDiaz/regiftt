import { Suspense } from "react";
import Loader from "~/ui/my-wishes/[wishID]/loader";
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
      <h1>Page By Username</h1>
      <p>{username}</p>

      <Suspense fallback={<Loader />}>
        {/* @ts-expect-error RSC */}
        <UserDetails username={username} />
      </Suspense>

      <Suspense fallback={<Loader />}>
        {/* @ts-expect-error RSC */}
        <GiftsByUsername username={username} />
      </Suspense>
    </div>
  );
}
