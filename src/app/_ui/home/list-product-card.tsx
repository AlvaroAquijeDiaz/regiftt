import { type List } from "@prisma/client/edge";
import { CircleSlash2, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link, { type LinkProps } from "next/link";
import { RelativeTime } from "./relative-time";

export type ListWithExtraParams = List & {
  _count: {
    gifts: number;
  };
  owner: {
    username: string | null;
    image: string | null;
  } | null;
  gifts: {
    gift: {
      name: string;
      image: string | null;
    };
  }[];
};

export const ListProductCard = ({ list }: { list: ListWithExtraParams }) => {
  return (
    <article className="relative flex w-full flex-col gap-0 rounded-lg border border-border transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-200/70">
      <div className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-150">
        <div className="flex-shrink-0">
          {list.image && (
            <Image
              className="h-48 w-full object-cover"
              src={list.image}
              alt=""
              width={300}
              height={150}
            />
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <Link
            href={`/${list.owner?.username || ""}/lists/${list.slug}` as LinkProps["href"]}
            passHref
          >
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <p className="text-xl font-bold capitalize text-gray-900">{list.name}</p>

                <span className="rounded-full bg-indigo-100 px-3 py-0.5 text-sm font-bold text-indigo-700">
                  List
                </span>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {list.description || <span className="italic">No description provided</span>}
              </p>
            </div>
          </Link>

          <ul className="mt-3 flex max-w-fit flex-wrap gap-2">
            {list.gifts.length === 0 && (
              <li className="flex items-center gap-2 rounded-lg border border-neutral-300 bg-neutral-100 px-4 py-1.5 text-sm text-neutral-500">
                <CircleSlash2 className="text-neutral-400" size={20} />
                Empty List
              </li>
            )}

            {list.gifts.map(({ gift }, idx) => (
              <li
                key={gift.name}
                className={`flex h-14 w-14 flex-shrink-0 items-center justify-center border transition-all duration-150 hover:translate-x-[${idx}rem] rounded-full bg-gray-100`}
              >
                {gift.image ? (
                  <Image
                    className="h-14 w-14 rounded-full object-cover"
                    src={gift.image}
                    alt=""
                    width={60}
                    height={60}
                  />
                ) : (
                  <ImageIcon className="text-gray-400" />
                )}
              </li>
            ))}
          </ul>

          <Link href={`/${list.owner?.username || ""}` as LinkProps["href"]} passHref>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <span className="sr-only">{list.owner?.username}</span>
                {list.owner?.image && (
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={list.owner.image}
                    alt=""
                    width={40}
                    height={40}
                  />
                )}
              </div>

              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 hover:underline">
                  {list.owner?.username}
                </p>

                <div className="flex space-x-1 text-sm text-gray-500">
                  <RelativeTime date={list.createdAt} />

                  <span aria-hidden="true">&middot;</span>

                  <span>{list._count.gifts} items</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};
