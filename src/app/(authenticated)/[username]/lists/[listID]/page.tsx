import { getListById } from "~/server/routes/getListById";

export default async function ListIDByUsername({
  username,
  listID,
}: {
  username: string;
  listID: string;
}) {
  const list = await getListById(listID);

  console.log({ list });

  return <div>ListIDByUsername</div>;
}
