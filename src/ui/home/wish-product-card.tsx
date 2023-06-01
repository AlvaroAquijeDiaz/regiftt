import { type Gift } from "@prisma/client/edge";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { cn } from "~/lib/cn";

export const WishProductCard = ({
  wish,
}: {
  wish: Omit<Gift, "createdAt" | "visible" | "selectedByUserId"> & {
    owner?: {
      username: string | null;
      image: string | null;
    } | null;
    viewerIsOwner?: boolean;
    createdAt?: Date;
    visible?: boolean;
    selectedByUserId?: string | null;
  };
}) => {
  return (
    <article
      className={cn(
        "flex max-w-full flex-col gap-4 overflow-hidden rounded-xl border bg-white shadow-lg",
        wish.image ? "pb-6" : "py-6"
      )}
    >
      {wish.image && (
        <div className="pattern-isometric max-h-[400px] overflow-hidden pattern-neutral-100 pattern-opacity-100 pattern-size-6">
          <Image
            src={wish.image}
            width={800}
            height={200}
            alt={wish.name}
            className="z-10 max-h-[400px] w-full max-w-full border-b border-neutral-200 object-contain"
            loading="lazy"
          />
        </div>
      )}

      <section className="flex flex-col gap-3 px-6">
        <div className="flex flex-1 items-center gap-2">
          {wish.owner?.image && (
            <Link href={`/${wish.owner.username || ""}` as LinkProps["href"]}>
              <Image
                src={wish.owner?.image}
                height={40}
                width={40}
                alt={wish.owner.username || ""}
                className="rounded-full"
              />
            </Link>
          )}

          <div className="flex flex-col">
            <Link
              href={`/${wish.owner?.username || ""}/wishes/${wish.slug}` as LinkProps["href"]}
              passHref
            >
              <h3 className="font-bold capitalize md:text-lg">{wish.name}</h3>
            </Link>

            <Link href={`/${wish.owner?.username || ""}` as LinkProps["href"]}>
              <p className="text-sm font-[500] text-neutral-500 underline-offset-1 hover:underline">
                @{wish.owner?.username} on {wish.updatedAt?.toLocaleString()}
              </p>
            </Link>
          </div>
        </div>

        <Link href={`/${wish.owner?.username || ""}/wishes/${wish.slug}` as LinkProps["href"]}>
          <div className="flex flex-col gap-2">
            <p className="text-neutral-600">{wish.description || "No Description Provided"}</p>

            {wish.price && <p className="text-sm font-bold">${wish.price}</p>}

            <p>{wish.link} - Link Previews are coming!</p>

            <p>{wish.sharableURL}</p>
          </div>
        </Link>

        <div>Selected ?</div>
      </section>
    </article>
  );
};
