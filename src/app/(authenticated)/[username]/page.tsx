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

      {/* @ts-expect-error RSC */}
      <UserDetails username={username} />
    </div>
  );
}
