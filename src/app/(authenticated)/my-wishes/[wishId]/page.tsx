import Details from "~/ui/my-wishes/[wishID]/details";

export default function WishIDPage({
  searchParams: { name },
  params: { wishId },
}: {
  params: { wishId: string };
  searchParams: { name: string };
}) {
  return (
    <div>
      <h1 className="text-2xl font-extrabold capitalize">{name}</h1>

      {/* @ts-expect-error RSC */}
      <Details wishID={wishId} />
    </div>
  );
}
