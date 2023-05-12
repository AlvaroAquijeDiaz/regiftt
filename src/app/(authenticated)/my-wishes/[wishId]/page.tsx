import Details from "~/ui/my-wishes/[wishID]/details";

export default function WishIDPage({
  searchParams: { name },
  params: { wishId },
}: {
  params: { wishId: string };
  searchParams: { name: string };
}) {
  return (
    <div className="my-auto w-full rounded-lg border p-20">
      <h1 className="text-2xl font-extrabold capitalize">{name}</h1>

      {/* @ts-expect-error RSC */}
      <Details wishID={wishId} />
    </div>
  );
}
