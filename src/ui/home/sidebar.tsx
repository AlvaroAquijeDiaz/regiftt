import Link, { type LinkProps } from "next/link";
import { NavDropdown } from "./nav-dropdown";

export const segments: { name: string; path: LinkProps["href"] }[] = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Wishes",
    path: "/dashboard/wishes",
  },
  {
    name: "Lists",
    path: "/dashboard/lists",
  },
  // {
  //   name: "Giving Away",
  //   path: "/give-away",
  // },
];

export const Sidebar = () => {
  return (
    <aside className="relative left-0 top-0 z-10 flex h-screen flex-col gap-3.5 border-r pb-3 pt-3 transition-transform duration-75 max-lg:fixed max-lg:-translate-x-full lg:sticky lg:w-[260px] lg:pt-3">
      <div className="flex items-center justify-between">
        <span>Regiftt</span>

        {/* @ts-expect-error RSC */}
        <NavDropdown />
      </div>

      <ul>
        {segments.map((segment) => (
          <li key={segment.name}>
            <Link href={segment.path}>
              <span>{segment.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
