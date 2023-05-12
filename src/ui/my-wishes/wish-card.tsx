import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { type Gift } from "~/server/db.types";

export const WishCard = ({ wish }: { wish: Gift }) => {
  return (
    <Link href={`/my-wishes/${wish.id}?name=${wish.name}` as LinkProps["href"]} passHref>
      <article
        key={wish.id}
        className="grid min-h-full w-full grid-cols-2 gap-3 rounded-lg border border-indigo-100 bg-gradient-to-br from-violet-50 p-6 shadow-lg dark:border-border"
      >
        {wish.image && (
          <Image
            src={wish.image}
            alt={wish.name}
            width={200}
            height={200}
            className="rounded-lg border border-neutral-200 p-px"
          />
        )}

        <section className="flex h-full flex-col justify-between gap-2">
          <div className="flex h-full w-full flex-col gap-2">
            <h3 className="text-lg font-bold capitalize">{wish.name}</h3>

            <span className="text-neutral-500">Description</span>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
              {wish.description || (
                <span className="italic text-neutral-500 dark:text-neutral-300">
                  No description provided
                </span>
              )}
            </p>
          </div>

          <p className="flex flex-col">
            <span className="text-sm font-light text-neutral-500">Price(ish)</span>
            <span className="font-semibold">${wish.price}</span>
          </p>

          <p className="text-xs text-neutral-400">
            - {new Date(wish.updatedAt as unknown as string).toDateString()}
          </p>
        </section>
      </article>
    </Link>
  );
};
