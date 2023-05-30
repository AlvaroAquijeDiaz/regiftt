import Link from "next/link";
import { Suspense } from "react";
import { cn } from "~/lib/cn";
import { NewListOrGift } from "../../my-wishes/new-list";
import { Spinner } from "../../shared/spinner";
import { NavDropdown } from "../nav-dropdown";
import { SidebarSegment } from "./sidebar-segment";

export const segments = [
  {
    name: "Latest",
    path: "/home",
  },
  {
    name: "My Wishes",
    path: "/dashboard/wishes",
  },
  {
    name: "My Lists",
    path: "/dashboard/lists",
  },
  {
    name: "Giving Away",
    path: "/dashboard/giving",
  },
] as const;

export const Sidebar = ({ isSheet = false }: { isSheet?: boolean }) => {
  return (
    <aside
      className={cn(
        "relative text-sm",
        isSheet
          ? "mt-3 flex min-h-full w-full flex-col gap-4 p-0"
          : "left-0 top-0 z-20 flex h-screen w-[300px] flex-col gap-3.5 overflow-y-hidden border-r bg-neutral-100/70 bg-white pb-3 pt-3 text-sm transition-transform duration-75 max-lg:fixed max-lg:-translate-x-full lg:sticky lg:min-w-[300px] lg:pt-2"
      )}
    >
      <div className="mx-4 flex select-none items-center justify-between gap-1 rounded-lg border bg-white px-2 py-1">
        <Suspense fallback={<Spinner />}>
          {/* @ts-expect-error RSC */}
          <NavDropdown />
        </Suspense>
      </div>

      <div className="flex w-full">
        <NewListOrGift />
      </div>

      <ul className="flex flex-col gap-1 px-4">
        {segments.map((segment) => (
          <Link href={segment.path} key={segment.name}>
            <SidebarSegment segment={segment} />
          </Link>
        ))}
      </ul>
    </aside>
  );
};
