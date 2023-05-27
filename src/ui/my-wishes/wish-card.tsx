import { type Gift as PrismaGift } from "@prisma/client/edge";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { type Gift } from "~/server/db.types";

export const WishCard = ({ wish }: { wish: Gift | PrismaGift }) => {
  return (
    <Link href={`/dashboard/wishes/${wish.slug}` as LinkProps["href"]} passHref>
      <article
        key={wish.id}
        className={`grid h-[225px] w-full ${
          wish.image ? "grid-cols-2" : "grid-cols-1"
        } rounded-xl border-2 border-dashed border-indigo-800/50 bg-gradient-to-br from-blue-50 via-white to-violet-200 shadow-lg dark:border-border`}
      >
        <section className="flex h-full flex-col justify-between gap-2 p-3 sm:p-4">
          <div className="flex h-full w-full flex-col gap-2">
            <h3 className="overflow-hidden whitespace-pre-line font-bold capitalize sm:text-lg">
              {wish.name}
            </h3>

            <p className="flex flex-col">
              <span className="text-xs text-neutral-500 sm:text-sm">Description</span>
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                {wish.description || (
                  <span className="italic text-neutral-500 dark:text-neutral-300">
                    No description provided
                  </span>
                )}
              </span>
            </p>
          </div>

          <p className="flex flex-col">
            <span className="text-xs text-neutral-500 sm:text-sm">Price(ish)</span>
            <span className="font-semibold">${wish.price}</span>
          </p>

          <p className="text-xs text-neutral-400">
            On {new Date(wish.updatedAt as unknown as string).toLocaleDateString()}
          </p>
        </section>

        {wish.image && (
          <Image
            src={wish.image}
            alt={wish.name}
            width={200}
            height={200}
            className="min-h-full min-w-full rounded-r-lg object-cover"
          />
        )}
      </article>
    </Link>
  );
};
